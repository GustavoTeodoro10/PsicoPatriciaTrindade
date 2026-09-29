(function () {
  "use strict";
  var cfg = window.SITE || {};

  /* ---------- WhatsApp: mensagens contextuais por botão ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(a.getAttribute("data-wa"));
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  /* ---------- Analytics (só carrega se houver ID configurado) ---------- */
  function addScript(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }
  if (cfg.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", cfg.ga4Id);
    addScript("https://www.googletagmanager.com/gtag/js?id=" + cfg.ga4Id);
  }
  if (cfg.metaPixelId) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", cfg.metaPixelId);
    window.fbq("track", "PageView");
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-wa]");
    if (!a) return;
    var where = a.getAttribute("data-track") || "whatsapp";
    if (window.gtag) window.gtag("event", "generate_lead", { method: "whatsapp", location: where });
    if (window.fbq) window.fbq("track", "Contact", { content_name: where });
  });

  /* ---------- Menu mobile ---------- */
  var btn = document.getElementById("menu-btn");
  var panel = document.getElementById("menu-panel");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    document.documentElement.classList.toggle("menu-open", open);
  }
  if (btn && panel) {
    btn.addEventListener("click", function () { setMenu(panel.hidden); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setMenu(false); btn.focus(); } });
  }

  /* ---------- Sombra do header ao rolar ---------- */
  var header = document.getElementById("top");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll-reveal (conteúdo visível por padrão sem JS) ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear() < 2026 ? 2026 : new Date().getFullYear();
})();
