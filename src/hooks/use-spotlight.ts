"use client";

import { useCallback, useRef } from "react";

/**
 * Tracks pointer position within an element via direct style mutation
 * (no React state/re-render per move) and exposes it as `--spotlight-x`/
 * `--spotlight-y` CSS custom properties for a radial-gradient hover glow.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}
