import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import {
  SITE_AUTHOR_BIO,
  SITE_AUTHOR_PROFILES,
  SITE_TITLE,
  SITE_TOPICS,
} from "../consts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("The Astro site URL is required");

  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const absolute = (path: string) => new URL(path, site).href;

  const content = `# ${SITE_TITLE}

> ${SITE_AUTHOR_BIO}

## Areas of expertise

${SITE_TOPICS.map((topic) => `- ${topic}`).join("\n")}

## Profiles

${SITE_AUTHOR_PROFILES.map((profile) => `- ${profile}`).join("\n")}

## Writing

${posts
  .map(
    (post) =>
      `- [${post.data.title}](${absolute(`/blog/${post.id}.md`)}): ${post.data.description}`,
  )
  .join("\n")}

Canonical page: ${absolute("/")}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
