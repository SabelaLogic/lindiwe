const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add("in");
      }
    },
    { threshold: 0.18 },
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 6) * 40}ms`;
    io.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}
