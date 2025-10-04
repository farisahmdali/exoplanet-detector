import { useState } from 'react'
import { BarChart3, TrendingUp, Eye, EyeOff } from 'lucide-react'

function FeatureImportance({ featureImportance, modelId }) {
  const [viewMode, setViewMode] = useState('heatmap') // Default to heatmap view
  const [showDetails, setShowDetails] = useState(false)

  // Mock feature importance data if not provided
  const mockFeatureImportance = [
    { feature: 'koi_period', importance: 0.245, description: 'Orbital period in days', category: 'orbital' },
    { feature: 'koi_depth', importance: 0.198, description: 'Transit depth in ppm', category: 'transit' },
    { feature: 'koi_model_snr', importance: 0.156, description: 'Signal-to-noise ratio', category: 'measurement' },
    { feature: 'koi_prad', importance: 0.134, description: 'Planet radius in Earth radii', category: 'physical' },
    { feature: 'koi_duration', importance: 0.089, description: 'Transit duration in hours', category: 'transit' },
    { feature: 'koi_steff', importance: 0.076, description: 'Stellar effective temperature', category: 'stellar' },
    { feature: 'koi_teq', importance: 0.071, description: 'Equilibrium temperature', category: 'physical' },
    { feature: 'koi_impact', importance: 0.031, description: 'Impact parameter', category: 'orbital' },
    { feature: 'koi_insol', importance: 0.028, description: 'Insolation flux', category: 'physical' },
    { feature: 'koi_slogg', importance: 0.024, description: 'Stellar surface gravity', category: 'stellar' },
    { feature: 'koi_srad', importance: 0.019, description: 'Stellar radius in solar radii', category: 'stellar' },
    { feature: 'koi_kepmag', importance: 0.017, description: 'Kepler magnitude', category: 'measurement' },
    { feature: 'koi_fpflag_ss', importance: 0.008, description: 'Stellar eclipse flag', category: 'flags' },
    { feature: 'koi_fpflag_ec', importance: 0.004, description: 'Eclipsing binary flag', category: 'flags' }
  ]

  const features = featureImportance || mockFeatureImportance
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance)

  const getImportanceColor = (importance) => {
    if (importance > 0.15) return 'from-red-500 to-orange-500'
    if (importance > 0.08) return 'from-orange-500 to-yellow-500'
    if (importance > 0.04) return 'from-yellow-500 to-green-500'
    return 'from-green-500 to-blue-500'
  }

  const getImportanceLevel = (importance) => {
    if (importance > 0.15) return { level: 'Critical', color: 'text-red-400' }
    if (importance > 0.08) return { level: 'High', color: 'text-orange-400' }
    if (importance > 0.04) return { level: 'Medium', color: 'text-yellow-400' }
    return { level: 'Low', color: 'text-green-400' }
  }

  const getCategoryColor = (category) => {
    const colors = {
      orbital: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      transit: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      physical: 'bg-green-500/20 text-green-400 border-green-500/40',
      stellar: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
      measurement: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
      flags: 'bg-gray-500/20 text-gray-400 border-gray-500/40'
    }
    return colors[category] || colors.measurement
  }

  // Create heatmap grid (responsive and compact)
  const createHeatmapGrid = () => {
    const grid = []
    const maxFeatures = Math.min(sortedFeatures.length, 8) // Limit to 8 features for compact view
    
    for (let i = 0; i < maxFeatures; i++) {
      const feature = sortedFeatures[i]
      const intensity = feature.importance
      
      grid.push(
        <div
          key={feature.feature}
          className="relative group"
          style={{
            backgroundColor: `rgba(${intensity > 0.15 ? '239, 68, 68' : 
                               intensity > 0.08 ? '245, 158, 11' : 
                               intensity > 0.04 ? '34, 197, 94' : '59, 130, 246'}, ${Math.min(intensity * 4, 0.8)})`,
          }}
        >
          <div className="aspect-square flex items-center justify-center p-1 border border-white/10 hover:border-white/30 transition-colors min-h-[40px] sm:min-h-[50px]">
            <div className="text-center">
              <div className="text-xs font-medium text-white truncate mb-1 max-w-full">
                {feature.feature.replace('koi_', '').substring(0, 6)}
              </div>
              <div className="text-xs text-gray-300">
                {(feature.importance * 100).toFixed(0)}%
              </div>
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap max-w-48">
            <div className="font-medium">{feature.feature}</div>
            <div className="text-gray-300 text-xs truncate">{feature.description.substring(0, 40)}...</div>
            <div className="text-indigo-300 text-xs">Importance: {(feature.importance * 100).toFixed(1)}%</div>
            {feature.coefficient && (
              <div className={`text-xs ${feature.coefficient < 0 ? 'text-red-300' : 'text-green-300'}`}>
                Coeff: {feature.coefficient.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      )
    }
    
    return grid
  }

  return (
    <div className="space-y-3 sm:space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" /> */}
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">Feature Importance</h3>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {showDetails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span className="hidden sm:inline">{showDetails ? 'Hide' : 'Show'}</span>
          </button>
          <div className="bg-white/10 rounded-lg p-0.5 flex">
            <button
              onClick={() => setViewMode('list')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                viewMode === 'heatmap'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Map
            </button>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-2 sm:p-3">
        <div className="flex items-start space-x-2">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-indigo-300 min-w-0">
            <p className="font-medium mb-1 truncate">Model: {modelId || 'kepler-v2'}</p>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Based on actual coefficients. Negative values show inverse relationships.
            </p>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-1.5 sm:space-y-2 max-h-64 overflow-y-auto">
          {sortedFeatures.slice(0, 6).map((feature, index) => {
            const importanceLevel = getImportanceLevel(feature.importance)
            
            return (
              <div
                key={feature.feature}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 sm:p-3 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1">
                    <div className="text-xs font-bold text-gray-400 w-3 sm:w-4 flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-xs truncate">
                        {feature.feature}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        {feature.description.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {(feature.importance * 100).toFixed(1)}%
                    </div>
                    <div className={`text-xs font-medium ${importanceLevel.color}`}>
                      {importanceLevel.level}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-1">
                  <div className="w-full bg-white/20 rounded-full h-1 sm:h-1.5">
                    <div
                      className={`bg-gradient-to-r ${getImportanceColor(feature.importance)} h-1 sm:h-1.5 rounded-full transition-all duration-500`}
                      style={{ width: `${(feature.importance / Math.max(...features.map(f => f.importance))) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Category and Details */}
                {showDetails && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(feature.category)} w-fit`}>
                        {feature.category}
                      </span>
                      {feature.coefficient && (
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          feature.coefficient < 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {feature.coefficient.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {((feature.importance / features.reduce((sum, f) => sum + f.importance, 0)) * 100).toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Heatmap View */}
      {viewMode === 'heatmap' && (
        <div className="space-y-2 sm:space-y-3">
          <div className="text-center">
            <h4 className="text-sm sm:text-base font-semibold text-white mb-1">Feature Heatmap</h4>
            <p className="text-xs text-gray-400">
              Color intensity = importance (Red: Critical, Orange: High, Yellow: Medium, Blue: Low)
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 sm:p-3 overflow-hidden">
            {/* Responsive Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 mb-3 max-h-40 overflow-hidden">
              {createHeatmapGrid()}
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded flex-shrink-0"></div>
                <span className="text-gray-300 truncate">Critical</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded flex-shrink-0"></div>
                <span className="text-gray-300 truncate">High</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded flex-shrink-0"></div>
                <span className="text-gray-300 truncate">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded flex-shrink-0"></div>
                <span className="text-gray-300 truncate">Low</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Top</p>
          <p className="text-xs font-bold text-white truncate">{sortedFeatures[0]?.feature.replace('koi_', '').substring(0, 8)}</p>
          <p className="text-xs text-indigo-400">{(sortedFeatures[0]?.importance * 100).toFixed(0)}%</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Critical</p>
          <p className="text-sm font-bold text-red-400">
            {sortedFeatures.filter(f => f.importance > 0.15).length}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center border border-white/10">
          <p className="text-xs text-gray-400 mb-1">High</p>
          <p className="text-sm font-bold text-orange-400">
            {sortedFeatures.filter(f => f.importance > 0.08 && f.importance <= 0.15).length}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Total</p>
          <p className="text-sm font-bold text-white">{Math.min(sortedFeatures.length, 12)}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureImportance
