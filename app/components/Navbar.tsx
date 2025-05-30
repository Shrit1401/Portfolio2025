"use client";
import React, { useEffect, useState, useRef, type FC } from "react";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

// Types
type NavbarProps = {
  active?: "work" | "past" | "nerd";
};

type MenuItem = {
  label: string;
  path: string;
  isExternal?: boolean;
  externalUrl?: string;
  subtext?: string;
};

// Constants
const MENU_ITEMS: MenuItem[] = [
  { label: "Home", path: "/" },
  {
    label: "YT",
    path: "",
    isExternal: true,
    externalUrl: "https://www.youtube.com/@shippingshrit",
  },
  {
    label: "newsletter",
    path: "",
    isExternal: true,
    externalUrl: "https://shrit.substack.com/",
  },
  { label: "Work", path: "/work" },
  { label: "Past", path: "/past" },
  { label: "Nerd", path: "/nerd", subtext: "(Research)" },
];

const ANIMATION_CONFIG = {
  pageTransition: {
    duration: 2000,
    easing: "cubic-bezier(0.9, 0, 0.1, 1)",
  },
  menu: {
    duration: 0.5,
    stagger: 0.1,
  },
  hover: {
    duration: 0.3,
  },
} as const;

const Navbar: FC<NavbarProps> = ({ active }) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const triggerPageTransition = () => {
    document.documentElement.animate(
      [
        { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
        { clipPath: "polygon(0 100%, 100% 100%, 100% 0,0 0)" },
      ],
      {
        duration: ANIMATION_CONFIG.pageTransition.duration,
        easing: ANIMATION_CONFIG.pageTransition.easing,
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

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
    if (!logo) return;

    const handleLogoEnter = () => {
      gsap.to(logo, {
        scale: 1.2,
        duration: ANIMATION_CONFIG.hover.duration,
        ease: "bounce.out",
      });
    };

    const handleLogoLeave = () => {
      gsap.to(logo, {
        scale: 1,
        duration: ANIMATION_CONFIG.hover.duration,
        ease: "bounce.out",
      });
    };

    logo.addEventListener("mouseenter", handleLogoEnter);
    logo.addEventListener("mouseleave", handleLogoLeave);

    return () => {
      logo.removeEventListener("mouseenter", handleLogoEnter);
      logo.removeEventListener("mouseleave", handleLogoLeave);
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current || !menuItemsRef.current || !overlayRef.current)
      return;

    if (isMenuOpen) {
      // Animate overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        {
          opacity: 1,
          backdropFilter: "blur(8px)",
          duration: ANIMATION_CONFIG.menu.duration,
        }
      );

      // Animate menu container
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: ANIMATION_CONFIG.menu.duration,
          ease: "power3.out",
        }
      );

      // Animate menu items with stagger
      const menuItems = menuItemsRef.current.children;
      gsap.fromTo(
        menuItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.menu.duration,
          stagger: ANIMATION_CONFIG.menu.stagger,
          ease: "back.out(1.7)",
        }
      );
    } else {
      // Reverse animations
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: ANIMATION_CONFIG.menu.duration,
      });
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: ANIMATION_CONFIG.menu.duration,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  const handleMenuHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      x: 10,
      duration: ANIMATION_CONFIG.hover.duration,
      ease: "power2.out",
    });
  };

  const handleMenuLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      x: 0,
      duration: ANIMATION_CONFIG.hover.duration,
      ease: "power2.out",
    });
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.path === pathname || item.path === active;
    const commonClasses =
      "hover:underline cursor-pointer hover:font-bold transition-all duration-300";
    const activeClasses = isActive ? "font-bold underline" : "";

    if (item.isExternal && item.externalUrl) {
      return (
        <a
          key={item.label}
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${commonClasses} ${activeClasses}`}
          onClick={() => setIsMenuOpen(false)}
          onMouseEnter={handleMenuHover}
          onMouseLeave={handleMenuLeave}
        >
          {item.label}
        </a>
      );
    }

    return (
      <span
        key={item.label}
        onClick={handleNavigation(item.path)}
        className={`${commonClasses} ${activeClasses}`}
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
      >
        {item.label}
        {item.subtext && <span className="text-sm">{item.subtext}</span>}
      </span>
    );
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
        {MENU_ITEMS.map(renderMenuItem)}
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-2xl transform md:hidden z-40"
      >
        <div ref={menuItemsRef} className="flex flex-col space-y-6 p-8 mt-16">
          {MENU_ITEMS.map(renderMenuItem)}
        </div>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
