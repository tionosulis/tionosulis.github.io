if(!self.define){let e,i={};const n=(n,d)=>(n=new URL(n+".js",d).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(d,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let f={};const r=e=>n(e,t),o={module:{uri:t},exports:f,require:r};i[t]=Promise.all(d.map((e=>o[e]||r(e)))).then((e=>(s(...e),f)))}}define(["./workbox-a498a509"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"2022/index.html",revision:"712316a655d80b07c9a5c71ae0c6fdcc"},{url:"404.html",revision:"a3df16efe7abf8aaedf43e91769285fd"},{url:"about/index.html",revision:"0cd64180443c87af85841f35541b5767"},{url:"favicon.ico",revision:"d41fc98d0d79678b0d7dd56421b4bf9c"},{url:"hello-world/index.html",revision:"1b7abd482fdc45ff6da95b4632b1a190"},{url:"index.html",revision:"7441337ccf66ba7d0dbaae57b729ec2f"},{url:"page-list/index.html",revision:"7be4e94237f858c3e729b402f408d614"},{url:"posts/index.html",revision:"f6680edd5062aa74afed2292ab2e6951"},{url:"tags/eleventy/index.html",revision:"70c34440b7d7e5564e40bc4c1159bef0"},{url:"tags/index.html",revision:"60730b65fa48e012e7142ddfe4c2ff28"},{url:"tags/puisi/index.html",revision:"ef05499ad981b44f46a5f85b96a1a4d9"}],{}),e.registerRoute(/\.(?:woff2|woff)$/,new e.CacheFirst({cacheName:"font",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:1})]}),"GET")}));
//# sourceMappingURL=sw.js.map
