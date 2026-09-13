import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeStorage } from '../lib/safeStorage';
import { verifyMasterPin } from '../lib/security';

export interface GameConfigItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  enabled: boolean;
  featured: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
  rewardMultiplier: number;
  startingPower?: number;
  spawnFrequency?: number; // seconds
  powerUpFrequency?: number; // seconds
  maxSessionReward?: number;
}

export interface IAPProductConfig {
  id: string;
  name: string;
  category: 'coins' | 'gems' | 'cosmetic' | 'vip' | 'remove_ads';
  priceUsd: number;
  rewardDescription: string;
  available: boolean;
  featured: boolean;
}

export interface ShopItemConfig {
  id: string;
  name: string;
  category: 'snack_skins' | 'game_themes' | 'board_themes' | 'effects' | 'powerups' | 'cosmetics' | 'bundles';
  price: number;
  currency: 'coins' | 'gems';
  enabled: boolean;
  featured: boolean;
  icon: string;
  description: string;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  adminEmail: string;
  target: string;
  timestamp: number;
  reason?: string;
  details?: string;
}

export type AdminRoleType = 'super_admin' | 'admin' | 'manager' | 'editor' | 'ad_manager' | 'game_ops' | 'moderator' | 'analyst';

export interface AdminPermissions {
  manageAds: boolean;           // Run ads, private ads, house campaigns
  manageGames: boolean;         // Toggles, difficulties, multipliers
  manageEconomy: boolean;       // Coins, gems, virtual shop catalog
  manageRoles: boolean;         // Add/edit admins & roles
  managePolicies: boolean;      // Policies, terms
  viewAnalytics: boolean;       // Device telemetry & logs
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRoleType;
  roleTitle: string;
  pin: string;                  // Master PIN / passcode for this admin
  permissions: AdminPermissions;
  status: 'active' | 'suspended';
  addedAt: number;
  lastLoginAt?: number;
  isProtected?: boolean;        // Protect root super admin from deletion
}

export interface AdminConfigState {
  // Super Admin security & Team
  superAdminEmail: string;
  isUnlocked: boolean;
  adminUsers: AdminUser[];
  currentAdminUser: AdminUser | null;
  unlockAdmin: (pinOrEmail: string, pin?: string) => Promise<{ success: boolean; error?: string; user?: AdminUser }>;
  unlockWithFirebaseSession: () => boolean;
  lockAdmin: () => void;
  addAdminUser: (admin: Omit<AdminUser, 'id' | 'addedAt'>) => { success: boolean; message: string };
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => { success: boolean; message: string };
  toggleAdminStatus: (id: string) => void;

  // Games management
  games: Record<string, GameConfigItem>;
  updateGameConfig: (id: string, updates: Partial<GameConfigItem>) => void;

  // Number Snacks dedicated controls
  numberSnacksAdvanced: {
    startingPower: number;
    difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
    spawnFrequency: number;
    powerUpFrequency: number;
    rewardMultiplier: number;
    maxSessionRewardCoins: number;
    dailyChallengeBonusMultiplier: number;
  };
  updateNumberSnacksAdvanced: (updates: Partial<AdminConfigState['numberSnacksAdvanced']>) => void;

  // Revenue & Ad Monetization
  revenueConfig: {
    adMobStatus: 'connected_test' | 'disabled' | 'live';
    bannerAds: { 
      enabled: boolean; 
      network: string; 
      position: 'top' | 'bottom';
      rotationIntervalSeconds?: number;
      autoRotate?: boolean;
    };
    interstitialAds: { enabled: boolean; frequencyMatches: number; cooldownSeconds: number };
    rewardedAds: {
      enabled: boolean;
      activeNetworks: string[];
      rewardCoins: number;
      rewardGems: number;
      maxPerDay: number;
      cooldownMinutes: number;
      placements: {
        continueGame: boolean;
        doubleReward: boolean;
        extraLife: boolean;
        bonusCoins: boolean;
      };
    };
    iapBillingStatus: 'disconnected' | 'mock_ready' | 'live_connected';
  };
  updateRevenueConfig: (updates: any) => void;

