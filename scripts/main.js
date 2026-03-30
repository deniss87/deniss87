// FEATURED_PROJECTS SLIDER
function initSlider() {
  const slider = document.querySelector(".featured-slider");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  if (!slider || !prevBtn || !nextBtn) return;

  function getCardStep() {
    const card = slider.children[0];
    if (!card) return 0;
    return card.offsetWidth + 20; // 20 = gap из CSS
  }

  function updateArrows() {
    prevBtn.disabled = slider.scrollLeft <= 0;
    nextBtn.disabled =
      slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1;
  }

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -getCardStep(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: getCardStep(), behavior: "smooth" });
  });

  // Синхронизация после свайпа
  let scrollTimer;
  slider.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateArrows, 100);
  });

  updateArrows();
}

document.addEventListener("DOMContentLoaded", () => {
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

  initSlider();
});
