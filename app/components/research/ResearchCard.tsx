"use client";
import Link from "next/link";
import { motion } from "framer-motion";

import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
interface ResearchCardProps {
  title: string;
  slug: string;
  preview: string;
  date: string;
  image: string;
}

export default function ResearchCard({
  title,
  slug,
  preview,
  date,
  image,
}: ResearchCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={(e) =>
        handleNavigation(`/nerd/${slug}`)(
          e as unknown as React.MouseEvent<HTMLAnchorElement>
        )
      }
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      className="cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative w-full aspect-[16/9] overflow-hidden"
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600"
      >
        {preview}

        <span className="text-xs md:text-sm mx-2 text-gray-500">•</span>

        {new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </motion.p>
    </motion.div>
  );
}
