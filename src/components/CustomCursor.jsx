import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on devices with hover capabilities (desktops)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off-screen and center the cursor element
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (target && (target.closest('a') || target.closest('button') || target.closest('[role="button"]') || target.closest('input[type="submit"]'))) {
        gsap.to(cursor, { scale: 2.5, backgroundColor: 'rgba(255, 255, 255, 0.8)', duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, backgroundColor: '#ffffff', duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    />
  );
}
