import React from "react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

interface NavCard {
  href: string;
  img: string;
  label: string;
}

// Example navigation data (replace with props or dynamic data as needed)
const backward: NavCard = {
  href: "/work",
  img: "/wayout/nerd.png",
  label: "← Work",
};
const forward: NavCard | null = null; // Example: no forward link, will show placeholder

const ResearchSense = () => {
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
    (path?: string) => (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!path || path === pathname) {
        e.preventDefault();
        return;
      }
      router.push(path, {
        onTransitionReady: triggerPageTransition,
      });
    };

  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backward Card */}
        <span
          onClick={handleNavigation(backward?.href)}
          className="group block rounded-lg overflow-hidden cursor-pointer relative aspect-[4/3] shadow-lg hover:brightness-125 transition-all duration-300"
          style={{ background: "#111" }}
        >
          <img
            src={backward.img}
            alt={backward.label}
            className="w-full h-full object-cover object-center group-hover:brightness-125 transition-all duration-500"
            draggable="false"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-5 left-6 z-10">
            <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-tight group-hover:tracking-wider transition-all duration-300">
              {backward.label}
            </span>
          </div>
        </span>

        {/* Forward Card or Placeholder */}
        {forward !== null ? (
          <span
            onClick={handleNavigation((forward as NavCard).href)}
            className="group block rounded-lg overflow-hidden cursor-pointer relative aspect-[4/3] shadow-lg hover:brightness-125 transition-all duration-300"
            style={{ background: "#111" }}
          >
            <img
              src={(forward as NavCard).img}
              alt={(forward as NavCard).label}
              className="w-full h-full object-cover object-center group-hover:brightness-125 transition-all duration-500"
              draggable="false"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 right-6 z-10">
              <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-tight group-hover:tracking-wider transition-all duration-300">
                {(forward as NavCard).label}
              </span>
            </div>
          </span>
        ) : (
          <span className=" rounded-lg overflow-hidden relative aspect-[4/3] shadow-lg  flex items-center justify-center opacity-60 border-2 border-dotted border-neutral-700">
            <span className="text-xl md:text-2xl font-semibold">
              No more in back{" "}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ResearchSense;
