"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Newsletter from "./Newsletter";
import { FaGithub, FaHeart, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const Footer = () => {
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

  return (
    <footer className="relative w-full min-h-[75svh] text-white bg-[#111] color-white flex flex-col items-center justify-between py-12">
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center gap-12">
        <h1 className="text-[12vw] font-bold uppercase">I can talk</h1>

        <div className="flex flex-col items-center gap-8 w-full">
          <Newsletter className="w-full max-w-xl" />

          <div className="flex gap-8 items-center">
            <Link
              href="https://github.com/shrit1401"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#37517b] transition-colors duration-300"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://twitter.com/shrit1401"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#37517b] transition-colors duration-300"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://www.youtube.com/@shippingshrit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#37517b] transition-colors duration-300"
            >
              <FaYoutube />
            </Link>
          </div>

          <p className="text-center text-gray-300">
            Oh, if you wanna connect, send me a mail at{" "}
            <a
              href="mailto:shrit1401@gmail.com"
              className="text-white underline hover:text-gray-300 transition-colors duration-300"
            >
              shrit1401@gmail.com
            </a>{" "}
            or DM me on socials!
          </p>

          <nav className="flex gap-8 items-center">
            <span
              onClick={handleNavigation("/nerd")}
              className="hover:text-[#37517b] transition-colors duration-300"
            >
              Nerd
            </span>
            <span
              onClick={handleNavigation("/work")}
              className="hover:text-[#37517b] transition-colors duration-300"
            >
              Work
            </span>
            <span
              onClick={handleNavigation("/past")}
              className="hover:text-[#37517b] transition-colors duration-300"
            >
              Past
            </span>
          </nav>
        </div>

        <div className="flex justify-between gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} shrit1401</p>
          <p>
            All Rights Reserved <span className="text-xs">(I hope)</span>
          </p>
        </div>
      </div>

      <ExplosionContainer />
    </footer>
  );
};

export default Footer;

const ExplosionContainer = () => {
  const explosionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<Particle[]>([]);
  const [explosion, setExplosion] = useState(false);
  const isInView = useInView(explosionRef, { once: false });

  const config = {
    gravity: 0.1,
    friction: 0.995,
    imageSize: 200,
    horizontalForce: 10,
    verticalForce: 8,
    rotationSpeed: 5,
    resetDelay: 500,
  };

  const imgCounts = 15;
  const imgPaths = Array.from(
    { length: imgCounts },
    (_, i) => `/footer/img-${i + 1}.jpeg`
  );

  class Particle {
    element: HTMLDivElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;

    constructor(element: HTMLDivElement) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
    }

    update() {
      this.vx += config.gravity;
      this.vy *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.element) {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
    }
  }

  const createParticles = () => {
    if (!explosionRef.current) return;

    explosionRef.current.innerHTML = "";
    particleRef.current = [];

    imgPaths.forEach((path, index) => {
      if (!explosionRef.current) return;

      const particle = document.createElement("img");
      particle.src = path;
      particle.classList.add("explosion-container-img");
      particle.style.width = `${config.imageSize}px`;
      explosionRef.current.appendChild(particle);
    });

    const particleElement = explosionRef.current.querySelectorAll(
      ".explosion-container-img"
    );

    particleRef.current = Array.from(particleElement).map(
      (element) => new Particle(element as HTMLDivElement)
    );
  };

  const explode = () => {
    if (explosion) return; // Prevent multiple explosions at once
    setExplosion(true);
    createParticles();

    let animationId: number;
    let finished = false;

    const animate = () => {
      if (finished) return;
      particleRef.current.forEach((particle) => particle.update());

      if (explosionRef.current) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    setTimeout(() => {
      cancelAnimationFrame(animationId);
      finished = true;
      setExplosion(false);
      if (explosionRef.current) {
        explosionRef.current.innerHTML = "";
        particleRef.current = [];
      }
    }, 5000);
  };

  useEffect(() => {
    imgPaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });

    footerRef.current = document.querySelector("footer") as HTMLDivElement;
  }, []);

  // Trigger animation every time the component comes into view
  useEffect(() => {
    if (isInView && !explosion) {
      setTimeout(() => {
        explode();
      }, 1000);
    }
  }, [isInView, explosion]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="explosion-container absolute inset-0"
        ref={explosionRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <style jsx>{`
          .explosion-container-img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center;
            pointer-events: none;
            user-select: none;
          }
        `}</style>
      </div>
    </motion.div>
  );
};
