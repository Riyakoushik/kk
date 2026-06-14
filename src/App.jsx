import HeroSection from './HeroSection'
import { Agentation } from 'agentation'

function App() {
  return (
    <>
      <HeroSection />
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App
