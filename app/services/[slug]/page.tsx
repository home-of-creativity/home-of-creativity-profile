import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { JsonLd } from "@/components/JsonLd";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
import { relatedArticleLinks } from "@/lib/article-services-server";
import { pageMetadata } from "@/lib/page-meta";
import { serviceDetailJsonLd } from "@/lib/seo";
import { findServiceDetail, serviceDetails } from "@/lib/service-details";
import { OG_IMAGE_PATH } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((detail) => ({ slug: detail.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = findServiceDetail(slug);
  if (!detail) return {};

  return pageMetadata({
    title: detail.metaTitle.ar,
    titleEn: detail.metaTitle.en,
    description: detail.metaDescription.ar,
    path: `/services/${detail.slug}/`,
    image: { url: OG_IMAGE_PATH, width: 1920, height: 1080, alt: detail.title.ar },
  });
}

export default async function ServiceRoutePage({ params }: Params) {
  const { slug } = await params;
  if (!findServiceDetail(slug)) notFound();
  const articles = await relatedArticleLinks(slug);

  return (
    <>
      <JsonLd data={serviceDetailJsonLd(slug)} />
      <Nav />
      <main id="top">
        <ServiceDetailPage slug={slug} articles={articles} />
      </main>
      <Footer />
    </>
  );
}
