import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

const NOTIFICATION_MESSAGES = [
  { title: 'We are missing you! 🥺', body: 'Come back and play! Your puzzle board is waiting.' },
  { title: 'New games are added! 🎮', body: 'Check out the new game modes and puzzles we have for you.' },
  { title: 'Special Discounts! 💎', body: 'New events and huge discounts are live in the shop. Check them out!' },
  { title: 'New levels are here! 🚀', body: 'Can you beat your high score today? Jump in and merge those blocks!' },
  { title: 'Free rewards waiting! 🎁', body: 'Your offline rewards and daily spins are ready to be claimed.' },
  { title: 'Don\'t lose your streak! 🔥', body: 'Merge some numbers to keep your brain sharp.' },
  { title: 'Bored? Let\'s play! 🕹️', body: 'The perfect time for a quick 2048 game is right now.' },
  { title: 'Power-ups restocked! ⚡', body: 'Stock up on bombs and hammers to clear the board.' }
];

export const notificationService = {
  async requestPermissions(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    try {
      const permStatus = await LocalNotifications.checkPermissions();
      if (permStatus.display !== 'granted') {
        const reqStatus = await LocalNotifications.requestPermissions();
        return reqStatus.display === 'granted';
      }
      return true;
    } catch (e) {
      console.warn('Notification permission error:', e);
      return false;
    }
  },

  async cancelOfflineNotifications() {
    if (!Capacitor.isNativePlatform()) return;
    try {
      // Cancel all pending notifications
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel(pending);
      }
    } catch (e) {
      console.warn('Cancel notification error:', e);
    }
  },

  async scheduleOfflineNotifications() {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      // Always clear existing before scheduling new ones
      await this.cancelOfflineNotifications();

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return;

      const notificationsToSchedule = [];
      
      // Schedule every 4 hours for up to 48 hours (12 notifications total)
      const intervalMs = 4 * 60 * 60 * 1000;
      
      for (let i = 1; i <= 12; i++) {
        // Randomly pick a message from our list
        const msg = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
        
        notificationsToSchedule.push({
          id: 1000 + i, // unique integer ID
          title: msg.title,
          body: msg.body,
          schedule: { at: new Date(Date.now() + i * intervalMs) },
          sound: null, // use default system sound
          actionTypeId: '',
          extra: null
        });
      }

      await LocalNotifications.schedule({
        notifications: notificationsToSchedule
      });

    } catch (e) {
      console.warn('Schedule notification error:', e);
    }
  }
};
