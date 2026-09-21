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

// Background motion: native muted autoplay, one visible control, first-touch fallback.
const heroVideo = document.querySelector('#hero-video');
const motionButton = document.querySelector('#motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const reelDialog = document.querySelector('#reel-dialog');
const reelPlayer = document.querySelector('#reel-player');
// Only the visitor's own button press pauses motion; a browser refusal never counts as a choice.
let userPaused = false;
let lastReelTrigger;

// Add ?motiondebug to the address to see on the page why background motion did or did not start.
const motionDebug = (() => {
  if (!new URLSearchParams(location.search).has('motiondebug')) return Object.assign(() => {}, {active:false});
  const panel = document.createElement('pre');
  panel.dataset.motionDebug = '';
  panel.style.cssText = 'position:fixed;left:0;right:0;bottom:0;max-height:45vh;overflow:auto;margin:0;padding:8px 10px;z-index:100;background:#000000d9;color:#9dff8a;font:11px/1.45 ui-monospace,Menlo,monospace;white-space:pre-wrap;overflow-wrap:anywhere';
  panel.textContent = 'MOTION DEBUG — tap this box to copy\n';
  panel.addEventListener('click', () => {
    if (navigator.clipboard) navigator.clipboard.writeText(panel.textContent).catch(() => {});
    getSelection().selectAllChildren(panel);
  });
  document.body.append(panel);
  return Object.assign(message => { panel.textContent += `+${Math.round(performance.now())}ms ${message}\n`; panel.scrollTop = panel.scrollHeight; }, {active:true});
})();
const motionState = () => `paused=${heroVideo.paused} ready=${heroVideo.readyState} net=${heroVideo.networkState} t=${heroVideo.currentTime.toFixed(2)}`;
if (motionDebug.active) {
  motionDebug(navigator.userAgent);
  motionDebug(`reduced-motion=${reducedMotion.matches} hidden=${document.hidden} save-data=${navigator.connection?.saveData ?? 'n/a'} autoplay-attr=${heroVideo.hasAttribute('autoplay')} muted=${heroVideo.muted} ${motionState()}`);
  ['loadstart', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'play', 'playing', 'pause', 'waiting', 'stalled', 'suspend', 'emptied', 'abort'].forEach(type => heroVideo.addEventListener(type, () => motionDebug(`${type} ${motionState()}`)));
  const framesAdvancing = () => { if (heroVideo.currentTime > 0) { motionDebug(`frames advancing ${motionState()}`); heroVideo.removeEventListener('timeupdate', framesAdvancing); } };
  heroVideo.addEventListener('timeupdate', framesAdvancing);
  // iOS 27 Safari never fetches a video when Accessibility > Motion > Auto-Play Video Previews is off; only a tap can start it.
  setTimeout(() => { if (heroVideo.networkState === 0 && heroVideo.readyState === 0) motionDebug('VERDICT: browser never started loading the video — it is waiting for a tap. On iPhone check Settings > Accessibility > Motion > Auto-Play Video Previews.'); }, 2000);
}

function wantsMotion() { return !userPaused && !document.hidden && !reelDialog.open; }
function updateMotionLabel() {
  const paused = heroVideo.paused;
  // The button also stops the marquee, but only when the visitor asked for it.
  document.body.classList.toggle('motion-paused', userPaused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Play background motion' : 'Pause background motion');
  motionButton.querySelector('.motion-label').textContent = paused ? 'Play motion' : 'Pause motion';
  motionButton.querySelector('.motion-icon').textContent = paused ? '▶' : 'Ⅱ';
}
function startMotion(reason) {
  if (!wantsMotion() || !heroVideo.paused) return;
  heroVideo.muted = true;
  heroVideo.play().then(() => motionDebug(`play(${reason}) allowed`), error => { motionDebug(`play(${reason}) refused — ${error.name}: ${error.message}`); updateMotionLabel(); });
}
function syncMotion(reason) {
  if (wantsMotion()) startMotion(reason);
  else heroVideo.pause();
  updateMotionLabel();
}
motionButton.addEventListener('click', () => { userPaused = !heroVideo.paused; syncMotion('button'); });
heroVideo.addEventListener('play', updateMotionLabel);
heroVideo.addEventListener('pause', updateMotionLabel);
heroVideo.addEventListener('error', () => { motionDebug(`error code=${heroVideo.error?.code} ${heroVideo.error?.message ?? ''}`); updateMotionLabel(); });

// If a phone refuses autoplay (Low Power Mode, an in-app browser), the first tap or key press anywhere starts it.
const unlockEvents = ['touchend', 'click', 'keydown'];
function unlockMotion(event) {
  if (event.target.closest?.('#motion-toggle, [data-open-reel], [data-motion-debug]')) return;
  startMotion(event.type);
}
unlockEvents.forEach(type => document.addEventListener(type, unlockMotion, {capture:true, passive:true}));
heroVideo.addEventListener('playing', () => unlockEvents.forEach(type => document.removeEventListener(type, unlockMotion, {capture:true})), {once:true});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) reelPlayer.pause();
  syncMotion('visibility');
});
// A page restored from the back/forward cache comes back paused.
window.addEventListener('pageshow', event => { if (event.persisted) syncMotion('pageshow'); });
document.querySelectorAll('[data-open-reel]').forEach(trigger => trigger.addEventListener('click', () => {
  lastReelTrigger = trigger;
  reelDialog.showModal();
  document.body.classList.add('modal-open');
  syncMotion('reel-open');
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
  syncMotion('reel-close');
  lastReelTrigger?.focus({preventScroll:true});
});
document.querySelector('#reel-inquire').addEventListener('click', () => {
  closeReel();
  document.querySelector('#inquire').scrollIntoView({behavior:reducedMotion.matches ? 'auto' : 'smooth'});
});

// The autoplay attribute leads. A scripted play() backs it up straight away (it also starts loading when the browser
// has not begun on its own) and again once metadata arrives, so the debug log records any refusal and its reason.
if (!wantsMotion()) heroVideo.pause();
startMotion('init');
heroVideo.addEventListener('loadedmetadata', () => startMotion('loadedmetadata'), {once:true});
updateMotionLabel();
