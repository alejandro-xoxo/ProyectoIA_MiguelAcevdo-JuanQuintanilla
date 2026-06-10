/**
 * navigation.js
 * Navegación y scroll spy
 */

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden-vanilla');
}

export function setupScrollSpy() {
  window.addEventListener('scroll', () => {
    const sections = ['inicio', 'nosotros', 'catalogo', 'innovacion', 'contacto'];
    const scrollPos = window.scrollY + 200;
    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
        document.querySelectorAll('.nav-link').forEach((btn) => btn.classList.remove('text-[#e2b6ff]'));
        const activeBtn = document.querySelector(`.nav-link[data-target="${sec}"]`);
        if (activeBtn) activeBtn.classList.add('text-[#e2b6ff]');
      }
    });
  });
}
