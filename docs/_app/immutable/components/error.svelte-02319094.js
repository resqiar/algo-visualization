import{S as E,i as S,s as q,k as b,q as f,a as x,l as _,m as d,r as g,h as p,c as H,b as l,G as h,u as v,B as $,H as k}from"../chunks/index-91e70326.js";import{s as y}from"../chunks/singletons-e85e7ffc.js";const B=()=>{const s=y;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},C={subscribe(s){return B().page.subscribe(s)}};function G(s){let t,r=s[0].status+"",o,n,i,c=s[0].error?.message+"",u;return{c(){t=b("h1"),o=f(r),n=x(),i=b("p"),u=f(c)},l(e){t=_(e,"H1",{});var a=d(t);o=g(a,r),a.forEach(p),n=H(e),i=_(e,"P",{});var m=d(i);u=g(m,c),m.forEach(p)},m(e,a){l(e,t,a),h(t,o),l(e,n,a),l(e,i,a),h(i,u)},p(e,[a]){a&1&&r!==(r=e[0].status+"")&&v(o,r),a&1&&c!==(c=e[0].error?.message+"")&&v(u,c)},i:$,o:$,d(e){e&&p(t),e&&p(n),e&&p(i)}}}function P(s,t,r){let o;return k(s,C,n=>r(0,o=n)),[o]}let z=class extends E{constructor(t){super(),S(this,t,P,G,q,{})}};export{z as default};