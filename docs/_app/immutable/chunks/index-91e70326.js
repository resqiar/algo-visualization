function S(){}function ct(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function W(){return Object.create(null)}function v(t){t.forEach(Q)}function U(t){return typeof t=="function"}function Nt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let T;function Tt(t,e){return T||(T=document.createElement("a")),T.href=e,t===T.href}function lt(t){return Object.keys(t).length===0}function ot(t,...e){if(t==null)return S;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function kt(t,e,n){t.$$.on_destroy.push(ot(e,n))}function At(t,e,n,i){if(t){const s=V(t,e,n,i);return t[0](s)}}function V(t,e,n,i){return t[1]&&i?ct(n.ctx.slice(),t[1](i(e))):n.ctx}function St(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)l[o]=e.dirty[o]|s[o];return l}return e.dirty|s}return e.dirty}function Mt(t,e,n,i,s,l){if(s){const r=V(e,n,i,l);t.p(r,s)}}function Ct(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Ht(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function jt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Dt(t){return t??""}let C=!1;function ut(){C=!0}function at(){C=!1}function ft(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function _t(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,f=(s>0&&e[n[s]].claim_order<=u?s+1:ft(1,s,_=>e[n[_]].claim_order,u))-1;i[c]=n[f]+1;const d=f+1;n[d]=c,s=Math.max(d,s)}const l=[],r=[];let o=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);o>=c;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);l.reverse(),r.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<r.length;c++){for(;u<l.length&&r[c].claim_order>=l[u].claim_order;)u++;const f=u<l.length?l[u]:null;t.insertBefore(r[c],f)}}function dt(t,e){if(C){for(_t(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function ht(t,e,n){t.insertBefore(e,n||null)}function mt(t,e,n){C&&!n?dt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function M(t){t.parentNode&&t.parentNode.removeChild(t)}function Lt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function X(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function R(t){return document.createTextNode(t)}function Ot(){return R(" ")}function Pt(){return R("")}function Bt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function pt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function qt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:pt(t,i,e[i])}function Gt(t){return t===""?null:+t}function yt(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function tt(t,e,n,i,s=!1){Z(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function et(t,e,n,i){return tt(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||l.push(o.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Rt(t,e,n){return et(t,e,n,X)}function zt(t,e,n){return et(t,e,n,Y)}function gt(t,e){return tt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>R(e),!0)}function Ft(t){return gt(t," ")}function I(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Wt(t,e){const n=I(t,"HTML_TAG_START",0),i=I(t,"HTML_TAG_END",n);if(n===i)return new J(void 0,e);Z(t);const s=t.splice(n,i-n+1);M(s[0]),M(s[s.length-1]);const l=s.slice(1,s.length-1);for(const r of l)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new J(l,e)}function It(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Jt(t,e){t.value=e??""}function Kt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Qt(t,e,n){t.classList[n?"add":"remove"](e)}function xt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Ut(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const l=s.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(s)):l===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class $t{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=Y(n.nodeName):this.e=X(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)ht(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(M)}}class J extends $t{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)mt(this.t,this.n[n],e)}}function Vt(t,e){return new t(e)}let w;function b(t){w=t}function H(){if(!w)throw new Error("Function called outside component initialization");return w}function Xt(t){H().$$.on_mount.push(t)}function Yt(t){H().$$.after_update.push(t)}function Zt(t){H().$$.on_destroy.push(t)}function te(){const t=H();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const l=xt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,l)}),!l.defaultPrevented}return!0}}function ee(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const $=[],K=[],k=[],B=[],nt=Promise.resolve();let q=!1;function it(){q||(q=!0,nt.then(st))}function ne(){return it(),nt}function G(t){k.push(t)}function ie(t){B.push(t)}const P=new Set;let x=0;function st(){if(x!==0)return;const t=w;do{try{for(;x<$.length;){const e=$[x];x++,b(e),bt(e.$$)}}catch(e){throw $.length=0,x=0,e}for(b(null),$.length=0,x=0;K.length;)K.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];P.has(n)||(P.add(n),n())}k.length=0}while($.length);for(;B.length;)B.pop()();q=!1,P.clear(),b(t)}function bt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}const A=new Set;let g;function se(){g={r:0,c:[],p:g}}function re(){g.r||v(g.c),g=g.p}function rt(t,e){t&&t.i&&(A.delete(t),t.i(e))}function ce(t,e,n,i){if(t&&t.o){if(A.has(t))return;A.add(t),g.c.push(()=>{A.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function le(t,e){t.d(1),e.delete(t.key)}function oe(t,e,n,i,s,l,r,o,c,u,f,d){let _=t.length,m=l.length,h=_;const j={};for(;h--;)j[t[h].key]=h;const E=[],D=new Map,L=new Map;for(h=m;h--;){const a=d(s,l,h),p=n(a);let y=r.get(p);y?i&&y.p(a,e):(y=u(p,a),y.c()),D.set(p,E[h]=y),p in j&&L.set(p,Math.abs(h-j[p]))}const z=new Set,F=new Set;function O(a){rt(a,1),a.m(o,f),r.set(a.key,a),f=a.first,m--}for(;_&&m;){const a=E[m-1],p=t[_-1],y=a.key,N=p.key;a===p?(f=a.first,_--,m--):D.has(N)?!r.has(y)||z.has(y)?O(a):F.has(N)?_--:L.get(y)>L.get(N)?(F.add(y),O(a)):(z.add(N),_--):(c(p,r),_--)}for(;_--;){const a=t[_];D.has(a.key)||c(a,r)}for(;m;)O(E[m-1]);return E}function ue(t,e){const n={},i={},s={$$scope:1};let l=t.length;for(;l--;){const r=t[l],o=e[l];if(o){for(const c in r)c in o||(i[c]=1);for(const c in o)s[c]||(n[c]=o[c],s[c]=1);t[l]=o}else for(const c in r)s[c]=1}for(const r in i)r in n||(n[r]=void 0);return n}function ae(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function fe(t){t&&t.c()}function _e(t,e){t&&t.l(e)}function wt(t,e,n,i){const{fragment:s,after_update:l}=t.$$;s&&s.m(e,n),i||G(()=>{const r=t.$$.on_mount.map(Q).filter(U);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),l.forEach(G)}function vt(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Et(t,e){t.$$.dirty[0]===-1&&($.push(t),it(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function de(t,e,n,i,s,l,r,o=[-1]){const c=w;b(t);const u=t.$$={fragment:null,ctx:[],props:l,update:S,not_equal:s,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:W(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};r&&r(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(d,_,...m)=>{const h=m.length?m[0]:_;return u.ctx&&s(u.ctx[d],u.ctx[d]=h)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](h),f&&Et(t,d)),_}):[],u.update(),f=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){ut();const d=yt(e.target);u.fragment&&u.fragment.l(d),d.forEach(M)}else u.fragment&&u.fragment.c();e.intro&&rt(t.$$.fragment),wt(t,e.target,e.anchor,e.customElement),at(),st()}b(c)}class he{$destroy(){vt(this,1),this.$destroy=S}$on(e,n){if(!U(n))return S;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!lt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ie as $,ne as A,S as B,At as C,Mt as D,Ct as E,St as F,dt as G,kt as H,jt as I,te as J,ct as K,Ht as L,qt as M,Qt as N,ue as O,J as P,Wt as Q,Jt as R,he as S,Bt as T,Gt as U,v as V,ee as W,K as X,Tt as Y,ae as Z,Ut as _,Ot as a,Zt as a0,Y as a1,zt as a2,Lt as a3,Dt as a4,oe as a5,le as a6,mt as b,Ft as c,re as d,Pt as e,rt as f,se as g,M as h,de as i,Yt as j,X as k,Rt as l,yt as m,pt as n,Xt as o,Kt as p,R as q,gt as r,Nt as s,ce as t,It as u,Vt as v,fe as w,_e as x,wt as y,vt as z};