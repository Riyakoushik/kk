import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ponytail: registerPlugin done once in App.jsx

const ScrollAnimationSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ponytail: collect owned triggers so teardown doesn't nuke other components' triggers
    const ownedTriggers = ScrollTrigger.getAll().filter(
      t => containerRef.current?.contains(t.trigger)
    );

    // 1. Text reveal animations using clip-path
    const textElements = containerRef.current.querySelectorAll('.animate-text');
    textElements.forEach(textElement => {
      textElement.setAttribute('data-text', textElement.textContent.trim());

      ownedTriggers.push(ScrollTrigger.create({
        trigger: textElement,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: self => {
          const clipValue = Math.max(0, 100 - self.progress * 100);
          textElement.style.setProperty('--clip-value', `${clipValue}%`);
        },
      }));
    });

    return () => {
      ownedTriggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-animation-wrapper w-full bg-[#000000] text-white overflow-x-hidden font-roboto">
      
      {/* About Section */}
      <section id="about" className="about h-screen w-full flex items-center justify-center px-8 relative overflow-hidden bg-[#000000]">
        <h2 className="animate-text text-[clamp(1.5rem,4vw,3.75rem)] font-extrabold text-[#3a3a3a] leading-[1.125] text-center w-[90%] md:w-[70%] tracking-tight">
          I'm from a small town where shortcuts aren't an option. Built my way up through execution and curiosity. Now I'm obsessed with one thing: building <a href="https://discord.com/invite/qDbEUEeg" target="_blank" rel="noopener noreferrer" className="plain-link">systems</a> that actually <a href="https://linkedin.com/in/tkoushik" target="_blank" rel="noopener noreferrer" className="plain-link">think</a>. <a href="https://github.com/Riyakoushik" target="_blank" rel="noopener noreferrer" className="plain-link">RIYA</a> is that bet.
        </h2>
      </section>

    </div>
  );
};

export default ScrollAnimationSection;
