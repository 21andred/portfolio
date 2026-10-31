/* DON MARIO — fiamme dell'apertura (WebGL)
   Il fuoco sale, avvolge il logo e poi si abbassa a brace,
   lasciando il logo in vista. Senza WebGL o con "riduci movimento"
   resta un bagliore statico. */
(function () {
  "use strict";

  var intro = document.querySelector("[data-intro]");
  var canvas = document.querySelector("[data-fire]");
  if (!intro || !canvas) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var logo = intro.querySelector(".intro__logo");

  // la sequenza parte quando il logo è pronto, così fuoco e logo restano sincronizzati
  function whenReady(cb) {
    var done = false;
    function go() { if (!done) { done = true; cb(); } }
    if (logo && logo.decode) logo.decode().then(go, go); else go();
    setTimeout(go, 2500);
  }
  var gl = !reduce && (canvas.getContext("webgl", { alpha: false, antialias: false }) ||
                       canvas.getContext("experimental-webgl"));
  function noFire() {
    intro.classList.add("no-fire");
    canvas.remove();
    whenReady(function () { intro.classList.add("is-playing"); });
  }
  if (!gl) { noFire(); return; }

  var vsrc = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }";
  var fsrc = [
    "precision mediump float;",
    "uniform vec2 r; uniform float t; uniform float h; uniform float k;",
    "float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }",
    "float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);",
    "  return mix(mix(hash(i), hash(i+vec2(1.,0.)), f.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), f.x), f.y); }",
    "float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.03; a *= .5; } return v; }",
    "void main(){",
    "  vec2 uv = gl_FragCoord.xy / r;",
    "  float asp = r.x / r.y;",
    "  float x = (uv.x - .5) * asp;",
    // lingue di fuoco: altezza variabile lungo la base
    "  float tongue = fbm(vec2(x * 2.2, t * .4));",
    "  float H = h * (.55 + .9 * tongue);",
    "  vec2 q = vec2(x * 3.4, uv.y * 2.6 - t * 1.8);",
    "  float n = fbm(q + vec2(fbm(q * 1.5 + vec2(0., t * .5)) * 1.8, 0.));",
    // varchi tra le lingue: il fuoco non è un muro
    "  float gaps = smoothstep(.25, .75, fbm(vec2(x * 5., uv.y * 3. - t * 2.3)));",
    "  float g = 1. - uv.y / max(H, .001);",
    "  float f = clamp(g * 1.05 + (n - .5) * 1.9, 0., 1.);",
    "  f *= .45 + .55 * gaps;",
    "  vec3 col = vec3(1., .3, .06) * pow(f, 1.7) * 1.25",
    "           + vec3(1., .72, .32) * pow(f, 6.) * .9;",
    // bagliore di brace sul fondo
    "  col += vec3(.32, .07, .015) * exp(-uv.y * 7.) * (.4 + .6 * k);",
    "  col *= k;",
    "  gl_FragColor = vec4(min(col, 1.), 1.);",
    "}"
  ].join("\n");

  function shader(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  var vs = shader(gl.VERTEX_SHADER, vsrc), fs = shader(gl.FRAGMENT_SHADER, fsrc);
  if (!vs || !fs) { noFire(); return; }
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uR = gl.getUniformLocation(prog, "r");
  var uT = gl.getUniformLocation(prog, "t");
  var uH = gl.getUniformLocation(prog, "h");
  var uK = gl.getUniformLocation(prog, "k");

  // risoluzione ridotta: il fuoco è morbido per natura e così costa poco
  var SCALE = 0.5;
  function resize() {
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * SCALE));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * SCALE));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener("resize", resize);

  // andamento dell'altezza delle fiamme nel tempo (secondi)
  function ease(x) { return 1 - Math.pow(1 - x, 3); }
  function flameHeight(s) {
    var PEAK = 1.25, REST = 0.2;
    if (s < 1.4) return PEAK * ease(s / 1.4);               // il fuoco divampa
    if (s < 2.4) return PEAK;                               // avvolge il logo
    if (s < 5.2) return PEAK + (REST - PEAK) * ease((s - 2.4) / 2.8); // si abbassa
    return REST;                                            // resta a brace
  }

  var start = 0, running = true;
  function frame() {
    if (!running) return;
    var s = (performance.now() - start) / 1000;
    gl.uniform1f(uT, s + 3.0);
    var hh = flameHeight(s);
    gl.uniform1f(uH, hh);
    gl.uniform1f(uK, 0.7 + 0.3 * Math.min(1, hh / 1.25)); // a riposo il fuoco è più quieto
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }
  whenReady(function () {
    start = performance.now();
    intro.classList.add("is-playing");
    requestAnimationFrame(frame);
  });

  // fermo l'animazione quando l'apertura non è visibile
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(frame); }
      else if (!vis) running = false;
    }).observe(intro);
  }
})();
