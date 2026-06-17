#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

PORT=8000

# Find the next available port if 8000 is occupied
while lsof -i :$PORT >/dev/null 2>&1; do
  PORT=$((PORT+1))
done

echo "=================================================="
echo "⚡ Velixan Technologies Dev Server"
echo "=================================================="
echo "Serving: Website/"
echo "Local URL: http://localhost:$PORT"
echo "=================================================="
echo "Opening browser..."

# Start the Python HTTP server in the background and suppress output
python3 -m http.server $PORT --directory Website > /dev/null 2>&1 &
SERVER_PID=$!

# Ensure the server process is cleaned up on script exit
cleanup() {
  echo ""
  echo "Stopping development server (PID $SERVER_PID)..."
  kill "$SERVER_PID" 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# Give the server a moment to start up
sleep 1

# Open in default web browser on macOS
open "http://localhost:$PORT"

echo "Server is running. Press [Ctrl+C] to stop."
echo "--------------------------------------------------"

# Keep the script running to wait for Ctrl+C
wait "$SERVER_PID"
