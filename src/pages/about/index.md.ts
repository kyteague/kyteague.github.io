import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import {
  SITE_AUTHOR,
  SITE_AUTHOR_BIO,
  SITE_AUTHOR_PROFILES,
  SITE_TOPICS,
} from "../../consts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("The Astro site URL is required");

  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const absolute = (path: string) => new URL(path, site).href;

  const topics = SITE_TOPICS.map((topic) => topic.toLowerCase()).join(", ");
  const content = `# About ${SITE_AUTHOR}

> ${SITE_AUTHOR_BIO}

Kyle's work and writing span ${topics}. He is most interested in the choices that make software durable: clear constraints, simple interfaces, and systems teams can operate with confidence.

In 2011, Kyle's team placed ninth in the Yahoo! KDD Cup using a graph-based "square counting" method for recommendation. He publishes technical field notes on this site, including the approach behind that result and practical lessons from building data-intensive systems.

## Selected work

${posts
  .map(
    (post) =>
      `- [${post.data.title}](${absolute(`/blog/${post.id}/index.md`)}): ${post.data.description}`,
  )
  .join("\n")}

## Verified profiles

${SITE_AUTHOR_PROFILES.map((profile) => `- ${profile}`).join("\n")}

Canonical page: ${absolute("/about/")}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
