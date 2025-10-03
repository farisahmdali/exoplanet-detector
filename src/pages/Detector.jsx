import { useState } from 'react'
import { Upload, Search, Sparkles, Globe, ChevronRight } from 'lucide-react'

function Detector() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setResults(null)
    }
  }

  const handleAnalyze = () => {
    if (!selectedFile) return
    
    setAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setResults({
        exoplanetDetected: true,
        confidence: 94.7,
        planetName: "Kepler-442b",
        starType: "K-type main-sequence",
        orbitalPeriod: "112.3 days",
        radius: "1.34 Earth radii",
        temperature: "233 K",
        habitableZone: true
      })
      setAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Exoplanet Detection System
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Upload your light curve data and let our advanced AI analyze it for potential exoplanet transits.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-semibold">Analyze Light Curve Data</h2>
        </div>
        
        <div className="space-y-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 sm:p-12 text-center hover:border-indigo-400/50 transition-all duration-300">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".csv,.fits,.txt"
              onChange={handleFileSelect}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-indigo-400 animate-float" />
              <p className="text-base sm:text-lg font-medium mb-2">
                {selectedFile ? selectedFile.name : 'Upload Light Curve Data'}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Supports CSV, FITS, or TXT files (Max 50MB)
              </p>
            </label>
          </div>

          {/* File Info */}
          {selectedFile && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-indigo-300">{selectedFile.name}</p>
                  <p className="text-sm text-gray-400">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || analyzing}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-500/50"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Detect Exoplanet</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Exoplanet Detected!</h3>
              <p className="text-sm text-gray-400">Analysis Complete</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <ResultCard label="Planet Name" value={results.planetName} highlight />
            <ResultCard label="Confidence" value={`${results.confidence}%`} highlight />
            <ResultCard label="Star Type" value={results.starType} />
            <ResultCard label="Orbital Period" value={results.orbitalPeriod} />
            <ResultCard label="Radius" value={results.radius} />
            <ResultCard label="Temperature" value={results.temperature} />
            <ResultCard 
              label="Habitable Zone" 
              value={results.habitableZone ? "Yes ✓" : "No"} 
              highlight={results.habitableZone}
            />
            <ResultCard 
              label="Status" 
              value="Candidate Confirmed" 
              highlight 
            />
          </div>

          {results.habitableZone && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-sm text-green-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>This exoplanet is located in the habitable zone - potential for life!</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
              Save Results
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
              Export Data
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
              Analyze Another
            </button>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-medium text-white mb-2">Supported File Formats:</h4>
            <ul className="space-y-1">
              <li>• CSV - Comma-separated values</li>
              <li>• FITS - Flexible Image Transport System</li>
              <li>• TXT - Plain text data files</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Data Requirements:</h4>
            <ul className="space-y-1">
              <li>• Time series photometric data</li>
              <li>• Minimum 1000 data points</li>
              <li>• Normalized flux measurements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 ${
      highlight 
        ? 'bg-indigo-500/10 border-indigo-500/40' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}>
      <p className="text-xs sm:text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-base sm:text-lg font-semibold ${highlight ? 'text-indigo-300' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}

export default Detector
