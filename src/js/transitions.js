const isLogin = document.body.classList.contains("login-page");
const card =
  document.querySelector(".login-section") ||
  document.querySelector(".register-main");
const h1 = document.querySelector("header h1");
const trigger =
  document.querySelector(".boton-cuenta-nueva a.button") ||
  document.querySelector(".register-main p a");

const rectToJson = (r) => ({
  left: r.left,
  top: r.top,
  width: r.width,
  height: r.height,
});

const animateMorph = (el, rect) => {
  if (!el || !rect) return;
  el.style.opacity = "0";

  requestAnimationFrame(() => {
    const natural = el.getBoundingClientRect();
    const dx = rect.left - natural.left;
    const dy = rect.top - natural.top;

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = "none";

    requestAnimationFrame(() => {
      el.style.transition =
        "transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease";
      el.style.opacity = "1";
      el.style.transform = "";
    });
  });
};

window.addEventListener("pageswap", (e) => {
  if (e.viewTransition && window.__skipNativeVT) {
    e.viewTransition.skipTransition();
  }
});

let stored = null;
try {
  stored = sessionStorage.getItem("morph");
  sessionStorage.removeItem("morph");
} catch {}

if (stored) {
  const pos = JSON.parse(stored);
  animateMorph(card, pos.card);
  animateMorph(h1, pos.h1);
}

if (trigger) {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(
        "morph",
        JSON.stringify({
          card: rectToJson(card.getBoundingClientRect()),
          h1: rectToJson(h1.getBoundingClientRect()),
        }),
      );
    } catch {}

    window.__skipNativeVT = true;
    window.location.href = trigger.href;
  });
}

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    [card, h1].forEach((el) => {
      el.style.transform = "";
      el.style.opacity = "";
      el.style.transition = "";
    });
  }
});
