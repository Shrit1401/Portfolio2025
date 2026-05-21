"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ImageLightbox from "./ImageLightbox";

const LightboxContext = createContext<(src: string) => void>(() => {});

export function useLightbox() {
  return useContext(LightboxContext);
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const close = useCallback(() => setSrc(null), []);

  return (
    <LightboxContext.Provider value={setSrc}>
      {children}
      <ImageLightbox src={src} onClose={close} />
    </LightboxContext.Provider>
  );
}
