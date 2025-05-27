import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

const accentColors = [
  "#7B3737", // burgundy
  "#6B46C1", // purple
  "#3B4F1B", // olive
  "#2C7A7B", // teal
  "#B89B2B", // ochre
  "#E53E3E", // coral
];

const Substack = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch("/api/feed");
        const xmlString = await response.text();

        if (xmlString) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, "text/xml");
          const items = xmlDoc.getElementsByTagName("item");

          const parsedItems: FeedItem[] = Array.from(items).map((item) => ({
            title: item.getElementsByTagName("title")[0]?.textContent || "",
            link: item.getElementsByTagName("link")[0]?.textContent || "",
            pubDate: item.getElementsByTagName("pubDate")[0]?.textContent || "",
          }));

          setFeedItems(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching Substack feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { y: 60, opacity: 0, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.18,
        }
      );
    }
  }, [feedItems]);

  if (loading) {
    return <div className="p-4">Loading feed...</div>;
  }

  const displayedItems = showAll ? feedItems : feedItems.slice(0, 3);

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-4xl px-4 z-20">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-10 tracking-tight text-left w-full">
          Latest Posts
        </h2>
        <div ref={listRef} className="flex flex-col gap-10 md:gap-14 w-full">
          {displayedItems.map((item, idx) => {
            const accent = accentColors[idx % accentColors.length];
            return (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  `group relative flex items-stretch rounded-xl transition-all duration-300 border border-neutral-200 hover:shadow-xl hover:bg-white/70 w-full overflow-hidden` +
                  (hoveredIdx === idx ? " ring-2 ring-neutral-300" : "")
                }
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ minHeight: 90 }}
              >
                {/* Accent bar */}
                <span
                  className="absolute left-0 top-0 h-full w-1 rounded-full"
                  style={{ background: accent, opacity: 0.22 }}
                />
                <div className="flex flex-col justify-center pl-6 pr-4 py-6 w-full">
                  <span className="flex flex-col md:flex-row md:items-center md:gap-4 w-full">
                    <span className="text-2xl md:text-3xl font-bold text-neutral-900 group-hover:opacity-70 transition-opacity duration-200 w-full">
                      {item.title}
                    </span>
                    <span className="text-base md:text-lg text-neutral-500 font-medium mt-2 md:mt-0 md:ml-auto whitespace-nowrap">
                      {new Date(item.pubDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        {feedItems.length > 3 && (
          <div className="flex justify-end mt-12 w-full">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-block px-6 py-2 rounded-full bg-black/5 text-neutral-700 font-semibold text-base tracking-wide border border-black/10 shadow-sm backdrop-blur-md hover:bg-sky-400 hover:text-white hover:border-sky-400 hover:shadow-lg transition-all duration-200"
            >
              {showAll ? "Show Less" : "More Posts"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Substack;
