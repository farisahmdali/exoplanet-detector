# Predict Page - Complete Feature Guide

## 🎨 New Animations & Visual Enhancements

### 1. **StarField Background**
- Animated star field background across the entire page
- Creates immersive space atmosphere
- Configurable density (120 stars) and speed (0.2x)

### 2. **Animated Planet Hero**
- Medium-sized animated planet at the top of the page
- Gradient colors with smooth rotation effects
- Matches the home page aesthetic

### 3. **Orbiting Planets Animation**
- Displays during CSV upload mode
- Shows planetary systems in motion
- Located in the CSV upload section for visual feedback

### 4. **Enhanced Loading Animation**
- Animated planet with shimmer effect during predictions
- Dynamic text based on mode (Manual vs CSV)
- Progress bar with gradient colors

## 🎯 Two Prediction Modes

### Mode 1: Manual Input
**Features:**
- Input 18 different planetary parameters manually
- Real-time slider controls with numeric inputs
- Collapsible advanced parameters section
- Instant single prediction results

**Parameters Include:**
- Orbital Period (days)
- Planet Radius (Earth radii)
- Equilibrium Temperature (K)
- Transit Duration (hours)
- Transit Depth (ppm)
- Impact Parameter
- Stellar Temperature (K)
- Signal-to-Noise Ratio
- And 10 more advanced parameters

### Mode 2: CSV Upload
**Features:**
- Drag-and-drop file upload interface
- File validation (CSV only, max 100MB)
- Batch processing of multiple candidates
- Shows top 10 most promising candidates
- Detailed statistics for batch results

**CSV Requirements:**
- Must be a valid CSV file
- Contains light curve data columns
- Numeric values for planetary parameters
- Compatible with Kepler/TESS data formats

## 📊 Enhanced Results Display

### For Manual Predictions:
- Overall confidence score with progress bar
- Classification (CONFIRMED vs FALSE POSITIVE)
- Detailed parameter breakdown
- High/Medium/Low confidence indicator
- Interpretation text explaining the results

### For CSV Predictions:
All manual features PLUS:
- **Total Analyzed** - Number of rows processed
- **Confirmed Count** - Number of confirmed exoplanets
- **False Positive Count** - Number of false positives
- **Detection Rate** - Percentage of confirmed vs total
- **Top 10 Candidates** - Best candidates sorted by probability
- Each candidate shows: Transit Time, Planet Radius, Orbital Period, Star Radius

## 🎨 UI/UX Enhancements

### Mode Toggle
- Beautiful toggle switch between Manual and CSV modes
- Smooth transitions with gradient backgrounds
- Clear visual feedback on selected mode

### Upload Interface
- Drag-and-drop file upload area
- Visual feedback when file is selected (green border + checkmark)
- File size and name display
- Clear button to reset upload
- Helpful tips about CSV requirements

### Results Cards
- Hover effects on prediction cards
- Color-coded confidence levels:
  - 🟢 High (>80%): Green
  - 🟡 Medium (50-80%): Yellow
  - 🔴 Low (<50%): Red
- Gradient backgrounds for confirmed vs false positive
- Smooth animations on all interactions

### Action Buttons
- Export results to JSON (includes mode info)
- Timestamped filenames
- Reset/New Prediction button (mode-aware)
- Gradient hover effects
- Disabled states with visual feedback

## 🔧 Backend Integration

### API Endpoints Used:
1. **GET** `/api/models` - Fetch available AI models
2. **POST** `/api/predict` - Make predictions (handles both JSON and FormData)

### Request Formats:

#### Manual Mode (JSON):
```json
{
  "parameters": {
    "koi_fpflag_ss": 0,
    "koi_fpflag_ec": 0,
    "koi_period": 4.2,
    // ... 15 more parameters
  },
  "model_id": "kepler-v2"
}
```

#### CSV Mode (FormData):
```javascript
FormData {
  file: [CSV File],
  model_id: "kepler-v2"
}
```

### Response Format:
```json
{
  "confidence": {
    "overall": 94.7,
    "exoplanetDetected": true,
    "numberOfCandidates": 3,
    "processingTime": "1.2s",
    "totalPredictions": 10,      // CSV only
    "confirmed": 3,               // CSV only
    "falsePositive": 7,           // CSV only
    "prediction": "CONFIRMED"
  },
  "predictions": [
    {
      "id": 1,
      "prediction": "CONFIRMED",
      "probability": 0.947,
      "confidence": "High",
      "transitTime": "25.341 days",      // CSV mode
      "planetRadius": "1.45 Earth radii", // CSV mode
      "orbitalPeriod": "45.2 days",      // CSV mode
      "starRadius": "1.12 Solar radii",  // CSV mode
      "parameters": { ... }               // Manual mode
    }
  ]
}
```

## 🚀 How to Use

### Manual Prediction:
1. Select "Manual Input" mode
2. Adjust parameters using sliders or numeric inputs
3. Expand "Advanced Parameters" if needed
4. Click "Run Prediction"
5. View results with confidence scores
6. Export results or start new prediction

### CSV Prediction:
1. Select "CSV Upload" mode
2. Click or drag-and-drop your CSV file
3. Review file info and requirements
4. Click "Analyze CSV"
5. View batch statistics and top candidates
6. Export results with all data

## 📈 Backend Updates

### Enhanced CSV Processing:
- Returns top 10 candidates (sorted by probability)
- Extracts actual data from CSV columns
- Fallback values for missing data
- Proper confidence calculation across all predictions
- Detailed statistics (confirmed, false positive, detection rate)

### Error Handling:
- File type validation
- File size limits (100MB)
- CSV parsing errors
- Model loading errors
- Graceful fallbacks with informative messages

## 🎨 Visual Design Elements

### Color Scheme:
- **Primary**: Indigo-Purple gradients
- **Success**: Green (#10B981)
- **Warning**: Yellow/Orange
- **Error**: Red
- **Background**: Dark with glass morphism effects

### Animations:
- Page transitions
- Button hover effects
- Loading spinners
- Progress bars
- Card hover states
- Smooth mode switching

## 📝 Tips for Best Results

### Manual Mode:
- Use realistic parameter values
- Higher SNR values (>15) give better predictions
- Transit depth should match planet size
- Check advanced parameters for fine-tuning

### CSV Mode:
- Ensure CSV has required columns
- Use data from Kepler or TESS missions
- Clean data gives better predictions
- Test with sample data first

## 🔍 Sample CSV Format

```csv
koi_fpflag_ss,koi_fpflag_ec,koi_period,koi_time0bk,koi_impact,koi_duration,koi_depth,koi_prad,koi_teq,koi_insol,koi_model_snr,koi_tce_plnt_num,koi_steff,koi_slogg,koi_srad,ra,dec,koi_kepmag
0,0,4.2,132.5,0.5,2.3,100,1.5,300,1.0,15,1,5500,4.5,1.0,285.0,45.0,14.0
0,0,8.5,145.2,0.3,3.1,250,2.1,450,2.5,25,1,5800,4.4,1.1,290.5,42.3,13.5
```

## 🎯 Success Metrics

- ✅ Beautiful, responsive UI
- ✅ Smooth animations throughout
- ✅ Two prediction modes (Manual + CSV)
- ✅ Comprehensive results display
- ✅ Batch processing support
- ✅ Export functionality
- ✅ Error handling
- ✅ Loading states
- ✅ Interactive controls
- ✅ Professional design

---

**Enjoy discovering exoplanets! 🌟🪐**

