if(!self.define){let e,i={};const d=(d,n)=>(d=new URL(d+".js",n).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(n,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const o=e=>d(e,t),c={module:{uri:t},exports:r,require:o};i[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"d41d966ff47bc05802567490c2c7a256"},{url:"404.html",revision:"b71a9d928b69442d6a6e7df15da079a3"},{url:"about/index.html",revision:"4236949dfc82864cca9a46ac86ea63d2"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"27df9de8017e2700bc377df722bdcfd4"},{url:"index.html",revision:"51afc146d436e83e60d96db81a1e3293"},{url:"page-list/index.html",revision:"839b36385ded93bc4703b7a43cafb04a"},{url:"posts/index.html",revision:"30ba0f9502da2e4d571f315122897627"},{url:"tags/eleventy/index.html",revision:"8141fbc3fa0b83f12bab5552bf0f5cb0"},{url:"tags/index.html",revision:"c24f2e0b22210ec99db520d556f84444"},{url:"tags/puisi/index.html",revision:"6cc66a6eaa9a6f485328ca9951dc6ab5"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
