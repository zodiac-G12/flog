import{y as a,e as i,x as n,v as m,w as f}from"./routing-BBaV_6Yn.js";import{A as u,f as d}from"./articles-BLMSBe2u.js";import"./app-DeBYcT-H.js";import{A as x,N as g}from"./notfound-BBuKu5C9.js";var o=n('<div class="flex flex-wrap justify-center items-center gap-10 px-10">');const C=()=>(()=>{var t=o();return a(t,()=>u.map(e=>i(A,e))),t})();var v=n('<div class="flex justify-center items-center py-1 w-[276px] h-[200px] bg-black"><img width=276 height=192>'),p=n('<div class="flex flex-wrap flex-col justify-between items-center h-[60px] py-1"><p class="w-[276px] text-lg font-bold truncate"></p><p class=text-sm>');const y=t=>(()=>{var e=v(),l=e.firstChild;return m(r=>{var s=t.img??g,c=t.title;return s!==r.e&&f(l,"src",r.e=s),c!==r.t&&f(l,"alt",r.t=c),r},{e:void 0,t:void 0}),e})(),h=t=>(()=>{var e=p(),l=e.firstChild,r=l.nextSibling;return a(l,()=>t.title),a(r,()=>d(t.date,"yyyy年MM月dd日 公開")),e})(),A=t=>i(x,{get href(){return`/articles/${t.id}`},class:"rounded-lg text-gray-100 bg-[#fff6ef]/[0.3] w-[300px] h-[268px] px-3 py-2",get children(){return[i(y,{get title(){return t.title},get img(){return t.img}}),i(h,{get title(){return t.title},get date(){return t.date}})]}});export{C as A};
