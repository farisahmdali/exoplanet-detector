import { Link } from 'react-router-dom'
import { Globe,  Database, ChevronRight, Sparkles, TrendingUp, Users, Award } from 'lucide-react'
import AnimatedPlanet from '../components/AnimatedPlanet'
import OrbitingPlanets from '../components/OrbitingPlanets'
import EnhancedSpaceBackground from '../components/EnhancedSpaceBackground'
import FloatingSpaceParticles from '../components/FloatingSpaceParticles'

function Home() {
  const stats = [
    { icon: Globe, label: "Exoplanets Detected", value: "6022" },
    { icon: Database, label: "Star Count", value: "4495"},
  ]

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms analyze light curve data with 95%+ accuracy"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analysis",
      description: "Get instant results from your astronomical data uploads in seconds"
    },
    {
      icon: Users,
      title: "Collaborative Research",
      description: "Join a community of astronomers and researchers discovering new worlds"
    },
    {
      icon: Award,
      title: "Validated Results",
      description: "All detections are cross-referenced with established astronomical databases"
    }
  ]

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Enhanced Space Background */}
      <EnhancedSpaceBackground enableParticles={true} nebulaDensity={0.7} />
      
      {/* Floating Space Particles */}
      <FloatingSpaceParticles count={30} color="cosmic" />

      {/* Hero Section */}
      <div className="relative z-10 text-center mb-16">
        {/* Animated Planet Hero */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <AnimatedPlanet size="large" variant="primary" />
            {/* Add subtle glow around planet */}
            <div className="absolute inset-0 -m-4 bg-gradient-radial from-indigo-500/20 via-transparent to-transparent rounded-full blur-xl"></div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
            Discover New Worlds
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto drop-shadow-lg">
          Harness the power of artificial intelligence to detect exoplanets from light curve data. 
          Join the next generation of astronomical discovery.
        </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link
             to="/predict"
             className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm border border-indigo-400/30"
           >
             <span>Start Predicting</span>
             <ChevronRight className="w-5 h-5" />
           </Link>
           <Link
             to="/training"
             className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
           >
             <span>Train Model</span>
           </Link>
         </div>
      </div>

      {/* Orbiting Planets Animation */}
      <div className="relative z-10 mb-16">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-4 drop-shadow-lg">
            Planetary Systems in Motion
          </h2>
          <p className="text-gray-400 text-center mb-6 drop-shadow-sm">
            Visualizing the dance of planets around distant stars
          </p>
          <OrbitingPlanets />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg shadow-lg">
                <stat.icon className="w-6 h-6 text-indigo-400 drop-shadow-sm" />
              </div>
              <div>
                <p className="text-sm text-gray-400 drop-shadow-sm">{stat.label}</p>
                <p className="text-3xl font-bold drop-shadow-lg">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-green-400">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="relative z-10 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl">
            Why Choose Our Platform?
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg flex-shrink-0 shadow-lg">
                  <feature.icon className="w-6 h-6 text-indigo-400 drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 drop-shadow-sm">{feature.title}</h3>
                  <p className="text-gray-300 drop-shadow-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Ready to Make History?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto drop-shadow-sm">
          Upload your light curve data and let our AI help you discover the next potentially habitable exoplanet. 
          Every detection brings us closer to answering: Are we alone?
        </p>
         <Link
           to="/predict"
           className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm border border-indigo-400/30"
         >
           <Sparkles className="w-5 h-5" />
           <span>Begin Your Discovery</span>
           <ChevronRight className="w-5 h-5" />
         </Link>
      </div>
    </div>
  )
}

export default Home
