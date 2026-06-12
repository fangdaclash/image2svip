const HISTORY_STORAGE_KEY = "image2svip.history";
const DB_NAME = "image2svip";
const DB_VERSION = 1;
const STORE_NAME = "images";
const THEME_KEY = "image2svip.theme";

let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

async function saveImageToDB(url, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const request = store.add({ id, url: data, originalUrl: url, timestamp: Date.now() });
    request.onsuccess = () => resolve({ id, localUrl: data });
    request.onerror = () => reject(request.error);
  });
}

function getImageFromDB(id) {
  return new Promise((resolve, reject) => {
    if (!db || !id) { resolve(null); return; }
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

function deleteImageFromDB(id) {
  return new Promise((resolve, reject) => {
    if (!db || !id) { resolve(); return; }
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function downloadImage(url) {
  try {
    if (url.startsWith("data:image/")) return url;
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("下载图片失败:", error);
    return url;
  }
}

const state = {
  images: [],
  history: loadHistory(),
  activeHistoryUrl: "",
  currentResults: [],
  currentResultMeta: { pixels: "", sizeLabel: "" },
  activeResultIndex: 0,
  generating: false,
  theme: localStorage.getItem(THEME_KEY) || "dark"
};

const modelMeta = {
  "codex-gpt-image-2": { groups: ["default分组"] },
  "gpt-image-2": { groups: ["default分组", "vip分组"] }
};

const els = {
  apiKey: document.querySelector("#apiKey"),
  model: document.querySelector("#model"),
  prompt: document.querySelector("#prompt"),
  counter: document.querySelector("#counter"),
  saveKey: document.querySelector("#saveKey"),
  clearKey: document.querySelector("#clearKey"),
  keyStatus: document.querySelector("#keyStatus"),
  generate: document.querySelector("#generate"),
  dropZone: document.querySelector("#dropZone"),
  imageInput: document.querySelector("#imageInput"),
  thumbStrip: document.querySelector("#thumbStrip"),
  generationError: document.querySelector("#generationError"),
  size: document.querySelector("#size"),
  sizeText: document.querySelector("#sizeText"),
  sizeOptions: document.querySelector("#sizeOptions"),
  count: document.querySelector("#count"),
  countText: document.querySelector("#countText"),
  countOptions: document.querySelector("#countOptions"),
  clearHistory: document.querySelector("#clearHistory"),
  canvasPanel: document.querySelector(".canvas-panel"),
  canvasStatus: document.querySelector("#canvasStatus"),
  progressPill: document.querySelector("#progressPill"),
  resultGrid: document.querySelector("#resultGrid"),
  imagePreviewModal: document.querySelector("#imagePreviewModal"),
  previewImage: document.querySelector("#previewImage"),
  previewClose: document.querySelector("#previewClose"),
  historyList: document.querySelector("#historyList"),
  toast: document.querySelector("#toast"),
  modelInfoButton: document.querySelector("#modelInfoButton"),
  modelModal: document.querySelector("#modelModal"),
  modalModelName: document.querySelector("#modalModelName"),
  pricingTable: document.querySelector("#pricingTable"),
  sidebar: document.querySelector("#sidebar"),
  rightPanel: document.querySelector("#rightPanel"),
  mobileMenuBtn: document.querySelector("#mobileMenuBtn"),
  mobileSettingsBtn: document.querySelector("#mobileSettingsBtn")
};

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item === "object") : [];
  } catch (error) {
    return [];
  }
}

function isDataImageUrl(url) {
  return typeof url === "string" && url.startsWith("data:image/");
}

function persistHistory() {
  for (let count = state.history.length; count >= 0; count -= 1) {
    try {
      const persisted = state.history.slice(0, count).map((item) => ({
        imageId: item.imageId || null,
        originalUrl: isDataImageUrl(item.originalUrl || item.url) ? "" : item.originalUrl || item.url || "",
        prompt: item.prompt || "",
        model: item.model || "",
        sizeLabel: item.sizeLabel || "",
        pixels: item.pixels || "",
        time: item.time || ""
      }));
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(persisted));
      return;
    } catch (error) {
      if (count === 0) console.warn("Failed to persist history.", error);
    }
  }
}

async function hydrateHistory() {
  const storedHistory = loadHistory();
  if (!storedHistory.length) {
    state.history = [];
    renderHistory();
    return;
  }

  if (!db) {
    try { await openDB(); } catch (error) { console.warn("Failed to open DB.", error); }
  }

  const hydrated = await Promise.all(
    storedHistory.map(async (item) => {
      if (item.imageId) {
        try {
          const savedImage = await getImageFromDB(item.imageId);
          if (savedImage?.url) {
            return { ...item, url: savedImage.url, originalUrl: savedImage.originalUrl || item.originalUrl || savedImage.url };
          }
        } catch (error) { console.warn("Failed to restore image.", error); }
      }
      if (item.originalUrl) return { ...item, url: item.originalUrl };
      return null;
    })
  );

  state.history = hydrated.filter(Boolean).slice(0, 12);
  renderHistory();
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  setTheme(state.theme === "dark" ? "light" : "dark");
}

function toggleSidebar() {
  els.sidebar.classList.toggle("open");
  els.rightPanel.classList.remove("open");
}

function toggleSettings() {
  els.rightPanel.classList.toggle("open");
  els.sidebar.classList.remove("open");
}

function closeMobilePanels() {
  els.sidebar.classList.remove("open");
  els.rightPanel.classList.remove("open");
}

async function init() {
  setTheme(state.theme);

  const savedKey = localStorage.getItem("image2svip.apiKey");
  const savedModel = localStorage.getItem("image2svip.model");
  const savedSize = localStorage.getItem("image2svip.size");
  const savedCount = localStorage.getItem("image2svip.count");

  if (savedKey) { els.apiKey.value = savedKey; setKeyStatus(true); }
  if (savedModel && modelMeta[savedModel]) els.model.value = savedModel;
  els.size.value = savedSize && els.size.querySelector(`option[value="${savedSize}"]`) ? savedSize : "auto";
  els.count.value = savedCount && els.count.querySelector(`option[value="${savedCount}"]`) ? savedCount : "1";

  document.querySelectorAll('.control-group').forEach(group => {
    group.classList.add('is-open');
    const header = group.querySelector('.control-header');
    if (header) header.setAttribute('aria-expanded', 'true');
  });

  await hydrateHistory();
  updateCount();
  syncOptionControls();
  renderPricing();
}

function setKeyStatus(saved) {
  els.keyStatus.classList.toggle("saved", saved);
  els.keyStatus.querySelector("span").textContent = saved ? "已保存 Key" : "等待保存 Key";
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
}

function showGenerationError(message) {
  els.generationError.textContent = message;
  els.generationError.hidden = false;
}

function clearGenerationError() {
  els.generationError.textContent = "";
  els.generationError.hidden = true;
}

function updateCount() {
  els.counter.textContent = `${els.prompt.value.trim().length} 字`;
}

function selectedSizeButton() {
  return els.sizeOptions.querySelector(`[data-value="${CSS.escape(els.size.value)}"]`);
}

function selectedSizeLabel() {
  return selectedSizeButton()?.dataset.label || els.size.options[els.size.selectedIndex].textContent;
}

function selectedSizePixels() {
  return selectedSizeButton()?.dataset.pixels || "1536 x 1024";
}

function syncOptionControls() {
  const sizeButton = selectedSizeButton();
  const countButton = els.countOptions.querySelector(`[data-value="${CSS.escape(els.count.value)}"]`);

  els.sizeOptions.querySelectorAll(".option-tile").forEach((button) => {
    button.classList.toggle("is-active", button === sizeButton);
  });

  els.countOptions.querySelectorAll(".option-tile").forEach((button) => {
    button.classList.toggle("is-active", button === countButton);
  });

  els.sizeText.textContent = selectedSizeLabel();
  els.countText.textContent = `${els.count.value} 张`;
}

function setGenerating(isGenerating) {
  state.generating = isGenerating;
  els.canvasPanel.classList.toggle("is-generating", isGenerating);
  els.generate.disabled = isGenerating;

  if (isGenerating) {
    els.generate.innerHTML = spinnerIcon() + "<span>生成中</span>";
    els.canvasStatus.style.display = "";
    els.canvasStatus.querySelector("span").textContent = `并发生成中 0 / ${els.count.value}`;
    els.progressPill.innerHTML = spinnerIcon() + `<span>并发生成中 0 / ${els.count.value}</span>`;
    renderPendingResults(Number(els.count.value));
  } else {
    els.generate.innerHTML = sparkleIcon() + "<span>生成图像</span>";
  }
}

function sparkleIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="m17.8 6.2 1.4-1.4"></path><path d="m10.8 13.2 1.4-1.4"></path><path d="m17.8 11.8 1.4 1.4"></path><path d="M3 21 14 10"></path></svg>`;
}

function spinnerIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path></svg>`;
}

function checkIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"></path></svg>`;
}

function copyIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`;
}

function downloadIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="M7 10l5 5 5-5"></path><path d="M12 15V3"></path></svg>`;
}

function renderThumbs() {
  els.thumbStrip.hidden = state.images.length === 0;
  els.thumbStrip.innerHTML = state.images
    .map((image) => `<img src="${image.dataUrl}" alt="${escapeHtml(image.name)}" />`)
    .join("");
}

function renderHistory() {
  els.clearHistory.hidden = state.history.length === 0;

  if (state.history.length === 0) {
    els.historyList.innerHTML = "<p>暂无图像</p>";
    return;
  }

  els.historyList.innerHTML = state.history
    .slice(0, 8)
    .map(
      (item, index) => `
        <button class="history-item ${
          item.url === state.activeHistoryUrl || (!state.activeHistoryUrl && index === 0) ? "is-active" : ""
        }" type="button" data-history-index="${index}">
          <img src="${item.url}" alt="" />
          <div class="history-meta">
            <strong>${escapeHtml(item.prompt?.slice(0, 20) || "未命名")}</strong>
            <span>${escapeHtml(item.time)} · ${escapeHtml(item.sizeLabel || "智能")}</span>
          </div>
        </button>
      `
    )
    .join("");
}

function renderPendingResults(count) {
  els.resultGrid.classList.add("is-pending");
  els.resultGrid.innerHTML = `
    <div class="generation-list">
      ${Array.from({ length: count }, (_, index) => `
        <div class="generation-card">
          <span class="generation-icon">${spinnerIcon()}</span>
          <strong>第 ${index + 1} 张生成中</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPricing() {
  const model = els.model.value;
  const groups = modelMeta[model].groups;
  els.modalModelName.textContent = model;
  els.pricingTable.innerHTML = `
    <div class="pricing-head">
      <span>分组</span>
      <span>计费类型</span>
      <span>价格摘要</span>
    </div>
    ${groups.map((group) => `
      <div class="pricing-row">
        <span class="tag">${group}</span>
        <span class="pill">按次计费</span>
        <span><b>模型价格 $1.000</b><small>/ 次</small></span>
      </div>
    `).join("")}
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addFiles(files) {
  const imageFiles = [...files].filter((file) => file.type.startsWith("image/"));
  if (imageFiles.length === 0) { toast("请选择图片文件。"); return; }

  const loaded = await Promise.all(
    imageFiles.slice(0, 6).map(async (file) => ({
      name: file.name,
      dataUrl: await fileToDataUrl(file)
    }))
  );

  state.images = [...state.images, ...loaded].slice(0, 6);
  renderThumbs();
  toast(`已添加 ${loaded.length} 张参考图。`);
}

function createGenerationSnapshot() {
  return {
    apiKey: els.apiKey.value.trim(),
    prompt: els.prompt.value.trim(),
    model: els.model.value,
    size: els.size.value,
    count: Number(els.count.value),
    images: state.images.map((image) => ({ ...image }))
  };
}

function extractImageUrls(data) {
  const urls = [];
  const visit = (value) => {
    if (!value) return;
    if (typeof value === "string") {
      const markdown = value.match(/!\[[^\]]*]\(([^)]+)\)/);
      if (markdown) urls.push(markdown[1]);
      const dataUrl = value.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/);
      if (dataUrl) urls.push(dataUrl[0]);
      const directUrl = value.match(/https?:\/\/[^\s"'<>]+/);
      if (directUrl && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(directUrl[0])) urls.push(directUrl[0]);
      return;
    }
    if (Array.isArray(value)) { value.forEach(visit); return; }
    if (typeof value === "object") {
      if (value.b64_json) urls.push(`data:image/png;base64,${value.b64_json}`);
      if (value.url && typeof value.url === "string") urls.push(value.url);
      if (value.image_url) {
        if (typeof value.image_url === "string") urls.push(value.image_url);
        if (value.image_url.url) urls.push(value.image_url.url);
      }
      if (value.data && typeof value.data === "string" && value.data.startsWith("data:image/")) urls.push(value.data);
      Object.values(value).forEach(visit);
    }
  };
  visit(data?.data);
  visit(data?.image);
  visit(data?.choices?.map((choice) => choice.message?.content));
  return [...new Set(urls)].filter(Boolean);
}

function normalizeResultItems(items) {
  return items.map((item, index) =>
    typeof item === "string" ? { url: item, status: "success", index } : { ...item, index: item.index ?? index }
  );
}

function renderResults(urls, options = {}) {
  const items = normalizeResultItems(urls);
  const successItems = items.filter((item) => item.url);
  const failedItems = items.filter((item) => item.status === "failed");

  if (urls.length === 0) {
    els.canvasStatus.querySelector("span").textContent = "生成完成，但没有识别到图片地址";
    els.progressPill.innerHTML = sparkleIcon() + "<span>无图像结果</span>";
    return;
  }

  const sizeLabel = options.sizeLabel || selectedSizeLabel();
  const fallbackPixels = options.pixels || selectedSizePixels();
  const activeIndex = Math.max(0, Math.min(Math.max(successItems.length - 1, 0), Number(options.activeIndex || 0)));
  const activeItem = successItems[activeIndex];
  const totalCount = options.totalCount || items.length;

  state.currentResults = [...items];
  state.currentResultMeta = { pixels: fallbackPixels, sizeLabel };
  state.activeResultIndex = activeIndex;

  els.resultGrid.classList.remove("is-pending");
  els.progressPill.innerHTML =
    failedItems.length > 0
      ? sparkleIcon() + `<span>已生成 ${successItems.length} 张，失败 ${failedItems.length} 张</span>`
      : checkIcon() + `<span>已生成 ${successItems.length} 张图像</span>`;

  if (!activeItem) {
    els.canvasStatus.style.display = "";
    els.canvasStatus.querySelector("span").textContent = "生成失败";
    els.resultGrid.innerHTML = `<div class="result-switcher">${items.map(renderResultTile).join("")}</div>`;
    return;
  }

  els.canvasStatus.querySelector("span").textContent = "";
  els.canvasStatus.style.display = "none";
  els.resultGrid.innerHTML = `
    <article class="result-frame">
      <img src="${activeItem.url}" alt="生成结果 ${activeItem.index + 1}" data-preview-src="${activeItem.url}" data-dimension-target="result-active" />
      <div class="result-meta">文字 / ${escapeHtml(sizeLabel)} / <span id="result-active">${escapeHtml(fallbackPixels)}</span></div>
      <div class="result-actions">
        <button type="button" data-copy="${activeItem.url}" title="复制">${copyIcon()}</button>
        <a href="${activeItem.url}" download="image2svip-${Date.now()}-${activeItem.index + 1}.png" target="_blank" rel="noreferrer" title="下载">${downloadIcon()}</a>
      </div>
    </article>
    ${totalCount > 1 ? `<div class="result-switcher">${items.map((item) => renderResultTile(item, activeItem)).join("")}</div>` : ""}
  `;

  els.resultGrid.querySelectorAll("img[data-dimension-target]").forEach((image) => {
    image.addEventListener("load", () => {
      const target = document.querySelector(`#${image.dataset.dimensionTarget}`);
      if (target && image.naturalWidth && image.naturalHeight) target.textContent = `${image.naturalWidth} x ${image.naturalHeight}`;
    });
  });
}

