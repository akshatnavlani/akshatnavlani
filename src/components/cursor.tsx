"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const emptySubscribe = () => () => {};

function getEnabledSnapshot() {
  return (
    !window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useCursorEnabled() {
  return useSyncExternalStore(emptySubscribe, getEnabledSnapshot, () => false);
}

export function Cursor() {
  const enabled = useCursorEnabled();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.5 });
  const springY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.5 });

  React.useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
}
