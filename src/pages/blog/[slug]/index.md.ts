import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { SITE_AUTHOR } from "../../../consts";

export const getStaticPaths = (async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: post }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  if (!site) throw new Error("The Astro site URL is required");

  const post = props;
  const canonicalURL = new URL(`/blog/${post.id}/`, site).href;
  const authorURL = new URL("/", site).href;
  const metadata = [
    `Author: [${SITE_AUTHOR}](${authorURL})`,
    `Published: ${post.data.pubDate.toISOString()}`,
    `Updated: ${(post.data.updatedDate ?? post.data.pubDate).toISOString()}`,
    post.data.tags?.length ? `Topics: ${post.data.tags.join(", ")}` : undefined,
    `Canonical page: ${canonicalURL}`,
  ]
    .filter(Boolean)
    .join("\n");
  const markdownBody = (post.body ?? "").replace(
    /!\[([^\]]*)\]\([^)]*\)/g,
    (_match: string, alt: string) =>
      `Image: ${alt || "Illustration"} (available on the canonical HTML page).`,
  );
  const content = `# ${post.data.title}

> ${post.data.description}

${metadata}

${markdownBody}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
