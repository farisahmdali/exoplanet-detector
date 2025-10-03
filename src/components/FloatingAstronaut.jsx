function FloatingAstronaut() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Astronaut container with floating animation */}
      <div className="animate-[float_6s_ease-in-out_infinite]">
        {/* Astronaut body */}
        <div className="relative">
          {/* Helmet */}
          <div className="relative w-20 h-20 mx-auto">
            {/* Glass reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/40 via-transparent to-transparent border-4 border-gray-300/50 backdrop-blur-sm"></div>
            
            {/* Helmet glow */}
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl"></div>
            
            {/* Face/Visor */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-blue-300/30">
              {/* Reflection */}
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60 blur-sm"></div>
            </div>
          </div>

          {/* Body */}
          <div className="relative mt-2">
            <div className="w-16 h-20 mx-auto rounded-t-3xl rounded-b-2xl bg-gradient-to-b from-gray-200 to-gray-300 border-2 border-gray-400/50">
              {/* Chest control panel */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded border border-blue-300/50 flex items-center justify-center gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Arms */}
            <div className="absolute top-2 -left-4 w-6 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full border-2 border-gray-400/50 transform rotate-12"></div>
            <div className="absolute top-2 -right-4 w-6 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full border-2 border-gray-400/50 transform -rotate-12"></div>

            {/* Legs */}
            <div className="absolute -bottom-2 left-2 w-5 h-10 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full border-2 border-gray-400/50"></div>
            <div className="absolute -bottom-2 right-2 w-5 h-10 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full border-2 border-gray-400/50"></div>
          </div>

          {/* Backpack with thrusters */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 -z-10">
            <div className="w-12 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded border-2 border-gray-600/50">
              {/* Thruster flames */}
              <div className="absolute -bottom-8 left-2 w-2 h-8 bg-gradient-to-b from-orange-400 via-red-500 to-transparent rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 left-5 w-2 h-6 bg-gradient-to-b from-blue-400 via-cyan-500 to-transparent rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute -bottom-7 left-8 w-2 h-7 bg-gradient-to-b from-orange-400 via-yellow-500 to-transparent rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>

          {/* Floating particles around astronaut */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/40 rounded-full blur-sm"
              style={{
                top: `${20 + Math.sin(i) * 40}%`,
                left: `${50 + Math.cos(i) * 60}px`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  )
}

export default FloatingAstronaut


