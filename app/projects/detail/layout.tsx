import type { Metadata } from "next";
import type { ReactNode } from "react";
import { seoCopy } from "@/lib/site";

export const metadata: Metadata = {
  title: seoCopy.projectTitle.en,
  description: seoCopy.projectDescription.en,
  alternates: { canonical: "/projects/detail/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${seoCopy.projectTitle.en} — Home of Creativity`,
    description: seoCopy.projectDescription.en,
    url: "/projects/detail/",
  },
};

export default function ProjectDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
