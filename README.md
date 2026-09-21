# Shatrasha — speaking engagements

The approved speaking homepage for **shatrasha.com**, featuring original event photography, a real-footage video hero, a branded speaker reel, speaking topics and an event inquiry form.

## Website

The complete static website lives in `docs/`. GitHub Pages publishes `main` → `/docs` automatically when updates are pushed. No application build, package installation, or API keys are required.

To preview locally from the repository root:

```sh
python3 -m http.server 8767 --bind 127.0.0.1 --directory docs
```

## Inquiry form

The form prepares an email draft addressed to `inquiries@butlerlegalservice.com`. The visitor reviews and sends it in their own email application, or copies the inquiry text. It does not submit to a server or send email automatically.

## Media

- Photos are resized original event photographs; no generated face or body modifications are used.
- The 23.023-second background edit is a muted 720p loop.
- The 60-second 1080p speaker reel includes Shatrasha’s original voice, music, layered footage, and approved branding. It starts with sound only when a visitor chooses the reel; native controls provide mute, volume, seeking, and fullscreen. The file is not preloaded on page entry.
- The site includes a motion pause control. At the owner's direction the background video plays for every visitor, including those with Reduce Motion enabled; the pause control is always available, and the marquee still honors Reduce Motion.
- The background video uses the browser's native path: `<video autoplay muted loop playsinline>`. One scripted `play()` backs it up once the media metadata has loaded. If a phone refuses autoplay (for example iPhone Low Power Mode, where Apple blocks all video autoplay, or some in-app browsers), the poster stays visible and the visitor's first tap or key press anywhere on the page starts the video; the Play motion control also works. Only the visitor's own press of the control counts as a pause, and it is preserved across tab switches and opening or closing the reel. There are no retry timers and no scripted visibility pausing; browsers suspend off-screen autoplay video themselves.
- Known iPhone behavior: from Safari 27 (iOS 27, September 2026), if the visitor has Settings > Accessibility > Motion > Auto-Play Video Previews turned off, Safari will not even download the background video until the visitor taps. The site treats the first tap anywhere as that permission. Low Power Mode behaves the same way. Neither can be overridden from a web page.
- Troubleshooting: add `?motiondebug` to the address (for example `https://shatrasha.com/?motiondebug`) to show an on-page log of the device, every video event, and the exact reason any `play()` was refused. Tap the log to copy it. Normal visitors never see it.
- Only the approved website and its necessary assets are published. Prior design variations and full-resolution event originals remain preserved separately.

See [DEPLOYMENT.md](DEPLOYMENT.md) for domain setup, [MEDIA.md](MEDIA.md) for media sources, and [SEO.md](SEO.md) for search and link-preview maintenance.
