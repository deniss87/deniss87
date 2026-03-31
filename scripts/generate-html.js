import fs from "fs";
import { techStack } from "../data/techStack.js";
import { projects } from "../data/projects.js";
import { courses } from "../data/courses.js";

const IMG_BASE_PATH = "assets/images/projects";
const template = fs.readFileSync("templates/index.template.html", "utf8");

/* ---------- TECH STACK ---------- */

function renderTechStack() {
  return techStack
    .map(
      (section) => `
      <h3>${section.title}</h3>
      <p class="tech-icons">
        ${section.items
          .map(
            (i) =>
              ` <a href="#projects-section"><img src="${i.badge}" alt="${i.name}" class="tech-badge" loading="lazy"/></a>`,
          )
          .join(" ")}
      </p>
      
    `,
    )
    .join("");
}

/* ---------- COURSES ---------- */

function renderCourses() {
  return courses
    .map((course) => {
      const repo = course.links.find((l) => l.tag === "repo")?.url || "#";
      const website = course.links.find((l) => l.tag === "website")?.url || "#";

      return `
<tr>
<td><a href="${repo}" target="_blank"><b>${course.title}</b></a></td>
<td>${course.description}</td>
<td><a href="${website}" target="_blank">Course website</a></td>
</tr>
`;
    })
    .join("");
}
/* ---------- FEATURED PROJECTS ---------- */

function renderFeaturedProjects() {
  const sorted = [...projects]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((p) => p.featured);

  const cards = sorted
    .map((project) => {
      const hasCover = project.media?.cover;
      const coverUrl = `${IMG_BASE_PATH}/${project.slug}/${project.slug}-${project.media?.cover}`;
      const visualContent = hasCover
        ? `<img src="${coverUrl}" alt="${project.title}" loading="lazy">`
        : `<div class="featured-logo-text">${project.appName || project.title}</div>`;

      const mainStackHtml = (project.mainStack || [])
        .map((s) => `<span class="stack-tag main-tag">${s}</span>`)
        .join("");

      const secondaryStackHtml = (project.stack || [])
        .map((s) => `<span class="stack-tag">${s}</span>`)
        .join("");

      const repoUrl = project.links.find((l) => l.tag === "repo")?.url || "#";
      const demoUrl = project.links.find((l) => l.tag === "demo")?.url || "#";
      const prUrl = project.links.find((l) => l.tag === "pr")?.url || "#";

      const isDemo = demoUrl !== "#";
      const liveLinkUrl = isDemo ? demoUrl : prUrl;
      const liveLinkClass = isDemo ? "link-primary" : "link-secondary";
      const liveLinkText = isDemo ? "🌏 Live Demo" : "📝 View PR";

      const linksHtml = `
        <div class="featured-card-links">
          <a href="${repoUrl}" target="_blank" class="featured-link link-secondary" title="GitHub Repository">
            <svg class="featured-icon" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            GitHub
          </a>
          ${
            liveLinkUrl !== "#"
              ? `
            <a href="${liveLinkUrl}" target="_blank" class="featured-link ${liveLinkClass}" title="${liveLinkText}">
              ${liveLinkText}
            </a>
          `
              : ""
          }
        </div>
    `;

      return `
        <div class="featured-card">
          <div class="featured-card-image">${visualContent}</div>
          <div class="featured-card-content">
            <h3>${project.title}</h3>
            <div class="featured-card-stack">${mainStackHtml}${secondaryStackHtml}</div>
            ${linksHtml}
          </div>
        </div>
        `;
    })
    .join("");

  return `
    <div class="slider-wrapper">
      <button class="slider-arrow slider-prev" aria-label="Previous" disabled>
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
      </button>
      <div class="featured-slider">${cards}</div>
      <button class="slider-arrow slider-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"></path></svg>
      </button>
    </div>`;
}

/* ---------- PROJECTS ---------- */

function renderProjects() {
  return projects
    .map((project) => {
      // Links
      const repo = project.links.find((l) => l.tag === "repo")?.url || "#";
      const linkObj =
        project.links.find((l) => l.tag === "demo") ||
        project.links.find((l) => l.tag === "pr");

      const linkHtml = linkObj
        ? `<a href="${linkObj.url}" target="_blank">${linkObj.tag === "demo" ? "🌍 Live Demo" : "📋 View PR"}</a>`
        : repo !== "#"
          ? `<a href="${repo}" target="_blank"">👨🏻‍💻 Repository</a>`
          : "—";

      // Stack
      const mainStack =
        project.mainStack?.length > 0
          ? `<span class="stack-main">${project.mainStack.join(", ")}</span>`
          : "";

      const secondaryStack =
        project.stack?.length > 0 ? project.stack.join(", ") : "";

      const fullStackHtml = [mainStack, secondaryStack]
        .filter((part) => part !== "")
        .join(", ");

      // Category
      const categoryAttribute = project.category
        ? project.category.join(" ").toLowerCase()
        : "";

      return `
<tr data-category="${categoryAttribute}" data-date="${project.date || ""}">
<td><a href="${repo}" target="_blank"><b>${project.title}</b></a></td>
<td>${fullStackHtml || "—"}</td>
<td>${linkHtml}</td>
</tr>
`;
    })
    .join("");
}

/* ---------- GENERATE PAGE ---------- */

let html = template
  .replace("{{TECH_STACK}}", renderTechStack())
  .replace("{{COURSES}}", renderCourses())
  .replace("{{FEATURED_PROJECTS}}", renderFeaturedProjects())
  .replace("{{PROJECTS}}", renderProjects());

fs.writeFileSync("index.html", html);

console.log("✅ HTML generated");
