if(!self.define){let e,i={};const n=(n,d)=>(n=new URL(n+".js",d).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(d,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const o=e=>n(e,t),l={module:{uri:t},exports:r,require:o};i[t]=Promise.all(d.map((e=>l[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"8594ebb622c59ce541958a48fe329c11"},{url:"404.html",revision:"aeac93f7dcd35dbf1669b00b63a11cd5"},{url:"about/index.html",revision:"51e8cb841577bd13bffbd1f9e42e8968"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"8e27876ee37b70f31a6a5a8c498e7ef8"},{url:"index.html",revision:"b5eb23b13584547dbf65fdb1b11ec317"},{url:"page-list/index.html",revision:"dc866366a39b970b34a47c23fe713248"},{url:"posts/index.html",revision:"ef7e4459d9db5d1dee308967056ab906"},{url:"tags/eleventy/index.html",revision:"2f42037f6ee38334adc6c4ecc7d733ae"},{url:"tags/index.html",revision:"94477f3a35d9729fa0d75ef4a0178b7f"},{url:"tags/puisi/index.html",revision:"238457dd2c20f86d3b7296f72c03c13a"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
