// build-sw.mjs
import {generateSW} from 'workbox-build';

generateSW({
  globDirectory: '_site/',
  globPatterns: [
    '**/*.{html,css,woff2,png,svg,jpg,js,ico}'
  ],
  swDest: '_site/sw.js'
});
