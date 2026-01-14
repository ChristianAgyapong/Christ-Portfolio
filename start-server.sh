#!/bin/bash

# Portfolio Quick Start Script
# This script helps you quickly set up and test your portfolio

echo " Christian Agyapong Portfolio - Quick Start"
echo "=============================================="
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo " Python 3 found"
    echo "Starting local server on port 8000..."
    echo " Open your browser and visit: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Python found"
    echo "Starting local server on port 8000..."
    echo "Open your browser and visit: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "PHP found"
    echo "Starting local server on port 8000..."
    echo "Open your browser and visit: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    php -S localhost:8000
else
    echo " No server found (Python or PHP required)"
    echo ""
    echo "Please install Python or PHP to run a local server"
    echo "Or simply open index.html directly in your browser"
    echo ""
    echo "Alternatively, you can:"
    echo "  1. Install Node.js and run: npx http-server"
    echo "  2. Use VS Code Live Server extension"
    echo "  3. Open index.html directly in browser"
fi
