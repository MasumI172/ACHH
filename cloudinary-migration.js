// Cloudinary Migration Script for Arabian Coast Holiday Homes
// This script helps migrate your images to Cloudinary for deployment

import fs from 'fs';
import path from 'path';

// Configuration
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // Update this after creating Cloudinary account
const ATTACHED_ASSETS_DIR = './attached_assets';

// Generate Cloudinary URLs for all your images
function generateCloudinaryMappings() {
  const mappings = {};
  
  try {
    const files = fs.readdirSync(ATTACHED_ASSETS_DIR);
    
    files.forEach(file => {
      if (file.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
        const localPath = `@assets/${file}`;
        const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1/${file}`;
        mappings[localPath] = cloudinaryUrl;
      }
    });
    
    return mappings;
  } catch (error) {
    console.error('Error reading assets directory:', error);
    return {};
  }
}

// Update code files to use Cloudinary URLs
function updateCodeFiles(mappings) {
  const filesToUpdate = [
    // Add any files that import images
    './client/src/pages/home.tsx',
    './client/src/pages/about.tsx',
    './client/src/pages/guidebook.tsx',
    './client/src/components/property-card.tsx',
    // Add more files as needed
  ];
  
  filesToUpdate.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;
      
      Object.entries(mappings).forEach(([localPath, cloudinaryUrl]) => {
        if (content.includes(localPath)) {
          content = content.replace(new RegExp(localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), cloudinaryUrl);
          updated = true;
        }
      });
      
      if (updated) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated ${filePath}`);
      }
    }
  });
}

// Create upload instructions
function createUploadInstructions(mappings) {
  const instructions = `# Cloudinary Upload Instructions

## Step 1: Sign up for Cloudinary
1. Go to https://cloudinary.com/users/register/free
2. Create your free account
3. Note your Cloud Name from the dashboard

## Step 2: Update Configuration
Update CLOUDINARY_CLOUD_NAME in cloudinary-migration.js to your actual cloud name.

## Step 3: Upload Files
Upload these files to your Cloudinary account (keep exact file names):

${Object.keys(mappings).map(key => `- ${key.replace('@assets/', '')}`).join('\n')}

## Step 4: Run Migration
Run: node cloudinary-migration.js

## Step 5: Test Locally
Verify all images load correctly before deploying.

Total files to upload: ${Object.keys(mappings).length}
`;

  fs.writeFileSync('./CLOUDINARY_INSTRUCTIONS.md', instructions);
  console.log('📋 Created CLOUDINARY_INSTRUCTIONS.md');
}

// Main execution
function main() {
  console.log('🚀 Starting Cloudinary migration preparation...');
  
  const mappings = generateCloudinaryMappings();
  
  if (Object.keys(mappings).length === 0) {
    console.log('❌ No image files found in attached_assets directory');
    return;
  }
  
  console.log(`📸 Found ${Object.keys(mappings).length} image files`);
  
  // Don't update files yet - just create instructions
  createUploadInstructions(mappings);
  
  // Save mappings for later use
  fs.writeFileSync('./cloudinary-mappings.json', JSON.stringify(mappings, null, 2));
  console.log('💾 Saved mappings to cloudinary-mappings.json');
  
  console.log('\n✅ Migration preparation complete!');
  console.log('📖 Read CLOUDINARY_INSTRUCTIONS.md for next steps');
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateCloudinaryMappings, updateCodeFiles };