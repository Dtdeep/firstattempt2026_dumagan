// KEY FILE: Shared helper that registers /sw.js in production safely.
export interface RegisterServiceWorkerOptions {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

function notifyUpdateAvailable(registration: ServiceWorkerRegistration): void {
  window.dispatchEvent(
    new CustomEvent("sw-update-available", {
      detail: { scope: registration.scope },
    }),
  );
}

function observeWorkerUpdates(
  registration: ServiceWorkerRegistration,
  onUpdate?: (registration: ServiceWorkerRegistration) => void,
): void {
  let hasNotified = false;

  const emitUpdate = () => {
    if (hasNotified) {
      return;
    }

    hasNotified = true;
    notifyUpdateAvailable(registration);
    onUpdate?.(registration);
  };

  if (registration.waiting) {
    emitUpdate();
  }

  registration.addEventListener("updatefound", () => {
    const installingWorker = registration.installing;

    if (!installingWorker) {
      return;
    }

    installingWorker.addEventListener("statechange", () => {
      if (
        installingWorker.state === "installed" &&
        navigator.serviceWorker.controller
      ) {
        emitUpdate();
      }
    });
  });
}

export async function registerServiceWorker(
  options: RegisterServiceWorkerOptions = {},
): Promise<ServiceWorkerRegistration | null> {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });

    observeWorkerUpdates(registration, options.onUpdate);
    options.onSuccess?.(registration);
    return registration;
  } catch (error) {
    console.error("Service worker registration failed:", error);
    return null;
  }
}
