import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const accentColors = [
  "#7B3737", // burgundy
  "#6B46C1", // purple
  "#3B4F1B", // olive
  "#2C7A7B", // teal
  "#B89B2B", // ochre
  "#E53E3E", // coral
];
const shapes = ["triangle", "circle", "square"];

const projects = [
  {
    title: "no friend zone",
    year: 2024,
    description: "ai which tries to friendzone you",
    links: [
      { label: "website", url: "#" },
      { label: "github", url: "#" },
    ],
    image: "/work/1.png",
  },
  {
    title: "sayonara hokage",
    year: 2024,
    description: "ai which tells you your story",
    links: [
      { label: "scuffed demo", url: "#" },
      { label: "github", url: "#" },
    ],
    image: "/work/2.png",
  },
  {
    title: "hokage os",
    year: 2024,
    description: "a simple os which makes your chrome look sexy",
    links: [
      { label: "youtube", url: "#" },
      { label: "website", url: "#" },
      { label: "github", url: "#" },
    ],
    image: "/work/3.png",
  },
  {
    title: "clientbase",
    year: 2024,
    description: "manage your agency client easily",
    links: [
      { label: "website", url: "#" },
      { label: "youtube", url: "#" },
    ],
    image: "/work/4.png",
  },
  {
    title: "autisure",
    year: 2022,
    description: "world's first autism assured app",
    links: [{ label: "play store", url: "#" }],
    image: "/work/5.png",
  },
  {
    title: "glow emotions",
    year: 2022,
    description:
      "a peaceful rage game, i made using unity, it's now down because of being so old",
    links: [{ label: "itch.io", url: "#" }],
    image: "/work/6.png",
  },
];

const shapeSVG = (shape: string, color: string, ref: any) => {
  switch (shape) {
    case "triangle":
      return (
        <svg
          ref={ref}
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="inline-block mr-2 align-middle"
          style={{ opacity: 0 }}
        >
          <polygon points="16,4 28,28 4,28" fill={color} />
        </svg>
      );
    case "circle":
      return (
        <svg
          ref={ref}
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="inline-block mr-2 align-middle"
          style={{ opacity: 0 }}
        >
          <circle cx="16" cy="16" r="12" fill={color} />
        </svg>
      );
    case "square":
      return (
        <svg
          ref={ref}
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="inline-block mr-2 align-middle"
          style={{ opacity: 0 }}
        >
          <rect x="6" y="6" width="20" height="20" rx="4" fill={color} />
        </svg>
      );
    default:
      return null;
  }
};

const WorkInfo = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const bgImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { y: 60, opacity: 0, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.18,
        }
      );
    }
    svgRefs.current.forEach((svg, i) => {
      if (svg) {
        gsap.fromTo(
          svg,
          { scale: 0, opacity: 0, rotate: -30 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.1,
            ease: "back.out(1.7)",
            delay: 0.3 + i * 0.18,
          }
        );
        gsap.to(svg, {
          rotate: 360,
          repeat: -1,
          duration: 18 + i * 2,
          ease: "linear",
          transformOrigin: "50% 50%",
        });
      }
    });
  }, []);

  useEffect(() => {
    bgImgRefs.current.forEach((img, i) => {
      if (!img) return;
      if (hoveredIdx === i) {
        gsap.to(img, {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0.5vw) grayscale(0.2)",
          duration: 0.7,
          ease: "power3.out",
          zIndex: 1,
        });
      } else {
        gsap.to(img, {
          autoAlpha: 0,
          scale: 1.08,
          filter: "blur(2vw) grayscale(0.7)",
          duration: 0.7,
          ease: "power3.inOut",
          zIndex: 0,
        });
      }
    });
  }, [hoveredIdx]);

  return (
    <div className="workinfo-section flex py-10 items-center justify-center">
      {/* Background images */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        {projects.map((project, idx) => (
          <img
            key={project.title}
            ref={(el) => {
              bgImgRefs.current[idx] = el;
            }}
            src={project.image}
            alt={project.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0,
              zIndex: 0,
              pointerEvents: "none",
              filter: "blur(2vw) grayscale(0.7)",
              transition: "none",
            }}
          />
        ))}
      </div>
      {/* Large low-opacity background word */}
      <span className="workinfo-bgword pointer-events-none select-none absolute text-[20vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black/5 font-black tracking-tight z-10">
        Flex
      </span>
      <div className="w-full max-w-3xl px-4 z-20">
        <h2 className="workinfo-title text-3xl md:text-5xl font-bold text-neutral-900 mb-10 tracking-tight text-left">
          Recent Projects
        </h2>
        <div ref={listRef} className="flex flex-col gap-16 md:gap-20">
          {projects.map((project, idx) => {
            const accent = accentColors[idx % accentColors.length];
            const shape = shapes[idx % shapes.length];
            return (
              <div
                key={project.title}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pb-10 border-b border-neutral-300 group ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Accent bar */}
                <span
                  className={`hidden md:block absolute top-0 ${
                    idx % 2 === 1 ? "right-0" : "left-0"
                  } h-full w-1 rounded-full`}
                  style={{ background: accent, opacity: 0.18 }}
                />
                {/* SVG Accent */}
                <span className="mt-1">
                  {shapeSVG(
                    shape,
                    accent,
                    (el: SVGSVGElement) => (svgRefs.current[idx] = el)
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="workinfo-title text-2xl md:text-4xl font-bold text-neutral-900 lowercase tracking-tight">
                      {project.title}
                    </h2>
                    <span className="workinfo-year text-xl md:text-2xl text-neutral-500 font-bold">
                      · {project.year}
                    </span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-base md:text-lg max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full bg-neutral-100 text-sky-600 hover:bg-sky-400 hover:text-white font-medium text-base md:text-lg transition-all duration-200 shadow-sm border border-neutral-300 hover:border-sky-400"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Made by badge */}
        <div className="flex justify-end mt-12">
          <a
            href="https://github.com/Shrit1401?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded-full bg-black/5 text-neutral-700 font-semibold text-base tracking-wide border border-black/10 shadow-sm backdrop-blur-md"
          >
            More Projects
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkInfo;
