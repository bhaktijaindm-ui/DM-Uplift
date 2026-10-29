import { content } from "../data/content";

/**
 * Convert string into clean URL-safe slug
 */
export function slugify(str) {
  if (!str) return "";
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Returns canonical slug for a project
 */
export function getProjectSlug(project) {
  if (!project) return "";
  return project.slug || slugify(project.name || project.title || project.id);
}

/**
 * Returns dedicated URL path for a project
 */
export function getProjectUrl(project) {
  if (!project) return "#/";
  return `/project/${project.id}`;
}

/**
 * Finds a project by ID ("proj-10"), slug ("aura-haute-horlogerie"),
 * 1-based index ("10"), or name.
 */
export function findProject(identifier) {
  if (!identifier) return null;
  const raw = String(identifier).trim().toLowerCase();
  const projects = content.projects || [];

  // 1. Direct ID match
  let match = projects.find((p) => p.id && p.id.toLowerCase() === raw);
  if (match) return match;

  // 2. Slug match
  match = projects.find(
    (p) =>
      slugify(p.name) === raw ||
      slugify(p.title) === raw ||
      (p.slug && p.slug.toLowerCase() === raw)
  );
  if (match) return match;

  // 3. 1-based numeric index match ("1" to "20")
  const num = parseInt(raw, 10);
  if (!isNaN(num) && num >= 1 && num <= projects.length) {
    return projects[num - 1];
  }

  // 4. Fuzzy / partial match
  match = projects.find(
    (p) =>
      (p.name && p.name.toLowerCase().includes(raw)) ||
      (p.title && p.title.toLowerCase().includes(raw))
  );
  if (match) return match;

  return null;
}
