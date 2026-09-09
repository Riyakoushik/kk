import { useEffect } from 'react'
import HeroSection from './HeroSection'
import ScrollAnimationSection from './ScrollAnimationSection'
import FooterSection from './components/FooterSection'
import Hero42Section from './components/Hero42Section'
import Testimonials13 from './components/Testimonials13'
import { DesktopPromptModal } from './components/DesktopPromptModal'
import { Agentation } from 'agentation'
import CustomCursor from './components/CustomCursor'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ponytail: register once here, not per-component
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
      <CustomCursor />
      <DesktopPromptModal />

      <HeroSection />
      <ScrollAnimationSection />
      <Hero42Section />
      <Testimonials13 />
      <FooterSection />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App;
