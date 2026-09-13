import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { safeGetItem, safeSetItem } from '../lib/safeStorage';

export function GDPRBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = safeGetItem('dp_gdpr_consent', '');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    safeSetItem('dp_gdpr_consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-[400] p-4 flex justify-center"
        >
          <div className="bg-[#0a0a14] border border-blue-500/30 p-4 rounded-2xl w-full max-w-md shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-bold text-sm">We value your privacy</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  MergeVerse saves your game progress, scores, and preferences locally on your device. We do not track you or collect personal data. View our <a href="/privacy" className="text-cyan-400 underline">Privacy Policy</a> and <a href="/terms" className="text-cyan-400 underline">Terms of Service</a>.
                </p>
              </div>
            </div>
            <button 
              onClick={accept}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl transition active:scale-95"
            >
              I Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