function renderResultTile(item, activeItem) {
  if (item.status === "failed") {
    return `<button class="result-tile is-failed" type="button" disabled><span class="result-fail-thumb">失败</span><strong>第 ${item.index + 1} 张失败</strong></button>`;
  }
  return `<button class="result-tile ${activeItem && item.url === activeItem.url ? "is-active" : ""}" type="button" data-result-url="${item.url}"><img src="${item.url}" alt="" /><strong>第 ${item.index + 1} 张</strong></button>`;
}

function errorMessageFromResponse(data, status) {
  const message = data?.error?.message || data?.error || data?.message || data?.detail?.error?.message || data?.detail?.message || data?.detail?.detail || data?.detail || `生成接口返回 ${status}`;
  return typeof message === "string" ? message : JSON.stringify(message);
}

async function requestOneImage(snapshot, index) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: snapshot.apiKey,
      prompt: snapshot.prompt,
      model: snapshot.model,
      size: snapshot.size,
      count: 1,
      images: snapshot.images
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(errorMessageFromResponse(data, response.status));

  const urls = extractImageUrls(data);
  if (urls.length === 0) throw new Error("接口返回成功，但未找到图像。");

  return { index, status: "success", url: urls[0] };
}

async function generate() {
  if (state.generating) return;

  const snapshot = createGenerationSnapshot();
  if (!snapshot.apiKey) { toast("请先填写并保存 API Key。"); els.apiKey.focus(); return; }
  if (!snapshot.prompt) { toast("请输入提示词。"); els.prompt.focus(); return; }

  clearGenerationError();
  setGenerating(true);

  try {
    if (!db) await openDB();

    const total = snapshot.count;
    const settled = await Promise.allSettled(
      Array.from({ length: total }, (_, index) => requestOneImage(snapshot, index))
    );
    const results = settled.map((result, index) =>
      result.status === "fulfilled" ? result.value : { index, status: "failed", error: result.reason?.message || "生成失败" }
    );

    const savedResults = [];
    for (const result of results) {
      if (result.url) {
        try {
          const localData = await downloadImage(result.url);
          const saved = await saveImageToDB(result.url, localData);
          savedResults.push({ ...result, imageId: saved.id, url: saved.localUrl, originalUrl: result.url });
        } catch (error) { savedResults.push(result); }
      } else { savedResults.push(result); }
    }

    const successItems = savedResults.filter((item) => item.url);
    const successUrls = successItems.map((item) => item.url);
    const errors = savedResults.filter((item) => item.status === "failed").map((item) => item.error);

    if (errors.length > 0) showGenerationError(errors[0]);

    renderResults(savedResults, { totalCount: total });
    saveHistory(successItems, snapshot.prompt);
    state.activeHistoryUrl = successUrls[0] || "";
    renderHistory();
    toast(successUrls.length ? "图像生成完成并已保存到本地。" : "生成失败。");
  } catch (error) {
    els.canvasStatus.querySelector("span").textContent = "生成失败";
    els.progressPill.innerHTML = sparkleIcon() + "<span>生成失败</span>";
    showGenerationError(error.message);
    toast(error.message);
  } finally {
    setGenerating(false);
  }
}

