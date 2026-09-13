import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('AdOverlay')) {
  code = code.replace(/import \{ PlatformLayout \} from '\.\/pages\/PlatformLayout';/, `import { PlatformLayout } from './pages/PlatformLayout';\nimport { AdOverlay } from './components/AdOverlay';`);
  
  // Actually PlatformLayout is lazy loaded usually, let's just put the import up top.
  code = code.replace(/import \{ AuthOverlay \} from '\.\/components\/AuthOverlay';/, `import { AuthOverlay } from './components/AuthOverlay';\nimport { AdOverlay } from './components/AdOverlay';`);
  
  code = code.replace(/<\/Routes>\n\s*<\/Suspense>/, `</Routes>\n      </Suspense>\n      <AdOverlay />`);
  fs.writeFileSync('src/App.tsx', code);
}
