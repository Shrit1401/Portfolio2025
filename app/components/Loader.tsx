"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderImgsRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("Brewing pixels...");

  const funnyTexts = [
    "Brewing pixels...",
    "Summoning creativity spirits 👻",
    "Charging design batteries 🔋",
    "Almost there... promise! 🤞",
    "Final touches of brilliance ✨",
  ];

  useEffect(() => {
    // Set initial states immediately
    gsap.set(loaderRef.current, { opacity: 100 });
    gsap.set(imgRefs.current, {
      y: window.innerWidth <= 768 ? -500 : 500,
      opacity: 0,
    });
    gsap.set(loaderImgsRef.current, {
      x: window.innerWidth <= 768 ? 0 : 500,
      y: window.innerWidth <= 768 ? -500 : 0,
      opacity: 0,
    });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(progressRef.current, { scaleX: 0 });

    // Create initial entrance animation timeline
    const entranceTl = gsap.timeline();

    // Animate corner accents
    entranceTl.fromTo(
      ".absolute.top-8.left-8, .absolute.top-8.right-8, .absolute.bottom-8.left-8, .absolute.bottom-8.right-8",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );

    // Text animation with enhanced timing
    entranceTl.to(
      textRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Progress bar animation with enhanced timing
    entranceTl.to(
      progressRef.current,
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    // Cycling through funny texts with equal timing
    let textIndex = 0;
    const totalDuration = 1500; // 1.5 seconds total
    const timePerText = totalDuration / funnyTexts.length;

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % funnyTexts.length;
      setLoadingText(funnyTexts[textIndex]);

      // Text change animation
      gsap.to(textRef.current, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }, timePerText);

    const tl = gsap.timeline({ delay: 0.3 });

    // Check if mobile screen
    const isMobile = window.innerWidth <= 768;

    // Enhanced loader animation sequence
    tl.to(imgRefs.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.03,
    })
      .to(
        loaderImgsRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.6"
      )
      .to(
        imgRefs.current.filter((_, i) => i !== 3), // Skip the logo image
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.inOut",
        },
        "-=0.4"
      )
      .to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        [progressRef.current],
        {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.3"
      )
      .to(
        loaderRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            clearInterval(textInterval);
          },
        },
        "-=0.2"
      );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed w-screen h-screen bg-[#111] pointer-events-none z-[999] overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      {/* Minimal geometric patterns */}
      <div className="absolute inset-0">
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/10" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10" />
      </div>

      {/* Loading text and progress */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <div
          ref={textRef}
          className="text-white/60 text-lg font-light mb-6 min-h-[1.5rem]"
        >
          {loadingText}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20 origin-left"
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        ref={loaderImgsRef}
        className="w-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[50px] md:flex-row flex-col md:w-[150%] w-full"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div
          ref={(el) => {
            imgRefs.current[0] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/1.png"
            alt="Image 2"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
        <div
          ref={(el) => {
            imgRefs.current[1] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/2.png"
            alt="Image 3"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
        <div
          ref={(el) => {
            imgRefs.current[2] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/3.png"
            alt="Image 4"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
        <div
          ref={(el) => {
            imgRefs.current[3] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/logo.png"
            alt="Logo"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
        <div
          ref={(el) => {
            imgRefs.current[4] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/4.png"
            alt="Image 5"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
        <div
          ref={(el) => {
            imgRefs.current[5] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/5.png"
            alt="Image 6"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
        <div
          ref={(el) => {
            imgRefs.current[6] = el;
          }}
          className="relative flex-1 overflow-hidden"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <img
            src="./loader/6.png"
            alt="Image 7"
            className="object-cover w-full h-full scale-110 transition-transform duration-500 ease-in-out hover:scale-100"
          />
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
