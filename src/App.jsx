import HeroSection from './HeroSection'
import ScrollAnimationSection from './ScrollAnimationSection'
import { Agentation } from 'agentation'

function App() {
  return (
    <>
      <HeroSection />
      <ScrollAnimationSection />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App;
