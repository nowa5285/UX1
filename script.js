// left-nav active section highlighting
const links = Array.from(document.querySelectorAll(".rail__link"));
const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach(a => a.classList.toggle("is-active", a.dataset.section === id));
};

const onScroll = () => {
  let best = null;
  let bestDist = Infinity;

  for (const sec of sections) {
    const r = sec.getBoundingClientRect();
    const dist = Math.abs(r.top - 140);
    if (dist < bestDist) {
      bestDist = dist;
      best = sec;
    }
  }
  if (best) setActive(best.id);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


// multi-gallery support
document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const track = gallery.querySelector("[data-track]");
  const slides = Array.from(track.children);

  let idx = 0;

  const update = () => {
    track.style.transform = `translateX(${-idx * 100}%)`;
  };

  gallery.querySelector("[data-prev]").addEventListener("click", () => {
    idx = (idx - 1 + slides.length) % slides.length;
    update();
  });

  gallery.querySelector("[data-next]").addEventListener("click", () => {
    idx = (idx + 1) % slides.length;
    update();
  });

  update();
});