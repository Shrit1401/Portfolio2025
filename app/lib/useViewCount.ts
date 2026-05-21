"use client";

import { useEffect, useState } from "react";

export function useViewCount(slug: string): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = `viewed:${slug}`;
    const alreadyCounted = sessionStorage.getItem(sessionKey);

    if (alreadyCounted) {
      fetch(`/api/views/${slug}`)
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
    } else {
      sessionStorage.setItem(sessionKey, "1");
      fetch(`/api/views/${slug}`, { method: "POST" })
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
    }
  }, [slug]);

  return count;
}
