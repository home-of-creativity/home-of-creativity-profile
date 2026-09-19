import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SeoSocialJsonLd } from "@/components/SeoSocialJsonLd";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.socialTitle.en, seoCopy.socialTitle.ar);
const description = pageDescription(seoCopy.socialDescription.en, seoCopy.socialDescription.ar);

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
