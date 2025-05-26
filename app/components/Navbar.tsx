"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

type NavbarProps = {
  active?: "work" | "past" | "nerd";
};

export default function Navbar({ active }: NavbarProps) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0,0 0)",
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (path === pathname) {
        e.preventDefault();
        return;
      }
      router.push(path, {
        onTransitionReady: triggerPageTransition,
      });
    };

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
        onClick={handleNavigation("/")}
        className="logo text-3xl font-extrabold tracking-tight hover:font-normal transition-all duration-300"
      >
        Shrit.
      </a>
      <div className="flex space-x-10 text-xl font-normal">
        <a
          href="https://www.youtube.com/@shippingshrit"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          YT
        </a>
        <a
          href="https://shrit.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:font-bold transition-all duration-300"
        >
          newsletter
        </a>
        <span
          onClick={handleNavigation("/work")}
          className={`hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
            active === "work" ? "font-bold underline" : ""
          }`}
        >
          Work
        </span>
        <span
          onClick={handleNavigation("/past")}
          className={`hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
            active === "past" ? "font-bold underline" : ""
          }`}
        >
          Past
        </span>
        <a
          onClick={handleNavigation("/nerd")}
          className={`hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
            active === "nerd" ? "font-bold underline" : ""
          }`}
        >
          Nerd <span className="text-sm">(Research)</span>
        </a>
      </div>
    </nav>
  );
}
