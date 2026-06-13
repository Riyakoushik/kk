import './App.css'
import { Agentation } from 'agentation'

function App() {
  return (
    <div className="hero-container">
      <div className="custom-content">
        <div className="info-left">Thalari Kosushik</div>
        <div className="info-center">Buiding the product</div>
        <div className="info-right">Contact me</div>
      </div>

      <div className="main-title">
        Thalari Koushik
      </div>

      {import.meta.env.DEV && <Agentation />}
    </div>
  )
}

export default App
