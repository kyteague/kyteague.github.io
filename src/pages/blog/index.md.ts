import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { BLOG_DESCRIPTION, SITE_AUTHOR } from "../../consts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("The Astro site URL is required");

  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const absolute = (path: string) => new URL(path, site).href;

  const content = `# Writing by ${SITE_AUTHOR}

> ${BLOG_DESCRIPTION}

${posts
  .map(
    (post) =>
      `- [${post.data.title}](${absolute(`/blog/${post.id}/index.md`)}): ${post.data.description} Published ${post.data.pubDate.toISOString().slice(0, 10)}.`,
  )
  .join("\n")}

Canonical page: ${absolute("/blog/")}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
