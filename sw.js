if(!self.define){let e,i={};const d=(d,n)=>(d=new URL(d+".js",n).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(n,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const o=e=>d(e,t),c={module:{uri:t},exports:r,require:o};i[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"746d1cca5e31953aebedce8c1da006d1"},{url:"404.html",revision:"c663c44bfc65e74d5d3d25e1a8a885e7"},{url:"about/index.html",revision:"9fbd18733e2ef1808525300e1c80b19d"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"abb2897e522898369b0808e921c6abda"},{url:"index.html",revision:"26d6040aa01f4027bece07792eea8a3e"},{url:"page-list/index.html",revision:"12283730b90977295e0de082212b76ac"},{url:"posts/index.html",revision:"1e8c59bb24624ddb2968ace95516445a"},{url:"tags/eleventy/index.html",revision:"0a1154c31d2bc074c75d07a56cdab5ea"},{url:"tags/index.html",revision:"90c8a87bad0ed781b54ef233d204e666"},{url:"tags/puisi/index.html",revision:"322c2bd92aab64ea64cd9d007ff23923"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
