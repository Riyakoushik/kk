"use client";
import { LayoutGroup } from "framer-motion";
import { useId } from "react";

export default function LayoutIsland({ children }) {
  const id = useId();
  return (
    <LayoutGroup id={id} inherit={false}>
      {children}
    </LayoutGroup>
  );
}
