# SEO Guide: Mirqat Institute

A practical guide to getting mirqatinstitute.com found on Google, written for doing the work yourself.
Work through Part 2 in order; the first three steps matter most.

---

## Part 1: What's already done on the website

| Area | What was added |
|---|---|
| **Title tag** | `Online Quran Classes – Tajweed, Hifz & Noorani Qaida \| Mirqat Institute`. This is the blue link people see on Google, and it starts with what people actually search for. |
| **Meta description** | The two-line summary under the link: courses, Kollam/Kerala, kids and adults, price from ₹1,300. |
| **Canonical URL** | Tells Google the one true address is `https://www.mirqatinstitute.com/`. |
| **Structured data (JSON-LD)** | Machine-readable facts for Google: organisation, address, phone, courses with INR prices, Instagram/Facebook links, and all FAQ questions. These can unlock richer search results. |
| **Social previews** | `assets/og-image.png` appears when the link is shared on WhatsApp, Facebook, Instagram DMs, LinkedIn or X. |
| **Icons** | `favicon.ico`, SVG favicon, Apple touch icon, Android icons and `site.webmanifest`. |
| **robots.txt and sitemap** | `sitemap-index.xml` is generated automatically on every build and lists every page. |
| **A page per course** | `/courses/noorani-qaida`, `/courses/tajweed`, `/courses/quran-reading`, `/courses/hifz`, `/courses/quran-revision`, plus `/courses`. Each has its own title, description, article, FAQ and Course/Breadcrumb/FAQ structured data, so each can rank for its own searches. |
| **Speed** | Built with Astro: plain HTML, self-hosted fonts, auto-compressed images, very little JavaScript. |
| **Mobile and speed** | Responsive layout, no heavy frameworks, fonts load with `display=swap`. |
| **Accessibility** | Proper heading order, labels and alt text. Google rewards accessible pages. |

---

## Part 2: What you should do (in this order)

### 1. Google Search Console (do this the day the site goes live)
This is Google's free dashboard for your site.

1. Go to <https://search.google.com/search-console> and sign in with the academy's Google account.
2. Add a **Domain** property for `mirqatinstitute.com` and verify it by adding the TXT record it gives you at your domain registrar (GoDaddy, Hostinger, Namecheap, etc.).
3. Open **Sitemaps** and submit `https://www.mirqatinstitute.com/sitemap-index.xml`. It's regenerated automatically on every deploy, so you only submit it once.
4. Open **URL Inspection**, paste the homepage address and click **Request indexing**.
5. Check back weekly. **Performance → Search results** shows which searches bring people to you.

Then do the same in **Bing Webmaster Tools** (<https://www.bing.com/webmasters>). It can import everything from Search Console in one click.

### 2. Google Business Profile (the biggest win for "Quran classes near me")
When someone in Kerala searches "Quran classes Kollam", the map results come from Google Business Profile, not your website.

1. Go to <https://business.google.com> and create a profile named **Mirqat Institute**.
2. Category: **Tutoring service**. Add **Religious school** as a secondary category.
3. If students don't visit a physical address, choose **service-area business** and list Kollam, Kerala, India (and online).
4. Add: website link, WhatsApp/phone number, hours, a description using the words *online Quran classes, Tajweed, Hifz, Noorani Qaida*, and your logo (`brand/mirqat-mark-1024.png`).
5. Upload **real photos**: the teacher, a class in progress (with permission), certificates.
6. **Ask every happy parent or student for a Google review.** Send them the review link from your profile over WhatsApp. Reviews are the strongest local ranking signal, and they can later replace the sample testimonials on the website.

### 3. Replace the sample testimonials with real ones
The testimonials on the site are **samples**. Collect 3–6 real ones (WhatsApp messages from parents are fine, with permission) and send them over. Real testimonials build trust with visitors, and Google values genuine content.

### 4. Connect all your profiles to the website
Every link to your site helps Google trust it.
- **Instagram bio** → `https://www.mirqatinstitute.com`
- **Facebook page** → the website field in the About section
- **WhatsApp Business** → the website field in the business profile (use WhatsApp Business, not the personal app)
- **YouTube** (if you start one) → the channel's About section
- Social links are set in `src/data/site.ts` (`SITE.social`). Instagram is **`mirqatinstitute`**; Facebook is still **`mirqatinstitue`** — update it there if that handle changes too.

### 5. List the academy on directories (backlinks)
Create free listings, always with the same name, phone and website (consistency matters):
- **Justdial**, **Sulekha**, **UrbanPro**, **Superprof** (tutoring directories popular in India)
- Local mosque or Mahallu websites and community WhatsApp channels
- Any madrasa or Islamic education directories you know of

### 6. Grow the content (the long-term engine)
One page can only rank for a few searches. Each new page is a new door into the site.

**a) Course pages: done.** Each course has its own page under `/courses/`. To improve one, edit its file in `src/content/courses/`. Adding real details (teacher notes, a typical lesson, student results) makes each page stronger. To add a new course, add a new `.md` file there.

