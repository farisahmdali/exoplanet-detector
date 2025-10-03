import { Outlet, Link, useLocation } from 'react-router-dom'
import {  Activity, Home, Search, Database, Info, Brain, Zap } from 'lucide-react'

function Layout() {
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Predict', href: '/predict', icon: Zap },
    { name: 'Training', href: '/training', icon: Brain },
    { name: 'Database', href: '/database', icon: Database },
    { name: 'About', href: '/about', icon: Info },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-darker via-space-dark to-space-blue text-white">
      {/* Background Stars Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  ExoPlanet Detector
                </h1>
                <p className="text-xs text-gray-400">Advanced AI Detection System</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Status */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
              <Activity className="w-4 h-4 text-green-400" />
              <span>System Online</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4">
            <nav className="flex items-center space-x-1 overflow-x-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-400">
            Powered by Advanced AI & Machine Learning • Exoplanet Database v1.0
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
