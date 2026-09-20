const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => { document.querySelector('#topic').value = link.dataset.topic; }));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => { document.querySelector('#inquiry-result').hidden = true; }));
const form = document.querySelector('#inquiry-form');
let inquiryText = '';
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const field = name => String(data.get(name) || '').trim();
  if (!field('name') || !field('message')) { const input = form.elements[!field('name') ? 'name' : 'message']; input.setCustomValidity('Please add a few words here.'); input.reportValidity(); input.addEventListener('input', () => input.setCustomValidity(''), {once:true}); return; }
  inquiryText = `Hello Shatrasha,\n\nI’d like to discuss a speaking engagement.\n\nName: ${field('name')}\nEmail: ${field('email')}\nOrganization / event: ${field('organization') || 'To be discussed'}\nDate / timeframe: ${field('date') || 'To be discussed'}\nLocation: ${field('location') || 'To be discussed'}\nTopic: ${field('topic') || 'Let’s decide together'}\n\nAbout our audience and event:\n${field('message')}\n\nThank you,\n${field('name')}`;
  const subject = `Speaking inquiry${field('organization') ? ' — ' + field('organization') : ''}`;
  document.querySelector('#email-draft').href = `mailto:inquiries@butlerlegalservice.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryText)}`;
  const result = document.querySelector('#inquiry-result');
  result.hidden = false;
  document.querySelector('#copy-status').textContent = '';
  result.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest'});
});
document.querySelector('#copy-inquiry').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(`To: inquiries@butlerlegalservice.com\n\n${inquiryText}`); document.querySelector('#copy-status').textContent = 'Copied. Paste it into your preferred email app.'; }
  catch { document.querySelector('#copy-status').textContent = 'Copy is unavailable in this browser. Use “Open email draft” instead.'; }
});

form.addEventListener('input', () => { document.querySelector('#inquiry-result').hidden = true; });
form.addEventListener('change', () => { document.querySelector('#inquiry-result').hidden = true; });

// All background motion has one visible control and honors reduced motion.
const heroVideo = document.querySelector('#hero-video');
const motionButton = document.querySelector('#motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const reelDialog = document.querySelector('#reel-dialog');
const reelPlayer = document.querySelector('#reel-player');
let motionPaused = reducedMotion.matches;
let heroInView = true;
let lastReelTrigger;
function updateMotionLabel() {
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.setAttribute('aria-label', motionPaused ? 'Play background motion' : 'Pause background motion');
  motionButton.querySelector('.motion-label').textContent = motionPaused ? 'Play motion' : 'Pause motion';
  motionButton.querySelector('.motion-icon').textContent = motionPaused ? '▶' : 'Ⅱ';
}
function applyMotion() {
  const stop = motionPaused || !heroInView || document.hidden || reelDialog.open;
  document.body.classList.toggle('motion-paused', stop);
  if (stop) heroVideo.pause();
  else heroVideo.play().catch(error => { if (error.name === 'AbortError' || !heroInView || document.hidden || reelDialog.open) return; motionPaused = true; document.body.classList.add('motion-paused'); updateMotionLabel(); });
  updateMotionLabel();
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; applyMotion(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; applyMotion(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) reelPlayer.pause(); applyMotion(); });
document.querySelectorAll('[data-open-reel]').forEach(trigger => trigger.addEventListener('click', () => {
  lastReelTrigger = trigger;
  reelDialog.showModal();
  document.body.classList.add('modal-open');
  applyMotion();
  reelPlayer.play().catch(() => {});
}));
function closeReel() { reelDialog.close(); }
document.querySelector('.dialog-close').addEventListener('click', closeReel);
reelDialog.addEventListener('click', event => {
  const rect = reelDialog.getBoundingClientRect();
  if (event.target === reelDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeReel();
});
reelDialog.addEventListener('close', () => {
  reelPlayer.pause();
  document.body.classList.remove('modal-open');
  applyMotion();
  lastReelTrigger?.focus({preventScroll:true});
});
document.querySelector('#reel-inquire').addEventListener('click', () => {
  closeReel();
  document.querySelector('#inquire').scrollIntoView({behavior:reducedMotion.matches ? 'auto' : 'smooth'});
});
applyMotion();
new IntersectionObserver(entries => { heroInView = entries[0].isIntersecting; applyMotion(); }, {threshold:0}).observe(document.querySelector('#home'));
