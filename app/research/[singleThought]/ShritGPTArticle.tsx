"use client";

import React, { useCallback, useState } from "react";
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
import ImageLightbox from "@/app/components/research/ImageLightbox";
import {
  remarkPlugins,
  rehypePlugins,
  buildMarkdownComponents,
  proseClasses,
} from "@/app/components/research/markdownConfig";

import { useViewCount } from "@/app/lib/useViewCount";
import TokenizerPlayground from "@/app/components/research/gpt/TokenizerPlayground";
import BigramTable from "@/app/components/research/gpt/BigramTable";
import AttentionHeatmap from "@/app/components/research/gpt/AttentionHeatmap";
import MultiHeadDiagram from "@/app/components/research/gpt/MultiHeadDiagram";
import SamplingPlayground from "@/app/components/research/gpt/SamplingPlayground";
import TrainingLossChart from "@/app/components/research/gpt/TrainingLossChart";

function getReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
}

function splitAtH1(markdown: string): string[] {
  const lines = markdown.split("\n");
  const sections: string[] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (/^# /.test(line) && current.length > 0) {
      sections.push(current.join("\n"));
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) sections.push(current.join("\n"));
  return sections;
}

export default function ShritGPTArticle({ research }: { research: Research }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);
  const components = buildMarkdownComponents(setLightboxSrc);

  const views = useViewCount(research.slug.current);
  const readingTime = getReadingTime(research.markdown || "");
  const sections = splitAtH1(research.markdown || "");

  // sections[2] = "# Interpreting the data" — split before "## Data Loading"
  const interp = sections[2] || "";
  const dataLoadIdx = interp.indexOf("## Data Loading");
  const encodingSection = dataLoadIdx > 0 ? interp.slice(0, dataLoadIdx) : interp;
  const dataLoadingSection = dataLoadIdx > 0 ? interp.slice(dataLoadIdx) : "";

  // sections[9] = "# Optimizing the model" — split into subsections
  const optimizing = sections[9] || "";
  const tempIdx = optimizing.indexOf("## Temperature & K");
  const checkpointIdx = optimizing.indexOf("## Checkpoint & Point Loss");
  const webUiIdx = optimizing.indexOf("## Web UI");

  const optimizingIntro = tempIdx > 0 ? optimizing.slice(0, tempIdx) : optimizing;
  const tempSection = tempIdx > 0 && checkpointIdx > 0 ? optimizing.slice(tempIdx, checkpointIdx) : "";
  const checkpointSection = checkpointIdx > 0 && webUiIdx > 0 ? optimizing.slice(checkpointIdx, webUiIdx) : "";
  const webUiSection = webUiIdx > 0 ? optimizing.slice(webUiIdx) : "";

  function Prose({ content }: { content: string }) {
    if (!content.trim()) return null;
    return (
      <article className={proseClasses}>
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={components as React.ComponentProps<typeof ReactMarkdown>["components"]}
        >
          {content}
        </ReactMarkdown>
      </article>
    );
  }

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
        <div className="mx-auto max-w-3xl">
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

          <Prose content={sections[0] || ""} />
          <Prose content={sections[1] || ""} />
          <Prose content={encodingSection} />

          <TokenizerPlayground className="my-14" />

          <Prose content={dataLoadingSection} />
          <Prose content={sections[3] || ""} />

          <BigramTable className="my-14" />

          <Prose content={sections[4] || ""} />

          <AttentionHeatmap className="my-14" />

          <Prose content={sections[5] || ""} />

          <MultiHeadDiagram className="my-14" />

          <Prose content={sections[6] || ""} />
          <Prose content={sections[7] || ""} />
          <Prose content={sections[8] || ""} />
          <Prose content={optimizingIntro} />
          <Prose content={tempSection} />

          <SamplingPlayground className="my-14" />

          <Prose content={checkpointSection} />

          <TrainingLossChart className="my-14" />

          <Prose content={webUiSection} />
          <Prose content={sections[10] || ""} />
          <Prose content={sections[11] || ""} />
        </div>
      </main>

      <ResearchSense />
      <Footer />
      <ImageLightbox src={lightboxSrc} onClose={closeLightbox} />
    </div>
  );
}