function saveHistory(items, prompt) {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const historyItems = items.map((item) => ({
    imageId: item.imageId || null,
    url: item.url,
    originalUrl: item.originalUrl || item.url,
    prompt,
    model: els.model.value,
    sizeLabel: selectedSizeLabel(),
    pixels: selectedSizePixels(),
    time
  }));

  state.history = [...historyItems, ...state.history].slice(0, 12);
  persistHistory();
}

// Event Listeners
els.prompt.addEventListener("input", updateCount);

els.saveKey.addEventListener("click", () => {
  const key = els.apiKey.value.trim();
  if (!key) { toast("请输入 API Key。"); return; }
  localStorage.setItem("image2svip.apiKey", key);
  setKeyStatus(true);
  toast("API Key 已保存。");
});

els.clearKey.addEventListener("click", () => {
  localStorage.removeItem("image2svip.apiKey");
  els.apiKey.value = "";
  setKeyStatus(false);
  toast("API Key 已清除。");
});

els.model.addEventListener("change", () => {
  localStorage.setItem("image2svip.model", els.model.value);
  renderPricing();
});

document.querySelectorAll(".control-header").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".control-group");
    const expanded = !group.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(!expanded));
  });
});

els.sizeOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".option-tile");
  if (!button) return;
  els.size.value = button.dataset.value;
  localStorage.setItem("image2svip.size", els.size.value);
  syncOptionControls();
});

