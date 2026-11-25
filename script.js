(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const nav = $('.main-nav'), menu = $('.menu-toggle'), scrim = $('.scrim');
  const search = $('.search-overlay'), cart = $('.cart-drawer');
  const slides = ['images/slider-default1.jpg', 'images/slider-default2.jpg', 'images/slider-default3.jpg'];
  const hero = $('.hero-slide'), dots = $$('.hero-dot'); let current = 0, timer;
  function showSlide(n) { current = (n + slides.length) % slides.length; hero.style.backgroundImage = `url("${slides[current]}")`; dots.forEach((d, i) => d.classList.toggle('active', i === current)); }
  function startSlider() { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; timer = window.setInterval(() => showSlide(current + 1), 6500) }
  dots.forEach(d => d.addEventListener('click', () => { showSlide(Number(d.dataset.slide)); clearInterval(timer); startSlider() }));
  $('.slide-arrow.prev').addEventListener('click', () => { showSlide(current - 1); clearInterval(timer); startSlider() });
  $('.slide-arrow.next').addEventListener('click', () => { showSlide(current + 1); clearInterval(timer); startSlider() }); startSlider();
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation') });
  $$('.sub-toggle').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); btn.closest('.has-sub')?.classList.toggle('sub-open') }));
  $$('.main-nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false') }));
  function closePanels() { search.classList.remove('open'); cart.classList.remove('open'); scrim.classList.remove('show'); search.setAttribute('aria-hidden', 'true'); cart.setAttribute('aria-hidden', 'true') }
  function openPanel(panel) { closePanels(); panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); scrim.classList.add('show'); $('input', panel)?.focus() }
  $('.search-open').addEventListener('click', () => openPanel(search)); $('.cart-open').addEventListener('click', () => openPanel(cart));
  $('.search-close').addEventListener('click', closePanels); $('.cart-close').addEventListener('click', closePanels); scrim.addEventListener('click', closePanels);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanels() });
  $('.search-form').addEventListener('submit', e => { e.preventDefault(); const term = $('input', e.currentTarget).value.trim().toLowerCase(); if (!term) return; const match = $$('main h1,main h2,main h3').find(el => el.textContent.toLowerCase().includes(term)); if (match) { closePanels(); match.scrollIntoView({ behavior: 'smooth', block: 'center' }) } else { $('input', e.currentTarget).setCustomValidity('No matching heading found.'); $('input', e.currentTarget).reportValidity() } });
  $('.search-form input').addEventListener('input', e => e.currentTarget.setCustomValidity(''));
  $('.newsletter-form').addEventListener('submit', e => { e.preventDefault(); const input = $('#email'), feedback = $('.form-feedback'); if (!input.checkValidity()) { input.reportValidity(); return } feedback.textContent = 'Thank you for subscribing!'; e.currentTarget.reset() });
  const back = $('.back-top'); window.addEventListener('scroll', () => back.classList.toggle('visible', window.scrollY > 420), { passive: true }); back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  $('#year').textContent = new Date().getFullYear();
})();