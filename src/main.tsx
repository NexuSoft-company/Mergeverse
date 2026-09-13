import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initRemoteConfigSync } from './services/remoteConfigSync';

// Initialize real-time cloud sync for Admin Ads, Banners, and Roles (with seamless offline caching)
initRemoteConfigSync();

// Non-blocking, isolated Service Worker registration
try {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    window.self === window.top
  ) {
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        try {
          registerSW({
            onNeedRefresh() {},
            onOfflineReady() {},
          });
        } catch (e) {
          console.warn('SW register skipped:', e);
        }
      })
      .catch(() => {});
  }
} catch {
  // Graceful fallback in sandboxed iframes
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );

    // Dismiss preloader smoothly
    if (typeof (window as any).__DISMISS_PRELOADER__ === 'function') {
      requestAnimationFrame(() => {
        setTimeout(() => {
          (window as any).__DISMISS_PRELOADER__?.();
        }, 120);
      });
    }
  } catch (err) {
    console.error('Fatal mount error:', err);
    // Dismiss preloader so user sees the fallback
    (window as any).__DISMISS_PRELOADER__?.();
    rootElement.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#060614;color:#fff;font-family:sans-serif;padding:24px;text-align:center;">
        <img src="/icon.png" style="width:72px;height:72px;border-radius:18px;margin-bottom:16px;box-shadow:0 0 20px rgba(6,182,212,0.5);" onerror="this.style.display='none'" />
        <h1 style="font-size:24px;font-weight:900;margin:0 0 8px;letter-spacing:1px;color:#a5b4fc;">MergeVerse</h1>
        <p style="color:#94a3b8;font-size:14px;margin-bottom:20px;">Cosmic core ready. Tap below to launch.</p>
        <button onclick="window.location.reload()" style="background:#6366f1;color:#fff;border:none;padding:12px 24px;border-radius:12px;font-weight:bold;cursor:pointer;">Launch App</button>
      </div>
    `;
  }
}
