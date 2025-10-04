import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import rocketAnimation from '../assets/rocket.json'
import earthImage from '../assets/earth.png'

function IntroAnimation({ onComplete }) {
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    // Start the flash effect at 3.5 seconds
    const flashTimer = setTimeout(() => {
      setShowFlash(true)
    }, 3500)

    // Complete the animation at 4 seconds
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4000)

    return () => {
      clearTimeout(flashTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Earth Image - Half visible at bottom center */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ 
          bottom: '-50%',
          width: '600px',
          height: '600px',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <img 
          src={earthImage} 
          alt="Earth" 
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      {/* Rocket Animation - Launches from Earth's surface */}
      <motion.div
        className="absolute"
        initial={{ 
          bottom: '10%',
          left: '50%',
          x: '-50%',
          scale: 0.4,
          opacity: 1
        }}
        animate={{ 
          bottom: '120%',
          scale: [1, 1.2, 1.3, 1.5, 1.8],
          opacity: [1, 1, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.33, 0.66, 0.9, 1],
          delay: 1 // Wait 1 second before starting the rocket animation
        }}
        style={{ width: '250px', height: '250px', zIndex: 10 }}
      >
        <Lottie
          animationData={rocketAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* White Flash Overlay - Blend Effect */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: showFlash ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Loading Text */}
      <motion.div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
        transition={{ 
          duration: 3,
          times: [0, 0.1, 0.8, 1],
          ease: "easeInOut"
        }}
      >
        <h2 className="text-3xl font-bold mb-2 tracking-wider">LAUNCHING...</h2>
        <p className="text-sm opacity-75 font-light">Preparing your cosmic journey</p>
      </motion.div>
    </div>
  )
}

export default IntroAnimation

