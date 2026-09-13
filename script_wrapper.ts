import fs from 'fs';
let code = fs.readFileSync('src/components/GameWrapper.tsx', 'utf8');

if (!code.includes('useEconomyStore')) {
  code = code.replace(/import \{ useNavigate \} from 'react-router-dom';/, `import { useNavigate } from 'react-router-dom';\nimport { useEconomyStore } from '../store/economyStore';`);
}

code = code.replace(
/  const navigate = useNavigate\(\);/,
`  const navigate = useNavigate();\n  const { addCoins, addXp } = useEconomyStore();`
);

code = code.replace(
/         const currentXp = parseInt\(localStorage\.getItem\('dp_xp'\) \|\| '0', 10\);\n         const currentCoins = parseInt\(localStorage\.getItem\('dp_coins'\) \|\| '0', 10\);\n         localStorage\.setItem\('dp_xp', \(currentXp \+ earnedXp\)\.toString\(\)\);\n         localStorage\.setItem\('dp_coins', \(currentCoins \+ earnedCoins\)\.toString\(\)\);/s,
`         addCoins(earnedCoins);\n         addXp(earnedXp);`
);

fs.writeFileSync('src/components/GameWrapper.tsx', code);
