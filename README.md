# Shatrasha Butler — speaking engagements

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
- The 1080p reel includes speaker and contact lower thirds. This first version has no audio track.
- The site includes a motion pause control and respects reduced-motion preferences.
- Only the approved website and its necessary assets are published. Prior design variations and full-resolution event originals remain preserved separately.

See [DEPLOYMENT.md](DEPLOYMENT.md) for domain setup and [MEDIA.md](MEDIA.md) for the source clip list.
