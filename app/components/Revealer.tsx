"use client";

import { useRevealer } from "../hooks/useRevealer";

export function Revealer() {
  useRevealer();
  return <div className="revealer"></div>;
}
