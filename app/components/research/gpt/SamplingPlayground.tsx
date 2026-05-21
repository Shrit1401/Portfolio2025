"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = ["e","t","a","o","i","n","s","h","r","d","l","c","u","m","w","f","g","y","p","b","v","k","j","x","q","z",".",","," ","!"];
const BASE_LOGITS = [
  5.2, 4.8, 4.1, 3.9, 3.5, 3.2, 3.0, 2.8, 2.4, 2.0,
  1.5, 1.2, 0.9, 0.6, 0.3, 0.0, -0.2, -0.5, -0.7, -1.0,
  -1.2, -1.5, -1.8, -2.0, -2.3, -2.5, -2.0, -1.8, -0.5, -3.0,
];

function softmaxWithTemp(logits: number[], temp: number): number[] {
  const scaled = logits.map((l) => l / Math.max(temp, 1e-8));
  const maxVal = Math.max(...scaled);
  const exps = scaled.map((s) => Math.exp(s - maxVal));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function applyTopK(probs: number[], k: number): number[] {
  const threshold = [...probs].sort((a, b) => b - a)[k - 1] ?? 0;
  const filtered = probs.map((p) => (p >= threshold ? p : 0));
  const sum = filtered.reduce((a, b) => a + b, 0);
  return sum > 0 ? filtered.map((p) => p / sum) : filtered;
}

function entropy(probs: number[]): number {
  return -probs.filter((p) => p > 1e-10).reduce((s, p) => s + p * Math.log2(p), 0);
}

function sampleFrom(probs: number[]): number {
  let r = Math.random();
  for (let i = 0; i < probs.length; i++) {
    r -= probs[i];
    if (r <= 0) return i;
  }
  return probs.length - 1;
}

export default function SamplingPlayground({ className = "" }: { className?: string }) {
  const [temperature, setTemperature] = useState(0.5);
  const [topK, setTopK] = useState(25);
  const counterRef = useRef(0);
  const [sampled, setSampled] = useState<{ char: string; id: number }[]>([]);

  const probs = useMemo(() => {
    const raw = softmaxWithTemp(BASE_LOGITS, temperature);
    return applyTopK(raw, topK);
  }, [temperature, topK]);

  const maxProb = Math.max(...probs);
  const H = entropy(probs);

  function doSample() {
    const idx = sampleFrom(probs);
    const id = counterRef.current++;
    setSampled((prev) => [...prev.slice(-23), { char: CHARS[idx], id }]);
  }

  return (
    <div className={`border border-neutral-200 rounded-md p-5 ${className}`}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">
          Sampling Playground
        </span>
        <div className="flex gap-4 text-[10px] font-mono text-neutral-400">
          <span>T={temperature.toFixed(2)}</span>
          <span>k={topK}</span>
          <span>H={H.toFixed(2)} bits</span>
          <span className="text-blue-600">real defaults: T=0.5, k=25</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-xs font-mono text-neutral-500 mb-1.5">
            temperature: {temperature.toFixed(2)}
          </label>
          <input
            type="range"
            min={0.1}
            max={2.0}
            step={0.05}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-0.5">
            <span>0.1 (focused)</span>
            <span>2.0 (creative)</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono text-neutral-500 mb-1.5">
            top-k: {topK}
          </label>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={topK}
            onChange={(e) => setTopK(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-0.5">
            <span>k=1 (greedy)</span>
            <span>k=40 (all)</span>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-[3px] h-24 mb-1">
        {probs.map((p, i) => {
          const inTopK = p > 0;
          const barH = maxProb > 0 ? Math.max((p / maxProb) * 88, inTopK ? 2 : 1) : 1;
          return (
            <motion.div
              key={i}
              title={`${CHARS[i]}: ${(p * 100).toFixed(1)}%`}
              className={`flex-1 rounded-t-sm transition-colors duration-150 ${
                inTopK ? "bg-blue-700" : "bg-neutral-200"
              }`}
              animate={{ height: barH }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          );
        })}
      </div>
      <div className="flex items-end gap-[3px] mb-4">
        {CHARS.map((c, i) => (
          <div key={i} className="flex-1 text-center text-[8px] font-mono text-neutral-400">
            {c}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={doSample}
          className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-300 hover:border-blue-400 hover:text-blue-700 transition-colors"
        >
          sample →
        </button>
        {sampled.length > 0 && (
          <div className="flex-1 font-mono text-sm bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 min-h-[34px] tracking-wider">
            {sampled.map(({ char, id }, i) => (
              <span
                key={id}
                className={`transition-colors duration-300 ${
                  i === sampled.length - 1 ? "text-blue-700" : "text-neutral-700"
                }`}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="mt-3 text-xs font-mono text-neutral-400">
        drag sliders to reshape the distribution · blue bars = within top-k · press sample to draw a character · real sample_next: logits/max(T, 1e-8) → top-k mask → softmax → multinomial
      </p>
    </div>
  );
}
