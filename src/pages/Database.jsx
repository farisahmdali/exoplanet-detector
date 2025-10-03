import { useState } from 'react'
import { Search, Filter, Globe, Star, Thermometer, Clock, Ruler, MapPin } from 'lucide-react'

function Database() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock exoplanet data
  const exoplanets = [
    {
      id: 1,
      name: "Kepler-442b",
      starType: "K-type main-sequence",
      orbitalPeriod: "112.3 days",
      radius: "1.34 Earth radii",
      temperature: "233 K",
      habitableZone: true,
      discoveryYear: 2015,
      distance: "1,206 light-years",
      confidence: 94.7
    },
    {
      id: 2,
      name: "TOI-715 b",
      starType: "M-dwarf",
      orbitalPeriod: "19.3 days",
      radius: "1.55 Earth radii",
      temperature: "280 K",
      habitableZone: true,
      discoveryYear: 2024,
      distance: "137 light-years",
      confidence: 98.2
    },
    {
      id: 3,
      name: "HD 40307 g",
      starType: "K-dwarf",
      orbitalPeriod: "197.8 days",
      radius: "1.8 Earth radii",
      temperature: "227 K",
      habitableZone: true,
      discoveryYear: 2012,
      distance: "42 light-years",
      confidence: 89.5
    },
    {
      id: 4,
      name: "TRAPPIST-1e",
      starType: "Ultra-cool dwarf",
      orbitalPeriod: "6.1 days",
      radius: "0.92 Earth radii",
      temperature: "251 K",
      habitableZone: true,
      discoveryYear: 2017,
      distance: "40 light-years",
      confidence: 96.8
    },
    {
      id: 5,
      name: "K2-18 b",
      starType: "M-dwarf",
      orbitalPeriod: "33 days",
      radius: "2.6 Earth radii",
      temperature: "265 K",
      habitableZone: true,
      discoveryYear: 2015,
      distance: "124 light-years",
      confidence: 92.1
    },
    {
      id: 6,
      name: "Proxima Centauri b",
      starType: "M-dwarf",
      orbitalPeriod: "11.2 days",
      radius: "1.17 Earth radii",
      temperature: "234 K",
      habitableZone: true,
      discoveryYear: 2016,
      distance: "4.24 light-years",
      confidence: 99.2
    }
  ]

  const filters = [
    { id: 'all', label: 'All Planets', count: exoplanets.length },
    { id: 'habitable', label: 'Habitable Zone', count: exoplanets.filter(p => p.habitableZone).length },
    { id: 'recent', label: 'Recent Discoveries', count: exoplanets.filter(p => p.discoveryYear >= 2020).length },
    { id: 'nearby', label: 'Nearby (<100 ly)', count: exoplanets.filter(p => parseFloat(p.distance) < 100).length }
  ]

  const filteredPlanets = exoplanets.filter(planet => {
    const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         planet.starType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'habitable' && planet.habitableZone) ||
                         (selectedFilter === 'recent' && planet.discoveryYear >= 2020) ||
                         (selectedFilter === 'nearby' && parseFloat(planet.distance) < 100)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Exoplanet Database
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our comprehensive database of confirmed exoplanets discovered through AI-powered analysis.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by planet name or star type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.id
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {filteredPlanets.length} of {exoplanets.length} exoplanets
        </p>
      </div>

      {/* Planets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlanets.map((planet) => (
          <div
            key={planet.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            {/* Planet Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{planet.name}</h3>
                <p className="text-sm text-gray-400">Discovered {planet.discoveryYear}</p>
              </div>
              {planet.habitableZone && (
                <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <span className="text-xs text-green-400 font-medium">Habitable</span>
                </div>
              )}
            </div>

            {/* Planet Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">{planet.starType}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{planet.orbitalPeriod}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Ruler className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">{planet.radius}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Thermometer className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">{planet.temperature}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{planet.distance}</span>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Detection Confidence</span>
                <span className="text-sm font-semibold text-indigo-300">{planet.confidence}%</span>
              </div>
              <div className="mt-2 w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${planet.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPlanets.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No planets found</h3>
          <p className="text-gray-400">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Database Stats */}
      <div className="mt-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Database Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-300 mb-2">
              {exoplanets.filter(p => p.habitableZone).length}
            </div>
            <div className="text-sm text-gray-400">Potentially Habitable</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-2">
              {Math.round(exoplanets.reduce((acc, p) => acc + p.confidence, 0) / exoplanets.length)}%
            </div>
            <div className="text-sm text-gray-400">Average Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300 mb-2">
              {exoplanets.filter(p => p.discoveryYear >= 2020).length}
            </div>
            <div className="text-sm text-gray-400">Recent Discoveries</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Database
