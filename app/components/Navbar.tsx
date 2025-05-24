import React, { useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  useEffect(() => {
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("mouseenter", () => {
        gsap.to(logo, { scale: 1.2, duration: 0.3, ease: "bounce.out" });
      });
      logo.addEventListener("mouseleave", () => {
        gsap.to(logo, { scale: 1, duration: 0.3, ease: "bounce.out" });
      });
    }
  }, []);

  return (
    <nav className="w-full flex items-center justify-between py-8 px-12 bg-transparent">
      <a
        href="/"
        className="logo text-3xl font-extrabold tracking-tight hover:font-normal transition-all duration-300"
      >
        Shrit.
      </a>
      <div className="flex space-x-10 text-xl font-normal">
        <a
          href="#yt"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          YT
        </a>
        <a
          href="#yt"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          newsletter
        </a>
        <a
          href="#work"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          Work
        </a>
        <a
          href="#past"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          Past
        </a>
        <a
          href="#nerd"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          Nerd
        </a>
      </div>
    </nav>
  );
}
