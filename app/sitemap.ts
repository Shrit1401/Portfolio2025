import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { getSiteBaseUrl } from "@/app/lib/site";
import { researchPosts } from "@/app/lib/researchData";

// Research only: work detail routes are not implemented yet (avoid 404s in sitemap).
const query = groq`*[_type == "research" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt,
  "tags": tags[]->{ "name": name, "slug": slug.current }
}`;

const baseUrl = getSiteBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sanityContent: Array<{ slug: string; _updatedAt: string; tags?: Array<{ slug?: string | null } | null> }> = [];
  try {
    sanityContent = await client.fetch(query);
  } catch {
    // Sanity unavailable — fall back to local data only
  }

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Local research posts (researchData.ts)
  const localSlugs = new Set(researchPosts.map((p) => p.slug.current));
  const localResearchRoutes: MetadataRoute.Sitemap = researchPosts.map((post) => ({
    url: `${baseUrl}/research/${post.slug.current}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Sanity research posts (deduplicated against local)
  const sanityResearchRoutes: MetadataRoute.Sitemap = sanityContent
    .filter((item) => !localSlugs.has(item.slug))
    .map((item) => ({
      url: `${baseUrl}/research/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Tag routes — collect from both sources
  const tagSlugs = new Set<string>();

  for (const post of researchPosts) {
    for (const tag of post.tags ?? []) {
      tagSlugs.add(tag.slug.current);
    }
  }

  for (const item of sanityContent) {
    for (const tag of item.tags ?? []) {
      const s = tag?.slug;
      if (s) tagSlugs.add(s);
    }
  }

  const tagRoutes: MetadataRoute.Sitemap = [...tagSlugs].map((slug) => ({
    url: `${baseUrl}/research/tag/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...localResearchRoutes, ...sanityResearchRoutes, ...tagRoutes];
}
