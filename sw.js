if(!self.define){let e,i={};const d=(d,n)=>(d=new URL(d+".js",n).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(n,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const o=e=>d(e,t),c={module:{uri:t},exports:r,require:o};i[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"1e666f781e50a09c94451b55b1ecc5a4"},{url:"404.html",revision:"78b205ce990c8a4edd4cbcbb46c3ab76"},{url:"about/index.html",revision:"3d78382e5d0bab287cb45981d0312817"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"7d2a7fb3bbee702291ad59dd63237e9a"},{url:"index.html",revision:"9ad0764cc776982149dba75d8e7de6d0"},{url:"page-list/index.html",revision:"f67e39162b12743148a2f554e64d6179"},{url:"posts/index.html",revision:"97cc28caf1aa6de6ec96c5159ce379d6"},{url:"tags/eleventy/index.html",revision:"e7faa4e05c032fee5b6ef54237ee8ad6"},{url:"tags/index.html",revision:"2f8572a6e0268b60ce47dd3659040bd0"},{url:"tags/puisi/index.html",revision:"b7a384c70ab0ea0a67e256babf584d89"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
