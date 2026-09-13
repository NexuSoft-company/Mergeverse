import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

const storeImport = `import { useEconomyStore } from './store/economyStore';\n`;
if (!code.includes('useEconomyStore')) {
  // Find where to inject
  code = code.replace(/import \{ AnimatePresence/, storeImport + 'import { AnimatePresence');
}

// Ensure the regex finds the right lines. They are not guaranteed to be strictly consecutive if there's other code like level between them.
// Let's replace the whole chunk.
const chunkPattern = /const \[level, setLevel\].*?(?=\n  const \[combo, setCombo\])/s;

let newChunk = `  const { coins, gems, energy, level, xp, streak } = useEconomyStore();
  const setCoins = (updater: any) => useEconomyStore.setState(s => ({ coins: typeof updater === 'function' ? updater(s.coins) : updater }));
  const setGems = (updater: any) => useEconomyStore.setState(s => ({ gems: typeof updater === 'function' ? updater(s.gems) : updater }));
  const setEnergy = (updater: any) => useEconomyStore.setState(s => ({ energy: typeof updater === 'function' ? updater(s.energy) : updater }));
  const setLevel = (updater: any) => useEconomyStore.setState(s => ({ level: typeof updater === 'function' ? updater(s.level) : updater }));
  const setXp = (updater: any) => useEconomyStore.setState(s => ({ xp: typeof updater === 'function' ? updater(s.xp) : updater }));
  const setStreak = (updater: any) => useEconomyStore.setState(s => ({ streak: typeof updater === 'function' ? updater(s.streak) : updater }));
`;

if(chunkPattern.test(code)){
   code = code.replace(chunkPattern, newChunk);
   fs.writeFileSync('src/App.tsx', code);
   console.log("Replaced successfully");
} else {
   console.log("Chunk not found");
}

