#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci --only=production

echo "Building the application..."
npm run build

echo "Build completed successfully!"
ls -la build/
