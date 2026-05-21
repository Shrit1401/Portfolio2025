import { Metadata } from "next";
import { getResearchBySlug } from "@/app/lib/researchData";
import ResearchPageClient from "./ResearchPageClient";
import { getSiteBaseUrl } from "@/app/lib/site";

type Params = Promise<{ singleThought: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { singleThought } = await params;
  const data = getResearchBySlug(singleThought);
  const baseUrl = getSiteBaseUrl();

  if (!data) {
    return {
      title: "Research Not Found",
      description: "The requested research article could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const canonical = `${baseUrl}/research/${singleThought}`;

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonical,
      type: "article",
      publishedTime: data.date,
    },
    twitter: {
      card: "summary",
      site: "@shrit1401",
      creator: "@shrit1401",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function ResearchPage({ params }: { params: Params }) {
  const { singleThought } = await params;
  const data = getResearchBySlug(singleThought);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-xl">Research not found</div>
      </div>
    );
  }

  const baseUrl = getSiteBaseUrl();
  const canonical = `${baseUrl}/research/${singleThought}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    dateModified: data.date,
    author: {
      "@type": "Person",
      name: "Shrit",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <ResearchPageClient research={data} />
    </>
  );
}
