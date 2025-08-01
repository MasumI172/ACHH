#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building production version...');

// Build the frontend
console.log('Building frontend with Vite...');
execSync('vite build', { stdio: 'inherit' });

// Build the backend with proper externals
console.log('Building backend with esbuild...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --external:vite --external:nanoid --external:../vite.config', { stdio: 'inherit' });

// Copy the built frontend to the right location
const distPublicPath = path.join(process.cwd(), 'dist', 'public');
const buildPath = path.join(process.cwd(), 'dist');

if (fs.existsSync(buildPath) && !fs.existsSync(distPublicPath)) {
  // Move the Vite build output to dist/public
  const viteBuildPath = path.join(process.cwd(), 'dist');
  
  // Find the actual output directory from Vite
  const files = fs.readdirSync(viteBuildPath);
  const hasIndexHtml = files.includes('index.html');
  
  if (hasIndexHtml) {
    // Create public directory in dist
    fs.mkdirSync(distPublicPath, { recursive: true });
    
    // Move all files except index.js to public
    files.forEach(file => {
      if (file !== 'index.js') {
        const srcPath = path.join(viteBuildPath, file);
        const destPath = path.join(distPublicPath, file);
        
        if (fs.statSync(srcPath).isDirectory()) {
          execSync(`cp -r "${srcPath}" "${destPath}"`, { stdio: 'inherit' });
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
        
        // Remove from original location
        if (fs.statSync(srcPath).isDirectory()) {
          fs.rmSync(srcPath, { recursive: true });
        } else {
          fs.unlinkSync(srcPath);
        }
      }
    });
  }
}

console.log('Production build complete!');