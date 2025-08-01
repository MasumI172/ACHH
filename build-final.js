#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building FINAL deployment for Render.com...');

try {
  // Clean any existing build
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }

  // Step 1: Build frontend only
  console.log('1. Building frontend with Vite...');
  execSync('vite build', { stdio: 'inherit' });

  // Step 2: Build backend with absolute isolation
  console.log('2. Building backend with absolute Vite isolation...');
  
  // Use esbuild with maximum isolation
  const esbuildCmd = [
    'esbuild server/index.render.ts',
    '--platform=node',
    '--format=esm', 
    '--bundle',
    '--outfile=dist/server.js',
    '--packages=external',
    '--banner:js="// Production server - completely isolated"',
    '--define:process.env.NODE_ENV=\\"production\\"'
  ].join(' ');
  
  execSync(esbuildCmd, { stdio: 'inherit' });

  // Step 3: Create final startup script that definitely doesn't import Vite
  console.log('3. Creating Vite-proof startup script...');
  
  const startupScript = `#!/usr/bin/env node

// Startup script - completely isolated from development dependencies
process.env.NODE_ENV = 'production';

// Import the bundled server
import('./server.js').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
`;

  fs.writeFileSync('dist/index.js', startupScript);

  // Step 4: Verify no Vite references
  console.log('4. Verifying build integrity...');
  
  const serverContent = fs.readFileSync('dist/server.js', 'utf8');
  if (serverContent.includes('vite') || serverContent.includes('nanoid')) {
    console.error('❌ CRITICAL: Vite references found in build!');
    process.exit(1);
  }
  
  const indexContent = fs.readFileSync('dist/index.js', 'utf8');
  if (indexContent.includes('vite')) {
    console.error('❌ CRITICAL: Vite references found in startup script!');
    process.exit(1);
  }

  // Step 5: Organize frontend files
  console.log('5. Organizing frontend files...');
  
  const distPublicPath = path.join(process.cwd(), 'dist', 'public');
  if (!fs.existsSync(distPublicPath)) {
    fs.mkdirSync(distPublicPath, { recursive: true });
  }

  // Move frontend build files to public directory
  const distPath = path.join(process.cwd(), 'dist');
  const files = fs.readdirSync(distPath);
  
  for (const file of files) {
    if (file !== 'index.js' && file !== 'server.js' && file !== 'public') {
      const srcPath = path.join(distPath, file);
      const destPath = path.join(distPublicPath, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        execSync(`cp -r "${srcPath}" "${destPath}"`, { stdio: 'inherit' });
        fs.rmSync(srcPath, { recursive: true });
      } else if (file.match(/\.(html|css|js|png|svg|ico|json)$/)) {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
      }
    }
  }

  // Step 6: Final verification
  console.log('6. Final verification...');
  
  const finalFiles = [
    'dist/index.js',    // Startup script
    'dist/server.js',   // Bundled server
    'dist/public/index.html'  // Frontend
  ];
  
  for (const file of finalFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Missing required file: ${file}`);
      process.exit(1);
    }
  }

  console.log('✅ DEPLOYMENT BUILD COMPLETE!');
  console.log('📁 Files created:');
  console.log('   - dist/index.js (startup script)');
  console.log('   - dist/server.js (bundled backend)');  
  console.log('   - dist/public/ (frontend files)');
  console.log('');
  console.log('🚀 Ready for Render.com deployment!');
  console.log('   Start command: node dist/index.js');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}