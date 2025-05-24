import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <section
      id="about-me"
      className="min-h-screen flex items-center justify-center px-6 md:px-16"
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
        {/* Left: Only the descriptive text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          {paragraphs.map((text, idx) => (
            <motion.p
              key={idx}
              className="text-black font-bold text-xl md:text-2xl leading-relaxed max-w-2xl mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: 0.9,
                delay: 0.3 + idx * 0.18,
                ease: "easeOut",
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </div>
        {/* Right: Statue Image Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-80 h-96 md:w-[28rem] md:h-[32rem]">
            <Image
              src="/statue-placeholder.png"
              alt="Statue"
              fill
              className="object-contain opacity-80"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
