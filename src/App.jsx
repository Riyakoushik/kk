import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import ScrollAnimationSection from './ScrollAnimationSection'
import Gallery from './components/Gallery/Gallery'
import { Agentation } from 'agentation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a short delay to ensure correct heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <ScrollAnimationSection />
      <Gallery />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App;
