import React, { useState, useEffect, useRef, type FC } from "react";
import gsap from "gsap";
import Newsletter from "./Newsletter";

// Constants
const COLORS = {
  burgundy: "#7B3737",
  olive: "#3B4F1B",
  ochre: "#B89B2B",
  purple: "#6B46C1",
  teal: "#2C7A7B",
  coral: "#E53E3E",
} as const;

const ANIMATION_DELAYS = {
  initial: 200,
  shapes: 1.5,
  text: 1.8,
  globe: 1.5,
  bottom: 1.8,
  dontClick: 2,
  scrollDown: 2.1,
  newsletter: 2.2,
} as const;

const TimeDisplay: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return <div className="text-sm text-gray-600">--:--:--</div>;
  }

  return (
    <div className="text-sm text-gray-600">{time.toLocaleTimeString()}</div>
  );
};

const HeroText: FC = () => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shapesRef = useRef<(SVGSVGElement | null)[]>([]);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);
  const globeRef = useRef<SVGSVGElement>(null);
  const bottomElementsRef = useRef<HTMLDivElement>(null);
  const dontClickRef = useRef<HTMLAnchorElement>(null);
  const scrollDownRef = useRef<HTMLAnchorElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateShapes = () => {
      shapesRef.current.forEach((shape, index) => {
        if (!shape) return;

        // Initial animation
        gsap.fromTo(
          shape,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: ANIMATION_DELAYS.shapes + 0.2 + index * 0.1,
          }
        );

        // Continuous rotation
        gsap.to(shape, {
          rotation: 360,
          duration: 10 + index * 2,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
          delay: ANIMATION_DELAYS.shapes + index * 0.5,
        });

        // Color transition
        const colors = [
          [COLORS.burgundy, COLORS.purple],
          [COLORS.olive, COLORS.teal],
          [COLORS.ochre, COLORS.coral],
        ][index];

        gsap.to(shape, {
          fill: colors[1],
          stroke: colors[1],
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: ANIMATION_DELAYS.shapes + index * 0.5,
        });
      });
    };

    const animateText = () => {
      textRef.current.forEach((text, index) => {
        if (!text) return;
        gsap.fromTo(
          text,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: ANIMATION_DELAYS.text + index * 0.1,
          }
        );
      });
    };

    const animateGlobe = () => {
      if (!globeRef.current) return;
      gsap.to(globeRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
        delay: ANIMATION_DELAYS.globe,
      });
    };

    const animateBottomElements = () => {
      const elements = [
        { ref: bottomElementsRef, delay: ANIMATION_DELAYS.bottom },
        { ref: dontClickRef, delay: ANIMATION_DELAYS.dontClick },
        { ref: scrollDownRef, delay: ANIMATION_DELAYS.scrollDown },
        { ref: newsletterRef, delay: ANIMATION_DELAYS.newsletter },
      ];

      elements.forEach(({ ref, delay }) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay,
          }
        );
      });
    };

    const timer = setTimeout(() => {
      setAnimate(true);
      setIsVisible(true);
      animateShapes();
      animateText();
      animateGlobe();
      animateBottomElements();
    }, ANIMATION_DELAYS.initial);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=UnifrakturCook:wght@700&display=swap');
          
          .hero-text {
            font-family: 'Playfair Display', Georgia, serif;
          }
          
          .blackletter {
            font-family: 'UnifrakturCook', 'IM Fell English SC', serif;
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <section
        className="w-full flex flex-col items-center justify-center flex-1 px-4 relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div className="hero-text text-center text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-snug font-normal">
          <span className="inline-flex items-center">
            <svg
              ref={(el) => {
                shapesRef.current[0] = el;
              }}
              width="48"
              height="48"
              className="inline-block mr-3 -mb-2"
              viewBox="0 0 32 32"
              style={{ opacity: 0 }}
            >
              <path
                d="M16 4L28 24H4L16 4Z"
                fill={COLORS.burgundy}
                rx="2"
                stroke={COLORS.burgundy}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span
              ref={(el) => {
                textRef.current[0] = el;
              }}
              style={{ opacity: 0 }}
            >
              I <span className="italic ml-2">am</span>
            </span>
          </span>
          <br />
          <span className="inline-flex items-center">
            <span
              ref={(el) => {
                textRef.current[1] = el;
              }}
              style={{ opacity: 0 }}
            >
              <span className="blackletter text-6xl mr-2">B</span>uilding
            </span>
            <svg
              ref={(el) => {
                shapesRef.current[1] = el;
              }}
              width="48"
              height="48"
              className="inline-block ml-3 -mb-2"
              viewBox="0 0 32 32"
              style={{ opacity: 0 }}
            >
              <rect
                x="4"
                y="4"
                width="24"
                height="24"
                rx="6"
                fill={COLORS.olive}
              />
            </svg>
          </span>
          <br />
          <span className="inline-flex items-center">
            <span
              ref={(el) => {
                textRef.current[2] = el;
              }}
              style={{ opacity: 0 }}
            >
              <span className="italic underline decoration-gray-500 decoration-2 underline-offset-4">
                cool
              </span>
            </span>
            <svg
              ref={(el) => {
                shapesRef.current[2] = el;
              }}
              width="48"
              height="48"
              className="inline-block mx-3 -mb-2"
              viewBox="0 0 32 32"
              style={{ opacity: 0 }}
            >
              <circle cx="16" cy="16" r="16" fill={COLORS.ochre} />
            </svg>
            <span
              ref={(el) => {
                textRef.current[3] = el;
              }}
              style={{ opacity: 0 }}
            >
              stuff
            </span>
          </span>
        </div>
        <div ref={newsletterRef} style={{ opacity: 0 }}>
          <Newsletter className="mt-8" />
        </div>
        <div
          ref={bottomElementsRef}
          className="absolute bottom-4 md:bottom-8 left-4 md:left-8 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 w-[calc(100%-2rem)] md:w-auto"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <svg
                ref={globeRef}
                className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs md:text-sm text-black/80">
                Shrit Shrivastava
              </span>
              <span className="text-xs md:text-sm text-gray-500">•</span>
              <span className="text-xs md:text-sm text-black/80">India</span>
            </div>
            <TimeDisplay />
          </div>
        </div>
        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex flex-col items-end gap-2 md:gap-3">
          <span
            ref={dontClickRef}
            className="text-xs md:text-sm text-black/80 underline-offset-4 transition-all duration-300"
            style={{ opacity: 0 }}
          >
            Made To Amaze
          </span>
          <a
            ref={scrollDownRef}
            href="/work"
            className="md:hidden"
            aria-label="Scroll down"
            style={{ opacity: 0 }}
          >
            <svg
              className="w-6 h-6 text-gray-700 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
        <a
          ref={scrollDownRef}
          href="/work"
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          aria-label="Scroll down"
          style={{ opacity: 0 }}
        >
          <svg
            className="w-8 h-8 text-gray-700 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </section>
    </>
  );
};

export default HeroText;
