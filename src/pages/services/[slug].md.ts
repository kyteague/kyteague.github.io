import type { APIRoute, GetStaticPaths } from "astro";
import * as cto from "../../content/services/fractional-cto.md";
import * as engineer from "../../content/services/senior-software-engineer.md";

const services = {
  "fractional-cto": cto,
  "senior-software-engineer": engineer,
};

export const getStaticPaths = (() =>
  Object.keys(services).map((slug) => ({
    params: { slug },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params, site }) => {
  if (!site) throw new Error("The Astro site URL is required");
  const { frontmatter: data, rawContent } =
    services[params.slug as keyof typeof services];
  const absolute = (path: string) => new URL(path, site).href;
  return new Response(
    `# ${data.title} — Kyle Teague

> ${data.description}

${data.headline}.

${data.introduction}

${rawContent().trim()}

## Tell me what you’re working on

${data.contactText}

[Get in touch](${absolute("/contact/")})
[View résumé](${absolute("/Resume%20-%20Kyle%20Teague.16afb3e.pdf")})
[All services](${absolute("/services/")})

Canonical page: ${absolute(`/services/${params.slug}/`)}
`,
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } },
  );
};
