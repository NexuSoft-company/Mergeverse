import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../config/firebase';
import { useAdStore, PrivateAdCampaign, AdConfig, BannerConfig, AdMobUnitConfig } from '../store/adStore';
import { useAdminConfigStore, AdminUser } from '../store/adminConfigStore';

export type SyncStatus = 'idle' | 'syncing' | 'live' | 'offline' | 'error';

let isInitialized = false;
let syncStatusListener: ((status: SyncStatus, lastSyncedAt: number | null, errorMsg?: string) => void) | null = null;
let currentStatus: SyncStatus = 'idle';
let lastSyncedTime: number | null = null;

export function onSyncStatusChange(callback: (status: SyncStatus, lastSyncedAt: number | null, errorMsg?: string) => void) {
  syncStatusListener = callback;
  callback(currentStatus, lastSyncedTime);
  return () => {
    syncStatusListener = null;
  };
}

function updateStatus(status: SyncStatus, errorMsg?: string) {
  currentStatus = status;
  if (status === 'live') {
    lastSyncedTime = Date.now();
  }
  if (syncStatusListener) {
    syncStatusListener(currentStatus, lastSyncedTime, errorMsg);
  }
}

/**
 * Sync Local Ads (Private House Ads + AdMob configuration) to Cloud Firestore.
 * Requires Admin Master PIN or Session.
 */
export async function pushAdsToCloud(masterPin: string = '2048') {
  updateStatus('syncing');
  const adStore = useAdStore.getState();
  const path = 'remote_config/ads';

  try {
    const payload = {
      privateAds: adStore.privateAds,
      bannerConfig: adStore.bannerConfig,
      adConfig: adStore.adConfig,
      admobKeys: adStore.admobKeys,
      masterPin: masterPin || '2048',
      updatedAt: Date.now(),
    };

    await setDoc(doc(db, 'remote_config', 'ads'), payload, { merge: true });
    updateStatus('live');
    return { success: true, message: 'Ad promotions & AdMob configuration synced to cloud successfully!' };
  } catch (err) {
    updateStatus('error', err instanceof Error ? err.message : 'Sync failed');
    handleFirestoreError(err, OperationType.WRITE, path);
    return { success: false, message: 'Cloud sync failed. Local changes kept.' };
  }
}

/**
 * Sync Admin Roles and PINs to Cloud Firestore.
 * Requires Admin Master PIN.
 */
export async function pushRolesToCloud(masterPin: string = '2048') {
  updateStatus('syncing');
  const adminStore = useAdminConfigStore.getState();
  const path = 'remote_config/roles';

  try {
    const payload = {
      adminUsers: adminStore.adminUsers,
      masterPin: masterPin || '2048',
      updatedAt: Date.now(),
    };

    await setDoc(doc(db, 'remote_config', 'roles'), payload, { merge: true });
    updateStatus('live');
    return { success: true, message: 'Admin roles and Master PINs synced to cloud successfully!' };
  } catch (err) {
    updateStatus('error', err instanceof Error ? err.message : 'Role sync failed');
    handleFirestoreError(err, OperationType.WRITE, path);
    return { success: false, message: 'Role sync failed. Local changes kept.' };
  }
}

/**
 * Pull and listen for real-time changes to Ads and Roles from Firestore.
 * Seamless offline fallback: If offline, the app continues with local storage without interruption.
 */
export function initRemoteConfigSync() {
  if (isInitialized) return;
  isInitialized = true;

  if (typeof window === 'undefined') return;

  const handleOnlineStatus = () => {
    if (!navigator.onLine) {
      updateStatus('offline');
    } else {
      updateStatus('syncing');
    }
  };

  window.addEventListener('online', handleOnlineStatus);
  window.addEventListener('offline', handleOnlineStatus);

  if (!navigator.onLine) {
    updateStatus('offline');
  } else {
    updateStatus('syncing');
  }

  // 1. Listen to Remote Ads & Banners
  const adsDocRef = doc(db, 'remote_config', 'ads');
  onSnapshot(
    adsDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const incomingAds = data.privateAds as PrivateAdCampaign[] | undefined;
        const incomingBanner = data.bannerConfig as BannerConfig | undefined;
        const incomingAdConfig = data.adConfig as AdConfig | undefined;
        const incomingAdmobKeys = data.admobKeys as AdMobUnitConfig | undefined;

        if (Array.isArray(incomingAds)) {
          useAdStore.setState({ privateAds: incomingAds });
        }
        if (incomingBanner) {
          useAdStore.setState({ bannerConfig: incomingBanner });
        }
        if (incomingAdConfig) {
          useAdStore.setState({ adConfig: incomingAdConfig });
        }
        if (incomingAdmobKeys) {
          useAdStore.setState({ admobKeys: incomingAdmobKeys });
        }
        updateStatus('live');
      } else {
        // First boot seeding: push initial private ads to Firestore so other devices get it immediately!
        getDoc(adsDocRef)
          .then((check) => {
            if (!check.exists() && navigator.onLine) {
              pushAdsToCloud('2048').catch(() => {});
            }
          })
          .catch(() => {});
      }
    },
    (error) => {
      if (!navigator.onLine) {
        updateStatus('offline');
      } else {
        console.warn('Remote Ads Sync listener warning (app using offline cache):', error.message);
        updateStatus('offline', error.message);
      }
    }
  );

  // 2. Listen to Remote Roles & PINs
  const rolesDocRef = doc(db, 'remote_config', 'roles');
  onSnapshot(
    rolesDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const incomingUsers = data.adminUsers as AdminUser[] | undefined;
        if (Array.isArray(incomingUsers) && incomingUsers.length > 0) {
          useAdminConfigStore.setState({ adminUsers: incomingUsers });
        }
        updateStatus('live');
      } else {
        // First boot seeding: push initial roles to Firestore
        getDoc(rolesDocRef)
          .then((check) => {
            if (!check.exists() && navigator.onLine) {
              pushRolesToCloud('2048').catch(() => {});
            }
          })
          .catch(() => {});
      }
    },
    (error) => {
      if (!navigator.onLine) {
        updateStatus('offline');
      } else {
        console.warn('Remote Roles Sync listener warning (app using offline cache):', error.message);
        updateStatus('offline', error.message);
      }
    }
  );
}
