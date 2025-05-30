import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio2025-gules.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Shrit",
  description: "Yo Shrit here! building cool stuff on the go wohoo",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "any",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Shrit",
    description: "Yo Shrit here! building cool stuff on the go wohoo",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/5cee1368-220e-49f0-9e40-77a4441cdac4.png?token=eB4AYWeqak2MgfGZ9JksIA1z7_grB4tK5txx4Her2MM&height=634&width=1200&expires=33284633273",
        width: 1200,
        height: 634,
        alt: "Shrit making cool stuff",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shrit1401",
    title: "Shrit",
    description: "Yo Shrit here! building cool stuff on the go wohoo",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/5cee1368-220e-49f0-9e40-77a4441cdac4.png?token=eB4AYWeqak2MgfGZ9JksIA1z7_grB4tK5txx4Her2MM&height=634&width=1200&expires=33284633273",
        alt: "Shrit making cool stuff",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};
