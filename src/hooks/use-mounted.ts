"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only after the client has hydrated. Avoids the
 * `setState`-inside-effect pattern (flagged by react-hooks/set-state-in-effect)
 * by deriving the flag as an external-store snapshot instead.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
