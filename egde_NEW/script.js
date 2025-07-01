// Smooth scrolling when clicking elements with data-scroll-target or anchor links
function smoothScrollTo(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-scroll-target]");
  if (btn) {
    e.preventDefault();
    smoothScrollTo(btn.getAttribute("data-scroll-target"));
  }
});

// Handle nav anchor smooth scroll for browsers that don't support css scroll-behavior for anchor
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // in-page links only
    if (link.hash.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(link.hash);
    }
  });
});

// Basic light/dark theme toggle (saved in localStorage)
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
  localStorage.setItem("edge-theme", theme);
}

function currentTheme() {
  return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

themeToggle?.addEventListener("click", () => {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
});

// On load, apply saved theme or system preference
(function initTheme() {
  const saved = localStorage.getItem("edge-theme");
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }
})();

// AI Team card modal logic
const teamCards = document.querySelectorAll(".team-card");
teamCards.forEach((card) => {
  card.addEventListener("click", () => showCardDetail(card));
});

function showCardDetail(card) {
  const detailKey = card.getAttribute("data-detail");
  const details = {
    "ai-dev": {
      title: "Alex - Your Developer",
      desc:
        "Alex acts as your autonomous full-stack developer, capable of translating plain-language feature requests into production-ready code, setting up backend infrastructure, managing database schemas, handling API integrations, running tests, and deploying updates — all while collaborating with other agents to ensure your product is built efficiently, securely, and at scale.",
    },
    "ai-analyst": {
      title: "Hannah - Your Marketer",
      desc:
        "Hannah is your autonomous marketer, capable of conducting market research, crafting compelling marketing campaigns, managing social media accounts, and analyzing customer feedback to help you build your brand and grow your audience.",
    },
    "ai-designer": {  
      title: "Chris - Your Business Analyst",
      desc:
        "Chris is your autonomous business analyst, capable of analyzing your business and helping you make thoughtful decisions.",
    },
  };

  const info = details[detailKey];
  if (!info) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-card">
      <h3>${info.title}</h3>
      <p>${info.desc}</p>
      <button class="btn secondary" id="modal-close">Close</button>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.id === "modal-close") {
      modal.remove();
    }
  });
}

// Join form fake submission
const joinForm = document.getElementById("join-form");
const emailInput = document.getElementById("email-input");
const messageInput = document.getElementById("message-input");
const formMessage = document.getElementById("form-message");

joinForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  if (!email || !message) return;

  const subject = encodeURIComponent(`New message from ${email}`);
  const body = encodeURIComponent(message);
  const mailtoLink = `mailto:calebphillips.ai@gmail.com?subject=${subject}&body=${body}`;

  // Open the user's default mail client
  window.location.href = mailtoLink;

  formMessage.hidden = false;
  formMessage.style.color = "var(--clr-primary)";
  formMessage.textContent = "Your email draft has been opened. Feel free to add finishing touches before sending!";
  joinForm.reset();
});

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Basic focus management for accessibility in modal
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".modal-overlay")?.remove();
  }
}); 