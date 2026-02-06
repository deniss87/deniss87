import { techStack } from "../data/techStack.js";
import { courses } from "../data/courses.js";
import { projects } from "../data/projects.js";

// Tech stack section render
function renderTechStack(stack) {
  const container = document.getElementById("tech-stack-content");
  if (!container) return;

  container.innerHTML = stack
    .map(
      (category) => `
        <h3>${category.title}</h3>
        <p class="tech-icons">
          ${category.items
            .map(
              (item) => `
              <a href="#projects" class="tech-link" title="${item.name}">
              <img class="tech-badge" src="${item.badge}" alt="${item.name}" /></a>`
            )
            .join("")}
        </p>
      `
    )
    .join("");
}

renderTechStack(techStack);

// Cources section render
function renderCourses(courses) {
  const table = document.getElementById("courses-content");

  table.innerHTML = `
    <tr>
      <th>Course</th>
      <th>About</th>
      <th>Links</th>
    </tr>
  `;

  courses.forEach((course) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <a href="${course.repo}" target="_blank">
          ${course.title}
        </a>
      </td>
      <td>${course.description}</td>
      <td>
        <a href="${course.website}" target="_blank">
          🌍 Course Website
        </a>
      </td>
    `;

    table.appendChild(row);
  });
}

renderCourses(courses);

// Projects section render
function renderProjects(projects, filter = "all") {
  const table = document.getElementById("projects-content");

  table.innerHTML = `
    <tr>
      <th>Project</th>
      <th>Technologies</th>
      <th>Links</th>
    </tr>
  `;

  projects
    .filter(
      (project) =>
        filter === "all" || project.category.includes(filter)
    )
    .forEach((project) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <a href="${project.repo}" target="_blank">
            ${project.title}
          </a>
        </td>
        <td>${project.technologies.join(", ")}</td>
        <td>
          ${
            project.demo
              ? `<a href="${project.demo}" target="_blank">🌍 Live Demo</a>`
              : ""
          }
          ${
            project.extra
              ? `<br /><a href="${project.extra}" target="_blank">${project.extraLabel}</a>`
              : ""
          }
        </td>
      `;

      table.appendChild(row);
    });
}

renderProjects(projects);


// Table filtering

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");
    renderProjects(projects, btn.dataset.filter);
  });
});

// Details rendering
export const renderDetails = (items) => `
<details>
  <summary><b>Course topics</b></summary>
  <ul>
    ${items.map(item => `<li>${item}</li>`).join("")}
  </ul>
</details>
`;