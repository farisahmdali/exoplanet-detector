import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import bgImage from '../assets/bg.png'
import SpinningSphere from '../components/SpinningSphere'
import axios from 'axios'

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [fetchData, setFetchData] = useState({star : 0})
  const [latestDiscovery, setLatestDiscovery] = useState(null)
  // const [expandedCard, setExpandedCard] = useState(null)
  const [expandedInfoCard, setExpandedInfoCard] = useState(null)

  // Detailed content for each exoplanet type
  const exoplanetTypes = {
    gasGiants: {
      title: "Gas Giants",
      color: "orange",
      description: "Massive planets composed primarily of hydrogen and helium, similar to Jupiter and Saturn.",
      detailedContent: {
        composition: "Primarily hydrogen (75%) and helium (24%), with trace amounts of methane, ammonia, water vapor, and other compounds",
        size: "Can be 10-1000 times more massive than Earth, with diameters ranging from 2-15 times Earth's size",
        characteristics: "Have no solid surface, thick atmospheres with powerful storms, strong magnetic fields, and extensive ring systems",
        examples: "Jupiter, Saturn, and many exoplanets like HD 209458 b and WASP-12b",
        discovery: "Often detected through radial velocity method due to their massive gravitational influence on their host stars",
        atmosphere: "Dense atmospheres with complex weather patterns, including massive storms and jet streams",
        moons: "Typically have dozens of moons, some potentially habitable like Europa and Titan in our solar system"
      }
    },
    superEarths: {
      title: "Super-Earths",
      color: "green",
      description: "Rocky planets larger than Earth but smaller than Neptune, potentially habitable worlds.",
      detailedContent: {
        composition: "Rocky cores with possible thick atmospheres, containing silicate minerals, metals, and potentially water",
        size: "1.2-10 times Earth's mass, with radii typically 1.2-2.5 times Earth's size",
        characteristics: "May have plate tectonics, magnetic fields, and atmospheres that could support life",
        examples: "Gliese 581c, Kepler-452b, and Proxima Centauri b are notable super-Earths",
        discovery: "Commonly found using the transit method, as their size makes them easier to detect than Earth-sized planets",
        habitability: "Located in habitable zones where liquid water could exist on the surface",
        diversity: "Show incredible variety in composition, from rocky worlds to mini-Neptunes with thick atmospheres"
      }
    },
    iceGiants: {
      title: "Ice Giants",
      color: "orange",
      description: "Planets composed of water, methane, and ammonia ices, similar to Uranus and Neptune.",
      detailedContent: {
        composition: "Water, methane, and ammonia ices mixed with rock and metal, with hydrogen-helium atmospheres",
        size: "10-20 times Earth's mass, with radii 3-4 times Earth's size",
        characteristics: "Extremely cold outer regions, potential subsurface oceans, and unusual magnetic fields",
        examples: "Uranus and Neptune in our solar system, with exoplanets like Kepler-421b and HAT-P-11b",
        discovery: "Challenging to detect due to their distance from host stars and smaller transit signals",
        atmosphere: "Rich in water vapor, methane, and other volatiles, with complex weather patterns",
        oceans: "May harbor subsurface oceans beneath thick ice layers, potentially habitable environments"
      }
    },
    terrestrial: {
      title: "Terrestrial",
      color: "blue",
      description: "Rocky planets similar to Earth, with solid surfaces and potentially habitable conditions.",
      detailedContent: {
        composition: "Rocky surfaces composed of silicate minerals, metals, and potentially water",
        size: "Similar to Earth's mass and size, ranging from 0.5-2 times Earth's radius",
        characteristics: "Solid surfaces, potential atmospheres, and may have plate tectonics and magnetic fields",
        examples: "Earth, Mars, and Venus in our solar system, with exoplanets like Kepler-438b and TRAPPIST-1e",
        discovery: "Difficult to detect due to their small size, often found using the transit method",
        habitability: "Located in habitable zones where liquid water could exist on the surface",
        atmosphere: "May have atmospheres ranging from thin (like Mars) to thick (like Venus) or Earth-like"
      }
    }
  }

  // Detailed content for information cards in second section
  const infoCardsContent = {
    habitableZone: {
      title: "Habitable Zone",
      description: "The 'Goldilocks Zone' is the orbital region around a star where conditions are 'just right'—not too hot and not too cold—for a planet to potentially have liquid water on its surface.",
      detailedContent: {
        whatItIs: "The habitable zone is the orbital region around a star where conditions are 'just right'—not too hot and not too cold—for a planet to potentially have liquid water on its surface. The presence of liquid water is considered a key ingredient for life as we know it. Earth sits perfectly within our Sun's habitable zone at 1 astronomical unit (AU). Mars, at 1.5 AU, is on the outer edge and too cold for liquid water due to its thin atmosphere.",
        keyFactors: {
          stars: "Star's temperature and size are the most crucial factors. Hotter, more massive stars have a habitable zone that is farther away and wider. Cooler, smaller stars (like red dwarfs) have a much closer and narrower habitable zone.",
          atmosphere: "A planet's atmosphere is also critical. A thick atmosphere can trap heat through the greenhouse effect, potentially making a planet habitable even if it's farther from its star. Conversely, a planet within the habitable zone but with a very thin atmosphere (like Mars) might be too cold for liquid water."
        },
        howItVaries: {
          sunLikeStars: "Our sun is a G-type star. While it supports life on Earth, these stars have a shorter lifespan (around 10 billion years).",
          kDwarfStars: "Many scientists consider these the 'true Goldilocks stars.' They are cooler than our sun but have a much longer and more stable lifespan (15 to 45 billion years), providing a longer period for life to potentially evolve.",
          mDwarfStars: "These are the most common stars in our galaxy. However, their habitable zones are very close to the star, which can expose orbiting planets to intense radiation and stellar flares, potentially stripping away their atmospheres."
        }
      }
    },
    detection: {
      title: "Why We Search?",
      description: "Whether life exists beyond Earth is one of the most profound questions of all time. The answer — whatever it is — will change us forever.",
      detailedContent: {
        searchForLife: "We search for exoplanets to answer the profound question: Are we alone in the universe? By discovering planets in the 'habitable zone,' where liquid water could exist, scientists hope to find worlds that might support life. These discoveries could reveal a universe rich with life, or teach us that life is rare and fragile.",
        findingSigns: "Detection of life involves studying exoplanet atmospheres using techniques like transmission spectroscopy. When a planet passes in front of its star, astronomers analyze starlight that has filtered through the planet's atmosphere. Looking for molecules such as oxygen or methane in this spectrum can provide clues about possible biological activity.",
        understandingOurPlace: "Exploring exoplanets is also teaching us about our own planet's origins and potential futures. Comparing findings from distant worlds helps scientists understand how planets form and evolve, and what conditions make a planet habitable. This journey of exploration helps put Earth's story into a cosmic perspective."
      }
    },
    finding: {
      title: "How Do We Find Exoplanets?",
      description: "Since exoplanets are hidden in the glare of their stars, we search for their subtle clues. A tiny, rhythmic dip in a star's light or a slight wobble in its position reveals an unseen world.",
      detailedContent: {
        introduction: "Discovering exoplanets—planets outside our solar system—requires careful observation of the subtle effects they have on their parent stars. NASA and astronomers worldwide use several powerful techniques to detect and study these distant worlds.",
        transitMethod: "One of the most effective techniques is the transit method. When an exoplanet passes directly between its star and our telescopes, it blocks out a small fraction of the starlight, creating a tiny but measurable dip in brightness. By tracking the timing and depth of these periodic dips, scientists can determine the planet's size, orbit, and sometimes even its atmosphere.",
        radialVelocity: "Another widely used approach is the radial velocity method. As planets orbit their stars, their gravity causes the star to wobble very slightly. This motion is detected as small shifts in the color, or spectrum, of the star's light (the Doppler effect). Measuring this wobble reveals information about the planet's mass and how tightly it orbits its star.",
        transmissionSpectroscopy: "Advanced techniques like transmission spectroscopy are helping unlock the secrets of exoplanet atmospheres. When a planet transits its star, some starlight filters through the planet's atmosphere before reaching telescopes. By carefully analyzing this filtered light, scientists can detect which molecules—like water vapor, methane, or oxygen—are present in the atmosphere, offering crucial clues about the planet's environment and potential for life."
      }
    },
    importance: {
      title: "Why Do They Matter?",
      description: "Exoplanets help us understand how planetary systems form and evolve—and whether life might exist elsewhere in the universe.",
      detailedContent: {
        formation: "Studying exoplanets reveals how planetary systems form, evolve, and what makes them unique or common in the universe.",
        life: "They provide clues about the conditions necessary for life and help us understand if Earth-like worlds are rare or common.",
        diversity: "Exoplanets show incredible variety in size, composition, and orbital characteristics, expanding our understanding of planetary physics.",
        future: "They represent potential destinations for future space exploration and possible colonization efforts.",
        technology: "The search for exoplanets drives advances in telescope technology, data analysis, and space exploration capabilities.",
        perspective: "They help us understand our place in the universe and whether our solar system is typical or unique."
      }
    },
    ai: {
      title: "AI in Exoplanet Discovery",
      description: "Machine learning accelerates the search, analyzing vast data to spot subtle signals and reveal new worlds faster than ever.",
      detailedContent: {
        dataAnalysis: "AI algorithms can process millions of light curves simultaneously, identifying planetary transits that humans might miss.",
        patternRecognition: "Machine learning excels at finding subtle patterns in stellar data that indicate the presence of orbiting planets.",
        automation: "AI systems can automatically flag potential exoplanet candidates for further study, dramatically increasing discovery rates.",
        classification: "Neural networks can classify exoplanets by type, size, and orbital characteristics based on observational data.",
        prediction: "AI models can predict exoplanet properties and help prioritize which candidates deserve detailed follow-up observations.",
        efficiency: "Machine learning reduces the time needed to analyze data from months to hours, accelerating the pace of discovery."
      }
    }
  }

  

  const handleInfoCardClick = (cardType) => {
    setExpandedInfoCard(expandedInfoCard === cardType ? null : cardType)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    axios.get('https://eyes.nasa.gov/assets/dynamic/exo/json/planet_count.json').then((res) => {
      setFetchData({planet : res.data.count})
    })
    axios.get('https://eyes.nasa.gov/assets/dynamic/exo/json/star_count.json').then((res) => {
      setFetchData({star : res.data.count})
    })
    axios.get('https://science.nasa.gov/wp-json/wp/v2/exoplanet?orderby=date&order=desc&per_page=1').then((res) => {
      if (res.data && res.data.length > 0) {
        setLatestDiscovery(res.data[0])
      }
    })
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
      className="min-h-[200vh] overflow-x-hidden relative"
    >
      {/* Background Video */}
      

      {/* Dark overlay for better text readability */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-1"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 py-4 md:py-8 px-4 md:px-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-4 md:gap-8 lg:gap-16">
          <Link to="/" className="text-white text-sm md:text-lg lg:text-xl font-bold hover:opacity-80 transition-opacity">
            Home
          </Link>
          <Link to="/predict" className="text-white text-sm md:text-lg lg:text-xl font-bold hover:opacity-80 transition-opacity">
            Predict
          </Link>
         
          <Link to="/training" className="text-white text-sm md:text-lg lg:text-xl font-bold hover:opacity-80 transition-opacity">
            Training
          </Link>
          <a href="/galactic.html" className="text-white text-sm md:text-lg lg:text-xl font-bold hover:opacity-80 transition-opacity">
            Game
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        {/* 3D Spinning Sphere with Parallax Effect */}
        <div 
          className="hidden md:block"
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
          className="relative z-10 text-center px-4 md:px-8"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-white mt-20 md:mt-15 font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase mb-4 md:mb-6 tracking-tight leading-tight mx-auto">
            Journey Beyond Our Solar System
          </h1>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 md:mb-12 font-light max-w-4xl mx-auto px-2">
              Experience the wonder of exoplanet discovery as you traverse uncharted cosmic realms, unveiling breathtaking alien landscapes, uncovering mysterious atmospheric compositions, witnessing extraordinary celestial phenomena, and igniting a profound and limitless curiosity that fuels scientific exploration, inspires technological innovation, and unites collective humanity in awe of the universe's boundless infinite majesty.
            </p>
         
        </div>
      </div>

      {/* Exoplanet Section - Fades in on scroll */}
      <div className="min-h-screen flex items-center justify-center md:justify-end px-4 md:px-8 lg:px-16 xl:px-32 relative z-10">
        <div 
          className="flex flex-col items-center justify-center text-white z-10 w-full max-w-2xl text-center md:items-end md:text-right"
          style={{ opacity: exoplanetOpacity }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-black uppercase mb-6 md:mb-8 tracking-tight">
            EXOPLANET
          </h2>
          <div className="space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[#d2d2d2] px-2">
            <p className="font-light">
              An <span className="font-bold text-orange-400">exoplanet</span> is a planet that orbits a star outside our solar system. 
              These distant worlds come in a stunning variety of sizes and compositions, from gas giants larger than Jupiter 
              to rocky planets smaller than Earth.
            </p>
            <p className="font-light">
              Since the first confirmed detection in the 1990s, thousands of exoplanets have been discovered, 
              revolutionizing our understanding of planetary systems and raising profound questions about the 
              possibility of life beyond Earth.
            </p>
            <p className="font-light">
              Using machine learning techniques, we can now analyze light curve data to detect 
              these <span className="font-bold text-orange-400">distant worlds</span> and unlock the mysteries of the cosmos.
            </p>
          </div>
          <Link 
            to="/predict" 
            className="inline-block mt-8 md:mt-12 bg-orange-400 text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-12 py-3 md:py-4 hover:bg-orange-300 transition-colors uppercase tracking-wide"
          >
            START DETECTING
          </Link>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-16 xl:px-28 relative z-10">
        <div className="text-white font-orbitron text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase mb-6 tracking-tight leading-tight mx-auto">
          Discovery of Exoplanets
        </div>
        
        {/* Statistics Display */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12 flex-wrap">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-orange-400 mb-2">
              {fetchData.planet?.toLocaleString() || '6,022'}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium">EXOPLANETS</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-orange-400 mb-2">
              {fetchData.star?.toLocaleString() || '4,500+'}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-300 font-medium">STARS</div>
          </div>
          
          <div className="text-center bg-black/40 rounded-2xl p-4 md:p-6 border border-white/20 w-full sm:w-auto">
            <div className="text-sm md:text-lg font-bold text-orange-400 mb-2">NEW DISCOVERY</div>
            <div className="text-lg md:text-xl font-black text-white mb-1">
              {latestDiscovery?.title?.rendered || 'TOI-5799 c'}
            </div>
            <div className="text-xs md:text-sm text-gray-300">
              {latestDiscovery?.acf?.planet_type || 'Super Earth'} • {latestDiscovery?.acf?.discovery_date || '2025'}
            </div>
            <div className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer mt-2" onClick={() => window.open(latestDiscovery?.link || 'https://science.nasa.gov/exoplanet-catalog/toi-5799-c/', '_blank')}>
              &gt; Learn More
            </div>
          </div>
        </div>
        {/* Information Cards Section */}
      <div className="w-full h-full py-8 md:py-16 px-4 md:px-0 bg-gradient-to-r">
        {!expandedInfoCard ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Habitable Zone Card */}
            <div 
              className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border-white hover:scale-105 hover:border-white transition-all duration-500 group cursor-pointer"
              onClick={() => handleInfoCardClick('habitableZone')}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:rounded-none">
              <img 
                src="/habitableZone.jpeg" 
                alt="Habitable Zone" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-all duration-300"
              />
            </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-orbitron font-black mb-2 md:mb-3 text-[#ddd] group-hover:text-white transition-colors duration-300 text-center">The Habitable Zone</h3>
              <p className="text-xs md:text-sm text-white/70 font-light text-center leading-relaxed tracking-wide">
                {infoCardsContent.habitableZone.description}
              </p>
            </div>

            {/* How Are They Found Card */}
            <div 
              className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border-white hover:scale-105 hover:border-white transition-all duration-500 group cursor-pointer"
              onClick={() => handleInfoCardClick('detection')}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:rounded-none">
                <img 
                  src="/analysis.png" 
                  alt="Analysis" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-orbitron font-black mb-2 md:mb-3 text-[#ddd] group-hover:text-white transition-colors duration-300 text-center">Why We Search?</h3>
              <p className="text-xs md:text-sm text-white/70 font-light text-center leading-relaxed tracking-wide">
                {infoCardsContent.detection.description}
              </p>
              </div>

              {/* How Do We Find Exoplanets Card */}
              <div 
                className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border-white hover:scale-105 hover:border-white transition-all duration-500 group cursor-pointer"
                onClick={() => handleInfoCardClick('finding')}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:rounded-none">
                  <img 
                    src="/whyfind.png" 
                    alt="How Do We Find Exoplanets?" 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-orbitron font-black mb-2 md:mb-3 text-[#ddd] group-hover:text-white transition-colors duration-300 text-center">How Do We Find Exoplanets?</h3>
                <p className="text-xs md:text-sm text-white/70 font-light text-center leading-relaxed tracking-wide">
                  {infoCardsContent.finding.description}
                </p>
              </div>

            
 
            
            </div>
        ) : (
          /* Expanded Card View - Stays in document flow */
          <div className="relative">
            <div className="w-full bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-md border border-white/20 rounded-3xl p-8 relative transition-all duration-700 ease-in-out">
              <button 
                onClick={() => setExpandedInfoCard(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold bg-white/10 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                ×
              </button>
              
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white animate-fadeIn">
                  {infoCardsContent[expandedInfoCard].title}
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-fadeIn delay-200">
                  {infoCardsContent[expandedInfoCard].description}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
                {/* Content Section */}
                <div className="flex-1 space-y-4 md:space-y-6 lg:space-y-8">
                  {Object.entries(infoCardsContent[expandedInfoCard].detailedContent).map(([key, value], index) => (
                    <div 
                      key={key} 
                      className="bg-white/5 rounded-xl p-4 md:p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 animate-fadeInUp"
                      style={{ animationDelay: `${index * 200 + 300}ms` }}
                    >
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-white capitalize">
                        {key === 'whatItIs' ? 'What It Is' : 
                         key === 'keyFactors' ? 'Key Factors' :
                         key === 'howItVaries' ? 'How Habitable Zone Varies for Different Stars' :
                         key.replace(/([A-Z])/g, ' $1')}
                      </h3>
                      
                      {key === 'keyFactors' && typeof value === 'object' ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Stars</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.stars}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Atmosphere</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.atmosphere}
                            </p>
                          </div>
                        </div>
                      ) : key === 'howItVaries' && typeof value === 'object' ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Sun-like Stars (G-type)</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.sunLikeStars}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">K-dwarf Stars (Orange Dwarfs)</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.kDwarfStars}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">M-dwarf Stars (Red Dwarfs)</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.mDwarfStars}
                            </p>
                          </div>
                        </div>
                      ) : key === 'detection' && typeof value === 'object' ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">The Search for Life Beyond Earth</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.searchForLife}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Finding Signs of Life</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.findingSigns}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Understanding Our Place in the Universe</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.understandingOurPlace}
                            </p>
                          </div>
                        </div>
                      ) : key === 'finding' && typeof value === 'object' ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">Introduction</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.introduction}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">1. Transit Method: Watching for Tiny Shadows</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.transitMethod}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">2. Radial Velocity: Detecting the Star's Wobble</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.radialVelocity}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-3 text-white">3. Transmission Spectroscopy: Reading Alien Atmospheres</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                              {value.transmissionSpectroscopy}
            </p>
          </div>
                        </div>
                      ) : (
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Image Section */}
                <div className="flex-shrink-0 w-full lg:w-80">
                  <div className="sticky top-4 md:top-8">
                    {expandedInfoCard === 'habitableZone' ? (
                      <img 
                        src="/habitableZone.jpeg" 
                        alt="Habitable Zone" 
                        className="w-full h-auto rounded-2xl shadow-2xl border border-white/20 animate-fadeIn"
                        style={{ animationDelay: '500ms' }}
                      />
                    ) : expandedInfoCard === 'detection' ? (
                      <img 
                        src="/analysis.png" 
                        alt="Analysis" 
                        className="w-full h-auto rounded-2xl shadow-2xl border border-white/20 animate-fadeIn"
                        style={{ animationDelay: '500ms' }}
                      />
                    ) : expandedInfoCard === 'finding' ? (
                      <img 
                        src="/whyfind.png" 
                        alt="How Do We Find Exoplanets?" 
                        className="w-full h-auto rounded-2xl shadow-2xl border border-white/20 animate-fadeIn"
                        style={{ animationDelay: '500ms' }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    {/* Statistics and Discovery Section */}
    <div className="mt-12 md:mt-20 mb-12 md:mb-16 px-4 md:px-8 lg:px-16 xl:px-28 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Left Section: Planet Types */}
        <div className="bg-black/60 rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Planet Types</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Neptune-like segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="8"
                    strokeDasharray={`${(2042/6022) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  {/* Gas Giant segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ff8c42"
                    strokeWidth="8"
                    strokeDasharray={`${(1989/6022) * 251.2} 251.2`}
                    strokeDashoffset={`-${(2042/6022) * 251.2}`}
                  />
                  {/* Super Earth segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ffad5a"
                    strokeWidth="8"
                    strokeDasharray={`${(1764/6022) * 251.2} 251.2`}
                    strokeDashoffset={`-${((2042+1989)/6022) * 251.2}`}
                  />
                  {/* Terrestrial segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ffd93d"
                    strokeWidth="8"
                    strokeDasharray={`${(220/6022) * 251.2} 251.2`}
                    strokeDashoffset={`-${((2042+1989+1764)/6022) * 251.2}`}
                  />
                  {/* Unknown segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#6c757d"
                    strokeWidth="8"
                    strokeDasharray={`${(7/6022) * 251.2} 251.2`}
                    strokeDashoffset={`-${((2042+1989+1764+220)/6022) * 251.2}`}
                  />
              </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{fetchData.planet?.toLocaleString() || '6,022'}</div>
              <div className="text-sm md:text-base lg:text-lg font-bold text-orange-500 mb-4 md:mb-6">CONFIRMED EXOPLANETS</div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <div className="text-white text-sm">Neptune-like</div>
                  <div className="text-white font-bold ml-auto">{fetchData.neptune_like?.toLocaleString() || '2,042'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="text-white text-sm">Gas Giant</div>
                  <div className="text-white font-bold ml-auto">{fetchData.gas_giant?.toLocaleString() || '1,989'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="text-white text-sm">Super Earth</div>
                  <div className="text-white font-bold ml-auto">{fetchData.super_earth?.toLocaleString() || '1,764'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="text-white text-sm">Terrestrial</div>
                  <div className="text-white font-bold ml-auto">{fetchData.terrestrial?.toLocaleString() || '220'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <div className="text-white text-sm">Unknown</div>
                  <div className="text-white font-bold ml-auto">{fetchData.unknown?.toLocaleString() || '7'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: New Discovery */}
        <div className="bg-black/60 rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">New Discovery</h2>
          
          <div className="mb-6">
            <img 
              src="/earth.jpeg" 
              alt="New Exoplanet Discovery" 
              className="w-full h-48 object-cover rounded-xl mb-6"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <div>
              <div className="text-orange-500 text-xs font-bold uppercase mb-1">PLANET NAME</div>
              <div className="text-white font-bold text-sm md:text-base">{latestDiscovery?.title?.rendered || 'TOI-5799 c'}</div>
            </div>
            <div>
              <div className="text-orange-500 text-xs font-bold uppercase mb-1">PLANET TYPE</div>
              <div className="text-white font-bold text-sm md:text-base">{latestDiscovery?.acf?.planet_type || 'Super Earth'}</div>
            </div>
            <div>
              <div className="text-orange-500 text-xs font-bold uppercase mb-1">DISCOVERY DATE</div>
              <div className="text-white font-bold text-sm md:text-base">{latestDiscovery?.acf?.discovery_date || '2025'}</div>
            </div>
            <div>
              <div className="text-orange-500 text-xs font-bold uppercase mb-1">DETECTION METHOD</div>
              <div className="text-white font-bold text-sm md:text-base">{latestDiscovery?.acf?.detection_method || 'Transit'}</div>
            </div>
          </div>
          
          {/* <div className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer">
            &gt; More about this planet
          </div> */}
        </div>
      </div>
    </div>

    <div className="mt-12 md:mt-20 mb-12 md:mb-16 px-4 md:px-8 lg:px-16 xl:px-28 relative z-10">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Start Your Journey
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
          Choose your path to explore the cosmos and discover new worlds beyond our solar system
        </p>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Predict Exoplanets Card */}
        <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border border-white hover:scale-105 hover:border-white transition-all duration-500 group cursor-pointer"
               onClick={() => window.location.href = '/predict'}>
          <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:rounded-none">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 19c-5 0-8-3-8-8s3-8 8-8 8 3 8 8-3 8-8 8z"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 text-[#ddd] group-hover:text-white transition-colors duration-300 text-center">Predict Exoplanets</h3>
          
        </div>

        {/* Train a Model Card */}
        <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border border-white hover:scale-105 hover:border-white transition-all duration-500 group cursor-pointer"
             onClick={() => window.location.href = '/training'}>
          <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:rounded-none">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 text-[#ddd] group-hover:text-white transition-colors duration-300 text-center">Train a Model</h3>
          
        </div>
        
        {/* Exoplanet Game Card */}
        <div className="flex flex-col items-center bg-black/60 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 border border-white hover:scale-105 hover:border-white transition-all duration-500 group cursor-pointer"
               onClick={() => window.location.href = '/game'}>
          <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:rounded-none">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 text-[#ddd] group-hover:text-white transition-colors duration-300 text-center">Exoplanet Game</h3>
          
        </div>
      </div>
    </div>

    {/* Did You Know Section */}
    <div className="mt-12 md:mt-16 mb-6 md:mb-8 px-4 md:px-8 lg:px-16 xl:px-28 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* First Did You Know Card */}
        <div className="bg-black/60 rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-400/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Fun Fact</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Some exoplanets orbit two stars at once, much like the fictional planet Tatooine from Star Wars. It sounds like science fiction, but NASA's Kepler space telescope has confirmed that these "circumbinary" planets are real. On a world like Kepler-16b, you would get to experience a unique double sunset and sunrise every day.
              </p>
            </div>
          </div>
        </div>

        {/* Second Did You Know Card */}
        <div className="bg-black/60 rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-orange-400/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Did You Know?</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                On average, it is estimated that there is at least one planet for every star in the galaxy. That means there's something on the order of billions of planets in our galaxy alone, many in Earth's size range. These planets outside of our solar system are known as Exoplanets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Types of Exoplanets Section */}
    <div className="mt-12 md:mt-16 mb-6 md:mb-8 px-4 md:px-8 lg:px-16 xl:px-28 relative z-10">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Types of Exoplanets
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
          Click on any exoplanet type to explore detailed information about these fascinating worlds beyond our solar system.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        {/* Gas Giants Card */}
        <div 
          className={`bg-black/60 border border-white hover:scale-105 hover:border-white transition-all duration-500 rounded-2xl p-4 md:p-6 lg:p-8 cursor-pointer `}
        >
          <div className={`flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8 `}>
            <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-2xl flex-shrink-0 `}>
              <img 
                src="/gasgiant.jpeg" 
                alt="Gas Giant Exoplanet" 
                className="w-full h-full object-cover rounded-full object-left"
              />
            </div>
            <div className={`flex-1 text-center sm:text-left `}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">Gas Giants</h3>
            <p className="text-gray-300 text-sm md:text-base lg:text-xl leading-relaxed">
                {exoplanetTypes.gasGiants.description}
              </p>
              
            </div>
          </div>
          
        </div>

        {/* Super-Earths Card */}
        <div 
          className={`bg-black/60 border border-white hover:scale-105 hover:border-white transition-all duration-500 rounded-2xl p-4 md:p-6 lg:p-8 cursor-pointer `}
          onClick={() => handleCardClick('superEarths')}
        >
          <div className={`flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8`}>
            <div className={`flex-1 text-center sm:text-right `}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">Super-Earths</h3>
            <p className="text-gray-300 text-sm md:text-base lg:text-xl leading-relaxed">
                {exoplanetTypes.superEarths.description}
              </p>
              
            </div>
            <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-2xl flex-shrink-0 `}>
              <img 
                src="/superearth.jpeg" 
                alt="Super-Earth Exoplanet" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          
        </div>


        {/* Ice Giants Card */}
        <div 
          className={`bg-black/60 border border-white hover:scale-105 hover:border-white transition-all duration-500 rounded-2xl p-4 md:p-6 lg:p-8 cursor-pointer `}
          onClick={() => handleCardClick('iceGiants')}
        >
          <div className={`flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8 `}>
            <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-2xl flex-shrink-0 `}>
              <img 
                src="/neptunelike.jpeg" 
                alt="Ice Giant Exoplanet" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className={`flex-1 text-center sm:text-left `}>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">Ice Giants</h3>
            <p className="text-gray-300 text-sm md:text-base lg:text-xl leading-relaxed">
                {exoplanetTypes.iceGiants.description}
              </p>
             
            </div>
          </div>
          
        </div>

        {/* Terrestrial Card */}
        <div 
          className={`bg-black/60 border border-white hover:scale-105 hover:border-white transition-all duration-500 rounded-2xl p-4 md:p-6 lg:p-8 cursor-pointer `}
          onClick={() => handleCardClick('terrestrial')}
        >
          <div className={`flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8 `}>
            <div className={`flex-1 text-center sm:text-right `}>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">Terrestrial</h3>
              <p className="text-gray-300 text-sm md:text-base lg:text-xl leading-relaxed">
                {exoplanetTypes.terrestrial.description}
              </p>
              
            </div>
            <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-2xl flex-shrink-0 `}>
              <img 
                src="/terrential.jpeg" 
                alt="Terrestrial Exoplanet" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
