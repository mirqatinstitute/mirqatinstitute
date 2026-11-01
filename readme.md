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

## Before launch — replace placeholder content

- **Teachers** (`#teachers`): names, roles, bios; swap initials for photos if desired.
- **Testimonials** (`#testimonials`): use real quotes, with permission.
- **Pricing** (`#pricing`): real plans and prices.
- **Contact**: email in `index.html` footer/FAQ and `CONFIG.contactEmail` in `script.js`; social links in the footer.
- **WhatsApp**: set `CONFIG.whatsappNumber` in `script.js` (digits with country code).
- **Trial form**: set `CONFIG.formEndpoint` (e.g. Formspree) in `script.js`. Until then, submissions open a pre-filled email to `contactEmail`.
- **Social preview**: add a 1200×630 `og-image.png` and uncomment the `og:image` tag.
