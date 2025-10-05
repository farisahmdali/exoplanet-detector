import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Predict from './pages/Predict'
import Training from './pages/Training'
import Database from './pages/Database'
import About from './pages/About'
import IntroAnimation from './components/IntroAnimation'

function App() {
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {

      setShowIntro(false)
      setIntroComplete(true)
    
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setIntroComplete(true)
    // Store flag in localStorage so intro won't play again
    localStorage.setItem('hasSeenIntro', 'true')
  }

  return (
    <>
    <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        style={{ playbackRate: 20 }}
      >
        <source src="./bg.mp4" type="video/mp4" />
        {/* Fallback to background image if video fails to load */}
        <div 
          className="absolute inset-0"
          style={{
            // backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
      </video>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="predict" element={<Predict />} />
                <Route path="training" element={<Training />} />
                <Route path="database" element={<Database />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </Router>
        </motion.div>
      )}
    </>
  )
}

export default App
