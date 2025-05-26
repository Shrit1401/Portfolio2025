import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorkTell = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const cardPositions = [
    { top: "30%", left: "55%" },
    { top: "20%", left: "25%" },
    { top: "50%", left: "10%" },
    { top: "60%", left: "40%" },
    { top: "30%", left: "30%" },
    { top: "60%", left: "60%" },
    { top: "20%", left: "50%" },
    { top: "60%", left: "10%" },
    { top: "20%", left: "40%" },
    { top: "45%", left: "55%" },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize cards
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      gsap.set(card, {
        z: -50000,
        scale: 0,
      });
    });

    // Create scroll trigger animation for horizontal scroll
    const moveDist = window.innerWidth * 3;
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".sticky",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const vel = self.getVelocity();
        const normalizedVel = vel / Math.abs(vel) || 0;
        const maxOffset = 30;
        const curSpeed = Math.min(Math.abs(vel / 500), maxOffset);
        const isAtEdge = self.progress <= 0 || self.progress >= 1;

        // Move the entire titles container horizontally
        gsap.to(titlesContainerRef.current, {
          x: -moveDist * self.progress,
          duration: 0.1,
          ease: "none",
        });

        // Animate individual titles
        const titles = document.querySelectorAll(".title");
        titles.forEach((title) => {
          const title1 = title.querySelector(".title-1");
          const title2 = title.querySelector(".title-2");
          const title3 = title.querySelector(".title-3");

          if (isAtEdge) {
            if (title1 && title2) {
              gsap.to([title1, title2], {
                xPercent: -50,
                x: 0,
                duration: 0.5,
                ease: "power2.out",
                overwrite: true,
              });
            }
          } else {
            const baseoffset = normalizedVel * curSpeed;

            if (title1) {
              gsap.to(title1, {
                xPercent: -50,
                x: `${baseoffset * 4}px`,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });
            }

            if (title2) {
              gsap.to(title2, {
                xPercent: -50,
                x: `${baseoffset * 2}px`,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          }

          gsap.set(title3, {
            xPercent: -50,
            x: 0,
          });
        });

        // Animate cards based on scroll progress
        cards.forEach((card, index) => {
          const staggerOffset = index * 0.075;
          const scaledProgress = (self.progress - staggerOffset) * 3;
          const individualProgress = Math.max(0, Math.min(1, scaledProgress));
          const targetZ = index === cards.length - 1 ? 1500 : 2000;
          const newz = -50000 + (targetZ + 50000) * individualProgress;
          const scaleProgress = Math.min(1, individualProgress * 10);
          const scale = Math.max(0, Math.min(1, scaleProgress));

          gsap.to(card, {
            z: newz,
            scale: scale,
          });
        });
      },
    });

    // Cleanup function
    return () => {
      // Kill all GSAP animations
      gsap.killTweensOf("*");

      // Kill ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Clear all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="sticky">
      <div ref={titlesContainerRef} className="titles">
        <div className="title">
          <h1 className="title-1">Showcase Hub</h1>
          <h1 className="title-2">Showcase Hub</h1>
          <h1 className="title-3">Showcase Hub</h1>
        </div>
        <div className="title">
          <h1 className="title-1">Shrit Stuff</h1>
          <h1 className="title-2">Shrit Stuff</h1>
          <h1 className="title-3">Shrit Stuff</h1>
        </div>
        <div className="title">
          <h1 className="title-1">NICE BOI</h1>
          <h1 className="title-2">NICE BOI</h1>
          <h1 className="title-3">NICE BOI</h1>
        </div>
      </div>
      <div ref={imagesContainerRef} className="images">
        {cardPositions.map((pos, index) => (
          <div
            key={index}
            className={`card card-${index + 1}`}
            style={{
              top: pos.top,
              left: pos.left,
            }}
          >
            <img src={`/work/${index + 1}.png`} alt={`Card ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkTell;
