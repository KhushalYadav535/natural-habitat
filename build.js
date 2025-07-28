const { execSync } = require('child_process');
const path = require('path');

console.log('Starting custom build process...');

try {
  // Use node to run vite directly
  const vitePath = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
  console.log('Vite path:', vitePath);
  
  execSync(`node "${vitePath}" build`, {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 