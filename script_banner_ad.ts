import fs from 'fs';

let content = fs.readFileSync('src/pages/PlatformLayout.tsx', 'utf8');

if (!content.includes('BannerAd')) {
  // We'll replace the closing div and add the banner above the bot nav? No, bottom nav is fixed to bottom. Let's add it right above the bottom nav block.
  // We can just add it inside the min-h-screen container. No wait, the bottom nav is often fixed to bottom. We could just add the banner immediately after the `Outlet` or just above the `<div className="fixed bottom-0`
  
  content = content.replace(/import \{ Outlet/, `import { BannerAd } from '../components/BannerAd';\nimport { Outlet`);
  
  content = content.replace(
    /<div className="fixed bottom-0 w-full max-w-md mx-auto z-50">/s,
    `<div className="fixed bottom-[72px] w-full max-w-md mx-auto z-40">
        <BannerAd network="admob" />
      </div>
      <div className="fixed bottom-0 w-full max-w-md mx-auto z-50">`
  );
  
  fs.writeFileSync('src/pages/PlatformLayout.tsx', content);
}
