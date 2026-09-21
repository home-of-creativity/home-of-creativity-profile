import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.articlesTitle.en, seoCopy.articlesTitle.ar);
const description = pageDescription(seoCopy.articlesDescription.en, seoCopy.articlesDescription.ar);

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
