// The Mirqat stairway (hero): a light climbs the five course steps to the Qur'an.
// Hovering, focusing or tapping a step moves the light there and shows that course.
import { animate } from 'motion';

const svg = document.querySelector<SVGSVGElement>('.stairway__svg');
const orb = document.getElementById('stairOrb');
const card = document.getElementById('stairCard');

if (svg && orb && card) {
  const steps = Array.from(svg.querySelectorAll<SVGAElement>('a.stair'));
  const stepEl = document.getElementById('stairCardStep')!;
  const titleEl = document.getElementById('stairCardTitle')!;
  const textEl = document.getElementById('stairCardText')!;
  const linkEl = document.getElementById('stairCardLink') as HTMLAnchorElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const summit = { x: Number(svg.dataset.summitX), y: Number(svg.dataset.summitY) };
  const summitCard = {
    step: stepEl.textContent ?? '',
    title: titleEl.textContent ?? '',
    text: textEl.textContent ?? '',
    href: linkEl.getAttribute('href') ?? '/courses',
    link: linkEl.textContent ?? '',
  };

  let current = -1; // -1 = summit
  let climbing = false;

  const swapCard = () => {
    card.classList.remove('is-changing');
    void card.offsetWidth; // restart the swap animation
    card.classList.add('is-changing');
  };

  const showStep = (i: number) => {
    steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
    if (i === -1) {
      stepEl.textContent = summitCard.step;
      titleEl.textContent = summitCard.title;
      textEl.textContent = summitCard.text;
      linkEl.href = summitCard.href;
      linkEl.textContent = summitCard.link;
    } else {
      const d = steps[i].dataset;
      stepEl.textContent = `Step ${d.num}${i === 0 ? ' · Start here' : ''}`;
      titleEl.textContent = d.title ?? '';
      textEl.textContent = d.summary ?? '';
      linkEl.href = steps[i].getAttribute('href') ?? '/courses';
      linkEl.textContent = `View ${d.title} →`;
    }
    swapCard();
  };

  const posOf = (i: number) =>
    i === -1 ? summit : { x: Number(steps[i].dataset.x), y: Number(steps[i].dataset.y) };

  const moveTo = (i: number, hop = true) => {
    const to = posOf(i);
    const from = posOf(current);
    current = i;
    showStep(i);
    if (reduce) {
      orb.style.transform = `translate(${to.x}px, ${to.y}px)`;
      return Promise.resolve();
    }
    // a small arc: rise above both points, then land
    const peak = Math.min(from.y, to.y) - 28;
    return animate(
      orb,
      { x: [from.x, (from.x + to.x) / 2, to.x], y: [from.y, peak, to.y] },
      { duration: hop ? 0.55 : 0.35, ease: 'easeInOut' },
    ).finished;
  };

  // Place the light at the summit in Motion's terms, then climb from the bottom on load.
  animate(orb, { x: summit.x, y: summit.y }, { duration: 0 });
  orb.style.transform = '';

  const climb = async () => {
    if (reduce) return;
    climbing = true;
    animate(orb, { x: posOf(0).x, y: posOf(0).y }, { duration: 0 });
    current = 0;
    showStep(0);
    for (let i = 1; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 650));
      if (!climbing) return;
      await moveTo(i);
    }
    await new Promise((r) => setTimeout(r, 650));
    if (climbing) await moveTo(-1);
    climbing = false;
  };

  // Start the climb when the hero is visible (it is, on load).
  setTimeout(climb, 600);

  const noHover = () => window.matchMedia('(hover: none)').matches;

  steps.forEach((step, i) => {
    const go = () => {
      climbing = false;
      if (current !== i) moveTo(i);
    };
    // Mouse: hovering a step shows it. (Touch is handled on click below.)
    step.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') go();
    });
    step.addEventListener('focus', go);
    // Touch: the first tap shows the step; tapping it again opens the course.
    // (A tap also focuses the link, so remember the selection from *before* the tap.)
    let selectedBeforeTap = -2;
    step.addEventListener('pointerdown', () => {
      selectedBeforeTap = current;
    });
    step.addEventListener('click', (e) => {
      if (noHover() && selectedBeforeTap !== i) {
        e.preventDefault();
        go();
      }
    });
  });

  svg.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse' && !climbing && current !== -1) moveTo(-1);
  });
}
