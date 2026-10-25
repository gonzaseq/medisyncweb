/* ═══════════════════════════════════════════════════════
   MediSync — Efectos inspirados en Cult UI (MIT)
   Grid Beam (canvas) · Text Animate
   Sin dependencias. Cargar con <script src="cult-effects.js" defer>.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ─── TEXT ANIMATE ───
     Divide el título en palabras (respetando <br> y etiquetas internas)
     y las anima una por una. */
  function animateText(el) {
    if (!el.dataset.taHtml) el.dataset.taHtml = el.innerHTML;
    el.innerHTML = el.dataset.taHtml;
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());

    let i = 0;
    const wrap = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.className = 'ta-word';
              span.setAttribute('aria-hidden', 'true');
              span.style.setProperty('--i', i++);
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          wrap(child);
        }
      });
    };
    wrap(el);
  }

  /* ─── GRID BEAM ───
     Grilla tipo monitor/papel de ECG con haces de luz que la recorren.
     Adaptado del componente grid-beam de Cult UI, con la paleta MediSync. */
  const PALETTE = {
    h: [[0, 170, 255, 0.55], [110, 215, 255, 0.45], [0, 140, 215, 0.55], [150, 228, 255, 0.45], [40, 190, 240, 0.55], [90, 200, 255, 0.45]],
    v: [[80, 205, 255, 0.55], [0, 150, 230, 0.45], [140, 225, 255, 0.55], [20, 175, 245, 0.45], [100, 210, 255, 0.55], [0, 130, 200, 0.45]],
  };

  const smoothstep = (t) => t * t * (3 - 2 * t);
  const gaussian = (x, s) => Math.exp(-(x * x) / (2 * s * s));
  const rgba = (r, g, b, a) => `rgba(${r},${g},${b},${Math.max(0, a).toFixed(4)})`;
  const lift = (v, n) => Math.min(255, v + n);

  function GridBeam(host, opts) {
    const o = Object.assign({ cell: 120, duration: 3.4, strength: 1, minor: true }, opts || {});
    const canvas = document.createElement('canvas');
    canvas.className = 'grid-beam-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const content = host.querySelector('.hero-content');
    host.insertBefore(canvas, content || host.firstChild);

    const ctx = canvas.getContext('2d', { alpha: true });
    let w = 0, h = 0, rows = 3, cols = 4, raf = null, start = performance.now(), visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = w < 600 ? o.cell * 0.8 : o.cell;
      cols = Math.max(3, Math.round(w / cell));
      rows = Math.max(3, Math.round(h / cell));
      if (reduceMotion.matches) draw(start + 1700);
    }

    function hPos(r, elapsed) {
      const speed = 1 + (r % 3) * 0.12;
      const offset = r * 0.21 + (r % 2) * 0.35;
      return (((elapsed * speed) / o.duration + offset) % 1) * w;
    }
    function vPos(c, elapsed) {
      const speed = 1 + (c % 3) * 0.1;
      const offset = c * 0.26 + (c % 2) * 0.4;
      return (((elapsed * speed) / (o.duration * 1.2) + offset) % 1) * h;
    }

    function beam(x, y, len, horizontal, color, gs) {
      const [cr, cg, cb, op] = color;
      // Halo
      const bloom = ctx.createRadialGradient(x, y, 0, x, y, len * 1.1);
      bloom.addColorStop(0, rgba(cr, cg, cb, op * 0.32 * gs));
      bloom.addColorStop(0.4, rgba(cr, cg, cb, op * 0.12 * gs));
      bloom.addColorStop(1, 'transparent');
      ctx.save();
      if (horizontal) { ctx.translate(x, y); ctx.scale(1, 4 / (len * 1.1)); ctx.translate(-x, -y); }
      else            { ctx.translate(x, y); ctx.scale(4 / (len * 1.1), 1); ctx.translate(-x, -y); }
      ctx.fillStyle = bloom;
      ctx.beginPath(); ctx.arc(x, y, len * 1.1, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      // Núcleo
      const g = horizontal
        ? ctx.createLinearGradient(x - len, y, x + len, y)
        : ctx.createLinearGradient(x, y - len, x, y + len);
      g.addColorStop(0, 'transparent');
      g.addColorStop(0.12, rgba(cr, cg, cb, op * 0.4 * gs));
      g.addColorStop(0.35, rgba(lift(cr, 60), lift(cg, 60), lift(cb, 60), op * 0.8 * gs));
      g.addColorStop(0.5, rgba(lift(cr, 110), lift(cg, 110), lift(cb, 110), op * gs));
      g.addColorStop(0.65, rgba(lift(cr, 60), lift(cg, 60), lift(cb, 60), op * 0.8 * gs));
      g.addColorStop(0.88, rgba(cr, cg, cb, op * 0.4 * gs));
      g.addColorStop(1, 'transparent');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (horizontal) { ctx.moveTo(x - len, y); ctx.lineTo(x + len, y); }
      else            { ctx.moveTo(x, y - len); ctx.lineTo(x, y + len); }
      ctx.stroke();
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);
      const elapsed = (now - start) / 1000;
      const fade = reduceMotion.matches ? 1 : smoothstep(Math.min(1, elapsed / 0.9));
      const gs = fade * o.strength;
      const cellW = w / cols, cellH = h / rows;
      const br = reduceMotion.matches ? 1 : 0.85 + 0.3 * Math.sin(elapsed * 1.4) + 0.1 * Math.sin(elapsed * 2.3);

      // Subdivisión fina, como el papel de un electrocardiograma
      if (o.minor) {
        ctx.strokeStyle = 'rgba(255,255,255,0.035)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = cellW / 5; x < w; x += cellW / 5) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, h); }
        for (let y = cellH / 5; y < h; y += cellH / 5) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(w, Math.round(y) + 0.5); }
        ctx.stroke();
      }
      // Grilla principal
      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let c = 1; c < cols; c++) { const x = Math.round(c * cellW) + 0.5; ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let r = 1; r < rows; r++) { const y = Math.round(r * cellH) + 0.5; ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // Haces horizontales y verticales
      for (let r = 1; r < rows; r++) beam(hPos(r, elapsed), r * cellH, cellW * 0.55 * br, true, PALETTE.h[r % 6], gs);
      for (let c = 1; c < cols; c++) beam(c * cellW, vPos(c, elapsed), cellH * 0.55 * br, false, PALETTE.v[c % 6], gs);

      // Destellos en los cruces cuando dos haces coinciden
      for (let r = 1; r < rows; r++) {
        const hx = hPos(r, elapsed);
        for (let c = 1; c < cols; c++) {
          const ix = c * cellW, iy = r * cellH;
          const prox = gaussian((hx - ix) / cellW, 0.25) * gaussian((vPos(c, elapsed) - iy) / cellH, 0.25);
          if (prox <= 0.05) continue;
          const a = PALETTE.h[r % 6], b = PALETTE.v[c % 6];
          const mr = (a[0] + b[0]) >> 1, mg = (a[1] + b[1]) >> 1, mb = (a[2] + b[2]) >> 1;
          const fr = 4 * Math.sqrt(prox), fop = prox * 0.7 * gs;
          const fg = ctx.createRadialGradient(ix, iy, 0, ix, iy, fr);
          fg.addColorStop(0, rgba(lift(mr, 140), lift(mg, 140), lift(mb, 140), fop));
          fg.addColorStop(0.5, rgba(mr, mg, mb, fop * 0.4));
          fg.addColorStop(1, 'transparent');
          ctx.fillStyle = fg;
          ctx.beginPath(); ctx.arc(ix, iy, fr, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function loop(now) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    function play() {
      if (raf || reduceMotion.matches || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    }
    function pause() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    new ResizeObserver(resize).observe(canvas);
    resize();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : pause(); }).observe(host);
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
    reduceMotion.addEventListener('change', () => { pause(); resize(); play(); });
    play();

    return { canvas, play, pause, restart() { start = performance.now(); } };
  }

  function init() {
    document.querySelectorAll('[data-text-animate]').forEach(animateText);
    document.querySelectorAll('[data-grid-beam]').forEach((el) => GridBeam(el));
  }

  window.MediSyncFX = { animateText, GridBeam };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
