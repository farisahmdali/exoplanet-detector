# 🚀 Quick Start Guide - Exoplanet Detector

Complete guide to running the full-stack exoplanet detection application.

## 📋 Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.8+ (for backend)
- **npm** or **yarn** (for package management)
- **pip** (for Python packages)

## 🏗️ Project Structure

```
├── exoplanet-detector/       # React Frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── exoplanet-backend/        # Python Flask Backend
│   ├── app.py
│   ├── requirements.txt
│   └── run.py
│
└── exoplannet/               # ML Models & Data
    ├── exo.joblib            # Trained model
    ├── data.csv              # Training data
    └── tess_data.csv         # TESS data
```

## 🔧 Setup Instructions

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd exoplanet-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Verify model file location
# Ensure exo.joblib is at: ../exoplannet/exo.joblib
```

### Step 2: Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd exoplanet-detector

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (default should work)
# VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Terminal 1: Start Backend

```bash
cd exoplanet-backend

# Activate virtual environment if not already active
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run the Flask server
python run.py

# Or simply:
python app.py
```

Backend will be available at: **http://localhost:5000**

API Health Check: **http://localhost:5000/api/health**

### Terminal 2: Start Frontend

```bash
cd exoplanet-detector

# Start the development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## 🧪 Testing the Application

### 1. Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Get available models
curl http://localhost:5000/api/models
```

### 2. Test Frontend

1. Open browser to **http://localhost:5173**
2. Navigate to **Predict** page
3. Upload a CSV file (use data.csv or tess_data.csv from exoplannet folder)
4. Click "Run Prediction"
5. View results

### 3. Test Training

1. Navigate to **Training** page
2. Upload training dataset
3. Adjust hyperparameters
4. Click "Start Training"
5. Watch progress and view results

## 📂 Sample Data Files

Use these files for testing:

- **data.csv** - Kepler exoplanet dataset (~3MB)
- **tess_data.csv** - TESS mission dataset (~3MB)

Located in: `exoplannet/` directory

## 🔍 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/models` | GET | List available models |
| `/api/predict` | POST | Make predictions |
| `/api/train` | POST | Train new model |
| `/api/upload` | POST | Upload files |

## ⚙️ Configuration

### Backend Configuration

Edit `exoplanet-backend/.env`:

```env
FLASK_APP=app.py
FLASK_ENV=development
PORT=5000
MODEL_PATH=../exoplannet/exo.joblib
```

### Frontend Configuration

Edit `exoplanet-detector/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Model file not found
```bash
# Solution: Check model path
ls ../exoplannet/exo.joblib
# If missing, ensure you have the trained model file
```

**Problem:** Port 5000 already in use
```bash
# Solution: Change port in app.py
# Or kill the process using port 5000
```

**Problem:** Missing dependencies
```bash
# Solution: Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Problem:** Cannot connect to backend
```bash
# Solution 1: Check backend is running
curl http://localhost:5000/api/health

# Solution 2: Check CORS settings in backend
# Ensure Flask-CORS is installed and configured
```

**Problem:** Port 5173 already in use
```bash
# Solution: Vite will automatically use next available port
# Or specify port in vite.config.js
```

## 📝 Development Tips

### Hot Reload

- **Frontend**: Changes auto-reload (Vite HMR)
- **Backend**: Set `debug=True` in app.py for auto-reload

### API Testing

Use tools like:
- **Postman** - GUI for API testing
- **curl** - Command line testing
- **Thunder Client** - VS Code extension

### Debugging

**Backend:**
```python
# Add logging to app.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Frontend:**
```javascript
// Check console in browser DevTools
console.log('API Response:', data)
```

## 🚀 Production Deployment

### Backend

```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to hosting service
```

## 📚 Additional Resources

- **Flask Documentation**: https://flask.palletsprojects.com/
- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/

## 🆘 Need Help?

1. Check the console/terminal for error messages
2. Ensure all dependencies are installed
3. Verify file paths are correct
4. Check that both servers are running
5. Test API endpoints independently

## ✅ Verification Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Model file (exo.joblib) present
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] API health check passes
- [ ] Can upload and predict successfully

---

**Enjoy discovering exoplanets! 🪐✨**

