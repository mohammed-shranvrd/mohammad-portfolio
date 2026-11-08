/* =====================================================================
   PORTFOLIO — Mohammad Sahranavard
   script.js
   =====================================================================

   ┌───────────────────────────────────────────────────────────────────┐
   │  بخش ۱ — محتوای سایت                                               │
   │  فقط همین بخش را ویرایش کنید. به بخش ۲ (موتور سایت) دست نزنید.      │
   │                                                                   │
   │  قوانین:                                                          │
   │   • متن‌ها داخل گیومه‌ی انگلیسی "..." نوشته می‌شوند.               │
   │   • بعد از هر مورد یک ویرگول انگلیسی ( , ) لازم است.              │
   │   • نام فایل عکس باید دقیقاً با فایل داخل پوشه‌ی Image یکی باشد.  │
   │   • برای حذف یک اثر، کل خط آن را پاک کنید.                          │
   │   • برای افزودن اثر، یک خط مشابه بسازید (ترتیب خط = ترتیب نمایش).  │
   └───────────────────────────────────────────────────────────────────┘ */

const SITE = {

  /* --- مسیر پوشه‌ی عکس‌ها --- */
  imagesPath: "Image/",

  /* --- منوی بالای صفحه --- */
  nav: {
    hero:    "معرفی",
    about:   "درباره‌ی من",
    works:   "آثار",
    contact: "تماس",
    admin:   "پنل ادمین",
  },

  /* --- هویت --- */
  name:     "محمد صحرانورد",
  roleFa:   "طراح گرافیک",
  roleEn:   "Graphic Designer",
  photo:    "My-photo.png",

  /* --- آیکون‌های نرم‌افزار پشت کاراکتر (داخل پوشه‌ی Image) --- */
  heroIcons: [
    { file: "Icon-Ps.png",  label: "Photoshop" },
    { file: "Icon-Ai.png",  label: "Illustrator" },
    { file: "Icon-Pr.png",  label: "Premiere Pro" },
    { file: "Icon-Fig.png", label: "Figma" },
  ],

  /* --- شعار بین آثار و تماس --- */
  cta: {
    text:   "وقتشه کسب‌وکارت بهتر دیده بشه.",
    button: "شروع گفتگو",
  },

  /* --- درباره --- */
  about: {
    eyebrow: "درباره‌ی من",
    heading: "درباره‌ی من",
    text:
      "من محمد صحرانورد هستم، طراح گرافیک. مدتی است مسیر طراحی را به‌صورت جدی دنبال می‌کنم و بیشتر آنچه آموخته‌ام حاصل تمرین، آزمون‌وخطا و یادگیری شخصی بوده است. همیشه کنجکاوم چیزهای تازه یاد بگیرم و خودم را به چالش بکشم. در طراحی، زیبایی بصری و توجه به جزئیات برایم اهمیت زیادی دارد؛ هر پروژه فرصتی است برای خلق، یادگیری و پیشرفت.",
  },

  /* --- تجربه‌ها --- */
  experience: {
    heading: "تجربه‌ها",
    items: [
      "همکاری با کانون تبلیغاتی مهرافزا در طراحی محتوای گرافیکی و تبلیغاتی",
      "همکاری در پروژه‌های آموزش‌وپرورش خراسان جنوبی",
      "مشارکت در فعالیت‌های کانون‌های فرهنگی",
      "حضور در کارگاه استانی تولید آثار گرافیکی",
    ],
  },

  /* --- نرم‌افزارها (درصد بین ۰ تا ۱۰۰) --- */
  skills: {
    eyebrow: "مهارت‌ها",
    heading: "نرم‌افزارها",
    items: [
      { name: "Photoshop",    percent: 75 },
      { name: "Illustrator",  percent: 15 },
      { name: "Premiere Pro", percent: 15 },
      { name: "Figma",        percent: 20 },
    ],
  },

  /* --- آمار هیرو (برچسب‌ها؛ اعداد خودکار شمرده می‌شوند) --- */
  statLabels: {
    works:      "اثر منتخب",
    experience: "تجربه‌ی حرفه‌ای",
    skills:     "نرم‌افزار تخصصی",
  },

  /* --- آثار ---
     file:        نام دقیق فایل داخل پوشه‌ی Image
     tag:         دسته‌ی کوتاه (زیر گالری و در نمایش تمام‌صفحه دیده می‌شود)
     description: توضیح یک یا دو جمله‌ای؛ اگر ندارید خالی بگذارید ""     */
  works: {
    eyebrow: "آثار",
    heading: "آثار منتخب",
    items: [
      { file: "Image-1.png",  tag: "بنر استوری", description: "" },
      { file: "Image-2.png",  tag: "بنر استوری", description: "" },
      { file: "Image-3.png",  tag: "بنر استوری", description: "" },
      { file: "Image-4.jpg",  tag: "بنر استوری", description: "" },
      { file: "Image-5.jpg",  tag: "فتومونتاژ",  description: "" },
      { file: "Image-6.jpg",  tag: "فتومونتاژ",  description: "" },
      { file: "Image-7.jpg",  tag: "فتومونتاژ",  description: "" },
      { file: "Image-8.png",  tag: "بنر استوری", description: "" },
      { file: "Image-9.jpg",  tag: "بنر استوری", description: "" },
      { file: "Image-10.png", tag: "بنر استوری", description: "" },
      { file: "Image-11.jpg", tag: "بنر استوری", description: "" },
      { file: "Image-12.png", tag: "بنر استوری", description: "" },
      { file: "Image-13.jpg", tag: "پوستر",      description: "" },
      { file: "Image-14.jpg", tag: "پوستر",      description: "" },
      { file: "Image-15.jpg", tag: "پوستر",      description: "" },
      { file: "Image-16.jpg", tag: "پوستر",      description: "" },
      { file: "Image-17.jpg", tag: "پوستر",      description: "" },
      { file: "Image-18.jpg", tag: "پوستر",      description: "" },
      { file: "Image-19.jpg", tag: "پوستر",      description: "" },
      { file: "Image-20.jpg", tag: "پوستر",      description: "" },
      { file: "Image-21.jpg", tag: "بنر",        description: "" },
    ],
  },

  /* --- تماس ---
     برای موارد هنوز نامشخص، مقدار "****" را نگه دارید؛ به‌صورت «به‌زودی» نمایش داده می‌شود. */
  contact: {
    eyebrow: "تماس",
    heading: "در ارتباط باشیم",
    lead:    "برای همکاری یا سفارش طراحی، از راه‌های زیر در دسترس هستم.",
    phone:   "09013623335",
    id:      "****",
    email:   "****",
    platforms: [
      { key: "instagram", label: "اینستاگرام", url: "https://instagram.com/" },
      { key: "telegram",  label: "تلگرام",     url: "https://t.me/" },
      { key: "whatsapp",  label: "واتساپ",     url: "https://wa.me/" },
    ],
  },

  /* --- فوتر --- */
  footer: {
    legal: "© تمام حقوق مادی و معنوی محتوای این وب‌سایت متعلق به محمد صحرانورد است. هرگونه استفاده یا بازنشر آثار بدون اجازه‌ی صاحب اثر مجاز نیست.",
  },
};

