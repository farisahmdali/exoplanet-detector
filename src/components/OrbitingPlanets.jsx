function OrbitingPlanets() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Central Star */}
      <div className="absolute z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-2xl shadow-orange-500/50">
          {/* Star glow */}
          <div className="absolute inset-0 rounded-full bg-yellow-200 blur-xl opacity-60 animate-pulse"></div>
        </div>
      </div>

      {/* Orbit paths */}
      <div className="absolute w-32 h-32 border border-white/10 rounded-full"></div>
      <div className="absolute w-48 h-48 border border-white/10 rounded-full"></div>
      <div className="absolute w-64 h-64 border border-white/10 rounded-full"></div>

      {/* Planet 1 - Fast orbit */}
      <div className="absolute w-32 h-32 animate-[spin_8s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></div>
        </div>
      </div>

      {/* Planet 2 - Medium orbit */}
      <div className="absolute w-48 h-48 animate-[spin_15s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-500/50">
            {/* Planet rings */}
            <div className="absolute inset-0 -m-2">
              <div className="w-10 h-10 border-2 border-purple-300/30 rounded-full transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Planet 3 - Slow orbit */}
      <div className="absolute w-64 h-64 animate-[spin_25s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/50"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default OrbitingPlanets


