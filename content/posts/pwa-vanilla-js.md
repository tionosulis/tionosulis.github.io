---
title: "PWA with Vanilla JS: Why I Ditched Workbox for a 1KB Service Worker"
description: "Building a production PWA without frameworks, libraries, or build tools — and why a vanilla service worker taught me more about caching than Workbox ever did."
date: 2026-06-16
draft: false
tags: [pwa, javascript, performance, service-worker]
---

A Progressive Web App needs three things: HTTPS, a manifest, and a service worker. The first two are straightforward. The service worker — that's where opinions diverge.

The conventional wisdom says: use Workbox. It handles caching strategies, precaching, routing, and cleanup. It's Google-backed, battle-tested, and integrates with every major build tool.

I chose to write mine from scratch.

Not because Workbox is bad — it's excellent. But for a static site with a handful of pages and assets, a vanilla service worker is simpler, smaller, and more instructive. This post covers the architecture, the strategies, and the bugs I encountered along the way.

## The Architecture

My service worker (at `/sw.js`) is about 50 lines of JavaScript. It defines three caching strategies based on request type:

```javascript
const CACHE = "v2";
const FONTS = ["/fonts/", "/assets/css/"];
const ASSETS = [ /* HTML pages */ ];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  let url = new URL(e.request.url);
  if (FONTS.some((f) => url.pathname.startsWith(f))) {
    e.respondWith(cacheFirst(e.request));
  } else if (e.request.destination === "image") {
    e.respondWith(staleWhileRevalidate(e.request));
  } else {
    e.respondWith(networkFirst(e.request));
  }
});
```

Three functions, one decision tree. That's the entire service worker.

## Strategy 1: cacheFirst — Fonts and Styles

Font files and CSS never change between deploys (they're versioned by the build), so there's no reason to hit the network every time:

```javascript
async function cacheFirst(req) {
  let cached = await caches.match(req);
  if (cached) return cached;
  let res = await fetch(req);
  if (res.ok) {
    let cache = await caches.open(CACHE);
    cache.put(req, res.clone());
  }
  return res;
}
```

- Check cache → hit? return immediately
- Miss? fetch from network → cache the response → return it

This is the fastest strategy for immutable assets. The IBM Plex Sans variable font (woff2, ~120KB) loads from cache on every page after the first visit — zero network latency.

## Strategy 2: staleWhileRevalidate — Images

Images are the trickiest case. They're mostly immutable, but occasionally updated (like the SVGs in posts). And they should feel instant:

```javascript
async function staleWhileRevalidate(req) {
  let cached = await caches.match(req);
  let fetchPromise = fetch(req).then((res) => {
    if (res.ok) {
      caches.open(CACHE).then((cache) => cache.put(req, res.clone()));
    }
    return res;
  });
  return cached || fetchPromise;
}
```

This was changed from `cacheFirst` after the SVG cache bug — the topic of a [separate post](/drafts/service-worker-ate-my-svg/). With `staleWhileRevalidate`:

1. Return the cached response immediately (instant)
2. In the background, fetch the latest version
3. Update the cache for next time

The user always sees something. If the cache is stale by a few minutes, it's fine — the next visit gets the fresh version.

## Strategy 3: networkFirst — Documents

HTML pages should always show the latest content. The blog is updated via deploys, and a cached index page with missing posts is a bad experience:

```javascript
async function networkFirst(req) {
  try {
    let res = await fetch(req);
    if (res.ok) {
      let cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    let cached = await caches.match(req);
    return cached || new Response("Offline", { status: 503 });
  }
}
```

- Try the network first → success? cache + return
- Network fails (offline) → serve cached version
- No cache and offline → 503

This ensures readers always see fresh content when online, but never see a blank page when offline. The catch is the safety net.

## The Service Worker Lifecycle

Understanding the lifecycle was the hardest part. A service worker goes through three phases:

1. **Install** — fires once when the SW is first registered or updated. Precache assets here.
2. **Activate** — fires after install, once the old SW is no longer controlling clients. Clean up old caches here.
3. **Fetch** — fires on every network request from pages controlled by this SW.

The trickiest detail: **a new service worker doesn't take control until all tabs running the old SW are closed.** During development, this means a lot of `"Update on reload"` toggling in DevTools.

![Service worker caching strategies: cacheFirst for fonts/style, staleWhileRevalidate for images, networkFirst for documents](/assets/img/sw-strategy-flow.svg)

## Versioning with Cache V2

Every time the service worker script changes, the browser treats it as a new version. The `install` event fires again, and the `activate` handler cleans up old caches:

```javascript
const CACHE = "v2";

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    )
  );
});
```

When I bumped from `v1` to `v2` (after the SVG cache bug), the old cache was automatically purged. No user action needed, no stale assets lingering.

## The 1KB Payload

The minified service worker is 1,024 bytes — roughly **1/50th** of Workbox's minimum bundle. Here's what that means:

| Metric | Workbox | Vanilla |
|---|---|---|
| Bundle size | ~50KB | ~1KB |
| Parse time | ~5ms | ~0.1ms |
| Strategies | 10+ | 3 |
| Lines of code | ~1000 | ~50 |
| Learning curve | High | Low |

For a complex app with dynamic routes, Workbox's routing and precaching abstractions are invaluable. For a static blog with three asset types, the overhead isn't justified.

## The Registration Pattern

Registration is a one-liner in the `<script>` tag at the bottom of the page:

```javascript
navigator.serviceWorker &&
navigator.serviceWorker.register("/sw.js");
```

The `navigator.serviceWorker` guard ensures this doesn't throw in browsers without SW support (Safari before 11.3, some older mobile browsers). The path `/sw.js` is at the root scope, meaning it controls the entire site.

## What I Learned

- **Network-first for documents, cache-first for assets, stale-while-revalidate for images.** That's 90% of PWA caching wisdom compressed into one sentence.
- **Stale is better than nothing.** A slightly outdated cached page is infinitely better than an offline error.
- **Cache versioning is essential.** Without it, updating assets silently fails — the old cache serves them forever.
- **Workbox is for apps.** For content sites, vanilla is cleaner.
- **The biggest bug was the simplest.** The SVG cache issue happened because I chose the wrong strategy for images. It wasn't a framework bug or a browser bug — it was a logic error in a three-line function.

The full service worker code is [on GitHub](https://github.com/tionosulis/tionosulis.github.io/blob/main/content/sw.njk) if you want to see it in context. It's shorter than this post.
