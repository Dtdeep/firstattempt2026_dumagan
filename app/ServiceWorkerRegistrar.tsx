// KEY FILE: Client-side service worker registration + update prompt flow.
"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "./lib/serviceWorkerRegistration";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let hasRefreshed = false;

    const handleControllerChange = () => {
      if (hasRefreshed) {
        return;
      }

      hasRefreshed = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    void registerServiceWorker({
      onUpdate: (registration) => {
        const shouldUpdate = window.confirm(
          "A new version of Career Passport is available. Update now?",
        );

        if (shouldUpdate && registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      },
    });

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
    };
  }, []);

  return null;
}
