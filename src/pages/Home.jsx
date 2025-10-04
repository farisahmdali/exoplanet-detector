import { Link } from 'react-router-dom'
import { Globe, Database, ChevronRight, Zap, Brain, Target } from 'lucide-react'

function Home() {
  const stats = [
    { icon: Globe, label: "EXOPLANETS DETECTED", value: "6,022", accent: "neon-cyan" },
    { icon: Database, label: "STELLAR SYSTEMS", value: "4,495", accent: "neon-green" },
  ]

  const features = [
    {
      icon: Brain,
      title: "DETECTION ENGINE",
      description: "Advanced machine learning models analyze light curve patterns with 95%+ accuracy",
      accent: "neon-cyan"
    },
    {
      icon: Zap,
      title: "REAL-TIME ANALYSIS",
      description: "Instant processing of astronomical data uploads in milliseconds",
      accent: "neon-green"
    },
    {
      icon: Target,
      title: "PRECISION TARGETING",
      description: "Cross-referenced with established databases for validated results",
      accent: "neon-purple"
    }
  ]

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        
        {/* Hero Section - Minimalist and Bold */}
        <section className="text-center mb-20">
          {/* Main Heading */}
          <h1 className="heading-primary mb-6">
            DISCOVER
            <br />
            <span className="text-neon animate-glow">NEW WORLDS</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-contrast-medium mb-12 max-w-3xl mx-auto font-light">
            Harness artificial intelligence to detect exoplanets from light curve data.
            <br />
            <span className="text-contrast-high font-semibold">Join the next generation of astronomical discovery.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/predict" className="btn-primary">
              <Zap className="w-5 h-5 mr-2" />
              START PREDICTING
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/training" className="btn-secondary">
              <Brain className="w-5 h-5 mr-2" />
              TRAIN MODEL
            </Link>
          </div>

          {/* Visual Separator */}
          <div className="w-24 h-0.5 bg-neon-cyan mx-auto mb-16 animate-neon-pulse"></div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="card-dark group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-contrast-low font-mono text-sm mb-2 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className={`text-4xl font-black text-${stat.accent} group-hover:animate-glow`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 bg-${stat.accent}/10 rounded-xl`}>
                    <stat.icon className={`w-8 h-8 text-${stat.accent}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="heading-secondary text-center mb-16">
            WHY CHOOSE OUR <span className="text-neon">PLATFORM</span>?
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-dark group text-center">
                <div className={`w-16 h-16 bg-${feature.accent}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-${feature.accent}/20 transition-colors`}>
                  <feature.icon className={`w-8 h-8 text-${feature.accent} group-hover:animate-glow`} />
                </div>
                <h3 className="heading-tertiary mb-4 font-mono uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-contrast-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card-dark max-w-4xl mx-auto">
            <h2 className="heading-secondary mb-6">
              READY TO MAKE <span className="text-neon">HISTORY</span>?
            </h2>
            <p className="text-contrast-medium mb-8 text-lg leading-relaxed">
              Upload your light curve data and let our AI help you discover the next potentially habitable exoplanet.
              <br />
              <span className="text-neon-cyan font-semibold">Every detection brings us closer to answering: Are we alone?</span>
            </p>
            
            <Link to="/predict" className="btn-primary inline-flex items-center">
              <Target className="w-5 h-5 mr-2" />
              BEGIN DISCOVERY
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home
