// KEY FILE: Client-side service worker registration + update prompt flow.
"use client";

import { useEffect, useState } from "react";
import { registerServiceWorker } from "./lib/serviceWorkerRegistration";

export default function ServiceWorkerRegistrar() {
  const [isOnline, setIsOnline] = useState(true);
  const [swStatus, setSwStatus] = useState<'idle' | 'registered' | 'updated'>('idle');

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.log("Service Workers not supported");
      return;
    }

    let hasRefreshed = false;

    // Track online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      console.log("🌐 Connection restored");
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log("📡 Connection lost - offline mode active");
    };

    const handleControllerChange = () => {
      if (hasRefreshed) {
        return;
      }

      hasRefreshed = true;
      console.log("🔄 Service Worker controller changed, reloading...");
      window.location.reload();
    };

    // Listen for SW messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SW_ACTIVATED') {
        console.log(`✅ Service Worker activated (${event.data.version})`);
        setSwStatus('registered');
      }
    };

    // Register listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Check initial online status
    setIsOnline(navigator.onLine);

    // Register the service worker
    void registerServiceWorker({
      onSuccess: (registration) => {
        console.log("✅ Service Worker registered successfully");
        console.log("📦 Scope:", registration.scope);
        setSwStatus('registered');
        
        // Check for updates periodically (every 60 seconds)
        setInterval(() => {
          registration.update().catch((err) => {
            console.warn("Update check failed:", err);
          });
        }, 60000);
      },
      onUpdate: (registration) => {
        console.log("🆕 New version available!");
        setSwStatus('updated');
        
        const shouldUpdate = window.confirm(
          "A new version of Career Passport is available. Update now?",
        );

        if (shouldUpdate && registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      },
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  // Optional: Show offline indicator (you can style this)
  if (typeof window !== 'undefined' && !isOnline) {
    // You can return a notification component here if you want
    // For now, just log to console
    console.log("📡 OFFLINE MODE ACTIVE");
  }

  return null;
}
