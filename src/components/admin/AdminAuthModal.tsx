import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, AlertCircle, X, Eye, EyeOff } from 'lucide-react';
import { useAdminConfigStore } from '../../store/adminConfigStore';

interface AdminAuthModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function AdminAuthModal({ onSuccess, onClose }: AdminAuthModalProps) {
  const { unlockAdmin } = useAdminConfigStore();
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setError('Please enter your Master PIN.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await unlockAdmin(pinInput.trim());
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Invalid Master PIN. Access Denied.');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#090c1f] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-5 shadow-[0_0_60px_rgba(6,182,212,0.25)] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 mb-1 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <KeyRound className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-wider text-white">Security Verification</h3>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Enter your assigned Master PIN to access your authorized console session.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleUnlock} className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                Enter Master PIN / Key
              </label>
              <span className="text-[9px] text-slate-400 font-mono">Encrypted Session</span>
            </div>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                required
                autoComplete="off"
                placeholder="Enter Master PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-black/60 border border-cyan-500/30 rounded-xl p-3.5 pr-11 text-white font-mono text-center tracking-[0.25em] text-base outline-none focus:border-cyan-400 placeholder:tracking-normal placeholder:text-xs placeholder:text-slate-600 transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                title={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] text-slate-400 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Role-Based PIN Security</span>
            </div>
            <p>
              Each team role (Super Admin, Manager, Editor, Admin) is assigned a dedicated Master PIN. Entering your PIN automatically opens your authorized dashboard.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !pinInput.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Verifying PIN...' : 'Authenticate & Unlock'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
