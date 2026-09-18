import type { APIRoute } from "astro";
import { rawContent } from "../content/about.md";
import { SITE_AUTHOR, SITE_AUTHOR_BIO, SITE_AUTHOR_PROFILES } from "../consts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("The Astro site URL is required");

  const absolute = (path: string) => new URL(path, site).href;

  const content = `# About ${SITE_AUTHOR}

> ${SITE_AUTHOR_BIO}

${rawContent().trim()}

[View resume](${absolute("/Resume%20-%20Kyle%20Teague.16afb3e.pdf")})

## Verified profiles

${SITE_AUTHOR_PROFILES.map((profile) => `- ${profile}`).join("\n")}

Canonical page: ${absolute("/about/")}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
