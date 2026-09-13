import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldCheck, FileText, HeartHandshake, Eye, AlertCircle, 
  HelpCircle, Mail, ChevronRight, ArrowLeft, CheckCircle2, 
  ShoppingBag, ExternalLink, Copy, Check 
} from 'lucide-react';
import { usePolicyStore, PolicyDocument } from '../store/policyStore';

interface PolicyCenterModalProps {
  onClose: () => void;
  initialPolicyId?: string;
}

export function PolicyCenterModal({ onClose, initialPolicyId }: PolicyCenterModalProps) {
  const { policies, supportConfig } = usePolicyStore();
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(initialPolicyId || null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const policyList = Object.values(policies).filter(p => p.enabled);
  const activePolicy = selectedPolicyId ? policies[selectedPolicyId] : null;

  const publicPrivacyUrl = typeof window !== 'undefined' && window.location?.origin
    ? `${window.location.origin}/privacy.html` 
    : '/privacy.html';

  const handleCopyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(publicPrivacyUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const getCategoryIcon = (category: PolicyDocument['category']) => {
    switch (category) {
      case 'privacy': return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'terms': return <FileText className="w-5 h-5 text-indigo-400" />;
      case 'child_safety': return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
      case 'ads': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'monetization': return <CheckCircle2 className="w-5 h-5 text-purple-400" />;
      case 'purchase_refund': return <ShoppingBag className="w-5 h-5 text-rose-400" />;
      case 'community': return <AlertCircle className="w-5 h-5 text-blue-400" />;
      case 'support': return <HelpCircle className="w-5 h-5 text-pink-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 select-text">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.95, opacity: 0 }} 
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0c0f24] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-slate-100"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#080a1c]">
          <div className="flex items-center gap-3">
            {selectedPolicyId ? (
              <button 
                onClick={() => setSelectedPolicyId(null)}
                className="p-2 -ml-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300">
                {activePolicy ? activePolicy.title : 'Policy & Safety Center'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                {activePolicy ? `Version ${activePolicy.version} • Updated ${activePolicy.lastUpdated}` : 'MergeVerse Transparency, Privacy & Terms'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activePolicy ? (
            /* Single Policy Viewer */
            <div className="space-y-4">
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-2xl flex items-start gap-3">
                <div className="mt-0.5">{getCategoryIcon(activePolicy.category)}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Summary</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-mono">
                      v{activePolicy.version}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Effective: {activePolicy.effectiveDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {activePolicy.summary}
                  </p>
                </div>
              </div>

              {/* Public URL Action for Privacy Policy */}
              {activePolicy.id === 'privacy' && (
                <div className="p-3 bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-cyan-300 font-bold block">Public Web Privacy Policy URL:</span>
                    <span className="text-[11px] font-mono text-slate-400 break-all">{publicPrivacyUrl}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyUrl}
                      className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                    <a
                      href="/privacy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Page</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Formatted Markdown Content */}
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 font-normal whitespace-pre-line">
                {activePolicy.content}
              </div>

              {activePolicy.id === 'support' && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-purple-950/30 border border-purple-500/20 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                      <Mail className="w-4 h-4" /> Official Support Contact
                    </div>
                    <p className="text-xs text-slate-300">
                      Email our dedicated game support team at:{' '}
                      <span className="font-mono text-cyan-300 font-bold select-all">
                        {supportConfig.supportEmail}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Policy Directory / Cards Grid */
            <div className="space-y-4">
              {/* Public URL Feature Banner for Google Play Console Submission */}
              <div className="p-4 bg-gradient-to-r from-cyan-950/60 via-indigo-950/40 to-black/50 border border-cyan-500/30 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      Public Privacy Policy (Google Play Ready)
                    </h3>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                    ACTIVE URL
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Google Play requires an active public HTTPS Privacy Policy URL. MergeVerse provides both this in-app policy center and a standalone web page.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] font-mono text-cyan-300/80 truncate max-w-sm">
                    {publicPrivacyUrl}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyUrl}
                      className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
                    </button>
                    <a
                      href="/privacy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Visit Web Page</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {policyList.map((policy) => (
                  <button
                    key={policy.id}
                    onClick={() => setSelectedPolicyId(policy.id)}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 rounded-2xl text-left transition-all group flex flex-col justify-between gap-3 active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 group-hover:scale-105 transition-transform">
                        {getCategoryIcon(policy.category)}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {policy.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {policy.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-white/5">
                      <span>v{policy.version}</span>
                      <span>Updated {policy.lastUpdated}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Support & FAQ Quick Box */}
              <div className="mt-4 p-4 bg-black/30 border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4" /> Quick Answers
                  </div>
                  <span className="text-[10px] text-slate-400">Offline-Ready Support</span>
                </div>
                <div className="space-y-2">
                  {supportConfig.faqList.map((faq, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <p className="text-xs font-bold text-white mb-1">{faq.question}</p>
                      <p className="text-xs text-slate-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#080a1c] flex items-center justify-between text-[11px] text-slate-400">
          <span>MergeVerse Core v2.4.0 (Offline-First Edition)</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
