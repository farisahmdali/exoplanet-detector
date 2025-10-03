# Testing Guide - Predict Page Features

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd exoplanet-backend
python app.py
```
The backend should start on `http://localhost:5000`

### 2. Start the Frontend
```bash
cd exoplanet-detector
npm run dev
```
The frontend should start on `http://localhost:5173`

## 🧪 Testing Manual Mode

### Test Case 1: Basic Prediction
1. Navigate to the Predict page
2. Ensure "Manual Input" mode is selected
3. Leave default parameters or adjust:
   - Orbital Period: 4.2 days
   - Planet Radius: 1.5 Earth radii
   - Equilibrium Temperature: 300 K
   - Transit Duration: 2.3 hours
   - Transit Depth: 100 ppm
4. Click "Run Prediction"
5. **Expected Result**: 
   - Should show loading animation with rotating planet
   - After ~1-2 seconds, display prediction results
   - Should show confidence score, classification, and detailed parameters

### Test Case 2: Advanced Parameters
1. In Manual mode, expand "Advanced Parameters"
2. Modify some values:
   - Stellar Eclipse Flag: 1
   - Insolation Flux: 2.5
3. Click "Run Prediction"
4. **Expected Result**: Parameters should affect the prediction outcome

### Test Case 3: Reset Functionality
1. After getting results, click "New Prediction"
2. **Expected Result**: All parameters reset to defaults, results cleared

### Test Case 4: Export Results
1. Get a prediction result
2. Click "Export Results"
3. **Expected Result**: Downloads JSON file with format:
   `exoplanet-manual-prediction-[timestamp].json`

## 📁 Testing CSV Mode

### Test Case 1: File Upload
1. Switch to "CSV Upload" mode
2. Click the upload area or drag the `sample_data.csv` file
3. **Expected Result**:
   - Upload area turns green
   - Shows checkmark icon
   - Displays filename and file size
   - Shows CSV requirements info

### Test Case 2: CSV Prediction
1. With `sample_data.csv` uploaded
2. Click "Analyze CSV"
3. **Expected Result**:
   - Loading animation appears
   - Shows "Processing CSV Data..." message
   - After processing:
     - Overall confidence score
     - Total Analyzed count (20 rows)
     - Confirmed count
     - False Positive count
     - Detection Rate percentage
     - Top 10 candidates listed

### Test Case 3: CSV Results Display
1. Review the results from CSV upload
2. **Expected Result**: Each candidate card shows:
   - Candidate number
   - Confidence level (High/Medium/Low)
   - Probability percentage
   - Transit Time
   - Planet Radius
   - Orbital Period
   - Star Radius
   - Interpretation text

### Test Case 4: Clear CSV
1. After uploading a file, click "Clear" button
2. **Expected Result**: 
   - File removed
   - Upload area returns to default state
   - Results cleared

### Test Case 5: Export CSV Results
1. Get CSV prediction results
2. Click "Export Results"
3. **Expected Result**: Downloads JSON with:
   - All results
   - CSV-specific statistics
   - Mode information
   - Filename: `exoplanet-csv-prediction-[timestamp].json`

## 🎨 Testing Animations

### Animation 1: StarField Background
- **What to check**: Animated stars moving slowly across the background
- **Expected**: Smooth animation, no performance issues

### Animation 2: Hero Planet
- **What to check**: Animated planet at the top of the page
- **Expected**: Smooth rotation with gradient colors

### Animation 3: Loading State
- **What to check**: During prediction, animated planet with progress bar
- **Expected**: 
  - Planet animation smooth
  - Shimmer effect on progress bar
  - Different messages for manual vs CSV mode

### Animation 4: Orbiting Planets (CSV Mode)
- **What to check**: In CSV upload section, orbiting planets animation
- **Expected**: Multiple planets orbiting smoothly

### Animation 5: Card Hover Effects
- **What to check**: Hover over result cards
- **Expected**: Subtle background color change

### Animation 6: Button Interactions
- **What to check**: Hover and click all buttons
- **Expected**: 
  - Smooth scale transformations
  - Shadow effects
  - Color transitions

## 🔧 Testing Error Handling

### Test Case 1: Invalid File Type
1. Try uploading a .txt or .json file
2. **Expected Result**: Error message saying "Please upload a CSV file"

### Test Case 2: Backend Down
1. Stop the backend server
2. Try making a prediction
3. **Expected Result**: 
   - Error message displayed
   - Falls back to mock data (for manual mode)

### Test Case 3: Malformed CSV
1. Create a CSV with invalid data or missing columns
2. Upload and analyze
3. **Expected Result**: Error message about CSV format

### Test Case 4: Empty CSV
1. Upload a CSV with only headers, no data
2. **Expected Result**: Error message or handles gracefully

## ✅ Acceptance Criteria

### Visual Requirements
- [ ] StarField background displays properly
- [ ] Hero planet animation is smooth
- [ ] Mode toggle works with smooth transitions
- [ ] All icons display correctly
- [ ] Gradients and colors match design
- [ ] Responsive on mobile, tablet, and desktop

### Functionality Requirements
- [ ] Manual mode accepts all 18 parameters
- [ ] Sliders and inputs work synchronously
- [ ] CSV upload accepts .csv files only
- [ ] CSV processing handles 100+ rows
- [ ] Results display correctly for both modes
- [ ] Export creates valid JSON files
- [ ] Reset/Clear buttons work properly

### Performance Requirements
- [ ] Page loads in < 2 seconds
- [ ] Predictions complete in < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] CSV files up to 100MB supported

### Backend Requirements
- [ ] `/api/predict` accepts JSON (manual mode)
- [ ] `/api/predict` accepts FormData (CSV mode)
- [ ] Returns proper response format
- [ ] Handles errors gracefully
- [ ] CORS enabled for frontend

## 📊 Sample Test Data

### Manual Mode - Test Values

**Test 1: Hot Jupiter**
```
Orbital Period: 3.5 days
Planet Radius: 11.0 Earth radii
Temperature: 1500 K
Transit Duration: 2.8 hours
Transit Depth: 5000 ppm
```

**Test 2: Earth-like Planet**
```
Orbital Period: 365 days
Planet Radius: 1.0 Earth radii
Temperature: 288 K
Transit Duration: 13 hours
Transit Depth: 84 ppm
```

**Test 3: Super-Earth**
```
Orbital Period: 10.5 days
Planet Radius: 2.5 Earth radii
Temperature: 400 K
Transit Duration: 4.2 hours
Transit Depth: 250 ppm
```

### CSV Mode - Use Provided File
- File: `sample_data.csv`
- Contains: 20 exoplanet candidates
- Mix of confirmed planets and false positives

## 🐛 Known Issues / Limitations

1. Mock data fallback when backend is unavailable (intended behavior)
2. CSV processing limited to numeric columns (design choice)
3. Maximum 10 candidates shown in CSV results (performance optimization)
4. File size limit of 100MB (backend configuration)

## 📝 Notes for Developers

### Adding New Parameters
1. Add to `parameters` state in Predict.jsx
2. Add input field in the form
3. Update `feature_order` in backend
4. Update validation logic

### Customizing Animations
- StarField: Adjust `density` and `speed` props
- AnimatedPlanet: Change `size` and `variant` props
- OrbitingPlanets: Modify component directly for orbit speeds

### Modifying Result Display
- Update `getConfidenceColor` function for color schemes
- Modify result cards in the predictions.map() section
- Add/remove statistics in confidence section

---

**Happy Testing! 🎉**

If you find any issues, please create an issue in the repository.

