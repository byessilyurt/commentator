#!/bin/bash

# Build script for Commentator Chrome Extension

echo "🚀 Building Commentator Chrome Extension..."

# Create build directory
mkdir -p build

# Copy all necessary files to build directory
cp manifest.json build/
cp background.js build/
cp popup.html build/
cp popup.js build/
cp offscreen.html build/
cp youtube-player.js build/

# Copy content script
mkdir -p build/src
cp src/content.js build/src/

# Copy icons (if they exist)
if [ -d "icons" ]; then
    cp -r icons build/
else
    echo "⚠️  Warning: No icons directory found. Please add icon files before publishing."
    mkdir -p build/icons
    echo "Add your icon files (16x16, 32x32, 48x48, 128x128 PNG) to the icons directory" > build/icons/README.txt
fi

# Create ZIP file for Chrome Web Store
cd build
zip -r ../commentator-extension.zip . -x "*.DS_Store" "*.git*"
cd ..

echo "✅ Extension built successfully!"
echo "📦 ZIP file created: commentator-extension.zip"
echo ""
echo "Next steps:"
echo "1. Add icon files to the icons/ directory"
echo "2. Test the extension by loading the build/ directory in Chrome"
echo "3. Upload commentator-extension.zip to Chrome Web Store"
echo ""
echo "To test:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked' and select the build/ directory"