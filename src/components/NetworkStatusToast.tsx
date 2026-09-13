import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi } from 'lucide-react';

export function NetworkStatusToast() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      setTimeout(() => setShowRestored(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none flex flex-col gap-2">
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/80 backdrop-blur-md border border-rose-500/50 text-rose-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-rose-900/20 pointer-events-auto"
          >
            <WifiOff className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium">Offline - Progress saved locally</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRestored && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-emerald-900/80 backdrop-blur-md border border-emerald-500/50 text-emerald-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-900/20 pointer-events-auto"
          >
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Connection Restored</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
