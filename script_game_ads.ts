import fs from 'fs';

let content = fs.readFileSync('src/components/GameWrapper.tsx', 'utf8');

if (!content.includes('useAdStore')) {
  content = content.replace(/import \{ useEconomyStore \} from '\.\.\/store\/economyStore';/, `import { useEconomyStore } from '../store/economyStore';\nimport { useAdStore } from '../store/adStore';\nimport { Play, Sparkles } from 'lucide-react';`);
  
  content = content.replace(/const \{ addCoins, addXp \} = useEconomyStore\(\);/, `const { addCoins, addXp, vipLevel } = useEconomyStore();\n  const { showRewardedVideo, showInterstitial } = useAdStore();`);

  // Inject "Watch Ad to x2 Rewards" block
  const x2RewardBlock = `
                 <motion.button 
                   whileTap={{ scale: 0.95 }}
                   onClick={() => showRewardedVideo('unity', 'coins', coinsEarned, () => {
                      addCoins(coinsEarned);
                      setCoinsEarned(coinsEarned * 2);
                   })}
                   className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black py-4 rounded-[20px] shadow-[0_10px_20px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2 border-b-4 border-emerald-700 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-widest text-sm"
                 >
                   <Play className="w-5 h-5 fill-current" /> Watch Ad for x2 Rewards
                 </motion.button>
                 
                 <motion.button 
                   whileTap={{ scale: 0.95 }}
                   onClick={onRestart}
                   className="w-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/50 font-black py-4 rounded-[20px] shadow-inner font-sans flex justify-center items-center gap-2 hover:bg-indigo-600/40 transition-colors uppercase tracking-widest text-sm"
                 >
                   <RotateCcw className="w-5 h-5" /> Play Again
                 </motion.button>

                 <motion.button 
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                      if (vipLevel === 0 && Math.random() > 0.5) {
                         showInterstitial('admob', () => navigate('/games'));
                      } else {
                         navigate('/games');
                      }
                   }}
                   className="w-full bg-black/40 text-slate-400 font-bold py-4 rounded-[20px] hover:text-white transition-colors uppercase tracking-widest text-xs"
                 >
                   Return to Lobby
                 </motion.button>
  `;
  
  // Need to find where the buttons are for Game Over and replace them.
  content = content.replace(/<motion\.button[^>]*onClick=\{onRestart\}.*?Play Again<\/motion\.button>/s, x2RewardBlock);
  content = content.replace(/<motion\.button[^>]*onClick=\{[^}]*navigate\('\/games'\)[^}]*\}.*?Return to Lobby<\/motion\.button>/s, '');
  
  fs.writeFileSync('src/components/GameWrapper.tsx', content);
}
