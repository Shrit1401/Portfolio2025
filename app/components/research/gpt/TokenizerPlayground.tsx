"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ALPHABET = " abcdefghijklmnopqrstuvwxyz0123456789.,!?'-/:@#$%&*()[]{};\n\t|<>=+~`^_";
const charToId = new Map<string, number>(
  ALPHABET.split("").map((c, i): [string, number] => [c, i])
);

export default function TokenizerPlayground({ className = "" }: { className?: string }) {
  const [text, setText] = useState("them: who is shrit");
  const [hovered, setHovered] = useState<number | null>(null);
  const chars = text.slice(0, 48).split("");

  function encode(c: string): number {
    return charToId.get(c.toLowerCase()) ?? ALPHABET.length;
  }

  return (
    <div className={`border border-neutral-200 rounded-md p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">
          Tokenizer Playground
        </span>
        <span className="text-xs font-mono text-neutral-400">
          vocab: 99 · len: {chars.length}
        </span>
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={48}
        placeholder="type anything…"
        className="w-full mb-5 border border-neutral-200 rounded px-3 py-2 text-sm font-mono bg-neutral-50 focus:outline-none focus:border-neutral-400"
      />
      <div className="flex flex-wrap gap-[6px]">
        {chars.map((c, i) => {
          const id = encode(c);
          const active = hovered === i;
          return (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-[3px]"
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              animate={{ y: active ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div
                className={`w-7 h-7 flex items-center justify-center rounded text-xs font-mono border transition-all duration-100 select-none ${
                  active
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-neutral-800 border-neutral-200"
                }`}
              >
                {c === " " ? "·" : c}
              </div>
              <div
                className={`text-[10px] font-mono leading-none transition-colors duration-100 ${
                  active ? "text-blue-700 font-bold" : "text-neutral-400"
                }`}
              >
                {id}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 text-xs font-mono text-neutral-400">
        hover a token to see its integer ID · spaces shown as · · real model uses 99-char vocab from sorted(set(corpus))
      </p>
    </div>
  );
}
