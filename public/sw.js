const CACHE_VERSION = "v3";
const CACHE_PREFIX = "career-passport";
const APP_SHELL_CACHE = `${CACHE_PREFIX}-shell-${CACHE_VERSION}`;
const STATIC_ASSET_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${CACHE_VERSION}`;
const API_CACHE = `${CACHE_PREFIX}-api-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";

const APP_SHELL_URLS = [
  "/",
  "/admin-analytics",
  "/applicant-screening",
  "/application-status",
  "/careerpassport-profile",
  "/employer-dashboard",
  "/instant-application",
  "/job-details",
  "/job-search",
  "/post-career-opportunity",
  "/vault",
  "/vault/1",
  "/vault/2",
  "/vault/3",
  OFFLINE_URL,
  "/manifest.json",
  "/hero-bg.jpeg",
  "/icons/career-passport-icon.svg",
  "/icons/career-passport-maskable.svg",
  "/globe.svg",
  "/file.svg",
  "/next.svg",
  "/vercel.svg",
  "/window.svg",
];

const ACTIVE_CACHES = [
  APP_SHELL_CACHE,
  STATIC_ASSET_CACHE,
  PAGE_CACHE,
  API_CACHE,
];

self.addEventListener("install", (event) => {
  event.waitUntil(precacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => !ACTIVE_CACHES.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (isApiRequest(requestUrl)) {
    event.respondWith(networkFirst(request, API_CACHE, { timeoutMs: 5000 }));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidatePage(event));
    return;
  }

  if (isStaticAssetRequest(request, requestUrl)) {
    event.respondWith(cacheFirst(request, STATIC_ASSET_CACHE));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
});

async function precacheAppShell() {
  const cache = await caches.open(APP_SHELL_CACHE);

  await Promise.all(
    APP_SHELL_URLS.map(async (url) => {
      try {
        const response = await fetch(url, { cache: "no-cache" });

        if (response.ok || response.type === "opaque") {
          await cache.put(url, response.clone());
        }
      } catch {
        // A single failing asset should not abort service worker installation.
      }
    }),
  );
}

function isApiRequest(url) {
  return url.pathname.startsWith("/api/");
}

function isStaticAssetRequest(request, url) {
  if (url.pathname.startsWith("/_next/static/")) {
    return true;
  }

  return ["style", "script", "font", "image"].includes(request.destination);
}

function isResponseCacheable(response) {
  if (!response) {
    return false;
  }

  return response.ok || response.type === "opaque";
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (isResponseCacheable(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    return request.mode === "navigate"
      ? getOfflineFallbackResponse()
      : buildOfflineResponse();
  }
}

async function networkFirst(request, cacheName, options = {}) {
  const { timeoutMs = 5000 } = options;
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetchWithTimeout(request, timeoutMs);

    if (isResponseCacheable(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return buildOfflineResponse();
  }
}

async function staleWhileRevalidatePage(event) {
  const { request } = event;
  const cache = await caches.open(PAGE_CACHE);
  const cachedResponse = await cache.match(request);

  const networkUpdate = (async () => {
    const preloadResponse = await event.preloadResponse;
    const networkResponse = preloadResponse || (await fetch(request));

    if (isResponseCacheable(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  })();

  if (cachedResponse) {
    event.waitUntil(networkUpdate.catch(() => undefined));
    return cachedResponse;
  }

  try {
    return await networkUpdate;
  } catch {
    const shellResponse = await caches.match("/");
    if (shellResponse) {
      return shellResponse;
    }

    return getOfflineFallbackResponse();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const networkPromise = fetch(request)
    .then(async (networkResponse) => {
      if (isResponseCacheable(networkResponse)) {
        await cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    })
    .catch(() => null);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await networkPromise;
  return networkResponse || buildOfflineResponse();
}

async function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getOfflineFallbackResponse() {
  const cachedOfflinePage = await caches.match(OFFLINE_URL);

  if (cachedOfflinePage) {
    return cachedOfflinePage;
  }

  return new Response(
    "<h1>You are offline</h1><p>Career Passport is unavailable right now.</p>",
    {
      status: 503,
      statusText: "Service Unavailable",
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}

function buildOfflineResponse() {
  return new Response("You appear to be offline.", {
    status: 503,
    statusText: "Service Unavailable",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}