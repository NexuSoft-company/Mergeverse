import React, { useState } from 'react';
import { 
  Users, UserPlus, ShieldCheck, Shield, Key, 
  Trash2, Edit3, CheckCircle2, XCircle, AlertTriangle, 
  Lock, Eye, EyeOff, Check, ChevronRight, Cloud, RefreshCcw
} from 'lucide-react';
import { 
  useAdminConfigStore, 
  AdminUser, 
  AdminRoleType, 
  AdminPermissions 
} from '../../store/adminConfigStore';
import { pushRolesToCloud } from '../../services/remoteConfigSync';

const ROLE_PRESETS: Record<AdminRoleType, { title: string; desc: string; permissions: AdminPermissions }> = {
  super_admin: {
    title: 'Super Admin (Owner)',
    desc: 'Unrestricted master access to all game configurations, team roles, economy, and monetization.',
    permissions: {
      manageAds: true,
      manageGames: true,
      manageEconomy: true,
      manageRoles: true,
      managePolicies: true,
      viewAnalytics: true,
    }
  },
  admin: {
    title: 'Executive Admin',
    desc: 'High-level administration across games, ad monetization, economy, policies, and metrics.',
    permissions: {
      manageAds: true,
      manageGames: true,
      manageEconomy: true,
      manageRoles: false,
      managePolicies: true,
      viewAnalytics: true,
    }
  },
  manager: {
    title: 'Studio Operations Manager',
    desc: 'Oversees day-to-day operations, ad networks, games status, and virtual economy.',
    permissions: {
      manageAds: true,
      manageGames: true,
      manageEconomy: true,
      manageRoles: false,
      managePolicies: false,
      viewAnalytics: true,
    }
  },
  editor: {
    title: 'Game Content Editor',
    desc: 'Creates and tunes game configurations, difficulties, economy shop, and reward drops.',
    permissions: {
      manageAds: false,
      manageGames: true,
      manageEconomy: true,
      manageRoles: false,
      managePolicies: false,
      viewAnalytics: true,
    }
  },
  ad_manager: {
    title: 'Monetization & Ad Manager',
    desc: 'Can configure AdMob/Unity networks, create private house ads, and promote other studio apps.',
    permissions: {
      manageAds: true,
      manageGames: false,
      manageEconomy: false,
      manageRoles: false,
      managePolicies: false,
      viewAnalytics: true,
    }
  },
  game_ops: {
    title: 'Game Operations Lead',
    desc: 'Can tune game modes, Number Snacks mechanics, power-ups, coin shop items, and multipliers.',
    permissions: {
      manageAds: false,
      manageGames: true,
      manageEconomy: true,
      manageRoles: false,
      managePolicies: false,
      viewAnalytics: true,
    }
  },
  moderator: {
    title: 'Community Moderator',
    desc: 'Can broadcast in-game notifications, manage announcements, and inspect privacy policies.',
    permissions: {
      manageAds: false,
      manageGames: false,
      manageEconomy: false,
      manageRoles: false,
      managePolicies: true,
      viewAnalytics: false,
    }
  },
  analyst: {
    title: 'Data & Revenue Analyst',
    desc: 'Read-only access to player retention, session metrics, eCPM benchmarks, and device telemetry.',
    permissions: {
      manageAds: false,
      manageGames: false,
      manageEconomy: false,
      manageRoles: false,
      managePolicies: false,
      viewAnalytics: true,
    }
  }
};

