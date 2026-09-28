import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/chrome";
import { JsonLd } from "@/components/JsonLd";
import { OfficePlace } from "@/components/sections/OfficePlace";
import { publishedOffices } from "@/lib/offices";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { officePageJsonLd } from "@/lib/seo";

export const dynamicParams = false;

/**
 * One page per office with a slug and a city (Damascus, Riyadh). The UAE office joins
 * once HOC supplies its city: until then `/locations/uae/` is not generated (404).
 */
export function generateStaticParams() {
  return publishedOffices().map((office) => ({ office: office.slug! }));
}

type Params = { params: Promise<{ office: string }> };

function findOffice(slug: string) {
  return publishedOffices().find((office) => office.slug === slug);
}

function seoFor(slug: string) {
  return pageSeo[slug as "damascus" | "riyadh"];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { office: slug } = await params;
  const office = findOffice(slug);
  const seo = office ? seoFor(slug) : undefined;
  if (!office || !seo) return {};

  return {
    ...pageMetadata({ ...seo, path: `/locations/${slug}/` }),
    ...(office.geo && office.address
      ? {
          other: {
            "geo.region": office.countryCode,
            "geo.placename": office.address.en,
            "geo.position": `${office.geo.latitude};${office.geo.longitude}`,
            ICBM: `${office.geo.latitude}, ${office.geo.longitude}`,
          },
        }
      : {}),
  };
}

export default async function OfficeRoutePage({ params }: Params) {
  const { office: slug } = await params;
  const office = findOffice(slug);
  const seo = office ? seoFor(slug) : undefined;
  if (!office || !seo) notFound();

  return (
    <>
      <JsonLd data={officePageJsonLd(office, seo.title, seo.description)} />
      <Nav />
      <main id="top">
        <OfficePlace office={office} />
      </main>
      <Footer />
    </>
  );
}
