// Every pre-filled WhatsApp message on the site lives here, so they stay short,
// consistent and easy to edit. WhatsApp formatting: *bold*, _italic_.
import { SITE } from './site';

const HELLO = 'Assalamu alaikum 👋';

export const WA = {
  /** Floating button, footer, contact details. */
  general: () => `${HELLO}\nI'd like to know more about Qur'an classes at *Mirqat Institute*.`,

  /** Malayalam page: general enquiry in Malayalam. */
  generalMl: () => `${HELLO}\nമിർഖാത്ത് ഇൻസ്റ്റിറ്റ്യൂട്ടിലെ ഖുർആൻ ക്ലാസുകളെക്കുറിച്ച് കൂടുതൽ അറിയാൻ ആഗ്രഹിക്കുന്നു.`,

  /** FAQ "still have a question?" */
  question: () => `${HELLO}\nI have a question about Mirqat Institute:\n`,

  /** Course page "Ask on WhatsApp" and the floating button on course pages. */
  course: (course: string) => `${HELLO}\nI'm interested in the *${course}* course 📖\nCould you share the details?`,

  /** Courses without a fixed plan ("Fees on request"). */
  fees: (course: string) => `${HELLO}\nCould you share the fees for the *${course}* course? 💰`,

  /** "Not sure where to start?" */
  notSure: () => `${HELLO}\nI'm not sure which course to choose 🤔\nCould you help me find the right one?`,

  /** Course page "Share your review". */
  review: (course: string) => `${HELLO}\n⭐ My review of the *${course}* course at Mirqat Institute:\n`,

  /** The enrolment form. Empty fields are left out. */
  enrol: (d: { name?: string; course?: string; student?: string; time?: string; timezone?: string }) =>
    [
      HELLO,
      "I'd like to join a class at *Mirqat Institute* 🌙",
      '',
      d.name && `👤 *Name:* ${d.name}`,
      d.course && `📖 *Course:* ${d.course}`,
      d.student && `🎓 *Student:* ${d.student}`,
      d.time && `🕐 *Preferred time:* ${d.time}`,
      d.timezone && `🌍 *Time zone:* ${prettyZone(d.timezone)}`,
      '',
      'JazakAllahu khayran 🤲',
    ]
      .filter((line) => line !== undefined && line !== false && line !== null)
      .join('\n'),
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** "Asia/Kolkata" → "India (IST)", "Asia/Dubai" → "Dubai". */
export function prettyZone(tz: string) {
  if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'India (IST)';
  return tz.split('/').pop()!.replace(/_/g, ' ');
}
