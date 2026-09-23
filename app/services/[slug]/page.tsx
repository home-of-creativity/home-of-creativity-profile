import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { SeoServiceDetailJsonLd } from "@/components/SeoServiceDetailJsonLd";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";
import { findServiceDetail, serviceDetails } from "@/lib/service-details";
import { OG_IMAGE_PATH, seoMetaDescription, seoMetaTitle } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((detail) => ({ slug: detail.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = findServiceDetail(slug);
  if (!detail) return {};

  const title = seoMetaTitle(detail.metaTitle);
  const description = seoMetaDescription(detail.metaDescription);
  const url = `/services/${detail.slug}/`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: OG_IMAGE_PATH, width: 1920, height: 1080, alt: detail.title.en }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServiceRoutePage({ params }: Params) {
  const { slug } = await params;
  if (!findServiceDetail(slug)) notFound();

  return (
    <>
      <SeoServiceDetailJsonLd slug={slug} />
      <Nav />
      <main id="top">
        <ServiceDetailPage slug={slug} />
      </main>
      <Footer />
    </>
  );
}