/* =====================================================================
   بخش ۲ — موتور سایت  (به این بخش دست نزنید)
   ===================================================================== */
(() => {
  "use strict";

  /* ---------- ابزارها ---------- */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp  = (a, b, t) => a + (b - a) * t;
  const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
  const fa = (v) => String(v).replace(/\d/g, (d) => FA_DIGITS[+d]);
  const encodePath = (p) => p.split("/").map(encodeURIComponent).join("/");
  const imgSrc = (file) => SITE.imagesPath + encodePath(file);
  const isPending = (v) => !v || /^\*+$/.test(String(v).trim());
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  /* فقط آدرس‌های http(s) پذیرفته می‌شوند؛ بدون پروتکل → https:// */
  const safeUrl = (v) => {
    let s = String(v || "").trim();
    if (!s) return "";
    if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = "https://" + s;
    if (!/^https?:\/\//i.test(s)) return "";
    try { const u = new URL(s); return u.hostname.includes(".") ? u.href : ""; } catch (e) { return ""; }
  };
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
    telegram:  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M20.5 4.5 3.8 11.1c-.9.4-.9 1.1 0 1.4l4.2 1.3 1.6 5c.2.5.8.6 1.2.2l2.3-2.1 4.4 3.2c.6.4 1.3.1 1.5-.7l3-14c.2-.9-.6-1.4-1.5-.9ZM9 13.4l8.1-5.1-6.3 6.3-.3 3.1-1.5-4.3Z" fill="currentColor"/></svg>',
    custom:    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M10.2 13.8a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1.3 1.3M13.8 10.2a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.3-1.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    whatsapp:  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5a6 6 0 0 0 2.9 2.6c.2.1.4.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .4-.1 1.1-.5 1.5-.5.5-1.3.8-2 .7-1.3-.2-2.9-1-4.2-2.4-1.3-1.3-2-2.8-2.2-4 0-.8.2-1.5.4-2Z" fill="currentColor"/></svg>',
  };

  /* ---------- اتصال محتوا ---------- */
  function bindText() {
    const map = {
      navHero: SITE.nav.hero, navAbout: SITE.nav.about, navWorks: SITE.nav.works, navContact: SITE.nav.contact, navAdmin: SITE.nav.admin,
      name: SITE.name, roleFa: SITE.roleFa, roleEn: SITE.roleEn,
      aboutEyebrow: SITE.about.eyebrow, aboutHeading: SITE.about.heading, aboutText: SITE.about.text,
      expHeading: SITE.experience.heading,
      skillsEyebrow: SITE.skills.eyebrow, skillsHeading: SITE.skills.heading,
      worksEyebrow: SITE.works.eyebrow, worksHeading: SITE.works.heading,
      contactEyebrow: SITE.contact.eyebrow, contactHeading: SITE.contact.heading, contactLead: SITE.contact.lead,
      ctaText: SITE.cta.text, ctaButton: SITE.cta.button,
    };
    $$("[data-bind]").forEach((el) => {
      const v = map[el.dataset.bind];
      if (v !== undefined) el.textContent = v;
    });
    document.title = `${SITE.name} | ${SITE.roleFa}`;
    const photo = $("#hero-photo");
    photo.src = imgSrc(SITE.photo);
    photo.alt = `${SITE.name}، ${SITE.roleFa}`;
  }

  function renderHeroIcons() {
    const wrap = $("#hero-icons");
    const list = (SITE.heroIcons || []).slice(0, 4);
    if (!wrap || !list.length) return;
    wrap.innerHTML = list.map((ic, i) => `
      <span class="hero__icon hero__icon--${i + 1}" style="--i:${i}" title="${ic.label}">
        <img src="${imgSrc(ic.file)}" alt="${ic.label}" width="56" height="56" decoding="async" draggable="false">
      </span>`).join("");
  }

  function renderStats() {
    const stats = [
      { n: SITE.works.items.length,      l: SITE.statLabels.works },
      { n: SITE.experience.items.length, l: SITE.statLabels.experience },
      { n: SITE.skills.items.length,     l: SITE.statLabels.skills },
    ];
    $("#hero-stats").innerHTML = stats.map((s, i) => `
      <div class="stat" data-reveal style="--d:${0.55 + i * 0.12}s">
        <span class="stat__value" data-count="${s.n}">${fa(0)}</span>
        <span class="stat__label">${s.l}</span>
      </div>`).join("");
  }

  function renderAbout() {
    $("#exp-list").innerHTML = SITE.experience.items
      .map((t, i) => `<li class="exp__item" style="--i:${i}">${t}</li>`).join("");

    $("#skills-list").innerHTML = SITE.skills.items.map((s) => {
      const p = clamp(Math.round(+s.percent || 0), 0, 100);
      return `
      <li class="skill">
        <div class="skill__row">
          <span class="skill__name" dir="ltr">${s.name}</span>
          <span class="skill__pct" data-count="${p}" data-suffix="٪">${fa(0)}٪</span>
        </div>
        <div class="skill__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}" aria-label="${s.name}">
          <span class="skill__fill" data-width="${p}"></span>
        </div>
      </li>`;
    }).join("");
  }

  function renderContact() {
    const c = SITE.contact;

    /* تلفن */
    const digits = String(c.phone).replace(/\D/g, "");
    const intl = digits.startsWith("0") ? "+98" + digits.slice(1) : "+" + digits;
    const pretty = digits.length === 11
      ? `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
      : digits;
    const phoneEl = $("#contact-phone");
    if (!digits) {
      phoneEl.removeAttribute("href");
      phoneEl.removeAttribute("data-magnetic");
      phoneEl.classList.add("is-pending");
      phoneEl.setAttribute("aria-disabled", "true");
      $("#contact-phone-text").textContent = "•••• ••• ••••";
      phoneEl.insertAdjacentHTML("beforeend", '<span class="pending-chip">به‌زودی</span>');
    } else {
      phoneEl.href = `tel:${intl}`;
      phoneEl.setAttribute("aria-label", `تماس با شماره‌ی ${fa(digits)}`);
      $("#contact-phone-text").textContent = fa(pretty);
    }

    /* شناسه */
    const idCard = $(".contact__card--id");
    const idEl = $("#contact-id");
    if (isPending(c.id)) {
      idCard.classList.add("is-pending");
      idEl.textContent = "@ ••••";
      idCard.insertAdjacentHTML("beforeend", '<span class="pending-chip">به‌زودی</span>');
    } else {
      idEl.textContent = c.id.startsWith("@") ? c.id : "@" + c.id;
    }

    /* لینک‌های اجتماعی: پلتفرم‌های پیش‌فرض (وابسته به شناسه) + لینک‌های سفارشی (مستقل) */
    const handle = isPending(c.id) ? "" : c.id.replace(/^@/, "");
    const links = c.platforms.map((p) => {
      const label = escapeHtml(p.label || "");
      if (p.key === "custom") {
        const href = safeUrl(p.url);
        return { label, href, icon: ICONS.custom, active: !!href && !!label };
      }
      const icon = ICONS[p.key] || ICONS.custom;
      if (p.key === "whatsapp") return { label, icon, href: `https://wa.me/${intl.replace("+", "")}`, active: !!handle && !!digits };
      return { label, icon, href: p.url + handle, active: !!handle };
    });
    const activeLinks = links.filter((l) => l.active);
    idCard.classList.toggle("has-links", activeLinks.length > 0);
    idEl.classList.toggle("is-hidden", activeLinks.length > 0 && isPending(c.id));
    if (activeLinks.length) {
      idCard.classList.remove("is-pending");
      idCard.querySelector(".pending-chip")?.remove();
      $("#socials").innerHTML = activeLinks.map((l) =>
        `<li class="has-name"><a href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer" title="${l.label}" aria-label="${l.label}">${l.icon}<span class="socials__name">${l.label}</span></a></li>`
      ).join("");
    } else {
      /* حالت خالی: فقط وقتی هیچ لینک فعالی وجود ندارد */
      $("#socials").innerHTML = links.map((l) =>
        `<li class="is-disabled" title="${l.label} — به‌زودی" aria-label="${l.label}، به‌زودی">${l.icon}</li>`
      ).join("");
    }

    /* ایمیل */
    const mailCard = $(".contact__card--mail");
    const mailEl = $("#contact-email");
    if (isPending(c.email)) {
      mailCard.classList.add("is-pending");
      mailEl.textContent = "•••• @ ••••";
      mailCard.insertAdjacentHTML("beforeend", '<span class="pending-chip">به‌زودی</span>');
    } else {
      mailEl.innerHTML = `<a href="mailto:${c.email}">${c.email}</a>`;
    }

    /* فوتر */
    $("#footer-legal").textContent = SITE.footer.legal;
    $("#footer-year").textContent = fa(new Intl.DateTimeFormat("en-US-u-ca-persian", { year: "numeric" }).format(new Date()).replace(/\D/g, ""));
  }

  /* ---------- شمارنده‌ی اعداد ---------- */
  function countUp(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    if (REDUCED) { el.textContent = fa(target) + suffix; return; }
    const dur = 1300, t0 = performance.now();
    const step = (now) => {
      const t = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = fa(Math.round(target * e)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- ظهور هنگام اسکرول ---------- */
  function initReveal() {
    const items = $$("[data-reveal]:not([data-reveal-hero])");
    if (!("IntersectionObserver" in window) || REDUCED) {
      items.forEach((el) => el.classList.add("is-in"));
      $$("[data-count]").forEach(countUp);
      $$(".skill__fill").forEach((f) => (f.style.width = f.dataset.width + "%"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("is-in");
        $$("[data-count]", el).forEach(countUp);
        if (el.matches("[data-count]")) countUp(el);
        if (el.classList.contains("card--skills")) {
          const list = $(".skills", el);
          list.classList.add("is-animated");
          $$(".skill__fill", el).forEach((f, i) => {
            setTimeout(() => (f.style.width = f.dataset.width + "%"), 250 + i * 120);
          });
          $$(".skill__pct", el).forEach((p, i) => setTimeout(() => countUp(p), 250 + i * 120));
        }
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* تأخیر پلکانی عناصر هیرو */
  function staggerHero() {
    const els = $$(".hero [data-reveal]");
    els.forEach((el, i) => {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${0.1 + i * 0.12}s`);
      el.dataset.revealHero = "";
    });
    const show = () => requestAnimationFrame(() => els.forEach((el) => {
      el.classList.add("is-in");
      $$("[data-count]", el).forEach(countUp);
      if (el.matches("[data-count]")) countUp(el);
    }));
    let shown = false;
    const once = () => { if (!shown) { shown = true; show(); } };
    document.addEventListener("loader:done", once, { once: true });
    setTimeout(once, 7000); /* پشتیبان مطلق */
  }

  /* ---------- نوار پیشرفت اسکرول ---------- */
  function initProgress() {
    const bar = $("#scroll-progress");
    if (!bar || REDUCED) return;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
        bar.style.transform = `scaleX(${p.toFixed(4)})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- هیرو: پارالاکس و محو شدن با اسکرول ---------- */
  function initHero() {
    const hero = $("#hero");
    const inner = $(".hero__inner");
    const photo = $("#hero-photo");
    const figure = $(".hero__figure");

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = hero.offsetHeight || 1;
        const p = clamp(window.scrollY / (h * 0.85), 0, 1);
        if (!REDUCED) {
          inner.style.opacity = String(1 - p * 1.15);
          inner.style.transform = `translateY(${p * -40}px) scale(${1 - p * 0.04})`;
        } else {
          inner.style.opacity = String(1 - p);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!FINE_POINTER || REDUCED) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx = lerp(cx, tx, 0.08);
      cy = lerp(cy, ty, 0.08);
      photo.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      figure.querySelector(".hero__halo").style.transform = `translateX(calc(-50% + ${cx * -0.8}px)) translateY(${cy * -0.8}px)`;
      const icons = figure.querySelector(".hero__icons");
      if (icons) icons.style.transform = `translate3d(${cx * -0.55}px, ${cy * -0.55}px, 0)`;
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) raf = requestAnimationFrame(loop);
      else raf = null;
    };
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 18;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 10;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
  }

  /* ---------- دکمه‌های مغناطیسی ---------- */
  function initMagnetic() {
    if (!FINE_POINTER || REDUCED) return;
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.22;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- ناوبری ---------- */
  function initNav() {
    const menu = $(".nav__menu");
    const pill = $(".nav__pill");
    const links = $$(".nav__link").filter((l) => l.getAttribute("href").startsWith("#"));
    const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);

    const movePill = (link) => {
      if (!link) { pill.style.opacity = "0"; return; }
      const mr = menu.getBoundingClientRect();
      const lr = link.getBoundingClientRect();
      const isRTL = getComputedStyle(document.documentElement).direction === "rtl";
      const offset = isRTL ? mr.right - lr.right : lr.left - mr.left;
      pill.style.width = lr.width + "px";
      pill.style.transform = `translateX(${isRTL ? -offset : offset}px)`;
      pill.style.opacity = "1";
    };

    const setActive = (id) => {
      links.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === id));
      movePill(links.find((l) => l.dataset.nav === id));
    };

    /* تشخیص بخش فعال بر اساس موقعیت اسکرول (سازگار با هیروی چسبان) */
    let current = null;
    const topOf = (s) => (s.id === "hero" ? 0 : s.offsetTop);
    const spy = () => {
      const y = window.scrollY + window.innerHeight * 0.38;
      let id = sections[0].id;
      for (const s of sections) if (y >= topOf(s)) id = s.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) id = sections[sections.length - 1].id;
      if (id !== current) { current = id; setActive(id); }
    };
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);

    const scrollToSection = (target) => {
      const top = topOf(target);
      window.scrollTo({ top, behavior: REDUCED ? "auto" : "smooth" });
    };
    links.forEach((l) => l.addEventListener("click", (e) => {
      const target = $(l.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      scrollToSection(target);
      history.replaceState(null, "", l.getAttribute("href"));
    }));
    $(".nav__brand").addEventListener("click", (e) => { e.preventDefault(); scrollToSection(sections[0]); });

    window.addEventListener("resize", () => movePill(links.find((l) => l.classList.contains("is-active"))));
    document.fonts?.ready.then(() => movePill(links.find((l) => l.classList.contains("is-active"))));
    requestAnimationFrame(spy);
    setTimeout(spy, 600);
  }

  /* ---------- گالری آثار ---------- */
  function initCarousel() {
    const stage = $("#stage");
    const tagEl = $("#carousel-tag");
    const countEl = $("#carousel-count");
    const thumb = $("#rail-thumb");
    const hint = $("#carousel-hint");
    const items = SITE.works.items;
    const n = items.length;
    if (!n) { $("#works").hidden = true; return; }

    const DIR = getComputedStyle(document.documentElement).direction === "rtl" ? -1 : 1;
    const VISIBLE = 3;
    const DEFAULT_ASPECT = 0.72;

    const cards = items.map((it, i) => {
      const el = document.createElement("article");
      el.className = "work";
      el.dataset.index = i;
      el.setAttribute("aria-label", `${it.tag}، اثر ${fa(i + 1)} از ${fa(n)}`);
      el.innerHTML = `<span class="work__skeleton" aria-hidden="true"></span><img class="work__img" alt="${it.tag}" draggable="false" decoding="async" ${i > 4 ? 'loading="lazy"' : ""}>`;
      const img = el.querySelector("img");
      img.src = imgSrc(it.file);
      const card = { el, img, aspect: DEFAULT_ASPECT, loaded: false };
      const onLoad = () => {
        if (img.naturalWidth && img.naturalHeight) card.aspect = img.naturalWidth / img.naturalHeight;
        card.loaded = true;
        el.classList.add("is-loaded");
        measure();
        apply(pos);
      };
      if (img.complete && img.naturalWidth) onLoad(); else img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", () => { el.classList.add("is-loaded", "is-error"); }, { once: true });
      stage.appendChild(el);
      return card;
    });

    let active = 0;
    let pos = 0;
    let stageW = 0, stageH = 0, gap = 26;
    const widths = new Array(n).fill(0);

    const scaleAt = (k) => Math.max(0.5, 1 - 0.13 * k);

    function measure() {
      stageW = stage.clientWidth;
      stageH = stage.clientHeight;
      gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--card-gap")) || 26;
      const maxW = Math.min(stageW * (stageW < 600 ? 0.84 : 0.72), stageH * 1.9);
      const minW = Math.min(stageH * 0.5, maxW);
      cards.forEach((c, i) => {
        widths[i] = clamp(stageH * c.aspect, minW, maxW);
        c.el.style.setProperty("--w", widths[i] + "px");
      });
    }

    /* چیدمان برای یک شاخص فعالِ صحیح */
    function layoutFor(a) {
      const out = new Array(n);
      for (let i = 0; i < n; i++) {
        const d = i - a;
        const k = Math.abs(d);
        if (k > VISIBLE) { out[i] = { x: Math.sign(d) * DIR * stageW, s: 0.4, r: 0, o: 0, b: 6, z: 0, hidden: true }; continue; }
        let x = 0;
        if (k > 0) {
          x = widths[a] / 2 + gap;
          for (let j = 1; j < k; j++) {
            const idx = a + Math.sign(d) * j;
            x += widths[idx] * scaleAt(j) + gap;
          }
          x += widths[i] * scaleAt(k) / 2;
          /* فشرده‌سازی ملایم؛ کارت‌های کناری کمی روی هم می‌روند */
          x *= 0.9 - k * 0.03;
        }
        out[i] = {
          x: Math.sign(d) * DIR * x,
          s: scaleAt(k),
          r: Math.sign(d) * DIR * (Math.min(k, 1) * 16 + Math.max(0, k - 1) * 4),
          o: k === 0 ? 1 : Math.max(0.18, 0.72 - (k - 1) * 0.22),
          b: k === 0 ? 0 : 0.8 + (k - 1) * 1.1,
          z: 20 - k,
          hidden: false,
        };
      }
      return out;
    }

    function apply(p) {
      if (!stageW) measure();
      const a = clamp(Math.floor(p), 0, n - 1);
      const t = clamp(p - a, 0, 1);
      const L1 = layoutFor(a);
      const L2 = t > 0 && a + 1 < n ? layoutFor(a + 1) : L1;
      for (let i = 0; i < n; i++) {
        const s1 = L1[i], s2 = L2[i];
        const x = lerp(s1.x, s2.x, t), s = lerp(s1.s, s2.s, t), r = lerp(s1.r, s2.r, t);
        const o = lerp(s1.o, s2.o, t), b = lerp(s1.b, s2.b, t);
        const el = cards[i].el;
        el.style.transform = `translate3d(${x}px, 0, 0) scale(${s}) rotateY(${r}deg)`;
        el.style.opacity = o.toFixed(3);
        el.style.filter = b > 0.05 ? `blur(${b.toFixed(2)}px)` : "none";
        el.style.zIndex = Math.round(lerp(s1.z, s2.z, t));
        el.classList.toggle("is-hidden", s1.hidden && s2.hidden);
        el.classList.toggle("is-active", i === active);
        el.setAttribute("aria-hidden", i === active ? "false" : "true");
      }
    }

    function updateMeta(animated = true) {
      const it = items[active];
      if (animated && !REDUCED) {
        tagEl.classList.add("is-switching");
        setTimeout(() => { tagEl.textContent = it.tag; tagEl.classList.remove("is-switching"); }, 180);
      } else {
        tagEl.textContent = it.tag;
      }
      countEl.textContent = `${fa(active + 1)} / ${fa(n)}`;
      const w = 100 / n;
      thumb.style.width = w + "%";
      thumb.style.transform = `translateX(${DIR * active * 100}%)`;
    }

    function goTo(i, { animated = true } = {}) {
      const next = clamp(i, 0, n - 1);
      const changed = next !== active;
      active = next;
      pos = next;
      apply(pos);
      if (changed) { updateMeta(animated); hint.classList.add("is-faded"); }
    }

    /* کشیدن / سوایپ */
    let dragging = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, vel = 0, moved = false, pid = null, startCard = null;
    const unit = () => Math.max(160, widths[active] * 0.75);

    stage.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true; moved = false; pid = e.pointerId;
      startCard = e.target.closest?.(".work") || null;
      startX = lastX = e.clientX; startPos = pos; lastT = performance.now(); vel = 0;
      stage.classList.add("is-dragging");
      stage.setPointerCapture?.(pid);
    });
    stage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      const now = performance.now();
      vel = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX; lastT = now;
      let p = startPos - (dx / unit()) * DIR;
      /* مقاومت در دو انتها */
      if (p < 0) p = p * 0.35;
      if (p > n - 1) p = (n - 1) + (p - (n - 1)) * 0.35;
      pos = p;
      apply(pos);
    });
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("is-dragging");
      stage.releasePointerCapture?.(pid);
      const fling = -vel * DIR * 14;
      let target = Math.round(pos + clamp(fling, -1, 1));
      if (!moved && e && e.type === "pointerup" && startCard) {
        const i = +startCard.dataset.index;
        if (i === active) openLightbox(i); else target = i;
      }
      startCard = null;
      goTo(target);
    };
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("lostpointercapture", () => { if (dragging) endDrag(); });

    /* اسکرول افقی تاچ‌پد */
    let wheelLock = false;
    stage.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return;
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      goTo(active + (e.deltaX > 0 ? -DIR : DIR));
      setTimeout(() => (wheelLock = false), 480);
    }, { passive: false });

    /* کیبورد */
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(active + (DIR === -1 ? 1 : -1)); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + (DIR === -1 ? -1 : 1)); }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(active); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End")  { e.preventDefault(); goTo(n - 1); }
    });

    let rT;
    window.addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { measure(); apply(pos); }, 80); });
    if ("ResizeObserver" in window) new ResizeObserver(() => { measure(); apply(pos); }).observe(stage);

    /* ---------- نمایش تمام‌صفحه ---------- */
    const lb = $("#lightbox");
    const lbImg = $("#lightbox-img");
    const lbTag = $("#lightbox-tag");
    const lbDesc = $("#lightbox-desc");
    const lbCount = $("#lightbox-count");
    let lbOpen = false, lbIndex = 0, lastFocus = null;

    function fillLightbox(i, animated) {
      lbIndex = clamp(i, 0, n - 1);
      const it = items[lbIndex];
      const swap = () => {
        lbImg.src = imgSrc(it.file);
        lbImg.alt = it.tag;
        lbTag.textContent = it.tag;
        lbDesc.textContent = it.description || "";
        lbCount.textContent = `${fa(lbIndex + 1)} / ${fa(n)}`;
        lbImg.classList.remove("is-switching");
      };
      if (animated && !REDUCED) {
        lbImg.classList.add("is-switching");
        setTimeout(swap, 180);
      } else swap();
      goTo(lbIndex, { animated: false });
    }
    function openLightbox(i) {
      lastFocus = document.activeElement;
      fillLightbox(i, false);
      lb.hidden = false;
      lbOpen = true;
      document.body.classList.add("is-locked");
      requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add("is-open")));
      $(".lightbox__btn--close").focus({ preventScroll: true });
    }
    function closeLightbox() {
      if (!lbOpen) return;
      lbOpen = false;
      lb.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      setTimeout(() => { lb.hidden = true; lbImg.src = ""; }, REDUCED ? 0 : 420);
      lastFocus?.focus?.({ preventScroll: true });
      stage.focus({ preventScroll: true });
    }
    $$("[data-lb-close]").forEach((b) => b.addEventListener("click", closeLightbox));
    $("[data-lb-prev]").addEventListener("click", () => fillLightbox(lbIndex - 1, true));
    $("[data-lb-next]").addEventListener("click", () => fillLightbox(lbIndex + 1, true));
    document.addEventListener("keydown", (e) => {
      if (!lbOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft")  fillLightbox(lbIndex + (DIR === -1 ? 1 : -1), true);
      if (e.key === "ArrowRight") fillLightbox(lbIndex + (DIR === -1 ? -1 : 1), true);
    });
    /* سوایپ در نمایش تمام‌صفحه */
    let sx = 0, sy = 0, swiping = false;
    lb.addEventListener("pointerdown", (e) => { sx = e.clientX; sy = e.clientY; swiping = true; });
    lb.addEventListener("pointerup", (e) => {
      if (!swiping) return; swiping = false;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) fillLightbox(lbIndex + (dx < 0 ? -DIR : DIR), true);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.4) closeLightbox();
    });

    /* شروع */
    measure();
    apply(0);
    updateMeta(false);
    /* ورود اولیه: آغاز از وضعیت جمع‌شده */
    if (!REDUCED) {
      cards.forEach((c) => { c.el.style.transition = "none"; c.el.style.opacity = "0"; c.el.style.transform = "translate3d(0,0,0) scale(0.9)"; });
      const start = () => {
        requestAnimationFrame(() => {
          cards.forEach((c) => (c.el.style.transition = ""));
          apply(0);
        });
      };
      const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { start(); io.disconnect(); } }, { threshold: 0.2 });
      io.observe(stage);
    }
  }

  /* ---------- صفحه‌ی بارگذاری ---------- */
  function initLoader() {
    const loader = $("#loader");
    const fill = $("#loader-fill");
    const pct = $("#loader-pct");
    if (!loader) { document.dispatchEvent(new CustomEvent("loader:done")); return; }

    document.body.classList.add("is-locked");
    const t0 = performance.now();
    const MIN = REDUCED ? 300 : 1700;
    const MAX = 6000;
    let target = 8, shown = 0, done = false, raf = 0;

    const bump = (v) => { target = Math.min(100, target + v); };
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      fill.style.width = "100%";
      pct.textContent = fa(100) + "٪";
      loader.classList.add("is-done");
      setTimeout(() => {
        loader.classList.add("is-out");
        document.body.classList.remove("is-locked", "is-loading");
        document.dispatchEvent(new CustomEvent("loader:done"));
        setTimeout(() => loader.remove(), 1400);
      }, REDUCED ? 50 : 380);
    };

    let last = t0, reached = 0;
    const tick = (now) => {
      const elapsed = now - t0;
      const dt = Math.min(80, now - last); last = now;
      if (target >= 100 && !reached) reached = now;
      /* پیشروی نرم و زمان‌محور به سمت هدف؛ هیچ‌وقت عقب نمی‌رود */
      const ceiling = target < 100 ? Math.min(target, 92) : 100;
      const k = target >= 100 ? 6 : 1.6;
      shown += (ceiling - shown) * (1 - Math.exp(-k * dt / 1000));
      if (target < 100) shown = Math.min(shown + dt / 900, ceiling);
      const v = Math.round(shown);
      fill.style.width = v + "%";
      pct.textContent = fa(v) + "٪";
      const settled = shown > 99.2 || (reached && now - reached > 1200);
      if (target >= 100 && settled && elapsed >= MIN) { finish(); return; }
      if (elapsed >= MAX) { finish(); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* منابع واقعی */
    let fontsDone = false, photoDone = false, loadDone = false;
    const check = () => { if (fontsDone && photoDone && loadDone) target = 100; };
    (document.fonts?.ready || Promise.resolve()).then(() => { fontsDone = true; bump(34); check(); }, () => { fontsDone = true; bump(34); check(); });
    const photo = $("#hero-photo");
    const photoOk = () => { if (!photoDone) { photoDone = true; bump(38); check(); } };
    if (photo.complete && photo.naturalWidth) photoOk();
    else { photo.addEventListener("load", photoOk, { once: true }); photo.addEventListener("error", photoOk, { once: true }); }
    setTimeout(photoOk, 3500);
    const loadOk = () => { loadDone = true; bump(20); check(); };
    if (document.readyState === "complete") loadOk(); else window.addEventListener("load", loadOk, { once: true });
    setTimeout(loadOk, 4500);
  }

  /* ---------- اجرا ---------- */
  /* ---------- محتوای منتشرشده از پنل مدیریت (content.json) ----------
     اگر فایل موجود نباشد یا خراب باشد، همان مقادیر بالا استفاده می‌شود. */
  function applyContent(d) {
    if (!d || typeof d !== "object") return;
    const str = (v) => (typeof v === "string" ? v.trim() : null);
    const arr = (v) => (Array.isArray(v) ? v : null);
    const t = str(d.about?.text); if (t) SITE.about.text = t;
    const ex = arr(d.experience?.items);
    if (ex) { const list = ex.map(str).filter(Boolean); if (list.length) SITE.experience.items = list; }
    const sk = arr(d.skills?.items);
    if (sk) {
      const list = sk.filter((s) => s && str(s.name)).map((s) => ({ name: str(s.name), percent: clamp(Math.round(+s.percent || 0), 0, 100) }));
      if (list.length) SITE.skills.items = list;
    }
    const wk = arr(d.works?.items);
    if (wk) {
      const list = wk.filter((w) => w && !w.hidden && str(w.file))
        .map((w) => ({ file: str(w.file), tag: str(w.tag) || "", description: str(w.description) || "" }));
      if (list.length) SITE.works.items = list;
    }
    if (d.contact && typeof d.contact === "object") {
      const c = d.contact;
      if (typeof c.phone === "string") { const d = c.phone.replace(/\D/g, ""); SITE.contact.phone = d.length >= 10 ? d : ""; }
      if (typeof c.id === "string") SITE.contact.id = c.id.trim() || "****";
      if (typeof c.email === "string") SITE.contact.email = c.email.trim() || "****";
      if (str(c.lead)) SITE.contact.lead = str(c.lead);
      const pl = arr(c.platforms);
      if (pl) {
        /* ترتیب آرایه = ترتیب نمایش. آیتم‌های پیش‌فرض با key شناخته‌شده؛ لینک سفارشی با key:"custom" */
        const builtin = new Map(SITE.contact.platforms.map((p) => [p.key, p]));
        const seen = new Set();
        const out = [];
        pl.forEach((p) => {
          if (!p || typeof p !== "object" || p.enabled === false) return;
          if (p.key === "custom") {
            const url = safeUrl(p.url), label = str(p.label);
            if (url && label) out.push({ key: "custom", id: str(p.id) || "", label, url });
          } else if (builtin.has(p.key) && !seen.has(p.key)) {
            seen.add(p.key); out.push(builtin.get(p.key));
          }
        });
        SITE.contact.platforms = out;
      }
    }
    if (d.cta && typeof d.cta === "object") {
      if (str(d.cta.text)) SITE.cta.text = str(d.cta.text);
      if (str(d.cta.button)) SITE.cta.button = str(d.cta.button);
    }
  }

  function loadContent() {
    if (location.protocol === "file:" || !window.fetch) return Promise.resolve();
    const ctrl = "AbortController" in window ? new AbortController() : null;
    const timer = setTimeout(() => ctrl && ctrl.abort(), 2500);
    return fetch("content.json?v=" + Date.now(), { cache: "no-store", signal: ctrl?.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(applyContent)
      .catch(() => {})
      .finally(() => clearTimeout(timer));
  }

  function init() {
    bindText();
    renderHeroIcons();
    renderStats();
    renderAbout();
    renderContact();
    staggerHero();
    initReveal();
    initHero();
    initProgress();
    initMagnetic();
    initNav();
    initCarousel();
    initLoader();
    document.documentElement.classList.add("is-ready");
  }

  const boot = () => loadContent().then(init, init);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
