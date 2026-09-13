import React from 'react';
import { X, ExternalLink, Gamepad2, Rocket, Crown, Gift, Smartphone, ArrowUpRight } from 'lucide-react';
import { useAdStore, PrivateAdCampaign } from '../store/adStore';
import { motion } from 'motion/react';

interface OurAppsModalProps {
  onClose?: () => void;
  asTab?: boolean;
}

export function OurAppsModal({ onClose, asTab = false }: OurAppsModalProps) {
  const { privateAds, recordPrivateAdClick } = useAdStore();

  const activeAds = privateAds.filter(a => a.active);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'game':
        return <Gamepad2 className="w-6 h-6 text-emerald-300" />;
      case 'rocket':
        return <Rocket className="w-6 h-6 text-amber-300" />;
      case 'crown':
        return <Crown className="w-6 h-6 text-amber-200" />;
      case 'gift':
        return <Gift className="w-6 h-6 text-rose-300" />;
      default:
        return <Smartphone className="w-6 h-6 text-cyan-300" />;
    }
  };

  const handleOpenApp = (ad: PrivateAdCampaign) => {
    recordPrivateAdClick(ad.id);
    if (ad.targetUrl) {
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const Wrapper = asTab ? 'div' : 'div';
  const wrapperClass = asTab 
    ? "w-full h-full flex flex-col bg-[#060614]" 
    : "fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md";

  return (
    <Wrapper className={wrapperClass}>
      <motion.div
        initial={asTab ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
        animate={asTab ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={asTab ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
        className={`bg-[#0b0e26] flex flex-col overflow-hidden ${asTab ? 'w-full h-full pb-20' : 'border-2 border-purple-500/40 rounded-3xl w-full max-w-md max-h-[85vh] shadow-[0_0_50px_rgba(168,85,247,0.3)]'}`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-950/60 via-[#101438] to-[#0b0e26]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-md">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white">More Studio Games &amp; Apps</h3>
              <p className="text-[11px] text-purple-300/80">Explore free games &amp; exclusive partner downloads</p>
            </div>
          </div>
          {!asTab && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {activeAds.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No promotions are active at the moment. Check back soon!
            </div>
          ) : (
            activeAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-4 transition-all space-y-2.5 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shrink-0 border border-white/20 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                    {renderIcon(ad.iconType)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm text-white truncate">{ad.title}</span>
                      <span className="text-[9px] bg-purple-500/25 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {ad.badge || 'Featured'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-snug mt-0.5">{ad.subtitle}</p>
                  </div>
                </div>

                {ad.description && (
                  <p className="text-[11px] text-slate-400 leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/5">
                    {ad.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free Download</span>
                  
                  <button
                    onClick={() => handleOpenApp(ad)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-emerald-500/30 transition flex items-center gap-1 active:scale-95"
                  >
                    <span>{ad.ctaText || 'Get App'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/40 border-t border-white/10 text-center text-[10px] text-slate-500">
          Official cross-promotion network • All external downloads open in a new tab securely.
        </div>
      </motion.div>
    </Wrapper>
  );
}
