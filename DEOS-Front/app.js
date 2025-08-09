const DEFAULT_CONFIG = { API_BASE_URL: "http://localhost:8000" };
let CONFIG = { ...DEFAULT_CONFIG };

async function loadConfig() {
  try {
    const res = await fetch("./config.json", { cache: "no-store" });
    if (!res.ok) throw new Error("config.json no encontrado");
    const data = await res.json();
    CONFIG = { ...DEFAULT_CONFIG, ...data };
  } catch (err) {
    // usa defaults
  }
  document.getElementById("api-base").textContent = CONFIG.API_BASE_URL;
  document.getElementById("settings-api-base").textContent = CONFIG.API_BASE_URL;
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  toast.style.borderColor = type === "error" ? "#7f1d1d" : type === "success" ? "#065f46" : "#374151";
  setTimeout(() => toast.classList.remove("show"), 3500);
}

function setApiStatus(status, text) {
  const el = document.getElementById("api-status");
  el.textContent = text || status;
  el.classList.remove("status-ok", "status-error", "status-unknown");
  if (status === "ok") el.classList.add("status-ok");
  else if (status === "error") el.classList.add("status-error");
  else el.classList.add("status-unknown");
}

function showModal(message = "Procesando…", title = "Procesando…") {
  const modal = document.getElementById("modal");
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-text").textContent = message;
  modal.classList.remove("hidden");
}

function updateModal(message, title) {
  if (title) document.getElementById("modal-title").textContent = title;
  if (message !== undefined) document.getElementById("modal-text").textContent = message;
}

function hideModal() {
  document.getElementById("modal").classList.add("hidden");
}

function buildQuery(params) {
  const p = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return p ? `?${p}` : "";
}

async function apiFetch(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 60000);
  const res = await fetch(`${CONFIG.API_BASE_URL}${path}`, {
    ...options,
    signal: controller.signal,
  }).catch((err) => {
    clearTimeout(timeout);
    throw err;
  });
  clearTimeout(timeout);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let detail = text;
    try { detail = JSON.parse(text).detail ?? text; } catch (_) {}
    const error = new Error(`HTTP ${res.status}: ${detail}`);
    error.status = res.status;
    throw error;
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  const text = await res.text();
  try { return JSON.parse(text); } catch (_) { return text; }
}

function validateYouTubeUrl(url) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(url);
}

function renderProcessResult(result) {
  const container = document.getElementById("process-result");
  const tags = (result.tags || []).map(t => `<span class="tag">${t.tag} (${(t.score*100).toFixed(0)}%)</span>`).join(" ");
  const transcriptPreview = (result.transcript || "").slice(0, 400);
  container.innerHTML = `
    <div class="card">
      <h3>${result.title || "Sin título"}</h3>
      <div class="kv">
        <div><strong>URL</strong></div><div><a href="${result.url}" target="_blank">${result.url}</a></div>
        <div><strong>Audio</strong></div><div>${result.audio_path || "-"}</div>
        <div><strong>Duración</strong></div><div>${result.duration ?? "-"} s</div>
        <div><strong>Tema</strong></div><div>${result.topic || "-"}</div>
      </div>
      <h4>Resumen</h4>
      <p>${result.summary || "(sin resumen)"}</p>
      <h4>Transcripción (preview)</h4>
      <p>${transcriptPreview}${(result.transcript || "").length > 400 ? "…" : ""}</p>
      <h4>Clasificaciones</h4>
      <div>${tags || "(sin clasificaciones)"}</div>
    </div>
  `;
}

function renderClassifyResult(result) {
  const container = document.getElementById("classify-result");
  const tags = (result.tags || []).map(t => `
    <div class="video-card">
      <div><strong>${t.tag}</strong></div>
      <div style="margin-top:6px;background:#1f2937;border-radius:6px;overflow:hidden">
        <div style="height:8px;background:var(--success);width:${Math.max(2, Math.round((t.score||0)*100))}%"></div>
      </div>
      <small>${(t.score*100).toFixed(1)}%</small>
    </div>
  `).join("");
  container.innerHTML = tags || `<div class="card">Sin resultados</div>`;
}

