#!/bin/bash

echo "Initializing local telemetry sink environment..."

# Initialize Python virtual environment
python3 -m venv backend/.venv
source backend/.venv/bin/activate

# Install dependencies
pip install fastapi uvicorn

# Set execution permissions
chmod +x install.sh

echo "ENVIRONMENT INITIALIZED."
echo ""
echo "================================================================"
echo "MANUAL EXTENSION LOAD REQUIRED:"
echo "1. Open a Chromium-based browser and navigate to chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked'"
echo "4. Select the ~/Public/ghost-shield/extension directory"
echo "================================================================"
echo ""
echo "Launching local daemon on 127.0.0.1:8000..."

# Launch daemon
uvicorn backend.main:app --host 127.0.0.1 --port 8000
