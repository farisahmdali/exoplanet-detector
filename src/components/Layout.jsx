import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Zap, Brain, Menu } from 'lucide-react'

function Layout() {
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Predict', href: '/predict', icon: Zap },
    { name: 'Training', href: '/training', icon: Brain },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-dark-bg bg-grid">
      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Bold and Minimalist */}
            <Link to="/" className="group flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-neon-cyan rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-dark-bg rounded-full"></div>
              </div>
              <div>
                <h1 className="heading-tertiary text-contrast-high group-hover:text-neon-cyan transition-colors">
                  EXOPLANET
                </h1>
                <p className="text-xs text-contrast-low font-mono uppercase tracking-wider">
                  AI DETECTOR
                </p>
              </div>
            </Link>

            {/* Navigation - Clean and Bold */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-neon-cyan text-dark-bg shadow-lg shadow-neon-cyan/30'
                      : 'text-contrast-medium hover:text-contrast-high hover:bg-dark-hover'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-mono uppercase tracking-wide text-sm">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg bg-dark-hover text-contrast-medium hover:text-contrast-high transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4 border-t border-dark-border mt-4 pt-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-neon-cyan text-dark-bg shadow-lg shadow-neon-cyan/30'
                      : 'text-contrast-medium hover:text-contrast-high hover:bg-dark-hover'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-mono uppercase tracking-wide">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Minimalist Footer */}
      <footer className="border-t border-dark-border mt-20">
        <div className="max-w-7xl mx-auto container-padding py-8">
          <div className="text-center">
            <p className="text-contrast-low font-mono text-sm">
              POWERED BY <span className="text-neon-cyan">AI</span> • EXOPLANET DATABASE v2.0
            </p>
            <div className="mt-2 flex justify-center space-x-4 text-xs text-contrast-low">
              <span>HIGH CONTRAST</span>
              <span>•</span>
              <span>MINIMALIST DESIGN</span>
              <span>•</span>
              <span>DARK MODE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
