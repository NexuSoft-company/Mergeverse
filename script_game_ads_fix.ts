import fs from 'fs';

let content = fs.readFileSync('src/components/GameWrapper.tsx', 'utf8');

if (!content.includes('useAdStore')) {
  // At the top, add AdStore imports
  content = content.replace(
    /import \{ useEconomyStore \} from '\.\.\/store\/economyStore';/, 
    `import { useEconomyStore } from '../store/economyStore';\nimport { useAdStore } from '../store/adStore';`
  );
  
  content = content.replace(
    /import \{ useNavigate \} from 'react-router-dom';/,
    `import { useNavigate } from 'react-router-dom';\nimport { Play, LogOut } from 'lucide-react';`
  );

  content = content.replace(
    /const \{ addCoins, addXp \} = useEconomyStore\(\);/, 
    `const { addCoins, addXp, vipLevel } = useEconomyStore();\n  const { showRewardedVideo, showInterstitial } = useAdStore();`
  );

  // Replace Play Again button block
  const buttonBlock = `
                <div className="space-y-3">
                   <motion.button 
                     whileTap={{ scale: 0.95 }}
                     onClick={() => showRewardedVideo('unity', 'coins', coinsEarned, () => {
                        addCoins(coinsEarned);
                        setCoinsEarned(coinsEarned * 2);
                     })}
                     className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black py-4 rounded-[20px] shadow-[0_10px_20px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2 border-b-4 border-emerald-700 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-widest text-sm"
                   >
                     <Play className="w-5 h-5 fill-current" /> Ad: x2 Coins
                   </motion.button>
                   
                   <div className="flex gap-3">
                     <motion.button 
                       whileTap={{ scale: 0.95 }}
                       onClick={() => {
                          if (vipLevel === 0 && Math.random() > 0.5) {
                             showInterstitial('admob', () => navigate('/games'));
                          } else {
                             navigate('/games');
                          }
                       }}
                       className="flex-1 py-4 bg-white/5 border border-white/10 text-slate-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-white/10 transition-colors"
                     >
                       <LogOut className="w-4 h-4" /> Lobby
                     </motion.button>

                     <motion.button 
                       whileTap={{ scale: 0.95 }}
                       onClick={onRestart}
                       className="flex-1 py-4 bg-gradient-to-b from-white to-slate-200 text-[#0a0a14] font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-[0_5px_15px_rgba(255,255,255,0.2)] uppercase tracking-widest"
                     >
                       <RefreshCcw className="w-4 h-4" /> Replay
                     </motion.button>
                   </div>
                </div>
  `;
  
  content = content.replace(
    /<motion\.button\s+whileTap=\{\{ scale: 0\.95 \}\}\s+onClick=\{onRestart\}.*?<\/motion\.button>/s,
    buttonBlock
  );
  
  fs.writeFileSync('src/components/GameWrapper.tsx', content);
}
