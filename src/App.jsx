import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import ScrollAnimationSection from './ScrollAnimationSection'
import Gallery from './components/Gallery/Gallery'
import Feedback from './components/Feedback/Feedback'
import Footer from './components/Footer/Footer'
import FooterTitle from './components/Footer/FooterTitle'
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

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <ScrollAnimationSection />
      <Gallery />
      <Feedback />
      <Footer />
      <FooterTitle />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App;
