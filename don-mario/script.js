/* DON MARIO — interazioni */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header solido allo scroll */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
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
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* Comparsa progressiva */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    // piccolo ritardo a cascata tra elementi fratelli
    reveals.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList.contains("reveal");
      });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 6) * 0.08 + "s");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Scala dei punti di cottura */
  var done = document.querySelector("[data-doneness]");
  if (done) {
    var texts = [
      "Appena scottata su entrambi i lati: crosta sottile, interno quasi crudo e tiepido. Per chi ama il sapore più puro della carne.",
      "Rosso e succoso al centro, ben dorato fuori. È la cottura che il nostro asador consiglia per la maggior parte dei tagli.",
      "Rosa al centro, più compatta al morso. L'equilibrio ideale per tagli sottili e saporiti come l'entraña.",
      "Cotta in modo uniforme, senza parti rosate. Su richiesta, con cotture lente che preservano la morbidezza."
    ];
    var tabs = done.querySelectorAll("[data-level]");
    var bar = done.querySelector("[data-doneness-bar]");
    var out = done.querySelector("[data-doneness-text]");
    function select(n) {
      tabs.forEach(function (t, i) {
        t.setAttribute("aria-selected", String(i === n));
        t.tabIndex = i === n ? 0 : -1;
      });
      bar.style.left = (12.5 + n * 25) + "%";
      out.textContent = texts[n];
    }
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

  /* Braci che salgono nell'hero */
  var canvas = document.querySelector("[data-embers]");
  if (!canvas || reduceMotion) return;
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, sparks = [], running = true;

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function spawn(initial) {
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + 10,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.55 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      life: Math.random() * 0.6 + 0.4,
      phase: Math.random() * Math.PI * 2
    };
  }
  function init() {
    resize();
    var count = Math.round(Math.min(90, W / 16));
    sparks = [];
    for (var i = 0; i < count; i++) sparks.push(spawn(true));
  }
  function frame(t) {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      s.y -= s.vy;
      s.x += s.vx + Math.sin(t / 1400 + s.phase) * 0.18;
      var h = Math.max(0, Math.min(1, s.y / H)); // 1 in basso, 0 in alto
      var a = h * s.life * (0.6 + 0.4 * Math.sin(t / 300 + s.phase));
      if (s.y < -10 || a <= 0.01 && s.y < H * 0.2) { sparks[i] = spawn(false); continue; }
      var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
      g.addColorStop(0, "rgba(255,180,110," + a + ")");
      g.addColorStop(0.4, "rgba(240,120,50," + a * 0.5 + ")");
      g.addColorStop(1, "rgba(212,98,43,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  init();
  requestAnimationFrame(frame);
  window.addEventListener("resize", init);

  // pausa quando l'hero non è visibile
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(frame); }
      else if (!vis) running = false;
    }).observe(canvas);
  }
})();
