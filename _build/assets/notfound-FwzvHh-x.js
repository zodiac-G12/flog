import{I as c,O as f,T as v,U as h,V as d,a as g,W as l,Q as m,x as C}from"./routing-BNXdxvEY.js";var L=C("<a>");function P(t){t=c({inactiveClass:"inactive",activeClass:"active"},t);const[,i]=f(t,["href","state","class","activeClass","inactiveClass","end"]),r=v(()=>t.href),o=h(r),u=d(),n=g(()=>{const e=r();if(e===void 0)return[!1,!1];const s=l(e.split(/[?#]/,1)[0]).toLowerCase(),a=l(u.pathname).toLowerCase();return[t.end?s===a:a.startsWith(s+"/")||a===s,s===a]});return(()=>{var e=L();return m(e,c(i,{get href(){return o()||t.href},get state(){return JSON.stringify(t.state)},get classList(){return{...t.class&&{[t.class]:!0},[t.inactiveClass]:!n()[0],[t.activeClass]:n()[0],...i.classList}},link:"",get"aria-current"(){return n()[1]?"page":void 0}}),!1,!1),e})()}const N="/_build/assets/notfound-Btvcus_u.jpg";export{P as A,N};