function renderVideosList(list) {
  const el = document.getElementById("videos-list");
  el.innerHTML = (list || []).map(v => `
    <div class="video-card">
      <h4>${v.title || "Sin título"}</h4>
      <div class="kv">
        <div>id</div><div>${v.id}</div>
        <div>topic</div><div>${v.topic || "-"}</div>
        <div>duración</div><div>${v.duration ?? "-"} s</div>
        <div>creado</div><div>${v.created_at || "-"}</div>
      </div>
      <div style="margin-top:8px;display:flex;gap:8px">
        <button class="btn btn-secondary" data-action="detail" data-id="${v.id}">Detalles</button>
      </div>
    </div>
  `).join("");
}

function renderVideoDetail(detail) {
  const container = document.getElementById("video-detail");
  const tags = (detail.classifications || []).map(t => `<span class="tag">${t.tag} (${Math.round(t.score*100)}%)</span>`).join(" ");
  const transcriptPreview = (detail.transcript?.text || "").slice(0, 600);
  container.innerHTML = `
    <div class="card">
      <h3>${detail.title || "Sin título"}</h3>
      <div class="kv">
        <div>id</div><div>${detail.id}</div>
        <div>topic</div><div>${detail.topic || "-"}</div>
        <div>duración</div><div>${detail.duration ?? "-"} s</div>
        <div>audio</div><div>${detail.audio?.path || "-"}</div>
        <div>creado</div><div>${detail.created_at || "-"}</div>
      </div>
      <h4>Resumen</h4>
      <p>${detail.summary?.text || "(sin resumen)"}</p>
      <h4>Transcripción (preview)</h4>
      <p>${transcriptPreview}${(detail.transcript?.text || "").length > 600 ? "…" : ""}</p>
      <h4>Clasificaciones</h4>
      <div>${tags || "(sin clasificaciones)"}</div>
    </div>
  `;
}

function renderPdfResult(result) {
  const container = document.getElementById("pdf-result");
  const tags = (result.tags || []).map(t => `<span class="tag">${t.tag} (${Math.round(t.score*100)}%)</span>`).join(" ");
  const textPreview = (result.extracted_text || "").slice(0, 600);
  container.innerHTML = `
    <div class="card">
      <h3>${result.message || "PDF procesado"}</h3>
      <div class="kv">
        <div>file_path</div><div>${result.file_path || "-"}</div>
        <div>topic</div><div>${result.topic || "-"}</div>
        <div>level</div><div>${result.level || "-"}</div>
      </div>
      <h4>Resumen</h4>
      <p>${result.summary || "(sin resumen)"}</p>
      <h4>Texto extraído (preview)</h4>
      <p>${textPreview}${(result.extracted_text || "").length > 600 ? "…" : ""}</p>
      <h4>Clasificaciones</h4>
      <div>${tags || "(sin clasificaciones)"}</div>
    </div>
  `;
}

function wireTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  tabs.forEach(btn => btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const target = document.querySelector(btn.dataset.target);
    if (target) target.classList.add("active");
  }));
}

async function checkApi() {
  try {
    await apiFetch("/openapi.json", { timeoutMs: 8000 });
    setApiStatus("ok", "Conectada");
    showToast("API disponible", "success");
  } catch (err) {
    setApiStatus("error", "Sin conexión");
    showToast(`No se pudo conectar a la API: ${err.message}`, "error");
  }
}

