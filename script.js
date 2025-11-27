// NAV SHRINK
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("shrink", window.scrollY > 80);
});

// SETTINGS MENU
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");

settingsBtn.onclick = () => {
  settingsMenu.style.display =
    settingsMenu.style.display === "block" ? "none" : "block";
};
document.addEventListener("click", (e) => {
  if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
    settingsMenu.style.display = "none";
  }
});

// THEME TOGGLE
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// CHAT OPEN/CLOSE
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");

document.getElementById("openChat").onclick = () => {
  chatBox.style.display = "flex";
};
chatClose.onclick = () => {
  chatBox.style.display = "none";
};

// CHAT SYSTEM
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.onclick = () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    addMessage("Thanks for reaching out. We appreciate your courage.", "bot");
  }, 600);
};

// QUOTES
const fallbackQuotes = [
  "Hope is stronger than fear.",
  "Your story is not over yet.",
  "Every day is a second chance.",
  "No one fights alone.",
  "Strength grows in struggle.",
];
let lastQuote = "";

async function fetchQuote() {
  try {
    const res = await fetch(
      "https://zenquotes.io/api/random?ts=" + Date.now(),
      { cache: "no-store" }
    );
    const data = await res.json();
    return `"${data[0].q}" — ${data[0].a}`;
  } catch {
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
}

async function loadQuote() {
  const spinner = document.getElementById("spinner");
  const box = document.getElementById("quoteText");

  spinner.style.display = "block";
  box.style.opacity = 0;

  let quote = await fetchQuote();
  if (quote === lastQuote) {
    quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }
  lastQuote = quote;

  setTimeout(() => {
    spinner.style.display = "none";
    box.textContent = quote;
    box.style.opacity = 1;
  }, 400);
}

loadQuote();
setInterval(loadQuote, 6000);

// EMAIL VALIDATION
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

function validateEmailField(showShake = false) {
  const value = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = pattern.test(value);

  if (!value) {
    emailInput.classList.remove("input-error", "input-success");
    emailError.classList.remove("show");
    return false;
  }

  if (!isValid) {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    emailError.classList.add("show");
    if (showShake) {
      emailInput.classList.add("shake");
      setTimeout(() => emailInput.classList.remove("shake"), 400);
    }
    return false;
  } else {
    emailInput.classList.remove("input-error");
    emailInput.classList.add("input-success");
    emailError.classList.remove("show");
    return true;
  }
}

emailInput.addEventListener("input", () => validateEmailField(false));
emailInput.addEventListener("blur", () => validateEmailField(false));

// CONTACT FORM SUBMIT
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  const emailOk = validateEmailField(true);
  if (!emailOk) {
    e.preventDefault();
    return;
  }

  e.preventDefault();
  document.getElementById("contactSection").style.display = "none";
  document.getElementById("submitted").style.display = "block";
  document
    .getElementById("submitted")
    .scrollIntoView({ behavior: "smooth" });
});
