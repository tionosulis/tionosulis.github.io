if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,t)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let r={};const o=e=>n(e,d),c={module:{uri:d},exports:r,require:o};i[d]=Promise.all(s.map((e=>c[e]||o(e)))).then((e=>(t(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"ed704649ead69844e51d72527c8c6b72"},{url:"404.html",revision:"96b2e46cdfe1cf45f11067ca62d5261f"},{url:"about/index.html",revision:"c91661a56ba6d59a45ec1ff6c6233311"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"0f8e2a6906546609217e29a569f0e0e9"},{url:"index.html",revision:"70d9538f8c21dae0e6f1d5c3b6080f80"},{url:"page-list/index.html",revision:"484a3ca7cd0eefab6e91795e80eab2a5"},{url:"posts/index.html",revision:"f401a7b1a2a005d8f13ec6a5490f5971"},{url:"tags/eleventy/index.html",revision:"3293d0bdc071b23b167912fa7fc3bc22"},{url:"tags/index.html",revision:"a9277dc29eddedb6feb5c48b20ee88ac"},{url:"tags/puisi/index.html",revision:"8784f678230381cbd022357981e006c8"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
