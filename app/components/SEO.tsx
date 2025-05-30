import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shrit.in"),
  title: "shrit",
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
    url: "https://www.shrit.in",
    title: "Shrit",
    description: "Yo Shrit here! building cool stuff on the go wohoo",
    images: [
      {
        url: "https://www.shrit.in/og.png",
        width: 1200,
        height: 630,
        alt: "Shrit making cool stuff",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shrit1401",
    title: "shrit",
    description: "Yo Shrit here! building cool stuff on the go wohoo",
    images: [
      {
        url: "https://www.shrit.in/og.png",
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
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
  alternates: {
    canonical: "https://www.shrit.in",
  },
};
