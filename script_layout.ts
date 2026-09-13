import fs from 'fs';

let code = fs.readFileSync('src/pages/PlatformLayout.tsx', 'utf8');

if (!code.includes('useEconomyStore')) {
  code = code.replace(/import \{ Outlet/, `import { useEconomyStore } from '../store/economyStore';\nimport { Outlet`);
}

code = code.replace(/export function PlatformLayout\(\) \{/, `export function PlatformLayout() {\n  const { coins, gems, energy, level, premiumTokens } = useEconomyStore();`);

// Replace hardcoded '12.5k' with '{coins}'
code = code.replace(/<span className="font-black text-sm">12.5k<\/span>/, `<span className="font-black text-sm">{coins}</span>`);

// Replace hardcoded '45' with '{gems}'
code = code.replace(/<span className="font-black text-sm text-fuchsia-100">45<\/span>/, `<span className="font-black text-sm text-fuchsia-100">{gems}</span>`);

// Replace '12' with Level and 'Energy'
code = code.replace(/<span className="font-black text-[10px] text-fuchsia-300">12<\/span>/, `<span className="font-black text-[10px] text-fuchsia-300">{level}</span>`);

// Add premiumTokens maybe? Or Energy?
// Let's replace the second diamond maybe
code = code.replace(/<Battery className="w-4 h-4 text-emerald-400" \/>\n\s*<span className="font-black text-sm text-emerald-100">100\/100<\/span>/, `<Battery className="w-4 h-4 text-emerald-400" />\n           <span className="font-black text-sm text-emerald-100">{energy}</span>`);


fs.writeFileSync('src/pages/PlatformLayout.tsx', code);
