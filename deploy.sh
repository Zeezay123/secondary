#!/bin/bash
# Quick deployment script for Plesk server

echo "Starting deployment..."

# Navigate to project directory
cd /var/www/vhosts/yourdomain.com/httpdocs

# Pull latest code
echo "Pulling latest code from Git..."
git pull origin main

# Install backend dependencies
echo "Installing backend dependencies..."
cd Api
npm install --production

# Build frontend
echo "Building frontend..."
cd ../postgrad-page
npm install
npm run build

echo "Deployment complete!"
echo "Please restart Node.js app in Plesk control panel"
echo "Go to: Node.js > Restart App"
