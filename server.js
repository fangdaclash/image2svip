const http = require("node:http");
const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");

const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIR = path.join(__dirname, "public");
const IMG_DIR = path.join(__dirname, "img");
const API_URL =
  process.env.IMAGE2SVIP_API_URL ||
  "https://www.zyflow.cn/v1/chat/completions";
const DEBUG_SERVER_URL = "http://127.0.0.1:7777/event";
const DEBUG_SESSION_ID = "multi-image-size-fail";

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

function debugEvent(runId, hypothesisId, location, msg, data = {}) {
  const target = new URL(DEBUG_SERVER_URL);
  const transport = target.protocol === "https:" ? https : http;
  const payload = JSON.stringify({
    sessionId: DEBUG_SESSION_ID,
    runId,
    hypothesisId,
    location,
    msg,
    data,
    ts: Date.now()
  });
  const request = transport.request(
    {
      method: "POST",
      hostname: target.hostname,
      port: target.port || (target.protocol === "https:" ? 443 : 80),
      path: `${target.pathname}${target.search}`,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      }
    },
    (response) => {
      response.resume();
    }
  );
  request.on("error", () => {});
  request.write(payload);
  request.end();
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
        reject(new Error("请求体过大，请减少参考图数量或尺寸。"));
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
      image_url: {
        url: image.dataUrl
      }
    });
  }

  return content;
}

function postJson(url, headers, body) {
  if (typeof fetch === "function") {
    return fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(async (response) => ({
      ok: response.ok,
      status: response.status,
      text: await response.text()
    }));
  }

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
        headers: {
          ...headers,
          "Content-Length": Buffer.byteLength(payload)
        }
      },
      (response) => {
        let text = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          text += chunk;
        });
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

  // #region debug-point B:handle-generate-input
  debugEvent("pre-fix", "B", "server.js:handleGenerate:input", "[DEBUG] 服务端收到生成请求", {
    model,
    size,
    count,
    promptLength: prompt.length,
    imageCount: Array.isArray(payload.images) ? payload.images.length : 0
  });
  // #endregion

  if (!apiKey) {
    sendJson(res, 400, { error: "请先填写并保存 API Key。" });
    return;
  }

  if (!prompt) {
    sendJson(res, 400, { error: "请输入要生成的图像内容。" });
    return;
  }

  if (!["gpt-image-2", "codex-gpt-image-2"].includes(model)) {
    sendJson(res, 400, { error: "模型选择无效。" });
    return;
  }

  const requestBody = {
    model,
    messages: [
      {
        role: "user",
        content: contentForPrompt(prompt, payload.images)
      }
    ],
    stream: false
  };

  if (count > 1) requestBody.n = count;
  if (size !== "auto") requestBody.size = size;

  // #region debug-point B:handle-generate-upstream-request
  debugEvent("pre-fix", "B", "server.js:handleGenerate:upstream-request", "[DEBUG] 服务端转发上游请求", {
    model: requestBody.model,
    hasN: Object.prototype.hasOwnProperty.call(requestBody, "n"),
    n: requestBody.n ?? null,
    hasSize: Object.prototype.hasOwnProperty.call(requestBody, "size"),
    size: requestBody.size ?? null,
    contentTypes: requestBody.messages?.[0]?.content?.map((item) => item.type) || []
  });
  // #endregion

  try {
    const apiResponse = await postJson(
      API_URL,
      {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      requestBody
    );

    const text = apiResponse.text;
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    // #region debug-point B:handle-generate-upstream-response
    debugEvent("pre-fix", "B", "server.js:handleGenerate:upstream-response", "[DEBUG] 上游接口响应", {
      status: apiResponse.status,
      ok: apiResponse.ok,
      textLength: text.length,
      topLevelKeys: Object.keys(data || {}).slice(0, 12),
      dataArrayLength: Array.isArray(data?.data) ? data.data.length : null,
      choiceLength: Array.isArray(data?.choices) ? data.choices.length : null,
      errorMessage: data?.error?.message || data?.message || null
    });
    // #endregion

    if (!apiResponse.ok) {
      sendJson(res, apiResponse.status, {
        error:
          data?.error?.message ||
          data?.message ||
          `生成接口返回 ${apiResponse.status}`,
        detail: data
      });
      return;
    }

    sendJson(res, 200, data);
  } catch (error) {
    sendJson(res, 502, {
      error: `无法连接生成接口：${API_URL}。请检查网络或 IMAGE2SVIP_API_URL 配置。`,
      detail: error.message
    });
  }
}

function serveFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const isImageAsset = pathname.startsWith("/img/");
  const baseDir = isImageAsset ? IMG_DIR : PUBLIC_DIR;
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(isImageAsset ? 5 : 1);
  const filePath = path.resolve(baseDir, relativePath);

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        fs.readFile(path.join(PUBLIC_DIR, "index.html"), (fallbackError, html) => {
          if (fallbackError) {
            res.writeHead(404);
            res.end("Not Found");
            return;
          }

          res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
          res.end(html);
        });
        return;
      }

      res.writeHead(500);
      res.end("Server Error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/generate") {
    handleGenerate(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveFile(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method Not Allowed");
});

server.listen(PORT, () => {
  console.log(`image2svip is running at http://localhost:${PORT}`);
  console.log(`Proxy endpoint: ${API_URL}`);
});
