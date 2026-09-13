import fs from 'fs';

let content = fs.readFileSync('src/pages/Shop.tsx', 'utf8');

if (!content.includes('useAdStore')) {
  // Add import
  content = content.replace(
    /import \{ useEconomyStore \} from '\.\.\/store\/economyStore';/,
    `import { useEconomyStore } from '../store/economyStore';\nimport { useAdStore } from '../store/adStore';\nimport { Play, ShieldCheck } from 'lucide-react';`
  );

  content = content.replace(
    /const \{ addGems, addCoins, addEnergy, addPremiumTokens, premiumTokens \} = useEconomyStore\(\);/,
    `const { addGems, addCoins, addEnergy, addPremiumTokens, premiumTokens } = useEconomyStore();\n  const { showRewardedVideo, showOfferwall } = useAdStore();`
  );

  // We should add it before {/* Premium Tokens */} or {/* Gems Shop */}
  const freeGemsBlock = `
      {/* Free Gems (Monetization) */}
      <div className="px-2 mt-8">
        <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tight mb-4">
           Free Gems & Coins
        </h3>
        <div className="grid grid-cols-2 gap-4">
           <motion.div 
             whileTap={{ scale: 0.95 }}
             onClick={() => showRewardedVideo('unity', 'gems', 10, () => {
                addGems(10);
                setShowPurchase({ message: 'Got 10 Free Gems!' });
             })}
             className="bg-emerald-500/10 border border-emerald-500/30 rounded-[24px] p-5 flex flex-col items-center text-center cursor-pointer hover:bg-emerald-500/20 transition-all font-sans relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
           >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 blur-2xl rounded-full pointer-events-none group-hover:bg-emerald-500/30"></div>
              <div className="bg-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                 <Play className="w-5 h-5 text-emerald-400 fill-current" />
              </div>
              <h4 className="font-black text-white text-sm">Watch Video</h4>
              <p className="text-emerald-300 text-[10px] font-black uppercase tracking-wider mt-1">+10 Gems</p>
           </motion.div>

           <motion.div 
             whileTap={{ scale: 0.95 }}
             onClick={() => showOfferwall('applovin')}
             className="bg-amber-500/10 border border-amber-500/30 rounded-[24px] p-5 flex flex-col items-center text-center cursor-pointer hover:bg-amber-500/20 transition-all font-sans relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
           >
              <div className="absolute top-0 left-0 w-20 h-20 bg-amber-500/20 blur-2xl rounded-full pointer-events-none group-hover:bg-amber-500/30"></div>
              <div className="bg-amber-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                 <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="font-black text-white text-sm">Offerwall</h4>
              <p className="text-amber-300 text-[10px] font-black uppercase tracking-wider mt-1">Huge Rewards</p>
           </motion.div>
        </div>
      </div>
  `;

  content = content.replace(/{\/\* Premium Tokens \*\/}/, freeGemsBlock + '\n      {/* Premium Tokens */}');
  
  fs.writeFileSync('src/pages/Shop.tsx', content);
}
