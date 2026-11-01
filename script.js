/* =========================================================
   Mirqat Institute — landing page behaviour
   ========================================================= */

const CONFIG = {
  // WhatsApp number, digits only with country code.
  whatsappNumber: "919400738280",
  contactEmail: "mirqatinstitute313@gmail.com",
  // Optional form endpoint (e.g. https://formspree.io/f/xxxxxxx). When set, the form posts here
  // instead of opening WhatsApp.
  formEndpoint: "",
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

/* ---- enrolment form ---- */
const form = document.getElementById("enrolForm");
const statusEl = document.getElementById("formStatus");
const tzInput = document.getElementById("timezone");
const tzLabel = document.getElementById("tzLabel");
const courseSelect = document.getElementById("course");

try {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  tzInput.value = tz;
  tzLabel.textContent = tz.replace(/_/g, " ");
} catch (err) {
  tzLabel.textContent = "not detected";
}

// "Choose this plan" buttons pre-select the matching course.
document.querySelectorAll("[data-course]").forEach((btn) => {
  btn.addEventListener("click", () => {
    courseSelect.value = btn.dataset.course;
    courseSelect.closest(".field").classList.remove("is-invalid");
  });
});

function setStatus(msg, isError) {
  statusEl.textContent = msg;
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function validate() {
  let firstInvalid = null;
  const checks = [
    ["name", (v) => v.trim().length > 1],
    ["phone", (v) => v.replace(/\D/g, "").length >= 7],
    ["email", (v) => v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
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
    setStatus("Please add your name, a WhatsApp number and a course.", true);
    invalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());

  if (CONFIG.formEndpoint) {
    const button = form.querySelector("button[type=submit]");
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
      setStatus("JazakAllahu khayran! We'll contact you on WhatsApp soon.");
    } catch (err) {
      setStatus(`Something went wrong. Please message us on WhatsApp or email ${CONFIG.contactEmail}.`, true);
    } finally {
      button.disabled = false;
    }
    return;
  }

  // Default: open WhatsApp with the enquiry pre-filled.
  const message = [
    "Assalamu alaikum! I'd like to enrol at Mirqat Institute.",
    "",
    `Name: ${data.name}`,
    `WhatsApp: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Course: ${data.course}`,
    `Student: ${data.student}`,
    `Class length: ${data.length}`,
    data.timezone ? `Time zone: ${data.timezone}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  // (window.open with "noopener" always returns null, so detach the opener manually instead.)
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
  setStatus("WhatsApp should open with your details — just press send.");
});
