const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CQb5ssUU.js","assets/routing-BNXdxvEY.js","assets/articles-BZH6Q2PY.js","assets/articles-D4TxVWIQ.js","assets/notfound-FwzvHh-x.js","assets/_id_-d0TalwYm.js","assets/article-DE0PZfXP.js","assets/prism-D25Z1YQW.js","assets/_...404_-Bqafyv0R.js"])))=>i.map(i=>d[i]);
import{D as s}from"./routing-BNXdxvEY.js";const h="modulepreload",E=function(l){return"/_build/"+l},u={},i=function(m,c,f){let a=Promise.resolve();if(c&&c.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),n=r?.nonce||r?.getAttribute("nonce");a=Promise.all(c.map(e=>{if(e=E(e),e in u)return;u[e]=!0;const o=e.endsWith(".css"),d=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${d}`))return;const t=document.createElement("link");if(t.rel=o?"stylesheet":h,o||(t.as="script",t.crossOrigin=""),t.href=e,n&&t.setAttribute("nonce",n),document.head.appendChild(t),o)return new Promise((p,_)=>{t.addEventListener("load",p),t.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${e}`)))})}))}return a.then(()=>m()).catch(r=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r})},y=[{path:"/",component:s(()=>i(()=>import("./index-CQb5ssUU.js"),__vite__mapDeps([0,1,2,3,4])))},{path:"/articles",children:[{path:"/:id",component:s(()=>i(()=>import("./_id_-d0TalwYm.js"),__vite__mapDeps([5,1,6,7,3,4])))}]},{path:"*",component:s(()=>i(()=>import("./_...404_-Bqafyv0R.js"),__vite__mapDeps([8,1,4])))}];export{y as R};
