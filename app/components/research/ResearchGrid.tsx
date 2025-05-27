import ResearchCard from "./ResearchCard";
import { motion } from "framer-motion";

interface Research {
  title: string;
  slug: string;
  preview: string;
  date: string;
  image: string;
}

interface ResearchGridProps {
  research: Research[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
          key={item.slug}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <ResearchCard
            title={item.title}
            slug={item.slug}
            preview={item.preview}
            date={item.date}
            image={item.image}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
