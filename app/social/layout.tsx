import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoSocialJsonLd } from "@/components/SeoSocialJsonLd";
import { seoCopy, seoMetaDescription, seoMetaTitle } from "@/lib/site";

const title = seoMetaTitle(seoCopy.socialTitle);
const description = seoMetaDescription(seoCopy.socialDescription);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Instagram", "Facebook", "Telegram", "إنستغرام", "فيسبوك", "تيليجرام", "بيت الإبداع"],
  alternates: { canonical: "/social/" },
  openGraph: {
    title,
    description,
    url: "/social/",
  },
};

export default function SocialLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SeoSocialJsonLd />
      {children}
    </>
  );
}
