# Media sources

Original event photographs supplied by the website owner:

| Website file | Original file |
| --- | --- |
| speaker-original.jpg | IMG_1572.JPG |
| speaking-original.jpg | IMG_1680.JPG |
| conversation-original.jpg | IMG_1604.JPG |

The photographs were resized for web delivery without generative changes.

## Link preview and image orientation

`docs/assets/shatrasha-speaker-social-v1.jpg` is the 1200 × 630 sharing card. It uses the owner's `IMG_1680.JPG`: Shatrasha in a gray blazer holding a microphone at a live event. The source was rotated according to its EXIF orientation, cropped, resized, and given a modest exposure/color adjustment. A charcoal fade, the approved Shatrasha wordmark, and the existing brand slogan complete the composition. The photograph retains its original facial, body, clothing, and venue details. An AI-generated layout study was considered but is not used in the published image.

The three website photographs above also have their orientation baked into the actual pixels, rather than relying on EXIF metadata, so browsers and messaging previews display them upright. Metadata was stripped and JPEG compression optimized for web delivery.

The circular S icon, favicon, and Apple touch icon come from the approved Shatrasha brand kit. No SB or B monogram is used in these website assets.

## Speaker reel with sound

`docs/assets/shatrasha-speaker-reel-v1.mp4` is the owner-approved 60-second speaker reel, exported at 1920 × 1080, 30 fps, H.264 video with stereo AAC audio. It is optimized for web delivery and starts progressively. The player uses `preload="none"` and plays with sound after a visitor clicks or taps either reel button. Native controls allow muting, volume adjustment, seeking, and fullscreen. Opening the reel pauses the background video; closing it stops the reel and restores the visitor's background-motion preference.

The source is the approved `Shatrasha-Speaker-Reel-Review-v1-1080p.mp4` retained outside this repository. The web export preserves its full 60-second edit and copies the approved AAC audio without re-encoding. The poster is a frame from that approved reel.

The original recordings used for picture are MVI_1643, MVI_1704, MVI_1699, MVI_1507, MVI_1703, MVI_1392, MVI_1394, MVI_1518, MVI_1700, MVI_1457, MVI_1701, MVI_1521, MVI_1705, MVI_1542, and MVI_1627. All show real supplied event footage; no generated people or audience were added.

Three continuous original speech excerpts play at their natural rate:

| Recording | Source interval | Reel start |
| --- | --- | --- |
| MVI_1643.MP4 | 4.10–10.88 seconds | 0.35 seconds |
| MVI_1405.MP4 | 6.62–20.20 seconds | 24.00 seconds |
| MVI_1627.MP4 | 2.72–5.20 seconds | 49.50 seconds |

The original instrumental bed and transition sounds were synthesized locally for the reel. No borrowed song, stock audio samples, fabricated cheers, or synthetic voice were used. The visuals use the approved Shatrasha wordmark, charcoal, lime, and white palette.

## Muted background motion

`docs/assets/speaker-hero.mp4` remains the separate 23.023-second, 720p silent background loop. Its selected recordings are MVI_1704, MVI_1703, MVI_1700, MVI_1394, MVI_1392, MVI_1507, MVI_1518, and MVI_1457. The hero keeps its mute, inline autoplay, and manual-pause behavior; it plays for every visitor regardless of Reduce Motion, and when Safari refuses autoplay the same file is shown through Safari's video-as-image `<picture>` path so it still loops without a tap; other browsers fall back to the first tap anywhere (see README). It continues using `reel-poster.jpg`.

Full originals and detailed edit records are retained outside this deployment repository.
