import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add will-change-transform to blocks
content = content.replace(/className={\`absolute p-0.5 /g, 'className={`absolute p-0.5 will-change-transform ');

// Add will-change-transform to particles
content = content.replace(/className={\`absolute rounded-full bg-gradient-to-r /g, 'className={`absolute rounded-full bg-gradient-to-r will-change-transform ');

// Remove mix-blend-screen for performance
content = content.replace(/mix-blend-screen /g, '');

// Reduce blur in particle / block shadows if they exist
content = content.replace(/blur-\\[[0-9]+px\\]/g, 'blur-[2px]'); // lower resolution blur

fs.writeFileSync('src/App.tsx', content);
