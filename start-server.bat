@echo off
REM Portfolio Quick Start Script for Windows
REM This script helps you quickly set up and test your portfolio

echo.
echo 🚀 Christian Agyapong Portfolio - Quick Start
echo ==============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found
    echo 🌐 Starting local server on port 8000...
    echo 📍 Open your browser and visit: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if PHP is installed
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ PHP found
    echo 🌐 Starting local server on port 8000...
    echo 📍 Open your browser and visit: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

REM No server found
echo ❌ No server found (Python or PHP required)
echo.
echo Please install Python or PHP to run a local server
echo Or simply open index.html directly in your browser
echo.
echo Alternatively, you can:
echo   1. Install Node.js and run: npx http-server
echo   2. Use VS Code Live Server extension
echo   3. Open index.html directly in browser
echo.
pause

:end
