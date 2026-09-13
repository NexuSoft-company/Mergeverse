import { MergeNumbersGame } from "./components/minigames/MergeNumbersGame";
import { MergeBlocksGame } from "./components/minigames/MergeBlocksGame";
import { HexagonGame } from "./components/minigames/HexagonGame";
import { NumberSnacksGame } from "./components/NumberSnacksGame/NumberSnacksGame";
import { useAdStore } from "./store/adStore";

import { useEconomyStore } from './store/economyStore';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Volume2, VolumeX, Trophy, RefreshCcw, Star, Coins, Gift, ArrowRight, Dices, Trash2, Menu, Backpack, X, Plus, Undo2, History as HistoryIcon, Zap, Crown, Flame, CalendarDays, Rocket, Play, Gem, Shield, MonitorPlay, Tv, Video, ShieldCheck, Gamepad2, ShoppingBag, Battery, BatteryCharging, Users, Bell, User, Settings, Home, Target } from 'lucide-react';
import originalConfetti from 'canvas-confetti';
import { audio } from './lib/audio';
import { AdOverlay } from './components/AdOverlay';
import { GDPRBanner } from './components/GDPRBanner';

import { DailyRewardWidget } from './components/DailyRewardWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { LevelUpOverlay } from './components/LevelUpOverlay';
import { NetworkStatusToast } from './components/NetworkStatusToast';
import { TasksModal } from './components/TasksModal';
import { LuckySpinWidget } from './components/LuckySpinWidget';
import { LuckySpinModal } from './components/LuckySpinModal';
import { VipWidget } from './components/VipWidget';
import { VipModal } from './components/VipModal';

import { LiveEventWidget } from './components/LiveEventWidget';
import { LiveEventModal } from './components/LiveEventModal';
import { ShopModal } from './components/ShopModal';
import { TopNavBar } from './components/navigation/TopNavBar';
export type NavTab = 'shop' | 'missions' | 'play' | 'events' | 'apps';
import { EventsHubView } from './components/views/EventsHubView';
import { ProfileSettings } from './components/ProfileSettings';
import { NotificationsModal } from './components/NotificationsModal';
import { PolicyCenterModal } from './components/PolicyCenterModal';
import { OurAppsModal } from './components/OurAppsModal';
import { TutorialOverlay } from './components/TutorialOverlay';
import { safeGetItem, safeSetItem } from './lib/safeStorage';
import { useAdminConfigStore } from './store/adminConfigStore';

const confetti = (args: any) => {
  if (safeGetItem('dp_lowpow') !== 'true') {
    return originalConfetti(args);
  }
};

import { THEMES } from './themes';
import { GameModesScreen } from './GameModesScreen';
import { App as CapApp } from '@capacitor/app';
import { admobService } from './lib/admobService';

type PowerType = 'bomb' | 'freeze' | 'multiplier' | 'lucky' | 'ghost' | null;
import { Game, FrontPage } from './GameEngine';
import { useAuthAndDataSync } from './lib/userDataSync';
import { notificationService } from './lib/notificationService';

function useEnsureContainerDimensions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLayoutTick] = useState(0);

  useEffect(() => {
    let timer: any = null;
    let animId: number = 0;
    let attempts = 0;

    const measureAndValidate = () => {
      const el = containerRef.current || document.getElementById('root');
      const w = el ? el.clientWidth : (typeof window !== 'undefined' ? window.innerWidth : 0);
      const h = el ? el.clientHeight : (typeof window !== 'undefined' ? window.innerHeight : 0);

      if (w === 0 || h === 0) {
        attempts++;
        if (attempts < 30) {
          animId = requestAnimationFrame(() => {
            timer = setTimeout(measureAndValidate, 50);
          });
        }
      } else {
        setLayoutTick(prev => prev + 1);
        if (typeof (window as any).__DISMISS_PRELOADER__ === 'function') {
          (window as any).__DISMISS_PRELOADER__();
        }
      }
    };

    measureAndValidate();

    let ro: ResizeObserver | null = null;
    const target = containerRef.current || document.getElementById('root') || document.body;
    if (typeof ResizeObserver !== 'undefined' && target) {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            setLayoutTick(prev => prev + 1);
            if (typeof (window as any).__DISMISS_PRELOADER__ === 'function') {
              (window as any).__DISMISS_PRELOADER__();
            }
          } else {
            measureAndValidate();
          }
        }
      });
      ro.observe(target);
    }

    const onResize = () => measureAndValidate();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (timer) clearTimeout(timer);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return { containerRef };
}

