import type { APIRoute } from "astro";
import { frontmatter, rawContent } from "../content/services/index.md";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("The Astro site URL is required");
  const absolute = (path: string) => new URL(path, site).href;
  const services: {
    title: string;
    href: string;
    description: string;
    detail: string;
  }[] = frontmatter.services;
  return new Response(
    `# ${frontmatter.title} — Kyle Teague

> ${frontmatter.description}

${frontmatter.headline}.

${rawContent().trim()}

${services.map((service) => `## [${service.title}](${absolute(service.href)})\n\n${service.description}\n\n${service.detail}`).join("\n\n")}

## ${frontmatter.contactHeading}

${frontmatter.contactText}

[Get in touch](${absolute("/contact/")})

Canonical page: ${absolute("/services/")}
`,
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } },
  );
};
