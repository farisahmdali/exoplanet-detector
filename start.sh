#!/bin/bash

echo "============================================"
echo "Starting Exoplanet Detection Frontend"
echo "============================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "============================================"
echo "Starting Vite Server on http://localhost:5173"
echo "============================================"
echo ""

npm run dev

