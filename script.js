document.documentElement.classList.add("js-enabled");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (contactForm && formStatus) {
  const fields = Array.from(contactForm.querySelectorAll("input, select, textarea"));

  const setStatus = (message, type) => {
    formStatus.textContent = message;
    formStatus.classList.remove("is-success", "is-error");
    if (type) {
      formStatus.classList.add(type);
    }
  };

  const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute("required") && !value) {
      isValid = false;
    }

    if (field.type === "email" && value) {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    field.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isFormValid = fields.every((field) => validateField(field));

    if (!isFormValid) {
      setStatus("Please complete all required fields with valid information.", "is-error");
      return;
    }

    const formData = new FormData(contactForm);
    const recipient = "robotics-hello@beitlab.com";
    const subject = encodeURIComponent(
      `New robotics inquiry from ${formData.get("name")} at ${formData.get("company")}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.get("name")}`,
        `Company: ${formData.get("company")}`,
        `Email: ${formData.get("email")}`,
        `Project focus: ${formData.get("interest")}`,
        "",
        "Project details:",
        formData.get("message"),
      ].join("\n")
    );

    setStatus("Thanks. Your message is ready to send through your email client.", "is-success");
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    contactForm.reset();
    fields.forEach((field) => field.setAttribute("aria-invalid", "false"));
  });
}
