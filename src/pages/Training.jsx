import { useState } from 'react'
import { Upload, Download, Zap, CheckCircle, AlertCircle, Info, BarChart3, Brain, Settings, FileText, Activity } from 'lucide-react'
import { API_ENDPOINTS } from '../config/api'
import StarField from '../components/StarField'
import {featureNames} from '../config/constants'

function Training() {
  const [trainingFile, setTrainingFile] = useState(null)
  const [training, setTraining] = useState(false)
  const [trainingResults, setTrainingResults] = useState(null)
  const [error, setError] = useState(null)
  const [modelName, setModelName] = useState('')

  // Random Forest Hyperparameters
  const [hyperparameters, setHyperparameters] = useState({
    model_type: 'random_forest',
    test_size: 0.2,
    random_state: 42,
    // Random Forest params
    n_estimators: 200,
    max_depth: 50,
    min_samples_split: 2,
    min_samples_leaf: 1,
    max_features: 'sqrt',
    criterion: 'gini',
    class_weight: 'balanced',
    bootstrap: true,
    max_samples: 1.0,
    min_weight_fraction_leaf: 0.0,
    max_leaf_nodes: null,
    min_impurity_decrease: 0.0,
    oob_score: true
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
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ">
      {/* Animated Star Field Background */}
      <div className="fixed inset-0 -z-10">
        <StarField density={150} speed={0.3} />
      </div>

      {/* Page Header */}
      <div className="text-center mb-6 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            Training Lab
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Train your own Random Forest model with comprehensive hyperparameter tuning
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Training Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Training in Progress */}
          {training && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Activity className="w-16 h-16 text-indigo-400 animate-pulse" />
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-white">Training Model...</h3>
                  <p className="text-gray-300 text-sm">AI is learning from your data. This may take a few minutes.</p>
                </div>
                <div className="w-full max-w-md">
                  <div className="h-3 bg-white/20 border border-white/30 rounded-lg overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-[shimmer_2s_ease-in-out_infinite] rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* File Upload Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Upload Training Data</h2>
            </div>

            {/* Model Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Model Name
              </label>
              <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="e.g., my-exoplanet-model-v1"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* File Upload Area */}
            <div className="mb-4">
              <label
                htmlFor="training-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${trainingFile
                    ? 'border-indigo-400 bg-indigo-500/10'
                    : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50'
                  }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {trainingFile ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-indigo-400 mb-3" />
                      <p className="mb-2 text-sm text-white font-semibold">
                        {trainingFile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(trainingFile.size / 1024).toFixed(2)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <FileText className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-white">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
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
            <div className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-400/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="font-semibold mb-2 text-white">Required CSV Columns (19 total):</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {requiredColumns.map((col) => (
                      <div key={col} className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
                        <code className={col === 'koi_disposition' ? 'text-indigo-300 font-bold' : 'text-gray-300'}>
                          {col} ({featureNames?.[col] || "Unknown"})
                        </code>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    <strong className="text-indigo-300">koi_disposition</strong> must contain "CONFIRMED" or "FALSE POSITIVE"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hyperparameters Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Model Configuration</h2>
            </div>

            <div className="space-y-4">
              {/* Model Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Algorithm
                </label>
                <div className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium">Random Forest Classifier</div>
                <p className="text-xs text-gray-400 mt-1">Ensemble learning method with comprehensive hyperparameter tuning</p>
              </div>

              {/* Test Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Test Split Ratio: {(hyperparameters.test_size * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.4"
                  step="0.05"
                  value={hyperparameters.test_size}
                  onChange={(e) => handleHyperparameterChange('test_size', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Training: {(100 - hyperparameters.test_size * 100).toFixed(0)}% | Testing: {(hyperparameters.test_size * 100).toFixed(0)}%
                </p>
              </div>

              {/* Random Forest Hyperparameters - Comprehensive Tuning */}
              <>
                {/* Tree Structure Parameters */}
                <div className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-400/30 rounded-xl p-3 space-y-3">
                  <h4 className="text-sm font-bold text-indigo-300 mb-2">Tree Structure</h4>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Number of Trees: {hyperparameters.n_estimators}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={hyperparameters.n_estimators}
                      onChange={(e) => handleHyperparameterChange('n_estimators', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">More trees = better performance but slower training</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Max Depth: {hyperparameters.max_depth === 100 ? 'None' : hyperparameters.max_depth}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={hyperparameters.max_depth}
                      onChange={(e) => handleHyperparameterChange('max_depth', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum depth of trees (100 = no limit)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Min Samples Split: {hyperparameters.min_samples_split}
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      step="1"
                      value={hyperparameters.min_samples_split}
                      onChange={(e) => handleHyperparameterChange('min_samples_split', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Minimum samples required to split a node</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Min Samples Leaf: {hyperparameters.min_samples_leaf}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={hyperparameters.min_samples_leaf}
                      onChange={(e) => handleHyperparameterChange('min_samples_leaf', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Minimum samples required at a leaf node</p>
                  </div>
                </div>

                {/* Feature Selection Parameters */}
                <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-400/30 rounded-xl p-3 space-y-3">
                  <h4 className="text-sm font-bold text-purple-300 mb-2">Feature Selection</h4>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Max Features
                    </label>
                    <select
                      value={hyperparameters.max_features}
                      onChange={(e) => handleHyperparameterChange('max_features', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="sqrt" className="bg-gray-800 text-white">sqrt (√n_features)</option>
                      <option value="log2" className="bg-gray-800 text-white">log2 (log₂n_features)</option>
                      <option value="None" className="bg-gray-800 text-white">None (all features)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Number of features to consider for best split</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Split Criterion
                    </label>
                    <select
                      value={hyperparameters.criterion}
                      onChange={(e) => handleHyperparameterChange('criterion', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="gini" className="bg-gray-800 text-white">Gini Impurity</option>
                      <option value="entropy" className="bg-gray-800 text-white">Information Gain</option>
                      <option value="log_loss" className="bg-gray-800 text-white">Log Loss</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Function to measure quality of splits</p>
                  </div>
                </div>

                {/* Sampling and Class Balance */}
                <div className="bg-teal-500/10 backdrop-blur-sm border border-teal-400/30 rounded-xl p-3 space-y-3">
                  <h4 className="text-sm font-bold text-teal-300 mb-2">Sampling & Balance</h4>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Class Weight
                    </label>
                    <select
                      value={hyperparameters.class_weight}
                      onChange={(e) => handleHyperparameterChange('class_weight', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="balanced" className="bg-gray-800 text-white">Balanced (Handle imbalanced data)</option>
                      <option value="balanced_subsample" className="bg-gray-800 text-white">Balanced Subsample</option>
                      <option value="None" className="bg-gray-800 text-white">None</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">How to handle class imbalance</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Bootstrap Sampling
                    </label>
                    <select
                      value={hyperparameters.bootstrap.toString()}
                      onChange={(e) => handleHyperparameterChange('bootstrap', e.target.value === 'true')}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="true" className="bg-gray-800 text-white">True (Bootstrap samples)</option>
                      <option value="false" className="bg-gray-800 text-white">False (Use whole dataset)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Whether to use bootstrap samples for training</p>
                  </div>

                  {hyperparameters.bootstrap && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Max Samples: {hyperparameters.max_samples === 1.0 ? 'All' : `${(hyperparameters.max_samples * 100).toFixed(0)}%`}
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={hyperparameters.max_samples}
                        onChange={(e) => handleHyperparameterChange('max_samples', parseFloat(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Fraction of samples to draw for each tree</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Out-of-Bag Score
                    </label>
                    <select
                      value={hyperparameters.oob_score.toString()}
                      onChange={(e) => handleHyperparameterChange('oob_score', e.target.value === 'true')}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="true" className="bg-gray-800 text-white">True (Calculate OOB score)</option>
                      <option value="false" className="bg-gray-800 text-white">False</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Use out-of-bag samples for unbiased accuracy estimate</p>
                  </div>
                </div>

                {/* Advanced Parameters */}
                <div className="bg-orange-500/10 backdrop-blur-sm border border-orange-400/30 rounded-xl p-3 space-y-3">
                  <h4 className="text-sm font-bold text-orange-300 mb-2">Advanced Tuning</h4>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Min Weight Fraction Leaf: {hyperparameters.min_weight_fraction_leaf.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0.0"
                      max="0.5"
                      step="0.01"
                      value={hyperparameters.min_weight_fraction_leaf}
                      onChange={(e) => handleHyperparameterChange('min_weight_fraction_leaf', parseFloat(e.target.value))}
                      className="w-full accent-orange-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Minimum weighted fraction of input samples at leaf</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Min Impurity Decrease: {hyperparameters.min_impurity_decrease.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0.0"
                      max="0.01"
                      step="0.001"
                      value={hyperparameters.min_impurity_decrease}
                      onChange={(e) => handleHyperparameterChange('min_impurity_decrease', parseFloat(e.target.value))}
                      className="w-full accent-orange-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Minimum impurity decrease required for split</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Max Leaf Nodes
                    </label>
                    <select
                      value={hyperparameters.max_leaf_nodes?.toString() || 'None'}
                      onChange={(e) => handleHyperparameterChange('max_leaf_nodes', e.target.value === 'None' ? null : parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="None" className="bg-gray-800 text-white">None (Unlimited)</option>
                      <option value="100" className="bg-gray-800 text-white">100</option>
                      <option value="500" className="bg-gray-800 text-white">500</option>
                      <option value="1000" className="bg-gray-800 text-white">1000</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Maximum number of leaf nodes per tree</p>
                  </div>
                </div>
              </>

            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-300">
                  <p className="font-semibold mb-1 text-red-200">Error</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Train Button */}
          <button
            onClick={handleTrainModel}
            disabled={training || !trainingFile}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 disabled:hover:scale-100 disabled:shadow-none"
          >
            {training ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Training...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Start Training</span>
              </>
            )}
          </button>

          {/* Training Results */}
          {trainingResults && (
            <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Training Complete!</h3>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-300 font-semibold mb-1">Training Accuracy</p>
                  <p className="text-xl font-bold text-white">{trainingResults.train_accuracy}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-300 font-semibold mb-1">Test Accuracy</p>
                  <p className="text-xl font-bold text-white">{trainingResults.test_accuracy}%</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-300 font-semibold mb-1">Precision</p>
                  <p className="text-xl font-bold text-white">{trainingResults.precision}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-300 font-semibold mb-1">Recall</p>
                  <p className="text-xl font-bold text-white">{trainingResults.recall}%</p>
                </div>
              </div>

              {/* Classification Report and Confusion Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Classification Report */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <h4 className="font-bold mb-3 flex items-center space-x-2 text-white">
                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                    <span>Classification Report</span>
                  </h4>
                  <pre className="text-xs bg-black/30 backdrop-blur-sm border border-white/20 p-3 rounded-lg overflow-x-auto font-mono text-gray-300">
                    {trainingResults.classification_report}
                  </pre>
                </div>

                {/* Confusion Matrix */}
                {trainingResults.confusion_matrix && (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <h4 className="font-bold mb-3 flex items-center space-x-2 text-white">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                      <span>Confusion Matrix</span>
                    </h4>
                    
                    {/* Matrix Visualization */}
                    <div className="space-y-3">
                      {/* Matrix Grid */}
                      <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-3 rounded-lg">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {/* Header row */}
                          <div></div>
                          <div className="text-center font-bold text-emerald-300">Pred: CONF</div>
                          <div className="text-center font-bold text-orange-300">Pred: FALSE</div>
                          
                          {/* Actual CONFIRMED row */}
                          <div className="text-right font-bold text-emerald-300">Act: CONF</div>
                          <div className="bg-emerald-900/50 border border-emerald-500/50 rounded p-2 text-center font-bold text-white">
                            {trainingResults.confusion_matrix.true_positives}
                          </div>
                          <div className="bg-red-900/50 border border-red-500/50 rounded p-2 text-center font-bold text-white">
                            {trainingResults.confusion_matrix.false_negatives}
                          </div>
                          
                          {/* Actual FALSE POSITIVE row */}
                          <div className="text-right font-bold text-orange-300">Act: FALSE</div>
                          <div className="bg-red-900/50 border border-red-500/50 rounded p-2 text-center font-bold text-white">
                            {trainingResults.confusion_matrix.false_positives}
                          </div>
                          <div className="bg-emerald-900/50 border border-emerald-500/50 rounded p-2 text-center font-bold text-white">
                            {trainingResults.confusion_matrix.true_negatives}
                          </div>
                        </div>
                      </div>
                      
                      {/* Matrix Summary */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-emerald-900/30 border border-emerald-500/30 rounded p-2">
                          <div className="text-emerald-300 font-semibold">Correct Predictions</div>
                          <div className="text-white font-bold">
                            {trainingResults.confusion_matrix.true_positives + trainingResults.confusion_matrix.true_negatives}
                          </div>
                        </div>
                        <div className="bg-red-900/30 border border-red-500/30 rounded p-2">
                          <div className="text-red-300 font-semibold">Incorrect Predictions</div>
                          <div className="text-white font-bold">
                            {trainingResults.confusion_matrix.false_positives + trainingResults.confusion_matrix.false_negatives}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Training Info */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400 font-semibold">Model Type:</span>
                    <p className="font-bold text-white">{trainingResults.model_type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Training Time:</span>
                    <p className="font-bold text-white">{trainingResults.training_time}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Training Samples:</span>
                    <p className="font-bold text-white">{trainingResults.train_samples}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold">Test Samples:</span>
                    <p className="font-bold text-white">{trainingResults.test_samples}</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadModel}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
              >
                <Download className="w-5 h-5" />
                <span>Download Trained Model</span>
              </button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          {/* Training Steps */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-base font-bold mb-3 text-white">Training Steps</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start space-x-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                <span className="text-gray-300">Upload CSV with training data (must include target column)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                <span className="text-gray-300">Choose algorithm and configure hyperparameters</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                <span className="text-gray-300">Data is automatically split (default: 80% train, 20% test)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                <span className="text-gray-300">Model is trained and evaluated</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                <span className="text-gray-300">Download trained model for predictions</span>
              </li>
            </ol>
          </div>

          {/* Random Forest Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-base font-bold mb-3 text-white">Random Forest Classifier</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-bold text-indigo-300 mb-1">Ensemble Learning</h4>
                <p className="text-gray-400 text-xs">Uses multiple decision trees and voting for robust predictions.</p>
              </div>
              <div>
                <h4 className="font-bold text-purple-300 mb-1">High Accuracy</h4>
                <p className="text-gray-400 text-xs">Typically achieves 95-97% accuracy on exoplanet detection.</p>
              </div>
              <div>
                <h4 className="font-bold text-teal-300 mb-1">Feature Importance</h4>
                <p className="text-gray-400 text-xs">Provides insights into which features are most predictive.</p>
              </div>
              <div>
                <h4 className="font-bold text-orange-300 mb-1">Overfitting Resistance</h4>
                <p className="text-gray-400 text-xs">Less prone to overfitting compared to single decision trees.</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-indigo-500/10 backdrop-blur-sm border border-indigo-400/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-semibold mb-1 text-white">Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Use at least 1000 rows for good results</li>
                  <li>• Ensure balanced classes (CONFIRMED vs FALSE POSITIVE)</li>
                  <li>• Remove rows with null values before upload</li>
                  <li>• Start with default values, then fine-tune based on results</li>
                  <li>• Higher n_estimators = better accuracy but slower training</li>
                  <li>• Enable OOB score for unbiased model evaluation</li>
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
