// Interactive animations powered by Motion (motion.dev).
// Content is only pre-hidden when JS runs (html.js), and everything is shown
// immediately for visitors who prefer reduced motion.
import { animate, inView, scroll, stagger } from 'motion';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = [0.2, 0.8, 0.2, 1] as const;

(window as unknown as { __motionReady: boolean }).__motionReady = true;

function showAll() {
  root.classList.add('motion-off');
  document.querySelectorAll('.ladder__step').forEach((s) => s.classList.add('is-lit'));
}

if (reduce) {
  showAll();
} else {
  // 1. Staggered reveals: animate a group's cards together as the group enters view.
  const groups = ['.path-map', '.stepper', '.courses', '.quotes', '.plans', '.how', '.why__list', '.tutor-grid', '.path', '.reviews', '.about__facts'];
  const grouped = new Set<Element>();
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((group) => {
      const items = Array.from(group.querySelectorAll('.reveal'));
      items.forEach((i) => grouped.add(i));
      if (!items.length) return;
      inView(group, () => {
        animate(items, { opacity: [0, 1], y: [28, 0] }, { duration: 0.7, ease: EASE, delay: stagger(0.08) });
      }, { amount: 0.15 });
    });
  });

  // 2. Any remaining single reveals.
  document.querySelectorAll('.reveal').forEach((el) => {
    if (grouped.has(el)) return;
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease: EASE });
    }, { amount: 0.2 });
  });

  // 3. The Mirqat ladder: steps rise one after another with a soft spring, then light up.
  const ladder = document.getElementById('ladderSteps');
  if (ladder) {
    const steps = Array.from(ladder.querySelectorAll<HTMLElement>('.ladder__step'));
    inView(ladder, () => {
      animate(steps, { y: [40, 0] }, { type: 'spring', bounce: 0.35, duration: 0.9, delay: stagger(0.18) });
      steps.forEach((step, i) => setTimeout(() => step.classList.add('is-lit'), 120 + i * 180));
    }, { amount: 0.3 });
  }

  // 4. Count-up numbers (e.g. "1,000+").
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    inView(el, () => {
      animate(0, target, {
        duration: 1.6,
        ease: EASE,
        onUpdate: (v) => { el.textContent = `${Math.round(v).toLocaleString('en-IN')}${suffix}`; },
      });
    });
  });

  // 5. Hero: the stairway drifts gently as you scroll away.
  const hero = document.querySelector('.hero');
  const stairs = document.querySelector('.stairway__svg');
  if (hero && stairs) {
    scroll(animate(stairs, { y: [0, 50] }, { ease: 'linear' }), {
      target: hero,
      offset: ['start start', 'end start'],
    });
  }

  // 6. Reading progress bar along the top of the page.
  const bar = document.querySelector('.scroll-progress');
  if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));

  // 7. Springy press feedback on buttons.
  document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
    btn.addEventListener('pointerdown', () => animate(btn, { scale: 0.96 }, { type: 'spring', stiffness: 600, damping: 25 }));
    const release = () => animate(btn, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 15 });
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointerleave', release);
  });
}
