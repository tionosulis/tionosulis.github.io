import {generateSW} from 'workbox-build';

generateSW({
  globDirectory: '_site/',
  globPatterns: [
    '**/*.{css,woff2,png,svg,jpg,ico,js}'
  ],
  swDest: '_site/sw.js'
});