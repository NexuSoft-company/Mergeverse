import React, { useState } from 'react';
import { useEconomyStore, POWERUP_CONFIGS, PowerupInventory } from '../store/economyStore';
import { useAdStore } from '../store/adStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coins, Gem, Zap, ShoppingBag, RotateCcw, Hammer, ArrowLeftRight, Shuffle, Check, Palette, Crown, Star, Bomb } from 'lucide-react';
import { audio } from '../lib/audio';
import { THEMES, THEME_IDS } from '../themes';

export function ShopModal({ onClose, asTab = false }: { onClose: () => void; asTab?: boolean }) {
  const { coins, gems, level, unlockedThemes, quickBuyEnabled, toggleQuickBuy, inventory, buyPowerup } = useEconomyStore();
  const [activeTab, setActiveTab] = useState<'powerups' | 'coins' | 'gems' | 'energy' | 'themes'>('powerups');
  const [purchaseAnimating, setPurchaseAnimating] = useState<string | null>(null);
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setPurchaseFeedback(msg);
    setTimeout(() => setPurchaseFeedback(null), 2500);
  };

  const handleBuyPowerupItem = (itemKey: keyof PowerupInventory, qty: number, currency: 'coins' | 'gems') => {
    audio.click();
    setPurchaseAnimating(`${itemKey}-${currency}`);
    const result = buyPowerup(itemKey, qty, currency);
    setTimeout(() => {
      setPurchaseAnimating(null);
      triggerFeedback(result.message);
      if (result.success) {
        useAdStore.getState().showInterstitial('AdMob');
      }
    }, 400);
  };

  const handleBuyBundle = () => {
    audio.click();
    setPurchaseAnimating('bundle');
    const store = useEconomyStore.getState();
    const bundleCost = 2500;
    if (store.coins < bundleCost) {
      setPurchaseAnimating(null);
      triggerFeedback(`Need ${bundleCost - store.coins} more Coins!`);
      return;
    }
    useEconomyStore.setState(s => ({
      coins: s.coins - bundleCost,
      inventory: {
        undo: (s.inventory?.undo || 0) + 3,
        hammer: (s.inventory?.hammer || 0) + 3,
        swap: (s.inventory?.swap || 0) + 3,
        shuffle: (s.inventory?.shuffle || 0) + 3,
        double: (s.inventory?.double || 0) + 3,
        bomb: (s.inventory?.bomb || 0) + 3,
        colorChange: (s.inventory?.colorChange || 0) + 3,
      }
    }));
    setTimeout(() => {
      setPurchaseAnimating(null);
      triggerFeedback('Acquired Master Booster Bundle (x3 All Power-Ups)!');
      useAdStore.getState().showInterstitial('AdMob');
    }, 400);
  };

  const handleBuyGemsWithCoins = (packId: string, costCoins: number, rewardGems: number) => {
    const currentCoins = useEconomyStore.getState().coins;
    if (currentCoins >= costCoins) {
      audio.click();
      setPurchaseAnimating(packId);
      setTimeout(() => {
        useEconomyStore.setState(s => ({
          coins: s.coins - costCoins,
          gems: s.gems + rewardGems
        }));
        setPurchaseAnimating(null);
        triggerFeedback(`Acquired +${rewardGems.toLocaleString()} Gems!`);
        useAdStore.getState().showInterstitial('AdMob');
      }, 400);
    } else {
      audio.error();
      triggerFeedback('Insufficient Gold Coins! Play matches to earn coins.');
    }
  };

  const handlePurchase = (id: string, costGems: number, rewardAmount: number, type: 'coins' | 'energy') => {
    if (useEconomyStore.getState().gems >= costGems) {
       audio.click();
       setPurchaseAnimating(id);
       setTimeout(() => {
          useEconomyStore.setState(s => ({ gems: s.gems - costGems }));
          if (type === 'coins') useEconomyStore.setState(s => ({ coins: s.coins + rewardAmount }));
          if (type === 'energy') useEconomyStore.getState().addEnergy(rewardAmount);
          setPurchaseAnimating(null);
          triggerFeedback('Transaction complete!');
          useAdStore.getState().showInterstitial('AdMob');
       }, 400);
    } else {
       setActiveTab('gems');
       triggerFeedback('Insufficient gems! Convert Coins to Gems below.');
    }
  };

  const handleThemePurchase = (id: string, costGems: number) => {
    if (useEconomyStore.getState().gems >= costGems) {
       audio.click();
       setPurchaseAnimating(id);
       setTimeout(() => {
          useEconomyStore.setState(s => ({ gems: s.gems - costGems }));
          useEconomyStore.getState().unlockTheme(id);
          setPurchaseAnimating(null);
          triggerFeedback('Universe unlocked!');
          useAdStore.getState().showInterstitial('AdMob');
       }, 400);
    } else {
       setActiveTab('gems');
       triggerFeedback('Insufficient gems for this universe.');
    }
  };

  const getPowerupIcon = (key: string) => {
    switch (key) {
      case 'bomb': return <Bomb className="w-6 h-6 text-rose-500" />;
      case 'colorChange': return <Palette className="w-6 h-6 text-fuchsia-400" />;
      case 'undo': return <RotateCcw className="w-6 h-6 text-cyan-400" />;
      case 'hammer': return <Hammer className="w-6 h-6 text-rose-400" />;
      case 'swap': return <ArrowLeftRight className="w-6 h-6 text-amber-400" />;
      case 'shuffle': return <Shuffle className="w-6 h-6 text-purple-400" />;
      case 'double': return <Zap className="w-6 h-6 text-emerald-400" />;
      default: return <Zap className="w-6 h-6 text-indigo-400" />;
    }
  };

  const packs = {
     gems: [
        { id: 'g0', name: 'Handful of Gems', amount: 80, costCoins: 500, popular: false },
        { id: 'g1', name: 'Pouch of Gems', amount: 500, costCoins: 2500, popular: false },
        { id: 'g2', name: 'Bucket of Gems', amount: 1200, costCoins: 5000, popular: true, bonus: '+20%' },
        { id: 'g3', name: 'Chest of Gems', amount: 2500, costCoins: 10000, popular: false, bonus: '+30%' },
        { id: 'g4', name: 'Vault of Gems', amount: 6500, costCoins: 25000, popular: false, bonus: '+50%' },
     ],
     coins: [
        { id: 'c1', name: 'Small Coin Pack', amount: 1000, costGems: 10 },
        { id: 'c2', name: 'Medium Coin Pack', amount: 5500, costGems: 50, popular: true },
        { id: 'c3', name: 'Big Coin Pack', amount: 12000, costGems: 100 },
        { id: 'c4', name: 'Mega Coin Pack', amount: 65000, costGems: 500 },
     ],
     energy: [
        { id: 'e1', name: 'Quick Charge', amount: 10, costGems: 15 },
        { id: 'e2', name: 'Full Charge', amount: 50, costGems: 60, popular: true },
        { id: 'e3', name: 'Mega Charge', amount: 100, costGems: 100 },
     ],
  };

  const content = (
    <div className={`w-full flex flex-col h-full overflow-hidden ${asTab ? 'max-w-md mx-auto pb-24 pt-2' : ''}`}>
      {!asTab && (
        <div className="flex justify-center p-3 min-h-[30px] flex-shrink-0">
          <div className="w-14 h-1.5 bg-cyan-400/40 rounded-full" />
        </div>
      )}

      <div className="flex justify-between items-center px-4 sm:px-6 mb-3 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-500 uppercase tracking-wider flex items-center gap-2 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                 <ShoppingBag className="w-6 h-6 text-fuchsia-400" /> Cosmic Shop
              </h2>
              <button 
                  onClick={toggleQuickBuy} 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${quickBuyEnabled ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-[#080a21] border-white/10 text-slate-400 hover:border-cyan-400/40'}`}
              >
                  <Zap className="w-3.5 h-3.5" /> 
                  <span className="text-[10px] font-black uppercase tracking-wider">Quick Buy</span>
                  <div className={`w-6 h-3 rounded-full relative ml-1 transition-colors ${quickBuyEnabled ? 'bg-emerald-500/50' : 'bg-black/60'}`}>
                     <div className={`absolute top-[1px] left-[1px] w-2.5 h-2.5 bg-current rounded-full transition-all ${quickBuyEnabled ? 'translate-x-3' : 'translate-x-0'}`}></div>
                  </div>
              </button>
          </div>
          {!asTab && (
            <button onClick={onClose} className="p-2 bg-[#0d0f2f] rounded-full border border-white/10 hover:border-rose-400/50 hover:bg-rose-500/20 transition text-slate-300">
               <X className="w-5 h-5" />
            </button>
          )}
      </div>

         {/* Feedback Toast */}
         <AnimatePresence>
           {purchaseFeedback && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="mx-6 mb-2 py-1.5 px-4 rounded-xl bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 text-xs font-black text-center shadow-lg"
             >
               {purchaseFeedback}
             </motion.div>
           )}
         </AnimatePresence>
         
         {/* Header Currencies & Inventory Preview */}
         <div className="px-6 mb-3 flex gap-2.5 flex-shrink-0">
            <div className="bg-[#07091e]/90 rounded-2xl p-2.5 border border-amber-500/30 flex items-center justify-between flex-1 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
               <div className="flex items-center gap-2">
                 <Coins className="w-5 h-5 text-amber-400" />
                 <span className="font-black text-amber-300 text-sm">{coins.toLocaleString()}</span>
               </div>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Coins</span>
            </div>
            <div className="bg-[#07091e]/90 rounded-2xl p-2.5 border border-fuchsia-500/30 flex items-center justify-between flex-1 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
               <div className="flex items-center gap-2">
                 <Gem className="w-5 h-5 text-fuchsia-400" />
                 <span className="font-black text-fuchsia-300 text-sm">{gems.toLocaleString()}</span>
               </div>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gems</span>
            </div>
         </div>

         {/* Tabs */}
         <div className="px-6 mb-4 flex-shrink-0">
           <div className="flex overflow-x-auto gap-2 pb-1 hide-scrollbar">
             {[
               { id: 'powerups', name: 'Power-Ups', icon: Zap, color: 'text-cyan-400' },
               { id: 'coins', name: 'Coins', icon: Coins, color: 'text-amber-400' },
               { id: 'gems', name: 'Gems', icon: Gem, color: 'text-fuchsia-400' },
               { id: 'energy', name: 'Energy', icon: Zap, color: 'text-emerald-400' },
               { id: 'themes', name: 'Universes', icon: Palette, color: 'text-indigo-400' },
             ].map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
               <button 
                 key={tab.id}
                 id={`shop-${tab.id}-tab`}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex-shrink-0 py-2.5 px-4 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-all border ${isActive ? 'bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/30 to-purple-500/30 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-[#080922]/80 border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30'}`}
               >
                 <Icon className={`w-4 h-4 ${tab.color}`} /> {tab.name}
               </button>
             )})}
           </div>
         </div>
         
         <div className="flex-1 overflow-y-auto px-6 pb-20 scroll-smooth space-y-4">
            {/* Power-ups Tab */}
            {activeTab === 'powerups' && (
              <div className="space-y-3.5">
                 {/* Master Bundle Promotion Card */}
                 <div className="bg-gradient-to-r from-[#190d3b] via-[#2a0e44] to-[#120b2e] rounded-3xl p-4 border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.25)] relative overflow-hidden">
                    <div className="absolute top-2 right-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-200 shadow-md">
                      Best Deal - 40% OFF
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-lg">
                          <Crown className="w-6 h-6 text-white" />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-white">Master Booster Bundle</h4>
                          <p className="text-[11px] text-amber-200 font-medium">Get 3x of ALL 5 Power-Ups in one package!</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                       <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                          <span>Includes 15 total power-ups</span>
                       </div>
                       <button
                         onClick={handleBuyBundle}
                         disabled={purchaseAnimating === 'bundle'}
                         className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-1.5 transition active:scale-95"
                       >
                         {purchaseAnimating === 'bundle' ? (
                           <div className="w-4 h-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                         ) : (
                           <>
                             <Coins className="w-4 h-4 text-slate-950" /> 2,500 Coins
                           </>
                         )}
                       </button>
                    </div>
                 </div>

                 {/* Individual Power-ups */}
                 {(Object.keys(POWERUP_CONFIGS) as Array<keyof PowerupInventory>).map((key) => {
                   const item = POWERUP_CONFIGS[key];
                   const ownedCount = inventory?.[key] || 0;
                   return (
                     <div 
                       key={key}
                       className="bg-[#090b26]/90 border border-cyan-500/25 rounded-2xl p-4 flex flex-col gap-3 shadow-md hover:border-cyan-400/50 transition-all"
                     >
                       <div className="flex items-start justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center shadow-inner">
                             {getPowerupIcon(key)}
                           </div>
                           <div>
                             <div className="flex items-center gap-2">
                               <h4 className="text-sm font-black text-white">{item.name}</h4>
                               <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                 {item.badge}
                               </span>
                             </div>
                             <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{item.description}</p>
                           </div>
                         </div>

                         <div className="text-right shrink-0">
                           <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">In Stash</span>
                           <span className="text-lg font-black text-cyan-300">{ownedCount}</span>
                         </div>
                       </div>

                       <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                         {/* Buy 1x with Coins */}
                         <button
                           onClick={() => handleBuyPowerupItem(key, 1, 'coins')}
                           disabled={purchaseAnimating === `${key}-coins`}
                           className="flex-1 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/40 text-amber-300 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                         >
                           {purchaseAnimating === `${key}-coins` ? (
                             <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                           ) : (
                             <>
                               <Coins className="w-3.5 h-3.5 text-amber-400" />
                               Buy 1x ({item.coinCost})
                             </>
                           )}
                         </button>

                         {/* Buy 3x Bundle with Coins */}
                         <button
                           onClick={() => handleBuyPowerupItem(key, 3, 'coins')}
                           disabled={purchaseAnimating === `${key}-coins-3`}
                           className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
                         >
                           <Coins className="w-3.5 h-3.5 text-amber-300" />
                           Buy 3x ({item.coinCost * 3 - 50})
                         </button>

                         {/* Quick Gem Option */}
                         <button
                           onClick={() => handleBuyPowerupItem(key, 1, 'gems')}
                           disabled={purchaseAnimating === `${key}-gems`}
                           className="px-3 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/40 text-fuchsia-300 font-black text-xs rounded-xl flex items-center justify-center gap-1 transition active:scale-95 shrink-0"
                           title="Buy with Gems"
                         >
                           <Gem className="w-3.5 h-3.5 text-fuchsia-400" />
                           {item.gemCost}
                         </button>
                       </div>
                     </div>
                   );
                 })}
              </div>
            )}

            {activeTab === 'gems' && (
               <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 bg-gradient-to-r from-fuchsia-950/40 via-purple-950/40 to-cyan-950/40 border border-fuchsia-500/30 rounded-2xl p-3 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 shrink-0">
                      <Gem className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">In-Game Coin Exchange</div>
                      <div className="text-[11px] text-slate-300">Convert your earned Gold Coins directly into Gems. 100% Free Virtual Currency!</div>
                    </div>
                  </div>

                  {packs.gems.map(pack => (
                     <div key={pack.id} className={`bg-gradient-to-b from-[#0b0e2f]/90 to-[#050618]/90 rounded-2xl border-2 ${pack.popular ? 'border-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.35)]' : 'border-cyan-500/20 hover:border-cyan-400/50'} p-4 flex flex-col items-center relative group`}>
                         {pack.popular && (
                            <div className="absolute -top-2.5 bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(217,70,239,0.6)] z-10 w-max border border-white/40">Most Popular</div>
                         )}
                         {pack.bonus && (
                            <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-1.5 rounded uppercase border border-emerald-500/30">{pack.bonus}</div>
                         )}
                         <div className="h-14 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                            <Gem className="w-9 h-9 text-fuchsia-400" />
                         </div>
                         <div className="font-black text-white text-lg mb-0.5 text-center leading-tight">
                            {pack.amount.toLocaleString()} 
                         </div>
                         <div className="text-[9px] uppercase tracking-widest font-black text-fuchsia-300 mb-3 whitespace-nowrap text-center">Gems</div>
                         
                         <button 
                            onClick={() => handleBuyGemsWithCoins(pack.id, pack.costCoins, pack.amount)}
                            disabled={purchaseAnimating === pack.id}
                            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                               pack.popular 
                               ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-300/40 hover:scale-105'
                               : 'bg-[#101338] text-white border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400'
                            }`}
                         >
                            {purchaseAnimating === pack.id ? (
                              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            ) : (
                              <span className="flex items-center justify-center gap-1">
                                <Coins className="w-3.5 h-3.5 text-amber-300" />
                                {pack.costCoins.toLocaleString()}
                              </span>
                            )}
                         </button>
                     </div>
                  ))}
               </div>
            )}
            
            {activeTab === 'coins' && (
               <div className="grid grid-cols-2 gap-3">
                  {packs.coins.map(pack => (
                     <div key={pack.id} className={`bg-gradient-to-b from-[#0b0e2f]/90 to-[#050618]/90 rounded-2xl border-2 ${pack.popular ? 'border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)]' : 'border-amber-500/20 hover:border-amber-400/50'} p-4 flex flex-col items-center relative group`}>
                         {pack.popular && (
                            <div className="absolute -top-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)] z-10 w-max border border-white/40">Best Value</div>
                         )}
                         <div className="h-14 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                            <Coins className="w-9 h-9 text-amber-400" />
                         </div>
                         <div className="font-black text-white text-lg mb-0.5 text-center leading-tight">
                            {pack.amount.toLocaleString()} 
                         </div>
                         <div className="text-[9px] uppercase tracking-widest font-black text-amber-300 mb-3 whitespace-nowrap text-center">Coins</div>
                         
                         <button 
                            onClick={() => handlePurchase(pack.id, pack.costGems, pack.amount, 'coins')}
                            disabled={purchaseAnimating === pack.id}
                            className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)] border border-fuchsia-400/40 hover:scale-105"
                         >
                            {purchaseAnimating === pack.id ? <div className="w-4 h-4 rounded-full border-2 border-fuchsia-400/30 border-t-fuchsia-400 animate-spin"></div> : <><Gem className="w-3.5 h-3.5" /> {pack.costGems} GEMS</>}
                         </button>
                     </div>
                  ))}
               </div>
            )}
            
            {activeTab === 'energy' && (
               <div className="flex flex-col gap-3">
                  {packs.energy.map(pack => (
                     <div key={pack.id} className="bg-gradient-to-r from-black/40 to-black/60 rounded-2xl border border-white/10 p-4 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                               <Zap className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                               <div className="font-bold text-white text-sm">{pack.name}</div>
                               <div className="text-cyan-400 font-black flex items-center gap-1 text-xs uppercase tracking-widest"><Zap className="w-3 h-3" /> +{pack.amount} Energy</div>
                            </div>
                         </div>
                         
                         <button 
                            onClick={() => handlePurchase(pack.id, pack.costGems, pack.amount, 'energy')}
                            disabled={purchaseAnimating === pack.id}
                            className="px-4 py-2 min-w-[70px] rounded-xl text-sm font-black flex items-center justify-center gap-1.5 transition-all bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-500/30"
                         >
                            {purchaseAnimating === pack.id ? <div className="w-4 h-4 rounded-full border-2 border-fuchsia-400/30 border-t-fuchsia-400 animate-spin"></div> : <><Gem className="w-3.5 h-3.5" /> {pack.costGems}</>}
                         </button>
                     </div>
                  ))}
               </div>
            )}
            
            {activeTab === 'themes' && (
               <div className="flex flex-col gap-3">
                  <div className="text-center mb-4">
                     <h3 className="text-lg font-black text-white uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Unlock Universes</h3>
                     <p className="text-slate-400 text-xs">Unlock themes with gems or by leveling up.</p>
                  </div>
                  {THEME_IDS.map(id => {
                     const theme = THEMES[id];
                     const isUnlocked = level >= theme.unlockLevel || unlockedThemes.includes(id);
                     const costGems = theme.unlockLevel * 150;

                     return (
                        <div key={id} className={`p-4 rounded-2xl border flex items-center gap-4 ${isUnlocked ? 'bg-black/40 border-white/10' : 'bg-indigo-950/20 border-indigo-500/20'}`}>
                           <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center text-2xl shadow-inner shrink-0">
                              {theme.icon}
                           </div>
                           <div className="flex-1">
                              <h4 className="text-white font-black text-sm tracking-wide">{theme.name}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                 {isUnlocked ? <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Unlocked</span> : `Unlocks at LVL ${theme.unlockLevel}`}
                              </p>
                           </div>
                           {!isUnlocked ? (
                              <button 
                                 onClick={() => handleThemePurchase(id, costGems)}
                                 disabled={purchaseAnimating === id}
                                 className="shrink-0 px-4 py-2 min-w-[70px] rounded-xl text-sm font-black flex items-center justify-center gap-1.5 transition-all bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-500/30"
                              >
                                 {purchaseAnimating === id ? <div className="w-4 h-4 rounded-full border-2 border-fuchsia-400/30 border-t-fuchsia-400 animate-spin"></div> : <><Gem className="w-3.5 h-3.5" /> {costGems}</>}
                              </button>
                           ) : (
                              <div className="shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 bg-black/50 border border-white/5 flex items-center gap-1">
                                 Available
                              </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
    </div>
  );

  if (asTab) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col pointer-events-auto">
      <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         onClick={onClose}
         className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
         initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
         className="absolute bottom-0 left-0 w-full h-[88vh] bg-gradient-to-t from-[#04040e] via-[#090b24] to-[#12143a] rounded-t-[36px] shadow-[0_-20px_60px_rgba(6,182,212,0.3)] border-t-2 border-cyan-500/40 flex flex-col overflow-hidden"
       >
        {content}
       </motion.div>
    </div>
  );
}
