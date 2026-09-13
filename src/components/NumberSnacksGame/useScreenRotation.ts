import { useState, useEffect, useCallback, useRef } from 'react';

export interface ScreenRotationState {
  isMobile: boolean;
  isPortrait: boolean;
  isNaturalLandscape: boolean;
  isVirtualLandscape: boolean;
  viewportWidth: number;
  viewportHeight: number;
  renderWidth: number;
  renderHeight: number;
  toggleVirtualRotation: () => void;
  setVirtualRotation: (enabled: boolean) => void;
  requestDeviceLandscape: () => Promise<void>;
}

export function useScreenRotation(initialAutoRotate: boolean = true): ScreenRotationState {
  const [dimensions, setDimensions] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 390;
    const h = typeof window !== 'undefined' ? window.innerHeight : 844;
    return { width: w, height: h };
  });

  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const mountedRef = useRef(true);

  // Measure window dimensions
  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth || document.documentElement.clientWidth || 390;
    const h = window.innerHeight || document.documentElement.clientHeight || 844;
    setDimensions({ width: w, height: h });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    updateDimensions();

    const onResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      mountedRef.current = false;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [updateDimensions]);

  const isPortrait = dimensions.height >= dimensions.width;
  const isNaturalLandscape = dimensions.width > dimensions.height;
  const isMobile = Math.min(dimensions.width, dimensions.height) <= 820;

  // If user hasn't explicitly overridden, on mobile portrait we auto-enable virtual landscape!
  const isVirtualLandscape = isNaturalLandscape 
    ? false 
    : (userOverride !== null ? userOverride : (initialAutoRotate && isMobile));

  // Try device orientation lock
  const requestDeviceLandscape = useCallback(async () => {
    try {
      if (typeof window === 'undefined') return;
      
      // Try fullscreen first if on mobile (often required for orientation lock)
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(() => {});
      }

      if (screen.orientation && typeof (screen.orientation as any).lock === 'function') {
        await (screen.orientation as any).lock('landscape').catch(() => {});
      } else if (typeof (window.screen as any).lockOrientation === 'function') {
        (window.screen as any).lockOrientation('landscape');
      }
    } catch {
      // Browser or iframe policy might prevent screen lock, virtual landscape handles it!
    }
  }, []);

  // Unlock orientation on unmount
  useEffect(() => {
    return () => {
      try {
        if (screen.orientation && typeof (screen.orientation as any).unlock === 'function') {
          (screen.orientation as any).unlock();
        }
      } catch {
        // Silently catch
      }
    };
  }, []);

  const toggleVirtualRotation = useCallback(() => {
    setUserOverride(prev => {
      if (prev === null) {
        return !isVirtualLandscape;
      }
      return !prev;
    });
  }, [isVirtualLandscape]);

  const setVirtualRotation = useCallback((enabled: boolean) => {
    setUserOverride(enabled);
  }, []);

  // Compute actual rendering dimensions
  const viewportWidth = dimensions.width;
  const viewportHeight = dimensions.height;
  
  // When in virtual landscape (rotated 90deg), rendering width is physical height and rendering height is physical width!
  const renderWidth = isVirtualLandscape ? viewportHeight : viewportWidth;
  const renderHeight = isVirtualLandscape ? viewportWidth : viewportHeight;

  return {
    isMobile,
    isPortrait,
    isNaturalLandscape,
    isVirtualLandscape,
    viewportWidth,
    viewportHeight,
    renderWidth,
    renderHeight,
    toggleVirtualRotation,
    setVirtualRotation,
    requestDeviceLandscape,
  };
}
