#!/bin/bash

# Deployment script for Arabian Coast Holiday Homes
# This script creates a deployment-ready version for GitHub/Render.com

echo "🚀 Preparing Arabian Coast Holiday Homes for deployment..."

# Create a temporary deployment directory
rm -rf deployment-temp
mkdir deployment-temp

echo "📁 Copying project files..."

# Copy all files except large assets
rsync -av --progress . deployment-temp/ \
  --exclude=attached_assets \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=deployment-temp \
  --exclude=dist

# Create a minimal attached_assets folder with only essential files
mkdir -p deployment-temp/attached_assets

# Copy only the most essential images (logos and key property images)
echo "🖼️  Copying essential images..."
cp attached_assets/Logo.PNG deployment-temp/attached_assets/ 2>/dev/null || echo "Logo.PNG not found"
cp attached_assets/"Arabian Coast Logo (3).JPG" deployment-temp/attached_assets/ 2>/dev/null || echo "Arabian Coast Logo not found"

# Copy the most recent property images (keeping file names for compatibility)
echo "📸 Copying recent property images..."
find attached_assets -name "image_*.png" -newer attached_assets/Logo.PNG -exec cp {} deployment-temp/attached_assets/ \; 2>/dev/null || true

# Check the size of the deployment folder
echo "📊 Checking deployment size..."
du -sh deployment-temp/

echo "✅ Deployment folder ready in 'deployment-temp/'"
echo ""
echo "📋 Next steps:"
echo "1. cd deployment-temp"
echo "2. git init"
echo "3. git add ."
echo "4. git commit -m 'Initial deployment'"
echo "5. git remote add origin YOUR_GITHUB_REPO_URL"
echo "6. git push -u origin main"
echo ""
echo "💡 Note: Large images have been excluded. Your website will work with"
echo "   placeholder images. Consider uploading images to Cloudinary for production."