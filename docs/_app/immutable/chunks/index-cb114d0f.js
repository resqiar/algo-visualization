function J(){}function st(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function F(){return Object.create(null)}function b(t){t.forEach(K)}function ct(t){return typeof t=="function"}function vt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function rt(t){return Object.keys(t).length===0}function Et(t,e,n,i){if(t){const s=Q(t,e,n,i);return t[0](s)}}function Q(t,e,n,i){return t[1]&&i?st(n.ctx.slice(),t[1](i(e))):n.ctx}function kt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const o=[],c=Math.max(e.dirty.length,s.length);for(let l=0;l<c;l+=1)o[l]=e.dirty[l]|s[l];return o}return e.dirty|s}return e.dirty}function At(t,e,n,i,s,o){if(s){const c=Q(e,n,i,o);t.p(c,s)}}function Tt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Nt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function St(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}let M=!1;function lt(){M=!0}function ot(){M=!1}function at(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function ut(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&r.push(f)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let r=0;r<e.length;r++){const a=e[r].claim_order,f=(s>0&&e[n[s]].claim_order<=a?s+1:at(1,s,_=>e[n[_]].claim_order,a))-1;i[r]=n[f]+1;const d=f+1;n[d]=r,s=Math.max(d,s)}const o=[],c=[];let l=e.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(o.push(e[r-1]);l>=r;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);o.reverse(),c.sort((r,a)=>r.claim_order-a.claim_order);for(let r=0,a=0;r<c.length;r++){for(;a<o.length&&c[r].claim_order>=o[a].claim_order;)a++;const f=a<o.length?o[a]:null;t.insertBefore(c[r],f)}}function ft(t,e){if(M){for(ut(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function _t(t,e,n){t.insertBefore(e,n||null)}function dt(t,e,n){M&&!n?ft(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function S(t){t.parentNode.removeChild(t)}function Mt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function U(t){return document.createElement(t)}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function q(t){return document.createTextNode(t)}function jt(){return q(" ")}function Ct(){return q("")}function Ht(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Lt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:ht(t,i,e[i])}function Dt(t){return t===""?null:+t}function mt(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Y(t,e,n,i,s=!1){X(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const r=n(l);return r===void 0?t.splice(c,1):t[c]=r,s||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const r=n(l);return r===void 0?t.splice(c,1):t[c]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Z(t,e,n,i){return Y(t,s=>s.nodeName===e,s=>{const o=[];for(let c=0;c<s.attributes.length;c++){const l=s.attributes[c];n[l.name]||o.push(l.name)}o.forEach(c=>s.removeAttribute(c))},()=>i(e))}function Ot(t,e,n){return Z(t,e,n,U)}function Pt(t,e,n){return Z(t,e,n,V)}function pt(t,e){return Y(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>q(e),!0)}function Bt(t){return pt(t," ")}function I(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function qt(t,e){const n=I(t,"HTML_TAG_START",0),i=I(t,"HTML_TAG_END",n);if(n===i)return new R(void 0,e);X(t);const s=t.splice(n,i-n+1);S(s[0]),S(s[s.length-1]);const o=s.slice(1,s.length-1);for(const c of o)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new R(o,e)}function Gt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function zt(t,e){t.value=e??""}function Ft(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function It(t,e,n){t.classList[n?"add":"remove"](e)}function yt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Rt(t,e=document.body){return Array.from(e.querySelectorAll(t))}class gt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=V(n.nodeName):this.e=U(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)_t(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(S)}}class R extends gt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)dt(this.t,this.n[n],e)}}let $;function w(t){$=t}function v(){if(!$)throw new Error("Function called outside component initialization");return $}function Wt(t){v().$$.on_mount.push(t)}function Jt(t){v().$$.after_update.push(t)}function Kt(t){v().$$.on_destroy.push(t)}function Qt(){const t=v();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const o=yt(e,n,{cancelable:i});return s.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function Ut(t,e){return v().$$.context.set(t,e),e}function Vt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const x=[],W=[],T=[],O=[],tt=Promise.resolve();let P=!1;function et(){P||(P=!0,tt.then(nt))}function Xt(){return et(),tt}function B(t){T.push(t)}function Yt(t){O.push(t)}const D=new Set;let A=0;function nt(){const t=$;do{for(;A<x.length;){const e=x[A];A++,w(e),xt(e.$$)}for(w(null),x.length=0,A=0;W.length;)W.pop()();for(let e=0;e<T.length;e+=1){const n=T[e];D.has(n)||(D.add(n),n())}T.length=0}while(x.length);for(;O.length;)O.pop()();P=!1,D.clear(),w(t)}function xt(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const N=new Set;let g;function Zt(){g={r:0,c:[],p:g}}function te(){g.r||b(g.c),g=g.p}function it(t,e){t&&t.i&&(N.delete(t),t.i(e))}function ee(t,e,n,i){if(t&&t.o){if(N.has(t))return;N.add(t),g.c.push(()=>{N.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function ne(t,e){t.d(1),e.delete(t.key)}function ie(t,e,n,i,s,o,c,l,r,a,f,d){let _=t.length,m=o.length,h=_;const j={};for(;h--;)j[t[h].key]=h;const E=[],C=new Map,H=new Map;for(h=m;h--;){const u=d(s,o,h),p=n(u);let y=c.get(p);y?i&&y.p(u,e):(y=a(p,u),y.c()),C.set(p,E[h]=y),p in j&&H.set(p,Math.abs(h-j[p]))}const G=new Set,z=new Set;function L(u){it(u,1),u.m(l,f),c.set(u.key,u),f=u.first,m--}for(;_&&m;){const u=E[m-1],p=t[_-1],y=u.key,k=p.key;u===p?(f=u.first,_--,m--):C.has(k)?!c.has(y)||G.has(y)?L(u):z.has(k)?_--:H.get(y)>H.get(k)?(z.add(y),L(u)):(G.add(k),_--):(r(p,c),_--)}for(;_--;){const u=t[_];C.has(u.key)||r(u,c)}for(;m;)L(E[m-1]);return E}function se(t,e){const n={},i={},s={$$scope:1};let o=t.length;for(;o--;){const c=t[o],l=e[o];if(l){for(const r in c)r in l||(i[r]=1);for(const r in l)s[r]||(n[r]=l[r],s[r]=1);t[o]=l}else for(const r in c)s[r]=1}for(const c in i)c in n||(n[c]=void 0);return n}function ce(t){return typeof t=="object"&&t!==null?t:{}}function re(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function le(t){t&&t.c()}function oe(t,e){t&&t.l(e)}function wt(t,e,n,i){const{fragment:s,on_mount:o,on_destroy:c,after_update:l}=t.$$;s&&s.m(e,n),i||B(()=>{const r=o.map(K).filter(ct);c?c.push(...r):b(r),t.$$.on_mount=[]}),l.forEach(B)}function $t(t,e){const n=t.$$;n.fragment!==null&&(b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function bt(t,e){t.$$.dirty[0]===-1&&(x.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ae(t,e,n,i,s,o,c,l=[-1]){const r=$;w(t);const a=t.$$={fragment:null,ctx:null,props:o,update:J,not_equal:s,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:F(),dirty:l,skip_bound:!1,root:e.target||r.$$.root};c&&c(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(d,_,...m)=>{const h=m.length?m[0]:_;return a.ctx&&s(a.ctx[d],a.ctx[d]=h)&&(!a.skip_bound&&a.bound[d]&&a.bound[d](h),f&&bt(t,d)),_}):[],a.update(),f=!0,b(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){lt();const d=mt(e.target);a.fragment&&a.fragment.l(d),d.forEach(S)}else a.fragment&&a.fragment.c();e.intro&&it(t.$$.fragment),wt(t,e.target,e.anchor,e.customElement),ot(),nt()}w(r)}class ue{$destroy(){$t(this,1),this.$destroy=J}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!rt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Kt as $,se as A,ce as B,$t as C,st as D,Xt as E,Et as F,At as G,Tt as H,kt as I,ft as J,St as K,Qt as L,Nt as M,Lt as N,It as O,R as P,qt as Q,zt as R,ue as S,Ht as T,Dt as U,b as V,Vt as W,W as X,re as Y,Rt as Z,Yt as _,jt as a,V as a0,Pt as a1,ie as a2,ne as a3,Mt as a4,dt as b,Bt as c,te as d,Ct as e,it as f,Zt as g,S as h,ae as i,Ut as j,Jt as k,U as l,Ot as m,J as n,Wt as o,mt as p,ht as q,Ft as r,vt as s,ee as t,q as u,pt as v,Gt as w,le as x,oe as y,wt as z};
