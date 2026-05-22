"use client";

import Script from "next/script";
import { useRef } from "react";

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

  return (
    <div ref={ref} className={className}>
      <blockquote className="twitter-tweet" data-media-max-width="560">
        <p lang="en" dir="ltr">
          I made a GPT myself.
          <br />
          no cloud api calls, no fancy LLM&#39;s
          <br />
          everything literally coded &amp; trained on my laptop
        </p>
        &mdash; Shrit (@Shrit1401){" "}
        <a href={`https://twitter.com/Shrit1401/status/${tweetId}?ref_src=twsrc%5Etfw`}>
          May 21, 2026
        </a>
      </blockquote>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.twttr?.widgets && ref.current) {
            window.twttr.widgets.load(ref.current);
          }
        }}
      />
    </div>
  );
}
