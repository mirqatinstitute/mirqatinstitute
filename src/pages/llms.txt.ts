// /llms.txt — a plain-text summary of the academy for AI assistants (https://llmstxt.org).
// Generated at build time from the same data as the website, so it never goes out of date.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, PLANS, METRICS, TEACHERS, inr } from '../data/site';

export const GET: APIRoute = async () => {
  const courses = (await getCollection('courses')).sort((a, b) => a.data.order - b.data.order);
  const articles = (await getCollection('articles')).sort((a, b) => a.data.order - b.data.order);
  const u = (path: string) => `${SITE.url}${path}`;
  const metrics = METRICS.map((m) => `${m.value.toLocaleString('en-IN')}${m.suffix} ${m.label.toLowerCase()}`).join(', ');

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} (مرقاة, "the ascending stairway") is an online Qur'an academy based in ${SITE.address.display}. It teaches Noorani Qaida, Tajweed, Qur'an reading, Hifz (memorisation) and Qur'an revision in one-to-one live online classes for children, youth and adults, with flexible timings in IST (GMT+5:30).`,
    '',
    '## Key facts',
    '',
    `- Classes: one-to-one, live online; students in India and internationally`,
    `- At a glance: ${metrics}`,
    `- Teachers: male and female tutors, including huffaz, hafilaths and Tajweed specialists; Hafs & Shu'bah Riwayah certified teaching`,
    `- Fees: monthly plans from ${inr(Math.min(...Object.values(PLANS).map((p) => p.from)))} per month; payment by UPI or bank transfer`,
    `- Contact: WhatsApp/phone ${SITE.phoneDisplay}, email ${SITE.email}`,
    `- Enrol: message on WhatsApp or use the enquiry form → choose a course → pick a class time → register → begin classes`,
    '',
    '## Courses',
    '',
    ...courses.map((c) => {
      const plan = c.data.plan ? PLANS[c.data.plan] : null;
      const fee = plan ? ` Fees: ${plan.name}, from ${inr(plan.from)}/month.` : '';
      return `- [${c.data.title}](${u(`/courses/${c.id}`)}): ${c.data.summary} Level: ${c.data.level}.${fee}`;
    }),
    '',
    '## Plans and fees (INR per month)',
    '',
    ...Object.values(PLANS).map(
      (p) => `- ${p.name} (${p.freq}): ${p.options.map(([label, price]) => `${label} ${inr(price)}`).join('; ')}. Includes: ${p.includes.join(', ')}.`,
    ),
    '',
    '## Teachers',
    '',
    "- Muhammed Saahil — Qur'an Tutor; M.A. Arabic; Hafs & Shu'bah Riwayah certified; 3+ years teaching",
    ...TEACHERS.map((t) => `- ${t.name} — ${t.role}`),
    '',
    '## Learn (articles)',
    '',
    ...articles.map((a) => `- [${a.data.title}](${u(`/learn/${a.id}`)}): ${a.data.description}`),
    '',
    '## Pages',
    '',
    `- [Home](${u('/')})`,
    `- [About](${u('/about')})`,
    `- [All courses](${u('/courses')})`,
    `- [Faculties](${u('/faculties')})`,
    `- [Pricing](${u('/pricing')})`,
    `- [FAQ](${u('/faq')})`,
    `- [Contact](${u('/contact')})`,
    `- [Malayalam / മലയാളം](${u('/ml')})`,
    '',
    '## Policies',
    '',
    `- [Refund & Cancellation Policy](${u('/refund-policy')})`,
    `- [Privacy Policy](${u('/privacy-policy')})`,
    `- [Terms & Conditions](${u('/terms')})`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
