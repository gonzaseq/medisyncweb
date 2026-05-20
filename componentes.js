/* ═══════════════════════════════════════════════════════
   MediSync — componentes.js v2.1
   Inyecta navbar y footer en todas las páginas
═══════════════════════════════════════════════════════ */

(function () {

  const page = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    const name = href.split('/').pop();
    return page === name ? 'active' : '';
  }

  const phoneSVG = (size) =>
    `<svg width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`;

  /* ── NAVBAR ── */
  const navHTML = `
<nav id="navbar">
  <a href="index.html" class="nav-logo">
  <div class="nav-logo-wrapper">
  <img src="img/logos.png" alt="Logo MediSync" class="logo-circle">
  <img src="img/logo1.png" alt="MediSync Ingeniería Clínica" class="logo-main">
</div>
</a>

  <div class="nav-phones">
    <a href="tel:+543764374545" class="nav-phone-link">
      ${phoneSVG(12)} 376 437-4545
    </a>
    <a href="tel:+543764639426" class="nav-phone-link">
      ${phoneSVG(12)} 376 463-9426
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
  </div>
</div>`;

  /* ── FOOTER — columna vacía eliminada, RRSS integradas ── */
  const footerHTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-logo-img">
        <img src="img/logo.white.png" alt="MediSync Ingeniería Clínica">
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
      <div style="display:flex;gap:12px;margin-top:20px;">
        <a href="https://www.instagram.com/medi.sync" target="_blank" rel="noopener noreferrer"
           style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);text-decoration:none;transition:background 0.2s,color 0.2s,border-color 0.2s;"
           onmouseover="this.style.background='rgba(225,48,108,0.2)';this.style.color='#E1306C';this.style.borderColor='rgba(225,48,108,0.4)'"
           onmouseout="this.style.background='rgba(255,255,255,0.07)';this.style.color='rgba(255,255,255,0.5)';this.style.borderColor='rgba(255,255,255,0.12)'"
           aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.609.074-3.047.49-4.184 1.627C1.732 2.836 1.316 4.274 1.242 5.883 1.184 7.163 1.17 7.571 1.17 12c0 4.429.014 4.837.072 6.117.074 1.609.49 3.047 1.627 4.184 1.137 1.137 2.575 1.553 4.184 1.627C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.609-.074 3.047-.49 4.184-1.627 1.137-1.137 1.553-2.575 1.627-4.184.058-1.28.072-1.688.072-6.117 0-4.429-.014-4.837-.072-6.117-.074-1.609-.49-3.047-1.627-4.184C19.994 1.732 18.556 1.316 16.947 1.242 15.667 1.184 15.259 1.17 12 1.17zm0 5.838a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.163a3 3 0 110-6 3 3 0 010 6zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/medi-sync-arg" target="_blank" rel="noopener noreferrer"
           style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);text-decoration:none;transition:background 0.2s,color 0.2s,border-color 0.2s;"
           onmouseover="this.style.background='rgba(10,102,194,0.2)';this.style.color='#0A66C2';this.style.borderColor='rgba(10,102,194,0.4)'"
           onmouseout="this.style.background='rgba(255,255,255,0.07)';this.style.color='rgba(255,255,255,0.5)';this.style.borderColor='rgba(255,255,255,0.12)'"
           aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
  </div>
  <div class="footer-bottom">
    <span>© 2026 MediSync Ingeniería Clínica. Todos los derechos reservados.</span>
    <span style="display:flex;align-items:center;gap:6px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="opacity:.4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Posadas, Misiones
    </span>
  </div>
</footer>`;

  /* ── Montar DOM ── */
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

  /* ── Botón flotante WhatsApp (solo uno, más limpio) ── */
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/5493764374545?text=Hola%2C%20quiero%20consultar%20por%20los%20servicios%20de%20MediSync.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Consultar por WhatsApp');
  waBtn.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="width:28px;height:28px">
    <path fill="#fff" d="M24 4C13 4 4 13 4 24c0 3.6.97 7 2.66 9.93L4 44l10.3-2.62A19.9 19.9 0 0024 44c11 0 20-9 20-20S35 4 24 4zm0 36.4a16.3 16.3 0 01-8.3-2.27l-.6-.35-6.1 1.56 1.62-5.9-.38-.6A16.4 16.4 0 1124 40.4zm9-12.26c-.5-.25-2.9-1.43-3.35-1.59-.44-.16-.76-.24-1.08.25-.32.5-1.26 1.59-1.54 1.92-.28.32-.57.36-1.06.12a13.3 13.3 0 01-3.9-2.41 14.6 14.6 0 01-2.7-3.36c-.28-.5 0-.76.21-1.01.2-.22.5-.57.74-.86.25-.28.33-.5.5-.83.16-.32.08-.61-.04-.86-.12-.25-1.08-2.62-1.48-3.58-.39-.94-.79-.81-1.08-.83l-.92-.01c-.32 0-.85.12-1.3.61s-1.7 1.65-1.7 4.02 1.74 4.66 1.98 4.99 3.42 5.22 8.28 7.32c1.09.47 1.94.75 2.6.96 1.1.35 2.1.3 2.88.18.88-.13 2.7-1.1 3.09-2.17.38-1.06.38-1.97.26-2.16-.12-.19-.44-.31-.92-.55z"/>
  </svg>`;
  waBtn.style.cssText = `
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #25D366;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 24px rgba(37,211,102,0.45);
    z-index: 9999;
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
  `;
  waBtn.addEventListener('mouseenter', () => {
    waBtn.style.transform = 'scale(1.1)';
    waBtn.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)';
  });
  waBtn.addEventListener('mouseleave', () => {
    waBtn.style.transform = 'scale(1)';
    waBtn.style.boxShadow = '0 4px 24px rgba(37,211,102,0.45)';
  });
  document.body.appendChild(waBtn);

  window.closeMobile = function () {
    const m = document.getElementById('mobileMenu');
    if (m) m.classList.remove('open');
  };

})();
