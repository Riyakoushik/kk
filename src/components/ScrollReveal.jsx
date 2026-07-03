import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

// ponytail: registerPlugin done in App.jsx

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  // Recursively process children to wrap words in spans while preserving links/formatting
  const splitText = useMemo(() => {
    let wordIndex = 0;
    let elementIndex = 0;

    const processNode = (node) => {
      if (typeof node === 'string' || typeof node === 'number') {
        return String(node).split(/(\s+)/).map((word) => {
          if (word.match(/^\s+$/)) return word;
          wordIndex++;
          return (
            <span className="word" key={`word-${wordIndex}`}>
              {word}
            </span>
          );
        });
      }
      if (React.isValidElement(node)) {
        elementIndex++;
        const childrenProp = node.props.children;
        const newChildren = Array.isArray(childrenProp)
          ? childrenProp.map(processNode)
          : processNode(childrenProp);
        
        return React.cloneElement(
          node,
          { key: `el-${elementIndex}-${wordIndex}` },
          newChildren
        );
      }
      return node;
    };

    const flatten = (val) => {
      if (Array.isArray(val)) {
        return val.reduce((acc, item) => acc.concat(flatten(item)), []);
      }
      return [val];
    };

    const initialResult = Array.isArray(children)
      ? children.map(processNode)
      : [processNode(children)];

    const flatResult = flatten(initialResult);

    return flatResult.map((node, index) => {
      if (React.isValidElement(node)) {
        return React.cloneElement(node, { key: node.key || `flat-el-${index}` });
      }
      return node;
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const triggers = [];

    // 1. Container rotation
    const rotAnim = gsap.fromTo(
      el,
      { transformOrigin: '50% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );
    if (rotAnim.scrollTrigger) triggers.push(rotAnim.scrollTrigger);

    // 2. Combined word animation (opacity + blur)
    const wordElements = el.querySelectorAll('.word');
    const targetProps = {
      opacity: baseOpacity,
      ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
      willChange: 'opacity, filter'
    };

    const destProps = {
      ease: 'none',
      opacity: 1,
      ...(enableBlur ? { filter: 'blur(0px)' } : {}),
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom-=20%',
        end: wordAnimationEnd,
        scrub: true
      }
    };

    const wordAnim = gsap.fromTo(wordElements, targetProps, destProps);
    if (wordAnim.scrollTrigger) triggers.push(wordAnim.scrollTrigger);

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
