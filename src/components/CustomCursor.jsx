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

    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    let isHovering = false;
    const onMouseOver = (e) => {
      const target = e.target;
      if (target && target.closest('[data-cursor-ignore], .swap-follower')) {
        if (isHovering) {
          isHovering = false;
          gsap.to(cursor, {
            scale: 1,
            backgroundColor: '#ffffff',
            duration: 0.15,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
        return;
      }

      const shouldHover = Boolean(
        target &&
        (target.closest('a') ||
         target.closest('button') ||
         target.closest('[role="button"]') ||
         target.closest('input[type="submit"]'))
      );

      if (shouldHover !== isHovering) {
        isHovering = shouldHover;
        gsap.to(cursor, {
          scale: shouldHover ? 2.5 : 1,
          backgroundColor: shouldHover ? 'rgba(255, 255, 255, 0.8)' : '#ffffff',
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.15, overwrite: 'auto' });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    />
  );
}
