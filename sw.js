if(!self.define){let e,i={};const c=(c,n)=>(c=new URL(c+".js",n).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let f={};const r=e=>c(e,t),o={module:{uri:t},exports:f,require:r};i[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(s(...e),f)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"e0e94f6264caffcd4c7aa94f7c282f23"},{url:"404.html",revision:"71f033e7b09b330a826c5d61b1c1a3a1"},{url:"about/index.html",revision:"14cb607bf2f1cbf2637964ae61377177"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"5ada4f6a4fcfb40a282029cba7df0e05"},{url:"index.html",revision:"45ef0092ab2acf187c5a8d3ef33db42d"},{url:"page-list/index.html",revision:"101d2ebcc0301d11885e3faf23b16e35"},{url:"posts/index.html",revision:"8602e61c6654ccbf77c042d87f9279ac"},{url:"tags/eleventy/index.html",revision:"d61160381ab134a3456df5c972cf2c6d"},{url:"tags/index.html",revision:"89c7f69115d043bc5989855cc19ecc7f"},{url:"tags/puisi/index.html",revision:"9553800ce85b1ff296ceb3be319b5da1"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
