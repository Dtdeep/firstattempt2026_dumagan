const CACHE_VERSION = "v5";
const CACHE_PREFIX = "career-passport";
const APP_SHELL_CACHE = `${CACHE_PREFIX}-shell-${CACHE_VERSION}`;
const STATIC_ASSET_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${CACHE_VERSION}`;
const API_CACHE = `${CACHE_PREFIX}-api-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";

// Core pages that MUST work offline
const CRITICAL_PAGES = [
  "/",
  "/job-search",
  "/vault",
  "/application-status",
];

// Additional pages to cache if available
const OPTIONAL_PAGES = [
  "/admin-analytics",
  "/applicant-screening",
  "/careerpassport-profile",
  "/employer-dashboard",
  "/instant-application",
  "/job-details",
  "/post-career-opportunity",
  "/vault/1",
  "/vault/2",
  "/vault/3",
];

// Static assets
const STATIC_ASSETS = [
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
  console.log("[SW v5] Installing...");
  event.waitUntil(
    (async () => {
      try {
        // CRITICAL: Create offline page first (always works)
        await createInlineOfflinePage();
        console.log("[SW] ✅ Offline page created");
        
        // Cache critical resources with better error handling
        const criticalCount = await precacheCriticalResources();
        console.log(`[SW] ✅ Cached ${criticalCount} critical resources`);
        
        // Cache optional resources (failures are OK)
        const optionalCount = await precacheOptionalResources();
        console.log(`[SW] ✅ Cached ${optionalCount} optional resources`);
        
        console.log("[SW] ✅ Install complete - ready for offline use!");
      } catch (error) {
        console.error("[SW] ❌ Install failed:", error);
        // Still try to activate even if install had issues
      }
    })()
  );
  // Force immediate activation
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW v5] Activating...");
  event.waitUntil(
    (async () => {
      try {
        // Enable navigation preload for faster page loads
        if (self.registration.navigationPreload) {
          await self.registration.navigationPreload.enable();
          console.log("[SW] ✅ Navigation preload enabled");
        }

        // Clean up old caches
        const cacheNames = await caches.keys();
        const deletedCaches = await Promise.all(
          cacheNames
            .filter((cacheName) => !ACTIVE_CACHES.includes(cacheName))
            .map((cacheName) => {
              console.log("[SW] 🗑️ Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }),
        );
        
        if (deletedCaches.length > 0) {
          console.log(`[SW] ✅ Cleaned up ${deletedCaches.length} old caches`);
        }
        
        // Take control of all pages immediately
        await self.clients.claim();
        console.log("[SW] ✅ Active and controlling all pages!");
        
        // Notify all clients that SW is ready
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({ type: 'SW_ACTIVATED', version: CACHE_VERSION });
        });
      } catch (error) {
        console.error("[SW] ❌ Activation error:", error);
      }
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[SW] ⏩ Skipping waiting...");
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  // Only handle same-origin requests
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // Handle different request types
  if (isApiRequest(requestUrl)) {
    event.respondWith(networkFirst(request, API_CACHE, { timeoutMs: 5000 }));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(event));
    return;
  }

  if (isStaticAssetRequest(request, requestUrl)) {
    event.respondWith(cacheFirst(request, STATIC_ASSET_CACHE));
    return;
  }

  // Default: stale-while-revalidate for other resources
  event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
});

// Create offline page inline (always works, no fetch required)
async function createInlineOfflinePage() {
  const cache = await caches.open(APP_SHELL_CACHE);
  
  const offlineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Offline - Career Passport</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #003d82 0%, #0052ad 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container { text-align: center; max-width: 500px; }
    .icon { font-size: 5rem; margin-bottom: 1.5rem; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; font-weight: 700; }
    p { font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; opacity: 0.9; }
    button {
      background: #fff;
      color: #003d82;
      border: none;
      padding: 12px 32px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover { transform: translateY(-2px); }
    .pages { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2); }
    .pages h2 { font-size: 1.2rem; margin-bottom: 1rem; }
    .page-link {
      display: inline-block;
      background: rgba(255,255,255,0.1);
      color: #fff;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      margin: 4px;
      transition: background 0.2s;
    }
    .page-link:hover { background: rgba(255,255,255,0.2); }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">📡</div>
    <h1>You're Offline</h1>
    <p>Career Passport needs an internet connection. Please check your connection and try again.</p>
    <button onclick="window.location.reload()">Try Again</button>
    <div class="pages">
      <h2>Cached Pages</h2>
      <a href="/" class="page-link">Home</a>
      <a href="/job-search" class="page-link">Job Search</a>
      <a href="/vault" class="page-link">Vault</a>
      <a href="/application-status" class="page-link">Applications</a>
    </div>
  </div>
  <script>
    // Auto-reload when connection is restored
    window.addEventListener('online', () => {
      console.log('Connection restored, reloading...');
      window.location.reload();
    });
  </script>
</body>
</html>`;

  const response = new Response(offlineHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

  await cache.put(OFFLINE_URL, response);
}

async function precacheCriticalResources() {
  const cache = await caches.open(APP_SHELL_CACHE);
  let cached = 0;

  // Cache critical pages with robust error handling
  for (const url of CRITICAL_PAGES) {
    try {
      console.log(`[SW] Fetching critical page: ${url}`);
      const response = await fetch(url, { 
        cache: "reload",  // Force fresh fetch
        credentials: "same-origin"
      });
      
      if (response.ok) {
        await cache.put(url, response.clone());
        cached++;
        console.log(`[SW] ✅ Cached: ${url} (${response.status})`);
      } else {
        console.warn(`[SW] ⚠️ Non-OK response for ${url}: ${response.status}`);
      }
    } catch (error) {
      console.error(`[SW] ❌ Failed to cache ${url}:`, error.message);
    }
  }

  // Cache static assets
  for (const url of STATIC_ASSETS) {
    try {
      const response = await fetch(url, { cache: "reload" });
      if (response.ok || response.type === "opaque") {
        await cache.put(url, response.clone());
        cached++;
        console.log(`[SW] ✅ Cached asset: ${url}`);
      }
    } catch (error) {
      console.warn(`[SW] ⚠️ Asset ${url} not available:`, error.message);
    }
  }

  return cached;
}

async function precacheOptionalResources() {
  const cache = await caches.open(APP_SHELL_CACHE);
  let cached = 0;
  
  for (const url of OPTIONAL_PAGES) {
    try {
      const response = await fetch(url, { 
        cache: "reload",
        credentials: "same-origin"
      });
      
      if (response.ok) {
        await cache.put(url, response.clone());
        cached++;
        console.log(`[SW] ✅ Cached optional: ${url}`);
      }
    } catch (error) {
      // Optional pages failing is expected
    }
  }
  
  return cached;
}

async function handleNavigation(event) {
  const { request } = event;
  const url = new URL(request.url);
  
  console.log(`[SW] Navigation request: ${url.pathname}`);
  
  try {
    // Try preload response first (fastest)
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      console.log(`[SW] ✅ Using preload for ${url.pathname}`);
      const cache = await caches.open(PAGE_CACHE);
      await cache.put(request, preloadResponse.clone());
      return preloadResponse;
    }

    // Try network with timeout
    const networkResponse = await fetchWithTimeout(request, 3000);
    console.log(`[SW] ✅ Network response for ${url.pathname}`);
    const cache = await caches.open(PAGE_CACHE);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log(`[SW] ⚠️ Network failed for ${url.pathname}, trying cache...`);
    
    // Try exact match in page cache
    const pageCache = await caches.open(PAGE_CACHE);
    const cachedPage = await pageCache.match(request);
    if (cachedPage) {
      console.log(`[SW] ✅ Serving ${url.pathname} from page cache`);
      return cachedPage;
    }

    // Try app shell cache
    const shellCache = await caches.open(APP_SHELL_CACHE);
    const shellPage = await shellCache.match(request);
    if (shellPage) {
      console.log(`[SW] ✅ Serving ${url.pathname} from app shell`);
      return shellPage;
    }

    // For sub-routes, try serving the root page (Next.js SPA routing)
    if (url.pathname !== "/") {
      console.log(`[SW] Trying root page as fallback for ${url.pathname}`);
      const rootPage = await shellCache.match("/");
      if (rootPage) {
        console.log(`[SW] ✅ Serving root as SPA fallback`);
        return rootPage;
      }
    }

    // Show offline page as last resort
    console.log(`[SW] ⚠️ Serving offline page for ${url.pathname}`);
    const offlinePage = await shellCache.match(OFFLINE_URL);
    if (offlinePage) {
      return offlinePage;
    }

    // Absolute fallback
    console.error(`[SW] ❌ No offline page available!`);
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Offline</title></head>
        <body>
          <h1>No Internet Connection</h1>
          <p>Please check your connection and try again.</p>
          <button onclick="location.reload()">Retry</button>
        </body>
      </html>`,
      {
        status: 503,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}

function isApiRequest(url) {
  return url.pathname.startsWith("/api/");
}

function isStaticAssetRequest(request, url) {
  if (url.pathname.startsWith("/_next/static/")) {
    return true;
  }
  if (url.pathname.startsWith("/_next/image/")) {
    return true;
  }
  return ["style", "script", "font", "image"].includes(request.destination);
}

function isResponseCacheable(response) {
  if (!response) return false;
  if (!response.ok && response.type !== "opaque") return false;
  // Don't cache error responses
  if (response.status >= 400) return false;
  return true;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const networkResponse = await fetch(request);
    if (isResponseCacheable(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn(`[SW] Cache-first failed for ${request.url}`);
    return new Response("Unavailable offline", { status: 503 });
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
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      console.log(`[SW] Using cached API response for ${request.url}`);
      return cached;
    }
    return new Response(
      JSON.stringify({ error: "Offline" }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Start network request in background
  const networkPromise = fetch(request)
    .then(async (response) => {
      if (isResponseCacheable(response)) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  // Return cached version immediately if available
  if (cached) {
    return cached;
  }

  // Otherwise wait for network
  const networkResponse = await networkPromise;
  return networkResponse || new Response("Unavailable", { status: 503 });
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