function wireActions() {
  document.getElementById("btn-check-api").addEventListener("click", checkApi);
  document.getElementById("modal-close").addEventListener("click", hideModal);

  document.getElementById("form-process").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button[type="submit"]');
    const urlInput = document.getElementById("process-url");
    const topicInput = document.getElementById("process-topic");
    const levelSelect = document.getElementById("process-level");

    const url = urlInput.value.trim();
    const topic = topicInput.value.trim() || undefined;
    const level = levelSelect.value;

    if (!validateYouTubeUrl(url)) {
      showToast("URL de YouTube inválida", "error");
      urlInput.focus();
      return;
    }

    // feedback UI
    btn.disabled = true;
    form.setAttribute('aria-busy', 'true');
    showModal("Estamos procesando tu video. Este proceso puede tardar entre 15 y 45 segundos.", "Procesando video");

    // limpiar campos
    urlInput.value = "";
    topicInput.value = "";
    levelSelect.value = levelSelect.value || "medium";

    try {
      const result = await apiFetch("/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, topic, summary_level: level })
      });
      renderProcessResult(result);
      updateModal("Procesamiento completado. Revisa los resultados debajo.", "Completado");
    } catch (err) {
      updateModal(`Se produjo un error: ${err.message}`, "Error");
    } finally {
      btn.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });

  document.getElementById("form-classify").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button[type="submit"]');
    const textArea = document.getElementById("classify-text");
    const text = textArea.value.trim();
    const top_k = Number(document.getElementById("classify-topk").value);
    const threshold = Number(document.getElementById("classify-threshold").value);
    if (!text) { showToast("Ingresa un texto", "error"); textArea.focus(); return; }

    btn.disabled = true;
    form.setAttribute('aria-busy', 'true');
    showModal("Clasificando texto…", "Clasificar");

    try {
      const result = await apiFetch("/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, top_k, threshold })
      });
      renderClassifyResult(result);
      updateModal("Clasificación lista.", "Completado");
    } catch (err) {
      updateModal(`Error: ${err.message}`, "Error");
    } finally {
      btn.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });

  document.getElementById("form-videos-filters").addEventListener("submit", async (e) => {
    e.preventDefault();
    const skip = Number(document.getElementById("videos-skip").value);
    const limit = Number(document.getElementById("videos-limit").value);
    const topic = document.getElementById("videos-topic").value.trim();
    const tag = document.getElementById("videos-tag").value.trim();
    try {
      const query = buildQuery({ skip, limit, topic, tag });
      const result = await apiFetch(`/videos/${query}`);
      renderVideosList(result);
      showToast("Lista actualizada", "success");
    } catch (err) {
      showToast(`Error: ${err.message}`, "error");
    }
  });

  document.getElementById("videos-list").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action='detail']");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    try {
      const result = await apiFetch(`/videos/${id}`);
      renderVideoDetail(result);
    } catch (err) {
      showToast(`Error: ${err.message}`, "error");
    }
  });

  document.getElementById("form-pdf").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const btn = formEl.querySelector('button[type="submit"]');
    const file = document.getElementById("pdf-file").files[0];
    const topicEl = document.getElementById("pdf-topic");
    const levelEl = document.getElementById("pdf-level");
    const topic = topicEl.value.trim() || undefined;
    const level = levelEl.value;
    if (!file) { showToast("Selecciona un PDF", "error"); return; }

    btn.disabled = true;
    formEl.setAttribute('aria-busy', 'true');
    showModal("Procesando PDF…", "PDF");

    const form = new FormData();
    form.append("file", file);
    if (topic) form.append("topic", topic);
    if (level) form.append("level", level);
    try {
      const result = await apiFetch("/ingest/pdf", { method: "POST", body: form });
      renderPdfResult(result);
      updateModal("PDF procesado.", "Completado");
      // limpiar campos
      document.getElementById("pdf-file").value = "";
      topicEl.value = "";
      levelEl.value = levelEl.value || "short";
    } catch (err) {
      updateModal(`Error: ${err.message}`, "Error");
    } finally {
      btn.disabled = false;
      formEl.setAttribute('aria-busy', 'false');
    }
  });
}

(async function init() {
  wireTabs();
  hideModal();
  await loadConfig();
  // override por query string ?api=https://...
  try {
    const urlParam = new URLSearchParams(location.search).get("api");
    if (urlParam) {
      CONFIG.API_BASE_URL = urlParam;
      document.getElementById("api-base").textContent = CONFIG.API_BASE_URL;
      document.getElementById("settings-api-base").textContent = CONFIG.API_BASE_URL;
    }
  } catch (_) {}
  wireActions();
  setApiStatus("unknown", "Desconocido");
  try { await checkApi(); } catch (_) {}
  // autoload primeros datos
  try {
    const result = await apiFetch(`/videos/${buildQuery({ skip: 0, limit: 10 })}`);
    renderVideosList(result);
  } catch (_) {}
})();