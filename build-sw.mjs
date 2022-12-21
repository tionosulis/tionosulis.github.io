// build-sw.mjs
import {generateSW} from 'workbox-build';

generateSW({
  clientsClaim: true,
  globDirectory: '_site/',
  globPatterns: [
    '**/*.{html,svg,js,ico}'
  ],
  swDest: '_site/sw.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'styles',
        cacheableResponse: {
          statuses: [0, 200] },
        expiration: {
          maxEntries: 3,
        },
      },
    },
  ],
  runtimeCaching: [
    {
      urlPattern: /\.(?:gif|jpg|png|mp4)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        cacheableResponse: {
          statuses: [0, 200] },
        expiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60,
          maxEntries: 24,
        },
      },
    },
  ],
  runtimeCaching: [
    {
      urlPattern: /\.(?:woff2|woff)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'font',
        cacheableResponse: {
          statuses: [0, 200] },
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 1,
        },
      },
    },
  ],
});
