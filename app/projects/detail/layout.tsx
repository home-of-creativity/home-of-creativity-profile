import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.projectTitle.en, seoCopy.projectTitle.ar);
const description = pageDescription(seoCopy.projectDescription.en, seoCopy.projectDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects/detail/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: "/projects/detail/",
  },
};

export default function ProjectDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
