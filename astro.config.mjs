// @ts-check

import { readFileSync, readdirSync } from "node:fs";
import { extname } from "node:path";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const blogDirectory = new URL("./src/content/blog/", import.meta.url);
const blogLastModified = new Map(
  readdirSync(blogDirectory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() && [".md", ".mdx"].includes(extname(entry.name)),
    )
    .flatMap((entry) => {
      const source = readFileSync(new URL(entry.name, blogDirectory), "utf8");
      const updatedDate = source.match(
        /^updatedDate:\s*["']?([^"'\n]+?)["']?\s*$/m,
      )?.[1];
      const publishedDate = source.match(
        /^pubDate:\s*["']?([^"'\n]+?)["']?\s*$/m,
      )?.[1];
      const lastModified = updatedDate ?? publishedDate;

      if (!lastModified) return [];

      const slug = entry.name.slice(0, -extname(entry.name).length);
      return [[`/blog/${slug}/`, new Date(lastModified)]];
    }),
);

// https://astro.build/config
export default defineConfig({
  site: "https://kyleteague.com",
  image: {
    dangerouslyProcessSVG: true,
  },
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const lastModified = blogLastModified.get(new URL(item.url).pathname);
        return lastModified ? { ...item, lastmod: lastModified } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
