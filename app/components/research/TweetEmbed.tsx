"use client";

import { useEffect, useRef } from "react";

interface TweetEmbedProps {
  tweetId: string;
  className?: string;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void;
      };
    };
  }
}

export default function TweetEmbed({ tweetId, className }: TweetEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => {
      if (window.twttr?.widgets && ref.current) {
        window.twttr.widgets.load(ref.current);
      }
    };

    if (window.twttr) {
      load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = load;
      document.body.appendChild(script);
    }
  }, [tweetId]);

  return (
    <div ref={ref} className={className}>
      <blockquote className="twitter-tweet" data-media-max-width="560">
        <a href={`https://twitter.com/i/web/status/${tweetId}`} />
      </blockquote>
    </div>
  );
}
