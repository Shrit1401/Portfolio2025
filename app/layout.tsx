import type { Metadata } from "next";
import { DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";

import { ViewTransitions } from "next-view-transitions";
import SmoothScroll from "./components/SmoothScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

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
        url: "./og.png",
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
    title: "shrit ",
    description: "Yo Shrit here! building cool stuff on the go wohoo",
    images: [
      {
        url: "./og.png",
        alt: "Shrit making cool stuff",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${dmSans.variable} ${ebGaramond.variable} font-sans antialiased`}
        >
          <SmoothScroll>{children}</SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
