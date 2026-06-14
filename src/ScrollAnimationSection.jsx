import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import whatIDoSvg from "./assets/whatido.svg";
import ImageTrail from "./components/ImageTrail/ImageTrail";

import bg1 from "./assets/background1.png";
import bg2 from "./assets/background2.png";
import bg3 from "./assets/background3.png";
import heroImage from "./assets/herofordestop.png";

const trailImages = [bg1, bg2, bg3, heroImage, bg1, bg2, bg3, heroImage];

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Text reveal animations using clip-path
    const textElements = containerRef.current.querySelectorAll('.animate-text');
    textElements.forEach(textElement => {
      textElement.setAttribute('data-text', textElement.textContent.trim());

      ScrollTrigger.create({
        trigger: textElement,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: self => {
          const clipValue = Math.max(0, 100 - self.progress * 100);
          textElement.style.setProperty('--clip-value', `${clipValue}%`);
        },
      });
    });

    // 2. Services header entry (horizontal slide)
    const servicesTrigger = containerRef.current.querySelector('.services');
    ScrollTrigger.create({
      trigger: servicesTrigger,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      onUpdate: self => {
        const headers = containerRef.current.querySelectorAll('.services-header');
        if (headers.length === 3) {
          gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
          gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
          gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
        }
      },
    });

    // 3. Services header pin & vertical movement & scaling
    ScrollTrigger.create({
      trigger: servicesTrigger,
      start: 'top top',
      end: `+=${window.innerHeight * 1.5}`,
      pin: true,
      scrub: 1,
      pinSpacing: true,
      onUpdate: self => {
        const headers = containerRef.current.querySelectorAll('.services-header');
        if (headers.length === 3) {
          if (self.progress <= 0.5) {
            const yProgress = self.progress / 0.5;
            gsap.set(headers[0], { y: `${yProgress * 100}%` });
            gsap.set(headers[2], { y: `${yProgress * -100}%` });
            headers.forEach(header => gsap.set(header, { scale: 1 }));
          } else {
            gsap.set(headers[0], { y: '100%' });
            gsap.set(headers[2], { y: '-100%' });

            const scaleProgress = (self.progress - 0.5) / 0.5;
            const minScale = window.innerWidth <= 1000 ? 0.35 : 0.15;
            const scale = 1 - scaleProgress * (1 - minScale);

            headers.forEach(header => gsap.set(header, { scale }));
          }
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-animation-wrapper w-full bg-[#000000] text-white overflow-x-hidden font-manrope">
      
      {/* About Section */}
      <section className="about h-screen w-full flex items-center justify-center px-8 relative overflow-hidden bg-[#000000]">
        <h1 className="animate-text text-[clamp(1.5rem,4vw,3.75rem)] font-extrabold text-[#3a3a3a] leading-[1.125] text-center w-[90%] md:w-[70%] tracking-tight">
          A space for work shaped with clarity and intention. Each project follows
          a simple path from thought to form, from form to function.
        </h1>
      </section>

      {/* Services Section */}
      <section className="services h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#000000]">
        <div className="services-header w-full py-4 text-center bg-[#000000] will-change-transform translate-x-[100%]">
          <img src={whatIDoSvg} alt="What I Do" className="mx-auto select-none pointer-events-none object-contain h-[18vh] max-h-[180px] w-auto max-w-[95vw]" />
        </div>
        <div className="services-header w-full py-4 text-center bg-[#000000] will-change-transform -translate-x-[100%] z-10">
          <img src={whatIDoSvg} alt="What I Do" className="mx-auto select-none pointer-events-none object-contain h-[18vh] max-h-[180px] w-auto max-w-[95vw]" />
        </div>
        <div className="services-header w-full py-4 text-center bg-[#000000] will-change-transform translate-x-[100%]">
          <img src={whatIDoSvg} alt="What I Do" className="mx-auto select-none pointer-events-none object-contain h-[18vh] max-h-[180px] w-auto max-w-[95vw]" />
        </div>
      </section>

      {/* Services Copy Section */}
      <section className="services-copy w-full min-h-screen py-[20vh] flex items-center justify-center px-8 text-center bg-[#000000] relative overflow-hidden">
        <ImageTrail items={trailImages} variant={6} />
        <h1 className="animate-text text-[clamp(1.5rem,4vw,3.75rem)] font-extrabold text-[#3a3a3a] leading-[1.125] text-center w-[90%] md:w-[70%] tracking-tight z-20 pointer-events-none">
          I create websites and digital experiences that value clarity above
          excess. Through minimal form and precise detail, I aim to build work
          that lasts and offers a quiet sense of order.
        </h1>
      </section>

    </div>
  );
};

export default ScrollAnimationSection;
