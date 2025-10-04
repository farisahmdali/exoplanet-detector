import { useEffect, useRef } from 'react'

function EnhancedSpaceBackground({ enableParticles = true, nebulaDensity = 0.8 }) {
  const canvasRef = useRef(null)
  const particleCanvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const particleCanvas = particleCanvasRef.current
    if (!canvas || !particleCanvas) return

    const ctx = canvas.getContext('2d')
    const particleCtx = particleCanvas.getContext('2d')
    let animationFrameId

    // Set canvas sizes
    const setCanvasSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      canvas.width = width
      canvas.height = height
      particleCanvas.width = width
      particleCanvas.height = height
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create enhanced star field
    const stars = []
    const starCount = 800
    
    for (let i = 0; i < starCount; i++) {
      const distance = Math.random()
      const size = distance < 0.1 ? Math.random() * 3 + 1 : Math.random() * 1.5
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: size,
        velocity: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        distance: distance,
        color: distance < 0.05 ? 'blue' : distance < 0.1 ? 'yellow' : 'white',
        pulseSpeed: Math.random() * 0.01 + 0.005
      })
    }

    // Create nebula points for procedural nebula generation
    const nebulaPoints = []
    const nebulaCount = 15
    
    for (let i = 0; i < nebulaCount; i++) {
      nebulaPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 400 + 200,
        intensity: Math.random() * nebulaDensity + 0.1,
        color: {
          r: Math.random() * 100 + 50,  // Deep purples/blues
          g: Math.random() * 80 + 20,
          b: Math.random() * 150 + 100
        },
        drift: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2
        }
      })
    }

    // Create floating particles
    const particles = []
    const particleCount = enableParticles ? 150 : 0
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        },
        opacity: Math.random() * 0.6 + 0.2,
        life: Math.random() * 1000 + 500,
        maxLife: 1000,
        color: Math.random() > 0.7 ? 'cosmic' : 'dust'
      })
    }

    const drawNebula = (time) => {
      // Create nebula effect with multiple overlapping gradients
      nebulaPoints.forEach((point, index) => {
        // Slight drift animation
        point.x += point.drift.x * Math.sin(time * 0.001 + index)
        point.y += point.drift.y * Math.cos(time * 0.001 + index)
        
        // Keep nebula points within bounds
        if (point.x < -point.radius) point.x = canvas.width + point.radius
        if (point.x > canvas.width + point.radius) point.x = -point.radius
        if (point.y < -point.radius) point.y = canvas.height + point.radius
        if (point.y > canvas.height + point.radius) point.y = -point.radius

        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        )
        
        const pulseFactor = Math.sin(time * 0.002 + index) * 0.2 + 0.8
        const intensity = point.intensity * pulseFactor
        
        gradient.addColorStop(0, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${intensity * 0.4})`)
        gradient.addColorStop(0.3, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${intensity * 0.2})`)
        gradient.addColorStop(0.6, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${intensity * 0.1})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const drawStars = (time) => {
      stars.forEach(star => {
        // Twinkle effect
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6
        
        // Pulse effect for special stars
        const pulse = star.distance < 0.1 ? Math.sin(time * star.pulseSpeed) * 0.3 + 0.7 : 1

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        
        let starColor
        switch (star.color) {
          case 'blue':
            starColor = `rgba(147, 197, 253, ${star.opacity * twinkle * pulse})`
            break
          case 'yellow':
            starColor = `rgba(255, 255, 150, ${star.opacity * twinkle * pulse})`
            break
          default:
            starColor = `rgba(255, 255, 255, ${star.opacity * twinkle * pulse})`
        }
        
        ctx.fillStyle = starColor
        ctx.fill()

        // Draw enhanced glow for larger/special stars
        if (star.radius > 1.2 || star.distance < 0.1) {
          const glowSize = star.radius * (3 + pulse)
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          )
          
          let glowColor
          switch (star.color) {
            case 'blue':
              glowColor = '147, 197, 253'
              break
            case 'yellow':
              glowColor = '255, 255, 150'
              break
            default:
              glowColor = '200, 200, 255'
          }
          
          gradient.addColorStop(0, `rgba(${glowColor}, ${0.4 * twinkle * pulse})`)
          gradient.addColorStop(0.5, `rgba(${glowColor}, ${0.1 * twinkle * pulse})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Slow drift
        star.y += star.velocity
        star.x += star.velocity * 0.1
        
        if (star.y > canvas.height + 10) {
          star.y = -10
          star.x = Math.random() * canvas.width
        }
        if (star.x > canvas.width + 10) {
          star.x = -10
        }
      })
    }

    const drawParticles = (time) => {
      if (!enableParticles) return
      
      particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height)
      
      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y
        
        // Update particle life
        particle.life -= 1
        
        // Respawn particle if it dies or goes off screen
        if (particle.life <= 0 || particle.x < -10 || particle.x > canvas.width + 10 || 
            particle.y < -10 || particle.y > canvas.height + 10) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = particle.maxLife
          particle.velocity.x = (Math.random() - 0.5) * 0.5
          particle.velocity.y = (Math.random() - 0.5) * 0.5
        }
        
        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife
        const alpha = particle.opacity * lifeRatio * (Math.sin(time * 0.005 + index) * 0.3 + 0.7)
        
        // Draw particle
        particleCtx.beginPath()
        particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        if (particle.color === 'cosmic') {
          particleCtx.fillStyle = `rgba(147, 51, 234, ${alpha})`
        } else {
          particleCtx.fillStyle = `rgba(156, 163, 175, ${alpha})`
        }
        
        particleCtx.fill()
        
        // Add subtle glow
        if (particle.color === 'cosmic') {
          const gradient = particleCtx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          )
          gradient.addColorStop(0, `rgba(147, 51, 234, ${alpha * 0.3})`)
          gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
          
          particleCtx.fillStyle = gradient
          particleCtx.beginPath()
          particleCtx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
          particleCtx.fill()
        }
      })
    }

    const animate = (time) => {
      // Clear main canvas with deep space background
      ctx.fillStyle = 'rgba(2, 6, 23, 1)' // Deep space color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw nebula first (background layer)
      ctx.globalCompositeOperation = 'screen'
      drawNebula(time)
      
      // Draw stars (middle layer)
      ctx.globalCompositeOperation = 'source-over'
      drawStars(time)
      
      // Draw particles on separate canvas (foreground layer)
      drawParticles(time)
      
      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [enableParticles, nebulaDensity])

  return (
    <div className="fixed inset-0 -z-20">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900"></div>
      
      {/* High-resolution space image overlay */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='10' cy='10' r='0.5'/%3E%3Ccircle cx='50' cy='20' r='0.8'/%3E%3Ccircle cx='20' cy='50' r='0.6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Main nebula/star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Particle overlay canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.8 }}
      />
      
      {/* Additional atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/60"></div>
    </div>
  )
}

export default EnhancedSpaceBackground
