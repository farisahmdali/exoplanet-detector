import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import bgImage from '../assets/bg.png'
import SpinningSphere from '../components/SpinningSphere'

function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate transformations based on scroll
  const maxScroll = 800 // Maximum scroll for full effect
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const planetStopPoint = 400
  
  // Initial position: left 5%, as scroll increases, move to center (50%)
  const leftPosition = 5 + (20 * scrollProgress) // 5% to 50%
  
  
  // Scale from 1 to 2.5 based on scroll
  const scale = 1 + (1.2 * scrollProgress)
  
  // Opacity for hero content (fade out on scroll)
  const heroOpacity = 1 - scrollProgress
  
  // Opacity for exoplanet content (fade in on scroll)
  const exoplanetOpacity = scrollProgress

  console.log(scrollY)

  return (
    <div 
      className="min-h-[200vh] overflow-x-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 py-8 px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-16">
          <Link to="/" className="text-white text-xl font-bold hover:opacity-80 transition-opacity">
            Home
          </Link>
          <Link to="/predict" className="text-white text-xl font-bold hover:opacity-80 transition-opacity">
            Predict
          </Link>
         
          <Link to="/training" className="text-white text-xl font-bold hover:opacity-80 transition-opacity">
            Training
          </Link>
          <Link to="/game" className="text-white text-xl font-bold hover:opacity-80 transition-opacity">
            Game
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative">
        {/* 3D Spinning Sphere with Parallax Effect */}
        <div 
          style={{
            position: 'absolute',
            left: `${leftPosition}%`,
            top: scrollY<700 ? scrollY+380:1080,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transition: 'none',
            zIndex: 5
          }}
        >
          <SpinningSphere />
        </div>

        {/* Hero Content - Fades out on scroll */}
        <div 
          className="relative z-10 text-center px-4"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 tracking-tight leading-tight  mx-auto">
            Lorem ipsum dolor sit
          </h1>
          <p className="text-white text-xl md:text-2xl mb-12 font-light max-w-4xl mx-auto">
            Experience the wonder of exoplanet discovery. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, vitae aliquam enim nisl euismod nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <Link 
            to="/predict" 
            className="inline-block bg-white text-black font-bold text-xl px-16 py-4 hover:bg-gray-200 transition-colors uppercase tracking-wide"
          >
            EXPLORE
          </Link>
        </div>
      </div>

      {/* Exoplanet Section - Fades in on scroll */}
      <div className="min-h-screen flex items-center justify-end px-8 md:px-16 lg:px-32 relative">
        <div 
          className="flex flex-col items-center justify-center text-white z-10 w-full max-w-2xl md:items-end md:text-right"
          style={{ opacity: exoplanetOpacity }}
        >
          <h2 className="text-5xl text-center md:text-6xl lg:text-7xl font-black uppercase mb-8 tracking-tight md:text-right">
            EXOPLANET
          </h2>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed  text-center md:text-right">
            <p className="font-light">
              An <span className="font-bold text-cyan-400">exoplanet</span> is a planet that orbits a star outside our solar system. 
              These distant worlds come in a stunning variety of sizes and compositions, from gas giants larger than Jupiter 
              to rocky planets smaller than Earth.
            </p>
            <p className="font-light">
              Since the first confirmed detection in the 1990s, thousands of exoplanets have been discovered, 
              revolutionizing our understanding of planetary systems and raising profound questions about the 
              possibility of life beyond Earth.
            </p>
            <p className="font-light">
              Using advanced AI and machine learning techniques, we can now analyze light curve data to detect 
              these <span className="font-bold text-cyan-400">distant worlds</span> and unlock the mysteries of the cosmos.
            </p>
          </div>
          <Link 
            to="/predict" 
            className="inline-block mt-12 bg-cyan-400 text-black font-bold text-xl px-12 py-4 hover:bg-cyan-300 transition-colors uppercase tracking-wide"
          >
            START DETECTING
          </Link>
        </div>
      </div>
      <div className="min-h-screen px-28">
        <div className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 tracking-tight leading-tight mx-auto">
          Lorem ipsum dolor sit
        </div>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-8 py-16 px-4 md:px-0 bg-gradient-to-r ">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-8 border border-cyan-800 hover:scale-110 transition-transform">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-cyan-400/20">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="24" cy="24" r="6" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-cyan-300">What is an Exoplanet?</h3>
            <p className="text-base text-white/80 font-light text-center">
              Planets orbiting stars beyond our solar system, exoplanets come in all sizes and types, from gas giants to rocky worlds.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-8 border border-cyan-800 hover:scale-110 transition-transform">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-cyan-400/20">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                <path d="M8 24a16 16 0 1 1 32 0" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="24" cy="24" r="4" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-cyan-300">How Are They Found?</h3>
            <p className="text-base text-white/80 font-light text-center">
              Most exoplanets are detected by observing tiny dips in a star’s brightness as a planet passes in front—called the transit method.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-8 border border-cyan-800 hover:scale-110 transition-transform">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-cyan-400/20">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="3"/>
                <circle cx="24" cy="24" r="6" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-cyan-300">Why Do They Matter?</h3>
            <p className="text-base text-white/80 font-light text-center">
              Exoplanets help us understand how planetary systems form and evolve—and whether life might exist elsewhere in the universe.
            </p>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-8 border border-cyan-800 hover:scale-110 transition-transform">
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-cyan-400/20">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                <ellipse cx="24" cy="24" rx="18" ry="8" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="24" cy="24" r="4" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-cyan-300">AI in Exoplanet Discovery</h3>
            <p className="text-base text-white/80 font-light text-center">
              Machine learning accelerates the search, analyzing vast data to spot subtle signals and reveal new worlds faster than ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
