import './App.css'
import { Agentation } from 'agentation'
import heroForDesktop from './assets/herofordestop.png'

function App() {
  return (
    <div className="hero-container">
      <div className="custom-content">
        <div className="info-left">Thalari Koushik</div>
        <div className="info-center">Building the product</div>
        <div className="info-right">Contact me</div>
      </div>

      <div className="main-title">
        Thalari Koushik
      </div>

      <div className="image-placeholder">
        <img src={heroForDesktop} alt="Hero for Desktop" className="hero-img" />
      </div>

      {import.meta.env.DEV && <Agentation />}
    </div>
  )
}

export default App
