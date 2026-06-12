const { app, BrowserWindow, ipcMain, protocol, net, dialog } = require("electron");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");
const fs = require("node:fs");

const isDev = !app.isPackaged;
const PORT = 4173;
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const IMG_DIR = path.join(__dirname, "..", "img");
const API_URL = process.env.IMAGE2SVIP_API_URL || "https://www.zyflow.cn/v1/chat/completions";

let mainWindow = null;
let server = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: "image2svip",
    icon: path.join(__dirname, "..", "img", "shua.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    },
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 }
  });

  mainWindow.loadFile(path.join(PUBLIC_DIR, "index.html"));

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 30 * 1024 * 1024) {
        reject(new Error("请求体过大"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function contentForPrompt(prompt, images) {
  const content = [{ type: "text", text: prompt }];
  for (const image of images || []) {
    if (!image || !image.dataUrl) continue;
    content.push({
      type: "image_url",
      image_url: { url: image.dataUrl }
    });
  }
  return content;
}

function postJson(url, headers, body) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const transport = target.protocol === "https:" ? https : http;
    const payload = JSON.stringify(body);
    const request = transport.request(
      {
        method: "POST",
        hostname: target.hostname,
        port: target.port || (target.protocol === "https:" ? 443 : 80),
        path: `${target.pathname}${target.search}`,
        headers: { ...headers, "Content-Length": Buffer.byteLength(payload) }
      },
      (response) => {
        let text = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => { text += chunk; });
        response.on("end", () => {
          resolve({
            ok: response.statusCode >= 200 && response.statusCode < 300,
            status: response.statusCode,
            text
          });
        });
      }
    );
    request.on("error", reject);
    request.write(payload);
    request.end();
  });
}

async function handleGenerate(req, res) {
  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch (error) {
    sendJson(res, 400, { error: "请求内容无法解析。" });
    return;
  }

  const apiKey = String(payload.apiKey || "").trim();
  const prompt = String(payload.prompt || "").trim();
  const model = String(payload.model || "").trim();
  const size = String(payload.size || "auto");
  const count = Math.max(1, Math.min(10, Number(payload.count || 1)));

  if (!apiKey) { sendJson(res, 400, { error: "请先填写并保存 API Key。" }); return; }
  if (!prompt) { sendJson(res, 400, { error: "请输入要生成的图像内容。" }); return; }
  if (!["gpt-image-2", "codex-gpt-image-2"].includes(model)) {
    sendJson(res, 400, { error: "模型选择无效。" }); return;
  }

  const requestBody = {
    model,
    messages: [{ role: "user", content: contentForPrompt(prompt, payload.images) }],
    stream: false
  };
  if (count > 1) requestBody.n = count;
  if (size !== "auto") requestBody.size = size;

  try {
    const apiResponse = await postJson(API_URL, {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    }, requestBody);

    let data;
    try { data = JSON.parse(apiResponse.text); } catch { data = { raw: apiResponse.text }; }

    if (!apiResponse.ok) {
      sendJson(res, apiResponse.status, {
        error: data?.error?.message || data?.message || `生成接口返回 ${apiResponse.status}`,
        detail: data
      });
      return;
    }
    sendJson(res, 200, data);
  } catch (error) {
    sendJson(res, 502, {
      error: `无法连接生成接口：${API_URL}`,
      detail: error.message
    });
  }
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

function serveFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const isImageAsset = pathname.startsWith("/img/");
  const baseDir = isImageAsset ? IMG_DIR : PUBLIC_DIR;
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(isImageAsset ? 5 : 1);
  const filePath = path.resolve(baseDir, relativePath);

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        fs.readFile(path.join(PUBLIC_DIR, "index.html"), (fallbackError, html) => {
          if (fallbackError) { res.writeHead(404); res.end("Not Found"); return; }
          res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
          res.end(html);
        });
        return;
      }
      res.writeHead(500); res.end("Server Error"); return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

function startServer() {
  return new Promise((resolve) => {
    server = http.createServer((req, res) => {
      if (req.method === "POST" && req.url === "/api/generate") {
        handleGenerate(req, res); return;
      }
      if (req.method === "GET" || req.method === "HEAD") {
        serveFile(req, res); return;
      }
      res.writeHead(405); res.end("Method Not Allowed");
    });
    server.listen(PORT, () => {
      console.log(`image2svip server running at http://localhost:${PORT}`);
      resolve();
    });
  });
}

app.whenReady().then(async () => {
  await startServer();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (server) server.close();
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (server) server.close();
});
