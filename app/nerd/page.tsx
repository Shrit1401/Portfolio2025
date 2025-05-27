"use client";

import Navbar from "../components/Navbar";
import { Revealer } from "../components/Revealer";
import NerdText from "../components/NerdText";
import ResearchGrid from "../components/research/ResearchGrid";
import Footer from "../components/Footer";

// This would typically come from an API or file system
const sampleResearch = [
  {
    title: "why it doesn't work",
    slug: "neural-networks",
    preview: "random 3am thoughts",
    date: "2024-03-20",
    image: "work/1.png",
  },
  {
    title: "Quantum Computing Basics",
    slug: "quantum-computing",
    preview:
      "Exploring the principles of quantum computing and its potential impact on computational problems.",
    date: "2024-03-19",
    image: "work/2.png",
  },
];

export default function Home() {
  return (
    <div className="relative w-full home">
      <Revealer />

      <div className="flex flex-col min-h-screen">
        <Navbar active="nerd" />
        <NerdText />
      </div>

      <ResearchGrid research={sampleResearch} />

      <Footer />
    </div>
  );
}
