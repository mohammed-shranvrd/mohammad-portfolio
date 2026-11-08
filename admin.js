/* =====================================================================
   ADMIN PANEL — Mohammad Sahranavard
   admin.js

   چرخه‌ی کار:
   ورود (نام کاربری/گذرواژه) → ویرایش محتوا در پیش‌نویس محلی →
   «انتشار تغییرات» → ثبت یک کامیت در مخزن گیت‌هاب (content.json + تصاویر جدید)
   → گیت‌هاب‌پیجز سایت را به‌روز می‌کند. سایت در هر بار باز شدن content.json
   را می‌خواند؛ اگر نبود، محتوای پیش‌فرض داخل script.js نمایش داده می‌شود.
   ===================================================================== */
(() => {
  "use strict";

  /* ---------- پیکربندی ---------- */
  const AUTH_HASH = "927fe7fee924564cda214bfa63fb658852d6a7e89127d6387830532e98602525"; /* SHA-256(user + "\0" + pass) */
  const IMAGES_DIR = "Image";
  const CONTENT_FILE = "content.json";
  const MAX_ATTEMPTS = 5, LOCK_MS = 30000;
  const LS = { draft: "msp.draft.v1", conn: "msp.conn.v1", last: "msp.last.v1" };
  const SS = { sess: "msp.session", token: "msp.token" };
  const API = "https://api.github.com";

  /* محتوای پیش‌فرض — دقیقاً برابر با بخش محتوای script.js سایت */
  const DEFAULTS = {
    version: 1,
    about: { text: "من محمد صحرانورد هستم، طراح گرافیک. مدتی است مسیر طراحی را به‌صورت جدی دنبال می‌کنم و بیشتر آنچه آموخته‌ام حاصل تمرین، آزمون‌وخطا و یادگیری شخصی بوده است. همیشه کنجکاوم چیزهای تازه یاد بگیرم و خودم را به چالش بکشم. در طراحی، زیبایی بصری و توجه به جزئیات برایم اهمیت زیادی دارد؛ هر پروژه فرصتی است برای خلق، یادگیری و پیشرفت." },
    experience: { items: [
      "همکاری با کانون تبلیغاتی مهرافزا در طراحی محتوای گرافیکی و تبلیغاتی",
      "همکاری در پروژه‌های آموزش‌وپرورش خراسان جنوبی",
      "مشارکت در فعالیت‌های کانون‌های فرهنگی",
      "حضور در کارگاه استانی تولید آثار گرافیکی",
    ] },
    skills: { items: [
      { name: "Photoshop", percent: 75 }, { name: "Illustrator", percent: 15 },
      { name: "Premiere Pro", percent: 15 }, { name: "Figma", percent: 20 },
    ] },
    works: { items: [
      { file: "Image-1.png",  tag: "بنر استوری", description: "" }, { file: "Image-2.png",  tag: "بنر استوری", description: "" },
      { file: "Image-3.png",  tag: "بنر استوری", description: "" }, { file: "Image-4.jpg",  tag: "بنر استوری", description: "" },
      { file: "Image-5.jpg",  tag: "فتومونتاژ",  description: "" }, { file: "Image-6.jpg",  tag: "فتومونتاژ",  description: "" },
      { file: "Image-7.jpg",  tag: "فتومونتاژ",  description: "" }, { file: "Image-8.png",  tag: "بنر استوری", description: "" },
      { file: "Image-9.jpg",  tag: "بنر استوری", description: "" }, { file: "Image-10.png", tag: "بنر استوری", description: "" },
      { file: "Image-11.jpg", tag: "بنر استوری", description: "" }, { file: "Image-12.png", tag: "بنر استوری", description: "" },
      { file: "Image-13.jpg", tag: "پوستر",      description: "" }, { file: "Image-14.jpg", tag: "پوستر",      description: "" },
      { file: "Image-15.jpg", tag: "پوستر",      description: "" }, { file: "Image-16.jpg", tag: "پوستر",      description: "" },
      { file: "Image-17.jpg", tag: "پوستر",      description: "" }, { file: "Image-18.jpg", tag: "پوستر",      description: "" },
      { file: "Image-19.jpg", tag: "پوستر",      description: "" }, { file: "Image-20.jpg", tag: "پوستر",      description: "" },
      { file: "Image-21.jpg", tag: "بنر",        description: "" },
    ] },
    contact: {
      phone: "09013623335", id: "", email: "",
      lead: "برای همکاری یا سفارش طراحی، از راه‌های زیر در دسترس هستم.",
      platforms: [{ key: "instagram", enabled: true }, { key: "telegram", enabled: true }, { key: "whatsapp", enabled: true }],
    },
    cta: { text: "وقتشه کسب‌وکارت بهتر دیده بشه.", button: "شروع گفتگو" },
  };
  const PLATFORMS = [
    { key: "instagram", label: "اینستاگرام", icon: '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>' },
    { key: "telegram",  label: "تلگرام",     icon: '<svg viewBox="0 0 24 24"><path d="M20.5 4.5 3.8 11.1c-.9.4-.9 1.1 0 1.4l4.2 1.3 1.6 5c.2.5.8.6 1.2.2l2.3-2.1 4.4 3.2c.6.4 1.3.1 1.5-.7l3-14c.2-.9-.6-1.4-1.5-.9ZM9 13.4l8.1-5.1-6.3 6.3-.3 3.1-1.5-4.3Z" fill="currentColor"/></svg>' },
    { key: "whatsapp",  label: "واتساپ",     icon: '<svg viewBox="0 0 24 24"><path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>' },
  ];
  const LINK_ICON = '<svg viewBox="0 0 24 24"><path d="M10.2 13.8a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1.3 1.3M13.8 10.2a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.3-1.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const uid = () => "c_" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
  /* فقط http(s)؛ بدون پروتکل → https:// */
  const normUrl = (v) => {
    let s = String(v || "").trim();
    if (!s) return "";
    if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = "https://" + s;
    if (!/^https?:\/\//i.test(s)) return "";
    try { const u = new URL(s); return u.hostname.includes(".") ? u.href : ""; } catch (e) { return ""; }
  };
  /* فهرست پلتفرم‌ها: پیش‌فرض‌ها ({key, enabled}) + سفارشی‌ها ({key:"custom", id, label, url, enabled}) — ترتیب آرایه = ترتیب نمایش */
  const normalizePlatforms = (list) => {
    const out = [], seen = new Set();
    (Array.isArray(list) ? list : []).forEach((p, i) => {
      if (!p || typeof p !== "object") return;
      if (p.key === "custom") {
        out.push({ key: "custom", id: typeof p.id === "string" && p.id ? p.id : "c_" + i, label: typeof p.label === "string" ? p.label.trim() : "", url: typeof p.url === "string" ? p.url.trim() : "", enabled: p.enabled !== false });
      } else if (PLATFORMS.some((x) => x.key === p.key) && !seen.has(p.key)) {
        seen.add(p.key); out.push({ key: p.key, enabled: p.enabled !== false });
      }
    });
    PLATFORMS.forEach((x) => { if (!seen.has(x.key)) out.push({ key: x.key, enabled: true }); });
    return out;
  };
  const VIEWS = {
    dashboard: ["داشبورد", "نمای کلی وضعیت سایت"],
    works:     ["آثار", "افزودن، مرتب‌سازی و آرشیو نمونه‌کارها"],
    about:     ["درباره‌ی من", "متن معرفی، تجربه‌ها و نرم‌افزارها"],
    contact:   ["تماس", "راه‌های ارتباطی و شعار دعوت"],
    settings:  ["اتصال و تنظیمات", "اتصال به گیت‌هاب، پشتیبان‌گیری و بازیابی"],
  };

  /* ---------- ابزارها ---------- */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const FA = "۰۱۲۳۴۵۶۷۸۹";
  const fa = (v) => String(v).replace(/\d/g, (d) => FA[+d]);
  const en = (v) => String(v).replace(/[۰-۹]/g, (d) => FA.indexOf(d)).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const deep = (o) => JSON.parse(JSON.stringify(o));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const faDate = (d) => {
    try { return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(d)); }
    catch { return fa(new Date(d).toLocaleString()); }
  };
  const ICON = {
    up:    '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    down:  '<svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left:  '<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    edit:  '<svg viewBox="0 0 24 24"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3ZM13.5 6.5l3 3"/></svg>',
    hide:  '<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M6.5 6.6C4.3 8 3 10 2.5 12c1.5 3.5 5 6 9.5 6 1.6 0 3-.3 4.3-.9M9.9 5.2C10.6 5.1 11.3 5 12 5c4.5 0 8 2.5 9.5 6-.5 1.2-1.3 2.4-2.3 3.3"/></svg>',
    show:  '<svg viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  };

  function toast(msg, type = "") {
    const el = document.createElement("div");
    el.className = "toast" + (type ? ` toast--${type}` : "");
    el.textContent = msg;
    $("#toasts").appendChild(el);
    setTimeout(() => { el.classList.add("is-out"); setTimeout(() => el.remove(), 400); }, 3600);
  }

  function confirmBox(title, text, okLabel = "تأیید", danger = false) {
    const dlg = $("#modal");
    $("#modal-title").textContent = title;
    $("#modal-text").textContent = text;
    const ok = $("#modal-ok");
    ok.textContent = okLabel;
    ok.classList.toggle("is-danger", danger);
    dlg.returnValue = "";
    dlg.showModal();
    return new Promise((res) => dlg.addEventListener("close", () => res(dlg.returnValue === "ok"), { once: true }));
  }

  /* ---------- رمزنگاری ---------- */
  const enc = new TextEncoder(), dec = new TextDecoder();
  const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  async function sha256(str) {
    const h = await crypto.subtle.digest("SHA-256", enc.encode(str));
    return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function deriveKey(pass, salt) {
    const base = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  async function encrypt(text, pass) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(pass, salt);
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(text));
    return { salt: b64(salt), iv: b64(iv), ct: b64(ct) };
  }
  async function decrypt(obj, pass) {
    const key = await deriveKey(pass, unb64(obj.salt));
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(obj.iv) }, key, unb64(obj.ct));
    return dec.decode(pt);
  }

  /* ---------- وضعیت ---------- */
  const state = {
    content: null,      /* پیش‌نویس جاری */
    remote: null,       /* آخرین نسخه‌ی منتشرشده (یا پیش‌فرض) */
    remoteExists: false,
    pending: new Map(), /* نام فایل → { file, dataURL } */
    conn: null,         /* { owner, repo, branch } */
    token: null,
    password: null,
    repoFiles: new Set(),
    view: "dashboard",
    wtab: "active",
    connOk: null,
    lastPublish: null,
  };

  /* ---------- پاک‌سازی / اعتبارسنجی محتوا ---------- */
  function normalize(d) {
    const out = deep(DEFAULTS);
    if (!d || typeof d !== "object") return out;
    const str = (v) => (typeof v === "string" ? v.trim() : null);
    if (str(d.about?.text)) out.about.text = str(d.about.text);
    if (Array.isArray(d.experience?.items)) out.experience.items = d.experience.items.map(str).filter(Boolean);
    if (Array.isArray(d.skills?.items)) out.skills.items = d.skills.items.filter((s) => s && str(s.name)).map((s) => ({ name: str(s.name), percent: clamp(Math.round(+s.percent || 0), 0, 100) }));
    if (Array.isArray(d.works?.items)) out.works.items = d.works.items.filter((w) => w && str(w.file)).map((w) => {
      const o = { file: str(w.file), tag: str(w.tag) || "", description: str(w.description) || "" };
      if (w.hidden) o.hidden = true;
      if (w.isNew) o.isNew = true;
      return o;
    });
    if (d.contact && typeof d.contact === "object") {
      const c = d.contact;
      if (typeof c.phone === "string") out.contact.phone = en(c.phone).replace(/\D/g, "");
      if (typeof c.id === "string") out.contact.id = /^\*+$/.test(c.id.trim()) ? "" : c.id.trim();
      if (typeof c.email === "string") out.contact.email = /^\*+$/.test(c.email.trim()) ? "" : c.email.trim();
      if (str(c.lead)) out.contact.lead = str(c.lead);
      if (Array.isArray(c.platforms)) out.contact.platforms = normalizePlatforms(c.platforms);
    }
    if (d.cta && typeof d.cta === "object") {
      if (str(d.cta.text)) out.cta.text = str(d.cta.text);
      if (str(d.cta.button)) out.cta.button = str(d.cta.button);
    }
    return out;
  }
  /* نسخه‌ی قابل انتشار (بدون پرچم‌های داخلی) */
  function exportContent(c) {
    const o = normalize(c);
    o.works.items.forEach((w) => delete w.isNew);
    o.contact.phone = o.contact.phone || "";
    o.updatedAt = new Date().toISOString();
    return o;
  }
  const serialize = (c) => JSON.stringify(exportContent({ ...c }), (k, v) => (k === "updatedAt" ? undefined : v));
  const isDirty = () => state.pending.size > 0 || serialize(state.content) !== serialize(state.remote);

  /* ---------- ذخیره‌ی محلی ---------- */
  const saveDraft = debounce(() => {
    try { localStorage.setItem(LS.draft, JSON.stringify(state.content)); } catch {}
    refreshDirty();
  }, 250);
  function loadDraft() { try { const d = localStorage.getItem(LS.draft); return d ? normalize(JSON.parse(d)) : null; } catch { return null; } }
  function clearDraft() { localStorage.removeItem(LS.draft); }

  /* ---------- گیت‌هاب ---------- */
  function parseRepo(input) {
    const s = input.trim().replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\.git$/, "").replace(/\/+$/, "");
    const m = s.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
    return m ? { owner: m[1], repo: m[2] } : null;
  }
  function ghError(e, fallback) {
    if (e && e.status === 401) return "توکن معتبر نیست یا منقضی شده است.";
    if (e && e.status === 403) return "دسترسی کافی نیست؛ مطمئن شوید توکن روی همین مخزن دسترسی Contents: Read and write دارد.";
    if (e && e.status === 404) return "مخزن یا شاخه پیدا نشد؛ آدرس مخزن و نام شاخه را بررسی کنید (و این‌که توکن به این مخزن دسترسی دارد).";
    if (e && e.status === 409) return "تداخل در مخزن؛ چند لحظه بعد دوباره تلاش کنید.";
    if (e && e.status === 422) return "گیت‌هاب درخواست را نپذیرفت: " + (e.message || "");
    if (e && e.name === "TypeError") return "اتصال اینترنت برقرار نیست یا دسترسی به گیت‌هاب مسدود است.";
    return fallback || (e && e.message) || "خطای ناشناخته";
  }
  async function gh(path, opts = {}) {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + state.token,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
    };
    const r = await fetch(API + path, { ...opts, headers, cache: "no-store", body: opts.body ? JSON.stringify(opts.body) : undefined });
    if (!r.ok) {
      let msg = ""; try { msg = (await r.json()).message || ""; } catch {}
      const err = new Error(msg || r.statusText); err.status = r.status; err.message = msg || r.statusText; throw err;
    }
    return r.status === 204 ? null : r.json();
  }
  const repoPath = () => `/repos/${state.conn.owner}/${state.conn.repo}`;

  async function testConnection(conn, token) {
    const saveTok = state.token, saveConn = state.conn;
    state.token = token; state.conn = conn;
    try {
      const repo = await gh(repoPath());
      if (!repo.permissions || !repo.permissions.push) { const e = new Error("no push"); e.status = 403; throw e; }
      await gh(`${repoPath()}/branches/${encodeURIComponent(conn.branch)}`);
      return repo;
    } finally { state.token = saveTok; state.conn = saveConn; }
  }

  async function fetchRemote() {
    /* فهرست فایل‌های پوشه‌ی Image برای جلوگیری از تداخل نام */
    try {
      const list = await gh(`${repoPath()}/contents/${IMAGES_DIR}?ref=${encodeURIComponent(state.conn.branch)}`);
      state.repoFiles = new Set((Array.isArray(list) ? list : []).map((f) => f.name));
    } catch { state.repoFiles = new Set(); }
    /* content.json */
    try {
      const f = await gh(`${repoPath()}/contents/${CONTENT_FILE}?ref=${encodeURIComponent(state.conn.branch)}`);
      const text = dec.decode(unb64(String(f.content || "").replace(/\n/g, "")));
      state.remote = normalize(JSON.parse(text));
      state.remoteExists = true;
    } catch (e) {
      if (e && e.status === 404) { state.remote = deep(DEFAULTS); state.remoteExists = false; }
      else throw e;
    }
  }

  async function publish() {
    const dlg = $("#pub-modal");
    const steps = $$("#pub-steps li");
    const setStep = (name, cls) => { const li = steps.find((l) => l.dataset.step === name); li.className = cls; };
    steps.forEach((l) => (l.className = ""));
    $("#pub-msg").textContent = ""; $("#pub-msg").className = "form__msg";
    $("#pub-view").hidden = true; $("#pub-close").disabled = true;
    const files = [...state.pending.entries()];
    $("#pub-sub").textContent = files.length ? `${fa(files.length)} تصویر جدید و فایل محتوا در یک مرحله ثبت می‌شوند.` : "فقط فایل محتوا به‌روز می‌شود.";
    dlg.showModal();
    const branch = state.conn.branch;
    try {
      setStep("check", "is-active");
      const ref = await gh(`${repoPath()}/git/ref/heads/${encodeURIComponent(branch)}`);
      const headSha = ref.object.sha;
      const head = await gh(`${repoPath()}/git/commits/${headSha}`);
      setStep("check", "is-done");

      const tree = [];
      if (files.length) {
        setStep("upload", "is-active");
        for (const [name, p] of files) {
          const base64 = p.dataURL.split(",")[1];
          const blob = await gh(`${repoPath()}/git/blobs`, { method: "POST", body: { content: base64, encoding: "base64" } });
          tree.push({ path: `${IMAGES_DIR}/${name}`, mode: "100644", type: "blob", sha: blob.sha });
        }
        setStep("upload", "is-done");
      } else setStep("upload", "is-skip");

      setStep("commit", "is-active");
      const json = JSON.stringify(exportContent(state.content), null, 2) + "\n";
      tree.push({ path: CONTENT_FILE, mode: "100644", type: "blob", content: json });
      const newTree = await gh(`${repoPath()}/git/trees`, { method: "POST", body: { base_tree: head.tree.sha, tree } });
      const message = `content: به‌روزرسانی از پنل مدیریت (${files.length ? `${files.length} تصویر جدید، ` : ""}${new Date().toISOString().slice(0, 16).replace("T", " ")})`;
      const commit = await gh(`${repoPath()}/git/commits`, { method: "POST", body: { message, tree: newTree.sha, parents: [headSha] } });
      setStep("commit", "is-done");

      setStep("done", "is-active");
      await gh(`${repoPath()}/git/refs/heads/${encodeURIComponent(branch)}`, { method: "PATCH", body: { sha: commit.sha, force: false } });
      setStep("done", "is-done");

      /* همگام‌سازی وضعیت */
      state.remote = normalize(JSON.parse(json));
      state.remoteExists = true;
      files.forEach(([name]) => state.repoFiles.add(name));
      state.pending.clear();
      state.content.works.items.forEach((w) => delete w.isNew);
      clearDraft();
      state.lastPublish = new Date().toISOString();
      localStorage.setItem(LS.last, state.lastPublish);
      $("#pub-msg").textContent = "انجام شد. گیت‌هاب‌پیجز معمولاً ظرف ۱ تا ۳ دقیقه سایت را به‌روز می‌کند؛ اگر تغییر را ندیدید، صفحه را با Ctrl+F5 تازه کنید.";
      $("#pub-msg").className = "form__msg is-good";
      $("#pub-view").hidden = false;
      renderAll();
      toast("تغییرات با موفقیت منتشر شد.", "ok");
    } catch (e) {
      const active = steps.find((l) => l.classList.contains("is-active"));
      if (active) active.className = "is-bad";
      $("#pub-msg").textContent = "انتشار انجام نشد: " + ghError(e);
      $("#pub-msg").className = "form__msg is-bad";
    } finally {
      $("#pub-close").disabled = false;
    }
  }

  /* ---------- ورود ---------- */
  function initLogin() {
    const form = $("#login-form"), err = $("#login-err"), card = $(".login__card");
    const pass = $("#login-pass");
    $("#login-eye").addEventListener("click", () => { pass.type = pass.type === "password" ? "text" : "password"; pass.focus(); });
    let attempts = 0, lockedUntil = 0;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      err.textContent = "";
      if (Date.now() < lockedUntil) { err.textContent = `به دلیل تلاش‌های ناموفق، ${fa(Math.ceil((lockedUntil - Date.now()) / 1000))} ثانیه صبر کنید.`; return; }
      const u = $("#login-user").value.trim(), p = pass.value;
      if (!u || !p) { err.textContent = "نام کاربری و گذرواژه را وارد کنید."; return; }
      const btn = $("#login-btn"); btn.classList.add("is-busy");
      const ok = (await sha256(u + "\0" + p)) === AUTH_HASH;
      await sleep(350);
      btn.classList.remove("is-busy");
      if (!ok) {
        attempts += 1;
        card.classList.remove("is-shake"); void card.offsetWidth; card.classList.add("is-shake");
        if (attempts >= MAX_ATTEMPTS) { lockedUntil = Date.now() + LOCK_MS; attempts = 0; err.textContent = "تعداد تلاش بیش از حد مجاز؛ ۳۰ ثانیه صبر کنید."; }
        else err.textContent = "نام کاربری یا گذرواژه درست نیست.";
        pass.select();
        return;
      }
      state.password = p;
      sessionStorage.setItem(SS.sess, "1");
      await unlockToken();
      $("#login").classList.add("is-out");
      setTimeout(() => { $("#login").hidden = true; enterApp(); }, 650);
    });
  }

  async function unlockToken() {
    const raw = localStorage.getItem(LS.conn);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      state.conn = { owner: saved.owner, repo: saved.repo, branch: saved.branch || "main" };
      if (saved.token && state.password) {
        state.token = await decrypt(saved.token, state.password);
        sessionStorage.setItem(SS.token, state.token);
      }
    } catch { state.token = null; }
  }

  function logout() {
    sessionStorage.removeItem(SS.sess); sessionStorage.removeItem(SS.token);
    location.reload();
  }

  /* ---------- ورود به پنل ---------- */
  async function enterApp() {
    $("#app").hidden = false;
    document.body.classList.add("is-app");
    state.lastPublish = localStorage.getItem(LS.last);
    const draft = loadDraft();
    state.remote = deep(DEFAULTS);
    state.content = draft || deep(DEFAULTS);
    renderSettings();
    renderAll();
    if (state.conn && state.token) {
      setConn("pending", "در حال اتصال…");
      try {
        await fetchRemote();
        state.connOk = true;
        setConn("ok", `${state.conn.owner}/${state.conn.repo} · ${state.conn.branch}`);
        if (!draft) state.content = deep(state.remote);
        else if (isDirty()) toast("پیش‌نویس منتشرنشده‌ی قبلی بازیابی شد.");
        else state.content = deep(state.remote);
        renderAll();
      } catch (e) {
        state.connOk = false;
        setConn("bad", "اتصال برقرار نشد");
        toast(ghError(e), "bad");
        renderAll();
      }
    } else {
      state.connOk = null;
      setConn("none", "متصل نیست");
      if (draft && isDirty()) toast("پیش‌نویس منتشرنشده‌ی قبلی بازیابی شد.");
    }
    const hash = location.hash.replace("#", "");
    go(VIEWS[hash] ? hash : "dashboard");
  }

  function setConn(kind, text) {
    const chip = $("#chip-conn");
    chip.className = "chip " + ({ ok: "chip--ok", bad: "chip--bad", pending: "chip--muted", none: "chip--muted" }[kind] || "");
    $("#chip-conn-text").textContent = text;
    const dot = $("#side-conn-dot");
    dot.className = "side__dot" + (kind === "ok" ? " is-ok" : kind === "bad" ? " is-bad" : "");
  }

  /* ---------- ناوبری ---------- */
  function go(view, focus) {
    state.view = view;
    $$(".view").forEach((v) => v.classList.toggle("is-active", v.dataset.view === view));
    $$(".side__item").forEach((b) => b.classList.toggle("is-active", b.dataset.go === view));
    $("#top-title").textContent = VIEWS[view][0];
    $("#top-sub").textContent = VIEWS[view][1];
    history.replaceState(null, "", "#" + view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (focus === "add") setTimeout(() => $("#drop").focus(), 350);
  }

  /* ---------- رندر ---------- */
  function refreshDirty() {
    const dirty = isDirty();
    const missing = state.content.works.items.filter((w) => w.isNew && !state.pending.has(w.file)).length;
    $("#chip-dirty").hidden = !dirty;
    $("#chip-dirty-text").textContent = missing ? "فایل‌های گم‌شده را برطرف کنید" : "تغییرات منتشرنشده";
    $("#publish-btn").disabled = !(dirty && state.connOk && !missing);
    $("#publish-btn").title = !state.connOk ? "ابتدا اتصال به مخزن را برقرار کنید" : missing ? "برخی تصویرهای جدید پس از بارگذاری مجدد صفحه در دسترس نیستند" : "";
    renderDashboard();
  }

  function renderAll() {
    renderDashboard();
    renderWorks();
    renderAbout();
    renderContact();
    refreshDirty();
  }

  function renderDashboard() {
    const c = state.content;
    const active = c.works.items.filter((w) => !w.hidden).length;
    const hidden = c.works.items.length - active;
    $("#tiles").innerHTML = [
      [active, "اثر فعال در سایت"], [hidden, "اثر در آرشیو"], [c.experience.items.length, "تجربه‌ی حرفه‌ای"], [c.skills.items.length, "نرم‌افزار تخصصی"],
    ].map(([n, l]) => `<div class="tile"><span class="tile__value">${fa(n)}</span><span class="tile__label">${l}</span></div>`).join("");
    $("#side-works-count").textContent = fa(active);
    $("#setup-notice").hidden = !!(state.conn && state.token);
    const dirty = isDirty();
    const rows = [
      ["اتصال به مخزن", state.connOk ? `<span class="is-ok">متصل · ${esc(state.conn.owner)}/${esc(state.conn.repo)}</span>` : state.conn ? '<span class="is-bad">برقرار نشد</span>' : '<span class="is-warn">تنظیم نشده</span>'],
      ["فایل محتوا در مخزن", state.connOk ? (state.remoteExists ? '<span class="is-ok">content.json موجود است</span>' : '<span class="is-warn">هنوز ساخته نشده (با اولین انتشار ساخته می‌شود)</span>') : "—"],
      ["تغییرات منتشرنشده", dirty ? `<span class="is-warn">بله${state.pending.size ? ` · ${fa(state.pending.size)} تصویر جدید` : ""}</span>` : '<span class="is-ok">ندارید</span>'],
      ["آخرین انتشار از این مرورگر", state.lastPublish ? faDate(state.lastPublish) : "—"],
    ];
    $("#status-list").innerHTML = rows.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("");
  }

  /* --- آثار --- */
  const numOf = (name) => { const m = /^Image-(\d+)\s*\./i.exec(name); return m ? +m[1] : 0; };
  function nextNumber() {
    let n = 0;
    state.content.works.items.forEach((w) => (n = Math.max(n, numOf(w.file))));
    state.repoFiles.forEach((f) => (n = Math.max(n, numOf(f))));
    return n + 1;
  }
  const srcOf = (w) => (state.pending.has(w.file) ? state.pending.get(w.file).dataURL : `${IMAGES_DIR}/${encodeURIComponent(w.file)}`);

  function renderWorks() {
    const items = state.content.works.items;
    const visible = items.map((w, i) => ({ w, i })).filter(({ w }) => (state.wtab === "hidden" ? w.hidden : !w.hidden));
    $("#works-count").textContent = fa(items.filter((w) => !w.hidden).length);
    $("#hidden-count").textContent = fa(items.filter((w) => w.hidden).length);
    $("#next-name").textContent = `Image-${nextNumber()}`;
    $("#works-empty").hidden = visible.length > 0;
    $("#works-empty").textContent = state.wtab === "hidden" ? "آرشیو خالی است." : "هنوز اثری ثبت نشده است.";
    const order = visible.map(({ i }) => i);
    $("#works-list").innerHTML = visible.map(({ w, i }, k) => {
      const missing = w.isNew && !state.pending.has(w.file);
      const badge = missing ? '<span class="work__badge">فایل گم شده</span>' : w.isNew ? '<span class="work__badge">جدید</span>' : "";
      return `
      <li class="work${w.isNew ? " is-new" : ""}${missing ? " is-missing" : ""}" data-i="${i}" style="animation-delay:${Math.min(k, 12) * 30}ms">
        <figure class="work__fig">
          ${missing ? "" : `<img src="${srcOf(w)}" alt="" loading="lazy" decoding="async">`}
          <span class="work__num">${fa(k + 1)}</span>${badge}
        </figure>
        <div class="work__body">
          <span class="work__tag">${esc(w.tag)}</span>
          <span class="work__file">${esc(w.file)}</span>
        </div>
        <div class="work__tools">
          ${state.wtab === "active" ? `
          <button type="button" data-act="prev" title="جلوتر" ${k === 0 ? "disabled" : ""}>${ICON.right}</button>
          <button type="button" data-act="next" title="عقب‌تر" ${k === visible.length - 1 ? "disabled" : ""}>${ICON.left}</button>
          <button type="button" data-act="edit" title="ویرایش برچسب و توضیح">${ICON.edit}</button>
          <span class="spacer"></span>
          <button type="button" data-act="hide" title="انتقال به آرشیو (از سایت پنهان می‌شود)">${ICON.hide}</button>` : `
          <button type="button" data-act="show" title="بازگرداندن به سایت">${ICON.show}</button>
          <button type="button" data-act="edit" title="ویرایش">${ICON.edit}</button>
          <span class="spacer"></span>
          <button type="button" class="is-danger" data-act="delete" title="حذف از فهرست">${ICON.trash}</button>`}
        </div>
      </li>`;
    }).join("");
    $("#works-list").dataset.order = order.join(",");
  }

  function addFiles(fileList) {
    const files = Array.from(fileList || []).filter((f) => /^image\/(png|jpeg|webp)$/.test(f.type));
    if (!files.length) { toast("فقط فایل‌های PNG ، JPG یا WEBP پذیرفته می‌شوند.", "bad"); return; }
    const big = files.filter((f) => f.size > 4 * 1024 * 1024);
    if (big.length) toast(`${fa(big.length)} فایل بزرگ‌تر از ۴ مگابایت است؛ برای سرعت سایت بهتر است فشرده شود.`, "");
    let n = nextNumber();
    const added = [];
    let done = 0;
    files.forEach((f) => {
      const ext = f.type === "image/png" ? "png" : f.type === "image/webp" ? "webp" : "jpg";
      const name = `Image-${n++}.${ext}`;
      const reader = new FileReader();
      reader.onload = () => {
        state.pending.set(name, { file: f, dataURL: reader.result });
        state.content.works.items.push({ file: name, tag: "", description: "", isNew: true });
        added.push(name);
        if (++done === files.length) {
          state.wtab = "active";
          $$(".seg__btn").forEach((b) => b.classList.toggle("is-active", b.dataset.wtab === "active"));
          renderWorks(); saveDraft();
          toast(`${fa(added.length)} اثر به انتهای گالری اضافه شد. برچسب آن را تعیین کنید.`, "ok");
          if (added.length === 1) openWorkEditor(state.content.works.items.length - 1);
        }
      };
      reader.readAsDataURL(f);
    });
  }

  function openWorkEditor(i) {
    const w = state.content.works.items[i];
    if (!w) return;
    const dlg = $("#work-modal");
    $("#we-img").src = state.pending.has(w.file) || !w.isNew ? srcOf(w) : "";
    $("#we-file").textContent = w.file;
    $("#we-tag").value = w.tag; $("#we-desc").value = w.description;
    const tags = [...new Set(state.content.works.items.map((x) => x.tag).filter(Boolean))];
    $("#tag-list").innerHTML = tags.map((t) => `<option value="${esc(t)}">`).join("");
    dlg.returnValue = "";
    dlg.showModal();
    setTimeout(() => $("#we-tag").focus(), 50);
    dlg.addEventListener("close", () => {
      if (dlg.returnValue !== "ok") return;
      w.tag = $("#we-tag").value.trim(); w.description = $("#we-desc").value.trim();
      renderWorks(); saveDraft();
    }, { once: true });
  }

  function initWorks() {
    const drop = $("#drop"), input = $("#file-input");
    input.addEventListener("change", () => { addFiles(input.files); input.value = ""; });
    drop.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } });
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("is-over"); }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("is-over"); }));
    drop.addEventListener("drop", (e) => addFiles(e.dataTransfer.files));
    document.addEventListener("dragover", (e) => e.preventDefault());
    document.addEventListener("drop", (e) => e.preventDefault());

    $$(".seg__btn").forEach((b) => b.addEventListener("click", () => {
      state.wtab = b.dataset.wtab;
      $$(".seg__btn").forEach((x) => x.classList.toggle("is-active", x === b));
      renderWorks();
    }));

    $("#works-list").addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-act]"); if (!btn) return;
      const li = btn.closest(".work"); const i = +li.dataset.i;
      const items = state.content.works.items; const w = items[i];
      const order = $("#works-list").dataset.order.split(",").map(Number);
      const pos = order.indexOf(i);
      const act = btn.dataset.act;
      if (act === "prev" || act === "next") {
        const j = order[pos + (act === "prev" ? -1 : 1)];
        if (j === undefined) return;
        [items[i], items[j]] = [items[j], items[i]];
      } else if (act === "edit") { openWorkEditor(i); return; }
      else if (act === "hide") { w.hidden = true; toast("اثر به آرشیو منتقل شد؛ پس از انتشار از سایت پنهان می‌شود."); }
      else if (act === "show") { delete w.hidden; toast("اثر به سایت بازگردانده شد."); }
      else if (act === "delete") {
        const ok = await confirmBox("حذف از فهرست", `«${w.file}» از فهرست آثار حذف می‌شود. خودِ فایل تصویر در مخزن باقی می‌ماند و چیزی از بین نمی‌رود.`, "حذف", true);
        if (!ok) return;
        items.splice(i, 1);
        if (w.isNew) state.pending.delete(w.file);
      }
      renderWorks(); saveDraft();
    });

    $("#we-cancel").addEventListener("click", () => $("#work-modal").close("cancel"));
  }

  /* --- درباره --- */
  function renderAbout() {
    const c = state.content;
    $("#about-text").value = c.about.text;
    $("#about-text-len").textContent = `${fa(c.about.text.length)} نویسه`;
    $("#exp-list").innerHTML = c.experience.items.map((t, i) => `
      <li class="item" data-i="${i}">
        <span class="item__idx">${fa(i + 1)}</span>
        <input class="field__input" value="${esc(t)}" data-field="exp" placeholder="متن تجربه…">
        <span class="item__tools">
          <button type="button" data-act="up" title="بالا" ${i === 0 ? "disabled" : ""}>${ICON.up}</button>
          <button type="button" data-act="down" title="پایین" ${i === c.experience.items.length - 1 ? "disabled" : ""}>${ICON.down}</button>
          <button type="button" class="is-danger" data-act="del" title="حذف">${ICON.trash}</button>
        </span>
      </li>`).join("");
    $("#skill-list").innerHTML = c.skills.items.map((s, i) => `
      <li class="item" data-i="${i}">
        <span class="item__idx">${fa(i + 1)}</span>
        <input class="field__input" value="${esc(s.name)}" data-field="sname" dir="ltr" placeholder="Software">
        <input class="item__range" type="range" min="0" max="100" value="${s.percent}" data-field="srange" aria-label="درصد">
        <input class="field__input item__pct" value="${fa(s.percent)}٪" data-field="spct" inputmode="numeric" aria-label="درصد">
        <span class="item__tools">
          <button type="button" data-act="up" title="بالا" ${i === 0 ? "disabled" : ""}>${ICON.up}</button>
          <button type="button" data-act="down" title="پایین" ${i === c.skills.items.length - 1 ? "disabled" : ""}>${ICON.down}</button>
          <button type="button" class="is-danger" data-act="del" title="حذف">${ICON.trash}</button>
        </span>
      </li>`).join("");
  }

  function initAbout() {
    $("#about-text").addEventListener("input", (e) => {
      state.content.about.text = e.target.value;
      $("#about-text-len").textContent = `${fa(e.target.value.length)} نویسه`;
      saveDraft();
    });
    const listHandler = (listSel, arrGet, mapEdit) => {
      const list = $(listSel);
      list.addEventListener("input", (e) => {
        const li = e.target.closest(".item"); if (!li) return;
        mapEdit(arrGet(), +li.dataset.i, e.target, li);
        saveDraft();
      });
      list.addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-act]"); if (!btn) return;
        const arr = arrGet(); const i = +btn.closest(".item").dataset.i;
        const act = btn.dataset.act;
        if (act === "up" && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        else if (act === "down" && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
        else if (act === "del") {
          if (arr.length <= 1) { toast("حداقل یک مورد باید باقی بماند.", "bad"); return; }
          arr.splice(i, 1);
        }
        renderAbout(); saveDraft();
      });
    };
    listHandler("#exp-list", () => state.content.experience.items, (arr, i, t) => { arr[i] = t.value; });
    listHandler("#skill-list", () => state.content.skills.items, (arr, i, t, li) => {
      if (t.dataset.field === "sname") arr[i].name = t.value;
      else {
        const v = clamp(Math.round(+en(t.value).replace(/[^\d]/g, "") || 0), 0, 100);
        arr[i].percent = v;
        if (t.dataset.field === "srange") $("[data-field=spct]", li).value = fa(v) + "٪";
        else $("[data-field=srange]", li).value = v;
      }
    });
    $("#skill-list").addEventListener("focusout", (e) => { if (e.target.dataset.field === "spct") renderAbout(); });
    $("#exp-add").addEventListener("click", () => { state.content.experience.items.push(""); renderAbout(); saveDraft(); const inputs = $$("#exp-list input"); inputs[inputs.length - 1]?.focus(); });
    $("#skill-add").addEventListener("click", () => { state.content.skills.items.push({ name: "", percent: 50 }); renderAbout(); saveDraft(); const inputs = $$("#skill-list [data-field=sname]"); inputs[inputs.length - 1]?.focus(); });
  }

  /* --- تماس --- */
  function renderContact() {
    const c = state.content.contact;
    $("#c-phone").value = c.phone; $("#c-id").value = c.id; $("#c-email").value = c.email; $("#c-lead").value = c.lead;
    $("#cta-text").value = state.content.cta.text; $("#cta-button").value = state.content.cta.button;
    c.platforms = normalizePlatforms(c.platforms);
    const n = c.platforms.length;
    const tools = (i, del) => `<span class="item__tools">
          <button type="button" data-act="up" title="بالا" ${i === 0 ? "disabled" : ""}>${ICON.up}</button>
          <button type="button" data-act="down" title="پایین" ${i === n - 1 ? "disabled" : ""}>${ICON.down}</button>
          ${del ? `<button type="button" class="is-danger" data-act="del" title="حذف">${ICON.trash}</button>` : ""}
        </span>`;
    $("#platforms").innerHTML = c.platforms.map((p, i) => {
      if (p.key === "custom") {
        const url = normUrl(p.url);
        const bad = p.url && !url;
        return `<li class="item item--link ${p.enabled ? "" : "is-off"}" data-i="${i}">
        <span class="item__idx" title="لینک سفارشی">${LINK_ICON}</span>
        <input class="field__input item__label" value="${esc(p.label)}" data-field="plabel" placeholder="نام (مثلاً بهانس)" aria-label="نام لینک">
        <input class="field__input item__url ${bad ? "is-invalid" : ""}" value="${esc(p.url)}" data-field="purl" dir="ltr" type="url" placeholder="https://…" spellcheck="false" aria-label="آدرس لینک">
        <label class="toggle toggle--mini" title="${p.enabled ? "فعال" : "غیرفعال"}"><input type="checkbox" data-field="pon" ${p.enabled ? "checked" : ""} aria-label="فعال"><span class="toggle__sw"></span></label>
        ${tools(i, true)}
        <span class="item__note ${bad ? "is-bad" : ""}">${bad ? "آدرس معتبر نیست (باید http یا https باشد)." : !p.label || !url ? "برای نمایش در سایت، نام و آدرس هر دو لازم‌اند." : ""}</span>
      </li>`;
      }
      const def = PLATFORMS.find((x) => x.key === p.key);
      return `<li class="item item--platform ${p.enabled ? "" : "is-off"}" data-i="${i}">
        <span class="item__idx">${def.icon}</span>
        <span class="item__name">${def.label}</span>
        <label class="toggle toggle--mini" title="${p.enabled ? "فعال" : "غیرفعال"}"><input type="checkbox" data-field="pon" ${p.enabled ? "checked" : ""} aria-label="فعال"><span class="toggle__sw"></span></label>
        ${tools(i)}
      </li>`;
    }).join("");
    validateContact();
  }
  function validateContact() {
    const c = state.content.contact;
    const ph = $("#c-phone-help"), eh = $("#c-email-help");
    const d = c.phone.replace(/\D/g, "");
    if (!d) { ph.textContent = "خالی = شماره در سایت نمایش داده نمی‌شود (کارت تماس «به‌زودی» می‌شود)."; ph.className = "field__help"; }
    else if (!/^09\d{9}$/.test(d)) { ph.textContent = "شماره باید ۱۱ رقم و با ۰۹ شروع شود."; ph.className = "field__help is-bad"; }
    else { ph.textContent = `در سایت: ${fa(`${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`)}`; ph.className = "field__help is-good"; }
    if (!c.email) { eh.textContent = "خالی = «به‌زودی»"; eh.className = "field__help"; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) { eh.textContent = "قالب ایمیل درست نیست."; eh.className = "field__help is-bad"; }
    else { eh.textContent = "معتبر"; eh.className = "field__help is-good"; }
  }
  function initContact() {
    const c = () => state.content.contact;
    $("#c-phone").addEventListener("input", (e) => { c().phone = en(e.target.value).replace(/\D/g, ""); e.target.value = c().phone; validateContact(); saveDraft(); });
    $("#c-id").addEventListener("input", (e) => { c().id = e.target.value.trim(); saveDraft(); });
    $("#c-email").addEventListener("input", (e) => { c().email = e.target.value.trim(); validateContact(); saveDraft(); });
    $("#c-lead").addEventListener("input", (e) => { c().lead = e.target.value; saveDraft(); });
    $("#cta-text").addEventListener("input", (e) => { state.content.cta.text = e.target.value; saveDraft(); });
    $("#cta-button").addEventListener("input", (e) => { state.content.cta.button = e.target.value; saveDraft(); });
    const plist = $("#platforms");
    const rowOf = (t) => { const li = t.closest(".item"); return li ? c().platforms[+li.dataset.i] : null; };
    plist.addEventListener("change", (e) => {
      const p = rowOf(e.target); if (!p) return;
      if (e.target.dataset.field === "pon") { p.enabled = e.target.checked; e.target.closest(".item").classList.toggle("is-off", !p.enabled); saveDraft(); }
    });
    /* اعتبارسنجی درجا (بدون رندر مجدد، تا فوکوس کاربر از دست نرود) */
    const refreshLinkRow = (li, p) => {
      const url = normUrl(p.url), bad = !!p.url && !url;
      $("[data-field=purl]", li).classList.toggle("is-invalid", bad);
      const note = $(".item__note", li);
      note.textContent = bad ? "آدرس معتبر نیست (باید http یا https باشد)." : (!p.label || !url ? "برای نمایش در سایت، نام و آدرس هر دو لازم‌اند." : "");
      note.classList.toggle("is-bad", bad);
    };
    plist.addEventListener("input", (e) => {
      const p = rowOf(e.target); if (!p || p.key !== "custom") return;
      if (e.target.dataset.field === "plabel") p.label = e.target.value.trim();
      else if (e.target.dataset.field === "purl") p.url = e.target.value.trim();
      else return;
      refreshLinkRow(e.target.closest(".item"), p);
      saveDraft();
    });
    plist.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-act]"); if (!btn) return;
      const arr = c().platforms; const i = +btn.closest(".item").dataset.i; const act = btn.dataset.act;
      if (act === "up" && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      else if (act === "down" && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
      else if (act === "del") {
        const p = arr[i];
        const ok = await confirmBox("حذف لینک", `لینک «${p.label || p.url || "بدون نام"}» حذف شود؟`, "حذف", true);
        if (!ok) return;
        arr.splice(i, 1);
      }
      renderContact(); saveDraft();
    });
    $("#platform-add").addEventListener("click", () => {
      c().platforms.push({ key: "custom", id: uid(), label: "", url: "", enabled: true });
      renderContact(); saveDraft();
      const inputs = $$("#platforms [data-field=plabel]"); inputs[inputs.length - 1]?.focus();
    });
  }

  /* --- تنظیمات --- */
  function renderSettings() {
    if (state.conn) {
      $("#conn-repo").value = `${state.conn.owner}/${state.conn.repo}`;
      $("#conn-branch").value = state.conn.branch;
      $("#conn-token").placeholder = state.token ? "•••••••••• (ذخیره شده — برای تغییر، توکن جدید را وارد کنید)" : "github_pat_…";
      $("#conn-clear").hidden = false;
    }
  }
  function readConnForm() {
    const repo = parseRepo($("#conn-repo").value);
    const branch = $("#conn-branch").value.trim() || "main";
    const token = $("#conn-token").value.trim() || state.token || "";
    return { repo, branch, token };
  }
  function initSettings() {
    const msg = $("#conn-msg");
    const say = (t, cls = "") => { msg.textContent = t; msg.className = "form__msg " + cls; };
    $("#conn-eye").addEventListener("click", () => { const t = $("#conn-token"); t.type = t.type === "password" ? "text" : "password"; });
    $("#conn-test").addEventListener("click", async () => {
      const { repo, branch, token } = readConnForm();
      if (!repo) return say("آدرس مخزن را به شکل username/repository وارد کنید.", "is-bad");
      if (!token) return say("توکن دسترسی را وارد کنید.", "is-bad");
      $("#conn-test").classList.add("is-busy");
      try { const r = await testConnection({ ...repo, branch }, token); say(`اتصال برقرار است: ${r.full_name} (شاخه‌ی ${branch}) · دسترسی نوشتن تأیید شد.`, "is-good"); }
      catch (e) { say(ghError(e), "is-bad"); }
      finally { $("#conn-test").classList.remove("is-busy"); }
    });
    $("#conn-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const { repo, branch, token } = readConnForm();
      if (!repo) return say("آدرس مخزن را به شکل username/repository وارد کنید.", "is-bad");
      if (!token) return say("توکن دسترسی را وارد کنید.", "is-bad");
      if (!state.password) return say("برای ذخیره‌ی امن توکن، یک‌بار از پنل خارج شوید و دوباره با گذرواژه وارد شوید.", "is-bad");
      $("#conn-save").classList.add("is-busy");
      try {
        await testConnection({ ...repo, branch }, token);
        state.conn = { ...repo, branch }; state.token = token;
        const encTok = await encrypt(token, state.password || "");
        localStorage.setItem(LS.conn, JSON.stringify({ ...state.conn, token: encTok }));
        sessionStorage.setItem(SS.token, token);
        $("#conn-token").value = "";
        renderSettings();
        say("اتصال ذخیره شد. در حال دریافت محتوای فعلی سایت…", "is-good");
        setConn("pending", "در حال اتصال…");
        const hadLocalChanges = isDirty();
        await fetchRemote();
        state.connOk = true;
        setConn("ok", `${state.conn.owner}/${state.conn.repo} · ${state.conn.branch}`);
        if (!hadLocalChanges || !state.remoteExists) {
          if (state.remoteExists) state.content = deep(state.remote);
        } else {
          const keep = await confirmBox("پیش‌نویس محلی", "در این مرورگر تغییراتی ثبت شده که با نسخه‌ی منتشرشده‌ی سایت فرق دارد. پیش‌نویس محلی حفظ شود؟ (در غیر این صورت نسخه‌ی سایت جایگزین می‌شود)", "حفظ پیش‌نویس");
          if (!keep) { state.content = deep(state.remote); clearDraft(); }
        }
        renderAll();
        say(state.remoteExists ? "محتوای فعلی سایت بارگذاری شد." : "اتصال برقرار است. هنوز content.json در مخزن نیست؛ با اولین انتشار ساخته می‌شود.", "is-good");
        toast("اتصال به مخزن برقرار شد.", "ok");
      } catch (err) { state.connOk = false; say(ghError(err), "is-bad"); setConn("bad", "اتصال برقرار نشد"); renderAll(); }
      finally { $("#conn-save").classList.remove("is-busy"); }
    });
    $("#conn-clear").addEventListener("click", async () => {
      const ok = await confirmBox("قطع اتصال", "اطلاعات اتصال و توکن از این مرورگر پاک می‌شود. محتوای سایت تغییری نمی‌کند.", "قطع اتصال", true);
      if (!ok) return;
      localStorage.removeItem(LS.conn); sessionStorage.removeItem(SS.token);
      state.conn = null; state.token = null; state.connOk = null;
      $("#conn-repo").value = ""; $("#conn-branch").value = "main"; $("#conn-token").value = ""; $("#conn-token").placeholder = "github_pat_…"; $("#conn-clear").hidden = true;
      setConn("none", "متصل نیست"); renderAll(); say("اتصال قطع شد.");
    });

    /* پشتیبان‌گیری */
    const backup = () => {
      const blob = new Blob([JSON.stringify(exportContent(state.content), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `content-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast("نسخه‌ی پشتیبان دانلود شد.", "ok");
    };
    $("#backup-btn").addEventListener("click", backup);
    $("#backup-btn-2").addEventListener("click", backup);
    $("#restore-input").addEventListener("change", async (e) => {
      const f = e.target.files[0]; e.target.value = ""; if (!f) return;
      try {
        const data = JSON.parse(await f.text());
        const ok = await confirmBox("بازیابی محتوا", "محتوای فعلی پیش‌نویس با فایل انتخاب‌شده جایگزین می‌شود. تصویرهای جدیدِ منتشرنشده حذف می‌شوند. ادامه می‌دهید؟", "بازیابی");
        if (!ok) return;
        state.content = normalize(data); state.content.works.items.forEach((w) => delete w.isNew); state.pending.clear();
        renderAll(); saveDraft();
        $("#backup-msg").textContent = "محتوا از فایل بازیابی شد. برای اعمال روی سایت، «انتشار تغییرات» را بزنید."; $("#backup-msg").className = "form__msg is-good";
      } catch { $("#backup-msg").textContent = "فایل معتبر نیست."; $("#backup-msg").className = "form__msg is-bad"; }
    });
    $("#discard-btn").addEventListener("click", async () => {
      if (!isDirty()) return toast("تغییر منتشرنشده‌ای وجود ندارد.");
      const ok = await confirmBox("دور انداختن تغییرات", "همه‌ی تغییرات منتشرنشده (از جمله تصویرهای جدید) حذف و نسخه‌ی منتشرشده بازگردانده می‌شود.", "دور انداختن", true);
      if (!ok) return;
      state.content = deep(state.remote); state.pending.clear(); clearDraft(); renderAll();
      toast("به نسخه‌ی منتشرشده بازگشتید.");
    });
  }

  /* ---------- انتشار ---------- */
  function initPublish() {
    $("#publish-btn").addEventListener("click", async () => {
      if (!state.connOk) return go("settings");
      const bad = state.content.skills.items.some((s) => !s.name.trim()) || state.content.experience.items.some((t) => !t.trim());
      if (bad) { toast("مورد خالی در تجربه‌ها یا نرم‌افزارها وجود دارد؛ آن را پر یا حذف کنید.", "bad"); return go("about"); }
      const ph = state.content.contact.phone;
      if (ph && !/^09\d{9}$/.test(ph)) { toast("شماره‌ی تماس معتبر نیست.", "bad"); return go("contact"); }
      const em = state.content.contact.email;
      if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { toast("ایمیل معتبر نیست.", "bad"); return go("contact"); }
      const n = state.pending.size;
      const ok = await confirmBox("انتشار تغییرات", `تغییرات${n ? ` همراه با ${fa(n)} تصویر جدید` : ""} در مخزن گیت‌هاب ثبت و سایت به‌روز می‌شود. ادامه می‌دهید؟`, "انتشار");
      if (ok) publish();
    });
    $("#pub-close").addEventListener("click", () => $("#pub-modal").close());
    $("#pub-modal").addEventListener("cancel", (e) => { if ($("#pub-close").disabled) e.preventDefault(); });
  }

  /* ---------- راه‌اندازی ---------- */
  function init() {
    initLogin();
    initWorks(); initAbout(); initContact(); initSettings(); initPublish();
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-go]"); if (!b) return;
      go(b.dataset.go, b.dataset.focus);
    });
    $("#logout").addEventListener("click", logout);
    window.addEventListener("beforeunload", (e) => { if (state.content && isDirty() && state.pending.size) { e.preventDefault(); e.returnValue = ""; } });
    window.addEventListener("hashchange", () => { const v = location.hash.replace("#", ""); if (VIEWS[v] && !$("#app").hidden) go(v); });

    /* نشست فعال؟ */
    if (sessionStorage.getItem(SS.sess) === "1") {
      $("#login").hidden = true;
      const raw = localStorage.getItem(LS.conn);
      if (raw) { try { const s = JSON.parse(raw); state.conn = { owner: s.owner, repo: s.repo, branch: s.branch || "main" }; } catch {} }
      state.token = sessionStorage.getItem(SS.token) || null;
      if (state.conn && !state.token) toast("برای استفاده از اتصال گیت‌هاب، یک‌بار خارج و دوباره وارد شوید.");
      enterApp();
    } else {
      setTimeout(() => $("#login-user").focus(), 400);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
