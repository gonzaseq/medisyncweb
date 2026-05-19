/* ═══════════════════════════════════════════════════════
   MediSync — componentes.js
   Inyecta navbar y footer en todas las páginas
═══════════════════════════════════════════════════════ */

(function () {

  /* ── Detectar página activa ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    const name = href.split('/').pop();
    return page === name ? 'active' : '';
  }

  /* ── SVG teléfono reutilizable ── */
  const phoneSVG = (size) =>
    `<svg width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`;

  /* ──────────────────────────────
     NAVBAR
  ────────────────────────────── */
  const navHTML = `
<nav id="navbar">
  <a href="index.html" class="nav-logo">
    <div class="nav-logo-img">
      <img src="img/logo1.png" alt="Logo">
    </div>
  </a>

  <div class="nav-phones">
    <a href="tel:+543764374545" class="nav-phone-link">
      ${phoneSVG(12)} 376 437-4545
    </a>
    <a href="tel:+543764639426" class="nav-phone-link">
      ${phoneSVG(12)} 376 463-9426
    </a>
    <a href="https://www.instagram.com/medi.sync/" class="nav-social-link" target="_blank" rel="noopener" aria-label="Instagram">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
    </a>
    <a href="https://www.linkedin.com/company/medi-sync-arg/" class="nav-social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
  </div>

  <ul class="nav-links">
    <li><a href="index.html"     class="${isActive('index.html')}">Inicio</a></li>
    <li><a href="servicios.html" class="${isActive('servicios.html')}">Servicios</a></li>
    <li><a href="equipos.html"   class="${isActive('equipos.html')}">Equipos</a></li>
    <li><a href="nosotros.html"  class="${isActive('nosotros.html')}">Nosotros</a></li>
    <li><a href="contacto.html"  class="nav-cta ${isActive('contacto.html')}">Solicitar servicio</a></li>
  </ul>
  <button class="nav-hamburger" id="hamburger" aria-label="Menú">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="nav-mobile-menu" id="mobileMenu">
  <a href="index.html"     onclick="closeMobile()">Inicio</a>
  <a href="servicios.html" onclick="closeMobile()">Servicios</a>
  <a href="equipos.html"   onclick="closeMobile()">Equipos</a>
  <a href="nosotros.html"  onclick="closeMobile()">Nosotros</a>
  <a href="contacto.html"  class="nav-cta" onclick="closeMobile()">Solicitar servicio</a>
    <div class="nav-mobile-phones">
    <a href="tel:+543764374545">${phoneSVG(14)} 376 437-4545</a>
    <a href="tel:+543764639426">${phoneSVG(14)} 376 463-9426</a>
    <div class="nav-mobile-socials">
      <a href="https://www.instagram.com/medisync.ar" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        Instagram
      </a>
      <a href="https://www.linkedin.com/company/medisync-ar" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        LinkedIn
      </a>
    </div>
  </div>
</div>`;

  /* ──────────────────────────────
     FOOTER
  ────────────────────────────── */
  const footerHTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-logo-img">
        <img src="img/logo.white.png" alt="Logo">
      </div>
      <p class="footer-desc">Servicio técnico especializado de equipamiento médico en Misiones. Mantenimiento preventivo, reparación y soporte con respaldo técnico oficial.</p>
      <div class="footer-phones">
        <a href="tel:+543764374545" class="footer-phone-link">
          ${phoneSVG(13)} +54 9 376 437-4545
        </a>
        <a href="tel:+543764639426" class="footer-phone-link">
          ${phoneSVG(13)} +54 9 376 463-9426
        </a>
      </div>
    </div>
    <div>
      <div class="footer-heading">Navegación</div>
      <ul class="footer-links">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="equipos.html">Equipos</a></li>
        <li><a href="nosotros.html">Nosotros</a></li>
        <li><a href="contacto.html">Contacto</a></li>
      </ul>
    </div>
    <div>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 MediSync Ingeniería Clínica. Todos los derechos reservados.</span>
    <span style="display:flex;align-items:center;gap:6px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="opacity:.4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Posadas, Misiones
    </span>
  </div>
</footer>`;

  /* ── Montar en el DOM ── */
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    /* Scroll shadow */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    /* Hamburger */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger) {
      hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    }

    /* Fade-up observer */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  });

  /* Global helper para links del menú mobile */
  window.closeMobile = function () {
    const m = document.getElementById('mobileMenu');
    if (m) m.classList.remove('open');
  };

})();
