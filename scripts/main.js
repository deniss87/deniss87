// table filtering

const buttons = document.querySelectorAll(".filter-btn");
const rows = document.querySelectorAll(".project-row");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    rows.forEach((row) => {
      if (filter === "all" || row.classList.contains(filter)) {
        row.classList.remove("hidden");
      } else {
        row.classList.add("hidden");
      }
    });
  });
});
