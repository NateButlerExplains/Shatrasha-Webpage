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
heroVideo.defaultMuted = true;
heroVideo.muted = true;
heroVideo.playsInline = true;
const motionButton = document.querySelector('#motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const reelDialog = document.querySelector('#reel-dialog');
const reelPlayer = document.querySelector('#reel-player');
// Follow the device preference until the visitor makes an explicit choice.
let motionPaused = heroVideo.earlyMotion?.detach() ?? null;
delete heroVideo.earlyMotion;
let autoplayBlocked = false;
let heroInView = true;
let playRequest = 0;
let autoplayRetryTimer = null;
let autoplayRetryAttempt = 0;
const autoplayRetryDelays = [250, 750, 1500, 3000];
let lastReelTrigger;
function shouldPauseMotion() {
  return (motionPaused ?? reducedMotion.matches) || !heroInView || document.hidden || reelDialog.open;
}
function updateMotionLabel() {
  const paused = shouldPauseMotion() || autoplayBlocked || heroVideo.paused;
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Play background motion' : 'Pause background motion');
  motionButton.querySelector('.motion-label').textContent = paused ? 'Play motion' : 'Pause motion';
  motionButton.querySelector('.motion-icon').textContent = paused ? '▶' : 'Ⅱ';
}
function cancelAutoplayRetry() {
  clearTimeout(autoplayRetryTimer);
  autoplayRetryTimer = null;
}
function queueAutoplayRetry() {
  // Recover a temporary native pause without looping against a browser policy.
  if (autoplayRetryTimer !== null || shouldPauseMotion() || !heroVideo.paused || heroVideo.error || autoplayRetryAttempt >= autoplayRetryDelays.length) return;
  autoplayRetryTimer = setTimeout(() => {
    autoplayRetryTimer = null;
    if (!shouldPauseMotion() && heroVideo.paused) applyMotion();
  }, autoplayRetryDelays[autoplayRetryAttempt++]);
}
function refreshMotion() {
  cancelAutoplayRetry();
  autoplayRetryAttempt = 0;
  applyMotion();
}
function applyMotion() {
  const request = ++playRequest;
  const stop = shouldPauseMotion();
  // Native inline autoplay and play() work together; deliberate pauses disable both.
  heroVideo.autoplay = !stop;
  if (stop) { cancelAutoplayRetry(); heroVideo.pause(); }
  else {
    heroVideo.muted = true;
    heroVideo.play().catch(error => {
      if (request !== playRequest || shouldPauseMotion()) return;
      // A browser refusal is not a user pause. Allow a later readiness/restore retry.
      autoplayBlocked = error.name !== 'AbortError';
      updateMotionLabel();
      queueAutoplayRetry();
    });
  }
  updateMotionLabel();
}
motionButton.addEventListener('click', () => {
  motionPaused = !(motionPaused || autoplayBlocked || heroVideo.paused);
  autoplayBlocked = false;
  refreshMotion();
});
heroVideo.addEventListener('playing', () => {
  if (shouldPauseMotion()) { heroVideo.pause(); return; }
  cancelAutoplayRetry();
  autoplayBlocked = false;
  updateMotionLabel();
});
heroVideo.addEventListener('pause', () => {
  updateMotionLabel();
  queueAutoplayRetry();
});
function resumeMotionWhenReady() {
  if (!shouldPauseMotion() && heroVideo.paused) applyMotion();
}
heroVideo.addEventListener('loadeddata', resumeMotionWhenReady);
heroVideo.addEventListener('canplay', resumeMotionWhenReady);
window.addEventListener('pageshow', refreshMotion);
reducedMotion.addEventListener('change', () => {
  if (motionPaused !== true) motionPaused = null;
  refreshMotion();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { reelPlayer.pause(); applyMotion(); }
  else refreshMotion();
});
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
  refreshMotion();
  lastReelTrigger?.focus({preventScroll:true});
});
document.querySelector('#reel-inquire').addEventListener('click', () => {
  closeReel();
  document.querySelector('#inquire').scrollIntoView({behavior:reducedMotion.matches ? 'auto' : 'smooth'});
});
applyMotion();
new IntersectionObserver(entries => {
  const wasInView = heroInView;
  heroInView = entries[0].isIntersecting;
  if (heroInView && !wasInView) refreshMotion();
  else applyMotion();
}, {threshold:0}).observe(heroVideo);