export function AdminTeamTab() {
  const { 
    adminUsers, 
    currentAdminUser, 
    addAdminUser, 
    updateAdminUser, 
    deleteAdminUser, 
    toggleAdminStatus,
    logAction 
  } = useAdminConfigStore();

  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [visiblePins, setVisiblePins] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRoleType>('ad_manager');
  const [roleTitle, setRoleTitle] = useState('Monetization Manager');
  const [pin, setPin] = useState('');
  const [permissions, setPermissions] = useState<AdminPermissions>({
    ...ROLE_PRESETS.ad_manager.permissions
  });

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const togglePinVisibility = (id: string) => {
    setVisiblePins(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRolePresetSelect = (newRole: AdminRoleType) => {
    setRole(newRole);
    setRoleTitle(ROLE_PRESETS[newRole].title);
    setPermissions({ ...ROLE_PRESETS[newRole].permissions });
  };

  const openAddModal = () => {
    setEditingAdmin(null);
    setName('');
    setEmail('');
    setRole('ad_manager');
    setRoleTitle(ROLE_PRESETS.ad_manager.title);
    setPin('4321');
    setPermissions({ ...ROLE_PRESETS.ad_manager.permissions });
    setShowModal(true);
  };

  const openEditModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setName(admin.name);
    setEmail(admin.email);
    setRole(admin.role);
    setRoleTitle(admin.roleTitle);
    setPin(admin.pin);
    setPermissions({ ...admin.permissions });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !pin.trim()) {
      alert('Please fill out Name, Email, and Access PIN.');
      return;
    }

    if (editingAdmin) {
      updateAdminUser(editingAdmin.id, {
        name,
        role,
        roleTitle,
        pin,
        permissions,
      });
      showNotify(`Admin "${name}" updated successfully!`);
      pushRolesToCloud(currentAdminUser?.pin || '2048');
    } else {
      const res = addAdminUser({
        name,
        email,
        role,
        roleTitle,
        pin,
        permissions,
        status: 'active',
      });
      if (!res.success) {
        alert(res.message);
        return;
      }
      showNotify(res.message);
      pushRolesToCloud(currentAdminUser?.pin || '2048');
    }

    setShowModal(false);
  };

  const handleManualSyncRoles = async () => {
    const res = await pushRolesToCloud(currentAdminUser?.pin || '2048');
    if (res.success) {
      showNotify('All Admin Roles and PINs synced to Cloud Firestore!');
    } else {
      showNotify('Cloud push failed. Local settings preserved.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Admin &amp; Role Management (RBAC)
            </h3>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
              ROLE BASED ACCESS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Add team members, assign custom roles (Ad Manager, Game Ops, Super Admin), set granular permissions, and manage offline access PINs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notification && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 rounded-xl animate-pulse">
              {notification}
            </span>
          )}
          <button
            onClick={handleManualSyncRoles}
            className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
            title="Sync Roles to Cloud Firestore"
          >
            <Cloud className="w-4 h-4" />
            <span>Sync to Cloud</span>
          </button>
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Admin</span>
          </button>
        </div>
      </div>

      {/* CURRENT ACTIVE USER BANNER */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-[#0a1628] to-black/50 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Current Active Session:</div>
            <div className="text-sm font-black text-white flex items-center gap-2">
              <span>{currentAdminUser?.name || 'Primary Super Admin'}</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono">
                {currentAdminUser?.roleTitle || 'Super Admin (Owner)'}
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
          Email: <span className="text-white font-bold">{currentAdminUser?.email || 'shahroz.mughal.31@gmail.com'}</span>
        </div>
      </div>

      {/* ADMINS LIST */}
      <div className="bg-black/40 border border-white/10 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Registered Administrators &amp; Staff</h4>
            <p className="text-xs text-slate-400">Team members authorized to access this control center.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {adminUsers.length} administrators
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {adminUsers.map((user) => {
            const isOwner = user.isProtected;
            const isPinVisible = visiblePins[user.id] || false;

            return (
              <div 
                key={user.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  user.status === 'active' 
                    ? 'bg-white/5 border-white/10 hover:border-cyan-500/30' 
                    : 'bg-black/30 border-rose-500/20 opacity-60'
                }`}
              >
                {/* User Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm border ${
                    user.role === 'super_admin'
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-400/40 shadow-md shadow-amber-500/20'
                      : user.role === 'ad_manager'
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-purple-400/40'
                      : 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white border-cyan-400/40'
                  }`}>
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm text-white">{user.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                        user.role === 'super_admin'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : user.role === 'ad_manager'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}>
                        {user.roleTitle}
                      </span>
                      {user.status === 'active' ? (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                          Active
                        </span>
                      ) : (
                        <span className="text-[9px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-bold">
                          Suspended
                        </span>
                      )}
                      {isOwner && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                          Owner
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 font-mono truncate">{user.email}</p>

                    {/* Permissions tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {user.permissions.manageAds && (
                        <span className="text-[9px] bg-purple-950/60 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-md font-mono">
                          Ads &amp; Private Ads
                        </span>
                      )}
                      {user.permissions.manageGames && (
                        <span className="text-[9px] bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-md font-mono">
                          Games &amp; Modes
                        </span>
                      )}
                      {user.permissions.manageEconomy && (
                        <span className="text-[9px] bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-md font-mono">
                          Shop &amp; Economy
                        </span>
                      )}
                      {user.permissions.manageRoles && (
                        <span className="text-[9px] bg-amber-950/60 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-md font-mono">
                          Team &amp; Roles
                        </span>
                      )}
                      {user.permissions.viewAnalytics && (
                        <span className="text-[9px] bg-blue-950/60 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-md font-mono">
                          Analytics
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* PIN & ACTIONS */}
                <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 border-t lg:border-t-0 border-white/10 pt-3 lg:pt-0">
                  {/* Access PIN display */}
                  <div className="flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-xs">
                    <Key className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400 text-[10px]">PIN:</span>
                    <span className="font-bold text-white tracking-widest">
                      {isPinVisible ? user.pin : '••••'}
                    </span>
                    <button
                      onClick={() => togglePinVisibility(user.id)}
                      className="text-slate-400 hover:text-white p-0.5 transition"
                    >
                      {isPinVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {!isOwner && (
                      <button
                        onClick={() => {
                          toggleAdminStatus(user.id);
                          showNotify(`Account "${user.name}" ${user.status === 'active' ? 'Suspended' : 'Activated'}`);
                          pushRolesToCloud(currentAdminUser?.pin || '2048');
                        }}
                        className={`p-2 rounded-xl border transition ${
                          user.status === 'active'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                        title={user.status === 'active' ? 'Suspend Admin' : 'Activate Admin'}
                      >
                        {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    )}

                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                      title="Edit Admin & Permissions"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {!isOwner && (
                      <div className="relative">
                        {deleteConfirmId === user.id ? (
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
                                const res = deleteAdminUser(user.id);
                                if (res?.message) showNotify(res.message);
                                setDeleteConfirmId(null);
                                pushRolesToCloud(currentAdminUser?.pin || '2048');
                              }}
                              className="px-2 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded text-xs transition"
                            >
                              Yes, Delete
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(user.id)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                            title="Delete Admin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD / EDIT ADMIN MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[3000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0e24] border border-cyan-500/40 rounded-3xl p-6 w-full max-w-xl space-y-5 shadow-[0_0_60px_rgba(6,182,212,0.3)] my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black uppercase text-white">
                  {editingAdmin ? `Edit Admin: ${editingAdmin.name}` : 'Add New Administrator / Role'}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ali Hassan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={!!editingAdmin}
                    placeholder="e.g. ali@mergeverse.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* ROLE TEMPLATE SELECTION */}
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">
                  Select Role Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(ROLE_PRESETS) as AdminRoleType[]).map((rKey) => (
                    <button
                      key={rKey}
                      type="button"
                      onClick={() => handleRolePresetSelect(rKey)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        role === rKey 
                          ? 'bg-cyan-500/20 border-cyan-400 text-white' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-[11px] capitalize">{rKey.replace('_', ' ')}</div>
                      <div className="text-[9px] text-slate-400 truncate mt-0.5">{ROLE_PRESETS[rKey].title}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Custom Role Title
                  </label>
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Login Passcode / PIN *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5678"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-cyan-300 font-mono tracking-widest outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* GRANULAR PERMISSIONS */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] text-cyan-400 font-black uppercase tracking-wider block">
                  Fine-Grained Permissions
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageAds}
                      onChange={(e) => setPermissions(p => ({ ...p, manageAds: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-xs text-white">Manage Ads &amp; House Campaigns</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageGames}
                      onChange={(e) => setPermissions(p => ({ ...p, manageGames: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-xs text-white">Manage Games &amp; Multipliers</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageEconomy}
                      onChange={(e) => setPermissions(p => ({ ...p, manageEconomy: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-xs text-white">Manage Economy &amp; Shop</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageRoles}
                      onChange={(e) => setPermissions(p => ({ ...p, manageRoles: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-xs text-white">Manage Team &amp; Roles</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.managePolicies}
                      onChange={(e) => setPermissions(p => ({ ...p, managePolicies: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-xs text-white">Broadcasts &amp; Legal Policies</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.viewAnalytics}
                      onChange={(e) => setPermissions(p => ({ ...p, viewAnalytics: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-xs text-white">View Analytics &amp; Telemetry</span>
                  </label>
                </div>
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition active:scale-95"
                >
                  {editingAdmin ? 'Update Admin' : 'Save Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
