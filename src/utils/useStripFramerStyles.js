"use client";
import { useEffect } from "react";

/**
 * Watch `selector`'s `style` attribute and clear each named property
 * whenever the runtime sets it. Cleared properties are set to "none"
 * (for filter/mask family) or "" (for color/background family) — the
 * sensible neutral value for each.
 *
 * Tears down the observer on unmount.
 */
export default function useStripFramerStyles(selector, properties) {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const strip = () => {
      for (const prop of properties) {
        // For filter/mask family: explicit "none" defeats runtime values.
        // For background family: "" lets CSS take over.
        const neutral = /filter|mask|overflow|will/i.test(prop) ? "none" : "";
        el.style[prop] = neutral;
      }
    };
    strip();
    const mo = new MutationObserver(strip);
    mo.observe(el, { attributes: true, attributeFilter: ["style"] });
    return () => mo.disconnect();
  }, [selector, properties.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
}
