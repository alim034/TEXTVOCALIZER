#!/bin/bash

echo "========================================"
echo "    TextVocalizer Installation Script"
echo "========================================"
echo ""

echo "[1/4] Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed!"
    exit 1
fi

echo ""
echo "[2/4] Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed!"
    exit 1
fi

cd ..

echo ""
echo "[3/4] Setting up environment variables..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "Environment file created at backend/.env"
    echo "Please update the MongoDB URI and JWT secret in backend/.env"
else
    echo "Environment file already exists"
fi

echo ""
echo "[4/4] Installation complete!"
echo ""
echo "========================================"
echo "       Quick Start Instructions"
echo "========================================"
echo ""
echo "1. Make sure MongoDB is running locally or update MONGODB_URI in backend/.env"
echo "2. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "========================================"
echo ""
