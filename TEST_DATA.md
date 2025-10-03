# Test Data for Exoplanet Predictions

Use these parameter sets to test CONFIRMED and FALSE POSITIVE predictions.

## 🟢 Test Case 1: CONFIRMED Exoplanet (High Probability)

**Real confirmed exoplanet from training data (Kepler-227 b)**

### Main Parameters:
- **Orbital Period:** 9.488036 days
- **Planet Radius:** 2.26 Earth radii
- **Equilibrium Temperature:** 793 K
- **Transit Duration:** 2.9575 hours
- **Transit Depth:** 615.8 ppm
- **Impact Parameter:** 0.146
- **Stellar Temperature:** 5455 K
- **Signal-to-Noise Ratio:** 35.8

### Advanced Parameters:
- **Stellar Eclipse Flag:** 0 (Not a stellar eclipse)
- **Eclipsing Binary Flag:** 0 (Not an eclipsing binary)
- **Transit Epoch:** 170.53875
- **Insolation Flux:** 93.59
- **Stellar Surface Gravity:** 4.467
- **Stellar Radius:** 0.927 Solar radii
- **Right Ascension:** 291.93423
- **Declination:** 48.141651
- **Kepler Magnitude:** 15.347
- **Planet Number:** 1

### Expected Result:
✅ **CONFIRMED** with high confidence (~90-99%)

---

## 🔴 Test Case 2: FALSE POSITIVE (High Probability)

**Real false positive from training data (stellar eclipse)**

### Main Parameters:
- **Orbital Period:** 1.736952 days (very short - suspicious)
- **Planet Radius:** 3.67 Earth radii
- **Equilibrium Temperature:** 1707 K (very hot)
- **Transit Duration:** 1.8575 hours
- **Transit Depth:** 1423.0 ppm (very deep)
- **Impact Parameter:** 0.0
- **Stellar Temperature:** 5853 K
- **Signal-to-Noise Ratio:** 10.6 (low)

### Advanced Parameters:
- **Stellar Eclipse Flag:** 1 (Likely stellar eclipse) ⚠️
- **Eclipsing Binary Flag:** 0
- **Transit Epoch:** 169.04637
- **Insolation Flux:** 1160.73 (very high!)
- **Stellar Surface Gravity:** 4.544
- **Stellar Radius:** 0.868 Solar radii
- **Right Ascension:** 297.00482
- **Declination:** 48.134129
- **Kepler Magnitude:** 15.436
- **Planet Number:** 1

### Expected Result:
❌ **FALSE POSITIVE** with high confidence (~90-99%)

---

## 📋 Quick Copy-Paste Values

### CONFIRMED Test (Kepler-227 b):
```
Orbital Period: 9.488036
Planet Radius: 2.26
Temperature: 793
Transit Duration: 2.9575
Transit Depth: 615.8
Impact Parameter: 0.146
Stellar Temperature: 5455
SNR: 35.8

Advanced:
Stellar Eclipse Flag: 0
Eclipsing Binary Flag: 0
Transit Epoch: 170.53875
Insolation Flux: 93.59
Stellar Surface Gravity: 4.467
Stellar Radius: 0.927
Right Ascension: 291.93423
Declination: 48.141651
Kepler Magnitude: 15.347
Planet Number: 1
```

### FALSE POSITIVE Test (Stellar Eclipse):
```
Orbital Period: 1.736952
Planet Radius: 3.67
Temperature: 1707
Transit Duration: 1.8575
Transit Depth: 1423.0
Impact Parameter: 0.0
Stellar Temperature: 5853
SNR: 10.6

Advanced:
Stellar Eclipse Flag: 1
Eclipsing Binary Flag: 0
Transit Epoch: 169.04637
Insolation Flux: 1160.73
Stellar Surface Gravity: 4.544
Stellar Radius: 0.868
Right Ascension: 297.00482
Declination: 48.134129
Kepler Magnitude: 15.436
Planet Number: 1
```

---

## 🔍 Key Indicators

### Signs of CONFIRMED Exoplanet:
- ✅ Moderate orbital period (10-400 days)
- ✅ Planet radius: 0.5-20 Earth radii
- ✅ Temperature in habitable zone: 200-400 K
- ✅ Good signal-to-noise ratio (>20)
- ✅ No false positive flags set
- ✅ Moderate impact parameter (0.2-0.8)
- ✅ Consistent transit characteristics

### Signs of FALSE POSITIVE:
- ❌ Very short period (<1 day) or very long (>1000 days)
- ❌ Very large radius (>15 R⊕) suggesting stellar object
- ❌ Extreme temperatures
- ❌ Very deep transits (>10,000 ppm)
- ❌ Low SNR (<10)
- ❌ False positive flags set to 1
- ❌ Grazing transits (impact near 1.0)
- ❌ Inconsistent parameter combinations

---

## 🧪 How to Use

1. Go to the **Predict** page
2. Click **Reset** to clear current values
3. Enter one of the test cases above
4. Click **"Advanced Parameters"** to expand and enter those values
5. Click **"Run Prediction"**
6. Compare your results with expected outcomes

---

## 📊 Additional Test Cases

### Moderate Confidence CONFIRMED (70-80%):
- Orbital Period: 12.5 days
- Planet Radius: 1.8 R⊕
- Temperature: 385 K
- All other parameters moderate/typical

### Borderline Case (~50%):
- Orbital Period: 3.2 days
- Planet Radius: 4.5 R⊕
- Temperature: 850 K
- Mixed signals - could go either way

---

**Note:** Actual predictions may vary slightly based on the exact model training, but these test cases should reliably produce the expected classifications.

