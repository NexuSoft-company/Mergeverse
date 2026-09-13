import React, { useState } from 'react';
import { useEconomyStore } from '../store/economyStore';
import { X, UserRound, Gamepad2, ShieldCheck, Lock, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PolicyCenterModal } from './PolicyCenterModal';
import { AdminDashboard } from './AdminDashboard';
import { useAdminConfigStore } from '../store/adminConfigStore';

// Pre-defined avatars
const AVATARS = [
  { id: '1', emoji: '🧑‍🚀', bg: 'bg-indigo-500' },
  { id: '2', emoji: '👽', bg: 'bg-emerald-500' },
  { id: '3', emoji: '🤖', bg: 'bg-rose-500' },
  { id: '4', emoji: '👻', bg: 'bg-violet-500' },
  { id: '5', emoji: '🧙‍♂️', bg: 'bg-amber-500' },
  { id: '6', emoji: '🥷', bg: 'bg-slate-800' },
  { id: '7', emoji: '🧜‍♀️', bg: 'bg-cyan-500' },
  { id: '8', emoji: '🧛‍♂️', bg: 'bg-red-600' },
];

export function ProfileSettings({ onClose }: { onClose: () => void }) {
  const { nickname, avatarId, setProfile, anonymousId, isAdmin } = useEconomyStore();
  const { isUnlocked } = useAdminConfigStore();
  const canAccessAdmin = Boolean(isAdmin || isUnlocked);
  
  const [tempName, setTempName] = useState(nickname);
  const [tempAvatar, setTempAvatar] = useState(avatarId);
  const [copied, setCopied] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [initialPolicyId, setInitialPolicyId] = useState<string | undefined>(undefined);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleSave = () => {
    if (tempName.trim().length > 0) {
      setProfile(tempName.trim(), tempAvatar);
    }
    onClose();
  };

  const copyId = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(anonymousId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openPolicy = (policyId?: string) => {
    setInitialPolicyId(policyId);
    setShowPolicyModal(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#0a0a1a] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <UserRound className="w-32 h-32" />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-6 uppercase tracking-wider relative z-10">
          Player Profile
        </h2>

        <div className="space-y-5 relative z-10">
          
          {/* Anonymous ID Display */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Player ID</p>
               <p className="text-sm font-mono text-cyan-300 font-bold">{anonymousId}</p>
             </div>
             <button 
               onClick={copyId}
               className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-cyan-500/40 transition-colors cursor-pointer"
             >
               {copied ? 'Copied!' : 'Copy'}
             </button>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setTempAvatar(avatar.id)}
                  className={`relative aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all cursor-pointer ${
                    avatar.bg
                  } ${
                    tempAvatar === avatar.id 
                      ? 'ring-4 ring-white ring-offset-2 ring-offset-[#0a0a1a] scale-105 z-10' 
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Nickname Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Display Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                maxLength={15}
                placeholder="Enter nickname..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-500 font-medium transition-colors text-sm"
              />
              <Gamepad2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-500/50" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 text-right">
              {tempName.length} / 15 chars
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={tempName.trim().length === 0}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale cursor-pointer text-sm"
          >
            Save Profile
          </button>

          {/* Legal & Privacy Section (Google Play Compliance) */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>Legal &amp; Privacy</span>
              <span className="text-[9px] text-cyan-400 font-mono">Verified</span>
            </div>

            {/* Direct Privacy Policy Button */}
            <button
              type="button"
              onClick={() => openPolicy('privacy')}
              className="w-full py-2.5 px-3 bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Privacy Policy</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {/* Policy & Safety Center Hub */}
            <button
              type="button"
              onClick={() => openPolicy()}
              className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Legal &amp; Safety Hub</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* App Version Tag - Hidden Entry for Admin Dashboard */}
          <div className="pt-3 pb-1 flex flex-col items-center justify-center">
            <button
              type="button"
              id="app-version-secret-trigger"
              onClick={() => setShowAdminDashboard(true)}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-400 active:text-cyan-400 transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-white/5 select-none"
              title="App Version"
            >
              MergeVerse v1.0.1 (Build 2026.1)
            </button>
          </div>
        </div>

        {/* Policy Center Modal */}
        {showPolicyModal && (
          <PolicyCenterModal 
            onClose={() => setShowPolicyModal(false)} 
            initialPolicyId={initialPolicyId}
          />
        )}

        {/* Admin Dashboard */}
        {showAdminDashboard && (
          <AdminDashboard onClose={() => setShowAdminDashboard(false)} />
        )}
      </motion.div>
    </div>
  );
}
