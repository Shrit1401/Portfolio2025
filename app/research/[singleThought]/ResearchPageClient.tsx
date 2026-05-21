"use client";

import React, { useCallback, useState } from "react";
import { useViewCount } from "@/app/lib/useViewCount";
import Navbar from "../../components/Navbar";
import { Revealer } from "../../components/Revealer";
import ResearchText from "@/app/components/research/ResearchText";
import Footer from "@/app/components/Footer";
import ResearchSense from "@/app/components/research/ResearchSense";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/vs2015.css";
import "katex/dist/katex.min.css";
import { Research } from "@/app/lib/types";
import Link from "next/link";
import HomeschoolingArticle from "./HomeschoolingArticle";
import ShritGPTArticle from "./ShritGPTArticle";
import ImageLightbox from "@/app/components/research/ImageLightbox";
import {
  remarkPlugins,
  rehypePlugins,
  buildMarkdownComponents,
  proseClasses,
} from "@/app/components/research/markdownConfig";

interface ResearchPageClientProps {
  research: Research;
}

function getReadingTime(markdown: string): string {
  const wordsPerMinute = 200;
  const words = markdown.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function ResearchPageClient({
  research,
}: ResearchPageClientProps) {
  if (research.slug.current === "homeschooling") {
    return <HomeschoolingArticle research={research} />;
  }
  if (research.slug.current === "making-ur-own-gpt") {
    return <ShritGPTArticle research={research} />;
  }

  return <GenericArticle research={research} />;
}

function GenericArticle({ research }: { research: Research }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);
  const components = buildMarkdownComponents(setLightboxSrc);
  const readingTime = getReadingTime(research.markdown || "");
  const views = useViewCount(research.slug.current);

  return (
    <div className="relative w-full home">
      <Revealer />

      <Navbar />
      <ResearchText
        title={research.title || "Untitled"}
        time={readingTime}
        date={research.date || new Date().toISOString().split("T")[0]}
      />
      <main className="container mx-auto flex-grow px-4 pb-8">
        <article className={proseClasses}>
          {research.tags && research.tags.length > 0 && (
            <div className="mb-7 flex flex-wrap gap-2">
              {research.tags.map((tag) => (
                <Link
                  key={tag.slug.current}
                  href={`/research/tag/${tag.slug.current}`}
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-100"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
          <ReactMarkdown
            remarkPlugins={remarkPlugins}
            rehypePlugins={rehypePlugins}
            components={components as any}
          >
            {research.markdown || ""}
          </ReactMarkdown>
        </article>
      </main>

      <ResearchSense />
      <Footer />
      <ImageLightbox src={lightboxSrc} onClose={closeLightbox} />
    </div>
  );
}
