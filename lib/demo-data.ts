import { projects } from "./content";
import type { PortfolioProject, ShowcaseClient } from "./portfolio-api";
import { pricingCategories } from "./pricing-catalog";

export const demoPricingCategories = pricingCategories;

/** Published logos from `GET /portfolio/clients` so demo/local still show the real marks. */
const publishedClients: ShowcaseClient[] = [
  {
    id: 1,
    name: "Abo shakir",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/65yoRBIMbTLPKBW1GIXLyrR69HJIuJsYCwkP7l6F.webp",
    website_url: null,
    sort_order: 1,
  },
  {
    id: 13,
    name: "Faiz Wahba",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/7c4yLwfEKULLyE1j051MK3z3X9UGtIfvZenxAO99.png",
    website_url: null,
    sort_order: 2,
  },
  {
    id: 2,
    name: "Raheel & Roaa",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/evphuoe3kJJKT3z8RPBOasjwTr2mIpAWvSqov52U.png",
    website_url: null,
    sort_order: 2,
  },
  {
    id: 3,
    name: "Air Techsolutions",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/IlAF9CR6D4iMqnFALdWZLV26AOHkqdM5PPl9PDlO.png",
    website_url: null,
    sort_order: 3,
  },
  {
    id: 6,
    name: "Enginety",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/981G7xPNI7ErcrZkQcIxOwgZsnfXGNq07f5iOMWy.png",
    website_url: null,
    sort_order: 3,
  },
  {
    id: 4,
    name: "Arabic Line",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/XriyZhU67qrX7X2CuKI9vjlDbSgZiVxdqtajFeP0.png",
    website_url: null,
    sort_order: 4,
  },
  {
    id: 15,
    name: "Future Line",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/36WtZ81GwQmt720Mp3JXpE2bjEMfOTMYDG0un5HV.png",
    website_url: null,
    sort_order: 5,
  },
  {
    id: 5,
    name: "New Products",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/EAZRqGuyQUvc2FwjLcWOeeLmX1H1rm0FHOKrIRtw.png",
    website_url: null,
    sort_order: 6,
  },
  {
    id: 7,
    name: "Bayt Lawha",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/nYU44ZphpTeyGYoWlvqhLrfJsSA6TNb1N8GztZh1.png",
    website_url: null,
    sort_order: 7,
  },
  {
    id: 8,
    name: "جدو شاكر",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/eEFW94k6bAuhGMz6ywugkXLmRlAwgfYHFeQtKQYU.png",
    website_url: null,
    sort_order: 8,
  },
  {
    id: 9,
    name: "حلويات النبلاء",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/Q86PCvAR8pYdl0rBF0APAfIidCgQSidXbzc9yrBa.png",
    website_url: null,
    sort_order: 9,
  },
  {
    id: 10,
    name: "damaperla",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/ChTIzyvwtWY8ykkmaM2gworWKXYuT6N1KP1MubBg.png",
    website_url: null,
    sort_order: 10,
  },
  {
    id: 11,
    name: "Riva",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/HFWJd3xRkHsAiOcokVvf60INtJ6iCx7eocG3LHL8.webp",
    website_url: null,
    sort_order: 11,
  },
  {
    id: 12,
    name: "smart vision solution",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/dSkeU6xEFmm4aoGuvhWX4IU3AmzUOYpCC9RCVlUX.png",
    website_url: null,
    sort_order: 12,
  },
  {
    id: 14,
    name: "Vizora",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/2sqeaUoGgI4kj7a2aITKXcIw8DJW95viBbJMoBNM.png",
    website_url: null,
    sort_order: 14,
  },
  {
    id: 16,
    name: "نبع المثلجات",
    logo_url: "https://api.hoc.agency/storage/portfolio/clients/x1uRA6EBZtMjMQBXsUJlqfMXBN5ZoDeE7enCjyX7.png",
    website_url: null,
    sort_order: 16,
  },
];

export function demoShowcaseClients(): ShowcaseClient[] {
  return publishedClients;
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
