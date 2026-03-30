// FEATURED PROJECTS SLIDER
function initSlider() {
  const slider = document.querySelector(".featured-slider");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  if (!slider || !prevBtn || !nextBtn) return;

  const getCardStep = () => {
    const card = slider.children[0];
    return card ? card.offsetWidth + 20 : 0;
  };

  const updateArrows = () => {
    const hasOverflow = slider.scrollWidth > slider.offsetWidth + 1;

    // Hide the arrows if all the cards fit
    prevBtn.style.visibility = hasOverflow ? "visible" : "hidden";
    nextBtn.style.visibility = hasOverflow ? "visible" : "hidden";

    prevBtn.disabled = slider.scrollLeft <= 0;
    nextBtn.disabled =
      slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1;
  };

  prevBtn.addEventListener("click", () =>
    slider.scrollBy({ left: -getCardStep(), behavior: "smooth" }),
  );
  nextBtn.addEventListener("click", () =>
    slider.scrollBy({ left: getCardStep(), behavior: "smooth" }),
  );

  let scrollTimer;
  slider.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateArrows, 100);
  });

  // Update when container size changes
  const resizeObserver = new ResizeObserver(() => {
    if (slider.scrollWidth <= slider.offsetWidth + 1) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }
    updateArrows();
  });

  resizeObserver.observe(slider);
  updateArrows();
}

// PROJECTS TABLE FILTER
function initTableFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectRows = document.querySelectorAll("#projects-content tr");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // 1. Managing the active state of buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // 2. Filtering table rows
      projectRows.forEach((row) => {
        const categories = row.dataset.category
          ? row.dataset.category.split(" ")
          : [];

        if (filter === "all" || categories.includes(filter)) {
          row.style.display = "";
          row.classList.add("fade-in");
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

// ─── PROJECTS TABLE SORT ─────────────────────────────────────────────────────

function initTableSort() {
  const tbody = document.getElementById("projects-content");
  const sortBtn = document.getElementById("sort-date-btn");

  if (!tbody || !sortBtn) return;

  const originalOrder = [...tbody.querySelectorAll("tr")];
  let sortActive = true;

  const applySort = () => {
    const rows = [...tbody.querySelectorAll("tr")];

    if (sortActive) {
      rows
        .sort((a, b) =>
          (b.dataset.date ?? "").localeCompare(a.dataset.date ?? ""),
        )
        .forEach((row) => tbody.appendChild(row));
    } else {
      originalOrder.forEach((row) => tbody.appendChild(row));
    }
  };

  sortBtn.addEventListener("click", () => {
    sortActive = !sortActive;
    sortBtn.classList.toggle("active", sortActive);
    applySort();
  });

  applySort();
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initTableFilter();
  initTableSort();
});
