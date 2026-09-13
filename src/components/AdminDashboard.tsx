import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Tv, 
  Settings, Lock,
  Megaphone, Users
} from 'lucide-react';
import { useAdminConfigStore } from '../store/adminConfigStore';
import { AdminRevenueTab } from './admin/AdminRevenueTab';
import { AdminPrivateAdsTab } from './admin/AdminPrivateAdsTab';
import { AdminTeamTab } from './admin/AdminTeamTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';
import { AdminAuthModal } from './admin/AdminAuthModal';

export type AdminTabId = 
  | 'revenue' 
  | 'private_ads'
  | 'team'
  | 'settings';

interface AdminDashboardProps {
  onClose: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { isUnlocked, currentAdminUser, superAdminEmail, lockAdmin } = useAdminConfigStore();
  const [activeTab, setActiveTab] = useState<AdminTabId>('private_ads');
  const [fps, setFps] = useState(60);

  // FPS calculation for telemetry
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;
    const loop = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const allNavItems: { id: AdminTabId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'private_ads', label: 'Private Ads', icon: <Megaphone className="w-4 h-4 text-purple-400" />, badge: 'Promos' },
    { id: 'revenue', label: 'Ad Settings', icon: <Tv className="w-4 h-4 text-cyan-400" />, badge: 'AdMob' },
    { id: 'team', label: 'Team & Roles', icon: <Users className="w-4 h-4 text-cyan-400" />, badge: 'RBAC' },
    { id: 'settings', label: 'App Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const isSuper = !currentAdminUser || currentAdminUser.role === 'super_admin';
  const perms = currentAdminUser?.permissions;

  // Filter tabs strictly based on this role's permissions
  const navItems = allNavItems.filter((item) => {
    if (isSuper) return true;
    if (item.id === 'revenue' || item.id === 'private_ads') return perms?.manageAds ?? false;
    if (item.id === 'team') return perms?.manageRoles ?? false;
    if (item.id === 'settings') return false;
    return false;
  });

  // Ensure activeTab is always accessible to the current user
  useEffect(() => {
    const isTabAllowed = navItems.some(item => item.id === activeTab);
    if (!isTabAllowed && navItems.length > 0) {
      setActiveTab(navItems[0].id);
    }
  }, [navItems, activeTab]);

  if (!isUnlocked) {
    return (
      <AdminAuthModal 
        onSuccess={() => {}} 
        onClose={onClose} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[2500] bg-[#070914] text-slate-100 flex flex-col overflow-hidden font-sans select-none">
        {/* TOP STATUS APP BAR */}
        <header className="h-16 px-4 sm:px-6 bg-[#0a0d1e]/90 border-b border-white/10 flex items-center justify-between shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black uppercase tracking-wider text-white">MergeVerse Control Center</h1>
                <span className="hidden sm:inline-block text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  STUDIO v2.4
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                {currentAdminUser ? (
                  <>
                    <span className="text-white font-bold">{currentAdminUser.name}</span>
                    <span className="text-cyan-300 font-mono text-[10px] bg-cyan-950/70 border border-cyan-500/40 px-1.5 py-0.2 rounded font-bold">
                      {currentAdminUser.roleTitle || currentAdminUser.role.toUpperCase()}
                    </span>
                  </>
                ) : (
                  <span>Super Admin: <strong className="text-cyan-300 font-mono">{superAdminEmail}</strong></span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* FPS & Telemetry Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1 rounded-xl text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{fps} FPS</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">OFFLINE</span>
            </div>

            {/* Lock Session */}
            <button
              onClick={lockAdmin}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-400 border border-white/10 transition-colors"
              title="Lock Session"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Exit Dashboard */}
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Studio</span>
            </button>
          </div>
        </header>

        {/* MOBILE HORIZONTAL NAVIGATION STRIP */}
        <div className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#090b1c] border-b border-white/10 overflow-x-auto scrollbar-none shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN BODY: SIDEBAR + CONTENT AREA */}
        <div className="flex-1 flex overflow-hidden">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:flex flex-col justify-between w-64 bg-[#080b1a]/70 border-r border-white/10 p-4 shrink-0 overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 pb-2 block">
                Management Consoles
              </span>
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/50 text-cyan-300 font-black shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] bg-white/10 text-slate-400 px-2 py-0.5 rounded-full font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Info Card */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Environment Status</span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Architecture</span>
                <span className="text-cyan-400 font-mono font-bold">Offline-First</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Local Telemetry</span>
                <span className="text-emerald-400 font-mono font-bold">Active</span>
              </div>
            </div>
          </aside>

          {/* CONTENT VIEWPORT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="max-w-7xl mx-auto pb-12">
              {activeTab === 'revenue' && <AdminRevenueTab />}
              {activeTab === 'private_ads' && <AdminPrivateAdsTab />}
              {activeTab === 'team' && <AdminTeamTab />}
              {activeTab === 'settings' && <AdminSettingsTab />}
            </div>
          </main>
        </div>
      </div>
  );
}
