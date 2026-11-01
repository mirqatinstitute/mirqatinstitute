# Mirqat Institute — landing page

Static landing page (`index.html`, `style.css`, `script.js`) — no build step. Open `index.html` in a browser or deploy the folder to any static host.

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `--green-700` | `#436E5B` | Primary: bands, buttons, headings |
| `--green-500` | `#6A9C77` | Secondary surfaces, icons |
| `--green-300` | `#7DC384` | Highlights only (never put text on it) |
| `--cream` | `#FEF1BC` | Warm accent, text on deep green |
| `--green-900` | `#1E3329` | Body text, footer |

## Content

Courses, about, teacher, pricing and contact/enrolment details come from the academy's content form.

- **Enrolment form**: opens WhatsApp (+91 94007 38280) with the enquiry pre-filled. To collect submissions elsewhere instead, set `CONFIG.formEndpoint` (e.g. Formspree) in `script.js`.
- **Contact**: WhatsApp/phone and email are in `index.html` (enrol section, FAQ, footer) and `CONFIG` in `script.js`.

## Still to add

- Teacher photo (the card currently shows initials).
- **Testimonials**: the three quotes in `#testimonials` are SAMPLE content — replace with real ones (with permission) before going live.

## Files

| Path | What it is |
|---|---|
| `brand/` | Logo files: stairway mark (SVG + 1024px PNG) and horizontal logo (dark and light text) |
| `assets/icons/` | Favicons and app icons |
| `assets/og-image.png` | 1200×630 preview shown when the link is shared |
| `favicon.ico`, `site.webmanifest` | Browser icon and app manifest |
| `robots.txt`, `sitemap.xml` | Search engine crawling; update `<lastmod>` when content changes |
| `SEO-GUIDE.md` | Step-by-step guide to improving search rankings |
