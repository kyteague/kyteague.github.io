import type { CollectionEntry } from "astro:content";

export interface BlogTag {
  name: string;
  slug: string;
  posts: CollectionEntry<"blog">[];
}

export function getBlogTagSlug(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/#/g, " sharp ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getBlogTags(posts: CollectionEntry<"blog">[]) {
  const tagsBySlug = new Map<string, BlogTag>();

  for (const post of posts) {
    for (const name of post.data.tags ?? []) {
      const slug = getBlogTagSlug(name);
      if (!slug) continue;

      const existingTag = tagsBySlug.get(slug);
      if (existingTag) {
        if (!existingTag.posts.some(({ id }) => id === post.id)) {
          existingTag.posts.push(post);
        }
      } else {
        tagsBySlug.set(slug, { name: name.trim(), slug, posts: [post] });
      }
    }
  }

  return [...tagsBySlug.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );
}
