import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MousePointerClick } from 'lucide-react';
import { safeSetItem } from '../lib/safeStorage';

const TUTORIAL_STEPS = [
  {
    title: 'Objective',
    description: 'Merge tiles with the same number to create higher numbered tiles. The ultimate goal is to reach the 2048 tile and beyond!',
    visual: (
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]">
          2
        </div>
        <div className="text-xl font-black text-slate-400">+</div>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]">
          2
        </div>
        <div className="text-xl font-black text-slate-400">=</div>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          4
        </div>
      </div>
    )
  },
  {
    title: 'How to Move',
    description: 'Swipe UP, DOWN, LEFT, or RIGHT on the board to slide all tiles in that direction. On desktop, you can also use your Arrow Keys!',
    visual: (
      <div className="flex flex-col items-center justify-center gap-2 py-6">
        <ArrowUp className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
        <div className="flex gap-10">
          <ArrowLeft className="w-8 h-8 text-fuchsia-400 -translate-x-2 animate-pulse" />
          <div className="w-16 h-16 bg-white/10 rounded-xl border-2 border-white/20 flex flex-col items-center justify-center">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-widest mt-1">Swipe</span>
          </div>
          <ArrowRight className="w-8 h-8 text-fuchsia-400 translate-x-2 animate-pulse" />
        </div>
        <ArrowDown className="w-8 h-8 text-cyan-400 mt-2 animate-bounce" />
      </div>
    )
  },
  {
    title: 'Drop Mode Rules',
    description: 'In "Drop Mode", tap on any column to drop a block from the top. Match identically numbered blocks vertically or let chains trigger!',
    visual: (
      <div className="flex flex-col items-center justify-center py-6">
        <MousePointerClick className="w-10 h-10 text-amber-400 animate-bounce mb-4" />
        <div className="flex gap-2 relative">
          <div className="w-12 h-32 border border-white/20 rounded bg-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 w-full h-12 bg-amber-500 flex items-center justify-center font-black rounded text-white">16</div>
            <div className="absolute bottom-[3.25rem] w-full h-12 bg-indigo-500 flex items-center justify-center font-black rounded text-white opacity-50">8</div>
          </div>
          <div className="w-12 h-32 border border-white/20 rounded bg-white/5"></div>
          <div className="w-12 h-32 border border-white/20 rounded bg-white/5"></div>
        </div>
      </div>
    )
  },
  {
    title: 'Scoring system',
    description: 'Every time tiles merge, you gain points equal to the combined tile value. Keep combining to increase your score, but beware—if the board fills up and no moves are possible, it\'s Game Over!',
    visual: (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="text-4xl font-black text-white">+128</div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Points Gained</div>
      </div>
    )
  }
];

export function TutorialModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    safeSetItem('mergeverse_tutorial_seen', 'true');
  }, []);

  const handleNext = () => {
    if (step < TUTORIAL_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(s => s - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-sm bg-[#0a0a1a] border border-fuchsia-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.15)] flex flex-col"
      >
        <div className="relative p-6 px-8 bg-gradient-to-br from-fuchsia-900/40 to-cyan-900/40 border-b border-white/10">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest mb-1">Beginner's Guide</div>
          <h2 className="text-2xl font-black text-white">{TUTORIAL_STEPS[step].title}</h2>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {TUTORIAL_STEPS[step].visual}
              
              <p className="text-slate-300 text-sm leading-relaxed text-center font-medium mt-2">
                {TUTORIAL_STEPS[step].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6 pt-0 mt-auto">
          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {TUTORIAL_STEPS.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-fuchsia-500' : 'w-2 bg-white/20'}`} 
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 hover:bg-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:scale-[1.02] active:scale-95 transition-transform rounded-xl font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              {step === TUTORIAL_STEPS.length - 1 ? 'Start Playing' : 'Next'}
              {step < TUTORIAL_STEPS.length - 1 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
