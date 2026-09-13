import React, { useState } from 'react';
import { 
  Settings, Sliders, Shield, Volume2, Music, Vibrate, 
  Zap, AlertOctagon, History, Trash2, Check, RefreshCw
} from 'lucide-react';
import { useAdminConfigStore } from '../../store/adminConfigStore';

export function AdminSettingsTab() {
  const { appSettings, updateAppSettings, auditLogs, clearAuditLogs, games } = useAdminConfigStore();
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-black uppercase tracking-wider text-white">Application Architecture & Audit Trail</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Global operational flags, audio-visual defaults, and non-repudiation audit logging.
          </p>
        </div>
        {notification && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full animate-pulse">
            {notification}
          </span>
        )}
      </div>

      {/* Global Parameters */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" /> Core Environment Variables
        </h4>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Application Name</label>
            <input
              type="text"
              value={appSettings.appName}
              onChange={(e) => {
                updateAppSettings({ appName: e.target.value });
                showNotify('App Name updated');
              }}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white font-bold outline-none"
            />
          </div>
        </div>

        {/* Audio / Visual Defaults */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { key: 'soundEnabled', label: 'Sound FX', icon: <Volume2 className="w-4 h-4 text-cyan-400" /> },
            { key: 'musicEnabled', label: 'Music BGM', icon: <Music className="w-4 h-4 text-indigo-400" /> },
            { key: 'hapticsEnabled', label: 'Haptic Feedback', icon: <Vibrate className="w-4 h-4 text-fuchsia-400" /> },
            { key: 'animationsEnabled', label: 'Motion Effects', icon: <Zap className="w-4 h-4 text-amber-400" /> },
          ].map((item) => {
            const isEnabled = appSettings[item.key as keyof typeof appSettings];
            return (
              <div key={item.key} className="bg-black/30 p-3 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-xs font-bold text-white">{item.label}</span>
                </div>
                <button
                  onClick={() => {
                    updateAppSettings({ [item.key]: !isEnabled });
                    showNotify(`${item.label} ${!isEnabled ? 'enabled' : 'disabled'}`);
                  }}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isEnabled ? 'bg-emerald-500' : 'bg-white/20'}`}
                >
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Reward Multiplier & Developer Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Global Studio Reward Multiplier</span>
              <span className="text-amber-400 font-mono">{appSettings.globalRewardMultiplier}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={appSettings.globalRewardMultiplier}
              onChange={(e) => {
                updateAppSettings({ globalRewardMultiplier: parseFloat(e.target.value) });
                showNotify('Global multiplier updated');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">Applies across all minigames and end-game score calculations.</p>
          </div>

          <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Developer Diagnostic Mode</span>
              <button
                onClick={() => {
                  updateAppSettings({ developerMode: !appSettings.developerMode });
                  showNotify(`Developer mode ${!appSettings.developerMode ? 'activated' : 'deactivated'}`);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                  appSettings.developerMode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-white/10 text-slate-400'
                }`}
              >
                {appSettings.developerMode ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>
            <p className="text-[10px] text-slate-500">Enables in-game collision wireframes, FPS counter, and raw event dispatch logger.</p>
          </div>
        </div>

        {/* Maintenance Mode Notice */}
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Offline Maintenance Banner</span>
            </div>
            <button
              onClick={() => {
                updateAppSettings({ maintenanceMode: !appSettings.maintenanceMode });
                showNotify(`Maintenance mode ${!appSettings.maintenanceMode ? 'activated' : 'deactivated'}`);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                appSettings.maintenanceMode ? 'bg-rose-500 text-slate-950' : 'bg-white/10 text-slate-400'
              }`}
            >
              {appSettings.maintenanceMode ? 'BROADCASTING' : 'DISABLED'}
            </button>
          </div>
          <input
            type="text"
            value={appSettings.maintenanceMessage}
            onChange={(e) => updateAppSettings({ maintenanceMessage: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-rose-200 outline-none"
          />
        </div>
      </div>

      {/* AUDIT LOGS TRAIL */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Immutable Local Audit Logs</h4>
          </div>
          <button
            onClick={() => {
              if (confirm('Clear local audit trail?')) {
                clearAuditLogs();
                showNotify('Audit log cleared');
              }
            }}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Logs
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {auditLogs.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No audit events recorded.</p>
          ) : (
            auditLogs.map((log) => (
              <div key={log.id} className="bg-black/30 border border-white/5 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-cyan-300">{log.action}</span>
                  <span className="text-slate-500">→</span>
                  <span className="text-white font-semibold">{log.target}</span>
                  {log.details && (
                    <span className="text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                      ({log.details})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                  <span>{log.adminEmail}</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
