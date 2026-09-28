import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, pageSeo } from "@/lib/page-meta";
import { socialPageJsonLd } from "@/lib/seo";
import { officialSocialProfiles } from "@/lib/social-embeds";

/** The official-profiles index, titled apart from `/services/social-media/` (T21). */
export const metadata: Metadata = pageMetadata({ ...pageSeo.social, path: "/social/" });

export default function SocialLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={socialPageJsonLd(pageSeo.social.title, pageSeo.social.description, officialSocialProfiles())} />
      {children}
    </>
  );
}
