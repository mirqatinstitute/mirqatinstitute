document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("notifyForm");
const status = document.getElementById("notifyStatus");
const emailInput = document.getElementById("email");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = emailInput.value.trim();

  if (!isValidEmail(value)) {
    status.textContent = "Please enter a valid email address.";
    status.classList.add("is-error");
    emailInput.focus();
    return;
  }

  status.classList.remove("is-error");

  // Store locally for now — swap this out once a backend/API is wired up.
  try {
    const saved = JSON.parse(localStorage.getItem("mirqat_notify_list") || "[]");
    if (!saved.includes(value)) {
      saved.push(value);
      localStorage.setItem("mirqat_notify_list", JSON.stringify(saved));
    }
  } catch (err) {
    /* localStorage unavailable — ignore silently */
  }

  form.classList.add("is-success");
  status.textContent = "You're on the list. We'll reach out before we open our doors.";
  emailInput.value = "";
});
