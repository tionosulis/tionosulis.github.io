if(!self.define){let e,i={};const d=(d,n)=>(d=new URL(d+".js",n).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(n,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const o=e=>d(e,t),f={module:{uri:t},exports:r,require:o};i[t]=Promise.all(n.map((e=>f[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"8fae19b81c6309261f3047911100382e"},{url:"404.html",revision:"159d7bf3feb33a3e9a3da1b9e0472e97"},{url:"about/index.html",revision:"5d6c1aa76dbe75980c3ba1f427faa856"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"107f311925de046f97d5bf7d9d62cb85"},{url:"index.html",revision:"77ea536a187f18ef50879d47aeefd18d"},{url:"page-list/index.html",revision:"402eeed5abe2c87996c63e5d8180f80d"},{url:"posts/index.html",revision:"fbd5a72239b7911c6f6ece553071ad2e"},{url:"tags/eleventy/index.html",revision:"ebf2f3370424dd8c861cdde22fb5bfc8"},{url:"tags/index.html",revision:"d69e3e3fb8ac62bc21bbe7788dde1e7c"},{url:"tags/puisi/index.html",revision:"529f08970b5a4f12dab9c201a3472a01"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
