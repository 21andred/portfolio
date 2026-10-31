/* DON MARIO — interazioni comuni a tutte le pagine */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isHome = document.body.classList.contains("is-home");

  /* Header: diventa pieno dopo un po' di scroll (in home, dopo l'apertura) */
  var header = document.querySelector("[data-header]");
  var book = document.querySelector("[data-mobile-book]");
  function onScroll() {
    var limit = isHome ? window.innerHeight * 0.7 : 40;
    header.classList.toggle("is-solid", window.scrollY > limit);
    if (book) book.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* Menu mobile */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* Comparsa progressiva, a cascata tra elementi fratelli */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    reveals.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList.contains("reveal");
      });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 6) * 0.09 + "s");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Scala dei punti di cottura (pagina La cucina) */
  var done = document.querySelector("[data-doneness]");
  if (done) {
    var texts = [
      "Appena scottata su entrambi i lati: crosta sottile, interno quasi crudo e tiepido. Per chi ama il sapore più puro della carne.",
      "Rossa e succosa al centro, ben dorata fuori. È la cottura che il nostro asador consiglia per la maggior parte dei tagli.",
      "Rosa al centro, più compatta al morso. L'equilibrio ideale per tagli sottili e saporiti come l'entraña.",
      "Cotta in modo uniforme, senza parti rosate. Su richiesta, con cotture lente che ne preservano la morbidezza."
    ];
    var tabs = done.querySelectorAll("[data-level]");
    var bar = done.querySelector("[data-doneness-bar]");
    var out = done.querySelector("[data-doneness-text]");
    var select = function (n) {
      tabs.forEach(function (t, i) {
        t.setAttribute("aria-selected", String(i === n));
        t.tabIndex = i === n ? 0 : -1;
      });
      bar.style.left = (12.5 + n * 25) + "%";
      out.textContent = texts[n];
    };
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
        if (n !== null) { e.preventDefault(); select(n); tabs[n].focus(); }
      });
    });
    select(1);
  }

  /* Anno nel footer */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
