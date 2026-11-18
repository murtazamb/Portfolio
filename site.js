const showcase = document.querySelector('.showcase');

if (showcase) {
  const slides = [...showcase.querySelectorAll('.slide')];
  const dots = [...showcase.querySelectorAll('[data-slide]')];
  const controls = showcase.querySelector('.slider-controls');
  const status = showcase.querySelector('#slide-status');
  let current = 0;

  function showSlide(index) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;

    slides[current].hidden = true;
    slides[current].classList.remove('slide-enter');
    dots[current].setAttribute('aria-pressed', 'false');
    current = next;
    slides[current].hidden = false;
    slides[current].classList.add('slide-enter');
    dots[current].setAttribute('aria-pressed', 'true');
    status.textContent = `${current + 1} of ${slides.length} · ${slides[current].querySelector('h3').textContent}`;
  }

  for (const dot of dots) {
    dot.addEventListener('click', () => showSlide(Number(dot.dataset.slide)));
  }
  for (const arrow of controls.querySelectorAll('[data-direction]')) {
    arrow.addEventListener('click', () => showSlide(current + Number(arrow.dataset.direction)));
  }
  showcase.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    if (event.target.closest('.slide')) showcase.focus({ preventScroll: true });
    showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  controls.hidden = false;
}
