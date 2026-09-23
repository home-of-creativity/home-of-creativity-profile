import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageDescription, pageTitle, seoCopy } from "@/lib/site";

const title = pageTitle(seoCopy.clientStoryTitle.en, seoCopy.clientStoryTitle.ar);
const description = pageDescription(seoCopy.clientStoryDescription.en, seoCopy.clientStoryDescription.ar);

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/client-story/" },
  openGraph: {
    title,
    description,
    url: "/client-story/",
  },
};

export default function ClientStoryLayout({ children }: { children: ReactNode }) {
  return children;
}
