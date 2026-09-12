"use client";

import { Suspense } from "react";
import { Footer, Nav } from "@/components/chrome";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";
import { useSearchParams } from "next/navigation";

function ProjectDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  return <ProjectDetailView id={id} />;
}

export default function ProjectDetailPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Suspense fallback={<div className="project-detail-page py-24" />}>
          <ProjectDetailContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
