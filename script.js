/* =========================================================
   Mirqat Institute — landing page behaviour
   ========================================================= */

/* ---- configuration: fill these in before launch ---- */
const CONFIG = {
  // Form endpoint (e.g. https://formspree.io/f/xxxxxxx). Leave empty to fall back to email.
  formEndpoint: "",
  // Where trial requests go when there is no endpoint.
  contactEmail: "hello@mirqatinstitute.com",
  // WhatsApp number, digits only with country code (e.g. "447700900123"). Empty hides the deep link.
  whatsappNumber: "",
};

document.documentElement.classList.add("js");
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- header shadow on scroll ---- */
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---- mobile navigation ---- */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

function setNav(open) {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setNav(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setNav(false);
    navToggle.focus();
  }
});

/* ---- reveal on scroll + the ladder lighting up step by step ---- */
const revealEls = document.querySelectorAll(".reveal");
const ladderSteps = document.querySelectorAll(".ladder__step");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const ladderObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      ladderSteps.forEach((step, i) => {
        setTimeout(() => step.classList.add("is-lit"), i * 220);
      });
      ladderObserver.disconnect();
    },
    { threshold: 0.35 }
  );
  ladderObserver.observe(document.getElementById("ladderSteps"));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
  ladderSteps.forEach((el) => el.classList.add("is-lit"));
}

/* ---- WhatsApp button ---- */
const waBtn = document.getElementById("whatsappBtn");
if (CONFIG.whatsappNumber) {
  const text = encodeURIComponent("Assalamu alaikum! I'd like to know more about classes at Mirqat Institute.");
  waBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  waBtn.target = "_blank";
  waBtn.rel = "noopener";
}

/* ---- trial form ---- */
const form = document.getElementById("trialForm");
const statusEl = document.getElementById("formStatus");
const tzInput = document.getElementById("timezone");
const tzLabel = document.getElementById("tzLabel");

try {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  tzInput.value = tz;
  tzLabel.textContent = tz.replace(/_/g, " ");
} catch (err) {
  tzLabel.textContent = "not detected";
}

function setStatus(msg, isError) {
  statusEl.textContent = msg;
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function validate() {
  let firstInvalid = null;
  const checks = [
    ["name", (v) => v.trim().length > 1],
    ["email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
    ["course", (v) => v !== ""],
  ];
  checks.forEach(([id, ok]) => {
    const input = document.getElementById(id);
    const valid = ok(input.value);
    input.closest(".field").classList.toggle("is-invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = input;
  });
  return firstInvalid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const invalid = validate();
  if (invalid) {
    setStatus("Please fill in your name, a valid email and a course.", true);
    invalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  const button = form.querySelector("button[type=submit]");

  if (CONFIG.formEndpoint) {
    button.disabled = true;
    setStatus("Sending…");
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      tzInput.value = data.timezone || "";
      setStatus("JazakAllahu khayran! We'll contact you within 24 hours to arrange your trial.");
    } catch (err) {
      setStatus(`Something went wrong. Please email us at ${CONFIG.contactEmail}.`, true);
    } finally {
      button.disabled = false;
    }
    return;
  }

  // No endpoint configured yet: open a pre-filled email so requests still reach the institute.
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.phone || "-"}`,
    `Course: ${data.course}`,
    `Student: ${data.student}`,
    `Teacher preference: ${data.teacher}`,
    `Time zone: ${data.timezone || "-"}`,
  ].join("\n");
  const subject = `Free trial request — ${data.course}`;
  window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setStatus("Your email app should open with your details — just press send.");
});
