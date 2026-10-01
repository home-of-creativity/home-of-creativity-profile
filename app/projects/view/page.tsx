import type { Metadata } from "next";
import { Footer, Nav } from "@/components/chrome";
import { ProjectDetailLive } from "@/components/sections/ProjectDetailLive";

export const metadata: Metadata = {
  title: { absolute: "بيت الإبداع | Home of Creativity" },
};

/** Served in place of `/projects/{id}/` when that file was not in the last export. */
export default function ProjectLivePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ProjectDetailLive />
      </main>
      <Footer />
    </>
  );
}
