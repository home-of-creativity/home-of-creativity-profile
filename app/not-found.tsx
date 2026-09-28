import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { pageSeo } from "@/lib/page-meta";

export const metadata: Metadata = {
  title: { absolute: pageSeo.notFound.title },
  description: pageSeo.notFound.description,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
