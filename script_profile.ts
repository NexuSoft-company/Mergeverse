import fs from 'fs';

let code = fs.readFileSync('src/pages/Profile.tsx', 'utf8');

if (!code.includes('useEconomyStore')) {
  code = code.replace(/import \{ useState, useEffect \} from 'react';/, `import { useState, useEffect } from 'react';\nimport { useEconomyStore } from '../store/economyStore';`);
}

code = code.replace(
/  const \[xp, setXp\] = useState\(0\);.*?const \{ level, nextLevelXp, progress \} = calculateLevel\(xp\);/s,
`  const { xp, coins, gems, level } = useEconomyStore();
  const [highScores, setHighScores] = useState<{gameId: string, score: number}[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Find high scores
      const scores = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('hs_')) {
           const gameId = key.replace('hs_', '');
           const score = parseInt(localStorage.getItem(key) || '0', 10);
           if (score > 0) {
             scores.push({ gameId, score });
           }
        }
      }
      scores.sort((a, b) => b.score - a.score);
      setHighScores(scores.slice(0, 5)); // Top 5
    }
  }, []);

  const currentLevelXp = Math.pow(level - 1, 2) * 50;
  const nextLevelXp = Math.pow(level, 2) * 50;
  const progress = Math.max(0, Math.min(100, ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100));`
);

fs.writeFileSync('src/pages/Profile.tsx', code);
