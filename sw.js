if(!self.define){let e,i={};const d=(d,c)=>(d=new URL(d+".js",c).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(c,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let t={};const r=e=>d(e,s),o={module:{uri:s},exports:t,require:r};i[s]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"4cdf3ade8b9cddf33bccd22a9f3cc9d8"},{url:"404.html",revision:"b28c542cc251467638ddcb4d872f19d7"},{url:"about/index.html",revision:"c06f10bdb46b3020a2ef1674c53b4730"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"2d894b2aaa13ba2bb6d227c50b0ed2ca"},{url:"index.html",revision:"dcdad80663341002149f3129dce520cb"},{url:"page-list/index.html",revision:"fe15a1871bcc32b3d9373e4914f94222"},{url:"posts/index.html",revision:"a840e29b966ac0af01dccecd14734694"},{url:"tags/eleventy/index.html",revision:"a37bbcf59c8744aac16d01b03b2045be"},{url:"tags/index.html",revision:"ee8f6638382e4f98a087d468bbfe1acc"},{url:"tags/puisi/index.html",revision:"41aacf3d74d53dda80478db396636856"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
