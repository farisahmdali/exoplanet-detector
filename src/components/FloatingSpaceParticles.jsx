import { useEffect, useRef } from 'react'

function FloatingSpaceParticles({ count = 50, color = 'cosmic' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing particles
    container.innerHTML = ''

    // Create floating particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      
      // Random positioning
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const size = Math.random() * 4 + 2
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 10
      
      // Particle styles
      particle.className = `absolute rounded-full blur-sm pointer-events-none`
      particle.style.left = `${startX}%`
      particle.style.top = `${startY}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.animationDuration = `${duration}s`
      particle.style.animationDelay = `${delay}s`
      particle.style.animationIterationCount = 'infinite'
      particle.style.animationTimingFunction = 'linear'
      
      // Color variations
      if (color === 'cosmic') {
        const colors = [
          'rgba(147, 51, 234, 0.6)', // Purple
          'rgba(59, 130, 246, 0.6)',  // Blue
          'rgba(139, 92, 246, 0.6)',  // Violet
        ]
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`
      } else {
        particle.style.backgroundColor = 'rgba(156, 163, 175, 0.4)'
        particle.style.boxShadow = `0 0 ${size}px rgba(156, 163, 175, 0.2)`
      }
      
      // Animation types
      const animations = ['float', 'drift', 'spiral']
      const animation = animations[Math.floor(Math.random() * animations.length)]
      particle.style.animationName = animation
      
      container.appendChild(particle)
    }
  }, [count, color])

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) translateX(10px) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-10vh) translateX(-10px) scale(1);
          }
          100% {
            transform: translateY(-20vh) translateX(0) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes drift {
          0% {
            transform: translateX(-10vw) translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(110vw) translateY(0vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes spiral {
          0% {
            transform: translateX(50vw) translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateX(45vw) translateY(90vh) rotate(36deg) scale(1);
          }
          25% {
            transform: translateX(55vw) translateY(75vh) rotate(90deg) scale(1);
          }
          50% {
            transform: translateX(45vw) translateY(50vh) rotate(180deg) scale(1);
          }
          75% {
            transform: translateX(55vw) translateY(25vh) rotate(270deg) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateX(50vw) translateY(10vh) rotate(324deg) scale(1);
          }
          100% {
            transform: translateX(50vw) translateY(-10vh) rotate(360deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default FloatingSpaceParticles
