// FIXED ISSUE WITH ROUTING

const fs = require('fs');
const path = require('path');

const outDirectory = path.join(__dirname, 'out'); // Adjust if your directory structure is different
const firebaseConfigPath = path.join(__dirname, 'firebase.json');

// Function to read all .html files from a directory
function readHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  let htmlFiles = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively read nested directories
      htmlFiles = [...htmlFiles, ...readHtmlFiles(filePath)];
    } else if (file.endsWith('.html') && file !== 'index.html') {
      // Remove the 'out' directory and '.html' extension from path
      const relativePath = path.relative(outDirectory, filePath).replace(/\.html$/, '');
      htmlFiles.push(`/${relativePath}`);
    }
  });

  return htmlFiles;
}

const htmlFiles = readHtmlFiles(outDirectory);

// Separate special pages from other files to handle them specially
const specialPages = ['/projects', '/projects2', '/404'];
const projectsRoot = htmlFiles.filter(f => f === '/projects' || f === '/projects2');
const otherFiles = htmlFiles.filter(f => !specialPages.includes(f));

// Generate rewrite rules for each HTML file (except projects root pages)
let rewrites = otherFiles.map(file => ({
  source: `${file}{,/**}`,
  destination: `${file}.html`
}));

// Add projects root pages with exact match only (no catch-all)
projectsRoot.forEach(route => {
  rewrites.push({
    source: route,
    destination: `${route}.html`
  });
});

// Add 404 fallback for unknown routes
rewrites.push({
  source: "/404{,/**}",
  destination: "/404.html"
});

// Add exact match for root
rewrites.push({
  source: "/",
  destination: "/index.html"
});

// Fallback for all other unknown routes - serve 404.html
rewrites.push({
  source: "/**",
  destination: "/404.html"
});

// Read the existing firebase.json configuration
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

// Update the rewrites in firebase.json
firebaseConfig.hosting = firebaseConfig.hosting || {};
firebaseConfig.hosting.rewrites = rewrites;

// Write the updated configuration back to firebase.json
fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, 2));

console.log('firebase.json has been updated with new rewrites.');
