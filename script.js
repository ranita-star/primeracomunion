/* =========================================================
   PRIMERA COMUNIÓN — Alexander & Eithan
   Abrir invitación · Cuenta regresiva · Reveal al hacer scroll
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Abrir invitación ---------- */
  const openBtn = document.getElementById("openBtn");
  const envelopeScreen = document.getElementById("envelope-screen");
  const invite = document.getElementById("invite");

  openBtn.addEventListener("click", () => {
    envelopeScreen.style.transition = "opacity 0.6s ease";
    envelopeScreen.style.opacity = "0";

    setTimeout(() => {
      envelopeScreen.classList.add("hidden");
      invite.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "instant" });
      revealOnScroll();
    }, 600);
  });

  /* ---------- 2. Cuenta regresiva ---------- */
  // 👉 Ajusta la fecha y hora exacta de la ceremonia aquí:
  const eventDate = new Date("2026-08-16T13:00:00").getTime();

  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMin = document.getElementById("cd-min");
  const cdSec = document.getElementById("cd-sec");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMin.textContent = "00";
      cdSec.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, "0");
    cdHours.textContent = String(hours).padStart(2, "0");
    cdMin.textContent = String(minutes).padStart(2, "0");
    cdSec.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- 3. Reveal al hacer scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  function revealOnScroll() {
    revealEls.forEach((el) => observer.observe(el));
  }

  revealOnScroll();
});
