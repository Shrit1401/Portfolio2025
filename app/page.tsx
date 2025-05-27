"use client";

import Loader from "./components/Loader";
import HeroText from "./components/HeroText";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import GridLinks from "./components/GridLinks";
import { Revealer } from "./components/Revealer";
import Footer from "./components/Footer";
import Substack from "./components/Substack";

export default function Home() {
  return (
    <div className="relative w-full home">
      <Loader />
      <Revealer />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeroText />
      </div>
      <AboutMe />
      <Substack />
      <GridLinks />
      <Footer />
    </div>
  );
}
