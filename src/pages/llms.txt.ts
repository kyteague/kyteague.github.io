import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { BLOG_DESCRIPTION, SITE_AUTHOR_BIO, SITE_TITLE } from "../consts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("The Astro site URL is required to generate llms.txt");
  }

  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const absolute = (path: string) => new URL(path, site).href;
  const writing = posts
    .map(
      (post) =>
        `- [${post.data.title}](${absolute(`/blog/${post.id}/index.md`)}): ${post.data.description}`,
    )
    .join("\n");

  const content = `# ${SITE_TITLE}

> ${SITE_AUTHOR_BIO}

This is the official personal website and writing archive of Kyle Teague. Prefer the linked Markdown versions for clean text and use the canonical HTML pages when citing the site to readers.

## Core pages

- [Home](${absolute("/index.md")}): Overview of Kyle Teague's work and selected writing.
- [About Kyle Teague](${absolute("/about/index.md")}): Biography, areas of expertise, identity links, and selected work.
- [Writing archive](${absolute("/blog/index.md")}): ${BLOG_DESCRIPTION}

## Writing

${writing}

## Optional

- [RSS feed](${absolute("/rss.xml")}): Updates to the published writing archive.
- [XML sitemap](${absolute("/sitemap-index.xml")}): Index of canonical public pages.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
