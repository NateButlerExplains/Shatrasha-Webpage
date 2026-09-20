# Search and sharing maintenance

The public brand is **Shatrasha**. Her full name remains in the factual biography, legal disclosures, and Person structured data to connect her professional identity accurately.

## Where to edit

- `docs/index.html`: search title, description, canonical URL, Open Graph and Twitter sharing fields, Google verification tag, and WebSite/WebPage/Person structured data. Search and sharing metadata are present in the initial HTML and do not require JavaScript.
- `docs/assets/shatrasha-speaker-social-v1.jpg`: the 1200 × 630 sharing image. When replacing it, use a new versioned filename and update every image reference and dimension in the document head.
- `docs/assets/favicon.ico`, `favicon-192.png`, and `apple-touch-icon.png`: approved S branding for browser/search/device icons.
- `docs/robots.txt`: permits crawling and identifies the sitemap.
- `docs/sitemap.xml`: contains the canonical homepage. Add new real pages when they exist; section anchors are not separate pages.

## Content standards

Keep one descriptive H1 and clear headings for speaking topics, workshops, the speaker biography, and inquiries. Write for event organizers using the actual topics offered: legal confidence and self-advocacy, business and contracts, and planning and legacy. Avoid keyword repetition, invented credentials, fabricated endorsements, and duplicate pages created only to target search phrases.

Keep visible content and structured data consistent. Add official profile links to structured data only after confirming ownership. Do not add ratings, event dates, affiliations, or client names without evidence and permission. The existing FAQ is useful to visitors; it does not imply eligibility for a Google FAQ rich result.

## Google Search Console

Use the URL-prefix property `https://shatrasha.com/`. The Google site-verification meta tag must remain in the homepage after ownership verification.

After publishing, inspect the canonical homepage, test the live URL, request indexing, and submit `https://shatrasha.com/sitemap.xml`. Check indexing and actual search queries in Search Console as data becomes available. A valid sitemap or successful indexing request does not establish that the page is indexed or guarantee its rank.

Earning the first result for the unique name is the goal, not a promise. Relevant links from Shatrasha's verified professional profiles, legal-practice site, and real event-organizer pages can help people and search engines find the official site. Changes to those external properties require their owners' access and authorization.

## Sharing checks

Confirm the deployed initial HTML includes `og:title`, `og:description`, `og:image`, and matching Twitter tags. The absolute image URL must return a public JPEG with HTTP 200. Inspect the actual pixels at small preview sizes. Older Messages previews may remain cached; test a newly sent link after deployment. A temporary query such as `?share=1` can be tried for a fresh preview while the canonical URL remains unchanged; client cache behavior is not guaranteed.

## References

- [Apple: Create rich previews for Messages](https://developer.apple.com/documentation/technotes/tn3156-create-rich-previews-for-messages)
- [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google: Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Google: Favicons in search](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Google: Ask Google to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: FAQ rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
