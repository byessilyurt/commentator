#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process for Commentator..."

# Navigate to project root
cd "$(dirname "$0")/.."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building application..."
npm run build

# Restart the application (if using PM2)
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting application with PM2..."
    pm2 restart commentator-app || pm2 start npm --name "commentator-app" -- start
else
    echo "⚠️ PM2 not found. Please start the application manually with 'npm start'"
fi

echo "✅ Deployment completed successfully!" 