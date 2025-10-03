import { useEffect, useRef } from 'react'

function AnimatedPlanet({ size = 'large', variant = 'primary' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let rotation = 0

    const sizeMap = {
      small: 80,
      medium: 150,
      large: 200
    }

    const actualSize = sizeMap[size] || sizeMap.large
    canvas.width = actualSize
    canvas.height = actualSize

    const colors = {
      primary: {
        base: '#6366f1',
        shadow: '#4f46e5',
        highlight: '#818cf8',
        atmosphere: 'rgba(99, 102, 241, 0.3)'
      },
      secondary: {
        base: '#8b5cf6',
        shadow: '#7c3aed',
        highlight: '#a78bfa',
        atmosphere: 'rgba(139, 92, 246, 0.3)'
      },
      earth: {
        base: '#3b82f6',
        shadow: '#2563eb',
        highlight: '#60a5fa',
        atmosphere: 'rgba(59, 130, 246, 0.3)'
      }
    }

    const planetColors = colors[variant] || colors.primary

    const drawPlanet = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = actualSize / 2.5

      // Draw atmosphere glow
      const atmosphereGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius * 1.4
      )
      atmosphereGradient.addColorStop(0, planetColors.atmosphere)
      atmosphereGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)')
      atmosphereGradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
      
      ctx.fillStyle = atmosphereGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2)
      ctx.fill()

      // Draw planet base
      const planetGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.2,
        centerX, centerY, radius
      )
      planetGradient.addColorStop(0, planetColors.highlight)
      planetGradient.addColorStop(0.5, planetColors.base)
      planetGradient.addColorStop(1, planetColors.shadow)

      ctx.fillStyle = planetGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw rotating surface details
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      // Draw some "continents" or surface features
      ctx.globalAlpha = 0.3
      ctx.fillStyle = planetColors.shadow

      // Feature 1
      ctx.beginPath()
      ctx.ellipse(0, -radius * 0.3, radius * 0.4, radius * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()

      // Feature 2
      ctx.beginPath()
      ctx.ellipse(radius * 0.4, radius * 0.2, radius * 0.3, radius * 0.5, Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()

      // Feature 3
      ctx.beginPath()
      ctx.ellipse(-radius * 0.3, radius * 0.4, radius * 0.35, radius * 0.4, -Math.PI / 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      // Draw shadow (terminator line)
      const shadowGradient = ctx.createRadialGradient(
        centerX + radius * 0.5, centerY, radius * 0.1,
        centerX, centerY, radius
      )
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      shadowGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)')
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)')

      ctx.fillStyle = shadowGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw highlight
      const highlightGradient = ctx.createRadialGradient(
        centerX - radius * 0.4, centerY - radius * 0.4, 0,
        centerX - radius * 0.4, centerY - radius * 0.4, radius * 0.5
      )
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = highlightGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      rotation += 0.005
      animationFrameId = requestAnimationFrame(drawPlanet)
    }

    drawPlanet()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [size, variant])

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} className="drop-shadow-2xl" />
    </div>
  )
}

export default AnimatedPlanet


