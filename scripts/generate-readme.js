import fs from "fs";
import { techStack } from "../data/techStack.js";
import { projects } from "../data/projects.js";
import { courses } from "../data/courses.js";

/****************************************************************************
******************************** FUNCTIONS **********************************
*****************************************************************************/

const LINK_LABELS = {
  demo: "🌍 Live Demo",
  repo: "📦 Repository",
  pr: "🔄 Pull Requests",
  website: "🌍 Course Website",
  readme: "📘 README",
  default: "🔗 Link",
};

// Render links
const getLink = (item, tag) =>
  item.links.find((l) => l.tag === tag)?.url || "#";

const renderLink = ({ tag, url }) =>
  `[${LINK_LABELS[tag] || LINK_LABELS.default}](${url})`;

const renderCourseLinks = (course) => {
  const website = course.links?.find((l) => l.tag === "website");
  return website ? renderLink(website) : "";
};

const renderProjectLinks = (project) => {
  const priority = ["demo", "pr"];
  const link = project.links.find((l) => priority.includes(l.tag));

  return link ? renderLink(link) : "";
};

// Render details
const renderDetails = (items = []) => {
  if (!items.length) return "";

  return `<details><summary><b>Course topics</b></summary><ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul></details>`;
};

// Render Course table rows
const renderCourseRow = (course) => {
  const repo = getLink(course, "repo");
  return `| [**${course.title}**](${repo}) | ${course.description} ${renderDetails(course.details)} | ${renderCourseLinks(course)} |`;
};

// Render Project table rows
const renderProjectRow = (project) => {
  const repo = getLink(project, "repo");
  return `| [**${project.title}**](${repo}) | ${project.stack.join(", ")} | ${renderProjectLinks(project)} |`;
};

/****************************************************************************
************************************ MAIN ***********************************
*****************************************************************************/

// 1. ABOUT SECTION
let md = `
# Hi there, I'm Deniss Patancevs! 👋

## 👨‍💻 About Me

I'm a passionate Junior Web Developer who loves turning ideas into interactive, user-friendly web applications.  
I continuously work on expanding my knowledge and refining my skills.

I focus on **frontend and full-stack development**, working with modern technologies such as:

- **JavaScript, TypeScript, React, Next.js**
- **PHP, Laravel, Node.js**
- **MySQL, PostgreSQL**
- **REST APIs, GraphQL**

Throughout the _The Rolling Scopes School Courses (JS / Front-end Course, React Course)_,  
I gained hands-on experience working in a **team environment**, participating in **code reviews**, and receiving valuable **feedback from an experienced mentor**.  
These courses helped me develop better coding practices, improve architecture decisions, and understand real-world development workflows.

I'm eager to contribute to real projects, collaborate with developers, and continue growing as a professional in the web development world.

---

`;

// 2. TECH STACK SECTION
md += `\n## 🧰 My Tech Stack\n\n`;

techStack.forEach((section) => {
  md += `### ${section.title}\n\n`;
  section.items.forEach(
    (item) => (md += `![${item.name}](${item.badge}) `)
  );
  md += `\n\n`;
});

// 3. COURSES SECTION
md += `
## 📚 Courses

| Course | About | Links |
| ------ | ----- | ----- |
`;

courses.forEach((course) => {
  md += `${renderCourseRow(course)}\n`;
});

// 4. PROJECTS SECTION
md += `
## 🚀 Projects

| Project | Stack | Links |
| ------ | ------------ | ----- |
`;

projects.forEach((project) => {
  md += `${renderProjectRow(project)}\n`;
});

// 5. CONTACT SECTION
md += `
## 📫 Contact

<p>
  <a href="mailto:deniss.patancevs@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white" height="24"/></a>
  <a href="https://linkedin.com/in/deniss-patancevs" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white" height="24"/></a>
  <a href="https://github.com/deniss87" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white" height="24"/></a>
</p>
`;

/****************************************************************************
*************************** WRITE TO FILE ***********************************
*****************************************************************************/
fs.writeFileSync("README.md", md);