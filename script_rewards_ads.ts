import fs from 'fs';

let content = fs.readFileSync('src/pages/Rewards.tsx', 'utf8');

if (!content.includes('useAdStore')) {
  content = content.replace(/import \{ useEconomyStore \} from '\.\.\/store\/economyStore';/, `import { useEconomyStore } from '../store/economyStore';\nimport { useAdStore } from '../store/adStore';\nimport { Play, ShieldCheck, Zap } from 'lucide-react';`);
  
  content = content.replace(/const \{ streak, dailyRewardClaimedAt, claimDailyReward, addCoins, addGems \} = useEconomyStore\(\);/, `const { streak, dailyRewardClaimedAt, claimDailyReward, addCoins, addGems, vipLevel } = useEconomyStore();\n  const { showRewardedVideo, showOfferwall } = useAdStore();`);

  // Inject a section for Rewarded Ads after the "Missions" section or inside the center.
  // We can add it just before {/* Missions */}
  
  const rewardedAdsSection = `
      {/* Monetization / Rewarded Ads */}
      <div className="px-2 mt-8">
        <h3 className="text-lg font-black text-white mb-4">Earn More</h3>
        <div className="grid grid-cols-2 gap-4">
           <motion.div 
             whileTap={{ scale: 0.95 }}
             onClick={() => showRewardedVideo('admob', 'coins', 500, () => addCoins(500))}
             className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:bg-indigo-500/20 transition-all font-sans relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/20 blur-xl rounded-full pointer-events-none group-hover:bg-indigo-500/30"></div>
              <Play className="w-8 h-8 text-indigo-400 mb-2 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] fill-current" />
              <h4 className="font-black text-white text-sm">Watch Video</h4>
              <p className="text-indigo-300 text-[10px] font-black uppercase tracking-wider mb-2">Get 500 Coins</p>
           </motion.div>

           <motion.div 
             whileTap={{ scale: 0.95 }}
             onClick={() => showOfferwall('applovin')}
             className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:bg-emerald-500/20 transition-all font-sans relative overflow-hidden group"
           >
              <div className="absolute top-0 left-0 w-16 h-16 bg-emerald-500/20 blur-xl rounded-full pointer-events-none group-hover:bg-emerald-500/30"></div>
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <h4 className="font-black text-white text-sm">Offerwall</h4>
              <p className="text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-2">Gems & Energy</p>
           </motion.div>
        </div>
      </div>
  `;

  content = content.replace(/{\/\* Missions \*\/}/, rewardedAdsSection + '\n      {/* Missions */}');

  fs.writeFileSync('src/pages/Rewards.tsx', content);
}
