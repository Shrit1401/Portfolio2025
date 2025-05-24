"use client";

import Loader from "./components/Loader";
import HeroText from "./components/HeroText";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import GridLinks from "./components/GridLinks";

export default function Home() {
  return (
    <div className="relative w-full">
      <Loader />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeroText />
      </div>
      <AboutMe />
      <GridLinks />
    </div>
  );
}
