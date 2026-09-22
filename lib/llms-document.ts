import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fetchArticles } from "./articles-api";
import { SITE_URL } from "./site";

/** The editable brief stays in `public/llms.txt`. Articles are appended at build time. */
export async function llmsTxt(): Promise<string> {
  const brief = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8").trimEnd();
  const articles = await fetchArticles();
  const lines = articles
    .filter((article) => article.slug.trim().length > 0)
    .map((article) => {
      const url = `${SITE_URL}/articles/${article.slug}/`;
      const title = article.title_ar?.trim() || article.title_en?.trim() || article.slug;
      const alt = article.title_en?.trim() && article.title_en.trim() !== title ? ` — ${article.title_en.trim()}` : "";
      return `- [${title}](${url})${alt}`;
    });

  const section =
    lines.length > 0
      ? ["## Published articles", "", "Uploaded in the dashboard. One link per published article.", "", ...lines]
      : ["## Published articles", "", "No published dashboard articles were available when this file was built."];

  return `${brief}\n\n${section.join("\n")}\n`;
}
