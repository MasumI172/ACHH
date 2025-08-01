import fs from 'fs';
import path from 'path';

// Essential files that must be preserved for the website to work
const ESSENTIAL_FILES = [
  'Logo.PNG',
  'Arabian Coast Logo (3).JPG',
  'IMG_5151_1753612931273.png', // Main property image
  // WhatsApp images for guidebook
  'WhatsApp Image 2025-07-23 at 10.21.19_609dd4ba_1753288427064.jpg',
  'WhatsApp Image 2025-07-23 at 10.21.19_9b8a1867_1753288413659.jpg',
  'WhatsApp Image 2025-07-23 at 10.21.20_51cd866c_1753288433584.jpg',
  // Recent property screenshots for guidebook
  'image_1753557089670.png',
  'image_1753557201611.png',
  'image_1753557338652.png',
  'image_1753558776789.png',
  'image_1753558930241.png'
];

function prepareForDeployment() {
  console.log('🚀 Preparing Arabian Coast Holiday Homes for deployment...');
  
  // Create public/images directory if it doesn't exist
  const publicImagesDir = './public/images';
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }
  
  // Copy essential files to public directory
  let copiedCount = 0;
  ESSENTIAL_FILES.forEach(file => {
    const sourcePath = `./attached_assets/${file}`;
    const destPath = `${publicImagesDir}/${file}`;
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      copiedCount++;
      console.log(`✅ Copied ${file}`);
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`- Essential files copied: ${copiedCount}`);
  console.log(`- Destination: ${publicImagesDir}`);
  
  // Check total size of public directory
  const publicSize = getDirectorySize('./public');
  console.log(`- Public directory size: ${(publicSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (publicSize < 50 * 1024 * 1024) { // 50MB limit
    console.log(`✅ Size is within GitHub limits!`);
  } else {
    console.log(`⚠️  Size may exceed GitHub limits`);
  }
  
  console.log(`\n📋 Next steps:`);
  console.log(`1. Test your website locally to ensure images load`);
  console.log(`2. Commit to GitHub (attached_assets/ is ignored)`);
  console.log(`3. Deploy to Render.com`);
  console.log(`4. For full image gallery, consider Cloudinary migration`);
}

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  if (!fs.existsSync(dirPath)) return 0;
  
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}

// Run the script
prepareForDeployment();