if(!self.define){let e,i={};const n=(n,d)=>(n=new URL(n+".js",d).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(d,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const c=e=>n(e,t),o={module:{uri:t},exports:r,require:c};i[t]=Promise.all(d.map((e=>o[e]||c(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"e832ff51c54ebf590c19f866af6b7dcf"},{url:"404.html",revision:"7aedafc15c9f8aab1877698e74fd7d8b"},{url:"about/index.html",revision:"4abd725c18a851ec3f71e9d27b4d9c1b"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"8d988ee41059d7ed94bfad0827ab2ae3"},{url:"index.html",revision:"9d55ae2045302507c7890bc3859b31ca"},{url:"page-list/index.html",revision:"b1df3adb147eb2c115ccfa482bf12980"},{url:"posts/index.html",revision:"485ecbd6de499acfaa93e6f1af5c3f79"},{url:"tags/eleventy/index.html",revision:"26f3181ad8d596ae89f9e2b5e92ac59e"},{url:"tags/index.html",revision:"a434b4c7b22db2367ccede5aed92294a"},{url:"tags/puisi/index.html",revision:"e38f44e9ca27089a4401ac5ebe101977"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
