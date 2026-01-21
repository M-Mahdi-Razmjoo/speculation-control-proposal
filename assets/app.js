(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");
  const navLinks = Array.from(document.querySelectorAll(".nav__item"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // Year in footer
  if (year) year.textContent = new Date().getFullYear();

  // Theme: load saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "light") root.setAttribute("data-theme", "light");
  if (saved === "dark") root.removeAttribute("data-theme");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Active section highlighting in sidebar
  const setActive = (id) => {
    navLinks.forEach(a => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible && visible.target && visible.target.id) setActive(visible.target.id);
  }, { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.2, 0.3, 0.4, 0.5] });

  sections.forEach(sec => observer.observe(sec));

  // Experiments filter
  const chips = Array.from(document.querySelectorAll(".btn--chip"));
  const exps = Array.from(document.querySelectorAll(".exp"));

  function setChipActive(btn) {
    chips.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function applyFilter(filter) {
    exps.forEach(card => {
      const st = card.getAttribute("data-status");
      const show = (filter === "all") || (st === filter);
      card.style.display = show ? "" : "none";
    });
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      setChipActive(btn);
      applyFilter(filter);
    });
  });

  // KaTeX render (if loaded)
  window.addEventListener("load", () => {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ]
      });
    }

    // Mermaid render (if loaded)
    if (window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true, theme: "default" });
    }
  });
})();
