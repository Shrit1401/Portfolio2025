"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  // Skip loader in development
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderImgsRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
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
    gsap.set(imgRefs.current, { y: 500 });
    gsap.set(loaderImgsRef.current, { x: 500 });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(progressRef.current, { scaleX: 0 });

    // Show the loader now that initial states are set
    setIsReady(true);

    // Text animation
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    });

    // Progress bar animation
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 5,
      ease: "power2.inOut",
      delay: 1,
    });

    // Cycling through funny texts with equal timing
    let textIndex = 0;
    const totalDuration = 5000; // 5 seconds total (matching progress bar)
    const timePerText = totalDuration / funnyTexts.length; // ~1000ms per text

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % funnyTexts.length;
      setLoadingText(funnyTexts[textIndex]);

      // Text change animation
      gsap.to(textRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }, timePerText);

    const tl = gsap.timeline({ delay: 1 });

    // Enhanced loader animation sequence
    tl.to(imgRefs.current, {
      y: 0,
      duration: 2,
      ease: "power3.inOut",
      stagger: 0.08,
    })
      .to(
        loaderImgsRef.current,
        {
          x: 0,
          duration: 3.5,
          ease: "power3.inOut",
        },
        "-=2.2"
      )
      .to(
        imgRefs.current.filter((_, i) => i !== 3), // Skip the logo image
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          stagger: 0.13,
          ease: "power3.inOut",
        },
        "-=1.2"
      )
      .to(
        loaderRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => {
            clearInterval(textInterval);
          },
        },
        "-=0.5"
      );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed w-screen h-screen bg-[#121212] pointer-events-none z-50 overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        visibility: isReady ? "visible" : "hidden",
      }}
    >
      {/* Minimal geometric patterns */}
      <div className="absolute inset-0">
        {/* Subtle dots pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

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

        {/* Small loading indicator */}
        <div className="flex justify-center mt-4 space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white/30 rounded-full"
              style={{
                animation: `pulse 1.5s ease-in-out ${
                  i * 0.2
                }s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content - keeping original animation intact */}
      <div
        ref={loaderImgsRef}
        className="w-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[50px]"
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
            src="https://images.unsplash.com/photo-1556139954-ec19cce61d61?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1556139954-ec19cce61d61?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1556139954-ec19cce61d61?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1651289082485-6c06ea213736?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1556139954-ec19cce61d61?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1556139954-ec19cce61d61?q=80&small&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            src="https://images.unsplash.com/photo-1556139954-ec19cce61d61?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
