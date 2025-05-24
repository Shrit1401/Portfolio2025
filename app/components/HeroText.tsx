import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const burgundy = "#7B3737";
const olive = "#3B4F1B";
const ochre = "#B89B2B";

const HeroText = () => {
  const [animate, setAnimate] = useState(false);
  const shapesRef = useRef<(SVGSVGElement | null)[]>([]);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);
  const dev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // Start animation after 5 seconds
    const timer = setTimeout(() => {
      setAnimate(true);

      // Animate shapes
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          gsap.fromTo(
            shape,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: dev ? 0 : 5 + 0.5 + index * 0.2,
            }
          );
        }
      });

      // Animate text
      textRef.current.forEach((text, index) => {
        if (text) {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power2.out",
              delay: dev ? 0 : 5 + 0.5 + index * 0.18,
            }
          );
        }
      });
    }, 500);

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
        `}
      </style>

      <section className="w-full flex flex-col items-center justify-center flex-1 px-4 relative">
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
              <circle cx="16" cy="16" r="16" fill={burgundy} />
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
              <circle cx="16" cy="16" r="16" fill={olive} />
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
              <circle cx="16" cy="16" r="16" fill={ochre} />
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
        <a
          href="#work"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-label="Scroll down"
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
