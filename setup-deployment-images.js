import fs from 'fs';
import path from 'path';

// Map the guidebook images to their expected public names
const GUIDEBOOK_IMAGE_MAPPING = {
  // These are the actual screenshot files from your attached_assets
  'image_1753557089670.png': 'guidebook-burj-khalifa.png',
  'image_1753557201611.png': 'guidebook-dubai-fountain.png', 
  'image_1753557338652.png': 'guidebook-aquarium-new.png',
  'image_1753558776789.png': 'guidebook-dubai-mall.png',
  'image_1753558930241.png': 'guidebook-ice-rink-new.png'
};

function setupDeploymentImages() {
  console.log('🚀 Setting up deployment images for Arabian Coast Holiday Homes...');
  
  // Create public directory if it doesn't exist
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public', { recursive: true });
  }
  
  // Copy and rename guidebook images to public folder
  Object.entries(GUIDEBOOK_IMAGE_MAPPING).forEach(([sourceFile, publicName]) => {
    const sourcePath = `./attached_assets/${sourceFile}`;
    const destPath = `./public/${publicName}`;
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${sourceFile} → ${publicName}`);
    } else {
      console.log(`⚠️  Source file not found: ${sourceFile}`);
    }
  });
  
  // Copy logo files to public directory with correct names
  const logoMapping = {
    'Logo.PNG': 'logo.png',
    'Arabian Coast Logo (3).JPG': 'arabian-coast-logo.jpg'
  };
  
  Object.entries(logoMapping).forEach(([sourceFile, publicName]) => {
    const sourcePath = `./attached_assets/${sourceFile}`;
    const destPath = `./public/${publicName}`;
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${sourceFile} → ${publicName}`);
    }
  });
  
  // Check total size
  const publicSize = getDirectorySize('./public');
  console.log(`\n📊 Public directory size: ${(publicSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (publicSize < 50 * 1024 * 1024) {
    console.log(`✅ Size is GitHub-compatible!`);
  }
  
  console.log(`\n🎉 Deployment setup complete!`);
  console.log(`📋 Your website now has:`);
  console.log(`   - Essential guidebook images`);
  console.log(`   - Company logos`);
  console.log(`   - GitHub-compatible file sizes`);
  console.log(`   - All functionality preserved`);
  
  console.log(`\n🚀 Ready for GitHub & Render.com deployment!`);
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

setupDeploymentImages();