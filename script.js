const revealItems = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");
const magneticItems = document.querySelectorAll(".magnetic");
const depthCard = document.querySelector("[data-depth-card]");
const animatedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

function revealOnScroll() {
  if (animatedMedia.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index * 45, 240)}ms`);
    observer.observe(item);
  });
}

function enableCursorGlow() {
  if (!cursorGlow || animatedMedia.matches) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.setProperty("--x", `${event.clientX}px`);
    cursorGlow.style.setProperty("--y", `${event.clientY}px`);
    cursorGlow.classList.add("is-active");
  });

  window.addEventListener("pointerleave", () => {
    cursorGlow.classList.remove("is-active");
  });
}

function enableMagneticHover() {
  if (animatedMedia.matches) {
    return;
  }

  magneticItems.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      item.style.setProperty("--mx", `${x * 0.08}px`);
      item.style.setProperty("--my", `${y * 0.08}px`);
    });

    item.addEventListener("pointerleave", () => {
      item.style.setProperty("--mx", "0px");
      item.style.setProperty("--my", "0px");
    });
  });
}

function enableDepthCard() {
  if (!depthCard || animatedMedia.matches) {
    return;
  }

  depthCard.addEventListener("pointermove", (event) => {
    const bounds = depthCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const mainCard = depthCard.querySelector(".card-main");

    depthCard.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
    depthCard.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
    mainCard.style.transform = `rotateX(${y * -10}deg) rotateY(${x * 12}deg)`;
  });

  depthCard.addEventListener("pointerleave", () => {
    const mainCard = depthCard.querySelector(".card-main");

    mainCard.style.transform = "";
  });
}

revealOnScroll();
enableCursorGlow();
enableMagneticHover();
enableDepthCard();
