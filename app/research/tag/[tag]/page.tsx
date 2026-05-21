"use client";

import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { Revealer } from "@/app/components/Revealer";
import ResearchGrid from "@/app/components/research/ResearchGrid";
import Footer from "@/app/components/Footer";
import { getResearchByTag } from "@/app/lib/researchData";

export default function TagPage() {
  const params = useParams();
  const tagSlug = params.tag as string;
  const { research, tagName } = getResearchByTag(tagSlug);

  if (!tagName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Tag not found</div>
      </div>
    );
  }

  return (
    <div className="relative w-full home">
      <Revealer />

      <div className="flex flex-col">
        <Navbar active="nerd" />

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">
            Research tagged with &ldquo;{tagName}&rdquo;
          </h1>
          <p className="text-gray-600 mb-8">
            {research.length} {research.length === 1 ? "article" : "articles"}{" "}
            found
          </p>
        </div>
      </div>

      <ResearchGrid research={research} />

      <Footer />
    </div>
  );
}
