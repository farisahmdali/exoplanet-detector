@echo off
echo ============================================
echo Starting Exoplanet Detection Frontend
echo ============================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
)

echo.
echo ============================================
echo Starting Vite Server on http://localhost:5173
echo ============================================
echo.

npm run dev

