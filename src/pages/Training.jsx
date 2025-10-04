import { useState } from 'react'
import { Upload, Download, Zap, CheckCircle, AlertCircle, Info, BarChart3, Brain, Settings, FileText, Activity } from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'

function Training() {
  const [trainingFile, setTrainingFile] = useState(null)
  const [training, setTraining] = useState(false)
  const [trainingResults, setTrainingResults] = useState(null)
  const [error, setError] = useState(null)
  const [modelName, setModelName] = useState('')
  
  // Hyperparameters
  const [hyperparameters, setHyperparameters] = useState({
    model_type: 'random_forest',
    test_size: 0.2,
    random_state: 42,
    // Random Forest params
    n_estimators: 200,
    max_depth: 50,
    min_samples_split: 2,
    criterion: 'gini',
    class_weight: 'balanced',
    // LightGBM params
    learning_rate: 0.1,
    num_leaves: 31,
  })

  const requiredColumns = [
    'koi_fpflag_ss', 'koi_fpflag_ec', 'koi_period', 'koi_time0bk',
    'koi_impact', 'koi_duration', 'koi_depth', 'koi_prad',
    'koi_teq', 'koi_insol', 'koi_model_snr', 'koi_tce_plnt_num',
    'koi_steff', 'koi_slogg', 'koi_srad', 'ra', 'dec', 'koi_kepmag',
    'koi_disposition' // Target column (CONFIRMED or FALSE POSITIVE)
  ]

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a CSV file')
        return
      }
      setTrainingFile(file)
      setError(null)
      setTrainingResults(null)
    }
  }

  const handleHyperparameterChange = (param, value) => {
    setHyperparameters(prev => ({
      ...prev,
      [param]: value
    }))
  }

  const handleTrainModel = async () => {
    if (!trainingFile) {
      setError('Please upload a training CSV file')
      return
    }

    if (!modelName.trim()) {
      setError('Please enter a model name')
      return
    }

    setTraining(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('training_file', trainingFile)
      formData.append('model_name', modelName)
      
      // Add hyperparameters
      Object.keys(hyperparameters).forEach(key => {
        formData.append(key, hyperparameters[key])
      })
      
      const response = await fetch(API_ENDPOINTS.TRAIN, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Training failed')
      }
      
      const data = await response.json()
      setTrainingResults(data)
      setTraining(false)
      
    } catch (error) {
      console.error('Training error:', error)
      setError(error.message || 'Failed to train model. Please check your data and try again.')
      setTraining(false)
    }
  }

  const downloadModel = async () => {
    if (!trainingResults || !trainingResults.model_filename) return
    
    try {
      const response = await fetch(`${API_ENDPOINTS.TRAIN}/download/${trainingResults.model_filename}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = trainingResults.model_filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      setError('Failed to download model')
    }
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight"
            style={{
              WebkitTextStroke: '2px black',
              WebkitTextFillColor: 'transparent',
              textStroke: '2px black'
            }}>
          RESOURCES & EDUCATION
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium">
          Upload your training data and create a custom exoplanet detection model
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Training Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Training in Progress */}
          {training && (
            <div className="bg-white border-4 border-black rounded-none p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Activity className="w-16 h-16 text-black animate-pulse" />
                <div className="text-center">
                  <h3 className="text-xl font-black mb-2 tracking-wider">TRAINING MODEL...</h3>
                  <p className="text-gray-600 text-sm font-medium">AI is learning from your data. This may take a few minutes.</p>
                </div>
                <div className="w-full max-w-md">
                  <div className="h-3 bg-gray-200 border-2 border-black overflow-hidden">
                    <div className="h-full bg-black animate-[shimmer_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* File Upload Section */}
          <div className="bg-white border-4 border-black rounded-none p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="w-6 h-6 text-black" />
              <h2 className="text-xl font-black tracking-wide">UPLOAD TRAINING DATA</h2>
            </div>

            {/* Model Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-black mb-2">
                Model Name
              </label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="e.g., my-exoplanet-model-v1"
                className="w-full px-4 py-2 bg-gray-50 border-2 border-black rounded-none text-black font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* File Upload Area */}
            <div className="mb-6">
              <label
                htmlFor="training-upload"
                className={`flex flex-col items-center justify-center w-full h-48 border-4 border-dashed rounded-none cursor-pointer transition-all duration-200 ${
                  trainingFile
                    ? 'border-black bg-green-50'
                    : 'border-black bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {trainingFile ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-black mb-3" />
                      <p className="mb-2 text-sm text-black font-bold">
                        {trainingFile.name}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        {(trainingFile.size / 1024).toFixed(2)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <FileText className="w-12 h-12 text-gray-600 mb-3" />
                      <p className="mb-2 text-sm text-black font-medium">
                        <span className="font-bold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        CSV file with labeled training data
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="training-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Required Columns Info */}
            <div className="bg-blue-50 border-2 border-black rounded-none p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <div className="text-sm text-black">
                  <p className="font-bold mb-2">Required CSV Columns (19 total):</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {requiredColumns.map((col) => (
                      <div key={col} className="bg-white px-2 py-1 rounded border border-black">
                        <code className={col === 'koi_disposition' ? 'text-black font-extrabold' : 'font-medium'}>
                          {col}
                        </code>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-black">
                    <strong>koi_disposition</strong> must contain "CONFIRMED" or "FALSE POSITIVE"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hyperparameters Section */}
          <div className="bg-white border-4 border-black rounded-none p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-black" />
              <h2 className="text-xl font-black tracking-wide">MODEL CONFIGURATION</h2>
            </div>

            <div className="space-y-6">
              {/* Model Type */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Algorithm
                </label>
                <select
                  value={hyperparameters.model_type}
                  onChange={(e) => handleHyperparameterChange('model_type', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border-2 border-black rounded-none text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="random_forest">Random Forest (Recommended)</option>
                  <option value="lightgbm">LightGBM (Best Performance)</option>
                  <option value="logistic_regression">Logistic Regression</option>
                </select>
              </div>

              {/* Test Size */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Test Split Ratio: {(hyperparameters.test_size * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.4"
                  step="0.05"
                  value={hyperparameters.test_size}
                  onChange={(e) => handleHyperparameterChange('test_size', parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Training: {(100 - hyperparameters.test_size * 100).toFixed(0)}% | Testing: {(hyperparameters.test_size * 100).toFixed(0)}%
                </p>
              </div>

              {/* Random Forest Hyperparameters */}
              {hyperparameters.model_type === 'random_forest' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Number of Trees: {hyperparameters.n_estimators}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="50"
                      value={hyperparameters.n_estimators}
                      onChange={(e) => handleHyperparameterChange('n_estimators', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Max Depth: {hyperparameters.max_depth === 100 ? 'None' : hyperparameters.max_depth}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={hyperparameters.max_depth}
                      onChange={(e) => handleHyperparameterChange('max_depth', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Class Weight
                    </label>
                    <select
                      value={hyperparameters.class_weight}
                      onChange={(e) => handleHyperparameterChange('class_weight', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border-2 border-black rounded-none text-black font-medium focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="balanced">Balanced (Handle imbalanced data)</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </>
              )}

              {/* LightGBM Hyperparameters */}
              {hyperparameters.model_type === 'lightgbm' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Learning Rate: {hyperparameters.learning_rate}
                    </label>
                    <input
                      type="range"
                      min="0.01"
                      max="0.3"
                      step="0.01"
                      value={hyperparameters.learning_rate}
                      onChange={(e) => handleHyperparameterChange('learning_rate', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Number of Leaves: {hyperparameters.num_leaves}
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="10"
                      value={hyperparameters.num_leaves}
                      onChange={(e) => handleHyperparameterChange('num_leaves', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-4 border-red-600 rounded-none p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <p className="font-bold mb-1">ERROR</p>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Train Button */}
          <button
            onClick={handleTrainModel}
            disabled={training || !trainingFile}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-none border-4 border-black flex items-center justify-center space-x-2 transition-all duration-200"
          >
            {training ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>TRAINING...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>START TRAINING</span>
              </>
            )}
          </button>

          {/* Training Results */}
          {trainingResults && (
            <div className="bg-green-50 border-4 border-black rounded-none p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-6 h-6 text-black" />
                <h3 className="text-xl font-black tracking-wider">TRAINING COMPLETE!</h3>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border-2 border-black rounded-none p-4 text-center">
                  <p className="text-sm text-gray-600 font-bold mb-1">Training Accuracy</p>
                  <p className="text-2xl font-black text-black">{trainingResults.train_accuracy}%</p>
                </div>
                <div className="bg-white border-2 border-black rounded-none p-4 text-center">
                  <p className="text-sm text-gray-600 font-bold mb-1">Test Accuracy</p>
                  <p className="text-2xl font-black text-black">{trainingResults.test_accuracy}%</p>
                </div>
                <div className="bg-white border-2 border-black rounded-none p-4 text-center">
                  <p className="text-sm text-gray-600 font-bold mb-1">Precision</p>
                  <p className="text-2xl font-black text-black">{trainingResults.precision}%</p>
                </div>
                <div className="bg-white border-2 border-black rounded-none p-4 text-center">
                  <p className="text-sm text-gray-600 font-bold mb-1">Recall</p>
                  <p className="text-2xl font-black text-black">{trainingResults.recall}%</p>
                </div>
              </div>

              {/* Classification Report */}
              <div className="bg-white border-2 border-black rounded-none p-4 mb-6">
                <h4 className="font-black mb-3 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-black" />
                  <span>CLASSIFICATION REPORT</span>
                </h4>
                <pre className="text-xs bg-gray-100 border-2 border-black p-3 rounded-none overflow-x-auto font-mono">
                  {trainingResults.classification_report}
                </pre>
              </div>

              {/* Training Info */}
              <div className="bg-white border-2 border-black rounded-none p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 font-bold">Model Type:</span>
                    <p className="font-black text-black">{trainingResults.model_type}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-bold">Training Time:</span>
                    <p className="font-black text-black">{trainingResults.training_time}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-bold">Training Samples:</span>
                    <p className="font-black text-black">{trainingResults.train_samples}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 font-bold">Test Samples:</span>
                    <p className="font-black text-black">{trainingResults.test_samples}</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadModel}
                className="w-full bg-black hover:bg-gray-800 border-4 border-black text-white font-bold py-3 px-6 rounded-none flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span>DOWNLOAD TRAINED MODEL</span>
              </button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Training Steps */}
          <div className="bg-white border-4 border-black rounded-none p-6">
            <h3 className="text-lg font-black mb-4 tracking-wide">TRAINING STEPS</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                <span className="text-gray-700 font-medium">Upload CSV with training data (must include target column)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                <span className="text-gray-700 font-medium">Choose algorithm and configure hyperparameters</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                <span className="text-gray-700 font-medium">Data is automatically split (default: 80% train, 20% test)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                <span className="text-gray-700 font-medium">Model is trained and evaluated</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                <span className="text-gray-700 font-medium">Download trained model for predictions</span>
              </li>
            </ol>
          </div>

          {/* Algorithm Info */}
          <div className="bg-white border-4 border-black rounded-none p-6">
            <h3 className="text-lg font-black mb-4 tracking-wide">ALGORITHMS</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-black text-black mb-1">Random Forest</h4>
                <p className="text-gray-700 text-xs font-medium">Ensemble learning, robust, ~96% accuracy. Best for balanced data.</p>
              </div>
              <div>
                <h4 className="font-black text-black mb-1">LightGBM</h4>
                <p className="text-gray-700 text-xs font-medium">Gradient boosting, fastest, ~96-98% accuracy. Best overall performance.</p>
              </div>
              <div>
                <h4 className="font-black text-black mb-1">Logistic Regression</h4>
                <p className="text-gray-700 text-xs font-medium">Linear model, fast, ~91% accuracy. Good baseline model.</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border-2 border-black rounded-none p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
              <div className="text-sm text-black">
                <p className="font-bold mb-1">TIPS:</p>
                <ul className="space-y-1 text-xs font-medium">
                  <li>• Use at least 1000 rows for good results</li>
                  <li>• Ensure balanced classes (CONFIRMED vs FALSE POSITIVE)</li>
                  <li>• Remove rows with null values before upload</li>
                  <li>• LightGBM performs best on this dataset</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Training