export default function App() {
  const { containerRef } = useEnsureContainerDimensions();
  const [activeView, setActiveView] = useState<'main' | 'modes' | 'game' | 'mini_merge_numbers' | 'mini_merge_blocks' | 'mini_hexagon' | 'mini_number_snacks'>('main');
  const [activeTab, setActiveTab] = useState<NavTab>('play');
  const [gameKey, setGameKey] = useState(0);
  const [activeThemeId, setActiveThemeId] = useState('classic');
  const [activeGameMode, setActiveGameMode] = useState<'classic' | 'survival' | 'boss' | 'drop'>('classic');
  const [bossType, setBossType] = useState('cyber');
  
  // Modals state
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPolicyCenter, setShowPolicyCenter] = useState(false);
  const [showOurApps, setShowOurApps] = useState(false);
  const [showLuckySpin, setShowLuckySpin] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [showLiveEvent, setShowLiveEvent] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const { level, isAdmin, missions, luckySpinsAvailable } = useEconomyStore();
  const { isUnlocked } = useAdminConfigStore();
  const canAccessAdmin = isAdmin || isUnlocked;
  const [bestScore, setBestScore] = useState(0);
  
  // Badges calculations
  const claimableMissionsCount = (missions || []).filter(m => m.progress >= m.target && !m.claimed).length;
  const hasEventReady = (luckySpinsAvailable > 0);

  useAuthAndDataSync();
  
  // Notification Service Initialization (Offline local push notifications)
  useEffect(() => {
    notificationService.requestPermissions();
    // Cancel pending notifications when app is opened
    notificationService.cancelOfflineNotifications();

    const appStateListener = CapApp.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        notificationService.cancelOfflineNotifications();
      } else {
        // Schedule push notifications to bring the user back
        notificationService.scheduleOfflineNotifications();
      }
    });

    return () => {
      appStateListener.then(listener => listener.remove());
    };
  }, []);

  useEffect(() => {
    const savedBest = safeGetItem('dp_best_score', '12400');
    setBestScore(parseInt(savedBest, 10));
    // Initialize Google AdMob SDK
    admobService.initialize();
  }, []);

  // Native Android hardware back button listener
  useEffect(() => {
    let removeListener: (() => void) | null = null;
    CapApp.addListener('backButton', () => {
      if (showProfile) {
        setShowProfile(false);
      } else if (showNotifications) {
        setShowNotifications(false);
      } else if (showTutorial) {
        setShowTutorial(false);
      } else if (showPolicyCenter) {
        setShowPolicyCenter(false);
      } else if (showOurApps) {
        setShowOurApps(false);
      } else if (showLuckySpin) {
        setShowLuckySpin(false);
      } else if (showVipModal) {
        setShowVipModal(false);
      } else if (showLiveEvent) {
        setShowLiveEvent(false);
      } else if (showAdmin) {
        setShowAdmin(false);
      } else if (activeView !== 'main') {
        if (activeView === 'game') {
          setActiveView('modes');
        } else {
          setActiveView('main');
        }
      } else if (activeTab !== 'play') {
        setActiveTab('play');
      } else {
        CapApp.exitApp();
      }
    }).then(handler => {
      removeListener = () => handler.remove();
    }).catch(() => {
      // Running in standard web browser
    });

    return () => {
      if (removeListener) removeListener();
    };
  }, [activeView, activeTab, showProfile, showNotifications, showTutorial, showPolicyCenter, showOurApps, showLuckySpin, showVipModal, showLiveEvent, showAdmin]);

  const handleSelectMode = (themeId: string) => {
    setActiveThemeId(themeId);
    setActiveGameMode('classic');
    setGameKey(k => k + 1);
    setActiveView('game');
  };

  const handleSurvivalPlay = () => {
    setActiveThemeId('classic');
    setActiveGameMode('survival');
    setGameKey(k => k + 1);
    setActiveView('game');
  };

  const handleBossPlay = () => {
    setActiveThemeId('cyber');
    setActiveGameMode('boss');
    setGameKey(k => k + 1);
    setActiveView('game');
  };
  
  const handleDropPlay = () => {
    setActiveThemeId('minimal');
    setActiveGameMode('drop');
    setGameKey(k => k + 1);
    setActiveView('game');
  };

  const minimizeGame = () => {
    setActiveView('main');
  };

  const exitGame = () => {
    setActiveView('modes');
    setGameKey(k => k + 1);
    
    // Ad tracking - Show on every exit
    useAdStore.getState().showInterstitial('AdMob');
    
    let plays = parseInt(safeGetItem('ad_plays', '0'), 10);
    plays += 1;
    safeSetItem('ad_plays', plays.toString());
  };

  const exitMiniGame = () => {
    setActiveView('main');
    
    // Ad tracking - Show on every exit
    useAdStore.getState().showInterstitial('AdMob');
    
    let plays = parseInt(safeGetItem('ad_plays', '0'), 10);
    plays += 1;
    safeSetItem('ad_plays', plays.toString());
  };

  return (
    <div 
      ref={containerRef} 
      id="app-container" 
      className="absolute inset-0 w-full h-full min-h-full overflow-hidden flex flex-col bg-[#060614] text-white select-none"
      style={{ width: '100%', height: '100%', minHeight: '100%' }}
    >
      <Suspense fallback={<div className="w-full h-full min-h-full bg-[#05050f] flex items-center justify-center text-blue-400 font-bold"><div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div></div>}>
        {/* Main Hub View with Navigation */}
        <div className={`transition-opacity duration-300 ${activeView !== 'main' ? 'opacity-0 pointer-events-none fixed inset-0' : 'opacity-100 absolute inset-0 flex flex-col w-full h-full overflow-hidden'}`}>
          {/* Top Bar */}
          <TopNavBar
            onOpenProfile={() => setShowProfile(true)}
            onOpenNotifications={() => setShowNotifications(true)}
            onGoToShop={() => setActiveTab('shop')}
            onOpenTutorial={() => setShowTutorial(true)}
          />

          {/* Sub Navigation Tabs (Below Profile) */}
          <div className="w-full bg-[#040514]/95 border-b border-cyan-500/10 z-20 sticky top-0 shadow-md">
            <div className="max-w-md mx-auto flex items-center justify-around py-1.5 px-2">
              <button onClick={() => setActiveTab('play')} className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'play' ? 'text-cyan-400 scale-105' : 'text-cyan-500/70 hover:text-cyan-400'}`}>
                <div className={`p-1.5 rounded-lg ${activeTab === 'play' ? 'bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-white/5'}`}>
                  <Home className={`w-3.5 h-3.5 ${activeTab === 'play' ? 'fill-cyan-400/30' : 'fill-cyan-400/10'}`} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-wider">Home</span>
              </button>
              <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'shop' ? 'text-amber-400 scale-105' : 'text-amber-500/70 hover:text-amber-400'}`}>
                <div className={`p-1.5 rounded-lg ${activeTab === 'shop' ? 'bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-white/5'}`}>
                  <ShoppingBag className={`w-3.5 h-3.5 ${activeTab === 'shop' ? 'fill-amber-400/30' : 'fill-amber-400/10'}`} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-wider">Shop</span>
              </button>
              <button onClick={() => setActiveTab('missions')} className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'missions' ? 'text-emerald-400 scale-105 relative' : 'text-emerald-500/70 hover:text-emerald-400 relative'}`}>
                <div className={`p-1.5 rounded-lg ${activeTab === 'missions' ? 'bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-white/5'}`}>
                  <Target className={`w-3.5 h-3.5 ${activeTab === 'missions' ? 'fill-emerald-400/30' : 'fill-emerald-400/10'}`} />
                </div>
                {claimableMissionsCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-ping" />}
                <span className="text-[8px] font-black uppercase tracking-wider">Quests</span>
              </button>
              <button onClick={() => setActiveTab('events')} className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'events' ? 'text-rose-400 scale-105' : 'text-rose-500/70 hover:text-rose-400'}`}>
                <div className={`p-1.5 rounded-lg ${activeTab === 'events' ? 'bg-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'bg-white/5'}`}>
                  <Flame className={`w-3.5 h-3.5 ${activeTab === 'events' ? 'fill-rose-400/30' : 'fill-rose-400/10'}`} />
                </div>
                {hasEventReady && <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />}
                <span className="text-[8px] font-black uppercase tracking-wider">Events</span>
              </button>
            </div>
          </div>

          {/* Tab Viewport */}
          <main className="flex-1 w-full overflow-y-auto relative">
            <AnimatePresence mode="wait">
              {activeTab === 'play' && (
                <motion.div
                  key="tab-play"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full min-h-full"
                >
                  <FrontPage 
                    onPlay={() => setActiveView('modes')} 
                    onSurvivalPlay={handleSurvivalPlay}
                    onBossPlay={handleBossPlay}
                    onDropPlay={handleDropPlay}
                    onPlayMiniMergeNumbers={() => setActiveView('mini_merge_numbers')}
                    onPlayMiniMergeBlocks={() => setActiveView('mini_merge_blocks')}
                    onPlayMiniHexagon={() => setActiveView('mini_hexagon')}
                    onPlayMiniNumberSnacks={() => setActiveView('mini_number_snacks')}
                    hideTopBar={true}
                  />
                </motion.div>
              )}

              {activeTab === 'shop' && (
                <motion.div
                  key="tab-shop"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="w-full min-h-full"
                >
                  <ShopModal asTab={true} onClose={() => setActiveTab('play')} />
                </motion.div>
              )}

              {activeTab === 'missions' && (
                <motion.div
                  key="tab-missions"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="w-full min-h-full"
                >
                  <TasksModal asTab={true} onClose={() => setActiveTab('play')} />
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div
                  key="tab-events"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="w-full min-h-full"
                >
                  <EventsHubView />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
        
        {/* Game Modes Screen */}
        <div className={`transition-opacity duration-300 ${activeView !== 'modes' ? 'opacity-0 pointer-events-none fixed inset-0' : 'opacity-100 flex absolute inset-0'}`}>
          {activeView === 'modes' && (
             <GameModesScreen 
               level={level}
               bestScore={bestScore}
               onBack={() => setActiveView('main')}
               onSelectMode={handleSelectMode}
             />
          )}
        </div>
        
        {/* Game View */}
        <div className={`transition-opacity duration-300 relative z-50 ${activeView !== 'game' ? 'opacity-0 pointer-events-none fixed inset-0' : 'opacity-100'}`}>
          <Game
            key={gameKey} 
            isOverlay={true} 
            onExit={exitGame} 
            onMinimize={minimizeGame}
            themeId={activeThemeId}
            isActive={activeView === 'game'}
            gameMode={activeGameMode}
            bossType={bossType}
          />
        </div>

        {/* Mini Games */}
        {activeView === 'mini_merge_numbers' && (
          <MergeNumbersGame onExit={exitMiniGame} onSwitchGame={(g) => setActiveView(g as any)} />
        )}
        
        {activeView === 'mini_merge_blocks' && (
          <MergeBlocksGame onExit={exitMiniGame} onSwitchGame={(g) => setActiveView(g as any)} />
        )}
        
        {activeView === 'mini_hexagon' && (
          <HexagonGame onExit={exitMiniGame} onSwitchGame={(g) => setActiveView(g as any)} />
        )}
        
        {activeView === 'mini_number_snacks' && (
          <NumberSnacksGame onExit={exitMiniGame} />
        )}

        {/* Full Screen Overlays & Modals */}
        <AnimatePresence>
          {showProfile && (
            <ProfileSettings onClose={() => setShowProfile(false)} />
          )}

          {showNotifications && (
            <NotificationsModal onClose={() => setShowNotifications(false)} />
          )}

          {showTutorial && (
            <TutorialOverlay forceShow={true} onClose={() => setShowTutorial(false)} />
          )}

          {showPolicyCenter && (
            <PolicyCenterModal onClose={() => setShowPolicyCenter(false)} />
          )}

          {showOurApps && (
            <OurAppsModal onClose={() => setShowOurApps(false)} />
          )}

          {showLuckySpin && (
            <LuckySpinModal onClose={() => setShowLuckySpin(false)} />
          )}

          {showVipModal && (
            <VipModal onClose={() => setShowVipModal(false)} />
          )}

          {showLiveEvent && (
            <LiveEventModal onClose={() => setShowLiveEvent(false)} />
          )}

          {showAdmin && (
            <AdminDashboard onClose={() => setShowAdmin(false)} />
          )}
        </AnimatePresence>
        
        <LevelUpOverlay />
        <NetworkStatusToast />
        <AdOverlay />
      </Suspense>
    </div>
  );
}

