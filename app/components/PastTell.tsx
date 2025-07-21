import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getPastEvents } from "@/app/lib/server";
import { Past } from "../lib/types";

const accentColors = [
  "#7B3737", // burgundy
  "#6B46C1", // purple
  "#3B4F1B", // olive
  "#2C7A7B", // teal
  "#B89B2B", // ochre
  "#E53E3E", // coral
];
const shapes = ["triangle", "circle", "square"];

const shapeSVG = (shape: string, color: string, ref: any) => {
  switch (shape) {
    case "triangle":
      return (
        <svg
          ref={ref}
          width="22"
          height="22"
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
          width="22"
          height="22"
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
          width="22"
          height="22"
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

const PastTell = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const [events, setEvents] = useState<Past[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getPastEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

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
  }, [events]);

  return (
    <section className="pasttell-section relative flex py-10 items-center justify-center min-h-screen ">
      {/* Large low-opacity background word */}
      <span className="pasttell-bgword pointer-events-none select-none absolute  text-[20vw] sm:text-[16vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black/5 font-black tracking-tight z-10">
        Timeline
      </span>
      <div className="w-full max-w-2xl px-4 z-20">
        <h2 className="pasttell-title text-3xl md:text-5xl font-bold text-neutral-900 mb-10 tracking-tight text-left">
          Life Events
        </h2>
        <div ref={listRef} className="flex flex-col gap-12 md:gap-16">
          {events.map((event, idx) => {
            const accent = accentColors[idx % accentColors.length];
            const shape = shapes[idx % shapes.length];
            return (
              <div
                key={event.title}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 pb-8 border-b border-neutral-200 group`}
              >
                {/* Accent bar */}
                <span
                  className={`hidden md:block absolute top-0 left-0 h-full w-1 rounded-full`}
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
                    <h2 className="pasttell-title text-2xl md:text-3xl font-bold text-neutral-900 lowercase tracking-tight">
                      {event.title}
                    </h2>
                    <span className="pasttell-date text-lg md:text-xl text-neutral-500 font-bold">
                      • {event.year}
                    </span>
                  </div>
                  <p className="text-neutral-700 mt-2 text-base md:text-lg max-w-xl">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PastTell;