els.countOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".option-tile");
  if (!button) return;
  els.count.value = button.dataset.value;
  localStorage.setItem("image2svip.count", els.count.value);
  syncOptionControls();
});

els.generate.addEventListener("click", generate);

els.clearHistory.addEventListener("click", async () => {
  const imageIds = state.history.map((item) => item.imageId).filter(Boolean);
  if (!db && imageIds.length > 0) {
    try { await openDB(); } catch (error) { console.warn("Failed to open DB.", error); }
  }
  await Promise.all(imageIds.map((imageId) => deleteImageFromDB(imageId).catch(() => {})));
  state.history = [];
  state.activeHistoryUrl = "";
  localStorage.setItem(HISTORY_STORAGE_KEY, "[]");
  renderHistory();
  toast("历史记录已清空。");
});

els.historyList.addEventListener("click", (event) => {
  const itemButton = event.target.closest(".history-item[data-history-index]");
  if (!itemButton) return;
  const item = state.history[Number(itemButton.dataset.historyIndex)];
  if (!item) return;
  state.activeHistoryUrl = item.url;
  renderResults([item.url], { sizeLabel: item.sizeLabel || "智能", pixels: item.pixels || selectedSizePixels() });
  renderHistory();
});

els.dropZone.addEventListener("click", () => els.imageInput.click());
els.imageInput.addEventListener("change", (event) => addFiles(event.target.files));