**b) Helpful articles**, one or two per month, answering real questions parents ask:
- "How long does it take to complete Hifz?"
- "At what age should a child start learning the Quran?"
- "Noorani Qaida vs Iqra: which is better for beginners?"
- "10 common Tajweed mistakes and how to fix them"
- "How online Quran classes work for kids"

**c) Malayalam content.** Many families in Kerala search in Malayalam (e.g. "ഖുർആൻ ക്ലാസ്", "ഓൺലൈൻ ഖുർആൻ പഠനം"). A Malayalam version of the homepage, or Malayalam articles, faces far less competition.

### 7. Keywords to aim for
Use these naturally in page titles, headings, and Instagram/Facebook posts. Don't stuff them.

| Priority | Searches |
|---|---|
| Main | online Quran classes · learn Quran online · online Quran classes for kids |
| Courses | online Tajweed course · online Hifz classes · Noorani Qaida online · Quran reading classes |
| Local | Quran classes Kollam · Quran classes Kerala · Quran tutor Kerala · Hifz classes Kerala |
| Gulf (Malayali families abroad) | Malayalam Quran classes online · online Quran classes UAE / Qatar / Saudi |

Tip: type a phrase into Google and look at **"People also ask"** and **related searches** at the bottom. Those are free article ideas.

### 8. Use real photos
Stock images don't help. Upload real photos of the teacher, classes and certificates:
- Compress them first (<https://squoosh.app>, export as WebP, under 200 KB).
- Give files descriptive names (`quran-tutor-muhammed-saahil.webp`, not `IMG_2041.jpg`).
- Describe each photo in its alt text (I'll do this when adding them).

### 9. Measure
- **Search Console**: impressions, clicks and which searches you appear for (check monthly).
- Add **Google Analytics 4** or a privacy-friendly tool like **Plausible** if you want visitor numbers. Send me the measurement ID and I'll add it.
- Most useful number: **how many people click the WhatsApp button**. That's your real enrolment funnel.

### 10. Check the technical health occasionally
- **PageSpeed Insights**: <https://pagespeed.web.dev>. Aim for green on mobile.
- **Rich Results Test**: <https://search.google.com/test/rich-results>. Confirms the FAQ and organisation data are valid.
- Make sure the site loads on **https://** and that `mirqatinstitute.com` redirects to `www.mirqatinstitute.com` (or the other way round, as long as it's consistent).

---

## Part 3: Monthly routine (about 1 hour)
- [ ] Check Search Console: any errors? Which searches grew?
- [ ] Ask 2–3 families for Google reviews
- [ ] Publish one article or course-page improvement
- [ ] Post 4–8 times on Instagram/Facebook, each linking back to the site or WhatsApp
- [ ] Update prices, contact details or plans in `src/data/site.ts` and course pages in `src/content/courses/` if anything changed. The structured data and sitemap update themselves.

## What to expect
SEO is slow. A new site usually takes **2–4 months** before it shows up for competitive searches. Your Google Business Profile and branded searches ("Mirqat Institute") will work much sooner, often within days. Consistency (reviews, articles, links) beats any one-off trick.
