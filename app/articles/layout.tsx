import type { Metadata } from "next";
import type { ReactNode } from "react";
import { seoCopy, seoMetaDescription, seoMetaTitle } from "@/lib/site";

const title = seoMetaTitle(seoCopy.articlesTitle);
const description = seoMetaDescription(seoCopy.articlesDescription);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/articles/" },
  openGraph: {
    title,
    description,
    url: "/articles/",
  },
};

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return children;
}
