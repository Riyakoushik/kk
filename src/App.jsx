import { useEffect } from 'react'
import { LoadingScreen } from './components/LoadingScreen'
import HeroSection from './HeroSection'
import ScrollAnimationSection from './ScrollAnimationSection'
import HorizontalWords from './components/truus/HorizontalWords'
import ProjectsHover from './components/ProjectsHover/ProjectsHover'
import FramerTicker from './components/InteractiveTicker/FramerTicker'
import MetricsSection from './components/MetricsSection'
import { Skiper19 } from './components/Skiper19'
import { DesktopPromptModal } from './components/DesktopPromptModal'
import { Agentation } from 'agentation'
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
      <LoadingScreen />
      <DesktopPromptModal />
      <HeroSection />
      <ScrollAnimationSection />
      <HorizontalWords />
      <ProjectsHover />
      <FramerTicker />
      <MetricsSection />
      <Skiper19 />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App;
