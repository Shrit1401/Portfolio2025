import { motion } from "framer-motion";
import StatueModel from "./StatueModel";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Newsletter from "./Newsletter";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "i'm just a guy that loves creating things.",
  'since i was 7, computers have been my constant passion. it all began with playing games on <a href="https://www.friv.com/" target="_blank" rel="noopener noreferrer" class="text-sky-500 underline">friv</a>, especially fire boy and water girl. i was instantly hooked.',
  'by the time i hit 12, things got serious. i discovered how to create basic websites, and that was it — i was addicted! from there, i started building websites, apps, <a href="https://imgur.com/CveUWRS" target="_blank" rel="noopener noreferrer" class="text-sky-500 underline">attending competitions</a>, exploring anything i could create with a computer.',
  'now at 18, my obsession with coding and creating hasn\'t slowed down one bit. but here\'s the twist—building <a href="/work" class="text-sky-500 underline">crazy tools</a> is fun, but i quickly realized it\'s not enough to keep the wheels turning. you need to bring in some cash.',
  'earlier this year, i joined an overseas agency. it was a game-changing experience, where i generated over ₹1 lakh in revenue for the agency. <a href="/past" class="text-sky-500 underline">although i eventually moved on</a>, my passion for creating hasn\'t wavered one bit.',
  "i even started a youtube channel to showcase all my wild ideas and inventions.",
  "i stay connected through my weekly newsletter, where i share everything—from what i'm working on, to life lessons and the ups and downs of my journey. want to be a part of it? drop your email below, and i'll send it straight to your inbox!",
];

const AboutMe = () => {
  const statueContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statueContainerRef.current) {
      const scrollTrigger = gsap.to(statueContainerRef.current, {
        y: () => {
          const scrollProgress =
            ScrollTrigger.getById("about-section")?.progress || 0;
          return scrollProgress * window.innerHeight;
        },
        ease: "power2.inOut",
        scrollTrigger: {
          id: "about-section",
          trigger: "#about-me",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          pin: true,
          pinSpacing: true,
        },
      });

      return () => {
        scrollTrigger.kill();
        ScrollTrigger.getById("about-section")?.kill();
      };
    }
  }, []);

  return (
    <section id="about-me" className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Text content */}
          <div className="max-w-2xl">
            {paragraphs.map((text, idx) => (
              <motion.p
                key={idx}
                className="text-black font-bold text-xl md:text-2xl leading-relaxed mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Newsletter className="mt-8" />
            </motion.div>
          </div>

          {/* Right: 3D Model */}
          <div
            className="h-screen sticky top-0 overflow-hidden"
            ref={statueContainerRef}
          >
            <StatueModel />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-8 left-0 right-0 text-center px-4"
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Zeno of Citium
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-gray-600 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                stoics are cool ig
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
