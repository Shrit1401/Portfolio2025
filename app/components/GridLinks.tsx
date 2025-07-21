"use client";
import React from "react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/work",
    img: "/wayout/nerd.png",
    label: "\u2190 Work", // ← Work
    align: "left",
  },
  {
    href: "/past",
    img: "/wayout/past.png",
    label: "Past \u2192", // Past →
    align: "right",
  },
  {
    href: "https://x.com/Shrit1401",
    img: "/wayout/yt.png",
    label: "\u2190 Twitter", // ← YT
    align: "left",
    external: true,
  },
  {
    href: "/thoughts",
    img: "/wayout/work.png",
    label: "Thoughts \u2192", // Nerd →
    align: "right",
  },
];

const GridLinks = () => {
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
      if (path.includes("youtube.com")) {
        window.open(path, "_blank");
      } else {
        router.push(path, {
          onTransitionReady: triggerPageTransition,
        });
      }
    };
  return (
    <div className="min-h-screen w-full">
      <div className="w-full h-full p-2 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-2 md:gap-4">
          {links.map((link, i) => (
            <span
              key={i}
              onClick={handleNavigation(link.href)}
              className="group block rounded-lg overflow-hidden cursor-pointer relative  aspect-[4/3] shadow-lg
              hover:brightness-125 transition-all duration-300"
              style={{ background: "#111" }}
            >
              <img
                src={link.img}
                alt={link.label.replace(/[^a-zA-Z0-9 ]/g, "")}
                className="w-full h-full
                group-hover:brightness-125
                object-cover object-center transition-all duration-500"
                draggable="false"
              />
              {/* Black gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                aria-hidden="true"
              />
              {/* Text */}
              <div
                className={`absolute bottom-5 ${
                  link.align === "left" ? "left-6" : "right-6"
                } z-10`}
              >
                <span
                  className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-tight group-hover:tracking-wider transition-all duration-300"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              </div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridLinks;
