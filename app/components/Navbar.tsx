"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

type NavbarProps = {
  active?: "work" | "past" | "nerd";
};

export default function Navbar({ active }: NavbarProps) {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
      setIsMenuOpen(false);
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

  useEffect(() => {
    if (isMenuOpen) {
      // Animate overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(8px)", duration: 0.5 }
      );

      // Animate menu container
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      // Animate menu items with stagger
      const menuItems = menuItemsRef.current?.children;
      if (menuItems) {
        gsap.fromTo(
          menuItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          }
        );
      }
    } else {
      // Reverse animations
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.3,
      });
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  const handleMenuHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      x: 10,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMenuLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <nav className="w-full flex items-center justify-between py-8 px-4 md:px-12 bg-transparent relative">
      <a
        href="/"
        onClick={handleNavigation("/")}
        className="logo text-3xl font-extrabold tracking-tight hover:font-normal transition-all duration-300"
      >
        Shrit.
      </a>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden p-2 relative z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-black transform transition-all duration-500 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-black transition-all duration-500 ${
              isMenuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-black transform transition-all duration-500 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 text-xl font-normal">
        <span
          onClick={handleNavigation("/")}
          className={`hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
            pathname === "/" ? "font-bold underline" : ""
          }`}
        >
          Home
        </span>
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

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-2xl transform md:hidden z-40`}
      >
        <div ref={menuItemsRef} className="flex flex-col space-y-6 p-8 mt-16">
          <span
            onClick={handleNavigation("/")}
            className={`text-xl hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
              pathname === "/" ? "font-bold underline" : ""
            }`}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            Home
          </span>
          <a
            href="https://www.youtube.com/@shippingshrit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:underline hover:font-bold transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            YT
          </a>
          <a
            href="https://shrit.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:underline hover:font-bold transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            newsletter
          </a>
          <span
            onClick={handleNavigation("/work")}
            className={`text-xl hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
              active === "work" ? "font-bold underline" : ""
            }`}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            Work
          </span>
          <span
            onClick={handleNavigation("/past")}
            className={`text-xl hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
              active === "past" ? "font-bold underline" : ""
            }`}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            Past
          </span>
          <a
            onClick={handleNavigation("/nerd")}
            className={`text-xl hover:underline cursor-pointer hover:font-bold transition-all duration-300 ${
              active === "nerd" ? "font-bold underline" : ""
            }`}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuLeave}
          >
            Nerd <span className="text-sm">(Research)</span>
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
