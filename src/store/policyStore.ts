import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeStorage } from '../lib/safeStorage';

export interface PolicyDocument {
  id: string;
  title: string;
  category: 'privacy' | 'terms' | 'community' | 'ads' | 'child_safety' | 'monetization' | 'purchase_refund' | 'support';
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  summary: string;
  content: string;
  enabled: boolean;
}

export interface SupportConfig {
  supportEmail: string;
  privacyEmail: string;
  discordUrl?: string;
  faqList: { question: string; answer: string }[];
}

export interface PolicyState {
  supportConfig: SupportConfig;
  policies: Record<string, PolicyDocument>;
  updatePolicy: (id: string, updates: Partial<PolicyDocument>) => void;
  updateSupportConfig: (updates: Partial<SupportConfig>) => void;
  resetPoliciesToDefault: () => void;
}

export const defaultPolicies: Record<string, PolicyDocument> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    category: 'privacy',
    version: '2.1.0',
    effectiveDate: '2026-09-07',
    lastUpdated: '2026-09-07',
    enabled: true,
    summary: 'MergeVerse is an offline-first puzzle game. All high scores, merges, inventory, and settings stay securely on your personal device.',
    content: `### 1. Privacy Policy Overview
This Privacy Policy describes how MergeVerse ("we", "our") manages information across our puzzle games (2048 Classic, Number Snacks, Hexagon, and Merge Blocks) on Android, web, and related client platforms. We believe in transparent data minimization and respect your privacy.

### 2. App / Developer Identification
- **Application Title**: MergeVerse - The Ultimate Evolution
- **Package ID**: com.mergeverse.game
- **Developer**: Nexusoft
- **Developer & Support Contact**: Nexusoft.company@gmail.com
- **Privacy Inquiries**: Nexusoft.company@gmail.com

### 3. What Information We Process & Do Not Collect
We strictly minimize data processing:
- **Information We DO NOT Collect**: We do not collect your real legal name, physical home address, telephone number, device contacts, precise or coarse GPS location, biometric data, camera captures, microphone feeds, or Advertising ID (AAID).
- **Pseudonymous Game Profile**: An anonymous local Player ID (e.g. \`mv-xxxx\`) generated strictly on your device to maintain your local achievements. You may optionally select a display nickname and emoji avatar stored locally.
- **Gameplay State**: Tile board numbers, current score, high score, combo multipliers, unlocked game themes, virtual coin balance, gem balance, and power-up inventory. All gameplay state is stored exclusively on your device.

### 4. Information Stored Locally on the Device
MergeVerse uses standard on-device storage APIs (localStorage, IndexedDB, and client cache) to preserve your game progress seamlessly:
- Player progression: Level, XP, best scores per game mode.
- Economy state: Virtual Gold Coins, Gems, Energy counter, and power-ups.
- Preferences: Audio volume, music mute toggle, haptic feedback toggle, selected board themes.
- Local telemetry: Session count and gameplay duration on this device.

All local gameplay data remains strictly on your personal device. No gameplay data is transmitted to cloud databases or remote servers.

### 5. Third-Party Services & SDK Audit
- **Third-Party Ad Networks**: None. The application does not bundle Google AdMob, Unity Ads, AppLovin, or external ad tracking SDKs.
- **Third-Party Analytics SDKs**: None. The application does not integrate Google Analytics, Firebase Analytics, Facebook Pixel, AppsFlyer, or Adjust.
- **Google Play Billing**: Status: NOT CONNECTED. No payment credentials or financial transactions are collected or processed.
- **Capacitor Runtime**: Standard open-source mobile runtime plugins (SplashScreen, StatusBar, App) used solely to render the WebView and manage app lifecycle.

### 6. In-Game Advertisements & Rewards
MergeVerse features optional in-game rewards handled locally:
- Reward simulation overlays (such as voluntary "Watch Ad" for bonus coins or revives) are handled locally by the game engine.
- No user profiling, cross-app tracking, or advertising identifiers (AAID) are accessed, collected, or shared.

### 7. In-App Purchases & Billing Status
Status: **Google Play Billing NOT CONNECTED**.
- In the current release, all store items, virtual Gold Coins, Gems, and cosmetic themes operate entirely within an offline-first local sandbox economy.
- No real-world financial transactions or payment credentials are collected, processed, or transmitted.
- Virtual currencies have no cash value and cannot be redeemed for fiat currency.

### 8. Analytics & Diagnostics
We do not use third-party user behavioral tracking SDKs. The game maintains a lightweight local telemetry store on your device (games played, high scores, time spent) to display your personal achievements. Standard non-identifiable crash logs may be provided through Google Play Console (Android Vitals) if enabled at the OS level.

### 9. Cookies & Local Storage
MergeVerse does not use third-party tracking cookies or marketing pixels. When played via a web browser or PWA container, the app utilizes standard HTML5 \`localStorage\` and \`IndexedDB\` solely for essential functional purposes (persisting puzzle boards, audio preferences, and high scores).

### 10. How Information Is Used
Any local data processed by MergeVerse is used solely to:
- Provide, run, and maintain the offline puzzle gameplay and mini-games.
- Save your game levels, unlocked themes, high scores, and virtual inventory.
- Remember sound, music, and haptic vibration preferences.

### 11. Data Sharing & Disclosure
Because all gameplay data remains locally on your device, we do not sell, rent, trade, or transmit your personal data to any third party.

### 12. Data Security
Your game save files are isolated within the secure, sandboxed storage directory assigned to MergeVerse by your device's operating system. No sensitive personal or financial credentials are held by the application.

### 13. Data Retention
Because MergeVerse is offline-first, your game data is stored directly on your personal device and persists until you choose to uninstall the application, clear your device storage, or use the in-app reset functions. We do not retain personal profile databases on remote servers for offline gameplay.

### 14. Data Deletion & Reset Rights
You have complete control over your data. You may delete all locally stored game progress, high scores, and telemetry at any time by:
- Using the in-game **Profile / Settings &rarr; Reset Local Data** option.
- Navigating to your device's **Settings &rarr; Apps &rarr; MergeVerse &rarr; Storage &rarr; Clear Data / Clear Cache**.
- Uninstalling the application from your device.

### 15. Children's Privacy & Family Safety
MergeVerse is an offline mathematical puzzle game suitable for general casual audiences:
- We do not collect personal identifiable information from any user, including children under 13.
- There is no open, unmoderated public player-to-player text chat or direct messaging in the game.
- No violent, scary, vulgar, or mature content is present in any game mode.
- Because no personal data or advertising identifiers (AAID) are collected or transmitted off-device, children's privacy is preserved by default.

### 16. Permissions & Hardware Access
- \`android.permission.VIBRATE\`: Used exclusively to provide tactile haptic feedback during tile merges, wheel spins, and combos (can be disabled in Settings).
- No camera, microphone, contacts, storage, or location permissions are requested.

### 17. Offline-First Architecture
MergeVerse is architected so that core gameplay never requires an internet connection:
- All numbers puzzles (2048 Classic, Number Snacks, Hexagon, Merge Blocks) launch and function smoothly offline.
- Your merges, level-ups, and scores are recorded locally without interruption.

### 18. User Choices & Opt-Outs
You have full autonomy over your experience:
- **Audio & Haptic Controls**: Audio and haptic vibration can be muted or toggled at any time from the home screen or settings menu.
- **Data Reset**: You can wipe all local progression and high scores from the in-game settings or your device's application manager.
- **Offline Play**: You can play indefinitely without granting network permissions or signing in to any account.

### 19. Changes to This Privacy Policy
We may update this Privacy Policy periodically to reflect new features or regulatory requirements. When changes occur, we will update the "Last Updated" date and provide notice within the game's in-app Policy Center.

### 20. Contact & Privacy Inquiries
For questions, feedback, or privacy-related requests regarding MergeVerse, please contact the developer:
- **Developer**: Nexusoft
- **Contact Email**: Nexusoft.company@gmail.com`
  },
  terms: {
    id: 'terms',
    title: 'Terms of Service',
    category: 'terms',
    version: '1.2.0',
    effectiveDate: '2026-09-06',
    lastUpdated: '2026-09-06',
    enabled: true,
    summary: 'Rules and guidelines for playing MergeVerse games and using virtual items responsibly.',
    content: `### 1. Acceptance of Terms
By downloading, opening, or playing MergeVerse: The Ultimate Evolution, you agree to comply with these Terms of Service. If you do not agree, please do not use the application.

### 2. License & Gameplay Access
MergeVerse grants you a personal, non-exclusive, non-transferable, revocable license to play the games for personal, non-commercial entertainment.

### 3. Virtual Currencies & In-Game Goods
- Gold Coins, Gems, Boosters (Undo, Smash Hammer, Tile Swap), and VIP points are virtual in-game items.
- Virtual currencies have no real-world cash value and cannot be exchanged, sold, or redeemed for legal currency or tangible goods.
- Virtual currencies can be earned freely through gameplay merges, daily challenges, and optional rewarded videos.

### 4. Fair Play & Prohibited Conduct
You agree not to:
- Reverse engineer, decompile, or exploit game code.
- Use unauthorized automated scripts, bots, or memory editors to fabricate leaderboard scores or bypass gameplay loops.
- Exploit bugs or glitches to gain an unfair advantage.

### 5. Disclaimer of Warranties & Limitation of Liability
MergeVerse is provided on an "as-is" and "as-available" basis. To the maximum extent permitted by applicable law, the developers disclaim all warranties and will not be liable for any indirect or incidental damages resulting from your use of the application.`
  },
  child_safety: {
    id: 'child_safety',
    title: 'Child & Family Safety Policy',
    category: 'child_safety',
    version: '1.0.0',
    effectiveDate: '2026-08-01',
    lastUpdated: '2026-08-15',
    enabled: true,
    summary: 'Designed as a safe, family-friendly environment with zero violence, horror, or unsolicited communications.',
    content: `### 1. Family-Friendly Game Design
MergeVerse is purposefully crafted as an entertaining, educational, and safe numbers puzzle game for players of all ages.
- **Zero Violent Content**: No weapons, combat, or gore.
- **Zero Horror or Scary Themes**: Cheerful, colorful, mathematical aesthetics.
- **Zero Inappropriate Language**: Wholesome UI copy and clean visual design.

### 2. Protection of Minor Privacy
- We do not knowingly collect personal identifying information from children under applicable age thresholds.
- The game can be played fully offline without signing into any social network or third-party account.
- We do not implement open player-to-player text chat or direct messaging, preventing unsolicited adult-to-child contact.

### 3. Non-Predatory Monetization
- All gameplay modes, puzzles, and daily missions can be enjoyed and unlocked through natural puzzle progression without spending money.
- Rewarded ads are never deceptive and always require a voluntary tap by the user.`
  },
  ads: {
    id: 'ads',
    title: 'Advertising Policy',
    category: 'ads',
    version: '1.1.0',
    effectiveDate: '2026-08-01',
    lastUpdated: '2026-09-02',
    enabled: true,
    summary: 'Clear information about where ads appear, rewarded ad bonuses, and ad frequency limits.',
    content: `### 1. Why Ads Are Shown
MergeVerse is free to play. Optional advertising allows us to maintain ongoing game updates, add new mini-games (such as Number Snacks and Hexagon), and support ongoing development without charging an upfront download fee.

### 2. Types of Advertisements
- **Rewarded Videos**: Completely optional 15-30 second video ads that you choose to watch to earn bonus Gold Coins, revive after game over, or replenish Smash Hammers.
- **Interstitial Ads**: Non-intrusive full-screen cards that only appear between long gameplay transitions (e.g. after every 3-4 completed games), never during active tile moves.
- **Static Banner Ads**: Small, docked promotional banners placed away from touch buttons.

### 3. Non-Interference Guarantee
Advertisements will **never** cover active puzzle boards, swipe zones, timers, or critical navigation controls. Active gameplay is never interrupted unannounced.

### 4. No Third-Party Advertising SDKs
MergeVerse does not bundle third-party advertising SDKs (such as Google AdMob or Unity Ads). Any reward promotions or house game recommendations are handled locally by the game engine without third-party ad tracking, user profiling, or advertising identifier (AAID) collection.`
  },
  monetization: {
    id: 'monetization',
    title: 'Responsible Monetization Policy',
    category: 'monetization',
    version: '1.2.0',
    effectiveDate: '2026-09-07',
    lastUpdated: '2026-09-07',
    enabled: true,
    summary: 'Our commitment to a fair-play offline economy, zero paywalls for core gameplay, and transparent virtual items.',
    content: `### 1. Transparent Gameplay & Fair Play
MergeVerse is built on a fair-play economy:
- All core game modes (2048 Classic, Number Snacks, Hexagon, Merge Blocks) are 100% free to play.
- No gameplay mode is locked behind a mandatory paywall.
- Google Play Billing is NOT CONNECTED. All store upgrades, themes, and items use solely in-game virtual currencies.

### 2. Virtual Currencies & Fair Progression
- Gold Coins and Gems can be earned freely by playing matches, completing Daily Missions, and achieving score milestones.
- Virtual currencies have no real-world monetary value and cannot be redeemed for fiat currency or tangible goods.`
  },
  purchase_refund: {
    id: 'purchase_refund',
    title: 'Purchase & Store Policy',
    category: 'purchase_refund',
    version: '1.2.0',
    effectiveDate: '2026-09-07',
    lastUpdated: '2026-09-07',
    enabled: true,
    summary: 'Google Play Billing is not connected; no real-money transactions or subscriptions exist.',
    content: `### 1. In-App Purchases Status
Google Play Billing is **NOT CONNECTED**.
- The current release does not process real-money financial transactions, credit card payments, or digital subscriptions.
- All items in the game shop (Coin Vaults, Gem Pouches, Cosmic Themes) are simulated using virtual currencies earned through gameplay.
- No financial or payment credentials are ever requested, processed, or collected.

### 2. Virtual Currency Clarification
Virtual Gold Coins, Gems, and Cosmic Dust have no real-world cash value and cannot be exchanged for currency. For questions regarding the in-game economy, contact Nexusoft at Nexusoft.company@gmail.com.`
  },
  community: {
    id: 'community',
    title: 'Community Guidelines',
    category: 'community',
    version: '1.0.0',
    effectiveDate: '2026-08-01',
    lastUpdated: '2026-08-10',
    enabled: true,
    summary: 'Fair play, sportsmanship, and integrity standards for the MergeVerse player community.',
    content: `### 1. Respect & Integrity
MergeVerse celebrates mathematical ingenuity, quick thinking, and puzzle mastery. We ask all players to embody sportsmanship and honest competition.

### 2. Fair Play Standards
- **No Leaderboard Manipulation**: Submitting falsified scores or manipulating time-trial logs is strictly forbidden.
- **No Exploits**: If you discover an economy or duplication bug, please report it to our support team rather than sharing it maliciously.
- **No Unauthorized Distribution**: Do not distribute hacked APKs or modified packages claiming to offer free gems or coins.`
  },
  support: {
    id: 'support',
    title: 'Contact & Support',
    category: 'support',
    version: '1.0.0',
    effectiveDate: '2026-08-01',
    lastUpdated: '2026-09-01',
    enabled: true,
    summary: 'Frequently asked questions, issue reporting, and official developer contact channels.',
    content: `### Frequently Asked Questions (FAQ)

**Q: Can I play MergeVerse without internet?**
A: Yes! All core game modes, including 2048 Classic, Number Snacks, Hexagon, and Merge Blocks, are 100% playable offline.

**Q: Where is my game progress saved?**
A: Your game progress is saved locally on your device storage.

**Q: How do I earn more Gold Coins?**
A: You can earn coins by merging high numbers, completing Daily Missions, claiming your Daily Streak, and spinning the Lucky Wheel!

### Report an Issue or Feedback
If you encounter a glitch or have suggestions for new mini-games, please reach out to our team at our official support email below.`
  }
};

export const usePolicyStore = create<PolicyState>()(
  persist(
    (set) => ({
      supportConfig: {
        supportEmail: 'Nexusoft.company@gmail.com',
        privacyEmail: 'Nexusoft.company@gmail.com',
        discordUrl: '',
        faqList: [
          { question: 'Is MergeVerse free to play?', answer: 'Yes, 100% free with in-game progression and cosmetics.' },
          { question: 'Does the game work offline?', answer: 'Yes! All puzzles and player progress function fully offline.' },
          { question: 'How do I unlock new game modes?', answer: 'Play matches to level up and unlock Survival, Boss Rush, and Hexagon!' }
        ]
      },
      policies: defaultPolicies,

      updatePolicy: (id, updates) => {
        set(state => ({
          policies: {
            ...state.policies,
            [id]: {
              ...state.policies[id],
              ...updates,
              lastUpdated: new Date().toISOString().slice(0, 10)
            }
          }
        }));
      },

      updateSupportConfig: (updates) => {
        set(state => ({
          supportConfig: {
            ...state.supportConfig,
            ...updates
          }
        }));
      },

      resetPoliciesToDefault: () => {
        set({ policies: defaultPolicies });
      }
    }),
    {
      name: 'mergeverse_policies_v2',
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
