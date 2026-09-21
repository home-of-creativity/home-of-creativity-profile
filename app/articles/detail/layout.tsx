import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.articleTitle.en, seoCopy.articleTitle.ar);
const description = pageDescription(seoCopy.articleDescription.en, seoCopy.articleDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/articles/detail/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: "/articles/detail/",
  },
};

export default function ArticleDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
