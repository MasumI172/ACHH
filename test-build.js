// Test build script to verify production setup
import fs from 'fs';
import path from 'path';

console.log('🔍 Checking build configuration...');

// Check if dist directory exists
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log('✅ dist/ directory exists');
  
  const publicPath = path.resolve(distPath, 'public');
  if (fs.existsSync(publicPath)) {
    console.log('✅ dist/public/ directory exists');
    
    const indexPath = path.resolve(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('✅ dist/public/index.html exists');
    } else {
      console.log('❌ dist/public/index.html missing');
    }
  } else {
    console.log('❌ dist/public/ directory missing');
  }
  
  const serverPath = path.resolve(distPath, 'index.js');
  if (fs.existsSync(serverPath)) {
    console.log('✅ dist/index.js exists');
  } else {
    console.log('❌ dist/index.js missing');
  }
} else {
  console.log('❌ dist/ directory missing - run npm run build');
}

// Check public directory for static assets
const publicAssetsPath = path.resolve(process.cwd(), 'public');
if (fs.existsSync(publicAssetsPath)) {
  console.log('✅ public/ directory exists');
  const files = fs.readdirSync(publicAssetsPath);
  console.log(`   Found ${files.length} files:`, files.slice(0, 5).join(', '));
} else {
  console.log('❌ public/ directory missing');
}

console.log('\n📋 For Render.com deployment:');
console.log('1. Build Command: npm ci && npm run build');
console.log('2. Start Command: npm run start');
console.log('3. Environment: NODE_ENV=production');
console.log('4. Add DATABASE_URL from PostgreSQL database');