for (const eventName of ["dragenter", "dragover"]) {
  els.dropZone.addEventListener(eventName, (event) => { event.preventDefault(); els.dropZone.classList.add("dragging"); });
}

for (const eventName of ["dragleave", "drop"]) {
  els.dropZone.addEventListener(eventName, (event) => { event.preventDefault(); els.dropZone.classList.remove("dragging"); });
}

els.dropZone.addEventListener("drop", (event) => addFiles(event.dataTransfer.files));

els.resultGrid.addEventListener("click", async (event) => {
  const resultTile = event.target.closest(".result-tile[data-result-url]");
  if (resultTile) {
    const successItems = state.currentResults.filter((item) => item.url);
    const activeIndex = successItems.findIndex((item) => item.url === resultTile.dataset.resultUrl);
    renderResults(state.currentResults, { ...state.currentResultMeta, activeIndex: Math.max(0, activeIndex), totalCount: state.currentResults.length });
    return;
  }

  const image = event.target.closest("img[data-preview-src]");
  if (image) {
    els.previewImage.src = image.dataset.previewSrc;
    els.previewImage.alt = image.alt || "放大预览";
    els.imagePreviewModal.showModal();
    return;
  }

  const button = event.target.closest("button[data-copy]");
  if (!button) return;
  await navigator.clipboard.writeText(button.dataset.copy);
  toast("图像地址已复制。");
});

els.previewClose.addEventListener("click", () => els.imagePreviewModal.close());

els.imagePreviewModal.addEventListener("click", (event) => {
  if (event.target === els.imagePreviewModal) els.imagePreviewModal.close();
});

els.imagePreviewModal.addEventListener("close", () => els.previewImage.removeAttribute("src"));

els.modelInfoButton.addEventListener("click", () => {
  renderPricing();
  els.modelModal.showModal();
});

document.querySelector(".copy-dot").addEventListener("click", async () => {
  await navigator.clipboard.writeText(els.model.value);
  toast("模型名已复制。");
});

// Mobile menu handlers
if (els.mobileMenuBtn) {
  els.mobileMenuBtn.addEventListener("click", toggleSidebar);
}

if (els.mobileSettingsBtn) {
  els.mobileSettingsBtn.addEventListener("click", toggleSettings);
}

// Close mobile panels when clicking outside
document.addEventListener("click", (event) => {
  if (!els.sidebar.contains(event.target) && !els.rightPanel.contains(event.target)) {
    if (!els.mobileMenuBtn?.contains(event.target) && !els.mobileSettingsBtn?.contains(event.target)) {
      closeMobilePanels();
    }
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // Escape to close modals/panels
  if (event.key === "Escape") {
    closeMobilePanels();
    if (els.imagePreviewModal.open) els.imagePreviewModal.close();
    if (els.modelModal.open) els.modelModal.close();
  }

  // Cmd/Ctrl + Enter to generate
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    if (!state.generating) generate();
  }

  // Cmd/Ctrl + K to focus prompt
  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    event.preventDefault();
    els.prompt.focus();
  }

  // Cmd/Ctrl + / to toggle theme
  if ((event.metaKey || event.ctrlKey) && event.key === "/") {
    event.preventDefault();
    toggleTheme();
  }
});

// Initialize
init();