  // IAP Products Catalog
  iapProducts: IAPProductConfig[];
  updateIapProduct: (id: string, updates: Partial<IAPProductConfig>) => void;

  // Shop Management
  shopItems: ShopItemConfig[];
  updateShopItem: (id: string, updates: Partial<ShopItemConfig>) => void;
  addShopItem: (item: Omit<ShopItemConfig, 'id'>) => void;
  deleteShopItem: (id: string) => void;

  // App Settings
  appSettings: {
    appName: string;
    defaultGame: string;
    soundEnabled: boolean;
    musicEnabled: boolean;
    hapticsEnabled: boolean;
    animationsEnabled: boolean;
    globalRewardMultiplier: number;
    maintenanceMode: boolean;
    maintenanceMessage: string;
    developerMode: boolean;
  };
  updateAppSettings: (updates: Partial<AdminConfigState['appSettings']>) => void;

  // Audit Logs
  auditLogs: AdminAuditLog[];
  logAction: (action: string, target: string, details?: string, reason?: string) => void;
  clearAuditLogs: () => void;
}

export const useAdminConfigStore = create<AdminConfigState>()(
  persist(
    (set, get) => ({
      superAdminEmail: 'shahroz.mughal.31@gmail.com',
      isUnlocked: false,
      currentAdminUser: null,

      adminUsers: [
        {
          id: 'admin-root-owner',
          name: 'Shahroz Mughal',
          email: 'shahroz.mughal.31@gmail.com',
          role: 'super_admin',
          roleTitle: 'Super Admin (Owner)',
          pin: '2048',
          permissions: {
            manageAds: true,
            manageGames: true,
            manageEconomy: true,
            manageRoles: true,
            managePolicies: true,
            viewAnalytics: true,
          },
          status: 'active',
          addedAt: Date.now() - 2592000000,
          isProtected: true,
        }
      ],

      unlockWithFirebaseSession: () => {
        // Firebase auth removed, return false
        return false;
      },

      unlockAdmin: async (pinOrEmail: string, pin?: string) => {
        // Support both single argument PIN (new passwordless system) and legacy (email, pin)
        const inputPin = (pin && pin.trim().length > 0) ? pin.trim() : pinOrEmail.trim();

        if (!inputPin) {
          return { success: false, error: 'Please enter a valid Master Key / PIN.' };
        }

        const superAdmin = get().adminUsers.find(u => u.role === 'super_admin') || get().adminUsers[0];

        // 1. Check if PIN matches Super Admin master key or cryptographic verification
        const isMasterCryptValid = (await verifyMasterPin(inputPin)).valid;
        if (inputPin === superAdmin?.pin || isMasterCryptValid) {
          const updatedUsers = get().adminUsers.map(u => 
            u.id === superAdmin?.id ? { ...u, lastLoginAt: Date.now() } : u
          );
          set({ 
            isUnlocked: true, 
            currentAdminUser: { ...superAdmin, lastLoginAt: Date.now() },
            adminUsers: updatedUsers
          });
          get().logAction('SUPER_ADMIN_LOGIN', superAdmin?.email || 'Super Admin', 'Super Admin authenticated via Master PIN');
          return { success: true, user: superAdmin };
        }

        // 2. Check if PIN matches ANY registered sub-role user (Manager, Editor, Admin, etc.)
        const matchedUser = get().adminUsers.find(u => u.pin === inputPin);
        if (matchedUser) {
          if (matchedUser.status === 'suspended') {
            return { success: false, error: 'This access account is currently suspended. Please contact Super Admin.' };
          }
          const updatedUsers = get().adminUsers.map(u => 
            u.id === matchedUser.id ? { ...u, lastLoginAt: Date.now() } : u
          );
          set({ 
            isUnlocked: true, 
            currentAdminUser: { ...matchedUser, lastLoginAt: Date.now() },
            adminUsers: updatedUsers
          });
          get().logAction('ROLE_LOGIN', matchedUser.email, `User ${matchedUser.name} logged in with role: ${matchedUser.roleTitle}`);
          return { success: true, user: matchedUser };
        }

        return { success: false, error: 'Invalid Master PIN. Access Denied.' };
      },

      lockAdmin: () => {
        get().logAction('ADMIN_LOGOUT', 'ControlCenter', 'Session locked');
        set({ isUnlocked: false, currentAdminUser: null });
      },

      addAdminUser: (newAdminData) => {
        const cleanEmail = newAdminData.email.trim().toLowerCase();
        const cleanPin = newAdminData.pin.trim();

        const existingEmail = get().adminUsers.find(u => u.email.toLowerCase() === cleanEmail);
        if (existingEmail) {
          return { success: false, message: 'An admin with this email already exists.' };
        }

        const existingPin = get().adminUsers.find(u => u.pin === cleanPin);
        if (existingPin) {
          return { success: false, message: `This PIN is already assigned to "${existingPin.name}". Each role must have a unique Master PIN.` };
        }

        const newAdmin: AdminUser = {
          ...newAdminData,
          id: `admin-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          email: cleanEmail,
          pin: cleanPin,
          addedAt: Date.now(),
        };

        set(s => ({
          adminUsers: [...s.adminUsers, newAdmin]
        }));
        get().logAction('ADMIN_USER_ADDED', newAdmin.email, `Role: ${newAdmin.roleTitle}`);
        return { success: true, message: `Role "${newAdmin.name}" created with PIN ${newAdmin.pin}!` };
      },

      updateAdminUser: (id, updates) => {
        set(s => ({
          adminUsers: s.adminUsers.map(u => u.id === id ? { ...u, ...updates } : u),
          currentAdminUser: s.currentAdminUser?.id === id ? { ...s.currentAdminUser, ...updates } : s.currentAdminUser
        }));
        get().logAction('ADMIN_USER_UPDATED', id, JSON.stringify(updates));
      },

      deleteAdminUser: (id) => {
        const user = get().adminUsers.find(u => u.id === id);
        if (!user) return { success: false, message: 'Admin account not found.' };
        if (user.isProtected || user.email.toLowerCase() === get().superAdminEmail.toLowerCase()) {
          return { success: false, message: 'Cannot delete the Primary Super Admin (Owner).' };
        }

        set(s => ({
          adminUsers: s.adminUsers.filter(u => u.id !== id)
        }));
        get().logAction('ADMIN_USER_DELETED', user.email, `Removed role: ${user.roleTitle}`);
        return { success: true, message: `Admin ${user.name} was removed.` };
      },

      toggleAdminStatus: (id) => {
        const user = get().adminUsers.find(u => u.id === id);
        if (!user || user.isProtected) return;

        const newStatus = user.status === 'active' ? 'suspended' : 'active';
        set(s => ({
          adminUsers: s.adminUsers.map(u => u.id === id ? { ...u, status: newStatus } : u)
        }));
        get().logAction('ADMIN_STATUS_TOGGLED', user.email, `Status changed to ${newStatus}`);
      },

      games: {},

      updateGameConfig: (id, updates) => {
        set(state => {
          const current = state.games[id];
          if (!current) return state;
          const updated = { ...current, ...updates };
          return {
            games: {
              ...state.games,
              [id]: updated
            }
          };
        });
        get().logAction('GAME_CONFIG_UPDATED', id, JSON.stringify(updates));
      },

      numberSnacksAdvanced: {
        startingPower: 2,
        difficulty: 'normal',
        spawnFrequency: 1.2,
        powerUpFrequency: 8.0,
        rewardMultiplier: 1.25,
        maxSessionRewardCoins: 600,
        dailyChallengeBonusMultiplier: 1.5,
      },

      updateNumberSnacksAdvanced: (updates) => {
        set(state => ({
          numberSnacksAdvanced: {
            ...state.numberSnacksAdvanced,
            ...updates
          }
        }));
        get().logAction('NUMBER_SNACKS_CONFIG_UPDATED', 'NumberSnacksEngine', JSON.stringify(updates));
      },

      revenueConfig: {
        adMobStatus: 'connected_test',
        bannerAds: { 
          enabled: true, 
          network: 'Google AdMob', 
          position: 'bottom',
          rotationIntervalSeconds: 6,
          autoRotate: true,
        },
        interstitialAds: { enabled: true, frequencyMatches: 3, cooldownSeconds: 45 },
        rewardedAds: {
          enabled: true,
          activeNetworks: ['Google AdMob', 'Unity Ads', 'AppLovin MAX'],
          rewardCoins: 500,
          rewardGems: 25,
          maxPerDay: 15,
          cooldownMinutes: 2,
          placements: {
            continueGame: true,
            doubleReward: true,
            extraLife: true,
            bonusCoins: true,
          }
        },
        iapBillingStatus: 'disconnected'
      },

      updateRevenueConfig: (updates) => {
        set(state => ({
          revenueConfig: {
            ...state.revenueConfig,
            ...updates
          }
        }));
        get().logAction('REVENUE_CONFIG_UPDATED', 'MonetizationEngine', JSON.stringify(updates));
      },

      iapProducts: [],

      updateIapProduct: (id, updates) => {
        set(state => ({
          iapProducts: state.iapProducts.map(p => p.id === id ? { ...p, ...updates } : p)
        }));
        get().logAction('IAP_PRODUCT_UPDATED', id, JSON.stringify(updates));
      },

      shopItems: [],

      updateShopItem: (id, updates) => {
        set(state => ({
          shopItems: state.shopItems.map(item => item.id === id ? { ...item, ...updates } : item)
        }));
        get().logAction('SHOP_ITEM_UPDATED', id, JSON.stringify(updates));
      },

      addShopItem: (item) => {
        const newItem: ShopItemConfig = {
          ...item,
          id: `shop_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
        };
        set(state => ({
          shopItems: [...state.shopItems, newItem]
        }));
        get().logAction('SHOP_ITEM_CREATED', newItem.id, newItem.name);
      },

      deleteShopItem: (id) => {
        set(state => ({
          shopItems: state.shopItems.filter(i => i.id !== id)
        }));
        get().logAction('SHOP_ITEM_DELETED', id);
      },

      appSettings: {
        appName: 'MergeVerse',
        defaultGame: '2048_classic',
        soundEnabled: true,
        musicEnabled: true,
        hapticsEnabled: true,
        animationsEnabled: true,
        globalRewardMultiplier: 1.0,
        maintenanceMode: false,
        maintenanceMessage: 'System undergoing brief scheduled performance optimizations. Puzzles will resume shortly.',
        developerMode: false,
      },

      updateAppSettings: (updates) => {
        set(state => ({
          appSettings: {
            ...state.appSettings,
            ...updates
          }
        }));
        get().logAction('APP_SETTINGS_UPDATED', 'GlobalSettings', JSON.stringify(updates));
      },

      auditLogs: [],

      logAction: (action, target, details, reason) => {
        const newLog: AdminAuditLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          action,
          adminEmail: 'shahroz.mughal.31@gmail.com',
          target,
          details,
          reason,
          timestamp: Date.now()
        };
        set(state => ({
          auditLogs: [newLog, ...state.auditLogs.slice(0, 99)] // Keep last 100 logs
        }));
      },

      clearAuditLogs: () => set({ auditLogs: [] }),
    }),
    {
      name: 'mergeverse_admin_config_v1',
      partialize: (state) => {
        // SECURITY: Never persist isUnlocked in localStorage. Requires explicit session authentication.
        const { isUnlocked, ...persistedState } = state;
        return persistedState;
      },
      storage: {
        getItem: (name) => {
          const val = safeStorage.getItem(name);
          return val ? JSON.parse(val) : null;
        },
        setItem: (name, val) => safeStorage.setItem(name, JSON.stringify(val)),
        removeItem: (name) => safeStorage.removeItem(name),
      }
    }
  )
);
