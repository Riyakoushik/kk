"use client";
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  base: 0,
  sm: 390,
  md: 810,
  lg: 1200,
  xl: 1440,
  "2xl": 1920,
};

function pickVariant(width, variants) {
  const order = ["2xl", "xl", "lg", "md", "sm", "base"];
  for (const bp of order) {
    if (width >= BREAKPOINTS[bp] && variants[bp]) {
      return variants[bp];
    }
  }
  return variants.base;
}

export default function ResponsiveWrapper({
  Component,
  variants,
  ...rest
}) {
  const [variant, setVariant] = useState(() => {
    if (typeof window === "undefined") return variants.lg ?? variants.base;
    return pickVariant(window.innerWidth, variants);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setVariant(pickVariant(window.innerWidth, variants));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [variants]);

  return <Component {...rest} variant={variant} />;
}
