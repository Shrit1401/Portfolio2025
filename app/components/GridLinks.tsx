import React from "react";

const links = [
  {
    href: "/work",
    img: "/wayout/work.png",
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
    href: "https://youtube.com/@shritshrivastava",
    img: "/wayout/yt.png",
    label: "\u2190 YT", // ← YT
    align: "left",
    external: true,
  },
  {
    href: "/nerd",
    img: "/wayout/nerd.png",
    label: "Nerd \u2192", // Nerd →
    align: "right",
  },
];

const GridLinks = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full h-full p-2 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-2 md:gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group block rounded-lg overflow-hidden relative aspect-[4/3] shadow-lg hover:scale-[1.03] transition-transform duration-300"
              style={{ background: "#111" }}
            >
              <img
                src={link.img}
                alt={link.label.replace(/[^a-zA-Z0-9 ]/g, "")}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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
                <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-tight">
                  {link.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridLinks;
