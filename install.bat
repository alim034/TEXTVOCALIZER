@echo off
echo ========================================
echo     TextVocalizer Installation Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)

cd ..

echo.
echo [3/4] Setting up environment variables...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Environment file created at backend\.env
    echo Please update the MongoDB URI and JWT secret in backend\.env
) else (
    echo Environment file already exists
)

echo.
echo [4/4] Installation complete!
echo.
echo ========================================
echo        Quick Start Instructions
echo ========================================
echo.
echo 1. Make sure MongoDB is running locally or update MONGODB_URI in backend\.env
echo 2. Start the backend server:
echo    cd backend ^&^& npm run dev
echo.
echo 3. In a new terminal, start the frontend:
echo    cd frontend ^&^& npm run dev
echo.
echo 4. Open http://localhost:5173 in your browser
echo.
echo ========================================
echo.
pause
