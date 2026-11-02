// Single source of truth for academy details. Pages, components and structured
// data (JSON-LD) all read from here, so update facts in this file only.

export const SITE = {
  name: 'Mirqat Institute',
  nameAr: 'مِرْقاة',
  url: 'https://www.mirqatinstitute.com',
  tagline: 'Step by step, toward the Qur\'an',
  description:
    'One-to-one online Quran classes from Kollam, Kerala: Noorani Qaida, Tajweed, Hifz, Quran reading and revision for kids and adults. Flexible timings, from ₹1,300/month.',
  ogImage: '/assets/og-image.png',
  locale: 'en_IN',
  lang: 'en-IN',
  email: 'mirqatinstitute313@gmail.com',
  phoneDisplay: '+91 94007 38280',
  phoneE164: '+919400738280',
  whatsappNumber: '919400738280',
  address: { locality: 'Kollam', region: 'Kerala', regionCode: 'IN-KL', country: 'IN', display: 'Kollam, Kerala, India' },
  timings: 'Flexible · IST (GMT+5:30)',
  social: {
    instagram: 'https://www.instagram.com/mirqatinstitue/',
    facebook: 'https://www.facebook.com/mirqatinstitue',
  },
  studentsTaught: '800+',
} as const;

export type PlanKey = 'basic' | 'tajweed' | 'hifz';

export const PLANS: Record<PlanKey, {
  name: string;
  freq: string;
  from: number;
  optionsLabel: string;
  /** Short summary of the options, shown in the "By course" pricing list. */
  optionsShort: string;
  options: [string, number][];
  includes: string[];
  course: string;
}> = {
  basic: {
    name: "Basic Qur'an Plan",
    freq: '20 classes / month',
    from: 1600,
    optionsLabel: 'prices by class length',
    optionsShort: '30, 45 or 60 min classes',
    options: [['30 min classes', 1600], ['45 min classes', 2000], ['60 min classes', 2400]],
    includes: ['Qaida Nooraniya', 'Arabic alphabet learning', "Basic Qur'an reading"],
    course: 'Noorani Qaida',
  },
  tajweed: {
    name: 'Tajweed Plan',
    freq: '20 classes / month',
    from: 1600,
    optionsLabel: 'prices by class length',
    optionsShort: '30, 45 or 60 min classes',
    options: [['30 min classes', 1600], ['45 min classes', 2000], ['60 min classes', 2400]],
    includes: ['Complete Tajweed rules', 'Makharij & Sifaat', 'Pronunciation correction', 'Madd & Ghunnah', 'Noon & Meem rules', 'Waqf & Ibtida', 'Practical recitation'],
    course: 'Tajweed',
  },
  hifz: {
    name: 'Hifz Plan',
    freq: '20, 25 or 30 classes / month',
    from: 1300,
    optionsLabel: 'prices by classes per month',
    optionsShort: '20, 25 or 30 classes a month',
    options: [['20 classes / month', 1300], ['25 classes / month', 1700], ['30 classes / month', 2100]],
    includes: ['Personalised Hifz plan', 'New lesson (Sabak)', "Daily Muraja'ah", "Qur'an Revision", 'Tajweed & pronunciation correction', 'Progress tracking', 'Individual guidance'],
    course: 'Hifz (Memorisation)',
  },
};

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Course chips in the WhatsApp enquiry form. `value` is what appears in the message
// (and matches each course file's formCourse / each plan's course).
export const COURSE_OPTIONS = [
  { value: 'Noorani Qaida', label: 'Noorani Qaida', emoji: '🔤' },
  { value: 'Tajweed', label: 'Tajweed', emoji: '🎙️' },
  { value: "Qur'an Reading", label: "Qur'an Reading", emoji: '📖' },
  { value: 'Hifz (Memorisation)', label: 'Hifz', emoji: '⭐' },
  { value: "Qur'an Revision", label: 'Revision', emoji: '🔁' },
  { value: 'Not sure — please advise', label: 'Not sure', emoji: '🤔' },
];

export const HOME_FAQ: { q: string; a: string }[] = [
  { q: 'Who can join?', a: 'Children, youth and adults of all learning levels. Every class is one-to-one, so lessons are matched to each student.' },
  { q: "Do I need any prior Qur'an knowledge?", a: 'No. Complete beginners start with Noorani Qaida and basic Qur\'an reading.' },
  { q: 'Do you offer Hifz?', a: "Yes. Our Hifz plan includes a personalised plan, new lessons (sabak), daily muraja'ah and progress tracking, plus a separate Qur'an revision programme for Hifz students." },
  { q: 'What are the class timings?', a: "Timings are flexible. Classes are scheduled in IST (GMT+5:30), with slots arranged around the student's availability." },
  { q: 'How much do classes cost?', a: "Plans start from ₹1,300 per month for Hifz and Qur'an Revision, and ₹1,600 per month for Noorani Qaida, Tajweed and Qur'an Reading." },
  { q: 'How do I enrol?', a: 'Contact us on WhatsApp or through the enrolment form, choose a course and class timing, complete your registration, and begin classes.' },
];

// Teachers shown as small cards under the featured teacher (Muhammed Saahil,
// in src/components/Teachers.astro). photo: a real photo key (see Teachers.astro),
// or 'male' | 'female' for the profile illustration.
export const TEACHERS: { name: string; role: string; photo: 'abdul-majid' | 'male' | 'female'; sample?: boolean }[] = [
  { name: 'Hafiz Abdul Majid', role: 'Hifz, Tajweed & Qaida Nooraniya specialist', photo: 'abdul-majid' },
  { name: 'Fathima MV', role: 'Qaida Nooraniya specialist', photo: 'female' },
  { name: 'Salva Shareef', role: 'Tajweed tutor', photo: 'female' },
  { name: 'Fathima Mustabshira', role: 'Qaida Nooraniya & Tajweed specialist', photo: 'female' },
  { name: 'Hafilath Muhsina Hadiya', role: "Qur'an tutor", photo: 'female' },
  { name: 'Hafilath Ashiqa Mueena', role: "Qur'an tutor", photo: 'female' },
  { name: 'Hafilath Sayyidath Haleema Hadiya', role: "Qur'an tutor", photo: 'female' },
  // SAMPLE: Nihala Jamal's role is placeholder text — replace with her real role.
  { name: 'Nihala Jamal', role: "Qur'an tutor · Sisters & children", photo: 'female', sample: true },
];
