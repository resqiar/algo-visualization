import{S as tt,i as nt,s as at,a as rt,e as C,c as ot,b as G,g as ue,t as V,d as de,f as F,h as M,j as st,o as Ae,k as it,l as lt,m as ct,n as be,p as D,q as ft,r as ut,u as dt,v as K,w as z,x as Ne,y as W,z as Y,A as ce}from"./chunks/index-91e70326.js";import{S as Xe,I as T,g as Ge,f as He,a as Ee,b as fe,s as q,i as Je,c as te,P as Ke,d as pt}from"./chunks/singletons-e85e7ffc.js";import{_ as ke}from"./chunks/preload-helper-41c905a7.js";import{s as ht,a as _t}from"./chunks/shared-23917130.js";function mt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function gt(r){return r.split("%25").map(decodeURI).join("%25")}function wt(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const yt=["href","pathname","search","searchParams","toString","toJSON"];function vt(r,e){const a=new URL(r);for(const s of yt){let o=a[s];Object.defineProperty(a,s,{get(){return e(),o},enumerable:!0,configurable:!0})}return bt(a),a}function bt(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Et="/__data.json";function kt(r){return r.replace(/\/$/,"")+Et}function St(r){let e=5381;if(typeof r=="string"){let a=r.length;for(;a;)e=e*33^r.charCodeAt(--a)}else if(ArrayBuffer.isView(r)){const a=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let s=a.length;for(;s;)e=e*33^a[--s]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const pe=window.fetch;window.fetch=(r,e)=>((r instanceof Request?r.method:e?.method||"GET")!=="GET"&&ne.delete(Ue(r)),pe(r,e));const ne=new Map;function Rt(r,e){const a=Ue(r,e),s=document.querySelector(a);if(s?.textContent){const{body:o,...u}=JSON.parse(s.textContent),n=s.getAttribute("data-ttl");return n&&ne.set(a,{body:o,init:u,ttl:1e3*Number(n)}),Promise.resolve(new Response(o,u))}return pe(r,e)}function Lt(r,e,a){if(ne.size>0){const s=Ue(r,a),o=ne.get(s);if(o){if(performance.now()<o.ttl&&["default","force-cache","only-if-cached",void 0].includes(a?.cache))return new Response(o.body,o.init);ne.delete(s)}}return pe(e,a)}function Ue(r,e){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;return e?.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(s+=`[data-hash="${St(e.body)}"]`),s}const It=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function At(r){const e=[];return{pattern:r==="/"?/^\/$/:new RegExp(`^${Pt(r).map(s=>{const o=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(o)return e.push({name:o[1],matcher:o[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const u=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(u)return e.push({name:u[1],matcher:u[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!s)return;const n=s.split(/\[(.+?)\](?!\])/);return"/"+n.map((p,m)=>{if(m%2){if(p.startsWith("x+"))return Se(String.fromCharCode(parseInt(p.slice(2),16)));if(p.startsWith("u+"))return Se(String.fromCharCode(...p.slice(2).split("-").map(I=>parseInt(I,16))));const w=It.exec(p);if(!w)throw new Error(`Invalid param: ${p}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,v,k,U,j]=w;return e.push({name:U,matcher:j,optional:!!v,rest:!!k,chained:k?m===1&&n[0]==="":!1}),k?"(.*?)":v?"([^/]*)?":"([^/]+?)"}return Se(p)}).join("")}).join("")}/?$`),params:e}}function Ot(r){return!/^\([^)]+\)$/.test(r)}function Pt(r){return r.slice(1).split("/").filter(Ot)}function Nt(r,e,a){const s={},o=r.slice(1);let u="";for(let n=0;n<e.length;n+=1){const f=e[n];let p=o[n];if(f.chained&&f.rest&&u&&(p=p?u+"/"+p:u),u="",p===void 0)f.rest&&(s[f.name]="");else{if(f.matcher&&!a[f.matcher](p)){if(f.optional&&f.chained){let m=o.indexOf(void 0,n);if(m===-1){const w=e[n+1];if(w?.rest&&w.chained)u=p;else return}for(;m>=n;)o[m]=o[m-1],m-=1;continue}return}s[f.name]=p}}if(!u)return s}function Se(r){return r.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Ut(r,e,a,s){const o=new Set(e);return Object.entries(a).map(([f,[p,m,w]])=>{const{pattern:v,params:k}=At(f),U={id:f,exec:j=>{const I=v.exec(j);if(I)return Nt(I,k,s)},errors:[1,...w||[]].map(j=>r[j]),layouts:[0,...m||[]].map(n),leaf:u(p)};return U.errors.length=U.layouts.length=Math.max(U.errors.length,U.layouts.length),U});function u(f){const p=f<0;return p&&(f=~f),[p,r[f]]}function n(f){return f===void 0?f:[o.has(f),r[f]]}}function $t(r){let e,a,s;var o=r[0][0];function u(n){return{props:{data:n[2],form:n[1]}}}return o&&(e=K(o,u(r))),{c(){e&&z(e.$$.fragment),a=C()},l(n){e&&Ne(e.$$.fragment,n),a=C()},m(n,f){e&&W(e,n,f),G(n,a,f),s=!0},p(n,f){const p={};if(f&4&&(p.data=n[2]),f&2&&(p.form=n[1]),o!==(o=n[0][0])){if(e){ue();const m=e;V(m.$$.fragment,1,0,()=>{Y(m,1)}),de()}o?(e=K(o,u(n)),z(e.$$.fragment),F(e.$$.fragment,1),W(e,a.parentNode,a)):e=null}else o&&e.$set(p)},i(n){s||(e&&F(e.$$.fragment,n),s=!0)},o(n){e&&V(e.$$.fragment,n),s=!1},d(n){n&&M(a),e&&Y(e,n)}}}function jt(r){let e,a,s;var o=r[0][0];function u(n){return{props:{data:n[2],$$slots:{default:[Tt]},$$scope:{ctx:n}}}}return o&&(e=K(o,u(r))),{c(){e&&z(e.$$.fragment),a=C()},l(n){e&&Ne(e.$$.fragment,n),a=C()},m(n,f){e&&W(e,n,f),G(n,a,f),s=!0},p(n,f){const p={};if(f&4&&(p.data=n[2]),f&523&&(p.$$scope={dirty:f,ctx:n}),o!==(o=n[0][0])){if(e){ue();const m=e;V(m.$$.fragment,1,0,()=>{Y(m,1)}),de()}o?(e=K(o,u(n)),z(e.$$.fragment),F(e.$$.fragment,1),W(e,a.parentNode,a)):e=null}else o&&e.$set(p)},i(n){s||(e&&F(e.$$.fragment,n),s=!0)},o(n){e&&V(e.$$.fragment,n),s=!1},d(n){n&&M(a),e&&Y(e,n)}}}function Tt(r){let e,a,s;var o=r[0][1];function u(n){return{props:{data:n[3],form:n[1]}}}return o&&(e=K(o,u(r))),{c(){e&&z(e.$$.fragment),a=C()},l(n){e&&Ne(e.$$.fragment,n),a=C()},m(n,f){e&&W(e,n,f),G(n,a,f),s=!0},p(n,f){const p={};if(f&8&&(p.data=n[3]),f&2&&(p.form=n[1]),o!==(o=n[0][1])){if(e){ue();const m=e;V(m.$$.fragment,1,0,()=>{Y(m,1)}),de()}o?(e=K(o,u(n)),z(e.$$.fragment),F(e.$$.fragment,1),W(e,a.parentNode,a)):e=null}else o&&e.$set(p)},i(n){s||(e&&F(e.$$.fragment,n),s=!0)},o(n){e&&V(e.$$.fragment,n),s=!1},d(n){n&&M(a),e&&Y(e,n)}}}function ze(r){let e,a=r[5]&&We(r);return{c(){e=it("div"),a&&a.c(),this.h()},l(s){e=lt(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=ct(e);a&&a.l(o),o.forEach(M),this.h()},h(){be(e,"id","svelte-announcer"),be(e,"aria-live","assertive"),be(e,"aria-atomic","true"),D(e,"position","absolute"),D(e,"left","0"),D(e,"top","0"),D(e,"clip","rect(0 0 0 0)"),D(e,"clip-path","inset(50%)"),D(e,"overflow","hidden"),D(e,"white-space","nowrap"),D(e,"width","1px"),D(e,"height","1px")},m(s,o){G(s,e,o),a&&a.m(e,null)},p(s,o){s[5]?a?a.p(s,o):(a=We(s),a.c(),a.m(e,null)):a&&(a.d(1),a=null)},d(s){s&&M(e),a&&a.d()}}}function We(r){let e;return{c(){e=ft(r[6])},l(a){e=ut(a,r[6])},m(a,s){G(a,e,s)},p(a,s){s&64&&dt(e,a[6])},d(a){a&&M(e)}}}function Dt(r){let e,a,s,o,u;const n=[jt,$t],f=[];function p(w,v){return w[0][1]?0:1}e=p(r),a=f[e]=n[e](r);let m=r[4]&&ze(r);return{c(){a.c(),s=rt(),m&&m.c(),o=C()},l(w){a.l(w),s=ot(w),m&&m.l(w),o=C()},m(w,v){f[e].m(w,v),G(w,s,v),m&&m.m(w,v),G(w,o,v),u=!0},p(w,[v]){let k=e;e=p(w),e===k?f[e].p(w,v):(ue(),V(f[k],1,1,()=>{f[k]=null}),de(),a=f[e],a?a.p(w,v):(a=f[e]=n[e](w),a.c()),F(a,1),a.m(s.parentNode,s)),w[4]?m?m.p(w,v):(m=ze(w),m.c(),m.m(o.parentNode,o)):m&&(m.d(1),m=null)},i(w){u||(F(a),u=!0)},o(w){V(a),u=!1},d(w){f[e].d(w),w&&M(s),m&&m.d(w),w&&M(o)}}}function qt(r,e,a){let{stores:s}=e,{page:o}=e,{components:u}=e,{form:n}=e,{data_0:f=null}=e,{data_1:p=null}=e;st(s.page.notify);let m=!1,w=!1,v=null;return Ae(()=>{const k=s.page.subscribe(()=>{m&&(a(5,w=!0),a(6,v=document.title||"untitled page"))});return a(4,m=!0),k}),r.$$set=k=>{"stores"in k&&a(7,s=k.stores),"page"in k&&a(8,o=k.page),"components"in k&&a(0,u=k.components),"form"in k&&a(1,n=k.form),"data_0"in k&&a(2,f=k.data_0),"data_1"in k&&a(3,p=k.data_1)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(o)},[u,n,f,p,m,w,v,s,o]}class Ct extends tt{constructor(e){super(),nt(this,e,qt,Dt,at,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Vt={},he=[()=>ke(()=>import("./chunks/0-f5aecc83.js"),["./chunks/0-f5aecc83.js","./chunks/_layout-da46b06b.js","./components/pages/_layout.svelte-389721e0.js","./chunks/index-91e70326.js","./assets/_layout-d0979a95.css"],import.meta.url),()=>ke(()=>import("./chunks/1-77c95653.js"),["./chunks/1-77c95653.js","./components/error.svelte-02319094.js","./chunks/index-91e70326.js","./chunks/singletons-e85e7ffc.js","./chunks/shared-23917130.js"],import.meta.url),()=>ke(()=>import("./chunks/2-7df8c45a.js"),["./chunks/2-7df8c45a.js","./components/pages/_page.svelte-bdb41390.js","./chunks/index-91e70326.js","./chunks/preload-helper-41c905a7.js","./chunks/shared-23917130.js","./assets/_page-48e39361.css"],import.meta.url)],Ze=[],Ft={"/":[2]},Mt={handleError:({error:r})=>{console.error(r)}};let Oe=class{constructor(e,a){this.status=e,typeof a=="string"?this.body={message:a}:a?this.body=a:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},Ye=class{constructor(e,a){this.status=e,this.location=a}};async function Bt(r){for(const e in r)if(typeof r[e]?.then=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([a,s])=>[a,await s])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Gt=-1,Ht=-2,Jt=-3,Kt=-4,zt=-5,Wt=-6;function Yt(r){if(typeof r=="number")return s(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const e=r,a=Array(e.length);function s(o,u=!1){if(o===Gt)return;if(o===Jt)return NaN;if(o===Kt)return 1/0;if(o===zt)return-1/0;if(o===Wt)return-0;if(u)throw new Error("Invalid input");if(o in a)return a[o];const n=e[o];if(!n||typeof n!="object")a[o]=n;else if(Array.isArray(n))if(typeof n[0]=="string")switch(n[0]){case"Date":a[o]=new Date(n[1]);break;case"Set":const p=new Set;a[o]=p;for(let v=1;v<n.length;v+=1)p.add(s(n[v]));break;case"Map":const m=new Map;a[o]=m;for(let v=1;v<n.length;v+=2)m.set(s(n[v]),s(n[v+1]));break;case"RegExp":a[o]=new RegExp(n[1],n[2]);break;case"Object":a[o]=Object(n[1]);break;case"BigInt":a[o]=BigInt(n[1]);break;case"null":const w=Object.create(null);a[o]=w;for(let v=1;v<n.length;v+=2)w[n[v]]=s(n[v+1]);break}else{const f=new Array(n.length);a[o]=f;for(let p=0;p<n.length;p+=1){const m=n[p];m!==Ht&&(f[p]=s(m))}}else{const f={};a[o]=f;for(const p in n){const m=n[p];f[p]=s(m)}}return a[o]}return s(0)}function xt(r){return r.filter(e=>e!=null)}const Re=Ut(he,Ze,Ft,Vt),Qe=he[0],Pe=he[1];Qe();Pe();let J={};try{J=JSON.parse(sessionStorage[Xe])}catch{}function Le(r){J[r]=te()}function Xt({target:r,base:e}){const a=document.documentElement,s=[];let o=null;const u={before_navigate:[],after_navigate:[]};let n={branch:[],error:null,url:null},f=!1,p=!1,m=!0,w=!1,v=!1,k=!1,U=!1,j,I=history.state?.[T];I||(I=Date.now(),history.replaceState({...history.state,[T]:I},"",location.href));const _e=J[I];_e&&(history.scrollRestoration="manual",scrollTo(_e.x,_e.y));let B,$e,ae;async function je(){ae=ae||Promise.resolve(),await ae,ae=null;const t=new URL(location.href),l=se(t,!0);o=null,await De(l,t,[])}async function me(t,{noScroll:l=!1,replaceState:i=!1,keepFocus:c=!1,state:d={},invalidateAll:_=!1},h,g){return typeof t=="string"&&(t=new URL(t,Ge(document))),le({url:t,scroll:l?te():null,keepfocus:c,redirect_chain:h,details:{state:d,replaceState:i},nav_token:g,accepted:()=>{_&&(U=!0)},blocked:()=>{},type:"goto"})}async function Te(t){const l=se(t,!1);if(!l)throw new Error(`Attempted to preload a URL that does not belong to this app: ${t}`);return o={id:l.id,promise:Ve(l).then(i=>(i.type==="loaded"&&i.state.error&&(o=null),i))},o.promise}async function re(...t){const i=Re.filter(c=>t.some(d=>c.exec(d))).map(c=>Promise.all([...c.layouts,c.leaf].map(d=>d?.[1]())));await Promise.all(i)}async function De(t,l,i,c,d={},_){$e=d;let h=t&&await Ve(t);if(h||(h=await Be(l,{id:null},await ee(new Error(`Not found: ${l.pathname}`),{url:l,params:{},route:{id:null}}),404)),l=t?.url||l,$e!==d)return!1;if(h.type==="redirect")if(i.length>10||i.includes(l.pathname))h=await oe({status:500,error:await ee(new Error("Redirect loop"),{url:l,params:{},route:{id:null}}),url:l,route:{id:null}});else return me(new URL(h.location,l).href,{},[...i,l.pathname],d),!1;else h.props?.page?.status>=400&&await q.updated.check()&&await X(l);if(s.length=0,U=!1,w=!0,c&&c.details){const{details:g}=c,y=g.replaceState?0:1;g.state[T]=I+=y,history[g.replaceState?"replaceState":"pushState"](g.state,"",l)}if(o=null,p?(n=h.state,h.props.page&&(h.props.page.url=l),j.$set(h.props)):qe(h),c){const{scroll:g,keepfocus:y}=c,{activeElement:E}=document;await ce();const R=document.activeElement!==E&&document.activeElement!==document.body;if(!y&&!R&&await Ie(),m){const b=l.hash&&document.getElementById(l.hash.slice(1));g?scrollTo(g.x,g.y):b?b.scrollIntoView():scrollTo(0,0)}}else await ce();m=!0,h.props.page&&(B=h.props.page),_&&_(),w=!1}function qe(t){n=t.state;const l=document.querySelector("style[data-sveltekit]");l&&l.remove(),B=t.props.page,j=new Ct({target:r,props:{...t.props,stores:q},hydrate:!0});const i={from:null,to:{params:n.params,route:{id:n.route?.id??null},url:new URL(location.href)},willUnload:!1,type:"enter"};u.after_navigate.forEach(c=>c(i)),p=!0}async function x({url:t,params:l,branch:i,status:c,error:d,route:_,form:h}){let g="never";for(const S of i)S?.slash!==void 0&&(g=S.slash);t.pathname=mt(t.pathname,g),t.search=t.search;const y={type:"loaded",state:{url:t,params:l,branch:i,error:d,route:_},props:{components:xt(i).map(S=>S.node.component)}};h!==void 0&&(y.props.form=h);let E={},R=!B,b=0;for(let S=0;S<Math.max(i.length,n.branch.length);S+=1){const N=i[S],Z=n.branch[S];N?.data!==Z?.data&&(R=!0),N&&(E={...E,...N.data},R&&(y.props[`data_${b}`]=E),b+=1)}return(!n.url||t.href!==n.url.href||n.error!==d||h!==void 0&&h!==B.form||R)&&(y.props.page={error:d,params:l,route:{id:_?.id??null},status:c,url:new URL(t),form:h??null,data:R?E:B.data}),y}async function ge({loader:t,parent:l,url:i,params:c,route:d,server_data_node:_}){let h=null;const g={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},y=await t();if(y.universal?.load){let E=function(...b){for(const A of b){const{href:S}=new URL(A,i);g.dependencies.add(S)}};const R={route:{get id(){return g.route=!0,d.id}},params:new Proxy(c,{get:(b,A)=>(g.params.add(A),b[A])}),data:_?.data??null,url:vt(i,()=>{g.url=!0}),async fetch(b,A){let S;b instanceof Request?(S=b.url,A={body:b.method==="GET"||b.method==="HEAD"?void 0:await b.blob(),cache:b.cache,credentials:b.credentials,headers:b.headers,integrity:b.integrity,keepalive:b.keepalive,method:b.method,mode:b.mode,redirect:b.redirect,referrer:b.referrer,referrerPolicy:b.referrerPolicy,signal:b.signal,...A}):S=b;const N=new URL(S,i).href;return E(N),p?Lt(S,N,A):Rt(S,A)},setHeaders:()=>{},depends:E,parent(){return g.parent=!0,l()}};h=await y.universal.load.call(null,R)??null,h=h?await Bt(h):null}return{node:y,loader:t,server:_,universal:y.universal?.load?{type:"data",data:h,uses:g}:null,data:h??_?.data??null,slash:y.universal?.trailingSlash??_?.slash}}function Ce(t,l,i,c,d){if(U)return!0;if(!c)return!1;if(c.parent&&t||c.route&&l||c.url&&i)return!0;for(const _ of c.params)if(d[_]!==n.params[_])return!0;for(const _ of c.dependencies)if(s.some(h=>h(new URL(_))))return!0;return!1}function we(t,l){return t?.type==="data"?{type:"data",data:t.data,uses:{dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url},slash:t.slash}:t?.type==="skip"?l??null:null}async function Ve({id:t,invalidating:l,url:i,params:c,route:d}){if(o?.id===t)return o.promise;const{errors:_,layouts:h,leaf:g}=d,y=[...h,g];_.forEach(L=>L?.().catch(()=>{})),y.forEach(L=>L?.[1]().catch(()=>{}));let E=null;const R=n.url?t!==n.url.pathname+n.url.search:!1,b=n.route?d.id!==n.route.id:!1,A=y.reduce((L,O,$)=>{const P=n.branch[$],H=!!O?.[0]&&(P?.loader!==O[1]||Ce(L.some(Boolean),b,R,P.server?.uses,c));return L.push(H),L},[]);if(A.some(Boolean)){try{E=await xe(i,A)}catch(L){return oe({status:500,error:await ee(L,{url:i,params:c,route:{id:d.id}}),url:i,route:d})}if(E.type==="redirect")return E}const S=E?.nodes;let N=!1;const Z=y.map(async(L,O)=>{if(!L)return;const $=n.branch[O],P=S?.[O];if((!P||P.type==="skip")&&L[1]===$?.loader&&!Ce(N,b,R,$.universal?.uses,c))return $;if(N=!0,P?.type==="error")throw P;return ge({loader:L[1],url:i,params:c,route:d,parent:async()=>{const ye={};for(let ve=0;ve<O;ve+=1)Object.assign(ye,(await Z[ve])?.data);return ye},server_data_node:we(P===void 0&&L[0]?{type:"skip"}:P??null,$?.server)})});for(const L of Z)L.catch(()=>{});const Q=[];for(let L=0;L<y.length;L+=1)if(y[L])try{Q.push(await Z[L])}catch(O){if(O instanceof Ye)return{type:"redirect",location:O.location};let $=500,P;if(S?.includes(O))$=O.status??$,P=O.error;else if(O instanceof Oe)$=O.status,P=O.body;else{if(await q.updated.check())return await X(i);P=await ee(O,{params:c,url:i,route:{id:d.id}})}const H=await Fe(L,Q,_);return H?await x({url:i,params:c,branch:Q.slice(0,H.idx).concat(H.node),status:$,error:P,route:d}):await Be(i,{id:d.id},P,$)}else Q.push(void 0);return await x({url:i,params:c,branch:Q,status:200,error:null,route:d,form:l?void 0:null})}async function Fe(t,l,i){for(;t--;)if(i[t]){let c=t;for(;!l[c];)c-=1;try{return{idx:c+1,node:{node:await i[t](),loader:i[t],data:{},server:null,universal:null}}}catch{continue}}}async function oe({status:t,error:l,url:i,route:c}){const d={};let _=null;if(Ze[0]===0)try{const E=await xe(i,[!0]);if(E.type!=="data"||E.nodes[0]&&E.nodes[0].type!=="data")throw 0;_=E.nodes[0]??null}catch{(i.origin!==location.origin||i.pathname!==location.pathname||f)&&await X(i)}const g=await ge({loader:Qe,url:i,params:d,route:c,parent:()=>Promise.resolve({}),server_data_node:we(_)}),y={node:await Pe(),loader:Pe,universal:null,server:null,data:null};return await x({url:i,params:d,branch:[g,y],status:t,error:l,route:null})}function se(t,l){if(Je(t,e))return;const i=ie(t);for(const c of Re){const d=c.exec(i);if(d)return{id:t.pathname+t.search,invalidating:l,route:c,params:wt(d),url:t}}}function ie(t){return gt(t.pathname.slice(e.length)||"/")}function Me({url:t,type:l,intent:i,delta:c}){let d=!1;const _={from:{params:n.params,route:{id:n.route?.id??null},url:n.url},to:{params:i?.params??null,route:{id:i?.route?.id??null},url:t},willUnload:!i,type:l};c!==void 0&&(_.delta=c);const h={..._,cancel:()=>{d=!0}};return v||u.before_navigate.forEach(g=>g(h)),d?null:_}async function le({url:t,scroll:l,keepfocus:i,redirect_chain:c,details:d,type:_,delta:h,nav_token:g,accepted:y,blocked:E}){const R=se(t,!1),b=Me({url:t,type:_,delta:h,intent:R});if(!b){E();return}Le(I),y(),v=!0,p&&q.navigating.set(b),await De(R,t,c,{scroll:l,keepfocus:i,details:d},g,()=>{v=!1,u.after_navigate.forEach(A=>A(b)),q.navigating.set(null)})}async function Be(t,l,i,c){return t.origin===location.origin&&t.pathname===location.pathname&&!f?await oe({status:c,error:i,url:t,route:l}):await X(t)}function X(t){return location.href=t.href,new Promise(()=>{})}function et(){let t;a.addEventListener("mousemove",_=>{const h=_.target;clearTimeout(t),t=setTimeout(()=>{c(h,2)},20)});function l(_){c(_.composedPath()[0],1)}a.addEventListener("mousedown",l),a.addEventListener("touchstart",l,{passive:!0});const i=new IntersectionObserver(_=>{for(const h of _)h.isIntersecting&&(re(ie(new URL(h.target.href))),i.unobserve(h.target))},{threshold:0});function c(_,h){const g=He(_,a);if(!g)return;const{url:y,external:E}=Ee(g,e);if(E)return;const R=fe(g);R.reload||(h<=R.preload_data?Te(y):h<=R.preload_code&&re(ie(y)))}function d(){i.disconnect();for(const _ of a.querySelectorAll("a")){const{url:h,external:g}=Ee(_,e);if(g)continue;const y=fe(_);y.reload||(y.preload_code===Ke.viewport&&i.observe(_),y.preload_code===Ke.eager&&re(ie(h)))}}u.after_navigate.push(d),d()}return{after_navigate:t=>{Ae(()=>(u.after_navigate.push(t),()=>{const l=u.after_navigate.indexOf(t);u.after_navigate.splice(l,1)}))},before_navigate:t=>{Ae(()=>(u.before_navigate.push(t),()=>{const l=u.before_navigate.indexOf(t);u.before_navigate.splice(l,1)}))},disable_scroll_handling:()=>{(w||!p)&&(m=!1)},goto:(t,l={})=>me(t,l,[]),invalidate:t=>{if(typeof t=="function")s.push(t);else{const{href:l}=new URL(t,location.href);s.push(i=>i.href===l)}return je()},invalidateAll:()=>(U=!0,je()),preload_data:async t=>{const l=new URL(t,Ge(document));await Te(l)},preload_code:re,apply_action:async t=>{if(t.type==="error"){const l=new URL(location.href),{branch:i,route:c}=n;if(!c)return;const d=await Fe(n.branch.length,i,c.errors);if(d){const _=await x({url:l,params:n.params,branch:i.slice(0,d.idx).concat(d.node),status:t.status??500,error:t.error,route:c});n=_.state,j.$set(_.props),ce().then(Ie)}}else if(t.type==="redirect")me(t.location,{invalidateAll:!0},[]);else{const l={form:t.data,page:{...B,form:t.data,status:t.status}};j.$set(l),t.type==="success"&&ce().then(Ie)}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let l=!1;if(!v){const i={from:{params:n.params,route:{id:n.route?.id??null},url:n.url},to:null,willUnload:!0,type:"leave",cancel:()=>l=!0};u.before_navigate.forEach(c=>c(i))}l?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Le(I);try{sessionStorage[Xe]=JSON.stringify(J)}catch{}}}),navigator.connection?.saveData||et(),a.addEventListener("click",t=>{if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const l=He(t.composedPath()[0],a);if(!l)return;const{url:i,external:c,target:d}=Ee(l,e);if(!i)return;if(d==="_parent"||d==="_top"){if(window.parent!==window)return}else if(d&&d!=="_self")return;const _=fe(l);if(!(l instanceof SVGAElement)&&i.protocol!==location.protocol&&!(i.protocol==="https:"||i.protocol==="http:"))return;if(c||_.reload){Me({url:i,type:"link"})||t.preventDefault(),v=!0;return}const[g,y]=i.href.split("#");if(y!==void 0&&g===location.href.split("#")[0]){k=!0,Le(I),n.url=i,q.page.set({...B,url:i}),q.page.notify();return}le({url:i,scroll:_.noscroll?te():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:i.href===location.href},accepted:()=>t.preventDefault(),blocked:()=>t.preventDefault(),type:"link"})}),a.addEventListener("submit",t=>{if(t.defaultPrevented)return;const l=HTMLFormElement.prototype.cloneNode.call(t.target),i=t.submitter;if((i?.formMethod||l.method)!=="get")return;const d=new URL(i?.hasAttribute("formaction")&&i?.formAction||l.action);if(Je(d,e))return;const _=t.target,{noscroll:h,reload:g}=fe(_);if(g)return;t.preventDefault(),t.stopPropagation();const y=new FormData(_),E=i?.getAttribute("name");E&&y.append(E,i?.getAttribute("value")??""),d.search=new URLSearchParams(y).toString(),le({url:d,scroll:h?te():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",t=>{if(t.state?.[T]){if(t.state[T]===I)return;const l=J[t.state[T]];if(n.url.href.split("#")[0]===location.href.split("#")[0]){J[I]=te(),I=t.state[T],scrollTo(l.x,l.y);return}const i=t.state[T]-I;le({url:new URL(location.href),scroll:l,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{I=t.state[T]},blocked:()=>{history.go(-i)},type:"popstate",delta:i})}}),addEventListener("hashchange",()=>{k&&(k=!1,history.replaceState({...history.state,[T]:++I},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&q.navigating.set(null)})},_hydrate:async({status:t=200,error:l,node_ids:i,params:c,route:d,data:_,form:h})=>{f=!0;const g=new URL(location.href);({params:c={},route:d={id:null}}=se(g,!1)||{});let y;try{const E=i.map(async(R,b)=>{const A=_[b];return ge({loader:he[R],url:g,params:c,route:d,parent:async()=>{const S={};for(let N=0;N<b;N+=1)Object.assign(S,(await E[N]).data);return S},server_data_node:we(A)})});y=await x({url:g,params:c,branch:await Promise.all(E),status:t,error:l,form:h,route:Re.find(({id:R})=>R===d.id)??null})}catch(E){if(E instanceof Ye){await X(new URL(E.location,location.href));return}y=await oe({status:E instanceof Oe?E.status:500,error:await ee(E,{url:g,params:c,route:d}),url:g,route:d})}qe(y)}}}async function xe(r,e){const a=new URL(r);a.pathname=kt(r.pathname),a.searchParams.append("x-sveltekit-invalidated",e.map(u=>u?"1":"").join("_"));const s=await pe(a.href),o=await s.json();if(!s.ok)throw new Error(o);return o.nodes?.forEach(u=>{u?.type==="data"&&(u.data=Yt(u.data),u.uses={dependencies:new Set(u.uses.dependencies??[]),params:new Set(u.uses.params??[]),parent:!!u.uses.parent,route:!!u.uses.route,url:!!u.uses.url})}),o}function ee(r,e){return r instanceof Oe?r.body:Mt.handleError({error:r,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Ie(){const r=document.querySelector("[autofocus]");if(r)r.focus();else{const e=document.body,a=e.getAttribute("tabindex");return e.tabIndex=-1,e.focus({preventScroll:!0}),a!==null?e.setAttribute("tabindex",a):e.removeAttribute("tabindex"),new Promise(s=>{setTimeout(()=>{s(getSelection()?.removeAllRanges())})})}}async function rn({env:r,hydrate:e,paths:a,target:s,version:o}){ht(a),_t(o);const u=Xt({target:s,base:a.base});pt({client:u}),e?await u._hydrate(e):u.goto(location.href,{replaceState:!0}),u._start_router()}export{rn as start};