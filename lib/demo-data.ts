import { projects, showcaseClients } from "./content";
import type { PortfolioProject, ShowcaseClient } from "./portfolio-api";
import { pricingCategories } from "./pricing-catalog";

export const demoPricingCategories = pricingCategories;

export function demoShowcaseClients(): ShowcaseClient[] {
  return showcaseClients.fallbackNames.map((name, index) => ({
    id: -(index + 1),
    name,
    logo_url: null,
    website_url: null,
    sort_order: index + 1,
  }));
}

export function demoPortfolioProjects(): PortfolioProject[] {
  return projects.items.map((item, index) => {
    const cover = item.images.find((image) => image.featured)?.src ?? item.images[0]?.src ?? null;

    return {
      id: 9001 + index,
      category_id: index + 1,
      category: {
        id: index + 1,
        slug: item.id,
        name_en: item.filter.en,
        name_ar: item.filter.ar,
        sort_order: index + 1,
      },
      title_en: item.title.en,
      title_ar: item.title.ar,
      summary_en: item.body.en,
      summary_ar: item.body.ar,
      website_url: null,
      social_links: {},
      image_url: cover,
      images: item.images.map((image, imageIndex) => ({
        id: (index + 1) * 100 + imageIndex,
        image_url: image.src,
        alt_en: image.alt.en,
        alt_ar: image.alt.ar,
        sort_order: imageIndex,
        featured: Boolean(image.featured),
      })),
      sort_order: index + 1,
      featured: true,
    };
  });
}

export function demoPortfolioProject(id: string | number): PortfolioProject | null {
  const numeric = Number(id);
  return demoPortfolioProjects().find((project) => project.id === numeric) ?? null;
}
