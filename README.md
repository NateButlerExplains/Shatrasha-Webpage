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
- The site includes a motion pause control and respects reduced-motion preferences.
- The background video starts muted and inline on desktop and mobile when motion is permitted. An inline startup enables native muted inline autoplay and its pause control as soon as the hero is parsed, independently of the deferred app script, while honoring Reduce Motion before playback. Any early pause choice carries over when the app initializes. Bounded retries recover unexpected browser pauses, media-readiness interruptions, and page restoration; visibility follows the video element itself. Deliberate pauses are preserved. If a browser or device setting blocks autoplay, the poster and Play motion control remain available.
- Only the approved website and its necessary assets are published. Prior design variations and full-resolution event originals remain preserved separately.

See [DEPLOYMENT.md](DEPLOYMENT.md) for domain setup, [MEDIA.md](MEDIA.md) for media sources, and [SEO.md](SEO.md) for search and link-preview maintenance.
