import fs from 'fs';

let code = fs.readFileSync('src/pages/PlatformLayout.tsx', 'utf8');

// remove previous faulty rewrite if it exists
code = code.replace(/import \{ useEffect \} from 'react';\n/, '');

// Add React hook import at top if needed
if (!code.includes('useEffect')) {
   code = code.replace(/import \{ Outlet/, `import { useEffect } from 'react';\nimport { Outlet`);
}

code = code.replace(
  /const \{ coins, gems, energy, level, premiumTokens, recoverEnergy \} = useEconomyStore\(\);.*?\}, \[recoverEnergy\]\);/s,
  `const { coins, gems, energy, level, premiumTokens } = useEconomyStore();`
);

// properly insert it
code = code.replace(
  /const \{ coins, gems, energy, level, premiumTokens \} = useEconomyStore\(\);/,
  `const { coins, gems, energy, level, premiumTokens, recoverEnergy } = useEconomyStore();
  
  useEffect(() => {
     recoverEnergy(); // initial check
     const interval = setInterval(() => {
        recoverEnergy();
     }, 60000);
     return () => clearInterval(interval);
  }, [recoverEnergy]);`
);


fs.writeFileSync('src/pages/PlatformLayout.tsx', code);
