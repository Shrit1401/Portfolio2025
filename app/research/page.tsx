"use client";

import Navbar from "../components/Navbar";
import { Revealer } from "../components/Revealer";
import NerdText from "../components/NerdText";
import ResearchGrid from "../components/research/ResearchGrid";
import Footer from "../components/Footer";
import { getAllResearch } from "../lib/researchData";

export default function Home() {
  const research = getAllResearch();

  return (
    <div className="relative w-full home">
      <Revealer />

      <div className="flex flex-col min-h-screen">
        <Navbar active="nerd" />
        <NerdText />
      </div>

      <ResearchGrid key={research.length} research={research} />

      <Footer />
    </div>
  );
}
