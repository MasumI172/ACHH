
#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building for Render.com deployment...');

try {
  // Step 1: Build frontend
  console.log('1. Building frontend...');
  execSync('vite build', { stdio: 'inherit' });

  // Step 2: Build backend with correct file reference
  console.log('2. Building backend...');
  const esbuildCommand = [
    'esbuild server/index.render.ts',
    '--platform=node',
    '--format=esm',
    '--bundle',
    '--outfile=dist/index.js',
    '--packages=external'
  ].join(' ');
  
  execSync(esbuildCommand, { stdio: 'inherit' });

  // Step 3: Organize build output
  console.log('3. Organizing build output...');
  
  // Create dist/public directory if it doesn't exist
  const distPublicPath = path.join(process.cwd(), 'dist', 'public');
  if (!fs.existsSync(distPublicPath)) {
    fs.mkdirSync(distPublicPath, { recursive: true });
  }

  // Move Vite build output to dist/public (if not already there)
  const distPath = path.join(process.cwd(), 'dist');
  const files = fs.readdirSync(distPath);
  
  for (const file of files) {
    if (file !== 'index.js' && file !== 'public') {
      const srcPath = path.join(distPath, file);
      const destPath = path.join(distPublicPath, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        execSync(`cp -r "${srcPath}" "${destPath}"`, { stdio: 'inherit' });
        fs.rmSync(srcPath, { recursive: true });
      } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.ico')) {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
      }
    }
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Frontend built to: dist/public/');
  console.log('📁 Backend built to: dist/index.js');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
