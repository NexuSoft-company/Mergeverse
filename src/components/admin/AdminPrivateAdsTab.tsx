import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Plus, ExternalLink, Eye, MousePointerClick, 
  Trash2, Edit3, CheckCircle2, PauseCircle, PlayCircle, 
  Smartphone, Rocket, Crown, Gift, Gamepad2, 
  Layers, RefreshCcw, AlertCircle, Share2, Cloud, CloudCheck, Wifi, WifiOff
} from 'lucide-react';
import { useAdStore, PrivateAdCampaign } from '../../store/adStore';
import { useAdminConfigStore } from '../../store/adminConfigStore';
import { pushAdsToCloud, onSyncStatusChange, SyncStatus } from '../../services/remoteConfigSync';

export function AdminPrivateAdsTab() {
  const { 
    privateAds, 
    privateAdsMode, 
    addPrivateAd, 
    updatePrivateAd, 
    deletePrivateAd, 
    togglePrivateAd, 
    setPrivateAdsMode 
  } = useAdStore();
  const { currentAdminUser, logAction } = useAdminConfigStore();

  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState<PrivateAdCampaign | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('live');
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    return onSyncStatusChange((status, time) => {
      setSyncStatus(status);
      if (time) setLastSync(time);
    });
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    const res = await pushAdsToCloud(currentAdminUser?.pin || '2048');
    setIsSyncing(false);
    if (res.success) {
      showNotify('All ads successfully synced to cloud Firestore! Other devices updated.');
    } else {
      showNotify('Sync failed. Check internet connection.');
    }
  };

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('Featured App');
  const [iconType, setIconType] = useState<'game' | 'app' | 'gift' | 'star' | 'rocket' | 'crown'>('game');
  const [targetUrl, setTargetUrl] = useState('https://play.google.com/store');
  const [ctaText, setCtaText] = useState('Install Free');
  const [category, setCategory] = useState<'cross_promo' | 'direct_sponsor' | 'affiliate' | 'custom'>('cross_promo');
  const [priority, setPriority] = useState(10);
  const [active, setActive] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const totalImpressions = privateAds.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = privateAds.reduce((acc, curr) => acc + curr.clicks, 0);
  const averageCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0';

  const openCreateModal = () => {
    setEditingAd(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setBadge('Featured App');
    setIconType('game');
    setTargetUrl('https://play.google.com/store');
    setCtaText('Install Free');
    setCategory('cross_promo');
    setPriority(10);
    setActive(true);
    setShowModal(true);
  };

  const openEditModal = (ad: PrivateAdCampaign) => {
    setEditingAd(ad);
    setTitle(ad.title);
    setSubtitle(ad.subtitle);
    setDescription(ad.description);
    setBadge(ad.badge);
    setIconType(ad.iconType);
    setTargetUrl(ad.targetUrl);
    setCtaText(ad.ctaText);
    setCategory(ad.category);
    setPriority(ad.priority);
    setActive(ad.active);
    setShowModal(true);
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetUrl.trim()) {
      alert('Please fill out at least Title and Target URL.');
      return;
    }

    if (editingAd) {
      updatePrivateAd(editingAd.id, {
        title,
        subtitle,
        description,
        badge,
        iconType,
        targetUrl,
        ctaText,
        category,
        priority: Number(priority),
        active,
      });
      logAction('PRIVATE_AD_UPDATED', editingAd.id, `Updated campaign: ${title}`);
      showNotify(`Campaign "${title}" updated! Auto-syncing to cloud...`);
      pushAdsToCloud(currentAdminUser?.pin || '2048');
    } else {
      addPrivateAd({
        title,
        subtitle,
        description,
        badge,
        iconType,
        targetUrl,
        ctaText,
        category,
        priority: Number(priority),
        active,
      });
      logAction('PRIVATE_AD_CREATED', 'HouseAds', `Created campaign: ${title}`);
      showNotify(`New campaign "${title}" created! Auto-syncing to cloud...`);
      pushAdsToCloud(currentAdminUser?.pin || '2048');
    }

    setShowModal(false);
  };

  const renderIconPreview = (type: string) => {
    switch (type) {
      case 'game': return <Gamepad2 className="w-5 h-5 text-emerald-300" />;
      case 'rocket': return <Rocket className="w-5 h-5 text-amber-300" />;
      case 'crown': return <Crown className="w-5 h-5 text-amber-200" />;
      case 'gift': return <Gift className="w-5 h-5 text-rose-300" />;
      default: return <Smartphone className="w-5 h-5 text-cyan-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-purple-400" /> Private Ads & Cross-App Promotion
            </h3>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
              HOUSE ADS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Run your own direct sponsors, promote your other games, and share custom download links in in-game banners and showcase cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notification && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 rounded-xl animate-pulse">
              {notification}
            </span>
          )}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/25 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Cloud Sync Status Bar */}
      <div className="bg-gradient-to-r from-purple-950/40 via-black/50 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
            syncStatus === 'live' 
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
              : syncStatus === 'syncing'
              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 animate-spin'
              : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
          }`}>
            {syncStatus === 'live' ? <Cloud className="w-5 h-5 text-emerald-400" /> : syncStatus === 'syncing' ? <RefreshCcw className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Live Cloud Sync: {syncStatus === 'live' ? 'Connected & Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Offline (Local Cache Active)'}
              </span>
              <span className={`w-2 h-2 rounded-full ${syncStatus === 'live' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            </div>
            <p className="text-[11px] text-slate-400">
              Changes published here update on all player devices globally when online. When players go offline, local ads keep playing.
            </p>
          </div>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCcw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Publish to All Devices Now'}</span>
        </button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active Campaigns</span>
            <Rocket className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {privateAds.filter(a => a.active).length} <span className="text-xs text-slate-500 font-normal">/ {privateAds.length} total</span>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Impressions</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">
            {totalImpressions.toLocaleString()}
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Direct App Clicks</span>
            <MousePointerClick className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {totalClicks.toLocaleString()}
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Average CTR</span>
            <Share2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {averageCtr}%
          </div>
        </div>
      </div>

      {/* AD SERVING MODE STRATEGY SELECTOR */}
      <div className="bg-gradient-to-r from-purple-950/30 via-[#0d1026] to-black/40 border border-purple-500/30 rounded-3xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Ad Rotation & Serving Policy
            </h4>
            <p className="text-xs text-slate-400">
              Choose whether to exclusively show your own other apps or mix with third-party networks (AdMob/Unity).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/40 border border-purple-500/30 px-3 py-1.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400">Cycle Interval:</span>
            <div className="flex items-center gap-1">
              {[5, 6, 7].map(sec => {
                const isSelected = (useAdStore.getState().bannerConfig.rotationIntervalSeconds || 6) === sec;
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => {
                      useAdStore.getState().setBannerConfig({ rotationIntervalSeconds: sec });
                      showNotify(`Banner rotation interval set to ${sec}s!`);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                      isSelected
                        ? 'bg-purple-500 text-white shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    {sec}s
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => {
              setPrivateAdsMode('always');
              showNotify('Mode: 100% Private House Ads (Exclusively your own apps)');
            }}
            className={`p-3.5 rounded-2xl border text-left transition ${
              privateAdsMode === 'always'
                ? 'bg-purple-600/25 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase text-purple-300">100% Private / House</span>
              {privateAdsMode === 'always' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
            </div>
            <p className="text-[11px] text-slate-400">Exclusively promote your own apps and custom sponsors without external ads.</p>
          </button>

          <button
            onClick={() => {
              setPrivateAdsMode('mixed');
              showNotify('Mode: 50/50 Smart Mix (Network + Your Own Apps)');
            }}
            className={`p-3.5 rounded-2xl border text-left transition ${
              privateAdsMode === 'mixed'
                ? 'bg-cyan-600/25 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase text-cyan-300">Smart 50/50 Mix</span>
              {privateAdsMode === 'mixed' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
            </div>
            <p className="text-[11px] text-slate-400">Alternates between your own apps and external AdMob/Unity network ads.</p>
          </button>

          <button
            onClick={() => {
              setPrivateAdsMode('network_only');
              showNotify('Mode: External Ad Networks Only');
            }}
            className={`p-3.5 rounded-2xl border text-left transition ${
              privateAdsMode === 'network_only'
                ? 'bg-amber-600/25 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase text-amber-300">Network Only</span>
              {privateAdsMode === 'network_only' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-[11px] text-slate-400">Serves external ad networks only; hides house campaigns from banners.</p>
          </button>
        </div>
      </div>

      {/* ACTIVE CAMPAIGNS LIST */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Active Promotion Campaigns</h4>
            <p className="text-xs text-slate-400">Direct download links, badges, and click telemetry for each app or banner.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {privateAds.length} campaigns configured
          </span>
        </div>

        {privateAds.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500">
            <Megaphone className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-bold text-slate-400">No private campaigns yet.</p>
            <p className="text-xs text-slate-500 mt-1">Tap &quot;Create Campaign&quot; above to promote your first other game or custom link!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {privateAds.map((ad) => {
              const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0.0';

              return (
                <div 
                  key={ad.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    ad.active 
                      ? 'bg-white/5 border-purple-500/30 hover:border-purple-500/50' 
                      : 'bg-black/30 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20 border border-white/10">
                      {renderIconPreview(ad.iconType)}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-white truncate">{ad.title}</span>
                        <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold uppercase">
                          {ad.badge}
                        </span>
                        <span className="text-[9px] bg-white/10 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                          {ad.category}
                        </span>
                        {ad.active ? (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">
                            Paused
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-1">{ad.subtitle}</p>
                      
                      <div className="flex items-center gap-2 text-[11px] text-cyan-400/80 font-mono truncate">
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{ad.targetUrl}</span>
                      </div>
                    </div>
                  </div>

                  {/* STATS & ACTIONS */}
                  <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                    {/* Stats pills */}
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block">Views</span>
                        <span className="font-bold text-white">{ad.impressions}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block">Clicks</span>
                        <span className="font-bold text-emerald-400">{ad.clicks}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block">CTR</span>
                        <span className="font-bold text-amber-400">{ctr}%</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => window.open(ad.targetUrl, '_blank')}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 transition"
                        title="Test Open Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          togglePrivateAd(ad.id);
                          showNotify(`Campaign "${ad.title}" ${ad.active ? 'Paused' : 'Activated'}`);
                          pushAdsToCloud(currentAdminUser?.pin || '2048');
                        }}
                        className={`p-2 rounded-xl border transition ${
                          ad.active 
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' 
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                        title={ad.active ? "Pause Campaign" : "Activate Campaign"}
                      >
                        {ad.active ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => openEditModal(ad)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                        title="Edit Campaign"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <div className="relative">
                        {deleteConfirmId === ad.id ? (
                          <div className="flex items-center gap-2 absolute right-0 bg-black/90 p-1 rounded-xl shadow-xl border border-rose-500/30 z-10 whitespace-nowrap">
                            <span className="text-xs text-rose-300 px-2">Delete?</span>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition"
                            >
                              No
                            </button>
                            <button
                              onClick={() => {
                                deletePrivateAd(ad.id);
                                showNotify(`Campaign "${ad.title}" deleted.`);
                                setDeleteConfirmId(null);
                                pushAdsToCloud(currentAdminUser?.pin || '2048');
                              }}
                              className="px-2 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded text-xs transition"
                            >
                              Yes, Delete
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(ad.id)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                            title="Delete Campaign"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[3000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0e24] border border-purple-500/40 rounded-3xl p-6 w-full max-w-xl space-y-5 shadow-[0_0_60px_rgba(168,85,247,0.3)] my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-black uppercase text-white">
                  {editingAd ? 'Edit Promotion Campaign' : 'Create New Promotion Campaign'}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* LIVE PREVIEW COMPONENT */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Live In-Game Banner Preview
              </span>
              <div className="w-full bg-gradient-to-r from-[#0d1326] via-[#191538] to-[#100d28] border border-cyan-500/40 px-3 py-2 rounded-2xl flex items-center justify-between shadow-lg shadow-purple-500/10">
                <div className="flex items-center gap-3 py-1 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shrink-0 border border-white/20">
                    {renderIconPreview(iconType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-white truncate flex items-center gap-1.5">
                      <span>{title || 'App Title Preview'}</span>
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono font-bold">
                        {badge || 'FEATURED'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 truncate font-medium">
                      {subtitle || 'Engaging subtitle and call to action'}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-[10px] px-3 py-1.5 rounded-lg shrink-0 uppercase">
                    {ctaText || 'Get App'}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    App / Sponsor Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyber Merge 2048 RPG"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Short Subtitle / Hook *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyberpunk Battle Merge Adventure"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Target Link (Google Play, App Store, or Website) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://play.google.com/store/apps/details?id=your.other.app"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-cyan-300 font-mono outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Top Game"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Button Action Text
                  </label>
                  <input
                    type="text"
                    placeholder="Install Free"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={iconType}
                    onChange={(e: any) => setIconType(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                  >
                    <option value="game">🎮 Gamepad</option>
                    <option value="rocket">🚀 Rocket Launch</option>
                    <option value="crown">👑 Royal Crown</option>
                    <option value="gift">🎁 Reward Box</option>
                    <option value="app">📱 Mobile App</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Campaign Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                  >
                    <option value="cross_promo">Cross-Promotion (Our Other Apps)</option>
                    <option value="direct_sponsor">Direct Paid Sponsor</option>
                    <option value="affiliate">Affiliate / Partner Link</option>
                    <option value="custom">Custom Studio Announcement</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="w-4 h-4 accent-purple-500 rounded"
                    />
                    <span className="text-xs font-bold text-white">Active &amp; Serving</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Full Description (for &quot;Our Apps&quot; Showcase Modal)
                </label>
                <textarea
                  rows={2}
                  placeholder="Detailed pitch, features, and rewards for players who download your other app..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black uppercase tracking-wider shadow-lg shadow-purple-500/30 transition active:scale-95"
                >
                  {editingAd ? 'Save Changes' : 'Launch Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
