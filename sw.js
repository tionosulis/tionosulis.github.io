if(!self.define){let e,i={};const d=(d,n)=>(d=new URL(d+".js",n).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(n,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const o=e=>d(e,t),c={module:{uri:t},exports:r,require:o};i[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"c5ad09504bbd47b057d0e445e55263aa"},{url:"404.html",revision:"7e6f6ef8809ccec5615caf63ba62a53d"},{url:"about/index.html",revision:"9669b4e8b8309697d3a11c512a0ee714"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"338c3c2c86fbcf974e5a3bbd9406007e"},{url:"index.html",revision:"dd7daf29a732252d1af79edaab26f44b"},{url:"page-list/index.html",revision:"5d3ea21812984923022b12ee14a9cdcd"},{url:"posts/index.html",revision:"684047c3ebdc00d88091b777988ae8b1"},{url:"tags/eleventy/index.html",revision:"abdbc7e7326ef946e2de2b8b10f05549"},{url:"tags/index.html",revision:"67156533c9caad49f9dcf12bad830b55"},{url:"tags/puisi/index.html",revision:"5ad6f08fd5abb8f89c0503b985c5878e"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
