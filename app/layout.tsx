import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import { DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import SmoothScroll from "./components/SmoothScroll";
import { metadata as seoMetadata } from "./components/SEO";

// Font configurations
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = seoMetadata;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <ViewTransitions>
      <html lang="en" className={`${dmSans.variable} ${ebGaramond.variable}`}>
        <body className="font-sans antialiased">
          <SmoothScroll>{children}</SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
};

export default RootLayout;
