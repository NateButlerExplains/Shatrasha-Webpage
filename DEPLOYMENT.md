# Publishing and domain connection

Repository: https://github.com/NateButlerExplains/Shatrasha-Webpage

Production domain: https://shatrasha.com/

GitHub Pages settings: https://github.com/NateButlerExplains/Shatrasha-Webpage/settings/pages

## GitHub

Publish from branch `main`, directory `/docs`. Set the custom domain to `shatrasha.com` before changing DNS. The `docs/CNAME` file preserves this custom domain across later releases. Enable Enforce HTTPS once GitHub finishes issuing the certificate.

## GoDaddy DNS

Open GoDaddy Domain Portfolio → shatrasha.com → DNS.

Replace the existing root (`@`) parking A record(s), then add the following. TTL can remain at the default of 1 hour.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | natebutlerexplains.github.io |

Edit the existing `www` CNAME instead of creating a duplicate. Do not include `https://`, a slash, or the repository name in its value. Leave nameservers and unrelated mail/TXT records in place. If GoDaddy has a domain-forwarding rule, remove that forwarding so these DNS records control the website.

Observed before connection: nameservers `ns31.domaincontrol.com` and `ns32.domaincontrol.com`; root addresses `3.33.130.190` and `15.197.148.33`; `www` aliased to `shatrasha.com`.

After saving, verify DNS and then check GitHub Pages for certificate readiness. DNS and certificate propagation are not immediate. The www hostname should redirect to the apex domain after setup.

Official instructions:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://www.godaddy.com/en/help/add-an-a-record-19238

## Local operation

The inquiry form prepares email drafts; no application backend, secrets or external form provider is configured. The website's JavaScript, photos and videos are included in this repository. Fonts load from Google Fonts with system fallbacks.
