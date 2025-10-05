import { Outlet, Link, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen">
      {/* Navigation - Only show on non-home pages */}
      {!isHomePage && (
        <nav className="absolute top-0 left-0 right-0 z-20 py-8 px-8 bg-dark-bg/50 backdrop-blur-sm">
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
      )}

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
