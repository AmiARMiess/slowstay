document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
});

const revealElements = document.querySelectorAll(
  ".stay-card, .story-art, .story-copy, .journal-heading, .journal-card, .newsletter-section > *:not(.newsletter-spark)",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const isSaved = button.classList.toggle("is-saved");
    button.textContent = isSaved ? "♥" : "♡";
    button.setAttribute(
      "aria-label",
      `${isSaved ? "Remove" : "Save"} ${button.closest(".stay-image-link").getAttribute("aria-label").replace("Discover ", "")}`,
    );
  });
});

const newsletterForm = document.querySelector(".newsletter-form");
const formMessage = document.querySelector(".form-message");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;

  formMessage.textContent = "Lovely — you're on the list. See you out there.";
  newsletterForm.reset();
});
