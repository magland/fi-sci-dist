"use strict";var P=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var i=(s,e,t)=>(P(s,e,"read from private field"),t?t.call(s):e.get(s)),R=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},w=(s,e,t,o)=>(P(s,e,"write to private field"),o?o.call(s,t):e.set(s,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const N=s=>{const e=`importScripts( "${s}" );`;return URL.createObjectURL(new Blob([e],{type:"text/javascript"}))},W=s=>{const e=N(s);return new Worker(e)};var y,l,g;class j{constructor(){R(this,y,void 0);R(this,l,void 0);R(this,g,void 0);w(this,l,[]),w(this,g,void 0),this._processPendingRequests=()=>{if(i(this,g)||i(this,l).length===0)return;const e=i(this,l).shift();w(this,g,e);let t=!1;const o=a=>{t||(t=!0,i(this,y).removeEventListener("message",r),e.onResolved(a),w(this,g,void 0),this._processPendingRequests())},n=a=>{t||(t=!0,i(this,y).removeEventListener("message",r),e.onRejected(a),w(this,g,void 0),this._processPendingRequests())},r=a=>{const c=a.data;c.type==="response"&&c.requestId===e.requestId&&(c.response.success?o(c.response):n(new Error(c.response.error)))};i(this,y).addEventListener("message",r),i(this,y).postMessage({type:"request",requestId:e.requestId,request:e.request}),setTimeout(()=>{n(new Error("timeout"))},6e4*3)},w(this,y,W("https://cdn.jsdelivr.net/gh/magland/remote-h5-worker@0.1.2/dist/RemoteH5Worker.js"))}get numRunningRequests(){return i(this,g)?1:0}get numPendingRequests(){return i(this,l).length}get numRequests(){return this.numRunningRequests+this.numPendingRequests}async postRequest(e,t){const o=Math.random().toString();return await new Promise((r,a)=>{i(this,l).push({requestId:o,request:e,onResolved:r,onRejected:a}),t.onCancel.push(()=>{const c=i(this,l).findIndex(q=>q.requestId===o);c>=0&&(i(this,l).splice(c,1),a(new Error("canceled")))}),this._processPendingRequests()})}}y=new WeakMap,l=new WeakMap,g=new WeakMap;const G=1;var v;class L{constructor(){R(this,v,[]);for(let e=0;e<G;e++)i(this,v).push(new j)}async postRequest(e,t){return await i(this,v).sort((n,r)=>n.numRequests-r.numRequests)[0].postRequest(e,t)}}v=new WeakMap;const x=new L,D=async(s,e)=>{k.numPendingRequests++;try{return await x.postRequest(s,e)}finally{k.numPendingRequests--}},b=1024*1024*4,C=1024*100,k={getGroupCount:0,getDatasetCount:0,getDatasetDataCount:0,numPendingRequests:0};var d,f;class E{constructor(e,t){R(this,d,{});R(this,f,{});this.url=e,this.metaUrl=t}get dataIsRemote(){return!this.url.startsWith("http://localhost")}async getGroup(e){const t=i(this,d)[e];if(t)return t.group;if(t===null){for(;i(this,d)[e]===null;)await new Promise(a=>setTimeout(a,100));const r=i(this,d)[e];if(r)return r.group;throw Error("Unexpected")}i(this,d)[e]=null;const o={onCancel:[]};let n;try{n=await D({type:"getGroup",url:this.metaUrl||this.url,path:e,chunkSize:this.metaUrl?b:C},o)}catch{i(this,d)[e]={success:!1};return}return i(this,d)[e]=n,k.getGroupCount++,n.group}async getDataset(e){const t=i(this,f)[e];if(t)return t.dataset;if(t===null){for(;i(this,f)[e]===null;)await new Promise(a=>setTimeout(a,100));const r=i(this,f)[e];if(r)return r.dataset;throw Error("Unexpected")}i(this,f)[e]=null;const o={onCancel:[]};let n;try{n=await D({type:"getDataset",url:this.metaUrl||this.url,path:e,chunkSize:this.metaUrl?b:C},o)}catch{i(this,f)[e]={success:!1};return}return i(this,f)[e]=n,k.getDatasetCount++,n.dataset}async getDatasetData(e,t){if(t.slice){for(const p of t.slice)if(isNaN(p[0])||isNaN(p[1]))throw console.warn("Invalid slice",e,t.slice),Error("Invalid slice")}const o=await this.getDataset(e);if(!o)return;let n=this.metaUrl||this.url;B(o.shape)>100&&(n=this.url);const{slice:r,allowBigInt:a,canceler:c}=t,q={onCancel:[]};let U;try{U=await D({type:"getDatasetData",url:n,path:e,slice:r,chunkSize:n===this.metaUrl?b:C},c||q)}catch{return}const{data:M}=U;let u=M;if(!a){if(u&&u.constructor&&u.constructor.name==="BigInt64Array"){const p=new Int32Array(u.length);for(let h=0;h<u.length;h++)p[h]=Number(u[h]);u=p}if(u&&u.constructor&&u.constructor.name==="BigUint64Array"){const p=new Uint32Array(u.length);for(let h=0;h<u.length;h++)p[h]=Number(u[h]);u=p}}return k.getDatasetDataCount++,u}}d=new WeakMap,f=new WeakMap;var m;class S{constructor(e){R(this,m,void 0);w(this,m,e)}get dataIsRemote(){return i(this,m).some(e=>e.dataIsRemote)}async getGroup(e){const t=[];for(const n of i(this,m)){const r=await n.getGroup(e);r&&t.push(r)}return console.log(`Got ${t.length} groups`,e),t.length===0?void 0:z(t)}async getDataset(e){for(const t of i(this,m)){const o=await t.getDataset(e);if(o)return o}}async getDatasetData(e,t){var n;let o=!1;(n=t.canceler)==null||n.onCancel.push(()=>{o=!0});for(const r of i(this,m)){const a=await r.getDatasetData(e,t);if(a)return a;if(o)return}}getFiles(){return i(this,m)}}m=new WeakMap;const z=s=>{if(s.length===0)throw Error("Unexpected groups.length == 0");const e={path:s[0].path,subgroups:[],datasets:[],attrs:{}},t=[],o=[];for(const n of s){for(const r of n.subgroups)t.includes(r.name)||t.push(r.name);for(const r of n.datasets)o.includes(r.name)||o.push(r.name)}for(const n of t){const r=[];for(const a of s){const c=a.subgroups.find(q=>q.name===n);c&&r.push(c)}e.subgroups.push(T(r))}for(const n of o){const r=[];for(const a of s){const c=a.datasets.find(q=>q.name===n);c&&r.push(c)}r.length>0&&e.datasets.push(r[0])}for(const n of s)for(const r in n.attrs)r in e.attrs||(e.attrs[r]=n.attrs[r]);return e},T=s=>{if(s.length===0)throw Error("Unexpected subgroups.length == 0");const e={name:s[0].name,path:s[0].path,attrs:{}};for(const t of s)for(const o in t.attrs)o in e.attrs||(e.attrs[o]=t.attrs[o]);return e},H={},I=async(s,e)=>{const t=s+"|"+e;return H[t]||(H[t]=new E(s,e)),H[t]},F={},A=async(s,e)=>{if(s.length===0)throw Error("Length of urls must be > 0");if(e.length!==s.length)throw Error("Length of metaUrls must be equal to length of urls");if(s.length===1)return await I(s[0],e[0]);const t=s.join("|")+"|||"+e.join("|");if(!F[t]){const o=await Promise.all(s.map((n,r)=>I(n,e[r])));F[t]=new S(o)}return F[t]},B=s=>{let e=1;for(let t=0;t<s.length;t++)e*=s[t];return e};exports.MergedRemoteH5File=S;exports.RemoteH5File=E;exports.getMergedRemoteH5File=A;exports.getRemoteH5File=I;exports.globalRemoteH5FileStats=k;
