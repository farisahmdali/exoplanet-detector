import { Brain, Users, Award, Github, Mail, Globe, Sparkles } from 'lucide-react'

function About() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead Astrophysicist",
      description: "PhD in Astrophysics from MIT, specializing in exoplanet detection methods.",
      avatar: "SC"
    },
    {
      name: "Alex Rodriguez",
      role: "AI/ML Engineer",
      description: "Expert in machine learning algorithms for astronomical data analysis.",
      avatar: "AR"
    },
    {
      name: "Dr. Michael Johnson",
      role: "Data Scientist",
      description: "Specialist in time-series analysis and statistical modeling.",
      avatar: "MJ"
    },
    {
      name: "Emma Thompson",
      role: "Software Engineer",
      description: "Full-stack developer focused on creating intuitive scientific tools.",
      avatar: "ET"
    }
  ]

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "Our neural networks are trained on thousands of confirmed exoplanet detections from Kepler, TESS, and other space missions."
    },
    {
      icon: Brain,
      title: "Multi-Mission Support",
      description: "Compatible with data from various space telescopes and ground-based observatories worldwide."
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      description: "Built for astronomers, researchers, and citizen scientists to work together in discovering new worlds."
    },
    {
      icon: Award,
      title: "Peer-Reviewed Methods",
      description: "Our detection algorithms are based on published research and validated by the astronomical community."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            About ExoPlanet Detector
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          We're on a mission to democratize exoplanet discovery by making advanced AI detection tools 
          accessible to researchers and enthusiasts worldwide.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 mb-16">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold">Our Mission</h2>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          Every day, space telescopes collect terabytes of photometric data that could contain the signature 
          of the next Earth-like exoplanet. Our platform harnesses the power of artificial intelligence to 
          analyze this data faster and more accurately than ever before, bringing us closer to answering 
          one of humanity's greatest questions: Are we alone in the universe?
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            What Makes Us Different
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Meet Our Team
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-indigo-300 text-sm mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Technology Stack
          </span>
        </h2>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-300">Machine Learning</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• TensorFlow & PyTorch</li>
                <li>• Convolutional Neural Networks</li>
                <li>• Time Series Analysis</li>
                <li>• Statistical Modeling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Data Processing</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Python & NumPy</li>
                <li>• Astropy & SciPy</li>
                <li>• FITS File Handling</li>
                <li>• Signal Processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-300">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• React & TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• D3.js Visualizations</li>
                <li>• Progressive Web App</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Have questions about our platform? Want to collaborate on research? 
          We'd love to hear from you!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@exoplanetdetector.com"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            <Mail className="w-5 h-5" />
            <span>Email Us</span>
          </a>
          <a
            href="https://github.com/exoplanet-detector"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
          <a
            href="https://exoplanetdetector.com"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            <Globe className="w-5 h-5" />
            <span>Visit Website</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
