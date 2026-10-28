@echo off
echo ========================================
echo   Shopora - Setup Script
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 (
    echo ERROR: Backend npm install failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing frontend dependencies...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo ERROR: Frontend npm install failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Creating .env files from examples...
cd /d "%~dp0backend"
if not exist ".env" (
    copy ".env.example" ".env"
    echo Created backend/.env - PLEASE EDIT WITH YOUR MONGODB URI!
) else (
    echo backend/.env already exists, skipping...
)

cd /d "%~dp0frontend"
if not exist ".env" (
    copy ".env.example" ".env"
    echo Created frontend/.env
) else (
    echo frontend/.env already exists, skipping...
)
echo.

echo [4/4] Testing frontend build...
cd /d "%~dp0frontend"
call npm run build
if errorlevel 1 (
    echo WARNING: Frontend build had issues. Check errors above.
) else (
    echo Frontend build successful!
)
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Edit backend\.env and set your MONGO_URI
echo 2. Run: cd backend ^&^& npm run seed
echo 3. Run: cd backend ^&^& npm run dev
echo 4. In another terminal: cd frontend ^&^& npm run dev
echo.
pause
