# Mirqat Institute — website

Built with [Astro](https://astro.build) (static output) and [Motion](https://motion.dev) for animations. Hosted on Vercel.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Vercel builds automatically on every push (settings are in `vercel.json`): pushes to `main` go live, and every other branch gets its own preview URL.

## Where things live

| Path | What it is |
|---|---|
| `src/data/site.ts` | **Academy facts in one place**: contact details, social links, headline numbers (`METRICS`), plans and prices, homepage FAQ, teacher list. Update facts here and every page and the SEO data follow. |
| `src/content/courses/*.md` | **One file per course page** (`/courses/<file-name>`). The frontmatter holds the title, SEO title and description, level, plan, starting point (for the "find your step" picker), "what you'll learn", "who it's for", FAQs and **reviews**; the text below it is the page's article. Add a new `.md` file to add a course page. |
| `src/pages/` | Routes: `index.astro` (homepage), `about.astro`, `faculties.astro`, `pricing.astro`, `contact.astro`, `faq.astro`, policy pages `refund-policy.md`, `privacy-policy.md`, `terms.md` (Markdown, using `layouts/LegalLayout.astro`), `courses/index.astro` (all courses), `courses/[slug].astro` (course page template), `404.astro`. |
| `src/components/` | Page sections (Hero, Ladder, About, Teachers, Pricing, Faq, Enrol, …) and `Seo.astro` (meta tags and structured data). |
| `src/layouts/BaseLayout.astro` | Shared page shell: head, header, footer, fonts, scripts. |
| `src/data/whatsapp.ts` | **Every pre-filled WhatsApp message** (general, question, course, fees, not-sure, review, enquiry form) and the `waLink()` helper. Edit the wording here. |
| `src/scripts/` | `motion.ts` (animations), `enrol.ts` (WhatsApp enquiry form with live preview), `wa-float.ts` (floating button greeting), `nav.ts` (mobile menu). |
| `src/styles/global.css` | All styles. Colour tokens are at the top. |
| `src/assets/teachers/` | Teacher photos. Astro resizes and compresses them at build time. |
| `public/fonts/` | **Somar Sans** web fonts (Baianat Type, free for commercial and personal use), subset to Latin and Arabic in 400/500/600/700. **All text on the site uses it** — headings, body, numbers and Arabic. Outfit and Noto Naskh Arabic remain only as fallbacks for the few characters Somar Sans lacks (₹, the long dash, rare Arabic glyphs). |
| `public/` | Files served as-is: favicons, `og-image.png`, `robots.txt`, `site.webmanifest`, `brand/` logo files, and the Google Search Console verification file (keep it). |

## SEO built in

- A unique title, description and canonical URL on every page (`Seo.astro`).
- Open Graph and Twitter tags with a preview image.
- Structured data: organisation, website, and on each page FAQPage, Course and BreadcrumbList, plus an ItemList of courses.
- `sitemap-index.xml` generated automatically on every build (`@astrojs/sitemap`).
- Clean URLs without `.html` or trailing slashes (`/courses/tajweed`).
- Self-hosted fonts (Somar Sans; no Google Fonts request), optimised images, zero JavaScript except the small animation, menu and form scripts.

See `SEO-GUIDE.md` for what to do outside the code: Search Console, Google Business Profile, reviews and more.

## Animations

`src/scripts/motion.ts` uses Motion for:
- staggered reveals as sections scroll into view
- the ladder steps rising with a spring
- count-up numbers (800+)
- a gentle hero parallax
- a reading-progress bar
- springy button presses

Content is only hidden while JavaScript is running. Everything shows immediately for visitors with "reduce motion" turned on, and also if the script fails to load.

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `--green-700` | `#436E5B` | Primary: bands, buttons, headings |
| `--green-500` | `#6A9C77` | Secondary surfaces, icons |
| `--green-300` | `#7DC384` | Highlights only (never put text on it) |
| `--cream` | `#FEF1BC` | Warm accent, text on deep green |
| `--green-900` | `#1E3329` | Body text, footer |

## Still sample content

- **Testimonials** (`src/components/Testimonials.astro`): the three quotes are SAMPLE content. Replace them with real ones (with permission).
- **Nihala Jamal** (`TEACHERS` in `src/data/site.ts`): her role is SAMPLE content.

## Policy pages

`src/pages/refund-policy.md`, `privacy-policy.md` and `terms.md` are written in plain Markdown — edit the text directly and update the `updated:` date at the top. The first versions were drafted from what we knew (monthly billing, WhatsApp enquiries, one-to-one online classes) and must be checked by the academy before relying on them.

## Course reviews

Each course file has a `reviews:` list (empty for now). Paste real reviews there (shared with permission) and they appear on that course page. Until then, the page shows a "Share your review" prompt that opens WhatsApp. Please don't add invented reviews.

## Teachers

Muhammed Saahil is the featured card in `src/components/Teachers.astro`. Everyone else is listed in `TEACHERS` in `src/data/site.ts` (name, role, and `photo: 'male' | 'female'` for the profile illustration). To add a real photo, put it in `src/assets/teachers/` and ask for it to be wired in.
