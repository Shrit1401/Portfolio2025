import { Research } from "@/app/lib/types";
import ResearchCard from "./ResearchCard";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ResearchGridProps {
  research: Research[];
}

export default function ResearchGrid({ research }: ResearchGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto"
    >
      {research.map((item) => (
        <motion.div
          key={item.slug.current}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <ResearchCard
            title={item.title}
            slug={item.slug.current}
            preview={item.description}
            date={item.date}
            image={urlFor(item.image).url()}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
