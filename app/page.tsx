"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Loader from "./components/Loader";
// import HoverHeading from "./components/HoverHeading";
import HeroText from "./components/HeroText";
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";

export default function Home() {
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Initial states
    gsap.set(navItemRefs.current, { y: 50, opacity: 0 });
    gsap.set(sectionRefs.current, { y: 100, opacity: 0 });

    const tl = gsap.timeline({ delay: 1 });

    // Navbar animation
    tl.to(navItemRefs.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.13,
      ease: "power3.out",
    }).to(
      sectionRefs.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <div className="relative w-full">
      <Loader />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeroText />
      </div>
      <AboutMe />
    </div>
  );
}
