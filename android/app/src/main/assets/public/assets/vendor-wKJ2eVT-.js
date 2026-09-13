const Ag="modulepreload",bg=function(n){return"/"+n},qu={},Sg=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){let o=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=c?.nonce||c?.getAttribute("nonce");s=o(t.map(l=>{if(l=bg(l),l in qu)return;qu[l]=!0;const d=l.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":Ag,d||(g.as="script"),g.crossOrigin="",g.href=l,u&&g.setAttribute("nonce",u),document.head.appendChild(g),d)return new Promise((b,V)=>{g.addEventListener("load",b),g.addEventListener("error",()=>V(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};var To={exports:{}},wo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zu;function Pg(){return zu||(zu=1,(function(n){function e(F,ne){var z=F.length;F.push(ne);e:for(;0<z;){var re=z-1>>>1,R=F[re];if(0<s(R,ne))F[re]=ne,F[z]=R,z=re;else break e}}function t(F){return F.length===0?null:F[0]}function r(F){if(F.length===0)return null;var ne=F[0],z=F.pop();if(z!==ne){F[0]=z;e:for(var re=0,R=F.length,A=R>>>1;re<A;){var H=2*(re+1)-1,G=F[H],Q=H+1,Y=F[Q];if(0>s(G,z))Q<R&&0>s(Y,G)?(F[re]=Y,F[Q]=z,re=Q):(F[re]=G,F[H]=z,re=H);else if(Q<R&&0>s(Y,z))F[re]=Y,F[Q]=z,re=Q;else break e}}return ne}function s(F,ne){var z=F.sortIndex-ne.sortIndex;return z!==0?z:F.id-ne.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;n.unstable_now=function(){return i.now()}}else{var o=Date,c=o.now();n.unstable_now=function(){return o.now()-c}}var u=[],l=[],d=1,p=null,g=3,b=!1,V=!1,D=!1,P=!1,x=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function N(F){for(var ne=t(l);ne!==null;){if(ne.callback===null)r(l);else if(ne.startTime<=F)r(l),ne.sortIndex=ne.expirationTime,e(u,ne);else break;ne=t(l)}}function $(F){if(D=!1,N(F),!V)if(t(u)!==null)V=!0,K||(K=!0,S());else{var ne=t(l);ne!==null&&pe($,ne.startTime-F)}}var K=!1,I=-1,y=5,v=-1;function w(){return P?!0:!(n.unstable_now()-v<y)}function E(){if(P=!1,K){var F=n.unstable_now();v=F;var ne=!0;try{e:{V=!1,D&&(D=!1,B(I),I=-1),b=!0;var z=g;try{t:{for(N(F),p=t(u);p!==null&&!(p.expirationTime>F&&w());){var re=p.callback;if(typeof re=="function"){p.callback=null,g=p.priorityLevel;var R=re(p.expirationTime<=F);if(F=n.unstable_now(),typeof R=="function"){p.callback=R,N(F),ne=!0;break t}p===t(u)&&r(u),N(F)}else r(u);p=t(u)}if(p!==null)ne=!0;else{var A=t(l);A!==null&&pe($,A.startTime-F),ne=!1}}break e}finally{p=null,g=z,b=!1}ne=void 0}}finally{ne?S():K=!1}}}var S;if(typeof O=="function")S=function(){O(E)};else if(typeof MessageChannel<"u"){var T=new MessageChannel,le=T.port2;T.port1.onmessage=E,S=function(){le.postMessage(null)}}else S=function(){x(E,0)};function pe(F,ne){I=x(function(){F(n.unstable_now())},ne)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(F){F.callback=null},n.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<F?Math.floor(1e3/F):5},n.unstable_getCurrentPriorityLevel=function(){return g},n.unstable_next=function(F){switch(g){case 1:case 2:case 3:var ne=3;break;default:ne=g}var z=g;g=ne;try{return F()}finally{g=z}},n.unstable_requestPaint=function(){P=!0},n.unstable_runWithPriority=function(F,ne){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var z=g;g=F;try{return ne()}finally{g=z}},n.unstable_scheduleCallback=function(F,ne,z){var re=n.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?re+z:re):z=re,F){case 1:var R=-1;break;case 2:R=250;break;case 5:R=1073741823;break;case 4:R=1e4;break;default:R=5e3}return R=z+R,F={id:d++,callback:ne,priorityLevel:F,startTime:z,expirationTime:R,sortIndex:-1},z>re?(F.sortIndex=z,e(l,F),t(u)===null&&F===t(l)&&(D?(B(I),I=-1):D=!0,pe($,z-re))):(F.sortIndex=R,e(u,F),V||b||(V=!0,K||(K=!0,S()))),F},n.unstable_shouldYield=w,n.unstable_wrapCallback=function(F){var ne=g;return function(){var z=g;g=ne;try{return F.apply(this,arguments)}finally{g=z}}}})(wo)),wo}var Hu;function mS(){return Hu||(Hu=1,To.exports=Pg()),To.exports}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg=()=>{};var Wu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Cg=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Sd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,b=l&63;u||(b=64,o||(g=64)),r.push(t[d],t[p],t[g],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(bd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Cg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||p==null)throw new Vg;const g=i<<2|c>>4;if(r.push(g),l!==64){const b=c<<4&240|l>>2;if(r.push(b),p!==64){const V=l<<6&192|p;r.push(V)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Vg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const kg=function(n){const e=bd(n);return Sd.encodeByteArray(e,!0)},fi=function(n){return kg(n).replace(/\./g,"")},Pd=function(n){try{return Sd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg=()=>Dg().__FIREBASE_DEFAULTS__,xg=()=>{if(typeof process>"u"||typeof Wu>"u")return;const n=Wu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Og=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Pd(n[1]);return e&&JSON.parse(e)},Fi=()=>{try{return Rg()||Mg()||xg()||Og()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Rd=n=>Fi()?.emulatorHosts?.[n],Ng=n=>{const e=Rd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Cd=()=>Fi()?.config,Vd=n=>Fi()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[fi(JSON.stringify(t)),fi(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ug(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Qe())}function Bg(){const n=Fi()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function jg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function $g(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function qg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zg(){const n=Qe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Hg(){return!Bg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Wg(){try{return typeof indexedDB=="object"}catch{return!1}}function Kg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg="FirebaseError";class Nt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Gg,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fs.prototype.create)}}class fs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Qg(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Nt(s,c,r)}}function Qg(n,e){return n.replace(Xg,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Xg=/\{\$([^}]+)}/g;function Jg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Dn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Ku(i)&&Ku(o)){if(!Dn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ku(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Yg(n,e){const t=new Zg(n,e);return t.subscribe.bind(t)}class Zg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");ey(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Eo),s.error===void 0&&(s.error=Eo),s.complete===void 0&&(s.complete=Eo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ey(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Eo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function kd(n){return(await fetch(n,{credentials:"include"})).ok}class Mn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Lg;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ry(e))try{this.getOrInitializeService({instanceIdentifier:En})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=En){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=En){return this.instances.has(e)}getOptions(e=En){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ny(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=En){return this.component?this.component.multipleInstances?e:En:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ny(n){return n===En?void 0:n}function ry(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ty(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ce||(ce={}));const iy={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},oy=ce.INFO,ay={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},cy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=ay[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ja{constructor(e){this.name=e,this._logLevel=oy,this._logHandler=cy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?iy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}const uy=(n,e)=>e.some(t=>n instanceof t);let Gu,Qu;function ly(){return Gu||(Gu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hy(){return Qu||(Qu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Dd=new WeakMap,Yo=new WeakMap,Md=new WeakMap,Io=new WeakMap,Ya=new WeakMap;function dy(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(Yt(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Dd.set(t,n)}).catch(()=>{}),Ya.set(e,n),e}function fy(n){if(Yo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Yo.set(n,e)}let Zo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Yo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Md.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Yt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function py(n){Zo=n(Zo)}function my(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ao(this),e,...t);return Md.set(r,e.sort?e.sort():[e]),Yt(r)}:hy().includes(n)?function(...e){return n.apply(Ao(this),e),Yt(Dd.get(this))}:function(...e){return Yt(n.apply(Ao(this),e))}}function gy(n){return typeof n=="function"?my(n):(n instanceof IDBTransaction&&fy(n),uy(n,ly())?new Proxy(n,Zo):n)}function Yt(n){if(n instanceof IDBRequest)return dy(n);if(Io.has(n))return Io.get(n);const e=gy(n);return e!==n&&(Io.set(n,e),Ya.set(e,n)),e}const Ao=n=>Ya.get(n);function yy(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=Yt(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Yt(o.result),u.oldVersion,u.newVersion,Yt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const _y=["get","getKey","getAll","getAllKeys","count"],vy=["put","add","delete","clear"],bo=new Map;function Xu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(bo.get(e))return bo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=vy.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||_y.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return bo.set(e,i),i}py(n=>({...n,get:(e,t,r)=>Xu(e,t)||n.get(e,t,r),has:(e,t)=>!!Xu(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(wy(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function wy(n){return n.getComponent()?.type==="VERSION"}const ea="@firebase/app",Ju="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=new Ja("@firebase/app"),Ey="@firebase/app-compat",Iy="@firebase/analytics-compat",Ay="@firebase/analytics",by="@firebase/app-check-compat",Sy="@firebase/app-check",Py="@firebase/auth",Ry="@firebase/auth-compat",Cy="@firebase/database",Vy="@firebase/data-connect",ky="@firebase/database-compat",Dy="@firebase/functions",My="@firebase/functions-compat",xy="@firebase/installations",Oy="@firebase/installations-compat",Ny="@firebase/messaging",Ly="@firebase/messaging-compat",Fy="@firebase/performance",Uy="@firebase/performance-compat",By="@firebase/remote-config",jy="@firebase/remote-config-compat",$y="@firebase/storage",qy="@firebase/storage-compat",zy="@firebase/firestore",Hy="@firebase/ai",Wy="@firebase/firestore-compat",Ky="firebase",Gy="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta="[DEFAULT]",Qy={[ea]:"fire-core",[Ey]:"fire-core-compat",[Ay]:"fire-analytics",[Iy]:"fire-analytics-compat",[Sy]:"fire-app-check",[by]:"fire-app-check-compat",[Py]:"fire-auth",[Ry]:"fire-auth-compat",[Cy]:"fire-rtdb",[Vy]:"fire-data-connect",[ky]:"fire-rtdb-compat",[Dy]:"fire-fn",[My]:"fire-fn-compat",[xy]:"fire-iid",[Oy]:"fire-iid-compat",[Ny]:"fire-fcm",[Ly]:"fire-fcm-compat",[Fy]:"fire-perf",[Uy]:"fire-perf-compat",[By]:"fire-rc",[jy]:"fire-rc-compat",[$y]:"fire-gcs",[qy]:"fire-gcs-compat",[zy]:"fire-fst",[Wy]:"fire-fst-compat",[Hy]:"fire-vertex","fire-js":"fire-js",[Ky]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=new Map,Xy=new Map,na=new Map;function Yu(n,e){try{n.container.addComponent(e)}catch(t){Vt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function cr(n){const e=n.name;if(na.has(e))return Vt.debug(`There were multiple attempts to register component ${e}.`),!1;na.set(e,n);for(const t of rs.values())Yu(t,n);for(const t of Xy.values())Yu(t,n);return!0}function Za(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function yt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zt=new fs("app","Firebase",Jy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=Gy;function Zy(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ta,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Zt.create("bad-app-name",{appName:String(s)});if(t||(t=Cd()),!t)throw Zt.create("no-options");const i=rs.get(s);if(i){if(Dn(t,i.options)&&Dn(r,i.config))return i;throw Zt.create("duplicate-app",{appName:s})}const o=new sy(s);for(const u of na.values())o.addComponent(u);const c=new Yy(t,r,o);return rs.set(s,c),c}function xd(n=ta){const e=rs.get(n);if(!e&&n===ta&&Cd())return Zy();if(!e)throw Zt.create("no-app",{appName:n});return e}function gS(){return Array.from(rs.values())}function en(n,e,t){let r=Qy[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Vt.warn(o.join(" "));return}cr(new Mn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_="firebase-heartbeat-database",t_=1,ss="firebase-heartbeat-store";let So=null;function Od(){return So||(So=yy(e_,t_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ss)}catch(t){console.warn(t)}}}}).catch(n=>{throw Zt.create("idb-open",{originalErrorMessage:n.message})})),So}async function n_(n){try{const t=(await Od()).transaction(ss),r=await t.objectStore(ss).get(Nd(n));return await t.done,r}catch(e){if(e instanceof Nt)Vt.warn(e.message);else{const t=Zt.create("idb-get",{originalErrorMessage:e?.message});Vt.warn(t.message)}}}async function Zu(n,e){try{const r=(await Od()).transaction(ss,"readwrite");await r.objectStore(ss).put(e,Nd(n)),await r.done}catch(t){if(t instanceof Nt)Vt.warn(t.message);else{const r=Zt.create("idb-set",{originalErrorMessage:t?.message});Vt.warn(r.message)}}}function Nd(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=1024,s_=30;class i_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new a_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=el();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>s_){const s=c_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Vt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=el(),{heartbeatsToSend:t,unsentEntries:r}=o_(this._heartbeatsCache.heartbeats),s=fi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Vt.warn(e),""}}}function el(){return new Date().toISOString().substring(0,10)}function o_(n,e=r_){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),tl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),tl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class a_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wg()?Kg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await n_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Zu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Zu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function tl(n){return fi(JSON.stringify({version:2,heartbeats:n})).length}function c_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u_(n){cr(new Mn("platform-logger",e=>new Ty(e),"PRIVATE")),cr(new Mn("heartbeat",e=>new i_(e),"PRIVATE")),en(ea,Ju,n),en(ea,Ju,"esm2020"),en("fire-js","")}u_("");var l_="firebase",h_="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */en(l_,h_,"app");function Ld(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const d_=Ld,Fd=new fs("auth","Firebase",Ld());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi=new Ja("@firebase/auth");function f_(n,...e){pi.logLevel<=ce.WARN&&pi.warn(`Auth (${yr}): ${n}`,...e)}function Ys(n,...e){pi.logLevel<=ce.ERROR&&pi.error(`Auth (${yr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(n,...e){throw ec(n,...e)}function Tt(n,...e){return ec(n,...e)}function Ud(n,e,t){const r={...d_(),[e]:t};return new fs("auth","Firebase",r).create(e,{appName:n.name})}function Pn(n){return Ud(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ec(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Fd.create(n,...e)}function Z(n,e,...t){if(!n)throw ec(e,...t)}function St(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ys(e),new Error(e)}function Dt(n,e){n||St(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(){return typeof self<"u"&&self.location?.href||""}function p_(){return nl()==="http:"||nl()==="https:"}function nl(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(p_()||$g()||"connection"in navigator)?navigator.onLine:!0}function g_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ug()||qg()}get(){return m_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(n,e){Dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;St("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;St("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;St("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const __=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],v_=new gs(3e4,6e4);function nc(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function _r(n,e,t,r,s={}){return jd(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=ps({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return jg()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&ms(n.emulatorConfig.host)&&(l.credentials="include"),Bd.fetch()(await $d(n,n.config.apiHost,t,c),l)})}async function jd(n,e,t){n._canInitEmulator=!1;const r={...y_,...e};try{const s=new w_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw zs(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw zs(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw zs(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw zs(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ud(n,d,l);kt(n,d)}}catch(s){if(s instanceof Nt)throw s;kt(n,"network-request-failed",{message:String(s)})}}async function T_(n,e,t,r,s={}){const i=await _r(n,e,t,r,s);return"mfaPendingCredential"in i&&kt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function $d(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?tc(n.config,s):`${n.config.apiScheme}://${s}`;return __.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class w_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Tt(this.auth,"network-request-failed")),v_.get())})}}function zs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Tt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function E_(n,e){return _r(n,"POST","/v1/accounts:delete",e)}async function mi(n,e){return _r(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function I_(n,e=!1){const t=bt(n),r=await t.getIdToken(e),s=rc(r);Z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Qr(Po(s.auth_time)),issuedAtTime:Qr(Po(s.iat)),expirationTime:Qr(Po(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Po(n){return Number(n)*1e3}function rc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ys("JWT malformed, contained fewer than 3 sections"),null;try{const s=Pd(t);return s?JSON.parse(s):(Ys("Failed to decode base64 JWT payload"),null)}catch(s){return Ys("Caught error parsing JWT payload as JSON",s?.toString()),null}}function rl(n){const e=rc(n);return Z(e,"internal-error"),Z(typeof e.exp<"u","internal-error"),Z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Nt&&A_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function A_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qr(this.lastLoginAt),this.creationTime=Qr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gi(n){const e=n.auth,t=await n.getIdToken(),r=await is(n,mi(e,{idToken:t}));Z(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?qd(s.providerUserInfo):[],o=P_(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!o?.length,l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new sa(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function S_(n){const e=bt(n);await gi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function P_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function qd(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function R_(n,e){const t=await jd(n,{},async()=>{const r=ps({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await $d(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&ms(n.emulatorConfig.host)&&(u.credentials="include"),Bd.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function C_(n,e){return _r(n,"POST","/v2/accounts:revokeToken",nc(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Z(e.idToken,"internal-error"),Z(typeof e.idToken<"u","internal-error"),Z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):rl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Z(e.length!==0,"internal-error");const t=rl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await R_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Zn;return r&&(Z(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Z(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Z(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Zn,this.toJSON())}_performRefresh(){return St("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(n,e){Z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ut{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new b_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new sa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await is(this,this.stsTokenManager.getToken(this.auth,e));return Z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return I_(this,e)}reload(){return S_(this)}_assign(e){this!==e&&(Z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ut({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await gi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(yt(this.auth.app))return Promise.reject(Pn(this.auth));const e=await this.getIdToken();return await is(this,E_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:b,providerData:V,stsTokenManager:D}=t;Z(p&&D,e,"internal-error");const P=Zn.fromJSON(this.name,D);Z(typeof p=="string",e,"internal-error"),qt(r,e.name),qt(s,e.name),Z(typeof g=="boolean",e,"internal-error"),Z(typeof b=="boolean",e,"internal-error"),qt(i,e.name),qt(o,e.name),qt(c,e.name),qt(u,e.name),qt(l,e.name),qt(d,e.name);const x=new ut({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:b,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:P,createdAt:l,lastLoginAt:d});return V&&Array.isArray(V)&&(x.providerData=V.map(B=>({...B}))),u&&(x._redirectEventId=u),x}static async _fromIdTokenResponse(e,t,r=!1){const s=new Zn;s.updateFromServerResponse(t);const i=new ut({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await gi(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];Z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?qd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Zn;c.updateFromIdToken(r);const u=new ut({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new sa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=new Map;function Pt(n){Dt(n instanceof Function,"Expected a class definition");let e=sl.get(n);return e?(Dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,sl.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}zd.type="NONE";const il=zd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(n,e,t){return`firebase:${n}:${e}:${t}`}class er{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Zs(this.userKey,s.apiKey,i),this.fullPersistenceKey=Zs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await mi(this.auth,{idToken:e}).catch(()=>{});return t?ut._fromGetAccountInfoResponse(this.auth,t,e):null}return ut._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new er(Pt(il),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Pt(il);const o=Zs(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let p;if(typeof d=="string"){const g=await mi(e,{idToken:d}).catch(()=>{});if(!g)break;p=await ut._fromGetAccountInfoResponse(e,g,d)}else p=ut._fromJSON(e,d);l!==i&&(c=p),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new er(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new er(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ol(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Hd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xd(e))return"Blackberry";if(Jd(e))return"Webos";if(Wd(e))return"Safari";if((e.includes("chrome/")||Kd(e))&&!e.includes("edge/"))return"Chrome";if(Qd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Hd(n=Qe()){return/firefox\//i.test(n)}function Wd(n=Qe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kd(n=Qe()){return/crios\//i.test(n)}function Gd(n=Qe()){return/iemobile/i.test(n)}function Qd(n=Qe()){return/android/i.test(n)}function Xd(n=Qe()){return/blackberry/i.test(n)}function Jd(n=Qe()){return/webos/i.test(n)}function sc(n=Qe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function V_(n=Qe()){return sc(n)&&!!window.navigator?.standalone}function k_(){return zg()&&document.documentMode===10}function Yd(n=Qe()){return sc(n)||Qd(n)||Jd(n)||Xd(n)||/windows phone/i.test(n)||Gd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(n,e=[]){let t;switch(n){case"Browser":t=ol(Qe());break;case"Worker":t=`${ol(Qe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${yr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M_(n,e={}){return _r(n,"GET","/v2/passwordPolicy",nc(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_=6;class O_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??x_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new al(this),this.idTokenSubscription=new al(this),this.beforeStateQueue=new D_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Pt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await er.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await mi(this,{idToken:e}),r=await ut._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(yt(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await gi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=g_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(yt(this.app))return Promise.reject(Pn(this));const t=e?bt(e):null;return t&&Z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return yt(this.app)?Promise.reject(Pn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return yt(this.app)?Promise.reject(Pn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await M_(this),t=new O_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new fs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await C_(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Pt(e)||this._popupRedirectResolver;Z(t,this,"argument-error"),this.redirectPersistenceManager=await er.create(this,[Pt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Z(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(yt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&f_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ic(n){return bt(n)}class al{constructor(e){this.auth=e,this.observer=null,this.addObserver=Yg(t=>this.observer=t)}get next(){return Z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function L_(n){oc=n}function F_(n){return oc.loadJS(n)}function U_(){return oc.gapiScript}function B_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(n,e){const t=Za(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Dn(i,e??{}))return s;kt(s,"already-initialized")}return t.initialize({options:e})}function $_(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Pt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function q_(n,e,t){const r=ic(n);Z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ef(e),{host:o,port:c}=z_(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Z(Dn(l,r.config.emulator)&&Dn(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,ms(o)?kd(`${i}//${o}${u}`):H_()}function ef(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function z_(n){const e=ef(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:cl(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:cl(o)}}}function cl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function H_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return St("not implemented")}_getIdTokenResponse(e){return St("not implemented")}_linkToIdToken(e,t){return St("not implemented")}_getReauthenticationResolver(e){return St("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(n,e){return T_(n,"POST","/v1/accounts:signInWithIdp",nc(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_="http://localhost";class xn extends tf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):kt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new xn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return tr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,tr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,tr(e,t)}buildRequest(){const e={requestUri:W_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ps(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys extends nf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends ys{constructor(){super("facebook.com")}static credential(e){return xn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends ys{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Kt.credential(t,r)}catch{return null}}}Kt.GOOGLE_SIGN_IN_METHOD="google.com";Kt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt extends ys{constructor(){super("github.com")}static credential(e){return xn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}}Gt.GITHUB_SIGN_IN_METHOD="github.com";Gt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends ys{constructor(){super("twitter.com")}static credential(e,t){return xn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Qt.credential(t,r)}catch{return null}}}Qt.TWITTER_SIGN_IN_METHOD="twitter.com";Qt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ut._fromIdTokenResponse(e,r,s),o=ul(r);return new ur({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ul(r);return new ur({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ul(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi extends Nt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,yi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new yi(e,t,r,s)}}function rf(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?yi._fromErrorAndOperation(n,i,e,r):i})}async function K_(n,e,t=!1){const r=await is(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ur._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(n,e,t=!1){const{auth:r}=n;if(yt(r.app))return Promise.reject(Pn(r));const s="reauthenticate";try{const i=await is(n,rf(r,s,e,n),t);Z(i.idToken,r,"internal-error");const o=rc(i.idToken);Z(o,r,"internal-error");const{sub:c}=o;return Z(n.uid===c,r,"user-mismatch"),ur._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&kt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q_(n,e,t=!1){if(yt(n.app))return Promise.reject(Pn(n));const r="signIn",s=await rf(n,r,e),i=await ur._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function X_(n,e,t,r){return bt(n).onIdTokenChanged(e,t,r)}function J_(n,e,t){return bt(n).beforeAuthStateChanged(e,t)}function yS(n,e,t,r){return bt(n).onAuthStateChanged(e,t,r)}const _i="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(_i,"1"),this.storage.removeItem(_i),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=1e3,Z_=10;class of extends sf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Yd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);k_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Z_):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Y_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}of.type="LOCAL";const ev=of;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af extends sf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}af.type="SESSION";const cf=af;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ui(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await tv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ui.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=ac("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(){return window}function rv(n){wt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(){return typeof wt().WorkerGlobalScope<"u"&&typeof wt().importScripts=="function"}async function sv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iv(){return navigator?.serviceWorker?.controller||null}function ov(){return uf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="firebaseLocalStorageDb",av=1,vi="firebaseLocalStorage",hf="fbase_key";class _s{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Bi(n,e){return n.transaction([vi],e?"readwrite":"readonly").objectStore(vi)}function cv(){const n=indexedDB.deleteDatabase(lf);return new _s(n).toPromise()}function df(){const n=indexedDB.open(lf,av);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(vi,{keyPath:hf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(vi)?e(r):(r.close(),await cv(),e(await df()))})})}async function ll(n,e,t){const r=Bi(n,!0).put({[hf]:e,value:t});return new _s(r).toPromise()}async function uv(n,e){const t=Bi(n,!1).get(e),r=await new _s(t).toPromise();return r===void 0?null:r.value}function hl(n,e){const t=Bi(n,!0).delete(e);return new _s(t).toPromise()}const lv=800,hv=3;class ff{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=df(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>hv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return uf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ui._getInstance(ov()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await sv(),!this.activeServiceWorker)return;this.sender=new nv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||iv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await ll(e,_i,"1"),await hl(e,_i)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ll(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>uv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>hl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Bi(s,!1).getAll();return new _s(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ff.type="LOCAL";const dv=ff;new gs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(n,e){return e?Pt(e):(Z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc extends tf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return tr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return tr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return tr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function pv(n){return Q_(n.auth,new cc(n),n.bypassAuthState)}function mv(n){const{auth:e,user:t}=n;return Z(t,e,"internal-error"),G_(t,new cc(n),n.bypassAuthState)}async function gv(n){const{auth:e,user:t}=n;return Z(t,e,"internal-error"),K_(t,new cc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pv;case"linkViaPopup":case"linkViaRedirect":return gv;case"reauthViaPopup":case"reauthViaRedirect":return mv;default:kt(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=new gs(2e3,1e4);class Qn extends pf{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Qn.currentPopupAction&&Qn.currentPopupAction.cancel(),Qn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Z(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=ac();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yv.get())};e()}}Qn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v="pendingRedirect",ei=new Map;class vv extends pf{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ei.get(this.auth._key());if(!e){try{const r=await Tv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ei.set(this.auth._key(),e)}return this.bypassAuthState||ei.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Tv(n,e){const t=Iv(e),r=Ev(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function wv(n,e){ei.set(n._key(),e)}function Ev(n){return Pt(n._redirectPersistence)}function Iv(n){return Zs(_v,n.config.apiKey,n.name)}async function Av(n,e,t=!1){if(yt(n.app))return Promise.reject(Pn(n));const r=ic(n),s=fv(r,e),o=await new vv(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv=600*1e3;class Sv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Pv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!mf(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Tt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bv&&this.cachedEventUids.clear(),this.cachedEventUids.has(dl(e))}saveEventToCache(e){this.cachedEventUids.add(dl(e)),this.lastProcessedEventTime=Date.now()}}function dl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function mf({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Pv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return mf(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rv(n,e={}){return _r(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Vv=/^https?/;async function kv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Rv(n);for(const t of e)try{if(Dv(t))return}catch{}kt(n,"unauthorized-domain")}function Dv(n){const e=ra(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Vv.test(t))return!1;if(Cv.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv=new gs(3e4,6e4);function fl(){const n=wt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xv(n){return new Promise((e,t)=>{function r(){fl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{fl(),t(Tt(n,"network-request-failed"))},timeout:Mv.get()})}if(wt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(wt().gapi?.load)r();else{const s=B_("iframefcb");return wt()[s]=()=>{gapi.load?r():t(Tt(n,"network-request-failed"))},F_(`${U_()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw ti=null,e})}let ti=null;function Ov(n){return ti=ti||xv(n),ti}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nv=new gs(5e3,15e3),Lv="__/auth/iframe",Fv="emulator/auth/iframe",Uv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Bv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jv(n){const e=n.config;Z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?tc(e,Fv):`https://${n.config.authDomain}/${Lv}`,r={apiKey:e.apiKey,appName:n.name,v:yr},s=Bv.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ps(r).slice(1)}`}async function $v(n){const e=await Ov(n),t=wt().gapi;return Z(t,n,"internal-error"),e.open({where:document.body,url:jv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Uv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Tt(n,"network-request-failed"),c=wt().setTimeout(()=>{i(o)},Nv.get());function u(){wt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zv=500,Hv=600,Wv="_blank",Kv="http://localhost";class pl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Gv(n,e,t,r=zv,s=Hv){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...qv,width:r.toString(),height:s.toString(),top:i,left:o},l=Qe().toLowerCase();t&&(c=Kd(l)?Wv:t),Hd(l)&&(e=e||Kv,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[b,V])=>`${g}${b}=${V},`,"");if(V_(l)&&c!=="_self")return Qv(e||"",c),new pl(null);const p=window.open(e||"",c,d);Z(p,n,"popup-blocked");try{p.focus()}catch{}return new pl(p)}function Qv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv="__/auth/handler",Jv="emulator/auth/handler",Yv=encodeURIComponent("fac");async function ml(n,e,t,r,s,i){Z(n.config.authDomain,n,"auth-domain-config-required"),Z(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:yr,eventId:s};if(e instanceof nf){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Jg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof ys){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${Yv}=${encodeURIComponent(u)}`:"";return`${Zv(n)}?${ps(c).slice(1)}${l}`}function Zv({config:n}){return n.emulator?tc(n,Jv):`https://${n.authDomain}/${Xv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro="webStorageSupport";class eT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cf,this._completeRedirectFn=Av,this._overrideRedirectResult=wv}async _openPopup(e,t,r,s){Dt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await ml(e,t,r,ra(),s);return Gv(e,i,ac())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await ml(e,t,r,ra(),s);return rv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Dt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await $v(e),r=new Sv(e);return t.register("authEvent",s=>(Z(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ro,{type:Ro},s=>{const i=s?.[0]?.[Ro];i!==void 0&&t(!!i),kt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Yd()||Wd()||sc()}}const tT=eT;var gl="@firebase/auth",yl="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sT(n){cr(new Mn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Z(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zd(n)},l=new N_(r,s,i,u);return $_(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),cr(new Mn("auth-internal",e=>{const t=ic(e.getProvider("auth").getImmediate());return(r=>new nT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),en(gl,yl,rT(n)),en(gl,yl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT=300,oT=Vd("authIdTokenMaxAge")||iT;let _l=null;const aT=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>oT)return;const s=t?.token;_l!==s&&(_l=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function _S(n=xd()){const e=Za(n,"auth");if(e.isInitialized())return e.getImmediate();const t=j_(n,{popupRedirectResolver:tT,persistence:[dv,ev,cf]}),r=Vd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=aT(i.toString());J_(t,o,()=>o(t.currentUser)),X_(t,c=>o(c))}}const s=Rd("auth");return s&&q_(t,`http://${s}`),t}function cT(){return document.getElementsByTagName("head")?.[0]??document}L_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Tt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",cT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sT("Browser");var vl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tn,gf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,y){function v(){}v.prototype=y.prototype,I.F=y.prototype,I.prototype=new v,I.prototype.constructor=I,I.D=function(w,E,S){for(var T=Array(arguments.length-2),le=2;le<arguments.length;le++)T[le-2]=arguments[le];return y.prototype[E].apply(w,T)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,y,v){v||(v=0);const w=Array(16);if(typeof y=="string")for(var E=0;E<16;++E)w[E]=y.charCodeAt(v++)|y.charCodeAt(v++)<<8|y.charCodeAt(v++)<<16|y.charCodeAt(v++)<<24;else for(E=0;E<16;++E)w[E]=y[v++]|y[v++]<<8|y[v++]<<16|y[v++]<<24;y=I.g[0],v=I.g[1],E=I.g[2];let S=I.g[3],T;T=y+(S^v&(E^S))+w[0]+3614090360&4294967295,y=v+(T<<7&4294967295|T>>>25),T=S+(E^y&(v^E))+w[1]+3905402710&4294967295,S=y+(T<<12&4294967295|T>>>20),T=E+(v^S&(y^v))+w[2]+606105819&4294967295,E=S+(T<<17&4294967295|T>>>15),T=v+(y^E&(S^y))+w[3]+3250441966&4294967295,v=E+(T<<22&4294967295|T>>>10),T=y+(S^v&(E^S))+w[4]+4118548399&4294967295,y=v+(T<<7&4294967295|T>>>25),T=S+(E^y&(v^E))+w[5]+1200080426&4294967295,S=y+(T<<12&4294967295|T>>>20),T=E+(v^S&(y^v))+w[6]+2821735955&4294967295,E=S+(T<<17&4294967295|T>>>15),T=v+(y^E&(S^y))+w[7]+4249261313&4294967295,v=E+(T<<22&4294967295|T>>>10),T=y+(S^v&(E^S))+w[8]+1770035416&4294967295,y=v+(T<<7&4294967295|T>>>25),T=S+(E^y&(v^E))+w[9]+2336552879&4294967295,S=y+(T<<12&4294967295|T>>>20),T=E+(v^S&(y^v))+w[10]+4294925233&4294967295,E=S+(T<<17&4294967295|T>>>15),T=v+(y^E&(S^y))+w[11]+2304563134&4294967295,v=E+(T<<22&4294967295|T>>>10),T=y+(S^v&(E^S))+w[12]+1804603682&4294967295,y=v+(T<<7&4294967295|T>>>25),T=S+(E^y&(v^E))+w[13]+4254626195&4294967295,S=y+(T<<12&4294967295|T>>>20),T=E+(v^S&(y^v))+w[14]+2792965006&4294967295,E=S+(T<<17&4294967295|T>>>15),T=v+(y^E&(S^y))+w[15]+1236535329&4294967295,v=E+(T<<22&4294967295|T>>>10),T=y+(E^S&(v^E))+w[1]+4129170786&4294967295,y=v+(T<<5&4294967295|T>>>27),T=S+(v^E&(y^v))+w[6]+3225465664&4294967295,S=y+(T<<9&4294967295|T>>>23),T=E+(y^v&(S^y))+w[11]+643717713&4294967295,E=S+(T<<14&4294967295|T>>>18),T=v+(S^y&(E^S))+w[0]+3921069994&4294967295,v=E+(T<<20&4294967295|T>>>12),T=y+(E^S&(v^E))+w[5]+3593408605&4294967295,y=v+(T<<5&4294967295|T>>>27),T=S+(v^E&(y^v))+w[10]+38016083&4294967295,S=y+(T<<9&4294967295|T>>>23),T=E+(y^v&(S^y))+w[15]+3634488961&4294967295,E=S+(T<<14&4294967295|T>>>18),T=v+(S^y&(E^S))+w[4]+3889429448&4294967295,v=E+(T<<20&4294967295|T>>>12),T=y+(E^S&(v^E))+w[9]+568446438&4294967295,y=v+(T<<5&4294967295|T>>>27),T=S+(v^E&(y^v))+w[14]+3275163606&4294967295,S=y+(T<<9&4294967295|T>>>23),T=E+(y^v&(S^y))+w[3]+4107603335&4294967295,E=S+(T<<14&4294967295|T>>>18),T=v+(S^y&(E^S))+w[8]+1163531501&4294967295,v=E+(T<<20&4294967295|T>>>12),T=y+(E^S&(v^E))+w[13]+2850285829&4294967295,y=v+(T<<5&4294967295|T>>>27),T=S+(v^E&(y^v))+w[2]+4243563512&4294967295,S=y+(T<<9&4294967295|T>>>23),T=E+(y^v&(S^y))+w[7]+1735328473&4294967295,E=S+(T<<14&4294967295|T>>>18),T=v+(S^y&(E^S))+w[12]+2368359562&4294967295,v=E+(T<<20&4294967295|T>>>12),T=y+(v^E^S)+w[5]+4294588738&4294967295,y=v+(T<<4&4294967295|T>>>28),T=S+(y^v^E)+w[8]+2272392833&4294967295,S=y+(T<<11&4294967295|T>>>21),T=E+(S^y^v)+w[11]+1839030562&4294967295,E=S+(T<<16&4294967295|T>>>16),T=v+(E^S^y)+w[14]+4259657740&4294967295,v=E+(T<<23&4294967295|T>>>9),T=y+(v^E^S)+w[1]+2763975236&4294967295,y=v+(T<<4&4294967295|T>>>28),T=S+(y^v^E)+w[4]+1272893353&4294967295,S=y+(T<<11&4294967295|T>>>21),T=E+(S^y^v)+w[7]+4139469664&4294967295,E=S+(T<<16&4294967295|T>>>16),T=v+(E^S^y)+w[10]+3200236656&4294967295,v=E+(T<<23&4294967295|T>>>9),T=y+(v^E^S)+w[13]+681279174&4294967295,y=v+(T<<4&4294967295|T>>>28),T=S+(y^v^E)+w[0]+3936430074&4294967295,S=y+(T<<11&4294967295|T>>>21),T=E+(S^y^v)+w[3]+3572445317&4294967295,E=S+(T<<16&4294967295|T>>>16),T=v+(E^S^y)+w[6]+76029189&4294967295,v=E+(T<<23&4294967295|T>>>9),T=y+(v^E^S)+w[9]+3654602809&4294967295,y=v+(T<<4&4294967295|T>>>28),T=S+(y^v^E)+w[12]+3873151461&4294967295,S=y+(T<<11&4294967295|T>>>21),T=E+(S^y^v)+w[15]+530742520&4294967295,E=S+(T<<16&4294967295|T>>>16),T=v+(E^S^y)+w[2]+3299628645&4294967295,v=E+(T<<23&4294967295|T>>>9),T=y+(E^(v|~S))+w[0]+4096336452&4294967295,y=v+(T<<6&4294967295|T>>>26),T=S+(v^(y|~E))+w[7]+1126891415&4294967295,S=y+(T<<10&4294967295|T>>>22),T=E+(y^(S|~v))+w[14]+2878612391&4294967295,E=S+(T<<15&4294967295|T>>>17),T=v+(S^(E|~y))+w[5]+4237533241&4294967295,v=E+(T<<21&4294967295|T>>>11),T=y+(E^(v|~S))+w[12]+1700485571&4294967295,y=v+(T<<6&4294967295|T>>>26),T=S+(v^(y|~E))+w[3]+2399980690&4294967295,S=y+(T<<10&4294967295|T>>>22),T=E+(y^(S|~v))+w[10]+4293915773&4294967295,E=S+(T<<15&4294967295|T>>>17),T=v+(S^(E|~y))+w[1]+2240044497&4294967295,v=E+(T<<21&4294967295|T>>>11),T=y+(E^(v|~S))+w[8]+1873313359&4294967295,y=v+(T<<6&4294967295|T>>>26),T=S+(v^(y|~E))+w[15]+4264355552&4294967295,S=y+(T<<10&4294967295|T>>>22),T=E+(y^(S|~v))+w[6]+2734768916&4294967295,E=S+(T<<15&4294967295|T>>>17),T=v+(S^(E|~y))+w[13]+1309151649&4294967295,v=E+(T<<21&4294967295|T>>>11),T=y+(E^(v|~S))+w[4]+4149444226&4294967295,y=v+(T<<6&4294967295|T>>>26),T=S+(v^(y|~E))+w[11]+3174756917&4294967295,S=y+(T<<10&4294967295|T>>>22),T=E+(y^(S|~v))+w[2]+718787259&4294967295,E=S+(T<<15&4294967295|T>>>17),T=v+(S^(E|~y))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+y&4294967295,I.g[1]=I.g[1]+(E+(T<<21&4294967295|T>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+S&4294967295}r.prototype.v=function(I,y){y===void 0&&(y=I.length);const v=y-this.blockSize,w=this.C;let E=this.h,S=0;for(;S<y;){if(E==0)for(;S<=v;)s(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<y;)if(w[E++]=I.charCodeAt(S++),E==this.blockSize){s(this,w),E=0;break}}else for(;S<y;)if(w[E++]=I[S++],E==this.blockSize){s(this,w),E=0;break}}this.h=E,this.o+=y},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var y=1;y<I.length-8;++y)I[y]=0;y=this.o*8;for(var v=I.length-8;v<I.length;++v)I[v]=y&255,y/=256;for(this.v(I),I=Array(16),y=0,v=0;v<4;++v)for(let w=0;w<32;w+=8)I[y++]=this.g[v]>>>w&255;return I};function i(I,y){var v=c;return Object.prototype.hasOwnProperty.call(v,I)?v[I]:v[I]=y(I)}function o(I,y){this.h=y;const v=[];let w=!0;for(let E=I.length-1;E>=0;E--){const S=I[E]|0;w&&S==y||(v[E]=S,w=!1)}this.g=v}var c={};function u(I){return-128<=I&&I<128?i(I,function(y){return new o([y|0],y<0?-1:0)}):new o([I|0],I<0?-1:0)}function l(I){if(isNaN(I)||!isFinite(I))return p;if(I<0)return P(l(-I));const y=[];let v=1;for(let w=0;I>=v;w++)y[w]=I/v|0,v*=4294967296;return new o(y,0)}function d(I,y){if(I.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(I.charAt(0)=="-")return P(d(I.substring(1),y));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const v=l(Math.pow(y,8));let w=p;for(let S=0;S<I.length;S+=8){var E=Math.min(8,I.length-S);const T=parseInt(I.substring(S,S+E),y);E<8?(E=l(Math.pow(y,E)),w=w.j(E).add(l(T))):(w=w.j(v),w=w.add(l(T)))}return w}var p=u(0),g=u(1),b=u(16777216);n=o.prototype,n.m=function(){if(D(this))return-P(this).m();let I=0,y=1;for(let v=0;v<this.g.length;v++){const w=this.i(v);I+=(w>=0?w:4294967296+w)*y,y*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(V(this))return"0";if(D(this))return"-"+P(this).toString(I);const y=l(Math.pow(I,6));var v=this;let w="";for(;;){const E=N(v,y).g;v=x(v,E.j(y));let S=((v.g.length>0?v.g[0]:v.h)>>>0).toString(I);if(v=E,V(v))return S+w;for(;S.length<6;)S="0"+S;w=S+w}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function V(I){if(I.h!=0)return!1;for(let y=0;y<I.g.length;y++)if(I.g[y]!=0)return!1;return!0}function D(I){return I.h==-1}n.l=function(I){return I=x(this,I),D(I)?-1:V(I)?0:1};function P(I){const y=I.g.length,v=[];for(let w=0;w<y;w++)v[w]=~I.g[w];return new o(v,~I.h).add(g)}n.abs=function(){return D(this)?P(this):this},n.add=function(I){const y=Math.max(this.g.length,I.g.length),v=[];let w=0;for(let E=0;E<=y;E++){let S=w+(this.i(E)&65535)+(I.i(E)&65535),T=(S>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=T>>>16,S&=65535,T&=65535,v[E]=T<<16|S}return new o(v,v[v.length-1]&-2147483648?-1:0)};function x(I,y){return I.add(P(y))}n.j=function(I){if(V(this)||V(I))return p;if(D(this))return D(I)?P(this).j(P(I)):P(P(this).j(I));if(D(I))return P(this.j(P(I)));if(this.l(b)<0&&I.l(b)<0)return l(this.m()*I.m());const y=this.g.length+I.g.length,v=[];for(var w=0;w<2*y;w++)v[w]=0;for(w=0;w<this.g.length;w++)for(let E=0;E<I.g.length;E++){const S=this.i(w)>>>16,T=this.i(w)&65535,le=I.i(E)>>>16,pe=I.i(E)&65535;v[2*w+2*E]+=T*pe,B(v,2*w+2*E),v[2*w+2*E+1]+=S*pe,B(v,2*w+2*E+1),v[2*w+2*E+1]+=T*le,B(v,2*w+2*E+1),v[2*w+2*E+2]+=S*le,B(v,2*w+2*E+2)}for(I=0;I<y;I++)v[I]=v[2*I+1]<<16|v[2*I];for(I=y;I<2*y;I++)v[I]=0;return new o(v,0)};function B(I,y){for(;(I[y]&65535)!=I[y];)I[y+1]+=I[y]>>>16,I[y]&=65535,y++}function O(I,y){this.g=I,this.h=y}function N(I,y){if(V(y))throw Error("division by zero");if(V(I))return new O(p,p);if(D(I))return y=N(P(I),y),new O(P(y.g),P(y.h));if(D(y))return y=N(I,P(y)),new O(P(y.g),y.h);if(I.g.length>30){if(D(I)||D(y))throw Error("slowDivide_ only works with positive integers.");for(var v=g,w=y;w.l(I)<=0;)v=$(v),w=$(w);var E=K(v,1),S=K(w,1);for(w=K(w,2),v=K(v,2);!V(w);){var T=S.add(w);T.l(I)<=0&&(E=E.add(v),S=T),w=K(w,1),v=K(v,1)}return y=x(I,E.j(y)),new O(E,y)}for(E=p;I.l(y)>=0;){for(v=Math.max(1,Math.floor(I.m()/y.m())),w=Math.ceil(Math.log(v)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),S=l(v),T=S.j(y);D(T)||T.l(I)>0;)v-=w,S=l(v),T=S.j(y);V(S)&&(S=g),E=E.add(S),I=x(I,T)}return new O(E,I)}n.B=function(I){return N(this,I).h},n.and=function(I){const y=Math.max(this.g.length,I.g.length),v=[];for(let w=0;w<y;w++)v[w]=this.i(w)&I.i(w);return new o(v,this.h&I.h)},n.or=function(I){const y=Math.max(this.g.length,I.g.length),v=[];for(let w=0;w<y;w++)v[w]=this.i(w)|I.i(w);return new o(v,this.h|I.h)},n.xor=function(I){const y=Math.max(this.g.length,I.g.length),v=[];for(let w=0;w<y;w++)v[w]=this.i(w)^I.i(w);return new o(v,this.h^I.h)};function $(I){const y=I.g.length+1,v=[];for(let w=0;w<y;w++)v[w]=I.i(w)<<1|I.i(w-1)>>>31;return new o(v,I.h)}function K(I,y){const v=y>>5;y%=32;const w=I.g.length-v,E=[];for(let S=0;S<w;S++)E[S]=y>0?I.i(S+v)>>>y|I.i(S+v+1)<<32-y:I.i(S+v);return new o(E,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,gf=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,tn=o}).apply(typeof vl<"u"?vl:typeof self<"u"?self:typeof window<"u"?window:{});var Hs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yf,zr,_f,ni,ia,vf,Tf,wf;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Hs=="object"&&Hs];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var C=a[m];if(!(C in f))break e;f=f[C]}a=a[a.length-1],m=f[a],h=h(m),h!=m&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var f=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&f.push([m,h[m]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function l(a,h,f){return l=u,l.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(m,C,k){for(var U=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)U[oe-2]=arguments[oe];return h.prototype[C].apply(m,U)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function b(a){const h=a.length;if(h>0){const f=Array(h);for(let m=0;m<h;m++)f[m]=a[m];return f}return[]}function V(a,h){for(let m=1;m<arguments.length;m++){const C=arguments[m];var f=typeof C;if(f=f!="object"?f:C?Array.isArray(C)?"array":f:"null",f=="array"||f=="object"&&typeof C.length=="number"){f=a.length||0;const k=C.length||0;a.length=f+k;for(let U=0;U<k;U++)a[f+U]=C[U]}else a.push(C)}}class D{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function P(a){o.setTimeout(()=>{throw a},0)}function x(){var a=I;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class B{constructor(){this.h=this.g=null}add(h,f){const m=O.get();m.set(h,f),this.h?this.h.next=m:this.g=m,this.h=m}}var O=new D(()=>new N,a=>a.reset());class N{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let $,K=!1,I=new B,y=()=>{const a=Promise.resolve(void 0);$=()=>{a.then(v)}};function v(){for(var a;a=x();){try{a.h.call(a.g)}catch(f){P(f)}var h=O;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}K=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a})();function T(a){return/^[\s\xa0]*$/.test(a)}function le(a,h){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(le,E),le.prototype.init=function(a,h){const f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&le.Z.h.call(this)},le.prototype.h=function(){le.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var pe="closure_listenable_"+(Math.random()*1e6|0),F=0;function ne(a,h,f,m,C){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!m,this.ha=C,this.key=++F,this.da=this.fa=!1}function z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function re(a,h,f){for(const m in a)h.call(f,a[m],m,a)}function R(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function A(a){const h={};for(const f in a)h[f]=a[f];return h}const H="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function G(a,h){let f,m;for(let C=1;C<arguments.length;C++){m=arguments[C];for(f in m)a[f]=m[f];for(let k=0;k<H.length;k++)f=H[k],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function Q(a){this.src=a,this.g={},this.h=0}Q.prototype.add=function(a,h,f,m,C){const k=a.toString();a=this.g[k],a||(a=this.g[k]=[],this.h++);const U=se(a,h,m,C);return U>-1?(h=a[U],f||(h.fa=!1)):(h=new ne(h,this.src,k,!!m,C),h.fa=f,a.push(h)),h};function Y(a,h){const f=h.type;if(f in a.g){var m=a.g[f],C=Array.prototype.indexOf.call(m,h,void 0),k;(k=C>=0)&&Array.prototype.splice.call(m,C,1),k&&(z(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function se(a,h,f,m){for(let C=0;C<a.length;++C){const k=a[C];if(!k.da&&k.listener==h&&k.capture==!!f&&k.ha==m)return C}return-1}var X="closure_lm_"+(Math.random()*1e6|0),ie={};function me(a,h,f,m,C){if(Array.isArray(h)){for(let k=0;k<h.length;k++)me(a,h[k],f,m,C);return null}return f=it(f),a&&a[pe]?a.J(h,f,c(m)?!!m.capture:!1,C):we(a,h,f,!1,m,C)}function we(a,h,f,m,C,k){if(!h)throw Error("Invalid event type");const U=c(C)?!!C.capture:!!C;let oe=Xe(a);if(oe||(a[X]=oe=new Q(a)),f=oe.add(h,f,m,U,k),f.proxy)return f;if(m=ge(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)S||(C=U),C===void 0&&(C=!1),a.addEventListener(h.toString(),m,C);else if(a.attachEvent)a.attachEvent(ae(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function ge(){function a(f){return h.call(a.src,a.listener,f)}const h=qe;return a}function ve(a,h,f,m,C){if(Array.isArray(h))for(var k=0;k<h.length;k++)ve(a,h[k],f,m,C);else m=c(m)?!!m.capture:!!m,f=it(f),a&&a[pe]?(a=a.i,k=String(h).toString(),k in a.g&&(h=a.g[k],f=se(h,f,m,C),f>-1&&(z(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[k],a.h--)))):a&&(a=Xe(a))&&(h=a.g[h.toString()],a=-1,h&&(a=se(h,f,m,C)),(f=a>-1?h[a]:null)&&Re(f))}function Re(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[pe])Y(h.i,a);else{var f=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(f,m,a.capture):h.detachEvent?h.detachEvent(ae(f),m):h.addListener&&h.removeListener&&h.removeListener(m),(f=Xe(h))?(Y(f,a),f.h==0&&(f.src=null,h[X]=null)):z(a)}}}function ae(a){return a in ie?ie[a]:ie[a]="on"+a}function qe(a,h){if(a.da)a=!0;else{h=new le(h,this);const f=a.listener,m=a.ha||a.src;a.fa&&Re(a),a=f.call(m,h)}return a}function Xe(a){return a=a[X],a instanceof Q?a:null}var Je="__closure_events_fn_"+(Math.random()*1e9>>>0);function it(a){return typeof a=="function"?a:(a[Je]||(a[Je]=function(h){return a.handleEvent(h)}),a[Je])}function Ee(){w.call(this),this.i=new Q(this),this.M=this,this.G=null}p(Ee,w),Ee.prototype[pe]=!0,Ee.prototype.removeEventListener=function(a,h,f,m){ve(this,a,h,f,m)};function _e(a,h){var f,m=a.G;if(m)for(f=[];m;m=m.G)f.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new E(h,a);else if(h instanceof E)h.target=h.target||a;else{var C=h;h=new E(m,a),G(h,C)}C=!0;let k,U;if(f)for(U=f.length-1;U>=0;U--)k=h.g=f[U],C=Un(k,m,!0,h)&&C;if(k=h.g=a,C=Un(k,m,!0,h)&&C,C=Un(k,m,!1,h)&&C,f)for(U=0;U<f.length;U++)k=h.g=f[U],C=Un(k,m,!1,h)&&C}Ee.prototype.N=function(){if(Ee.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let m=0;m<f.length;m++)z(f[m]);delete a.g[h],a.h--}}this.G=null},Ee.prototype.J=function(a,h,f,m){return this.i.add(String(a),h,!1,f,m)},Ee.prototype.K=function(a,h,f,m){return this.i.add(String(a),h,!0,f,m)};function Un(a,h,f,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let C=!0;for(let k=0;k<h.length;++k){const U=h[k];if(U&&!U.da&&U.capture==f){const oe=U.listener,Oe=U.ha||U.src;U.fa&&Y(a.i,U),C=oe.call(Oe,m)!==!1&&C}}return C&&!m.defaultPrevented}function no(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Ps(a){a.g=no(()=>{a.g=null,a.i&&(a.i=!1,Ps(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Rs extends w{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Ps(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pn(a){w.call(this),this.h=a,this.g={}}p(pn,w);var br=[];function Cs(a){re(a.g,function(h,f){this.g.hasOwnProperty(f)&&Re(h)},a),a.g={}}pn.prototype.N=function(){pn.Z.N.call(this),Cs(this)},pn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Sr=o.JSON.stringify,Vs=o.JSON.parse,ks=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Bn(){}function Ds(){}var mn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ro(){E.call(this,"d")}p(ro,E);function so(){E.call(this,"c")}p(so,E);var gn={},eu=null;function Ms(){return eu=eu||new Ee}gn.Ia="serverreachability";function tu(a){E.call(this,gn.Ia,a)}p(tu,E);function Pr(a){const h=Ms();_e(h,new tu(h))}gn.STAT_EVENT="statevent";function nu(a,h){E.call(this,gn.STAT_EVENT,a),this.stat=h}p(nu,E);function Ye(a){const h=Ms();_e(h,new nu(h,a))}gn.Ja="timingevent";function ru(a,h){E.call(this,gn.Ja,a),this.size=h}p(ru,E);function Rr(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Cr(){this.g=!0}Cr.prototype.ua=function(){this.g=!1};function ng(a,h,f,m,C,k){a.info(function(){if(a.g)if(k){var U="",oe=k.split("&");for(let ye=0;ye<oe.length;ye++){var Oe=oe[ye].split("=");if(Oe.length>1){const Fe=Oe[0];Oe=Oe[1];const pt=Fe.split("_");U=pt.length>=2&&pt[1]=="type"?U+(Fe+"="+Oe+"&"):U+(Fe+"=redacted&")}}}else U=null;else U=k;return"XMLHTTP REQ ("+m+") [attempt "+C+"]: "+h+`
`+f+`
`+U})}function rg(a,h,f,m,C,k,U){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+C+"]: "+h+`
`+f+`
`+k+" "+U})}function jn(a,h,f,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+ig(a,f)+(m?" "+m:"")})}function sg(a,h){a.info(function(){return"TIMEOUT: "+h})}Cr.prototype.info=function(){};function ig(a,h){if(!a.g)return h;if(!h)return null;try{const k=JSON.parse(h);if(k){for(a=0;a<k.length;a++)if(Array.isArray(k[a])){var f=k[a];if(!(f.length<2)){var m=f[1];if(Array.isArray(m)&&!(m.length<1)){var C=m[0];if(C!="noop"&&C!="stop"&&C!="close")for(let U=1;U<m.length;U++)m[U]=""}}}}return Sr(k)}catch{return h}}var xs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},su={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},iu;function io(){}p(io,Bn),io.prototype.g=function(){return new XMLHttpRequest},iu=new io;function Vr(a){return encodeURIComponent(String(a))}function og(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function Lt(a,h,f,m){this.j=a,this.i=h,this.l=f,this.S=m||1,this.V=new pn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ou}function ou(){this.i=null,this.g="",this.h=!1}var au={},oo={};function ao(a,h,f){a.M=1,a.A=Ns(ft(h)),a.u=f,a.R=!0,cu(a,null)}function cu(a,h){a.F=Date.now(),Os(a),a.B=ft(a.A);var f=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),wu(f.i,"t",m),a.C=0,f=a.j.L,a.h=new ou,a.g=Uu(a.j,f?h:null,!a.u),a.P>0&&(a.O=new Rs(l(a.Y,a,a.g),a.P)),h=a.V,f=a.g,m=a.ba;var C="readystatechange";Array.isArray(C)||(C&&(br[0]=C.toString()),C=br);for(let k=0;k<C.length;k++){const U=me(f,C[k],m||h.handleEvent,!1,h.h||h);if(!U)break;h.g[U.key]=U}h=a.J?A(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Pr(),ng(a.i,a.v,a.B,a.l,a.S,a.u)}Lt.prototype.ba=function(a){a=a.target;const h=this.O;h&&Bt(a)==3?h.j():this.Y(a)},Lt.prototype.Y=function(a){try{if(a==this.g)e:{const oe=Bt(this.g),Oe=this.g.ya(),ye=this.g.ca();if(!(oe<3)&&(oe!=3||this.g&&(this.h.h||this.g.la()||Ru(this.g)))){this.K||oe!=4||Oe==7||(Oe==8||ye<=0?Pr(3):Pr(2)),co(this);var h=this.g.ca();this.X=h;var f=ag(this);if(this.o=h==200,rg(this.i,this.v,this.B,this.l,this.S,oe,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,C=this.g;if((m=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(m)){var k=m;break t}}k=null}if(a=k)jn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,uo(this,a);else{this.o=!1,this.m=3,Ye(12),yn(this),kr(this);break e}}if(this.R){a=!0;let Fe;for(;!this.K&&this.C<f.length;)if(Fe=cg(this,f),Fe==oo){oe==4&&(this.m=4,Ye(14),a=!1),jn(this.i,this.l,null,"[Incomplete Response]");break}else if(Fe==au){this.m=4,Ye(15),jn(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else jn(this.i,this.l,Fe,null),uo(this,Fe);if(uu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),oe!=4||f.length!=0||this.h.h||(this.m=1,Ye(16),a=!1),this.o=this.o&&a,!a)jn(this.i,this.l,f,"[Invalid Chunked Response]"),yn(this),kr(this);else if(f.length>0&&!this.W){this.W=!0;var U=this.j;U.g==this&&U.aa&&!U.P&&(U.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),_o(U),U.P=!0,Ye(11))}}else jn(this.i,this.l,f,null),uo(this,f);oe==4&&yn(this),this.o&&!this.K&&(oe==4?Ou(this.j,this):(this.o=!1,Os(this)))}else Eg(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,Ye(12)):(this.m=0,Ye(13)),yn(this),kr(this)}}}catch{}finally{}};function ag(a){if(!uu(a))return a.g.la();const h=Ru(a.g);if(h==="")return"";let f="";const m=h.length,C=Bt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return yn(a),kr(a),"";a.h.i=new o.TextDecoder}for(let k=0;k<m;k++)a.h.h=!0,f+=a.h.i.decode(h[k],{stream:!(C&&k==m-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function uu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function cg(a,h){var f=a.C,m=h.indexOf(`
`,f);return m==-1?oo:(f=Number(h.substring(f,m)),isNaN(f)?au:(m+=1,m+f>h.length?oo:(h=h.slice(m,m+f),a.C=m+f,h)))}Lt.prototype.cancel=function(){this.K=!0,yn(this)};function Os(a){a.T=Date.now()+a.H,lu(a,a.H)}function lu(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Rr(l(a.aa,a),h)}function co(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Lt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(sg(this.i,this.B),this.M!=2&&(Pr(),Ye(17)),yn(this),this.m=2,kr(this)):lu(this,this.T-a)};function kr(a){a.j.I==0||a.K||Ou(a.j,a)}function yn(a){co(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Cs(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function uo(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||lo(f.h,a))){if(!a.L&&lo(f.h,a)&&f.I==3){try{var m=f.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var C=m;if(C[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)js(f),Us(f);else break e;yo(f),Ye(18)}}else f.xa=C[1],0<f.xa-f.K&&C[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Rr(l(f.Va,f),6e3));fu(f.h)<=1&&f.ta&&(f.ta=void 0)}else vn(f,11)}else if((a.L||f.g==a)&&js(f),!T(h))for(C=f.Ba.g.parse(h),h=0;h<C.length;h++){let ye=C[h];const Fe=ye[0];if(!(Fe<=f.K))if(f.K=Fe,ye=ye[1],f.I==2)if(ye[0]=="c"){f.M=ye[1],f.ba=ye[2];const pt=ye[3];pt!=null&&(f.ka=pt,f.j.info("VER="+f.ka));const Tn=ye[4];Tn!=null&&(f.za=Tn,f.j.info("SVER="+f.za));const jt=ye[5];jt!=null&&typeof jt=="number"&&jt>0&&(m=1.5*jt,f.O=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const $t=a.g;if($t){const qs=$t.g?$t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(qs){var k=m.h;k.g||qs.indexOf("spdy")==-1&&qs.indexOf("quic")==-1&&qs.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(ho(k,k.h),k.h=null))}if(m.G){const vo=$t.g?$t.g.getResponseHeader("X-HTTP-Session-Id"):null;vo&&(m.wa=vo,Te(m.J,m.G,vo))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),m=f;var U=a;if(m.na=Fu(m,m.L?m.ba:null,m.W),U.L){pu(m.h,U);var oe=U,Oe=m.O;Oe&&(oe.H=Oe),oe.D&&(co(oe),Os(oe)),m.g=U}else Mu(m);f.i.length>0&&Bs(f)}else ye[0]!="stop"&&ye[0]!="close"||vn(f,7);else f.I==3&&(ye[0]=="stop"||ye[0]=="close"?ye[0]=="stop"?vn(f,7):go(f):ye[0]!="noop"&&f.l&&f.l.qa(ye),f.A=0)}}Pr(4)}catch{}}var ug=class{constructor(a,h){this.g=a,this.map=h}};function hu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function du(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function fu(a){return a.h?1:a.g?a.g.size:0}function lo(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function ho(a,h){a.g?a.g.add(h):a.h=h}function pu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}hu.prototype.cancel=function(){if(this.i=mu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function mu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return b(a.i)}var gu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function lg(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const m=a[f].indexOf("=");let C,k=null;m>=0?(C=a[f].substring(0,m),k=a[f].substring(m+1)):C=a[f],h(C,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function Ft(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Ft?(this.l=a.l,Dr(this,a.j),this.o=a.o,this.g=a.g,Mr(this,a.u),this.h=a.h,fo(this,Eu(a.i)),this.m=a.m):a&&(h=String(a).match(gu))?(this.l=!1,Dr(this,h[1]||"",!0),this.o=xr(h[2]||""),this.g=xr(h[3]||"",!0),Mr(this,h[4]),this.h=xr(h[5]||"",!0),fo(this,h[6]||"",!0),this.m=xr(h[7]||"")):(this.l=!1,this.i=new Nr(null,this.l))}Ft.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Or(h,yu,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Or(h,yu,!0),"@"),a.push(Vr(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Or(f,f.charAt(0)=="/"?fg:dg,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Or(f,mg)),a.join("")},Ft.prototype.resolve=function(a){const h=ft(this);let f=!!a.j;f?Dr(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var m=a.h;if(f)Mr(h,a.u);else if(f=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var C=h.h.lastIndexOf("/");C!=-1&&(m=h.h.slice(0,C+1)+m)}if(C=m,C==".."||C==".")m="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){m=C.lastIndexOf("/",0)==0,C=C.split("/");const k=[];for(let U=0;U<C.length;){const oe=C[U++];oe=="."?m&&U==C.length&&k.push(""):oe==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),m&&U==C.length&&k.push("")):(k.push(oe),m=!0)}m=k.join("/")}else m=C}return f?h.h=m:f=a.i.toString()!=="",f?fo(h,Eu(a.i)):f=!!a.m,f&&(h.m=a.m),h};function ft(a){return new Ft(a)}function Dr(a,h,f){a.j=f?xr(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Mr(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function fo(a,h,f){h instanceof Nr?(a.i=h,gg(a.i,a.l)):(f||(h=Or(h,pg)),a.i=new Nr(h,a.l))}function Te(a,h,f){a.i.set(h,f)}function Ns(a){return Te(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function xr(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Or(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,hg),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function hg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var yu=/[#\/\?@]/g,dg=/[#\?:]/g,fg=/[#\?]/g,pg=/[#\?@]/g,mg=/#/g;function Nr(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function _n(a){a.g||(a.g=new Map,a.h=0,a.i&&lg(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=Nr.prototype,n.add=function(a,h){_n(this),this.i=null,a=$n(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function _u(a,h){_n(a),h=$n(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function vu(a,h){return _n(a),h=$n(a,h),a.g.has(h)}n.forEach=function(a,h){_n(this),this.g.forEach(function(f,m){f.forEach(function(C){a.call(h,C,m,this)},this)},this)};function Tu(a,h){_n(a);let f=[];if(typeof h=="string")vu(a,h)&&(f=f.concat(a.g.get($n(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return _n(this),this.i=null,a=$n(this,a),vu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=Tu(this,a),a.length>0?String(a[0]):h):h};function wu(a,h,f){_u(a,h),f.length>0&&(a.i=null,a.g.set($n(a,h),b(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var f=h[m];const C=Vr(f);f=Tu(this,f);for(let k=0;k<f.length;k++){let U=C;f[k]!==""&&(U+="="+Vr(f[k])),a.push(U)}}return this.i=a.join("&")};function Eu(a){const h=new Nr;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function $n(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function gg(a,h){h&&!a.j&&(_n(a),a.i=null,a.g.forEach(function(f,m){const C=m.toLowerCase();m!=C&&(_u(this,m),wu(this,C,f))},a)),a.j=h}function yg(a,h){const f=new Cr;if(o.Image){const m=new Image;m.onload=d(Ut,f,"TestLoadImage: loaded",!0,h,m),m.onerror=d(Ut,f,"TestLoadImage: error",!1,h,m),m.onabort=d(Ut,f,"TestLoadImage: abort",!1,h,m),m.ontimeout=d(Ut,f,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function _g(a,h){const f=new Cr,m=new AbortController,C=setTimeout(()=>{m.abort(),Ut(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(k=>{clearTimeout(C),k.ok?Ut(f,"TestPingServer: ok",!0,h):Ut(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(C),Ut(f,"TestPingServer: error",!1,h)})}function Ut(a,h,f,m,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),m(f)}catch{}}function vg(){this.g=new ks}function po(a){this.i=a.Sb||null,this.h=a.ab||!1}p(po,Bn),po.prototype.g=function(){return new Ls(this.i,this.h)};function Ls(a,h){Ee.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ls,Ee),n=Ls.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Fr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Lr(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Fr(this)),this.g&&(this.readyState=3,Fr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Iu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Iu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Lr(this):Fr(this),this.readyState==3&&Iu(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Lr(this))},n.Na=function(a){this.g&&(this.response=a,Lr(this))},n.ga=function(){this.g&&Lr(this)};function Lr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Fr(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function Fr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ls.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Au(a){let h="";return re(a,function(f,m){h+=m,h+=":",h+=f,h+=`\r
`}),h}function mo(a,h,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=Au(f),typeof a=="string"?f!=null&&Vr(f):Te(a,h,f))}function be(a){Ee.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(be,Ee);var Tg=/^https?$/i,wg=["POST","PUT"];n=be.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():iu.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(k){bu(this,k);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var C in m)f.set(C,m[C]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const k of m.keys())f.set(k,m.get(k));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(k=>k.toLowerCase()=="content-type"),C=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(wg,h,void 0)>=0)||m||C||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,U]of f)this.g.setRequestHeader(k,U);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(k){bu(this,k)}};function bu(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Su(a),Fs(a)}function Su(a){a.A||(a.A=!0,_e(a,"complete"),_e(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,_e(this,"complete"),_e(this,"abort"),Fs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Fs(this,!0)),be.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Pu(this):this.Xa())},n.Xa=function(){Pu(this)};function Pu(a){if(a.h&&typeof i<"u"){if(a.v&&Bt(a)==4)setTimeout(a.Ca.bind(a),0);else if(_e(a,"readystatechange"),Bt(a)==4){a.h=!1;try{const k=a.ca();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var m;if(m=k===0){let U=String(a.D).match(gu)[1]||null;!U&&o.self&&o.self.location&&(U=o.self.location.protocol.slice(0,-1)),m=!Tg.test(U?U.toLowerCase():"")}f=m}if(f)_e(a,"complete"),_e(a,"success");else{a.o=6;try{var C=Bt(a)>2?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.ca()+"]",Su(a)}}finally{Fs(a)}}}}function Fs(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||_e(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Bt(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Bt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Vs(h)}};function Ru(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Eg(a){const h={};a=(a.g&&Bt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(T(a[m]))continue;var f=og(a[m]);const C=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const k=h[C]||[];h[C]=k,k.push(f)}R(h,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ur(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Cu(a){this.za=0,this.i=[],this.j=new Cr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ur("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ur("baseRetryDelayMs",5e3,a),this.Za=Ur("retryDelaySeedMs",1e4,a),this.Ta=Ur("forwardChannelMaxRetries",2,a),this.va=Ur("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new hu(a&&a.concurrentRequestLimit),this.Ba=new vg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Cu.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,m){Ye(0),this.W=a,this.H=h||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.J=Fu(this,null,this.W),Bs(this)};function go(a){if(Vu(a),a.I==3){var h=a.V++,f=ft(a.J);if(Te(f,"SID",a.M),Te(f,"RID",h),Te(f,"TYPE","terminate"),Br(a,f),h=new Lt(a,a.j,h),h.M=2,h.A=Ns(ft(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=Uu(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Os(h)}Lu(a)}function Us(a){a.g&&(_o(a),a.g.cancel(),a.g=null)}function Vu(a){Us(a),a.v&&(o.clearTimeout(a.v),a.v=null),js(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Bs(a){if(!du(a.h)&&!a.m){a.m=!0;var h=a.Ea;$||y(),K||($(),K=!0),I.add(h,a),a.D=0}}function Ig(a,h){return fu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Rr(l(a.Ea,a,h),Nu(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const C=new Lt(this,this.j,a);let k=this.o;if(this.U&&(k?(k=A(k),G(k,this.U)):k=this.U),this.u!==null||this.R||(C.J=k,k=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Du(this,C,h),f=ft(this.J),Te(f,"RID",a),Te(f,"CVER",22),this.G&&Te(f,"X-HTTP-Session-Id",this.G),Br(this,f),k&&(this.R?h="headers="+Vr(Au(k))+"&"+h:this.u&&mo(f,this.u,k)),ho(this.h,C),this.Ra&&Te(f,"TYPE","init"),this.S?(Te(f,"$req",h),Te(f,"SID","null"),C.U=!0,ao(C,f,null)):ao(C,f,h),this.I=2}}else this.I==3&&(a?ku(this,a):this.i.length==0||du(this.h)||ku(this))};function ku(a,h){var f;h?f=h.l:f=a.V++;const m=ft(a.J);Te(m,"SID",a.M),Te(m,"RID",f),Te(m,"AID",a.K),Br(a,m),a.u&&a.o&&mo(m,a.u,a.o),f=new Lt(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Du(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ho(a.h,f),ao(f,m,h)}function Br(a,h){a.H&&re(a.H,function(f,m){Te(h,m,f)}),a.l&&re({},function(f,m){Te(h,m,f)})}function Du(a,h,f){f=Math.min(a.i.length,f);const m=a.l?l(a.l.Ka,a.l,a):null;e:{var C=a.i;let oe=-1;for(;;){const Oe=["count="+f];oe==-1?f>0?(oe=C[0].g,Oe.push("ofs="+oe)):oe=0:Oe.push("ofs="+oe);let ye=!0;for(let Fe=0;Fe<f;Fe++){var k=C[Fe].g;const pt=C[Fe].map;if(k-=oe,k<0)oe=Math.max(0,C[Fe].g-100),ye=!1;else try{k="req"+k+"_"||"";try{var U=pt instanceof Map?pt:Object.entries(pt);for(const[Tn,jt]of U){let $t=jt;c(jt)&&($t=Sr(jt)),Oe.push(k+Tn+"="+encodeURIComponent($t))}}catch(Tn){throw Oe.push(k+"type="+encodeURIComponent("_badmap")),Tn}}catch{m&&m(pt)}}if(ye){U=Oe.join("&");break e}}U=void 0}return a=a.i.splice(0,f),h.G=a,U}function Mu(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;$||y(),K||($(),K=!0),I.add(h,a),a.A=0}}function yo(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Rr(l(a.Da,a),Nu(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,xu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Rr(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ye(10),Us(this),xu(this))};function _o(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function xu(a){a.g=new Lt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=ft(a.na);Te(h,"RID","rpc"),Te(h,"SID",a.M),Te(h,"AID",a.K),Te(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&Te(h,"TO",a.ia),Te(h,"TYPE","xmlhttp"),Br(a,h),a.u&&a.o&&mo(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=Ns(ft(h)),f.u=null,f.R=!0,cu(f,a)}n.Va=function(){this.C!=null&&(this.C=null,Us(this),yo(this),Ye(19))};function js(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Ou(a,h){var f=null;if(a.g==h){js(a),_o(a),a.g=null;var m=2}else if(lo(a.h,h))f=h.G,pu(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var C=a.D;m=Ms(),_e(m,new ru(m,f)),Bs(a)}else Mu(a);else if(C=h.m,C==3||C==0&&h.X>0||!(m==1&&Ig(a,h)||m==2&&yo(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),C){case 1:vn(a,5);break;case 4:vn(a,10);break;case 3:vn(a,6);break;default:vn(a,2)}}}function Nu(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function vn(a,h){if(a.j.info("Error code "+h),h==2){var f=l(a.bb,a),m=a.Ua;const C=!m;m=new Ft(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Dr(m,"https"),Ns(m),C?yg(m.toString(),f):_g(m.toString(),f)}else Ye(2);a.I=0,a.l&&a.l.pa(h),Lu(a),Vu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ye(2)):(this.j.info("Failed to ping google.com"),Ye(1))};function Lu(a){if(a.I=0,a.ja=[],a.l){const h=mu(a.h);(h.length!=0||a.i.length!=0)&&(V(a.ja,h),V(a.ja,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.oa()}}function Fu(a,h,f){var m=f instanceof Ft?ft(f):new Ft(f);if(m.g!="")h&&(m.g=h+"."+m.g),Mr(m,m.u);else{var C=o.location;m=C.protocol,h=h?h+"."+C.hostname:C.hostname,C=+C.port;const k=new Ft(null);m&&Dr(k,m),h&&(k.g=h),C&&Mr(k,C),f&&(k.h=f),m=k}return f=a.G,h=a.wa,f&&h&&Te(m,f,h),Te(m,"VER",a.ka),Br(a,m),m}function Uu(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new be(new po({ab:f})):new be(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bu(){}n=Bu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function $s(){}$s.prototype.g=function(a,h){return new st(a,h)};function st(a,h){Ee.call(this),this.g=new Cu(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!T(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!T(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new qn(this)}p(st,Ee),st.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},st.prototype.close=function(){go(this.g)},st.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=Sr(a),a=f);h.i.push(new ug(h.Ya++,a)),h.I==3&&Bs(h)},st.prototype.N=function(){this.g.l=null,delete this.j,go(this.g),delete this.g,st.Z.N.call(this)};function ju(a){ro.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(ju,ro);function $u(){so.call(this),this.status=1}p($u,so);function qn(a){this.g=a}p(qn,Bu),qn.prototype.ra=function(){_e(this.g,"a")},qn.prototype.qa=function(a){_e(this.g,new ju(a))},qn.prototype.pa=function(a){_e(this.g,new $u)},qn.prototype.oa=function(){_e(this.g,"b")},$s.prototype.createWebChannel=$s.prototype.g,st.prototype.send=st.prototype.o,st.prototype.open=st.prototype.m,st.prototype.close=st.prototype.close,wf=function(){return new $s},Tf=function(){return Ms()},vf=gn,ia={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},xs.NO_ERROR=0,xs.TIMEOUT=8,xs.HTTP_ERROR=6,ni=xs,su.COMPLETE="complete",_f=su,Ds.EventType=mn,mn.OPEN="a",mn.CLOSE="b",mn.ERROR="c",mn.MESSAGE="d",Ee.prototype.listen=Ee.prototype.J,zr=Ds,be.prototype.listenOnce=be.prototype.K,be.prototype.getLastError=be.prototype.Ha,be.prototype.getLastErrorCode=be.prototype.ya,be.prototype.getStatus=be.prototype.ca,be.prototype.getResponseJson=be.prototype.La,be.prototype.getResponseText=be.prototype.la,be.prototype.send=be.prototype.ea,be.prototype.setWithCredentials=be.prototype.Fa,yf=be}).apply(typeof Hs<"u"?Hs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}He.UNAUTHENTICATED=new He(null),He.GOOGLE_CREDENTIALS=new He("google-credentials-uid"),He.FIRST_PARTY=new He("first-party-uid"),He.MOCK_USER=new He("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vr="12.14.0";function uT(n){vr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=new Ja("@firebase/firestore");function zn(){return On.logLevel}function j(n,...e){if(On.logLevel<=ce.DEBUG){const t=e.map(uc);On.debug(`Firestore (${vr}): ${n}`,...t)}}function Mt(n,...e){if(On.logLevel<=ce.ERROR){const t=e.map(uc);On.error(`Firestore (${vr}): ${n}`,...t)}}function Nn(n,...e){if(On.logLevel<=ce.WARN){const t=e.map(uc);On.warn(`Firestore (${vr}): ${n}`,...t)}}function uc(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Ef(n,r,t)}function Ef(n,e,t){let r=`FIRESTORE (${vr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Mt(r),new Error(r)}function Ae(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Ef(e,s,r)}function fe(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class lT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(He.UNAUTHENTICATED)))}shutdown(){}}class hT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class dT{constructor(e){this.t=e,this.currentUser=He.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Ae(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Rn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Rn,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Rn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ae(typeof r.accessToken=="string",31837,{l:r}),new If(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ae(e===null||typeof e=="string",2055,{h:e}),new He(e)}}class fT{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=He.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class pT{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new fT(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(He.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Tl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class mT{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,yt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Ae(this.o===void 0,3512);const r=i=>{i.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,j("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Tl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Ae(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Tl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gT(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=gT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ue(n,e){return n<e?-1:n>e?1:0}function oa(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Co(s)===Co(i)?ue(s,i):Co(s)?1:-1}return ue(n.length,e.length)}const yT=55296,_T=57343;function Co(n){const e=n.charCodeAt(0);return e>=yT&&e<=_T}function lr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="__name__";class mt{constructor(e,t,r){t===void 0?t=0:t>e.length&&te(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&te(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return mt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof mt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=mt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const r=mt.isNumericId(e),s=mt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?mt.extractNumericId(e).compare(mt.extractNumericId(t)):oa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return tn.fromString(e.substring(4,e.length-2))}}class Ie extends mt{construct(e,t,r){return new Ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Ie(t)}static emptyPath(){return new Ie([])}}const vT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class et extends mt{construct(e,t,r){return new et(e,t,r)}static isValidIdentifier(e){return vT.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),et.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===wl}static keyField(){return new et([wl])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new W(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new W(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new et(t)}static emptyPath(){return new et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.path=e}static fromPath(e){return new J(Ie.fromString(e))}static fromName(e){return new J(Ie.fromString(e).popFirst(5))}static empty(){return new J(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new J(new Ie(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TT(n,e,t){if(!t)throw new W(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function wT(n,e,t,r){if(e===!0&&r===!0)throw new W(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function El(n){if(!J.isDocumentKey(n))throw new W(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ET(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function IT(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":te(12329,{type:typeof n})}function nr(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=IT(n);throw new W(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n,e){const t={typeString:n};return e&&(t.value=e),t}function vs(n,e){if(!ET(n))throw new W(L.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new W(L.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=-62135596800,Al=1e6;class Me{static now(){return Me.fromMillis(Date.now())}static fromDate(e){return Me.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Al);return new Me(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Il)throw new W(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Al}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(vs(e,Me._jsonSchema))return new Me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Il;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Me._jsonSchemaVersion="firestore/timestamp/1.0",Me._jsonSchema={type:xe("string",Me._jsonSchemaVersion),seconds:xe("number"),nanoseconds:xe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{static fromTimestamp(e){return new ee(e)}static min(){return new ee(new Me(0,0))}static max(){return new ee(new Me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=-1;function AT(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ee.fromTimestamp(r===1e9?new Me(t+1,0):new Me(t,r));return new sn(s,J.empty(),e)}function bT(n){return new sn(n.readTime,n.key,os)}class sn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new sn(ee.min(),J.empty(),os)}static max(){return new sn(ee.max(),J.empty(),os)}}function ST(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=J.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class RT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ji(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==PT)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&te(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new M(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof M?t:M.resolve(t)}catch(t){return M.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):M.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):M.reject(t)}static resolve(e){return new M(((t,r)=>{t(e)}))}static reject(e){return new M(((t,r)=>{r(e)}))}static waitFor(e){return new M(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=M.resolve(!1);for(const r of e)t=t.next((s=>s?M.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new M(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next((d=>{o[l]=d,++c,c===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,t){return new M(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function CT(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Tr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}$i.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT=-1;function qi(n){return n==null}function aa(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Af="";function kT(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=bl(e)),e=DT(n.get(t),e);return bl(e)}function DT(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Af:t+="";break;default:t+=i}}return t}function bl(n){return n+Af+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ts(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function MT(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||je.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,je.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,je.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ws(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ws(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ws(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ws(this.root,e,this.comparator,!0)}}class Ws{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class je{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??je.RED,this.left=s??je.EMPTY,this.right=i??je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new je(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return je.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw te(43730,{key:this.key,value:this.value});if(this.right.isRed())throw te(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw te(27949);return e+(this.isRed()?0:1)}}je.EMPTY=null,je.RED=!0,je.BLACK=!1;je.EMPTY=new class{constructor(){this.size=0}get key(){throw te(57766)}get value(){throw te(16141)}get color(){throw te(16727)}get left(){throw te(29726)}get right(){throw te(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new je(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Pl(this.data.getIterator())}getIteratorFrom(e){return new Pl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Le(this.comparator);return t.data=e,t}}class Pl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.fields=e,e.sort(et.comparator)}static empty(){return new Xt([])}unionWith(e){let t=new Le(et.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Xt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return lr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new bf("Invalid base64 string: "+i):i}})(e);return new $e(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new $e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const xT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function on(n){if(Ae(!!n,39018),typeof n=="string"){let e=0;const t=xT.exec(n);if(Ae(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ce(n.seconds),nanos:Ce(n.nanos)}}function Ce(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function an(n){return typeof n=="string"?$e.fromBase64String(n):$e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="server_timestamp",Pf="__type__",Rf="__previous_value__",Cf="__local_write_time__";function hc(n){return(n?.mapValue?.fields||{})[Pf]?.stringValue===Sf}function zi(n){const e=n.mapValue.fields[Rf];return hc(e)?zi(e):e}function as(n){const e=on(n.mapValue.fields[Cf].timestampValue);return new Me(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,t,r,s,i,o,c,u,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=p}}const Ti="(default)";class cs{constructor(e,t){this.projectId=e,this.database=t||Ti}static empty(){return new cs("","")}get isDefaultDatabase(){return this.database===Ti}isEqual(e){return e instanceof cs&&e.projectId===this.projectId&&e.database===this.database}}function NT(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new W(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new cs(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT="__type__",FT="__max__",Ks={mapValue:{}},UT="__vector__",ca="value";function cn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?hc(n)?4:jT(n)?9007199254740991:BT(n)?10:11:te(28295,{value:n})}function It(n,e){if(n===e)return!0;const t=cn(n);if(t!==cn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return as(n).isEqual(as(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=on(s.timestampValue),c=on(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return an(s.bytesValue).isEqual(an(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return Ce(s.geoPointValue.latitude)===Ce(i.geoPointValue.latitude)&&Ce(s.geoPointValue.longitude)===Ce(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Ce(s.integerValue)===Ce(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ce(s.doubleValue),c=Ce(i.doubleValue);return o===c?aa(o)===aa(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return lr(n.arrayValue.values||[],e.arrayValue.values||[],It);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Sl(o)!==Sl(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!It(o[u],c[u])))return!1;return!0})(n,e);default:return te(52216,{left:n})}}function us(n,e){return(n.values||[]).find((t=>It(t,e)))!==void 0}function hr(n,e){if(n===e)return 0;const t=cn(n),r=cn(e);if(t!==r)return ue(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=Ce(i.integerValue||i.doubleValue),u=Ce(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return Rl(n.timestampValue,e.timestampValue);case 4:return Rl(as(n),as(e));case 5:return oa(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=an(i),u=an(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=ue(c[l],u[l]);if(d!==0)return d}return ue(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=ue(Ce(i.latitude),Ce(o.latitude));return c!==0?c:ue(Ce(i.longitude),Ce(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Cl(n.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},u=o.fields||{},l=c[ca]?.arrayValue,d=u[ca]?.arrayValue,p=ue(l?.values?.length||0,d?.values?.length||0);return p!==0?p:Cl(l,d)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Ks.mapValue&&o===Ks.mapValue)return 0;if(i===Ks.mapValue)return 1;if(o===Ks.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const g=oa(u[p],d[p]);if(g!==0)return g;const b=hr(c[u[p]],l[d[p]]);if(b!==0)return b}return ue(u.length,d.length)})(n.mapValue,e.mapValue);default:throw te(23264,{he:t})}}function Rl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=on(n),r=on(e),s=ue(t.seconds,r.seconds);return s!==0?s:ue(t.nanos,r.nanos)}function Cl(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=hr(t[s],r[s]);if(i)return i}return ue(t.length,r.length)}function dr(n){return ua(n)}function ua(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=on(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return an(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return J.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ua(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ua(t.fields[o])}`;return s+"}"})(n.mapValue):te(61005,{value:n})}function ri(n){switch(cn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=zi(n);return e?16+ri(e):16;case 5:return 2*n.stringValue.length;case 6:return an(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+ri(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Ts(r.fields,((i,o)=>{s+=i.length+ri(o)})),s})(n.mapValue);default:throw te(13486,{value:n})}}function ls(n){return!!n&&"integerValue"in n}function Vf(n){return ls(n)||(function(t){return!!t&&"doubleValue"in t})(n)}function dc(n){return!!n&&"arrayValue"in n}function Vl(n){return!!n&&"nullValue"in n}function kl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Vo(n){return!!n&&"mapValue"in n}function BT(n){return(n?.mapValue?.fields||{})[LT]?.stringValue===UT}function Xr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Ts(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Xr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Xr(n.arrayValue.values[t]);return e}return{...n}}function jT(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===FT}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.value=e}static empty(){return new _t({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Vo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Xr(t)}setAll(e){let t=et.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Xr(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Vo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return It(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Vo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Ts(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new _t(Xr(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new We(e,0,ee.min(),ee.min(),ee.min(),_t.empty(),0)}static newFoundDocument(e,t,r,s){return new We(e,1,t,ee.min(),r,s,0)}static newNoDocument(e,t){return new We(e,2,t,ee.min(),ee.min(),_t.empty(),0)}static newUnknownDocument(e,t){return new We(e,3,t,ee.min(),ee.min(),_t.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ee.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=_t.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=_t.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ee.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof We&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new We(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,t){this.position=e,this.inclusive=t}}function Dl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(o.referenceValue),t.key):r=hr(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ml(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!It(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t="asc"){this.field=e,this.dir=t}}function $T(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{}class Ne extends kf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new zT(e,t,r):t==="array-contains"?new KT(e,r):t==="in"?new GT(e,r):t==="not-in"?new QT(e,r):t==="array-contains-any"?new XT(e,r):new Ne(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new HT(e,r):new WT(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(hr(t,this.value)):t!==null&&cn(this.value)===cn(t)&&this.matchesComparison(hr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return te(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class At extends kf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new At(e,t)}matches(e){return Df(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Df(n){return n.op==="and"}function Mf(n){return qT(n)&&Df(n)}function qT(n){for(const e of n.filters)if(e instanceof At)return!1;return!0}function la(n){if(n instanceof Ne)return n.field.canonicalString()+n.op.toString()+dr(n.value);if(Mf(n))return n.filters.map((e=>la(e))).join(",");{const e=n.filters.map((t=>la(t))).join(",");return`${n.op}(${e})`}}function xf(n,e){return n instanceof Ne?(function(r,s){return s instanceof Ne&&r.op===s.op&&r.field.isEqual(s.field)&&It(r.value,s.value)})(n,e):n instanceof At?(function(r,s){return s instanceof At&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&xf(o,s.filters[c])),!0):!1})(n,e):void te(19439)}function Of(n){return n instanceof Ne?(function(t){return`${t.field.canonicalString()} ${t.op} ${dr(t.value)}`})(n):n instanceof At?(function(t){return t.op.toString()+" {"+t.getFilters().map(Of).join(" ,")+"}"})(n):"Filter"}class zT extends Ne{constructor(e,t,r){super(e,t,r),this.key=J.fromName(r.referenceValue)}matches(e){const t=J.comparator(e.key,this.key);return this.matchesComparison(t)}}class HT extends Ne{constructor(e,t){super(e,"in",t),this.keys=Nf("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class WT extends Ne{constructor(e,t){super(e,"not-in",t),this.keys=Nf("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Nf(n,e){return(e.arrayValue?.values||[]).map((t=>J.fromName(t.referenceValue)))}class KT extends Ne{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return dc(t)&&us(t.arrayValue,this.value)}}class GT extends Ne{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&us(this.value.arrayValue,t)}}class QT extends Ne{constructor(e,t){super(e,"not-in",t)}matches(e){if(us(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!us(this.value.arrayValue,t)}}class XT extends Ne{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!dc(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>us(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function xl(n,e=null,t=[],r=[],s=null,i=null,o=null){return new JT(n,e,t,r,s,i,o)}function fc(n){const e=fe(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>la(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),qi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>dr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>dr(r))).join(",")),e.Te=t}return e.Te}function pc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!$T(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!xf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ml(n.startAt,e.startAt)&&Ml(n.endAt,e.endAt)}function ha(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function YT(n,e,t,r,s,i,o,c){return new Hi(n,e,t,r,s,i,o,c)}function Wi(n){return new Hi(n)}function Ol(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ZT(n){return J.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function ew(n){return n.collectionGroup!==null}function Jr(n){const e=fe(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Le(et.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((l=>{l.isInequality()&&(c=c.add(l.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Ei(i,r))})),t.has(et.keyField().canonicalString())||e.Ie.push(new Ei(et.keyField(),r))}return e.Ie}function Et(n){const e=fe(n);return e.Ee||(e.Ee=tw(e,Jr(n))),e.Ee}function tw(n,e){if(n.limitType==="F")return xl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Ei(s.field,i)}));const t=n.endAt?new wi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new wi(n.startAt.position,n.startAt.inclusive):null;return xl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function da(n,e,t){return new Hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ki(n,e){return pc(Et(n),Et(e))&&n.limitType===e.limitType}function Lf(n){return`${fc(Et(n))}|lt:${n.limitType}`}function Hn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Of(s))).join(", ")}]`),qi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>dr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>dr(s))).join(",")),`Target(${r})`})(Et(n))}; limitType=${n.limitType})`}function Gi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Jr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const l=Dl(o,c,u);return o.inclusive?l<=0:l<0})(r.startAt,Jr(r),s)||r.endAt&&!(function(o,c,u){const l=Dl(o,c,u);return o.inclusive?l>=0:l>0})(r.endAt,Jr(r),s))})(n,e)}function nw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ff(n){return(e,t)=>{let r=!1;for(const s of Jr(n)){const i=rw(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function rw(n,e,t){const r=n.field.isKeyField()?J.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?hr(u,l):te(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return te(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ts(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return MT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw=new Pe(J.comparator);function un(){return sw}const Uf=new Pe(J.comparator);function Hr(...n){let e=Uf;for(const t of n)e=e.insert(t.key,t);return e}function iw(n){let e=Uf;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function An(){return Yr()}function Bf(){return Yr()}function Yr(){return new Fn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ow=new Le(J.comparator);function de(...n){let e=ow;for(const t of n)e=e.add(t);return e}const aw=new Le(ue);function cw(){return aw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:aa(e)?"-0":e}}function $f(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(){this._=void 0}}function uw(n,e,t){return n instanceof fa?(function(s,i){const o={fields:{[Pf]:{stringValue:Sf},[Cf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&hc(i)&&(i=zi(i)),i&&(o.fields[Rf]=i),{mapValue:o}})(t,e):n instanceof Ii?qf(n,e):n instanceof Ai?zf(n,e):n instanceof bi?(function(s,i){const o=hw(s,i),c=Si(o)+Si(s.Ae);return ls(o)&&ls(s.Ae)?$f(c):jf(s.serializer,c)})(n,e):n instanceof pa?(function(s,i){return Nl(s,i,Math.min)})(n,e):n instanceof ma?(function(s,i){return Nl(s,i,Math.max)})(n,e):void 0}function lw(n,e,t){return n instanceof Ii?qf(n,e):n instanceof Ai?zf(n,e):t}function hw(n,e){return n instanceof bi?Vf(e)?e:{integerValue:0}:null}class fa extends Qi{}class Ii extends Qi{constructor(e){super(),this.elements=e}}function qf(n,e){const t=Hf(e);for(const r of n.elements)t.some((s=>It(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Ai extends Qi{constructor(e){super(),this.elements=e}}function zf(n,e){let t=Hf(e);for(const r of n.elements)t=t.filter((s=>!It(s,r)));return{arrayValue:{values:t}}}class mc extends Qi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class bi extends mc{}class pa extends mc{}class ma extends mc{}function Nl(n,e,t){if(!Vf(e))return n.Ae;const r=t(Si(e),Si(n.Ae));return ls(e)&&ls(n.Ae)?$f(r):jf(n.serializer,r)}function Si(n){return Ce(n.integerValue||n.doubleValue)}function Hf(n){return dc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function dw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Ii&&s instanceof Ii||r instanceof Ai&&s instanceof Ai?lr(r.elements,s.elements,It):r instanceof bi&&s instanceof bi||r instanceof pa&&s instanceof pa||r instanceof ma&&s instanceof ma?It(r.Ae,s.Ae):r instanceof fa&&s instanceof fa})(n.transform,e.transform)}class Cn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Cn}static exists(e){return new Cn(void 0,e)}static updateTime(e){return new Cn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function si(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class gc{}function Wf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new pw(n.key,Cn.none()):new yc(n.key,n.data,Cn.none());{const t=n.data,r=_t.empty();let s=new Le(et.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Xi(n.key,r,new Xt(s.toArray()),Cn.none())}}function fw(n,e,t){n instanceof yc?(function(s,i,o){const c=s.value.clone(),u=Fl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Xi?(function(s,i,o){if(!si(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Fl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Kf(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Zr(n,e,t,r){return n instanceof yc?(function(i,o,c,u){if(!si(i.precondition,o))return c;const l=i.value.clone(),d=Ul(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof Xi?(function(i,o,c,u){if(!si(i.precondition,o))return c;const l=Ul(i.fieldTransforms,u,o),d=o.data;return d.setAll(Kf(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return si(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function Ll(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&lr(r,s,((i,o)=>dw(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class yc extends gc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Xi extends gc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Kf(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Fl(n,e,t){const r=new Map;Ae(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,lw(o,c,t[s]))}return r}function Ul(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,uw(i,o,e))}return r}class pw extends gc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mw{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&fw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Zr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Zr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Bf();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Wf(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ee.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),de())}isEqual(e){return this.batchId===e.batchId&&lr(this.mutations,e.mutations,((t,r)=>Ll(t,r)))&&lr(this.baseMutations,e.baseMutations,((t,r)=>Ll(t,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke,he;function Gf(n){if(n===void 0)return Mt("GRPC error has no .code"),L.UNKNOWN;switch(n){case ke.OK:return L.OK;case ke.CANCELLED:return L.CANCELLED;case ke.UNKNOWN:return L.UNKNOWN;case ke.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case ke.INTERNAL:return L.INTERNAL;case ke.UNAVAILABLE:return L.UNAVAILABLE;case ke.UNAUTHENTICATED:return L.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case ke.NOT_FOUND:return L.NOT_FOUND;case ke.ALREADY_EXISTS:return L.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return L.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case ke.ABORTED:return L.ABORTED;case ke.OUT_OF_RANGE:return L.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return L.UNIMPLEMENTED;case ke.DATA_LOSS:return L.DATA_LOSS;default:return te(39323,{code:n})}}(he=ke||(ke={}))[he.OK=0]="OK",he[he.CANCELLED=1]="CANCELLED",he[he.UNKNOWN=2]="UNKNOWN",he[he.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",he[he.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",he[he.NOT_FOUND=5]="NOT_FOUND",he[he.ALREADY_EXISTS=6]="ALREADY_EXISTS",he[he.PERMISSION_DENIED=7]="PERMISSION_DENIED",he[he.UNAUTHENTICATED=16]="UNAUTHENTICATED",he[he.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",he[he.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",he[he.ABORTED=10]="ABORTED",he[he.OUT_OF_RANGE=11]="OUT_OF_RANGE",he[he.UNIMPLEMENTED=12]="UNIMPLEMENTED",he[he.INTERNAL=13]="INTERNAL",he[he.UNAVAILABLE=14]="UNAVAILABLE",he[he.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _w(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw=new tn([4294967295,4294967295],0);function Bl(n){const e=_w().encode(n),t=new gf;return t.update(e),new Uint8Array(t.digest())}function jl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new tn([t,r],0),new tn([s,i],0)]}class _c{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Wr(`Invalid padding: ${t}`);if(r<0)throw new Wr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Wr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Wr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=tn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(tn.fromNumber(r)));return s.compare(vw)===1&&(s=new tn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Bl(e),[r,s]=jl(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new _c(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Bl(e),[r,s]=jl(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Wr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Es.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ws(ee.min(),s,new Pe(ue),un(),de())}}class Es{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Es(r,t,de(),de(),de())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Qf{constructor(e,t){this.targetId=e,this.Ce=t}}class Xf{constructor(e,t,r=$e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class $l{constructor(e){this.targetId=e,this.ve=0,this.Fe=ql(),this.Me=$e.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=de(),t=de(),r=de();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:te(38017,{changeType:i})}})),new Es(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=ql()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Ae(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const jr="WatchChangeAggregator";class Tw{constructor(e){this.Ge=e,this.ze=new Map,this.je=un(),this.Je=Gs(),this.He=Gs(),this.Ze=new Pe(ue)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:te(56790,{state:e.state})}else j(jr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.nt(s)&&t(s)}))}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(ha(i))if(r===0){const o=new J(i.path);this.et(t,o,We.newNoDocument(o,ee.min()))}else Ae(r===1,20013,{expectedCount:r});else{const o=this.ot(t);if(o!==r){const c=this._t(e),u=c?this.ut(c,e,o):1;if(u!==0){this.rt(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=an(r).toUint8Array()}catch(u){if(u instanceof bf)return Nn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new _c(o,s,i)}catch(u){return Nn(u instanceof Wr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.lt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Pt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.st(o);if(c){if(i.current&&ha(c.target)){const u=new J(c.target.path);this.Tt(u).has(o)||this.It(o,u)||this.et(o,u,We.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=de();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const l=this.st(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new ws(e,t,this.Ze,this.je,r);return this.je=un(),this.Je=Gs(),this.He=Gs(),this.Ze=new Pe(ue),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void j(jr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):j(jr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(j(jr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new $l(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new Le(ue),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new Le(ue),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||j(jr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new $l(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Gs(){return new Pe(J.comparator)}function ql(){return new Pe(J.comparator)}const ww={asc:"ASCENDING",desc:"DESCENDING"},Ew={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Iw={and:"AND",or:"OR"};class Aw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ga(n,e){return n.useProto3Json||qi(e)?e:{value:e}}function bw(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Sw(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function rr(n){return Ae(!!n,49232),ee.fromTimestamp((function(t){const r=on(t);return new Me(r.seconds,r.nanos)})(n))}function Pw(n,e){return ya(n,e).canonicalString()}function ya(n,e){const t=(function(s){return new Ie(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Jf(n){const e=Ie.fromString(n);return Ae(np(e),10190,{key:e.toString()}),e}function ko(n,e){const t=Jf(e);if(t.get(1)!==n.databaseId.projectId)throw new W(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new J(Zf(t))}function Yf(n,e){return Pw(n.databaseId,e)}function Rw(n){const e=Jf(n);return e.length===4?Ie.emptyPath():Zf(e)}function zl(n){return new Ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Zf(n){return Ae(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Cw(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:te(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,d){return l.useProto3Json?(Ae(d===void 0||typeof d=="string",58123),$e.fromBase64String(d||"")):(Ae(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),$e.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(l){const d=l.code===void 0?L.UNKNOWN:Gf(l.code);return new W(d,l.message||"")})(o);t=new Xf(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ko(n,r.document.name),i=rr(r.document.updateTime),o=r.document.createTime?rr(r.document.createTime):ee.min(),c=new _t({mapValue:{fields:r.document.fields}}),u=We.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new ii(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ko(n,r.document),i=r.readTime?rr(r.readTime):ee.min(),o=We.newNoDocument(s,i),c=r.removedTargetIds||[];t=new ii([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ko(n,r.document),i=r.removedTargetIds||[];t=new ii([],i,s,null)}else{if(!("filter"in e))return te(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new yw(s,i),c=r.targetId;t=new Qf(c,o)}}return t}function Vw(n,e){return{documents:[Yf(n,e.path)]}}function kw(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Yf(n,s);const i=(function(l){if(l.length!==0)return tp(At.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(l){if(l.length!==0)return l.map((d=>(function(g){return{field:Wn(g.field),direction:xw(g.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=ga(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{dt:t,parent:s}}function Dw(n){let e=Rw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Ae(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(p){const g=ep(p);return g instanceof At&&Mf(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((g=>(function(V){return new Ei(Kn(V.field),(function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,qi(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(p){const g=!!p.before,b=p.values||[];return new wi(b,g)})(t.startAt));let l=null;return t.endAt&&(l=(function(p){const g=!p.before,b=p.values||[];return new wi(b,g)})(t.endAt)),YT(e,s,o,i,c,"F",u,l)}function Mw(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return te(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ep(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Kn(t.unaryFilter.field);return Ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Kn(t.unaryFilter.field);return Ne.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Kn(t.unaryFilter.field);return Ne.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Kn(t.unaryFilter.field);return Ne.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return te(61313);default:return te(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Ne.create(Kn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return te(58110);default:return te(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return At.create(t.compositeFilter.filters.map((r=>ep(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return te(1026)}})(t.compositeFilter.op))})(n):te(30097,{filter:n})}function xw(n){return ww[n]}function Ow(n){return Ew[n]}function Nw(n){return Iw[n]}function Wn(n){return{fieldPath:n.canonicalString()}}function Kn(n){return et.fromServerFormat(n.fieldPath)}function tp(n){return n instanceof Ne?(function(t){if(t.op==="=="){if(kl(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NAN"}};if(Vl(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(kl(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NAN"}};if(Vl(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wn(t.field),op:Ow(t.op),value:t.value}}})(n):n instanceof At?(function(t){const r=t.getFilters().map((s=>tp(s)));return r.length===1?r[0]:{compositeFilter:{op:Nw(t.op),filters:r}}})(n):te(54877,{filter:n})}function np(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,r,s,i=ee.min(),o=ee.min(),c=$e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Rt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e){this.gt=e}}function Fw(n){const e=Dw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?da(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.Sn=new Bw}addToCollectionParentIndex(e,t){return this.Sn.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(sn.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(sn.min())}updateCollectionGroup(e,t,r){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}}class Bw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Le(Ie.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Le(Ie.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},rp=41943040;class nt{static withCacheSize(e){return new nt(e,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nt.DEFAULT_COLLECTION_PERCENTILE=10,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nt.DEFAULT=new nt(rp,nt.DEFAULT_COLLECTION_PERCENTILE,nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nt.DISABLED=new nt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new ln(0)}static _r(){return new ln(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl="LruGarbageCollector",jw=1048576;function Kl([n,e],[t,r]){const s=ue(n,t);return s===0?ue(e,r):s}class $w{constructor(e){this.hr=e,this.buffer=new Le(Kl),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Kl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class qw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){j(Wl,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Tr(t)?j(Wl,"Ignoring IndexedDB error during garbage collection: ",t):await ji(t)}await this.Rr(3e5)}))}}class zw{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return M.resolve($i.ce);const r=new $w(t);return this.Ar.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Ar.dr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(Hl)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Hl):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),zn()<=ce.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function Hw(n,e){return new zw(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(){this.changes=new Fn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,We.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?M.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Zr(r.mutation,s,Xt.empty(),Me.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,de()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=de()){const s=An();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=Hr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=An();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,de())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=un();const o=Yr(),c=(function(){return Yr()})();return t.forEach(((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof Xi)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Zr(d.mutation,l,d.mutation.getFieldMask(),Me.now())):o.set(l.key,Xt.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((l,d)=>o.set(l,d))),t.forEach(((l,d)=>c.set(l,new Kw(d,o.get(l)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Yr();let s=new Pe(((o,c)=>o-c)),i=de();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||Xt.empty();d=c.applyToLocalView(l,d),r.set(u,d);const p=(s.get(c.batchId)||de()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,p=Bf();d.forEach((g=>{if(!i.has(g)){const b=Wf(t.get(g),r.get(g));b!==null&&p.set(g,b),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return M.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return ZT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ew(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):M.resolve(An());let c=os,u=i;return o.next((l=>M.forEach(l,((d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(d)?M.resolve():this.remoteDocumentCache.getEntry(e,d).next((g=>{u=u.insert(d,g)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,u,l,de()))).next((d=>({batchId:c,changes:iw(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new J(t)).next((r=>{let s=Hr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Hr();return this.indexManager.getCollectionParents(e,i).next((c=>M.forEach(c,(u=>{const l=(function(p,g){return new Hi(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((d=>{d.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,We.newInvalidDocument(d)))}));let c=Hr();return o.forEach(((u,l)=>{const d=i.get(u);d!==void 0&&Zr(d.mutation,l,Xt.empty(),Me.now()),Gi(t,l)&&(c=c.insert(u,l))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return M.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:rr(s.createTime)}})(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,(function(s){return{name:s.name,query:Fw(s.bundledQuery),readTime:rr(s.readTime)}})(t)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(){this.overlays=new Pe(J.comparator),this.Br=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){const r=An();return M.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.wt(e,t,i)})),M.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Br.delete(r)),M.resolve()}getOverlaysForCollection(e,t,r){const s=An(),i=t.length+1,o=new J(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return M.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Pe(((l,d)=>l-d));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=An(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=An(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((l,d)=>c.set(l,d))),!(c.size()>=s)););return M.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new gw(t,r));let i=this.Br.get(t);i===void 0&&(i=de(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(){this.Lr=new Le(Be.kr),this.qr=new Le(Be.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Be(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.$r(new Be(e,t))}Wr(e,t){e.forEach((r=>this.removeReference(r,t)))}Qr(e){const t=new J(new Ie([])),r=new Be(t,e),s=new Be(t,e+1),i=[];return this.qr.forEachInRange([r,s],(o=>{this.$r(o),i.push(o.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new J(new Ie([])),r=new Be(t,e),s=new Be(t,e+1);let i=de();return this.qr.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Be(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Be{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return J.comparator(e.key,t.key)||ue(e.jr,t.jr)}static Kr(e,t){return ue(e.jr,t.jr)||J.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new Le(Be.kr)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new mw(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Jr=this.Jr.add(new Be(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return M.resolve(o)}lookupMutationBatch(e,t){return M.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?VT:this.Xn-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Be(t,0),s=new Be(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],(o=>{const c=this.Hr(o.jr);i.push(c)})),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(ue);return t.forEach((s=>{const i=new Be(s,0),o=new Be(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,o],(c=>{r=r.add(c.jr)}))})),M.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const o=new Be(new J(i),0);let c=new Le(ue);return this.Jr.forEachWhile((u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.jr)),!0)}),o),M.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach((r=>{const s=this.Hr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Ae(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return M.forEach(t.mutations,(s=>{const i=new Be(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Jr=r}))}tr(e){}containsKey(e,t){const r=new Be(t,0),s=this.Jr.firstAfterOrEqual(r);return M.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e){this.ei=e,this.docs=(function(){return new Pe(J.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return M.resolve(r?r.document.mutableCopy():We.newInvalidDocument(t))}getEntries(e,t){let r=un();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():We.newInvalidDocument(s))})),M.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=un();const o=t.path,c=new J(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||ST(bT(d),r)<=0||(s.has(d.key)||Gi(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,t,r,s){te(9500)}ti(e,t){return M.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new eE(this)}getSize(e){return M.resolve(this.size)}}class eE extends Ww{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)})),M.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.persistence=e,this.ni=new Fn((t=>fc(t)),pc),this.lastRemoteSnapshotVersion=ee.min(),this.highestTargetId=0,this.ri=0,this.ii=new vc,this.targetCount=0,this.si=ln.sr()}forEachTarget(e,t){return this.ni.forEach(((r,s)=>t(s))),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),M.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new ln(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.cr(t),M.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),M.waitFor(i).next((()=>s))}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return M.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),M.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),M.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return M.resolve(r)}containsKey(e,t){return M.resolve(this.ii.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e,t){this.oi={},this.overlays={},this._i=new $i(0),this.ai=!1,this.ai=!0,this.ui=new Jw,this.referenceDelegate=e(this),this.ci=new tE(this),this.indexManager=new Uw,this.remoteDocumentCache=(function(s){return new Zw(s)})((r=>this.referenceDelegate.li(r))),this.serializer=new Lw(t),this.hi=new Qw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Xw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new Yw(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);const s=new nE(this._i.next());return this.referenceDelegate.Pi(),r(s).next((i=>this.referenceDelegate.Ti(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return M.or(Object.values(this.oi).map((r=>()=>r.containsKey(e,t))))}}class nE extends RT{constructor(e){super(),this.currentSequenceNumber=e}}class Tc{constructor(e){this.persistence=e,this.Ei=new vc,this.Ri=null}static Ai(e){return new Tc(e)}get Vi(){if(this.Ri)return this.Ri;throw te(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),M.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),M.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((s=>this.Vi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Vi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.Vi,(r=>{const s=J.fromPath(r);return this.di(e,s).next((i=>{i||t.removeEntry(s,ee.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return M.or([()=>M.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Pi{constructor(e,t){this.persistence=e,this.mi=new Fn((r=>kT(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Hw(this,t)}static Ai(e,t){return new Pi(e,t)}Pi(){}Ti(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}gr(e){let t=0;return this.dr(e,(r=>{t++})).next((()=>t))}dr(e,t){return M.forEach(this.mi,((r,s)=>this.yr(e,r,s).next((i=>i?M.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,(o=>this.yr(e,o,t).next((c=>{c||(r++,i.removeEntry(o,ee.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),M.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ri(e.data.value)),t}yr(e,t,r){return M.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=de(),s=de();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wc(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=(function(){return Hg()?8:CT(Qe())>0?6:4})()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.gs(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new rE;return this.ps(e,t,o).next((c=>{if(i.result=c,this.Rs)return this.ys(e,t,o,c.size)}))})).next((()=>i.result))}ys(e,t,r,s){return r.documentReadCount<this.As?(zn()<=ce.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",Hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),M.resolve()):(zn()<=ce.DEBUG&&j("QueryEngine","Query:",Hn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(zn()<=ce.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",Hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Et(t))):M.resolve())}fs(e,t){if(Ol(t))return M.resolve(null);let r=Et(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=da(t,null,"F"),r=Et(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=de(...i);return this.ds.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const l=this.ws(t,c);return this.Ss(t,l,o,u.readTime)?this.fs(e,da(t,null,"F")):this.bs(e,l,t,u)}))))})))))}gs(e,t,r,s){return Ol(t)||s.isEqual(ee.min())?M.resolve(null):this.ds.getDocuments(e,r).next((i=>{const o=this.ws(t,i);return this.Ss(t,o,r,s)?M.resolve(null):(zn()<=ce.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hn(t)),this.bs(e,o,t,AT(s,os)).next((c=>c)))}))}ws(e,t){let r=new Le(Ff(e));return t.forEach(((s,i)=>{Gi(e,i)&&(r=r.add(i))})),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return zn()<=ce.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",Hn(t)),this.ds.getDocumentsMatchingQuery(e,t,sn.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec="LocalStore",iE=3e8;class oE{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new Pe(ue),this.vs=new Fn((i=>fc(i)),pc),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Gw(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function aE(n,e,t,r){return new oE(n,e,t,r)}async function ip(n,e){const t=fe(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=de();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next((l=>({Os:l,removedBatchIds:o,addedBatchIds:c})))}))}))}function op(n){const e=fe(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ci.getLastRemoteSnapshotVersion(t)))}function cE(n,e){const t=fe(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach(((d,p)=>{const g=s.get(p);if(!g)return;c.push(t.ci.removeMatchingKeys(i,d.removedDocuments,p).next((()=>t.ci.addMatchingKeys(i,d.addedDocuments,p))));let b=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken($e.EMPTY_BYTE_STRING,ee.min()).withLastLimboFreeSnapshotVersion(ee.min()):d.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(d.resumeToken,r)),s=s.insert(p,b),(function(D,P,x){return D.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=iE?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0})(g,b,d)&&c.push(t.ci.updateTargetData(i,b))}));let u=un(),l=de();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),c.push(uE(i,o,e.documentUpdates).next((d=>{u=d.Ns,l=d.Bs}))),!r.isEqual(ee.min())){const d=t.ci.getLastRemoteSnapshotVersion(i).next((p=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(d)}return M.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,l))).next((()=>u))})).then((i=>(t.Cs=s,i)))}function uE(n,e,t){let r=de(),s=de();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=un();return t.forEach(((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(ee.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):j(Ec,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)})),{Ns:o,Bs:s}}))}function lE(n,e){const t=fe(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.ci.getTargetData(r,e).next((i=>i?(s=i,M.resolve(s)):t.ci.allocateTargetId(r).next((o=>(s=new Rt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r}))}async function _a(n,e,t){const r=fe(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Tr(o))throw o;j(Ec,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function Gl(n,e,t){const r=fe(n);let s=ee.min(),i=de();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,l,d){const p=fe(u),g=p.vs.get(d);return g!==void 0?M.resolve(p.Cs.get(g)):p.ci.getTargetData(l,d)})(r,o,Et(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Ds.getDocumentsMatchingQuery(o,e,t?s:ee.min(),t?i:de()))).next((c=>(hE(r,nw(e),c),{documents:c,Ls:i})))))}function hE(n,e,t){let r=n.Fs.get(e)||ee.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Fs.set(e,r)}class Ql{constructor(){this.activeTargetIds=cw()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class dE{constructor(){this.Co=new Ql,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new Ql,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{Fo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="ConnectivityMonitor";class Jl{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){j(Xl,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){j(Xl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qs=null;function va(){return Qs===null?Qs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Qs++,"0x"+Qs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="RestConnection",pE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class mE{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===Ti?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const o=va(),c=this.Wo(e,t.toUriEncodedString());j(Do,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,s,i);const{host:l}=new URL(c),d=ms(l);return this.Go(e,c,u,r,d).then((p=>(j(Do,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw Nn(Do,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}zo(e,t,r,s,i,o){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+vr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Wo(e,t){const r=pE[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze="WebChannelConnection",$r=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class sr extends mE{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!sr.u_){const e=Tf();$r(e,vf.STAT_EVENT,(t=>{t.stat===ia.PROXY?j(ze,"STAT_EVENT: detected buffering proxy"):t.stat===ia.NOPROXY&&j(ze,"STAT_EVENT: detected no buffering proxy")})),sr.u_=!0}}Go(e,t,r,s,i){const o=va();return new Promise(((c,u)=>{const l=new yf;l.setWithCredentials(!0),l.listenOnce(_f.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case ni.NO_ERROR:const p=l.getResponseJson();j(ze,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case ni.TIMEOUT:j(ze,`RPC '${e}' ${o} timed out`),u(new W(L.DEADLINE_EXCEEDED,"Request time out"));break;case ni.HTTP_ERROR:const g=l.getStatus();if(j(ze,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let b=l.getResponseJson();Array.isArray(b)&&(b=b[0]);const V=b?.error;if(V&&V.status&&V.message){const D=(function(x){const B=x.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(B)>=0?B:L.UNKNOWN})(V.status);u(new W(D,V.message))}else u(new W(L.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new W(L.UNAVAILABLE,"Connection failed."));break;default:te(9055,{c_:e,streamId:o,l_:l.getLastErrorCode(),h_:l.getLastError()})}}finally{j(ze,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);j(ze,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)}))}P_(e,t,r){const s=va(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");j(ze,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.T_(d);let p=!1,g=!1;const b=new gE({jo:V=>{g?j(ze,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(p||(j(ze,`Opening RPC '${e}' stream ${s} transport.`),d.open(),p=!0),j(ze,`RPC '${e}' stream ${s} sending:`,V),d.send(V))},Jo:()=>d.close()});return $r(d,zr.EventType.OPEN,(()=>{g||(j(ze,`RPC '${e}' stream ${s} transport opened.`),b.r_())})),$r(d,zr.EventType.CLOSE,(()=>{g||(g=!0,j(ze,`RPC '${e}' stream ${s} transport closed`),b.s_(),this.I_(d))})),$r(d,zr.EventType.ERROR,(V=>{g||(g=!0,Nn(ze,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),b.s_(new W(L.UNAVAILABLE,"The operation could not be completed")))})),$r(d,zr.EventType.MESSAGE,(V=>{if(!g){const D=V.data[0];Ae(!!D,16349);const P=D,x=P?.error||P[0]?.error;if(x){j(ze,`RPC '${e}' stream ${s} received error:`,x);const B=x.status;let O=(function(K){const I=ke[K];if(I!==void 0)return Gf(I)})(B),N=x.message;B==="NOT_FOUND"&&N.includes("database")&&N.includes("does not exist")&&N.includes(this.databaseId.database)&&Nn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),O===void 0&&(O=L.INTERNAL,N="Unknown error status: "+B+" with message "+x.message),g=!0,b.s_(new W(O,N)),d.close()}else j(ze,`RPC '${e}' stream ${s} received:`,D),b.o_(D)}})),sr.a_(),setTimeout((()=>{b.i_()}),0),b}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return wf()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yE(n){return new sr(n)}function Mo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(n){return new Aw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */sr.u_=!1;class cp{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&j("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="PersistentStream";class _E{constructor(e,t,r,s,i,o,c,u){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new cp(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(Mt(t.toString()),Mt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.b_===t&&this.Q_(r,s)}),(r=>{e((()=>{const s=new W(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)}))}))}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{r((()=>this.listener.Ho()))})),this.stream.Xo((()=>{r((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((s=>{r((()=>this.G_(s)))})),this.stream.onMessage((s=>{r((()=>++this.v_==1?this.j_(s):this.onNext(s)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return j(Yl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(j(Yl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class vE extends _E{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Cw(this.serializer,e),r=(function(i){if(!("targetChange"in i))return ee.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ee.min():o.readTime?rr(o.readTime):ee.min()})(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=zl(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=ha(u)?{documents:Vw(i,u)}:{query:kw(i,u).dt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Sw(i,o.resumeToken);const l=ga(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(ee.min())>0){c.readTime=bw(i,o.snapshotVersion.toTimestamp());const l=ga(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c})(this.serializer,e);const r=Mw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=zl(this.serializer),t.removeTarget=e,this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{}class wE extends TE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new W(L.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.$o(e,ya(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(L.UNKNOWN,i.toString())}))}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.zo(e,ya(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(L.UNKNOWN,o.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function EE(n,e,t,r){return new wE(n,e,t,r)}class IE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Mt(t),this._a=!1):j("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="RemoteStore";class AE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new ln(1e3),this.Aa=new ln(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((o=>{r.enqueueAndForget((async()=>{As(this)&&(j(xt,"Restarting streams for network reachability change."),await(async function(u){const l=fe(u);l.Va.add(4),await Is(l),l.fa.set("Unknown"),l.Va.delete(4),await Ji(l)})(this))}))})),this.fa=new IE(r,s)}}async function Ji(n){if(As(n))for(const e of n.da)await e(!0)}async function Is(n){for(const e of n.da)await e(!1)}function Ta(n,e){return n.Ia.get(e)||void 0}function up(n,e){const t=fe(n),r=Ta(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=(function(c,u){const l=Ta(c,u);l!==void 0&&c.Ea.delete(l);const d=(function(g,b){return b%2!=0?g.Aa.next():g.Ra.next()})(c,u);return c.Ia.set(u,d),c.Ea.set(d,u),d})(t,e.targetId);j(xt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new Rt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),Sc(t)?bc(t):wr(t).x_()&&Ac(t,i)}function Ic(n,e){const t=fe(n),r=wr(t),s=Ta(t,e);j(xt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&lp(t,s),t.Ta.size===0&&(r.x_()?r.B_():As(t)&&t.fa.set("Unknown"))}function Ac(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ee.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void j(xt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}wr(n).H_(e)}function lp(n,e){n.ga.$e(e),wr(n).Z_(e)}function bc(n){n.ga=new Tw({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):de()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),wr(n).start(),n.fa.aa()}function Sc(n){return As(n)&&!wr(n).M_()&&n.Ta.size>0}function As(n){return fe(n).Va.size===0}function hp(n){n.ga=void 0}async function bE(n){n.fa.set("Online")}async function SE(n){n.Ta.forEach(((e,t)=>{Ac(n,e)}))}async function PE(n,e){hp(n),Sc(n)?(n.fa.la(e),bc(n)):n.fa.set("Unknown")}async function RE(n,e,t){if(n.fa.set("Online"),e instanceof Xf&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const u=s.Ea.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.Ia.delete(u),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}})(n,e)}catch(r){j(xt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Zl(n,r)}else if(e instanceof ii?n.ga.Xe(e):e instanceof Qf?n.ga.it(e):n.ga.tt(e),!t.isEqual(ee.min()))try{const r=await op(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.ga.Pt(o);c.targetChanges.forEach(((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.Ta.get(d);p&&i.Ta.set(d,p.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,d)=>{const p=i.Ta.get(l);if(!p)return;i.Ta.set(l,p.withResumeToken($e.EMPTY_BYTE_STRING,p.snapshotVersion)),lp(i,l);const g=new Rt(p.target,l,d,p.sequenceNumber);Ac(i,g)}));const u=(function(d,p){const g=new Map;p.targetChanges.forEach(((V,D)=>{const P=d.Ea.get(D);P!==void 0&&g.set(P,V)}));let b=new Pe(ue);return p.targetMismatches.forEach(((V,D)=>{const P=d.Ea.get(V);P!==void 0&&(b=b.insert(P,D))})),new ws(p.snapshotVersion,g,b,p.documentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){j(xt,"Failed to raise snapshot:",r),await Zl(n,r)}}async function Zl(n,e,t){if(!Tr(e))throw e;n.Va.add(1),await Is(n),n.fa.set("Offline"),t||(t=()=>op(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{j(xt,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await Ji(n)}))}async function eh(n,e){const t=fe(n);t.asyncQueue.verifyOperationInProgress(),j(xt,"RemoteStore received new credentials");const r=As(t);t.Va.add(3),await Is(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await Ji(t)}async function CE(n,e){const t=fe(n);e?(t.Va.delete(2),await Ji(t)):e||(t.Va.add(2),await Is(t),t.fa.set("Unknown"))}function wr(n){return n.pa||(n.pa=(function(t,r,s){const i=fe(t);return i.ia(),new vE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Ho:bE.bind(null,n),Xo:SE.bind(null,n),e_:PE.bind(null,n),J_:RE.bind(null,n)}),n.da.push((async e=>{e?(n.pa.N_(),Sc(n)?bc(n):n.fa.set("Unknown")):(await n.pa.stop(),hp(n))}))),n.pa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Rn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Pc(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function dp(n,e){if(Mt("AsyncQueue",`${e}: ${n}`),Tr(n))return new W(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{static emptySet(e){return new ir(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||J.comparator(t.key,r.key):(t,r)=>J.comparator(t.key,r.key),this.keyedMap=Hr(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ir)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ir;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(){this.wa=new Pe(J.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):te(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class fr{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new fr(e,t,ir.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ki(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class kE{constructor(){this.queries=nh(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=fe(t),i=s.queries;s.queries=nh(),i.forEach(((o,c)=>{for(const u of c.Ca)u.onError(r)}))})(this,new W(L.ABORTED,"Firestore shutting down"))}}function nh(){return new Fn((n=>Lf(n)),Ki)}async function fp(n,e){const t=fe(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new VE,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=dp(o,`Initialization of query '${Hn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&Rc(t)}async function pp(n,e){const t=fe(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Ca.indexOf(e);o>=0&&(i.Ca.splice(o,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function DE(n,e){const t=fe(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Ca)c.Oa(s)&&(r=!0);o.Da=s}}r&&Rc(t)}function ME(n,e,t){const r=fe(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function Rc(n){n.Ma.forEach((e=>{e.next()}))}var wa,rh;(rh=wa||(wa={})).Na="default",rh.Cache="cache";class mp{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new fr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=fr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==wa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e){this.key=e}}class yp{constructor(e){this.key=e}}class xE{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=de(),this.mutatedKeys=de(),this.ru=Ff(e),this.iu=new ir(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new th,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,p)=>{const g=s.get(d),b=Gi(this.query,p)?p:null,V=!!g&&this.mutatedKeys.has(g.key),D=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let P=!1;g&&b?g.data.isEqual(b.data)?V!==D&&(r.track({type:3,doc:b}),P=!0):this.au(g,b)||(r.track({type:2,doc:b}),P=!0,(u&&this.ru(b,u)>0||l&&this.ru(b,l)<0)&&(c=!0)):!g&&b?(r.track({type:0,doc:b}),P=!0):g&&!b&&(r.track({type:1,doc:g}),P=!0,(u||l)&&(c=!0)),P&&(b?(o=o.add(b),i=D?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{iu:o,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const o=e._u.ba();o.sort(((d,p)=>(function(b,V){const D=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return te(20277,{At:P})}};return D(b)-D(V)})(d.type,p.type)||this.ru(d.doc,p.doc))),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],u=this.nu.size===0&&this.current&&!s?1:0,l=u!==this.tu;return this.tu=u,o.length!==0||l?{snapshot:new fr(this.query,e.iu,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new th,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((t=>this.eu=this.eu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.eu=this.eu.delete(t))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=de(),this.iu.forEach((r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))}));const t=[];return e.forEach((r=>{this.nu.has(r)||t.push(new yp(r))})),this.nu.forEach((r=>{e.has(r)||t.push(new gp(r))})),t}Pu(e){this.eu=e.Ls,this.nu=de();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return fr.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const Cc="SyncEngine";class OE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class NE{constructor(e){this.key=e,this.Iu=!1}}class LE{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Eu={},this.Ru=new Fn((c=>Lf(c)),Ki),this.Au=new Map,this.Vu=new Set,this.du=new Pe(J.comparator),this.mu=new Map,this.fu=new vc,this.gu={},this.pu=new Map,this.yu=ln._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function FE(n,e,t=!0){const r=Ep(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await _p(r,e,t,!0),s}async function UE(n,e){const t=Ep(n);await _p(t,e,!0,!1)}async function _p(n,e,t,r){const s=await lE(n.localStore,Et(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await BE(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&up(n.remoteStore,s),c}async function BE(n,e,t,r,s){n.Su=(p,g,b)=>(async function(D,P,x,B){let O=P.view.ou(x);O.Ss&&(O=await Gl(D.localStore,P.query,!1).then((({documents:I})=>P.view.ou(I,O))));const N=B&&B.targetChanges.get(P.targetId),$=B&&B.targetMismatches.get(P.targetId)!=null,K=P.view.applyChanges(O,D.isPrimaryClient,N,$);return ih(D,P.targetId,K.lu),K.snapshot})(n,p,g,b);const i=await Gl(n.localStore,e,!0),o=new xE(e,i.Ls),c=o.ou(i.documents),u=Es.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);ih(n,t,l.lu);const d=new OE(e,t,o);return n.Ru.set(e,d),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),l.snapshot}async function jE(n,e,t){const r=fe(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter((o=>!Ki(o,e)))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await _a(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ic(r.remoteStore,s.targetId),Ea(r,s.targetId)})).catch(ji)):(Ea(r,s.targetId),await _a(r.localStore,s.targetId,!0))}async function $E(n,e){const t=fe(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ic(t.remoteStore,r.targetId))}async function vp(n,e){const t=fe(n);try{const r=await cE(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.mu.get(i);o&&(Ae(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Iu=!0:s.modifiedDocuments.size>0?Ae(o.Iu,14607):s.removedDocuments.size>0&&(Ae(o.Iu,42227),o.Iu=!1))})),await wp(t,r,e)}catch(r){await ji(r)}}function sh(n,e,t){const r=fe(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach(((i,o)=>{const c=o.view.xa(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=fe(o);u.onlineState=c;let l=!1;u.queries.forEach(((d,p)=>{for(const g of p.Ca)g.xa(c)&&(l=!0)})),l&&Rc(u)})(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function qE(n,e,t){const r=fe(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let o=new Pe(J.comparator);o=o.insert(i,We.newNoDocument(i,ee.min()));const c=de().add(i),u=new ws(ee.min(),new Map,new Pe(ue),o,c);await vp(r,u),r.du=r.du.remove(i),r.mu.delete(e),Vc(r)}else await _a(r.localStore,e,!1).then((()=>Ea(r,e,t))).catch(ji)}function Ea(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach((r=>{n.fu.containsKey(r)||Tp(n,r)}))}function Tp(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ic(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),Vc(n))}function ih(n,e,t){for(const r of t)r instanceof gp?(n.fu.addReference(r.key,e),zE(n,r)):r instanceof yp?(j(Cc,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||Tp(n,r.key)):te(19791,{Du:r})}function zE(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||(j(Cc,"New document in limbo: "+t),n.Vu.add(r),Vc(n))}function Vc(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new J(Ie.fromString(e)),r=n.yu.next();n.mu.set(r,new NE(t)),n.du=n.du.insert(t,r),up(n.remoteStore,new Rt(Et(Wi(t.path)),r,"TargetPurposeLimboResolution",$i.ce))}}async function wp(n,e,t){const r=fe(n),s=[],i=[],o=[];r.Ru.isEmpty()||(r.Ru.forEach(((c,u)=>{o.push(r.Su(u,e,t).then((l=>{if((l||t)&&r.isPrimaryClient){const d=l?!l.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,d?"current":"not-current")}if(l){s.push(l);const d=wc.Is(u.targetId,l);i.push(d)}})))})),await Promise.all(o),r.Eu.J_(s),await(async function(u,l){const d=fe(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>M.forEach(l,(g=>M.forEach(g.Ps,(b=>d.persistence.referenceDelegate.addReference(p,g.targetId,b))).next((()=>M.forEach(g.Ts,(b=>d.persistence.referenceDelegate.removeReference(p,g.targetId,b)))))))))}catch(p){if(!Tr(p))throw p;j(Ec,"Failed to update sequence numbers: "+p)}for(const p of l){const g=p.targetId;if(!p.fromCache){const b=d.Cs.get(g),V=b.snapshotVersion,D=b.withLastLimboFreeSnapshotVersion(V);d.Cs=d.Cs.insert(g,D)}}})(r.localStore,i))}async function HE(n,e){const t=fe(n);if(!t.currentUser.isEqual(e)){j(Cc,"User change. New user:",e.toKey());const r=await ip(t.localStore,e);t.currentUser=e,(function(i,o){i.pu.forEach((c=>{c.forEach((u=>{u.reject(new W(L.CANCELLED,o))}))})),i.pu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await wp(t,r.Os)}}function WE(n,e){const t=fe(n),r=t.mu.get(e);if(r&&r.Iu)return de().add(r.key);{let s=de();const i=t.Au.get(e);if(!i)return s;for(const o of i){const c=t.Ru.get(o);s=s.unionWith(c.view.su)}return s}}function Ep(n){const e=fe(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=vp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=WE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=qE.bind(null,e),e.Eu.J_=DE.bind(null,e.eventManager),e.Eu.bu=ME.bind(null,e.eventManager),e}class Ri{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ap(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return aE(this.persistence,new sE,e.initialUser,this.serializer)}Mu(e){return new sp(Tc.Ai,this.serializer)}Fu(e){return new dE}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ri.provider={build:()=>new Ri};class KE extends Ri{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){Ae(this.persistence.referenceDelegate instanceof Pi,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new qw(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?nt.withCacheSize(this.cacheSizeBytes):nt.DEFAULT;return new sp((r=>Pi.Ai(r,t)),this.serializer)}}class Ia{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=HE.bind(null,this.syncEngine),await CE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new kE})()}createDatastore(e){const t=ap(e.databaseInfo.databaseId),r=yE(e.databaseInfo);return EE(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new AE(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>sh(this.syncEngine,t,0)),(function(){return Jl.v()?new Jl:new fE})())}createSyncEngine(e,t){return(function(s,i,o,c,u,l,d){const p=new LE(s,i,o,c,u,l);return d&&(p.wu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=fe(t);j(xt,"RemoteStore shutting down."),r.Va.add(5),await Is(r),r.ma.shutdown(),r.fa.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ia.provider={build:()=>new Ia};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):Mt("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn="FirestoreClient";class GE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=He.UNAUTHENTICATED,this.clientId=lc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{j(hn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(j(hn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=dp(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function xo(n,e){n.asyncQueue.verifyOperationInProgress(),j(hn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await ip(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function oh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await QE(n);j(hn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>eh(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>eh(e.remoteStore,s))),n._onlineComponents=e}async function QE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j(hn,"Using user provided OfflineComponentProvider");try{await xo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===L.FAILED_PRECONDITION||s.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Nn("Error using user provided cache. Falling back to memory cache: "+t),await xo(n,new Ri)}}else j(hn,"Using default OfflineComponentProvider"),await xo(n,new KE(void 0));return n._offlineComponents}async function XE(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j(hn,"Using user provided OnlineComponentProvider"),await oh(n,n._uninitializedComponentsProvider._online)):(j(hn,"Using default OnlineComponentProvider"),await oh(n,new Ia))),n._onlineComponents}async function Aa(n){const e=await XE(n),t=e.eventManager;return t.onListen=FE.bind(null,e.syncEngine),t.onUnlisten=jE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=UE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=$E.bind(null,e.syncEngine),t}function JE(n,e,t,r){const s=new Ip(r),i=new mp(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>fp(await Aa(n),i))),()=>{s.ku(),n.asyncQueue.enqueueAndForget((async()=>pp(await Aa(n),i)))}}function YE(n,e,t={}){const r=new Rn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new Ip({next:g=>{d.ku(),o.enqueueAndForget((()=>pp(i,p)));const b=g.docs.has(c);!b&&g.fromCache?l.reject(new W(L.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&g.fromCache&&u&&u.source==="server"?l.reject(new W(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new mp(Wi(c.path),d,{includeMetadataChanges:!0,$a:!0});return fp(i,p)})(await Aa(n),n.asyncQueue,e,t,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZE="ComponentProvider",ah=new Map;function eI(n,e,t,r,s){return new OT(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Ap(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="firestore.googleapis.com",ch=!0;class uh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new W(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=bp,this.ssl=ch}else this.host=e.host,this.ssl=e.ssl??ch;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=rp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<jw)throw new W(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}wT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ap(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new W(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new W(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new W(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class kc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new uh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new uh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new lT;switch(r.type){case"firstParty":return new pT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=ah.get(t);r&&(j(ZE,"Removing Datastore"),ah.delete(t),r.terminate())})(this),Promise.resolve()}}function tI(n,e,t,r={}){n=nr(n,kc);const s=ms(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&kd(`https://${c}`),i.host!==bp&&i.host!==c&&Nn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!Dn(u,o)&&(n._setSettings(u),r.mockUserToken)){let l,d;if(typeof r.mockUserToken=="string")l=r.mockUserToken,d=He.MOCK_USER;else{l=Fg(r.mockUserToken,n._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new W(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new He(p)}n._authCredentials=new hT(new If(l,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Yi(this.firestore,e,this._query)}}class Ke{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new hs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ke(this.firestore,e,this._key)}toJSON(){return{type:Ke._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(vs(t,Ke._jsonSchema))return new Ke(e,r||null,new J(Ie.fromString(t.referencePath)))}}Ke._jsonSchemaVersion="firestore/documentReference/1.0",Ke._jsonSchema={type:xe("string",Ke._jsonSchemaVersion),referencePath:xe("string")};class hs extends Yi{constructor(e,t,r){super(e,t,Wi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ke(this.firestore,null,new J(e))}withConverter(e){return new hs(this.firestore,e,this._path)}}function TS(n,e,...t){if(n=bt(n),arguments.length===1&&(e=lc.newId()),TT("doc","path",e),n instanceof kc){const r=Ie.fromString(e,...t);return El(r),new Ke(n,null,new J(r))}{if(!(n instanceof Ke||n instanceof hs))throw new W(L.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ie.fromString(e,...t));return El(r),new Ke(n.firestore,n instanceof hs?n.converter:null,new J(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh="AsyncQueue";class hh{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new cp(this,"async_queue_retry"),this.cc=()=>{const r=Mo();r&&j(lh,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=Mo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=Mo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new Rn;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!Tr(e))throw e;j(lh,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((r=>{throw this.oc=r,this._c=!1,Mt("INTERNAL UNHANDLED ERROR: ",dh(r)),r})).then((r=>(this._c=!1,r))))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=Pc.createAndSchedule(this,e,t,r,(i=>this.Ic(i)));return this.sc.push(s),s}hc(){this.oc&&te(47125,{Ec:dh(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function dh(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Ci extends kc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new hh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new hh(e),this._firestoreClient=void 0,await e}}}function wS(n,e){const t=typeof n=="object"?n:xd(),r=typeof n=="string"?n:e||Ti,s=Za(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Ng("firestore");i&&tI(s,...i)}return s}function Sp(n){if(n._terminated)throw new W(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||nI(n),n._firestoreClient}function nI(n){const e=n._freezeSettings(),t=eI(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new GE(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new vt($e.fromBase64String(e))}catch(t){throw new W(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new vt($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:vt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(vs(e,vt._jsonSchema))return vt.fromBase64String(e.bytes)}}vt._jsonSchemaVersion="firestore/bytes/1.0",vt._jsonSchema={type:xe("string",vt._jsonSchemaVersion),bytes:xe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:nn._jsonSchemaVersion}}static fromJSON(e){if(vs(e,nn._jsonSchema))return new nn(e.latitude,e.longitude)}}nn._jsonSchemaVersion="firestore/geoPoint/1.0",nn._jsonSchema={type:xe("string",nn._jsonSchemaVersion),latitude:xe("number"),longitude:xe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:rn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(vs(e,rn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new rn(e.vectorValues);throw new W(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rn._jsonSchemaVersion="firestore/vectorValue/1.0",rn._jsonSchema={type:xe("string",rn._jsonSchemaVersion),vectorValues:xe("object")};function Rp(n,e,t){if((e=bt(e))instanceof Pp)return e._internalPath;if(typeof e=="string")return sI(n,e);throw ba("Field path arguments must be of type string or ",n)}const rI=new RegExp("[~\\*/\\[\\]]");function sI(n,e,t){if(e.search(rI)>=0)throw ba(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new Pp(...e.split("."))._internalPath}catch{throw ba(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function ba(n,e,t,r,s){let i=`Function ${e}() called with invalid data`;i+=". ";let o="";return new W(L.INVALID_ARGUMENT,i+n+o)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{convertValue(e,t="none"){switch(cn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(an(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw te(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ts(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[ca].arrayValue?.values?.map((r=>Ce(r.doubleValue)));return new rn(t)}convertGeoPoint(e){return new nn(Ce(e.latitude),Ce(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=zi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(as(e));default:return null}}convertTimestamp(e){const t=on(e);return new Me(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ie.fromString(e);Ae(np(r),9688,{name:e});const s=new cs(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(t)||Mt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp extends iI{constructor(e){super(),this.firestore=e}convertBytes(e){return new vt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ke(this.firestore,null,t)}}const fh="@firebase/firestore",ph="4.15.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mh(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new oI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Rp("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class oI extends Vp{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Kr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Vn extends Vp{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new oi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Rp("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Vn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Vn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Vn._jsonSchema={type:xe("string",Vn._jsonSchemaVersion),bundleSource:xe("string","DocumentSnapshot"),bundleName:xe("string"),bundle:xe("string")};class oi extends Vn{data(e={}){return super.data(e)}}class or{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Kr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new oi(this._firestore,this._userDataWriter,r.key,r,new Kr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new oi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Kr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new oi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Kr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:cI(c.type),doc:u,oldIndex:l,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=or._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=lc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function cI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return te(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */or._jsonSchemaVersion="firestore/querySnapshot/1.0",or._jsonSchema={type:xe("string",or._jsonSchemaVersion),bundleSource:xe("string","QuerySnapshot"),bundleName:xe("string"),bundle:xe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ES(n){n=nr(n,Ke);const e=nr(n.firestore,Ci),t=Sp(e);return YE(t,n._key).then((r=>kp(e,n,r)))}function IS(n,...e){n=bt(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||mh(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(mh(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let i,o,c;if(n instanceof Ke)o=nr(n.firestore,Ci),c=Wi(n._key.path),i={next:l=>{e[r]&&e[r](kp(o,n,l))},error:e[r+1],complete:e[r+2]};else{const l=nr(n,Yi);o=nr(l.firestore,Ci),c=l._query;const d=new Cp(o);i={next:p=>{e[r]&&e[r](new or(o,d,l,p))},error:e[r+1],complete:e[r+2]},aI(n._query)}const u=Sp(o);return JE(u,c,s,i)}function kp(n,e,t){const r=t.docs.get(e._key),s=new Cp(n);return new Vn(n,s,e._key,r,new Kr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){uT(yr),cr(new Mn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Ci(new dT(r.getProvider("auth-internal")),new mT(o,r.getProvider("app-check-internal")),NT(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),en(fh,ph,e),en(fh,ph,"esm2020")})();const gh=n=>{let e;const t=new Set,r=(l,d)=>{const p=typeof l=="function"?l(e):l;if(!Object.is(p,e)){const g=e;e=d??(typeof p!="object"||p===null)?p:Object.assign({},e,p),t.forEach(b=>b(e,g))}},s=()=>e,c={setState:r,getState:s,getInitialState:()=>u,subscribe:l=>(t.add(l),()=>t.delete(l))},u=e=n(r,s,c);return c},AS=(n=>n?gh(n):gh);function uI(n,e){let t;try{t=n()}catch{return}return{getItem:s=>{var i;const o=u=>u===null?null:JSON.parse(u,void 0),c=(i=t.getItem(s))!=null?i:null;return c instanceof Promise?c.then(o):o(c)},setItem:(s,i)=>t.setItem(s,JSON.stringify(i,void 0)),removeItem:s=>t.removeItem(s)}}const Sa=n=>e=>{try{const t=n(e);return t instanceof Promise?t:{then(r){return Sa(r)(t)},catch(r){return this}}}catch(t){return{then(r){return this},catch(r){return Sa(r)(t)}}}},lI=(n,e)=>(t,r,s)=>{let i={storage:uI(()=>window.localStorage),partialize:P=>P,version:0,merge:(P,x)=>({...x,...P}),...e},o=!1,c=0;const u=new Set,l=new Set;let d=i.storage;if(!d)return n((...P)=>{console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`),t(...P)},r,s);const p=()=>{const P=i.partialize({...r()});return d.setItem(i.name,{state:P,version:i.version})},g=s.setState;s.setState=(P,x)=>(g(P,x),p());const b=n((...P)=>(t(...P),p()),r,s);s.getInitialState=()=>b;let V;const D=()=>{var P,x;if(!d)return;const B=++c;o=!1,u.forEach(N=>{var $;return N(($=r())!=null?$:b)});const O=((x=i.onRehydrateStorage)==null?void 0:x.call(i,(P=r())!=null?P:b))||void 0;return Sa(d.getItem.bind(d))(i.name).then(N=>{if(N)if(typeof N.version=="number"&&N.version!==i.version){if(i.migrate){const $=i.migrate(N.state,N.version);return $ instanceof Promise?$.then(K=>[!0,K]):[!0,$]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,N.state];return[!1,void 0]}).then(N=>{var $;if(B!==c)return;const[K,I]=N;if(V=i.merge(I,($=r())!=null?$:b),t(V,!0),K)return p()}).then(()=>{B===c&&(O?.(r(),void 0),V=r(),o=!0,l.forEach(N=>N(V)))}).catch(N=>{B===c&&O?.(void 0,N)})};return s.persist={setOptions:P=>{i={...i,...P},P.storage&&(d=P.storage)},clearStorage:()=>{d?.removeItem(i.name)},getOptions:()=>i,rehydrate:()=>D(),hasHydrated:()=>o,onHydrate:P=>(u.add(P),()=>{u.delete(P)}),onFinishHydration:P=>(l.add(P),()=>{l.delete(P)})},i.skipHydration||D(),V||b},bS=lI;function Dc(n,e){n.indexOf(e)===-1&&n.push(e)}function Vi(n,e){const t=n.indexOf(e);t>-1&&n.splice(t,1)}const Ot=(n,e,t)=>t>e?e:t<n?n:t;let Mc=()=>{};const dn={},Dp=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);function Mp(n){return typeof n=="object"&&n!==null}const xp=n=>/^0[^.\s]+$/u.test(n);function Op(n){let e;return()=>(e===void 0&&(e=n()),e)}const fn=n=>n,hI=(n,e)=>t=>e(n(t)),xc=(...n)=>n.reduce(hI),Oc=(n,e,t)=>{const r=e-n;return r===0?1:(t-n)/r};class Nc{constructor(){this.subscriptions=[]}add(e){return Dc(this.subscriptions,e),()=>Vi(this.subscriptions,e)}notify(e,t,r){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](e,t,r);else for(let i=0;i<s;i++){const o=this.subscriptions[i];o&&o(e,t,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const ht=n=>n*1e3,lt=n=>n/1e3;function Np(n,e){return e?n*(1e3/e):0}const Lp=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,dI=1e-7,fI=12;function pI(n,e,t,r,s){let i,o,c=0;do o=e+(t-e)/2,i=Lp(o,r,s)-n,i>0?t=o:e=o;while(Math.abs(i)>dI&&++c<fI);return o}function bs(n,e,t,r){if(n===e&&t===r)return fn;const s=i=>pI(i,0,1,n,t);return i=>i===0||i===1?i:Lp(s(i),e,r)}const Fp=n=>e=>e<=.5?n(2*e)/2:(2-n(2*(1-e)))/2,Up=n=>e=>1-n(1-e),Bp=bs(.33,1.53,.69,.99),Lc=Up(Bp),jp=Fp(Lc),$p=n=>n>=1?1:(n*=2)<1?.5*Lc(n):.5*(2-Math.pow(2,-10*(n-1))),Fc=n=>1-Math.sin(Math.acos(n)),qp=Up(Fc),zp=Fp(Fc),mI=bs(.42,0,1,1),gI=bs(0,0,.58,1),Hp=bs(.42,0,.58,1),yI=n=>Array.isArray(n)&&typeof n[0]!="number",Wp=n=>Array.isArray(n)&&typeof n[0]=="number",_I={linear:fn,easeIn:mI,easeInOut:Hp,easeOut:gI,circIn:Fc,circInOut:zp,circOut:qp,backIn:Lc,backInOut:jp,backOut:Bp,anticipate:$p},vI=n=>typeof n=="string",yh=n=>{if(Wp(n)){Mc(n.length===4);const[e,t,r,s]=n;return bs(e,t,r,s)}else if(vI(n))return _I[n];return n},Xs=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function TI(n,e){let t=new Set,r=new Set,s=!1,i=!1;const o=new WeakSet;let c={delta:0,timestamp:0,isProcessing:!1};function u(d){o.has(d)&&(l.schedule(d),n()),d(c)}const l={schedule:(d,p=!1,g=!1)=>{const V=g&&s?t:r;return p&&o.add(d),V.add(d),d},cancel:d=>{r.delete(d),o.delete(d)},process:d=>{if(c=d,s){i=!0;return}s=!0;const p=t;t=r,r=p,t.forEach(u),t.clear(),s=!1,i&&(i=!1,l.process(d))}};return l}const wI=40;function Kp(n,e){let t=!1,r=!0;const s={delta:0,timestamp:0,isProcessing:!1},i=()=>t=!0,o=Xs.reduce((O,N)=>(O[N]=TI(i),O),{}),{setup:c,read:u,resolveKeyframes:l,preUpdate:d,update:p,preRender:g,render:b,postRender:V}=o,D=()=>{const O=dn.useManualTiming,N=O?s.timestamp:performance.now();t=!1,O||(s.delta=r?1e3/60:Math.max(Math.min(N-s.timestamp,wI),1)),s.timestamp=N,s.isProcessing=!0,c.process(s),u.process(s),l.process(s),d.process(s),p.process(s),g.process(s),b.process(s),V.process(s),s.isProcessing=!1,t&&e&&(r=!1,n(D))},P=()=>{t=!0,r=!0,s.isProcessing||n(D)};return{schedule:Xs.reduce((O,N)=>{const $=o[N];return O[N]=(K,I=!1,y=!1)=>(t||P(),$.schedule(K,I,y)),O},{}),cancel:O=>{for(let N=0;N<Xs.length;N++)o[Xs[N]].cancel(O)},state:s,steps:o}}const{schedule:Ge,cancel:Ln,state:Ze,steps:Oo}=Kp(typeof requestAnimationFrame<"u"?requestAnimationFrame:fn,!0);let ai;function EI(){ai=void 0}const tt={now:()=>(ai===void 0&&tt.set(Ze.isProcessing||dn.useManualTiming?Ze.timestamp:performance.now()),ai),set:n=>{ai=n,queueMicrotask(EI)}},Gp=n=>e=>typeof e=="string"&&e.startsWith(n),Qp=Gp("--"),II=Gp("var(--"),Uc=n=>II(n)?AI.test(n.split("/*")[0].trim()):!1,AI=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function _h(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Er={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},ds={...Er,transform:n=>Ot(0,1,n)},Js={...Er,default:1},es=n=>Math.round(n*1e5)/1e5,Bc=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function bI(n){return n==null}const SI=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,jc=(n,e)=>t=>!!(typeof t=="string"&&SI.test(t)&&t.startsWith(n)||e&&!bI(t)&&Object.prototype.hasOwnProperty.call(t,e)),Xp=(n,e,t)=>r=>{if(typeof r!="string")return r;const[s,i,o,c]=r.match(Bc);return{[n]:parseFloat(s),[e]:parseFloat(i),[t]:parseFloat(o),alpha:c!==void 0?parseFloat(c):1}},PI=n=>Ot(0,255,n),No={...Er,transform:n=>Math.round(PI(n))},bn={test:jc("rgb","red"),parse:Xp("red","green","blue"),transform:({red:n,green:e,blue:t,alpha:r=1})=>"rgba("+No.transform(n)+", "+No.transform(e)+", "+No.transform(t)+", "+es(ds.transform(r))+")"};function RI(n){let e="",t="",r="",s="";return n.length>5?(e=n.substring(1,3),t=n.substring(3,5),r=n.substring(5,7),s=n.substring(7,9)):(e=n.substring(1,2),t=n.substring(2,3),r=n.substring(3,4),s=n.substring(4,5),e+=e,t+=t,r+=r,s+=s),{red:parseInt(e,16),green:parseInt(t,16),blue:parseInt(r,16),alpha:s?parseInt(s,16)/255:1}}const Pa={test:jc("#"),parse:RI,transform:bn.transform},Ss=n=>({test:e=>typeof e=="string"&&e.endsWith(n)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${n}`}),Ht=Ss("deg"),Ct=Ss("%"),q=Ss("px"),CI=Ss("vh"),VI=Ss("vw"),vh={...Ct,parse:n=>Ct.parse(n)/100,transform:n=>Ct.transform(n*100)},Xn={test:jc("hsl","hue"),parse:Xp("hue","saturation","lightness"),transform:({hue:n,saturation:e,lightness:t,alpha:r=1})=>"hsla("+Math.round(n)+", "+Ct.transform(es(e))+", "+Ct.transform(es(t))+", "+es(ds.transform(r))+")"},De={test:n=>bn.test(n)||Pa.test(n)||Xn.test(n),parse:n=>bn.test(n)?bn.parse(n):Xn.test(n)?Xn.parse(n):Pa.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?bn.transform(n):Xn.transform(n),getAnimatableNone:n=>{const e=De.parse(n);return e.alpha=0,De.transform(e)}},kI=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function DI(n){return isNaN(n)&&typeof n=="string"&&(n.match(Bc)?.length||0)+(n.match(kI)?.length||0)>0}const Jp="number",Yp="color",MI="var",xI="var(",Th="${}",OI=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function pr(n){const e=n.toString(),t=[],r={color:[],number:[],var:[]},s=[];let i=0;const c=e.replace(OI,u=>(De.test(u)?(r.color.push(i),s.push(Yp),t.push(De.parse(u))):u.startsWith(xI)?(r.var.push(i),s.push(MI),t.push(u)):(r.number.push(i),s.push(Jp),t.push(parseFloat(u))),++i,Th)).split(Th);return{values:t,split:c,indexes:r,types:s}}function NI(n){return pr(n).values}function Zp({split:n,types:e}){const t=n.length;return r=>{let s="";for(let i=0;i<t;i++)if(s+=n[i],r[i]!==void 0){const o=e[i];o===Jp?s+=es(r[i]):o===Yp?s+=De.transform(r[i]):s+=r[i]}return s}}function LI(n){return Zp(pr(n))}const FI=n=>typeof n=="number"?0:De.test(n)?De.getAnimatableNone(n):n,UI=(n,e)=>typeof n=="number"?e?.trim().endsWith("/")?n:0:FI(n);function BI(n){const e=pr(n);return Zp(e)(e.values.map((r,s)=>UI(r,e.split[s])))}const dt={test:DI,parse:NI,createTransformer:LI,getAnimatableNone:BI};function Lo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*(2/3-t)*6:n}function jI({hue:n,saturation:e,lightness:t,alpha:r}){n/=360,e/=100,t/=100;let s=0,i=0,o=0;if(!e)s=i=o=t;else{const c=t<.5?t*(1+e):t+e-t*e,u=2*t-c;s=Lo(u,c,n+1/3),i=Lo(u,c,n),o=Lo(u,c,n-1/3)}return{red:Math.round(s*255),green:Math.round(i*255),blue:Math.round(o*255),alpha:r}}function ki(n,e){return t=>t>0?e:n}const Ve=(n,e,t)=>n+(e-n)*t,Fo=(n,e,t)=>{const r=n*n,s=t*(e*e-r)+r;return s<0?0:Math.sqrt(s)},$I=[Pa,bn,Xn],qI=n=>$I.find(e=>e.test(n));function wh(n){const e=qI(n);if(!e)return!1;let t=e.parse(n);return e===Xn&&(t=jI(t)),t}const Eh=(n,e)=>{const t=wh(n),r=wh(e);if(!t||!r)return ki(n,e);const s={...t};return i=>(s.red=Fo(t.red,r.red,i),s.green=Fo(t.green,r.green,i),s.blue=Fo(t.blue,r.blue,i),s.alpha=Ve(t.alpha,r.alpha,i),bn.transform(s))},Ra=new Set(["none","hidden"]);function zI(n,e){return Ra.has(n)?t=>t<=0?n:e:t=>t>=1?e:n}function HI(n,e){return t=>Ve(n,e,t)}function $c(n){return typeof n=="number"?HI:typeof n=="string"?Uc(n)?ki:De.test(n)?Eh:GI:Array.isArray(n)?em:typeof n=="object"?De.test(n)?Eh:WI:ki}function em(n,e){const t=[...n],r=t.length,s=n.map((i,o)=>$c(i)(i,e[o]));return i=>{for(let o=0;o<r;o++)t[o]=s[o](i);return t}}function WI(n,e){const t={...n,...e},r={};for(const s in t)n[s]!==void 0&&e[s]!==void 0&&(r[s]=$c(n[s])(n[s],e[s]));return s=>{for(const i in r)t[i]=r[i](s);return t}}function KI(n,e){const t=[],r={color:0,var:0,number:0};for(let s=0;s<e.values.length;s++){const i=e.types[s],o=n.indexes[i][r[i]],c=n.values[o]??0;t[s]=c,r[i]++}return t}const GI=(n,e)=>{const t=dt.createTransformer(e),r=pr(n),s=pr(e);return r.indexes.var.length===s.indexes.var.length&&r.indexes.color.length===s.indexes.color.length&&r.indexes.number.length>=s.indexes.number.length?Ra.has(n)&&!s.values.length||Ra.has(e)&&!r.values.length?zI(n,e):xc(em(KI(r,s),s.values),t):ki(n,e)};function tm(n,e,t){return typeof n=="number"&&typeof e=="number"&&typeof t=="number"?Ve(n,e,t):$c(n)(n,e)}const QI=n=>{const e=({timestamp:t})=>n(t);return{start:(t=!0)=>Ge.update(e,t),stop:()=>Ln(e),now:()=>Ze.isProcessing?Ze.timestamp:tt.now()}},nm=(n,e,t=10)=>{let r="";const s=Math.max(Math.round(e/t),2);for(let i=0;i<s;i++)r+=Math.round(n(i/(s-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},Di=2e4;function qc(n){let e=0;const t=50;let r=n.next(e);for(;!r.done&&e<Di;)e+=t,r=n.next(e);return e>=Di?1/0:e}function XI(n,e=100,t){const r=t({...n,keyframes:[0,e]}),s=Math.min(qc(r),Di);return{type:"keyframes",ease:i=>r.next(s*i).value/e,duration:lt(s)}}const Se={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Ca(n,e){return n*Math.sqrt(1-e*e)}const JI=12;function YI(n,e,t){let r=t;for(let s=1;s<JI;s++)r=r-n(r)/e(r);return r}const Uo=.001;function ZI({duration:n=Se.duration,bounce:e=Se.bounce,velocity:t=Se.velocity,mass:r=Se.mass}){let s,i,o=1-e;o=Ot(Se.minDamping,Se.maxDamping,o),n=Ot(Se.minDuration,Se.maxDuration,lt(n)),o<1?(s=l=>{const d=l*o,p=d*n,g=d-t,b=Ca(l,o),V=Math.exp(-p);return Uo-g/b*V},i=l=>{const p=l*o*n,g=p*t+t,b=Math.pow(o,2)*Math.pow(l,2)*n,V=Math.exp(-p),D=Ca(Math.pow(l,2),o);return(-s(l)+Uo>0?-1:1)*((g-b)*V)/D}):(s=l=>{const d=Math.exp(-l*n),p=(l-t)*n+1;return-Uo+d*p},i=l=>{const d=Math.exp(-l*n),p=(t-l)*(n*n);return d*p});const c=5/n,u=YI(s,i,c);if(n=ht(n),isNaN(u))return{stiffness:Se.stiffness,damping:Se.damping,duration:n};{const l=Math.pow(u,2)*r;return{stiffness:l,damping:o*2*Math.sqrt(r*l),duration:n}}}const eA=["duration","bounce"],tA=["stiffness","damping","mass"];function Ih(n,e){return e.some(t=>n[t]!==void 0)}function nA(n){let e={velocity:Se.velocity,stiffness:Se.stiffness,damping:Se.damping,mass:Se.mass,isResolvedFromDuration:!1,...n};if(!Ih(n,tA)&&Ih(n,eA))if(e.velocity=0,n.visualDuration){const t=n.visualDuration,r=2*Math.PI/(t*1.2),s=r*r,i=2*Ot(.05,1,1-(n.bounce||0))*Math.sqrt(s);e={...e,mass:Se.mass,stiffness:s,damping:i}}else{const t=ZI({...n,velocity:0});e={...e,...t,mass:Se.mass},e.isResolvedFromDuration=!0}return e}function Mi(n=Se.visualDuration,e=Se.bounce){const t=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:e}:n;let{restSpeed:r,restDelta:s}=t;const i=t.keyframes[0],o=t.keyframes[t.keyframes.length-1],c={done:!1,value:i},{stiffness:u,damping:l,mass:d,duration:p,velocity:g,isResolvedFromDuration:b}=nA({...t,velocity:-lt(t.velocity||0)}),V=g||0,D=l/(2*Math.sqrt(u*d)),P=o-i,x=lt(Math.sqrt(u/d)),B=Math.abs(P)<5;r||(r=B?Se.restSpeed.granular:Se.restSpeed.default),s||(s=B?Se.restDelta.granular:Se.restDelta.default);let O,N,$,K,I,y;if(D<1)$=Ca(x,D),K=(V+D*x*P)/$,O=w=>{const E=Math.exp(-D*x*w);return o-E*(K*Math.sin($*w)+P*Math.cos($*w))},I=D*x*K+P*$,y=D*x*P-K*$,N=w=>Math.exp(-D*x*w)*(I*Math.sin($*w)+y*Math.cos($*w));else if(D===1){O=E=>o-Math.exp(-x*E)*(P+(V+x*P)*E);const w=V+x*P;N=E=>Math.exp(-x*E)*(x*w*E-V)}else{const w=x*Math.sqrt(D*D-1);O=le=>{const pe=Math.exp(-D*x*le),F=Math.min(w*le,300);return o-pe*((V+D*x*P)*Math.sinh(F)+w*P*Math.cosh(F))/w};const E=(V+D*x*P)/w,S=D*x*E-P*w,T=D*x*P-E*w;N=le=>{const pe=Math.exp(-D*x*le),F=Math.min(w*le,300);return pe*(S*Math.sinh(F)+T*Math.cosh(F))}}const v={calculatedDuration:b&&p||null,velocity:w=>ht(N(w)),next:w=>{if(!b&&D<1){const S=Math.exp(-D*x*w),T=Math.sin($*w),le=Math.cos($*w),pe=o-S*(K*T+P*le),F=ht(S*(I*T+y*le));return c.done=Math.abs(F)<=r&&Math.abs(o-pe)<=s,c.value=c.done?o:pe,c}const E=O(w);if(b)c.done=w>=p;else{const S=ht(N(w));c.done=Math.abs(S)<=r&&Math.abs(o-E)<=s}return c.value=c.done?o:E,c},toString:()=>{const w=Math.min(qc(v),Di),E=nm(S=>v.next(w*S).value,w,30);return w+"ms "+E},toTransition:()=>{}};return v}Mi.applyToOptions=n=>{const e=XI(n,100,Mi);return n.ease=e.ease,n.duration=ht(e.duration),n.type="keyframes",n};const rA=5;function rm(n,e,t){const r=Math.max(e-rA,0);return Np(t-n(r),e-r)}function Va({keyframes:n,velocity:e=0,power:t=.8,timeConstant:r=325,bounceDamping:s=10,bounceStiffness:i=500,modifyTarget:o,min:c,max:u,restDelta:l=.5,restSpeed:d}){const p=n[0],g={done:!1,value:p},b=y=>c!==void 0&&y<c||u!==void 0&&y>u,V=y=>c===void 0?u:u===void 0||Math.abs(c-y)<Math.abs(u-y)?c:u;let D=t*e;const P=p+D,x=o===void 0?P:o(P);x!==P&&(D=x-p);const B=y=>-D*Math.exp(-y/r),O=y=>x+B(y),N=y=>{const v=B(y),w=O(y);g.done=Math.abs(v)<=l,g.value=g.done?x:w};let $,K;const I=y=>{b(g.value)&&($=y,K=Mi({keyframes:[g.value,V(g.value)],velocity:rm(O,y,g.value),damping:s,stiffness:i,restDelta:l,restSpeed:d}))};return I(0),{calculatedDuration:null,next:y=>{let v=!1;return!K&&$===void 0&&(v=!0,N(y),I(y)),$!==void 0&&y>=$?K.next(y-$):(!v&&N(y),g)}}}function sA(n,e,t){const r=[],s=t||dn.mix||tm,i=n.length-1;for(let o=0;o<i;o++){let c=s(n[o],n[o+1]);if(e){const u=Array.isArray(e)?e[o]||fn:e;c=xc(u,c)}r.push(c)}return r}function iA(n,e,{clamp:t=!0,ease:r,mixer:s}={}){const i=n.length;if(Mc(i===e.length),i===1)return()=>e[0];if(i===2&&e[0]===e[1])return()=>e[1];const o=n[0]===n[1];n[0]>n[i-1]&&(n=[...n].reverse(),e=[...e].reverse());const c=sA(e,r,s),u=c.length,l=d=>{if(o&&d<n[0])return e[0];let p=0;if(u>1)for(;p<n.length-2&&!(d<n[p+1]);p++);const g=Oc(n[p],n[p+1],d);return c[p](g)};return t?d=>l(Ot(n[0],n[i-1],d)):l}function oA(n,e){const t=n[n.length-1];for(let r=1;r<=e;r++){const s=Oc(0,e,r);n.push(Ve(t,1,s))}}function aA(n){const e=[0];return oA(e,n.length-1),e}function cA(n,e){return n.map(t=>t*e)}function uA(n,e){return n.map(()=>e||Hp).splice(0,n.length-1)}function ts({duration:n=300,keyframes:e,times:t,ease:r="easeInOut"}){const s=yI(r)?r.map(yh):yh(r),i={done:!1,value:e[0]},o=cA(t&&t.length===e.length?t:aA(e),n),c=iA(o,e,{ease:Array.isArray(s)?s:uA(e,s)});return{calculatedDuration:n,next:u=>(i.value=c(u),i.done=u>=n,i)}}const lA=n=>n!==null;function Zi(n,{repeat:e,repeatType:t="loop"},r,s=1){const i=n.filter(lA),c=s<0||e&&t!=="loop"&&e%2===1?0:i.length-1;return!c||r===void 0?i[c]:r}const hA={decay:Va,inertia:Va,tween:ts,keyframes:ts,spring:Mi};function sm(n){typeof n.type=="string"&&(n.type=hA[n.type])}class zc{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,t){return this.finished.then(e,t)}}const dA=n=>n/100;class xi extends zc{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{const{motionValue:t}=this.options;t&&t.updatedAt!==tt.now()&&this.tick(tt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){const{options:e}=this;sm(e);const{type:t=ts,repeat:r=0,repeatDelay:s=0,repeatType:i,velocity:o=0}=e;let{keyframes:c}=e;const u=t||ts;u!==ts&&typeof c[0]!="number"&&(this.mixKeyframes=xc(dA,tm(c[0],c[1])),c=[0,100]);const l=u({...e,keyframes:c});i==="mirror"&&(this.mirroredGenerator=u({...e,keyframes:[...c].reverse(),velocity:-o})),l.calculatedDuration===null&&(l.calculatedDuration=qc(l));const{calculatedDuration:d}=l;this.calculatedDuration=d,this.resolvedDuration=d+s,this.totalDuration=this.resolvedDuration*(r+1)-s,this.generator=l}updateTime(e){const t=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=t}tick(e,t=!1){const{generator:r,totalDuration:s,mixKeyframes:i,mirroredGenerator:o,resolvedDuration:c,calculatedDuration:u}=this;if(this.startTime===null)return r.next(0);const{delay:l=0,keyframes:d,repeat:p,repeatType:g,repeatDelay:b,type:V,onUpdate:D,finalKeyframe:P}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-s/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);const x=this.currentTime-l*(this.playbackSpeed>=0?1:-1),B=this.playbackSpeed>=0?x<0:x>s;this.currentTime=Math.max(x,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=s);let O=this.currentTime,N=r;if(p){const y=Math.min(this.currentTime,s)/c;let v=Math.floor(y),w=y%1;!w&&y>=1&&(w=1),w===1&&v--,v=Math.min(v,p+1),!!(v%2)&&(g==="reverse"?(w=1-w,b&&(w-=b/c)):g==="mirror"&&(N=o)),O=Ot(0,1,w)*c}let $;B?(this.delayState.value=d[0],$=this.delayState):$=N.next(O),i&&!B&&($.value=i($.value));let{done:K}=$;!B&&u!==null&&(K=this.playbackSpeed>=0?this.currentTime>=s:this.currentTime<=0);const I=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&K);return I&&V!==Va&&($.value=Zi(d,this.options,P,this.speed)),D&&D($.value),I&&this.finish(),$}then(e,t){return this.finished.then(e,t)}get duration(){return lt(this.calculatedDuration)}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+lt(e)}get time(){return lt(this.currentTime)}set time(e){e=ht(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){const e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);const t=this.generator.next(e).value;return rm(r=>this.generator.next(r).value,e,t)}get speed(){return this.playbackSpeed}set speed(e){const t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(tt.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=lt(this.currentTime))}play(){if(this.isStopped)return;const{driver:e=QI,startTime:t}=this.options;this.driver||(this.driver=e(s=>this.tick(s))),this.options.onPlay?.();const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=t??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(tt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),e.observe(this)}}function fA(n){for(let e=1;e<n.length;e++)n[e]??(n[e]=n[e-1])}const Sn=n=>n*180/Math.PI,ka=n=>{const e=Sn(Math.atan2(n[1],n[0]));return Da(e)},pA={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:ka,rotateZ:ka,skewX:n=>Sn(Math.atan(n[1])),skewY:n=>Sn(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Da=n=>(n=n%360,n<0&&(n+=360),n),Ah=ka,bh=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),Sh=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),mA={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:bh,scaleY:Sh,scale:n=>(bh(n)+Sh(n))/2,rotateX:n=>Da(Sn(Math.atan2(n[6],n[5]))),rotateY:n=>Da(Sn(Math.atan2(-n[2],n[0]))),rotateZ:Ah,rotate:Ah,skewX:n=>Sn(Math.atan(n[4])),skewY:n=>Sn(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function Ma(n){return n.includes("scale")?1:0}function xa(n,e){if(!n||n==="none")return Ma(e);const t=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,s;if(t)r=mA,s=t;else{const c=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=pA,s=c}if(!s)return Ma(e);const i=r[e],o=s[1].split(",").map(yA);return typeof i=="function"?i(o):o[i]}const gA=(n,e)=>{const{transform:t="none"}=getComputedStyle(n);return xa(t,e)};function yA(n){return parseFloat(n.trim())}const Ir=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Ar=new Set(Ir),Ph=n=>n===Er||n===q,_A=new Set(["x","y","z"]),vA=Ir.filter(n=>!_A.has(n));function TA(n){const e=[];return vA.forEach(t=>{const r=n.getValue(t);r!==void 0&&(e.push([t,r.get()]),r.set(t.startsWith("scale")?1:0))}),e}const Jt={width:({x:n},{paddingLeft:e="0",paddingRight:t="0",boxSizing:r})=>{const s=n.max-n.min;return r==="border-box"?s:s-parseFloat(e)-parseFloat(t)},height:({y:n},{paddingTop:e="0",paddingBottom:t="0",boxSizing:r})=>{const s=n.max-n.min;return r==="border-box"?s:s-parseFloat(e)-parseFloat(t)},top:(n,{top:e})=>parseFloat(e),left:(n,{left:e})=>parseFloat(e),bottom:({y:n},{top:e})=>parseFloat(e)+(n.max-n.min),right:({x:n},{left:e})=>parseFloat(e)+(n.max-n.min),x:(n,{transform:e})=>xa(e,"x"),y:(n,{transform:e})=>xa(e,"y")};Jt.translateX=Jt.x;Jt.translateY=Jt.y;const kn=new Set;let Oa=!1,Na=!1,La=!1;function im(){if(Na){const n=Array.from(kn).filter(r=>r.needsMeasurement),e=new Set(n.map(r=>r.element)),t=new Map;e.forEach(r=>{const s=TA(r);s.length&&(t.set(r,s),r.render())}),n.forEach(r=>r.measureInitialState()),e.forEach(r=>{r.render();const s=t.get(r);s&&s.forEach(([i,o])=>{r.getValue(i)?.set(o)})}),n.forEach(r=>r.measureEndState()),n.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Na=!1,Oa=!1,kn.forEach(n=>n.complete(La)),kn.clear()}function om(){kn.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Na=!0)})}function wA(){La=!0,om(),im(),La=!1}class Hc{constructor(e,t,r,s,i,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=r,this.motionValue=s,this.element=i,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(kn.add(this),Oa||(Oa=!0,Ge.read(om),Ge.resolveKeyframes(im))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:e,name:t,element:r,motionValue:s}=this;if(e[0]===null){const i=s?.get(),o=e[e.length-1];if(i!==void 0)e[0]=i;else if(r&&t){const c=r.readValue(t,o);c!=null&&(e[0]=c)}e[0]===void 0&&(e[0]=o),s&&i===void 0&&s.set(e[0])}fA(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),kn.delete(this)}cancel(){this.state==="scheduled"&&(kn.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const EA=n=>n.startsWith("--");function am(n,e,t){EA(e)?n.style.setProperty(e,t):n.style[e]=t}const IA={};function cm(n,e){const t=Op(n);return()=>IA[e]??t()}const AA=cm(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),um=cm(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Gr=([n,e,t,r])=>`cubic-bezier(${n}, ${e}, ${t}, ${r})`,Rh={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Gr([0,.65,.55,1]),circOut:Gr([.55,0,1,.45]),backIn:Gr([.31,.01,.66,-.59]),backOut:Gr([.33,1.53,.69,.99])};function lm(n,e){if(n)return typeof n=="function"?um()?nm(n,e):"ease-out":Wp(n)?Gr(n):Array.isArray(n)?n.map(t=>lm(t,e)||Rh.easeOut):Rh[n]}function bA(n,e,t,{delay:r=0,duration:s=300,repeat:i=0,repeatType:o="loop",ease:c="easeOut",times:u}={},l=void 0){const d={[e]:t};u&&(d.offset=u);const p=lm(c,s);Array.isArray(p)&&(d.easing=p);const g={delay:r,duration:s,easing:Array.isArray(p)?"linear":p,fill:"both",iterations:i+1,direction:o==="reverse"?"alternate":"normal"};return l&&(g.pseudoElement=l),n.animate(d,g)}function hm(n){return typeof n=="function"&&"applyToOptions"in n}function SA({type:n,...e}){return hm(n)&&um()?n.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}class dm extends zc{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;const{element:t,name:r,keyframes:s,pseudoElement:i,allowFlatten:o=!1,finalKeyframe:c,onComplete:u}=e;this.isPseudoElement=!!i,this.allowFlatten=o,this.options=e,Mc(typeof e.type!="string");const l=SA(e);this.animation=bA(t,r,s,l,i),l.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!i){const d=Zi(s,this.options,c,this.speed);this.updateMotionValue&&this.updateMotionValue(d),am(t,r,d),this.animation.cancel()}u?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:e}=this;e==="idle"||e==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){const e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){const e=this.animation.effect?.getComputedTiming?.().duration||0;return lt(Number(e))}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+lt(e)}get time(){return lt(Number(this.animation.currentTime)||0)}set time(e){const t=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=ht(e),t&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:t,rangeEnd:r,observe:s}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,e&&AA()?(this.animation.timeline=e,t&&(this.animation.rangeStart=t),r&&(this.animation.rangeEnd=r),fn):s(this)}}const fm={anticipate:$p,backInOut:jp,circInOut:zp};function PA(n){return n in fm}function RA(n){typeof n.ease=="string"&&PA(n.ease)&&(n.ease=fm[n.ease])}const Bo=10;class CA extends dm{constructor(e){RA(e),sm(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){const{motionValue:t,onUpdate:r,onComplete:s,element:i,...o}=this.options;if(!t)return;if(e!==void 0){t.set(e);return}const c=new xi({...o,autoplay:!1}),u=Math.max(Bo,tt.now()-this.startTime),l=Ot(0,Bo,u-Bo),d=c.sample(u).value,{name:p}=this.options;i&&p&&am(i,p,d),t.setWithVelocity(c.sample(Math.max(0,u-l)).value,d,l),c.stop()}}const Ch=(n,e)=>e==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(dt.test(n)||n==="0")&&!n.startsWith("url("));function VA(n){const e=n[0];if(n.length===1)return!0;for(let t=0;t<n.length;t++)if(n[t]!==e)return!0}function kA(n,e,t,r){const s=n[0];if(s===null)return!1;if(e==="display"||e==="visibility")return!0;const i=n[n.length-1],o=Ch(s,e),c=Ch(i,e);return!o||!c?!1:VA(n)||(t==="spring"||hm(t))&&r}function Fa(n){n.duration=0,n.type="keyframes"}const pm=new Set(["opacity","clipPath","filter","transform"]),DA=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function MA(n){for(let e=0;e<n.length;e++)if(typeof n[e]=="string"&&DA.test(n[e]))return!0;return!1}const xA=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),OA=Op(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function NA(n){const{motionValue:e,name:t,repeatDelay:r,repeatType:s,damping:i,type:o,keyframes:c}=n;if(!(e?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:l,transformTemplate:d}=e.owner.getProps();return OA()&&t&&(pm.has(t)||xA.has(t)&&MA(c))&&(t!=="transform"||!d)&&!l&&!r&&s!=="mirror"&&i!==0&&o!=="inertia"}const LA=40;class FA extends zc{constructor({autoplay:e=!0,delay:t=0,type:r="keyframes",repeat:s=0,repeatDelay:i=0,repeatType:o="loop",keyframes:c,name:u,motionValue:l,element:d,...p}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=tt.now();const g={autoplay:e,delay:t,type:r,repeat:s,repeatDelay:i,repeatType:o,name:u,motionValue:l,element:d,...p},b=d?.KeyframeResolver||Hc;this.keyframeResolver=new b(c,(V,D,P)=>this.onKeyframesResolved(V,D,g,!P),u,l,d),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,r,s){this.keyframeResolver=void 0;const{name:i,type:o,velocity:c,delay:u,isHandoff:l,onUpdate:d}=r;this.resolvedAt=tt.now();let p=!0;kA(e,i,o,c)||(p=!1,(dn.instantAnimations||!u)&&d?.(Zi(e,r,t)),e[0]=e[e.length-1],Fa(r),r.repeat=0);const b={startTime:s?this.resolvedAt?this.resolvedAt-this.createdAt>LA?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:t,...r,keyframes:e},V=p&&!l&&NA(b),D=b.motionValue?.owner?.current;let P;if(V)try{P=new CA({...b,element:D})}catch{P=new xi(b)}else P=new xi(b);P.finished.then(()=>{this.notifyFinished()}).catch(fn),this.pendingTimeline&&(this.stopTimeline=P.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=P}get finished(){return this._animation?this.animation.finished:this._finished}then(e,t){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),wA()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}function mm(n,e,t,r=0,s=1){const i=Array.from(n).sort((l,d)=>l.sortNodePosition(d)).indexOf(e),o=n.size,c=(o-1)*r;return typeof t=="function"?t(i,o):s===1?i*r:c-i*r}const UA=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function BA(n){const e=UA.exec(n);if(!e)return[,];const[,t,r,s]=e;return[`--${t??r}`,s]}function gm(n,e,t=1){const[r,s]=BA(n);if(!r)return;const i=window.getComputedStyle(e).getPropertyValue(r);if(i){const o=i.trim();return Dp(o)?parseFloat(o):o}return Uc(s)?gm(s,e,t+1):s}const jA={type:"spring",stiffness:500,damping:25,restSpeed:10},$A=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),qA={type:"keyframes",duration:.8},zA={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},HA=(n,{keyframes:e})=>e.length>2?qA:Ar.has(n)?n.startsWith("scale")?$A(e[1]):jA:zA;function ym(n,e){if(n?.inherit&&e){const{inherit:t,...r}=n;return{...e,...r}}return n}function Wc(n,e){const t=n?.[e]??n?.default??n;return t!==n?ym(t,n):t}const WA=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function KA(n){for(const e in n)if(!WA.has(e))return!0;return!1}const _m=(n,e,t,r={},s,i)=>o=>{const c=Wc(r,n)||{},u=c.delay||r.delay||0;let{elapsed:l=0}=r;l=l-ht(u);const d={keyframes:Array.isArray(t)?t:[null,t],ease:"easeOut",velocity:e.getVelocity(),...c,delay:-l,onUpdate:g=>{e.set(g),c.onUpdate&&c.onUpdate(g)},onComplete:()=>{o(),c.onComplete&&c.onComplete()},name:n,motionValue:e,element:i?void 0:s};KA(c)||Object.assign(d,HA(n,d)),d.duration&&(d.duration=ht(d.duration)),d.repeatDelay&&(d.repeatDelay=ht(d.repeatDelay)),d.from!==void 0&&(d.keyframes[0]=d.from);let p=!1;if((d.type===!1||d.duration===0&&!d.repeatDelay)&&(Fa(d),d.delay===0&&(p=!0)),(dn.instantAnimations||dn.skipAnimations||s?.shouldSkipAnimations)&&(p=!0,Fa(d),d.delay=0),d.allowFlatten=!c.type&&!c.ease,p&&!i&&e.get()!==void 0){const g=Zi(d.keyframes,c);if(g!==void 0){Ge.update(()=>{d.onUpdate(g),d.onComplete()});return}}return c.isSync?new xi(d):new FA(d)};function Vh(n){const e=[{},{}];return n?.values.forEach((t,r)=>{e[0][r]=t.get(),e[1][r]=t.getVelocity()}),e}function vm(n,e,t,r){if(typeof e=="function"){const[s,i]=Vh(r);e=e(t!==void 0?t:n.custom,s,i)}if(typeof e=="string"&&(e=n.variants&&n.variants[e]),typeof e=="function"){const[s,i]=Vh(r);e=e(t!==void 0?t:n.custom,s,i)}return e}function ar(n,e,t){const r=n.getProps();return vm(r,e,t!==void 0?t:r.custom,n)}const Tm=new Set(["width","height","top","left","right","bottom",...Ir]),kh=30,GA=n=>!isNaN(parseFloat(n));class QA{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{const s=tt.now();if(this.updatedAt!==s&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const i of this.dependents)i.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=tt.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=GA(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,t){this.events[e]||(this.events[e]=new Nc);const r=this.events[e].add(t);return e==="change"?()=>{r(),Ge.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,r){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-r}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=tt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>kh)return 0;const t=Math.min(this.updatedAt-this.prevUpdatedAt,kh);return Np(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function mr(n,e){return new QA(n,e)}const Ua=n=>Array.isArray(n);function XA(n,e,t){n.hasValue(e)?n.getValue(e).set(t):n.addValue(e,mr(t))}function JA(n){return Ua(n)?n[n.length-1]||0:n}function YA(n,e){const t=ar(n,e);let{transitionEnd:r={},transition:s={},...i}=t||{};i={...i,...r};for(const o in i){const c=JA(i[o]);XA(n,o,c)}}const rt=n=>!!(n&&n.getVelocity);function ZA(n){return!!(rt(n)&&n.add)}function e0(n,e){const t=n.getValue("willChange");if(ZA(t))return t.add(e);if(!t&&dn.WillChange){const r=new dn.WillChange("auto");n.addValue("willChange",r),r.add(e)}}function Kc(n){return n.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}const t0="framerAppearId",n0="data-"+Kc(t0);function wm(n){return n.props[n0]}function r0({protectedKeys:n,needsAnimating:e},t){const r=n.hasOwnProperty(t)&&e[t]!==!0;return e[t]=!1,r}function Em(n,e,{delay:t=0,transitionOverride:r,type:s}={}){let{transition:i,transitionEnd:o,...c}=e;const u=n.getDefaultTransition();i=i?ym(i,u):u;const l=i?.reduceMotion;r&&(i=r);const d=[],p=s&&n.animationState&&n.animationState.getState()[s];for(const g in c){const b=n.getValue(g,n.latestValues[g]??null),V=c[g];if(V===void 0||p&&r0(p,g))continue;const D={delay:t,...Wc(i||{},g)},P=b.get();if(P!==void 0&&!b.isAnimating()&&!Array.isArray(V)&&V===P&&!D.velocity){Ge.update(()=>b.set(V));continue}let x=!1;if(window.MotionHandoffAnimation){const N=wm(n);if(N){const $=window.MotionHandoffAnimation(N,g,Ge);$!==null&&(D.startTime=$,x=!0)}}e0(n,g);const B=l??n.shouldReduceMotion;b.start(_m(g,b,V,B&&Tm.has(g)?{type:!1}:D,n,x));const O=b.animation;O&&d.push(O)}if(o){const g=()=>Ge.update(()=>{o&&YA(n,o)});d.length?Promise.all(d).then(g):g()}return d}function Ba(n,e,t={}){const r=ar(n,e,t.type==="exit"?n.presenceContext?.custom:void 0);let{transition:s=n.getDefaultTransition()||{}}=r||{};t.transitionOverride&&(s=t.transitionOverride);const i=r?()=>Promise.all(Em(n,r,t)):()=>Promise.resolve(),o=n.variantChildren&&n.variantChildren.size?(u=0)=>{const{delayChildren:l=0,staggerChildren:d,staggerDirection:p}=s;return s0(n,e,u,l,d,p,t)}:()=>Promise.resolve(),{when:c}=s;if(c){const[u,l]=c==="beforeChildren"?[i,o]:[o,i];return u().then(()=>l())}else return Promise.all([i(),o(t.delay)])}function s0(n,e,t=0,r=0,s=0,i=1,o){const c=[];for(const u of n.variantChildren)u.notify("AnimationStart",e),c.push(Ba(u,e,{...o,delay:t+(typeof r=="function"?0:r)+mm(n.variantChildren,u,r,s,i)}).then(()=>u.notify("AnimationComplete",e)));return Promise.all(c)}function i0(n,e,t={}){n.notify("AnimationStart",e);let r;if(Array.isArray(e)){const s=e.map(i=>Ba(n,i,t));r=Promise.all(s)}else if(typeof e=="string")r=Ba(n,e,t);else{const s=typeof e=="function"?ar(n,e,t.custom):e;r=Promise.all(Em(n,s,t))}return r.then(()=>{n.notify("AnimationComplete",e)})}const o0={test:n=>n==="auto",parse:n=>n},Im=n=>e=>e.test(n),Am=[Er,q,Ct,Ht,VI,CI,o0],Dh=n=>Am.find(Im(n));function a0(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||xp(n):!0}const c0=new Set(["brightness","contrast","saturate","opacity"]);function u0(n){const[e,t]=n.slice(0,-1).split("(");if(e==="drop-shadow")return n;const[r]=t.match(Bc)||[];if(!r)return n;const s=t.replace(r,"");let i=c0.has(e)?1:0;return r!==t&&(i*=100),e+"("+i+s+")"}const l0=/\b([a-z-]*)\(.*?\)/gu,ja={...dt,getAnimatableNone:n=>{const e=n.match(l0);return e?e.map(u0).join(" "):n}},$a={...dt,getAnimatableNone:n=>{const e=dt.parse(n);return dt.createTransformer(n)(e.map(r=>typeof r=="number"?0:typeof r=="object"?{...r,alpha:1}:r))}},Mh={...Er,transform:Math.round},h0={rotate:Ht,rotateX:Ht,rotateY:Ht,rotateZ:Ht,scale:Js,scaleX:Js,scaleY:Js,scaleZ:Js,skew:Ht,skewX:Ht,skewY:Ht,distance:q,translateX:q,translateY:q,translateZ:q,x:q,y:q,z:q,perspective:q,transformPerspective:q,opacity:ds,originX:vh,originY:vh,originZ:q},Gc={borderWidth:q,borderTopWidth:q,borderRightWidth:q,borderBottomWidth:q,borderLeftWidth:q,borderRadius:q,borderTopLeftRadius:q,borderTopRightRadius:q,borderBottomRightRadius:q,borderBottomLeftRadius:q,width:q,maxWidth:q,height:q,maxHeight:q,top:q,right:q,bottom:q,left:q,inset:q,insetBlock:q,insetBlockStart:q,insetBlockEnd:q,insetInline:q,insetInlineStart:q,insetInlineEnd:q,padding:q,paddingTop:q,paddingRight:q,paddingBottom:q,paddingLeft:q,paddingBlock:q,paddingBlockStart:q,paddingBlockEnd:q,paddingInline:q,paddingInlineStart:q,paddingInlineEnd:q,margin:q,marginTop:q,marginRight:q,marginBottom:q,marginLeft:q,marginBlock:q,marginBlockStart:q,marginBlockEnd:q,marginInline:q,marginInlineStart:q,marginInlineEnd:q,fontSize:q,backgroundPositionX:q,backgroundPositionY:q,...h0,zIndex:Mh,fillOpacity:ds,strokeOpacity:ds,numOctaves:Mh},d0={...Gc,color:De,backgroundColor:De,outlineColor:De,fill:De,stroke:De,borderColor:De,borderTopColor:De,borderRightColor:De,borderBottomColor:De,borderLeftColor:De,filter:ja,WebkitFilter:ja,mask:$a,WebkitMask:$a},bm=n=>d0[n],f0=new Set([ja,$a]);function Sm(n,e){let t=bm(n);return f0.has(t)||(t=dt),t.getAnimatableNone?t.getAnimatableNone(e):void 0}const p0=new Set(["auto","none","0"]);function m0(n,e,t){let r=0,s;for(;r<n.length&&!s;){const i=n[r];typeof i=="string"&&!p0.has(i)&&pr(i).values.length&&(s=n[r]),r++}if(s&&t)for(const i of e)n[i]=Sm(t,s)}class g0 extends Hc{constructor(e,t,r,s,i){super(e,t,r,s,i,!0)}readKeyframes(){const{unresolvedKeyframes:e,element:t,name:r}=this;if(!t||!t.current)return;super.readKeyframes();for(let d=0;d<e.length;d++){let p=e[d];if(typeof p=="string"&&(p=p.trim(),Uc(p))){const g=gm(p,t.current);g!==void 0&&(e[d]=g),d===e.length-1&&(this.finalKeyframe=p)}}if(this.resolveNoneKeyframes(),!Tm.has(r)||e.length!==2)return;const[s,i]=e,o=Dh(s),c=Dh(i),u=_h(s),l=_h(i);if(u!==l&&Jt[r]){this.needsMeasurement=!0;return}if(o!==c)if(Ph(o)&&Ph(c))for(let d=0;d<e.length;d++){const p=e[d];typeof p=="string"&&(e[d]=parseFloat(p))}else Jt[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:e,name:t}=this,r=[];for(let s=0;s<e.length;s++)(e[s]===null||a0(e[s]))&&r.push(s);r.length&&m0(e,r,t)}measureInitialState(){const{element:e,unresolvedKeyframes:t,name:r}=this;if(!e||!e.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Jt[r](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;const s=t[t.length-1];s!==void 0&&e.getValue(r,s).jump(s,!1)}measureEndState(){const{element:e,name:t,unresolvedKeyframes:r}=this;if(!e||!e.current)return;const s=e.getValue(t);s&&s.jump(this.measuredOrigin,!1);const i=r.length-1,o=r[i];r[i]=Jt[t](e.measureViewportBox(),window.getComputedStyle(e.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),this.removedTransforms?.length&&this.removedTransforms.forEach(([c,u])=>{e.getValue(c).set(u)}),this.resolveNoneKeyframes()}}function Pm(n,e,t){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let r=document;const s=t?.[n]??r.querySelectorAll(n);return s?Array.from(s):[]}return Array.from(n).filter(r=>r!=null)}const Rm=(n,e)=>e&&typeof n=="number"?e.transform(n):n;function y0(n){return Mp(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Cm}=Kp(queueMicrotask,!1),ct={x:!1,y:!1};function Vm(){return ct.x||ct.y}function SS(n){return n==="x"||n==="y"?ct[n]?null:(ct[n]=!0,()=>{ct[n]=!1}):ct.x||ct.y?null:(ct.x=ct.y=!0,()=>{ct.x=ct.y=!1})}function km(n,e){const t=Pm(n),r=new AbortController,s={passive:!0,...e,signal:r.signal};return[t,s,()=>r.abort()]}function _0(n){return!(n.pointerType==="touch"||Vm())}function PS(n,e,t={}){const[r,s,i]=km(n,t);return r.forEach(o=>{let c=!1,u=!1,l;const d=()=>{o.removeEventListener("pointerleave",V)},p=P=>{l&&(l(P),l=void 0),d()},g=P=>{c=!1,window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",g),u&&(u=!1,p(P))},b=()=>{c=!0,window.addEventListener("pointerup",g,s),window.addEventListener("pointercancel",g,s)},V=P=>{if(P.pointerType!=="touch"){if(c){u=!0;return}p(P)}},D=P=>{if(!_0(P))return;u=!1;const x=e(o,P);typeof x=="function"&&(l=x,o.addEventListener("pointerleave",V,s))};o.addEventListener("pointerenter",D,s),o.addEventListener("pointerdown",b,s)}),i}const Dm=(n,e)=>e?n===e?!0:Dm(n,e.parentElement):!1,v0=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,T0=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function w0(n){return T0.has(n.tagName)||n.isContentEditable===!0}const E0=new Set(["INPUT","SELECT","TEXTAREA"]);function RS(n){return E0.has(n.tagName)||n.isContentEditable===!0}const ci=new WeakSet;function xh(n){return e=>{e.key==="Enter"&&n(e)}}function jo(n,e){n.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const I0=(n,e)=>{const t=n.currentTarget;if(!t)return;const r=xh(()=>{if(ci.has(t))return;jo(t,"down");const s=xh(()=>{jo(t,"up")}),i=()=>jo(t,"cancel");t.addEventListener("keyup",s,e),t.addEventListener("blur",i,e)});t.addEventListener("keydown",r,e),t.addEventListener("blur",()=>t.removeEventListener("keydown",r),e)};function Oh(n){return v0(n)&&!Vm()}const Nh=new WeakSet;function CS(n,e,t={}){const[r,s,i]=km(n,t),o=c=>{const u=c.currentTarget;if(!Oh(c)||Nh.has(c))return;ci.add(u),t.stopPropagation&&Nh.add(c);const l=e(u,c),d=(b,V)=>{window.removeEventListener("pointerup",p),window.removeEventListener("pointercancel",g),ci.has(u)&&ci.delete(u),Oh(b)&&typeof l=="function"&&l(b,{success:V})},p=b=>{d(b,u===window||u===document||t.useGlobalTarget||Dm(u,b.target))},g=b=>{d(b,!1)};window.addEventListener("pointerup",p,s),window.addEventListener("pointercancel",g,s)};return r.forEach(c=>{(t.useGlobalTarget?window:c).addEventListener("pointerdown",o,s),y0(c)&&(c.addEventListener("focus",l=>I0(l,s)),!w0(c)&&!c.hasAttribute("tabindex")&&(c.tabIndex=0))}),i}function Qc(n){return Mp(n)&&"ownerSVGElement"in n}const ui=new WeakMap;let li;const Mm=(n,e,t)=>(r,s)=>s&&s[0]?s[0][n+"Size"]:Qc(r)&&"getBBox"in r?r.getBBox()[e]:r[t],A0=Mm("inline","width","offsetWidth"),b0=Mm("block","height","offsetHeight");function S0({target:n,borderBoxSize:e}){ui.get(n)?.forEach(t=>{t(n,{get width(){return A0(n,e)},get height(){return b0(n,e)}})})}function P0(n){n.forEach(S0)}function R0(){typeof ResizeObserver>"u"||(li=new ResizeObserver(P0))}function C0(n,e){li||R0();const t=Pm(n);return t.forEach(r=>{let s=ui.get(r);s||(s=new Set,ui.set(r,s)),s.add(e),li?.observe(r)}),()=>{t.forEach(r=>{const s=ui.get(r);s?.delete(e),s?.size||li?.unobserve(r)})}}const hi=new Set;let Jn;function V0(){Jn=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};hi.forEach(e=>e(n))},window.addEventListener("resize",Jn)}function k0(n){return hi.add(n),Jn||V0(),()=>{hi.delete(n),!hi.size&&typeof Jn=="function"&&(window.removeEventListener("resize",Jn),Jn=void 0)}}function VS(n,e){return typeof n=="function"?k0(n):C0(n,e)}function D0(n){return Qc(n)&&n.tagName==="svg"}const M0=[...Am,De,dt],x0=n=>M0.find(Im(n)),Lh=()=>({translate:0,scale:1,origin:0,originPoint:0}),Yn=()=>({x:Lh(),y:Lh()}),Fh=()=>({min:0,max:0}),Ue=()=>({x:Fh(),y:Fh()}),O0=new WeakMap;function xm(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Xc(n){return typeof n=="string"||Array.isArray(n)}const Jc=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Yc=["initial",...Jc];function Om(n){return xm(n.animate)||Yc.some(e=>Xc(n[e]))}function N0(n){return!!(Om(n)||n.variants)}function L0(n,e,t){for(const r in e){const s=e[r],i=t[r];if(rt(s))n.addValue(r,s);else if(rt(i))n.addValue(r,mr(s,{owner:n}));else if(i!==s)if(n.hasValue(r)){const o=n.getValue(r);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{const o=n.getStaticValue(r);n.addValue(r,mr(o!==void 0?o:s,{owner:n}))}}for(const r in t)e[r]===void 0&&n.removeValue(r);return e}const qa={current:null},Nm={current:!1},F0=typeof window<"u";function U0(){if(Nm.current=!0,!!F0)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),e=()=>qa.current=n.matches;n.addEventListener("change",e),e()}else qa.current=!1}const Uh=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let Oi={};function kS(n){Oi=n}function DS(){return Oi}class B0{scrapeMotionValuesFromProps(e,t,r){return{}}constructor({parent:e,props:t,presenceContext:r,reducedMotionConfig:s,skipAnimations:i,blockInitialAnimation:o,visualState:c},u={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Hc,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const b=tt.now();this.renderScheduledAt<b&&(this.renderScheduledAt=b,Ge.render(this.render,!1,!0))};const{latestValues:l,renderState:d}=c;this.latestValues=l,this.baseTarget={...l},this.initialValues=t.initial?{...l}:{},this.renderState=d,this.parent=e,this.props=t,this.presenceContext=r,this.depth=e?e.depth+1:0,this.reducedMotionConfig=s,this.skipAnimationsConfig=i,this.options=u,this.blockInitialAnimation=!!o,this.isControllingVariants=Om(t),this.isVariantNode=N0(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:p,...g}=this.scrapeMotionValuesFromProps(t,{},this);for(const b in g){const V=g[b];l[b]!==void 0&&rt(V)&&V.set(l[b])}}mount(e){if(this.hasBeenMounted)for(const t in this.initialValues)this.values.get(t)?.jump(this.initialValues[t]),this.latestValues[t]=this.initialValues[t];this.current=e,O0.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((t,r)=>this.bindToMotionValue(r,t)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Nm.current||U0(),this.shouldReduceMotion=qa.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),Ln(this.notifyUpdate),Ln(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const e in this.events)this.events[e].clear();for(const e in this.features){const t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,t){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),t.accelerate&&pm.has(e)&&this.current instanceof HTMLElement){const{factory:o,keyframes:c,times:u,ease:l,duration:d}=t.accelerate,p=new dm({element:this.current,name:e,keyframes:c,times:u,ease:l,duration:ht(d)}),g=o(p);this.valueSubscriptions.set(e,()=>{g(),p.cancel()});return}const r=Ar.has(e);r&&this.onBindTransform&&this.onBindTransform();const s=t.on("change",o=>{this.latestValues[e]=o,this.props.onUpdate&&Ge.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let i;typeof window<"u"&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{s(),i&&i(),t.owner&&t.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in Oi){const t=Oi[e];if(!t)continue;const{isEnabled:r,Feature:s}=t;if(!this.features[e]&&s&&r(this.props)&&(this.features[e]=new s(this)),this.features[e]){const i=this.features[e];i.isMounted?i.update():(i.mount(),i.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Ue()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let r=0;r<Uh.length;r++){const s=Uh[r];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const i="on"+s,o=e[i];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=L0(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){const t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){const r=this.values.get(e);t!==r&&(r&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);const t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let r=this.values.get(e);return r===void 0&&t!==void 0&&(r=mr(t===null?void 0:t,{owner:this}),this.addValue(e,r)),r}readValue(e,t){let r=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return r!=null&&(typeof r=="string"&&(Dp(r)||xp(r))?r=parseFloat(r):!x0(r)&&dt.test(t)&&(r=Sm(e,t)),this.setBaseTarget(e,rt(r)?r.get():r)),rt(r)?r.get():r}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){const{initial:t}=this.props;let r;if(typeof t=="string"||typeof t=="object"){const i=vm(this.props,t,this.presenceContext?.custom);i&&(r=i[e])}if(t&&r!==void 0)return r;const s=this.getBaseTargetFromProps(this.props,e);return s!==void 0&&!rt(s)?s:this.initialValues[e]!==void 0&&r===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new Nc),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}scheduleRenderMicrotask(){Cm.render(this.render)}}class Lm extends B0{constructor(){super(...arguments),this.KeyframeResolver=g0}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){const r=e.style;return r?r[t]:void 0}removeValueFromRenderState(e,{vars:t,style:r}){delete t[e],delete r[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;rt(e)&&(this.childSubscription=e.on("change",t=>{this.current&&(this.current.textContent=`${t}`)}))}}class MS{constructor(e){this.isMounted=!1,this.node=e}update(){}}function j0({top:n,left:e,right:t,bottom:r}){return{x:{min:e,max:t},y:{min:n,max:r}}}function xS({x:n,y:e}){return{top:e.min,right:n.max,bottom:e.max,left:n.min}}function $0(n,e){if(!e)return n;const t=e({x:n.left,y:n.top}),r=e({x:n.right,y:n.bottom});return{top:t.y,left:t.x,bottom:r.y,right:r.x}}function $o(n){return n===void 0||n===1}function za({scale:n,scaleX:e,scaleY:t}){return!$o(n)||!$o(e)||!$o(t)}function In(n){return za(n)||Fm(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function Fm(n){return Bh(n.x)||Bh(n.y)}function Bh(n){return n&&n!=="0%"}function Ni(n,e,t){const r=n-t,s=e*r;return t+s}function jh(n,e,t,r,s){return s!==void 0&&(n=Ni(n,s,r)),Ni(n,t,r)+e}function Ha(n,e=0,t=1,r,s){n.min=jh(n.min,e,t,r,s),n.max=jh(n.max,e,t,r,s)}function Um(n,{x:e,y:t}){Ha(n.x,e.translate,e.scale,e.originPoint),Ha(n.y,t.translate,t.scale,t.originPoint)}const $h=.999999999999,qh=1.0000000000001;function q0(n,e,t,r=!1){const s=t.length;if(!s)return;e.x=e.y=1;let i,o;for(let c=0;c<s;c++){i=t[c],o=i.projectionDelta;const{visualElement:u}=i.options;u&&u.props.style&&u.props.style.display==="contents"||(r&&i.options.layoutScroll&&i.scroll&&i!==i.root&&(gt(n.x,-i.scroll.offset.x),gt(n.y,-i.scroll.offset.y)),o&&(e.x*=o.x.scale,e.y*=o.y.scale,Um(n,o)),r&&In(i.latestValues)&&di(n,i.latestValues,i.layout?.layoutBox))}e.x<qh&&e.x>$h&&(e.x=1),e.y<qh&&e.y>$h&&(e.y=1)}function gt(n,e){n.min+=e,n.max+=e}function zh(n,e,t,r,s=.5){const i=Ve(n.min,n.max,s);Ha(n,e,t,i,r)}function Hh(n,e){return typeof n=="string"?parseFloat(n)/100*(e.max-e.min):n}function di(n,e,t){const r=t??n;zh(n.x,Hh(e.x,r.x),e.scaleX,e.scale,e.originX),zh(n.y,Hh(e.y,r.y),e.scaleY,e.scale,e.originY)}function Bm(n,e){return j0($0(n.getBoundingClientRect(),e))}function OS(n,e,t){const r=Bm(n,t),{scroll:s}=e;return s&&(gt(r.x,s.offset.x),gt(r.y,s.offset.y)),r}const z0={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},H0=Ir.length;function W0(n,e,t){let r="",s=!0;for(let i=0;i<H0;i++){const o=Ir[i],c=n[o];if(c===void 0)continue;let u=!0;if(typeof c=="number")u=c===(o.startsWith("scale")?1:0);else{const l=parseFloat(c);u=o.startsWith("scale")?l===1:l===0}if(!u||t){const l=Rm(c,Gc[o]);if(!u){s=!1;const d=z0[o]||o;r+=`${d}(${l}) `}t&&(e[o]=l)}}return r=r.trim(),t?r=t(e,s?"":r):s&&(r="none"),r}function jm(n,e,t){const{style:r,vars:s,transformOrigin:i}=n;let o=!1,c=!1;for(const u in e){const l=e[u];if(Ar.has(u)){o=!0;continue}else if(Qp(u)){s[u]=l;continue}else{const d=Rm(l,Gc[u]);u.startsWith("origin")?(c=!0,i[u]=d):r[u]=d}}if(e.transform||(o||t?r.transform=W0(e,n.transform,t):r.transform&&(r.transform="none")),c){const{originX:u="50%",originY:l="50%",originZ:d=0}=i;r.transformOrigin=`${u} ${l} ${d}`}}function $m(n,{style:e,vars:t},r,s){const i=n.style;let o;for(o in e)i[o]=e[o];s?.applyProjectionStyles(i,r);for(o in t)i.setProperty(o,t[o])}function Wh(n,e){return e.max===e.min?0:n/(e.max-e.min)*100}const qr={correct:(n,e)=>{if(!e.target)return n;if(typeof n=="string")if(q.test(n))n=parseFloat(n);else return n;const t=Wh(n,e.target.x),r=Wh(n,e.target.y);return`${t}% ${r}%`}},K0={correct:(n,{treeScale:e,projectionDelta:t})=>{const r=n,s=dt.parse(n);if(s.length>5)return r;const i=dt.createTransformer(n),o=typeof s[0]!="number"?1:0,c=t.x.scale*e.x,u=t.y.scale*e.y;s[0+o]/=c,s[1+o]/=u;const l=Ve(c,u,.5);return typeof s[2+o]=="number"&&(s[2+o]/=l),typeof s[3+o]=="number"&&(s[3+o]/=l),i(s)}},Wa={borderRadius:{...qr,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:qr,borderTopRightRadius:qr,borderBottomLeftRadius:qr,borderBottomRightRadius:qr,boxShadow:K0};function G0(n,{layout:e,layoutId:t}){return Ar.has(n)||n.startsWith("origin")||(e||t!==void 0)&&(!!Wa[n]||n==="opacity")}function qm(n,e,t){const r=n.style,s=e?.style,i={};if(!r)return i;for(const o in r)(rt(r[o])||s&&rt(s[o])||G0(o,n)||t?.getValue(o)?.liveStyle!==void 0)&&(i[o]=r[o]);return i}function Q0(n){return window.getComputedStyle(n)}class NS extends Lm{constructor(){super(...arguments),this.type="html",this.renderInstance=$m}readValueFromInstance(e,t){if(Ar.has(t))return this.projection?.isProjecting?Ma(t):gA(e,t);{const r=Q0(e),s=(Qp(t)?r.getPropertyValue(t):r[t])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:t}){return Bm(e,t)}build(e,t,r){jm(e,t,r.transformTemplate)}scrapeMotionValuesFromProps(e,t,r){return qm(e,t,r)}}const X0={offset:"stroke-dashoffset",array:"stroke-dasharray"},J0={offset:"strokeDashoffset",array:"strokeDasharray"};function Y0(n,e,t=1,r=0,s=!0){n.pathLength=1;const i=s?X0:J0;n[i.offset]=`${-r}`,n[i.array]=`${e} ${t}`}const Z0=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function eb(n,{attrX:e,attrY:t,attrScale:r,pathLength:s,pathSpacing:i=1,pathOffset:o=0,...c},u,l,d){if(jm(n,c,l),u){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:p,style:g}=n;p.transform&&(g.transform=p.transform,delete p.transform),(g.transform||p.transformOrigin)&&(g.transformOrigin=p.transformOrigin??"50% 50%",delete p.transformOrigin),g.transform&&(g.transformBox=d?.transformBox??"fill-box",delete p.transformBox);for(const b of Z0)p[b]!==void 0&&(g[b]=p[b],delete p[b]);e!==void 0&&(p.x=e),t!==void 0&&(p.y=t),r!==void 0&&(p.scale=r),s!==void 0&&Y0(p,s,i,o,!1)}const zm=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),tb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function nb(n,e,t,r){$m(n,e,void 0,r);for(const s in e.attrs)n.setAttribute(zm.has(s)?s:Kc(s),e.attrs[s])}function rb(n,e,t){const r=qm(n,e,t);for(const s in n)if(rt(n[s])||rt(e[s])){const i=Ir.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;r[i]=n[s]}return r}class LS extends Lm{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Ue}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(Ar.has(t)){const r=bm(t);return r&&r.default||0}return t=zm.has(t)?t:Kc(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,r){return rb(e,t,r)}build(e,t,r){eb(e,t,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(e,t,r,s){nb(e,t,r,s)}mount(e){this.isSVGTag=tb(e.tagName),super.mount(e)}}const sb=Yc.length;function Hm(n){if(!n)return;if(!n.isControllingVariants){const t=n.parent?Hm(n.parent)||{}:{};return n.props.initial!==void 0&&(t.initial=n.props.initial),t}const e={};for(let t=0;t<sb;t++){const r=Yc[t],s=n.props[r];(Xc(s)||s===!1)&&(e[r]=s)}return e}function Wm(n,e){if(!Array.isArray(e))return!1;const t=e.length;if(t!==n.length)return!1;for(let r=0;r<t;r++)if(e[r]!==n[r])return!1;return!0}const ib=[...Jc].reverse(),ob=Jc.length;function ab(n){return e=>Promise.all(e.map(({animation:t,options:r})=>i0(n,t,r)))}function FS(n){let e=ab(n),t=Kh(),r=!0,s=!1;const i=l=>(d,p)=>{const g=ar(n,p,l==="exit"?n.presenceContext?.custom:void 0);if(g){const{transition:b,transitionEnd:V,...D}=g;d={...d,...D,...V}}return d};function o(l){e=l(n)}function c(l){const{props:d}=n,p=Hm(n.parent)||{},g=[],b=new Set;let V={},D=1/0;for(let x=0;x<ob;x++){const B=ib[x],O=t[B],N=d[B]!==void 0?d[B]:p[B],$=Xc(N),K=B===l?O.isActive:null;K===!1&&(D=x);let I=N===p[B]&&N!==d[B]&&$;if(I&&(r||s)&&n.manuallyAnimateOnMount&&(I=!1),O.protectedKeys={...V},!O.isActive&&K===null||!N&&!O.prevProp||xm(N)||typeof N=="boolean")continue;if(B==="exit"&&O.isActive&&K!==!0){O.prevResolvedValues&&(V={...V,...O.prevResolvedValues});continue}const y=cb(O.prevProp,N);let v=y||B===l&&O.isActive&&!I&&$||x>D&&$,w=!1;const E=Array.isArray(N)?N:[N];let S=E.reduce(i(B),{});K===!1&&(S={});const{prevResolvedValues:T={}}=O,le={...T,...S},pe=z=>{v=!0,b.has(z)&&(w=!0,b.delete(z)),O.needsAnimating[z]=!0;const re=n.getValue(z);re&&(re.liveStyle=!1)};for(const z in le){const re=S[z],R=T[z];if(V.hasOwnProperty(z))continue;let A=!1;Ua(re)&&Ua(R)?A=!Wm(re,R):A=re!==R,A?re!=null?pe(z):b.add(z):re!==void 0&&b.has(z)?pe(z):O.protectedKeys[z]=!0}O.prevProp=N,O.prevResolvedValues=S,O.isActive&&(V={...V,...S}),(r||s)&&n.blockInitialAnimation&&(v=!1);const F=I&&y;v&&(!F||w)&&g.push(...E.map(z=>{const re={type:B};if(typeof z=="string"&&(r||s)&&!F&&n.manuallyAnimateOnMount&&n.parent){const{parent:R}=n,A=ar(R,z);if(R.enteringChildren&&A){const{delayChildren:H}=A.transition||{};re.delay=mm(R.enteringChildren,n,H)}}return{animation:z,options:re}}))}if(b.size){const x={};if(typeof d.initial!="boolean"){const B=ar(n,Array.isArray(d.initial)?d.initial[0]:d.initial);B&&B.transition&&(x.transition=B.transition)}b.forEach(B=>{const O=n.getBaseTarget(B),N=n.getValue(B);N&&(N.liveStyle=!0),x[B]=O??null}),g.push({animation:x})}let P=!!g.length;return r&&(d.initial===!1||d.initial===d.animate)&&!n.manuallyAnimateOnMount&&(P=!1),r=!1,s=!1,P?e(g):Promise.resolve()}function u(l,d){if(t[l].isActive===d)return Promise.resolve();n.variantChildren?.forEach(g=>g.animationState?.setActive(l,d)),t[l].isActive=d;const p=c(l);for(const g in t)t[g].protectedKeys={};return p}return{animateChanges:c,setActive:u,setAnimateFunction:o,getState:()=>t,reset:()=>{t=Kh(),s=!0}}}function cb(n,e){return typeof e=="string"?e!==n:Array.isArray(e)?!Wm(e,n):!1}function wn(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Kh(){return{animate:wn(!0),whileInView:wn(),whileHover:wn(),whileTap:wn(),whileDrag:wn(),whileFocus:wn(),exit:wn()}}function Ka(n,e){n.min=e.min,n.max=e.max}function at(n,e){Ka(n.x,e.x),Ka(n.y,e.y)}function Gh(n,e){n.translate=e.translate,n.scale=e.scale,n.originPoint=e.originPoint,n.origin=e.origin}const Km=1e-4,ub=1-Km,lb=1+Km,Gm=.01,hb=0-Gm,db=0+Gm;function ot(n){return n.max-n.min}function fb(n,e,t){return Math.abs(n-e)<=t}function Qh(n,e,t,r=.5){n.origin=r,n.originPoint=Ve(e.min,e.max,n.origin),n.scale=ot(t)/ot(e),n.translate=Ve(t.min,t.max,n.origin)-n.originPoint,(n.scale>=ub&&n.scale<=lb||isNaN(n.scale))&&(n.scale=1),(n.translate>=hb&&n.translate<=db||isNaN(n.translate))&&(n.translate=0)}function ns(n,e,t,r){Qh(n.x,e.x,t.x,r?r.originX:void 0),Qh(n.y,e.y,t.y,r?r.originY:void 0)}function Xh(n,e,t,r=0){const s=r?Ve(t.min,t.max,r):t.min;n.min=s+e.min,n.max=n.min+ot(e)}function pb(n,e,t,r){Xh(n.x,e.x,t.x,r?.x),Xh(n.y,e.y,t.y,r?.y)}function Jh(n,e,t,r=0){const s=r?Ve(t.min,t.max,r):t.min;n.min=e.min-s,n.max=n.min+ot(e)}function Li(n,e,t,r){Jh(n.x,e.x,t.x,r?.x),Jh(n.y,e.y,t.y,r?.y)}function Yh(n,e,t,r,s){return n-=e,n=Ni(n,1/t,r),s!==void 0&&(n=Ni(n,1/s,r)),n}function mb(n,e=0,t=1,r=.5,s,i=n,o=n){if(Ct.test(e)&&(e=parseFloat(e),e=Ve(o.min,o.max,e/100)-o.min),typeof e!="number")return;let c=Ve(i.min,i.max,r);n===i&&(c-=e),n.min=Yh(n.min,e,t,c,s),n.max=Yh(n.max,e,t,c,s)}function Zh(n,e,[t,r,s],i,o){mb(n,e[t],e[r],e[s],e.scale,i,o)}const gb=["x","scaleX","originX"],yb=["y","scaleY","originY"];function ed(n,e,t,r){Zh(n.x,e,gb,t?t.x:void 0,r?r.x:void 0),Zh(n.y,e,yb,t?t.y:void 0,r?r.y:void 0)}function td(n){return n.translate===0&&n.scale===1}function Qm(n){return td(n.x)&&td(n.y)}function nd(n,e){return n.min===e.min&&n.max===e.max}function _b(n,e){return nd(n.x,e.x)&&nd(n.y,e.y)}function rd(n,e){return Math.round(n.min)===Math.round(e.min)&&Math.round(n.max)===Math.round(e.max)}function Xm(n,e){return rd(n.x,e.x)&&rd(n.y,e.y)}function sd(n){return ot(n.x)/ot(n.y)}function id(n,e){return n.translate===e.translate&&n.scale===e.scale&&n.originPoint===e.originPoint}function od(n){return[n("x"),n("y")]}function vb(n,e,t){let r="";const s=n.x.translate/e.x,i=n.y.translate/e.y,o=t?.z||0;if((s||i||o)&&(r=`translate3d(${s}px, ${i}px, ${o}px) `),(e.x!==1||e.y!==1)&&(r+=`scale(${1/e.x}, ${1/e.y}) `),t){const{transformPerspective:l,rotate:d,rotateX:p,rotateY:g,skewX:b,skewY:V}=t;l&&(r=`perspective(${l}px) ${r}`),d&&(r+=`rotate(${d}deg) `),p&&(r+=`rotateX(${p}deg) `),g&&(r+=`rotateY(${g}deg) `),b&&(r+=`skewX(${b}deg) `),V&&(r+=`skewY(${V}deg) `)}const c=n.x.scale*e.x,u=n.y.scale*e.y;return(c!==1||u!==1)&&(r+=`scale(${c}, ${u})`),r||"none"}const Jm=["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"],Tb=Jm.length,ad=n=>typeof n=="string"?parseFloat(n):n,cd=n=>typeof n=="number"||q.test(n);function wb(n,e,t,r,s,i){s?(n.opacity=Ve(0,t.opacity??1,Eb(r)),n.opacityExit=Ve(e.opacity??1,0,Ib(r))):i&&(n.opacity=Ve(e.opacity??1,t.opacity??1,r));for(let o=0;o<Tb;o++){const c=Jm[o];let u=ud(e,c),l=ud(t,c);if(u===void 0&&l===void 0)continue;u||(u=0),l||(l=0),u===0||l===0||cd(u)===cd(l)?(n[c]=Math.max(Ve(ad(u),ad(l),r),0),(Ct.test(l)||Ct.test(u))&&(n[c]+="%")):n[c]=l}(e.rotate||t.rotate)&&(n.rotate=Ve(e.rotate||0,t.rotate||0,r))}function ud(n,e){return n[e]!==void 0?n[e]:n.borderRadius}const Eb=Ym(0,.5,qp),Ib=Ym(.5,.95,fn);function Ym(n,e,t){return r=>r<n?0:r>e?1:t(Oc(n,e,r))}function Ab(n,e,t){const r=rt(n)?n:mr(n);return r.start(_m("",r,e,t)),r.animation}function bb(n,e,t,r={passive:!0}){return n.addEventListener(e,t,r),()=>n.removeEventListener(e,t)}const Sb=(n,e)=>n.depth-e.depth;class Pb{constructor(){this.children=[],this.isDirty=!1}add(e){Dc(this.children,e),this.isDirty=!0}remove(e){Vi(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(Sb),this.isDirty=!1,this.children.forEach(e)}}function Rb(n,e){const t=tt.now(),r=({timestamp:s})=>{const i=s-t;i>=e&&(Ln(r),n(i-e))};return Ge.setup(r,!0),()=>Ln(r)}function qo(n){return rt(n)?n.get():n}class Cb{constructor(){this.members=[]}add(e){Dc(this.members,e);for(let t=this.members.length-1;t>=0;t--){const r=this.members[t];if(r===e||r===this.lead||r===this.prevLead)continue;const s=r.instance;(!s||s.isConnected===!1)&&!r.snapshot&&(Vi(this.members,r),r.unmount())}e.scheduleRender()}remove(e){if(Vi(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const t=this.members[this.members.length-1];t&&this.promote(t)}}relegate(e){for(let t=this.members.indexOf(e)-1;t>=0;t--){const r=this.members[t];if(r.isPresent!==!1&&r.instance?.isConnected!==!1)return this.promote(r),!0}return!1}promote(e,t){const r=this.lead;if(e!==r&&(this.prevLead=r,this.lead=e,e.show(),r)){r.updateSnapshot(),e.scheduleRender();const{layoutDependency:s}=r.options,{layoutDependency:i}=e.options;(s===void 0||s!==i)&&(e.resumeFrom=r,t&&(r.preserveOpacity=!0),r.snapshot&&(e.snapshot=r.snapshot,e.snapshot.latestValues=r.animationValues||r.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}}const zo={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Ho=["","X","Y","Z"],Vb=1e3;let kb=0;function Wo(n,e,t,r){const{latestValues:s}=e;s[n]&&(t[n]=s[n],e.setStaticValue(n,0),r&&(r[n]=0))}function Zm(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:e}=n.options;if(!e)return;const t=wm(e);if(window.MotionHasOptimisedAnimation(t,"transform")){const{layout:s,layoutId:i}=n.options;window.MotionCancelOptimisedAnimation(t,"transform",Ge,!(s||i))}const{parent:r}=n;r&&!r.hasCheckedOptimisedAppear&&Zm(r)}function eg({attachResizeListener:n,defaultParent:e,measureScroll:t,checkIsScrollRoot:r,resetTransform:s}){return class{constructor(o={},c=e?.()){this.id=kb++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(xb),this.nodes.forEach(Bb),this.nodes.forEach(jb),this.nodes.forEach(Ob)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=c?c.root||c:this,this.path=c?[...c.path,c]:[],this.parent=c,this.depth=c?c.depth+1:0;for(let u=0;u<this.path.length;u++)this.path[u].shouldResetTransform=!0;this.root===this&&(this.nodes=new Pb)}addEventListener(o,c){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new Nc),this.eventHandlers.get(o).add(c)}notifyListeners(o,...c){const u=this.eventHandlers.get(o);u&&u.notify(...c)}hasListeners(o){return this.eventHandlers.has(o)}mount(o){if(this.instance)return;this.isSVG=Qc(o)&&!D0(o),this.instance=o;const{layoutId:c,layout:u,visualElement:l}=this.options;if(l&&!l.current&&l.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(u||c)&&(this.isLayoutDirty=!0),n){let d,p=0;const g=()=>this.root.updateBlockedByResize=!1;Ge.read(()=>{p=window.innerWidth}),n(o,()=>{const b=window.innerWidth;b!==p&&(p=b,this.root.updateBlockedByResize=!0,d&&d(),d=Rb(g,250),zo.hasAnimatedSinceResize&&(zo.hasAnimatedSinceResize=!1,this.nodes.forEach(dd)))})}c&&this.root.registerSharedNode(c,this),this.options.animate!==!1&&l&&(c||u)&&this.addEventListener("didUpdate",({delta:d,hasLayoutChanged:p,hasRelativeLayoutChanged:g,layout:b})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const V=this.options.transition||l.getDefaultTransition()||Wb,{onLayoutAnimationStart:D,onLayoutAnimationComplete:P}=l.getProps(),x=!this.targetLayout||!Xm(this.targetLayout,b),B=!p&&g;if(this.options.layoutRoot||this.resumeFrom||B||p&&(x||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const O={...Wc(V,"layout"),onPlay:D,onComplete:P};(l.shouldReduceMotion||this.options.layoutRoot)&&(O.delay=0,O.type=!1),this.startAnimation(O),this.setAnimationOrigin(d,B)}else p||dd(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=b})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Ln(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach($b),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Zm(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let d=0;d<this.path.length;d++){const p=this.path[d];p.shouldResetTransform=!0,(typeof p.latestValues.x=="string"||typeof p.latestValues.y=="string")&&(p.isLayoutDirty=!0),p.updateScroll("snapshot"),p.options.layoutRoot&&p.willUpdate(!1)}const{layoutId:c,layout:u}=this.options;if(c===void 0&&!u)return;const l=this.getTransformTemplate();this.prevTransformTemplateValue=l?l(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const u=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),u&&this.nodes.forEach(Lb),this.nodes.forEach(ld);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(hd);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(Fb),this.nodes.forEach(Ub),this.nodes.forEach(Db),this.nodes.forEach(Mb)):this.nodes.forEach(hd),this.clearAllSnapshots();const c=tt.now();Ze.delta=Ot(0,1e3/60,c-Ze.timestamp),Ze.timestamp=c,Ze.isProcessing=!0,Oo.update.process(Ze),Oo.preRender.process(Ze),Oo.render.process(Ze),Ze.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Cm.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Nb),this.sharedNodes.forEach(qb)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Ge.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Ge.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!ot(this.snapshot.measuredBox.x)&&!ot(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let u=0;u<this.path.length;u++)this.path[u].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=Ue()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:c}=this.options;c&&c.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let c=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(c=!1),c&&this.instance){const u=r(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:u,offset:t(this.instance),wasRoot:this.scroll?this.scroll.isRoot:u}}}resetTransform(){if(!s)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,c=this.projectionDelta&&!Qm(this.projectionDelta),u=this.getTransformTemplate(),l=u?u(this.latestValues,""):void 0,d=l!==this.prevTransformTemplateValue;o&&this.instance&&(c||In(this.latestValues)||d)&&(s(this.instance,l),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const c=this.measurePageBox();let u=this.removeElementScroll(c);return o&&(u=this.removeTransform(u)),Kb(u),{animationId:this.root.animationId,measuredBox:c,layoutBox:u,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:o}=this.options;if(!o)return Ue();const c=o.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(Gb))){const{scroll:l}=this.root;l&&(gt(c.x,l.offset.x),gt(c.y,l.offset.y))}return c}removeElementScroll(o){const c=Ue();if(at(c,o),this.scroll?.wasRoot)return c;for(let u=0;u<this.path.length;u++){const l=this.path[u],{scroll:d,options:p}=l;l!==this.root&&d&&p.layoutScroll&&(d.wasRoot&&at(c,o),gt(c.x,d.offset.x),gt(c.y,d.offset.y))}return c}applyTransform(o,c=!1,u){const l=u||Ue();at(l,o);for(let d=0;d<this.path.length;d++){const p=this.path[d];!c&&p.options.layoutScroll&&p.scroll&&p!==p.root&&(gt(l.x,-p.scroll.offset.x),gt(l.y,-p.scroll.offset.y)),In(p.latestValues)&&di(l,p.latestValues,p.layout?.layoutBox)}return In(this.latestValues)&&di(l,this.latestValues,this.layout?.layoutBox),l}removeTransform(o){const c=Ue();at(c,o);for(let u=0;u<this.path.length;u++){const l=this.path[u];if(!In(l.latestValues))continue;let d;l.instance&&(za(l.latestValues)&&l.updateSnapshot(),d=Ue(),at(d,l.measurePageBox())),ed(c,l.latestValues,l.snapshot?.layoutBox,d)}return In(this.latestValues)&&ed(c,this.latestValues),c}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Ze.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){const c=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=c.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=c.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=c.isSharedProjectionDirty);const u=!!this.resumingFrom||this!==c;if(!(o||u&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:d,layoutId:p}=this.options;if(!this.layout||!(d||p))return;this.resolvedRelativeTargetAt=Ze.timestamp;const g=this.getClosestProjectingParent();g&&this.linkedParentVersion!==g.layoutVersion&&!g.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&g&&g.layout?this.createRelativeTarget(g,this.layout.layoutBox,g.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Ue(),this.targetWithTransforms=Ue()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),pb(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):at(this.target,this.layout.layoutBox),Um(this.target,this.targetDelta)):at(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&g&&!!g.resumingFrom==!!this.resumingFrom&&!g.options.layoutScroll&&g.target&&this.animationProgress!==1?this.createRelativeTarget(g,this.target,g.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||za(this.parent.latestValues)||Fm(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(o,c,u){this.relativeParent=o,this.linkedParentVersion=o.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ue(),this.relativeTargetOrigin=Ue(),Li(this.relativeTargetOrigin,c,u,this.options.layoutAnchor||void 0),at(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){const o=this.getLead(),c=!!this.resumingFrom||this!==o;let u=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(u=!1),c&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(u=!1),this.resolvedRelativeTargetAt===Ze.timestamp&&(u=!1),u)return;const{layout:l,layoutId:d}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(l||d))return;at(this.layoutCorrected,this.layout.layoutBox);const p=this.treeScale.x,g=this.treeScale.y;q0(this.layoutCorrected,this.treeScale,this.path,c),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=Ue());const{target:b}=o;if(!b){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Gh(this.prevProjectionDelta.x,this.projectionDelta.x),Gh(this.prevProjectionDelta.y,this.projectionDelta.y)),ns(this.projectionDelta,this.layoutCorrected,b,this.latestValues),(this.treeScale.x!==p||this.treeScale.y!==g||!id(this.projectionDelta.x,this.prevProjectionDelta.x)||!id(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",b))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){if(this.options.visualElement?.scheduleRender(),o){const c=this.getStack();c&&c.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Yn(),this.projectionDelta=Yn(),this.projectionDeltaWithTransform=Yn()}setAnimationOrigin(o,c=!1){const u=this.snapshot,l=u?u.latestValues:{},d={...this.latestValues},p=Yn();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!c;const g=Ue(),b=u?u.source:void 0,V=this.layout?this.layout.source:void 0,D=b!==V,P=this.getStack(),x=!P||P.members.length<=1,B=!!(D&&!x&&this.options.crossfade===!0&&!this.path.some(Hb));this.animationProgress=0;let O;this.mixTargetDelta=N=>{const $=N/1e3;fd(p.x,o.x,$),fd(p.y,o.y,$),this.setTargetDelta(p),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Li(g,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),zb(this.relativeTarget,this.relativeTargetOrigin,g,$),O&&_b(this.relativeTarget,O)&&(this.isProjectionDirty=!1),O||(O=Ue()),at(O,this.relativeTarget)),D&&(this.animationValues=d,wb(d,l,this.latestValues,$,B,x)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=$},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(Ln(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Ge.update(()=>{zo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=mr(0)),this.motionValue.jump(0,!1),this.currentAnimation=Ab(this.motionValue,[0,1e3],{...o,velocity:0,isSync:!0,onUpdate:c=>{this.mixTargetDelta(c),o.onUpdate&&o.onUpdate(c)},onStop:()=>{},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Vb),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:c,target:u,layout:l,latestValues:d}=o;if(!(!c||!u||!l)){if(this!==o&&this.layout&&l&&tg(this.options.animationType,this.layout.layoutBox,l.layoutBox)){u=this.target||Ue();const p=ot(this.layout.layoutBox.x);u.x.min=o.target.x.min,u.x.max=u.x.min+p;const g=ot(this.layout.layoutBox.y);u.y.min=o.target.y.min,u.y.max=u.y.min+g}at(c,u),di(c,d),ns(this.projectionDeltaWithTransform,this.layoutCorrected,c,d)}}registerSharedNode(o,c){this.sharedNodes.has(o)||this.sharedNodes.set(o,new Cb),this.sharedNodes.get(o).add(c);const l=c.options.initialPromotionConfig;c.promote({transition:l?l.transition:void 0,preserveFollowOpacity:l&&l.shouldPreserveFollowOpacity?l.shouldPreserveFollowOpacity(c):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){const{layoutId:o}=this.options;return o?this.getStack()?.lead||this:this}getPrevLead(){const{layoutId:o}=this.options;return o?this.getStack()?.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:c,preserveFollowOpacity:u}={}){const l=this.getStack();l&&l.promote(this,u),o&&(this.projectionDelta=void 0,this.needsReset=!0),c&&this.setOptions({transition:c})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let c=!1;const{latestValues:u}=o;if((u.z||u.rotate||u.rotateX||u.rotateY||u.rotateZ||u.skewX||u.skewY)&&(c=!0),!c)return;const l={};u.z&&Wo("z",o,l,this.animationValues);for(let d=0;d<Ho.length;d++)Wo(`rotate${Ho[d]}`,o,l,this.animationValues),Wo(`skew${Ho[d]}`,o,l,this.animationValues);o.render();for(const d in l)o.setStaticValue(d,l[d]),this.animationValues&&(this.animationValues[d]=l[d]);o.scheduleRender()}applyProjectionStyles(o,c){if(!this.instance||this.isSVG)return;if(!this.isVisible){o.visibility="hidden";return}const u=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,o.visibility="",o.opacity="",o.pointerEvents=qo(c?.pointerEvents)||"",o.transform=u?u(this.latestValues,""):"none";return}const l=this.getLead();if(!this.projectionDelta||!this.layout||!l.target){this.options.layoutId&&(o.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,o.pointerEvents=qo(c?.pointerEvents)||""),this.hasProjected&&!In(this.latestValues)&&(o.transform=u?u({},""):"none",this.hasProjected=!1);return}o.visibility="";const d=l.animationValues||l.latestValues;this.applyTransformsToTarget();let p=vb(this.projectionDeltaWithTransform,this.treeScale,d);u&&(p=u(d,p)),o.transform=p;const{x:g,y:b}=this.projectionDelta;o.transformOrigin=`${g.origin*100}% ${b.origin*100}% 0`,l.animationValues?o.opacity=l===this?d.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:d.opacityExit:o.opacity=l===this?d.opacity!==void 0?d.opacity:"":d.opacityExit!==void 0?d.opacityExit:0;for(const V in Wa){if(d[V]===void 0)continue;const{correct:D,applyTo:P,isCSSVariable:x}=Wa[V],B=p==="none"?d[V]:D(d[V],l);if(P){const O=P.length;for(let N=0;N<O;N++)o[P[N]]=B}else x?this.options.visualElement.renderState.vars[V]=B:o[V]=B}this.options.layoutId&&(o.pointerEvents=l===this?qo(c?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>o.currentAnimation?.stop()),this.root.nodes.forEach(ld),this.root.sharedNodes.clear()}}}function Db(n){n.updateLayout()}function Mb(n){const e=n.resumeFrom?.snapshot||n.snapshot;if(n.isLead()&&n.layout&&e&&n.hasListeners("didUpdate")){const{layoutBox:t,measuredBox:r}=n.layout,{animationType:s}=n.options,i=e.source!==n.layout.source;if(s==="size")od(d=>{const p=i?e.measuredBox[d]:e.layoutBox[d],g=ot(p);p.min=t[d].min,p.max=p.min+g});else if(s==="x"||s==="y"){const d=s==="x"?"y":"x";Ka(i?e.measuredBox[d]:e.layoutBox[d],t[d])}else tg(s,e.layoutBox,t)&&od(d=>{const p=i?e.measuredBox[d]:e.layoutBox[d],g=ot(t[d]);p.max=p.min+g,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[d].max=n.relativeTarget[d].min+g)});const o=Yn();ns(o,t,e.layoutBox);const c=Yn();i?ns(c,n.applyTransform(r,!0),e.measuredBox):ns(c,t,e.layoutBox);const u=!Qm(o);let l=!1;if(!n.resumeFrom){const d=n.getClosestProjectingParent();if(d&&!d.resumeFrom){const{snapshot:p,layout:g}=d;if(p&&g){const b=n.options.layoutAnchor||void 0,V=Ue();Li(V,e.layoutBox,p.layoutBox,b);const D=Ue();Li(D,t,g.layoutBox,b),Xm(V,D)||(l=!0),d.options.layoutRoot&&(n.relativeTarget=D,n.relativeTargetOrigin=V,n.relativeParent=d)}}}n.notifyListeners("didUpdate",{layout:t,snapshot:e,delta:c,layoutDelta:o,hasLayoutChanged:u,hasRelativeLayoutChanged:l})}else if(n.isLead()){const{onExitComplete:t}=n.options;t&&t()}n.options.transition=void 0}function xb(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function Ob(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function Nb(n){n.clearSnapshot()}function ld(n){n.clearMeasurements()}function Lb(n){n.isLayoutDirty=!0,n.updateLayout()}function hd(n){n.isLayoutDirty=!1}function Fb(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function Ub(n){const{visualElement:e}=n.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),n.resetTransform()}function dd(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function Bb(n){n.resolveTargetDelta()}function jb(n){n.calcProjection()}function $b(n){n.resetSkewAndRotation()}function qb(n){n.removeLeadSnapshot()}function fd(n,e,t){n.translate=Ve(e.translate,0,t),n.scale=Ve(e.scale,1,t),n.origin=e.origin,n.originPoint=e.originPoint}function pd(n,e,t,r){n.min=Ve(e.min,t.min,r),n.max=Ve(e.max,t.max,r)}function zb(n,e,t,r){pd(n.x,e.x,t.x,r),pd(n.y,e.y,t.y,r)}function Hb(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const Wb={duration:.45,ease:[.4,0,.1,1]},md=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),gd=md("applewebkit/")&&!md("chrome/")?Math.round:fn;function yd(n){n.min=gd(n.min),n.max=gd(n.max)}function Kb(n){yd(n.x),yd(n.y)}function tg(n,e,t){return n==="position"||n==="preserve-aspect"&&!fb(sd(e),sd(t),.2)}function Gb(n){return n!==n.root&&n.scroll?.wasRoot}const Qb=eg({attachResizeListener:(n,e)=>bb(n,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),Ko={current:void 0},BS=eg({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!Ko.current){const n=new Qb({});n.mount(window),n.setOptions({layoutScroll:!0}),Ko.current=n}return Ko.current},resetTransform:(n,e)=>{n.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"});var Zc={};(function n(e,t,r,s){var i=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",c=(function(){if(!e.OffscreenCanvas)return!1;try{var R=new OffscreenCanvas(1,1),A=R.getContext("2d");A.fillRect(0,0,1,1);var H=R.transferToImageBitmap();A.createPattern(H,"no-repeat")}catch{return!1}return!0})();function u(){}function l(R){var A=t.exports.Promise,H=A!==void 0?A:e.Promise;return typeof H=="function"?new H(R):(R(u,u),null)}var d=(function(R,A){return{transform:function(H){if(R)return H;if(A.has(H))return A.get(H);var G=new OffscreenCanvas(H.width,H.height),Q=G.getContext("2d");return Q.drawImage(H,0,0),A.set(H,G),G},clear:function(){A.clear()}}})(c,new Map),p=(function(){var R=Math.floor(16.666666666666668),A,H,G={},Q=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(A=function(Y){var se=Math.random();return G[se]=requestAnimationFrame(function X(ie){Q===ie||Q+R-1<ie?(Q=ie,delete G[se],Y()):G[se]=requestAnimationFrame(X)}),se},H=function(Y){G[Y]&&cancelAnimationFrame(G[Y])}):(A=function(Y){return setTimeout(Y,R)},H=function(Y){return clearTimeout(Y)}),{frame:A,cancel:H}})(),g=(function(){var R,A,H={};function G(Q){function Y(se,X){Q.postMessage({options:se||{},callback:X})}Q.init=function(X){var ie=X.transferControlToOffscreen();Q.postMessage({canvas:ie},[ie])},Q.fire=function(X,ie,me){if(A)return Y(X,null),A;var we=Math.random().toString(36).slice(2);return A=l(function(ge){function ve(Re){Re.data.callback===we&&(delete H[we],Q.removeEventListener("message",ve),A=null,d.clear(),me(),ge())}Q.addEventListener("message",ve),Y(X,we),H[we]=ve.bind(null,{data:{callback:we}})}),A},Q.reset=function(){Q.postMessage({reset:!0});for(var X in H)H[X](),delete H[X]}}return function(){if(R)return R;if(!r&&i){var Q=["var CONFETTI, SIZE = {}, module = {};","("+n.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{R=new Worker(URL.createObjectURL(new Blob([Q])))}catch(Y){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",Y),null}G(R)}return R}})(),b={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function V(R,A){return A?A(R):R}function D(R){return R!=null}function P(R,A,H){return V(R&&D(R[A])?R[A]:b[A],H)}function x(R){return R<0?0:Math.floor(R)}function B(R,A){return Math.floor(Math.random()*(A-R))+R}function O(R){return parseInt(R,16)}function N(R){return R.map($)}function $(R){var A=String(R).replace(/[^0-9a-f]/gi,"");return A.length<6&&(A=A[0]+A[0]+A[1]+A[1]+A[2]+A[2]),{r:O(A.substring(0,2)),g:O(A.substring(2,4)),b:O(A.substring(4,6))}}function K(R){var A=P(R,"origin",Object);return A.x=P(A,"x",Number),A.y=P(A,"y",Number),A}function I(R){R.width=document.documentElement.clientWidth,R.height=document.documentElement.clientHeight}function y(R){var A=R.getBoundingClientRect();R.width=A.width,R.height=A.height}function v(R){var A=document.createElement("canvas");return A.style.position="fixed",A.style.top="0px",A.style.left="0px",A.style.pointerEvents="none",A.style.zIndex=R,A}function w(R,A,H,G,Q,Y,se,X,ie){R.save(),R.translate(A,H),R.rotate(Y),R.scale(G,Q),R.arc(0,0,1,se,X,ie),R.restore()}function E(R){var A=R.angle*(Math.PI/180),H=R.spread*(Math.PI/180);return{x:R.x,y:R.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:R.startVelocity*.5+Math.random()*R.startVelocity,angle2D:-A+(.5*H-Math.random()*H),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:R.color,shape:R.shape,tick:0,totalTicks:R.ticks,decay:R.decay,drift:R.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:R.gravity*3,ovalScalar:.6,scalar:R.scalar,flat:R.flat}}function S(R,A){A.x+=Math.cos(A.angle2D)*A.velocity+A.drift,A.y+=Math.sin(A.angle2D)*A.velocity+A.gravity,A.velocity*=A.decay,A.flat?(A.wobble=0,A.wobbleX=A.x+10*A.scalar,A.wobbleY=A.y+10*A.scalar,A.tiltSin=0,A.tiltCos=0,A.random=1):(A.wobble+=A.wobbleSpeed,A.wobbleX=A.x+10*A.scalar*Math.cos(A.wobble),A.wobbleY=A.y+10*A.scalar*Math.sin(A.wobble),A.tiltAngle+=.1,A.tiltSin=Math.sin(A.tiltAngle),A.tiltCos=Math.cos(A.tiltAngle),A.random=Math.random()+2);var H=A.tick++/A.totalTicks,G=A.x+A.random*A.tiltCos,Q=A.y+A.random*A.tiltSin,Y=A.wobbleX+A.random*A.tiltCos,se=A.wobbleY+A.random*A.tiltSin;if(R.fillStyle="rgba("+A.color.r+", "+A.color.g+", "+A.color.b+", "+(1-H)+")",R.beginPath(),o&&A.shape.type==="path"&&typeof A.shape.path=="string"&&Array.isArray(A.shape.matrix))R.fill(ne(A.shape.path,A.shape.matrix,A.x,A.y,Math.abs(Y-G)*.1,Math.abs(se-Q)*.1,Math.PI/10*A.wobble));else if(A.shape.type==="bitmap"){var X=Math.PI/10*A.wobble,ie=Math.abs(Y-G)*.1,me=Math.abs(se-Q)*.1,we=A.shape.bitmap.width*A.scalar,ge=A.shape.bitmap.height*A.scalar,ve=new DOMMatrix([Math.cos(X)*ie,Math.sin(X)*ie,-Math.sin(X)*me,Math.cos(X)*me,A.x,A.y]);ve.multiplySelf(new DOMMatrix(A.shape.matrix));var Re=R.createPattern(d.transform(A.shape.bitmap),"no-repeat");Re.setTransform(ve),R.globalAlpha=1-H,R.fillStyle=Re,R.fillRect(A.x-we/2,A.y-ge/2,we,ge),R.globalAlpha=1}else if(A.shape==="circle")R.ellipse?R.ellipse(A.x,A.y,Math.abs(Y-G)*A.ovalScalar,Math.abs(se-Q)*A.ovalScalar,Math.PI/10*A.wobble,0,2*Math.PI):w(R,A.x,A.y,Math.abs(Y-G)*A.ovalScalar,Math.abs(se-Q)*A.ovalScalar,Math.PI/10*A.wobble,0,2*Math.PI);else if(A.shape==="star")for(var ae=Math.PI/2*3,qe=4*A.scalar,Xe=8*A.scalar,Je=A.x,it=A.y,Ee=5,_e=Math.PI/Ee;Ee--;)Je=A.x+Math.cos(ae)*Xe,it=A.y+Math.sin(ae)*Xe,R.lineTo(Je,it),ae+=_e,Je=A.x+Math.cos(ae)*qe,it=A.y+Math.sin(ae)*qe,R.lineTo(Je,it),ae+=_e;else R.moveTo(Math.floor(A.x),Math.floor(A.y)),R.lineTo(Math.floor(A.wobbleX),Math.floor(Q)),R.lineTo(Math.floor(Y),Math.floor(se)),R.lineTo(Math.floor(G),Math.floor(A.wobbleY));return R.closePath(),R.fill(),A.tick<A.totalTicks}function T(R,A,H,G,Q){var Y=A.slice(),se=R.getContext("2d"),X,ie,me=l(function(we){function ge(){X=ie=null,se.clearRect(0,0,G.width,G.height),d.clear(),Q(),we()}function ve(){r&&!(G.width===s.width&&G.height===s.height)&&(G.width=R.width=s.width,G.height=R.height=s.height),!G.width&&!G.height&&(H(R),G.width=R.width,G.height=R.height),se.clearRect(0,0,G.width,G.height),Y=Y.filter(function(Re){return S(se,Re)}),Y.length?X=p.frame(ve):ge()}X=p.frame(ve),ie=ge});return{addFettis:function(we){return Y=Y.concat(we),me},canvas:R,promise:me,reset:function(){X&&p.cancel(X),ie&&ie()}}}function le(R,A){var H=!R,G=!!P(A||{},"resize"),Q=!1,Y=P(A,"disableForReducedMotion",Boolean),se=i&&!!P(A||{},"useWorker"),X=se?g():null,ie=H?I:y,me=R&&X?!!R.__confetti_initialized:!1,we=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,ge;function ve(ae,qe,Xe){for(var Je=P(ae,"particleCount",x),it=P(ae,"angle",Number),Ee=P(ae,"spread",Number),_e=P(ae,"startVelocity",Number),Un=P(ae,"decay",Number),no=P(ae,"gravity",Number),Ps=P(ae,"drift",Number),Rs=P(ae,"colors",N),pn=P(ae,"ticks",Number),br=P(ae,"shapes"),Cs=P(ae,"scalar"),Sr=!!P(ae,"flat"),Vs=K(ae),ks=Je,Bn=[],Ds=R.width*Vs.x,mn=R.height*Vs.y;ks--;)Bn.push(E({x:Ds,y:mn,angle:it,spread:Ee,startVelocity:_e,color:Rs[ks%Rs.length],shape:br[B(0,br.length)],ticks:pn,decay:Un,gravity:no,drift:Ps,scalar:Cs,flat:Sr}));return ge?ge.addFettis(Bn):(ge=T(R,Bn,ie,qe,Xe),ge.promise)}function Re(ae){var qe=Y||P(ae,"disableForReducedMotion",Boolean),Xe=P(ae,"zIndex",Number);if(qe&&we)return l(function(_e){_e()});H&&ge?R=ge.canvas:H&&!R&&(R=v(Xe),document.body.appendChild(R)),G&&!me&&ie(R);var Je={width:R.width,height:R.height};X&&!me&&X.init(R),me=!0,X&&(R.__confetti_initialized=!0);function it(){if(X){var _e={getBoundingClientRect:function(){if(!H)return R.getBoundingClientRect()}};ie(_e),X.postMessage({resize:{width:_e.width,height:_e.height}});return}Je.width=Je.height=null}function Ee(){ge=null,G&&(Q=!1,e.removeEventListener("resize",it)),H&&R&&(document.body.contains(R)&&document.body.removeChild(R),R=null,me=!1)}return G&&!Q&&(Q=!0,e.addEventListener("resize",it,!1)),X?X.fire(ae,Je,Ee):ve(ae,Je,Ee)}return Re.reset=function(){X&&X.reset(),ge&&ge.reset()},Re}var pe;function F(){return pe||(pe=le(null,{useWorker:!0,resize:!0})),pe}function ne(R,A,H,G,Q,Y,se){var X=new Path2D(R),ie=new Path2D;ie.addPath(X,new DOMMatrix(A));var me=new Path2D;return me.addPath(ie,new DOMMatrix([Math.cos(se)*Q,Math.sin(se)*Q,-Math.sin(se)*Y,Math.cos(se)*Y,H,G])),me}function z(R){if(!o)throw new Error("path confetti are not supported in this browser");var A,H;typeof R=="string"?A=R:(A=R.path,H=R.matrix);var G=new Path2D(A),Q=document.createElement("canvas"),Y=Q.getContext("2d");if(!H){for(var se=1e3,X=se,ie=se,me=0,we=0,ge,ve,Re=0;Re<se;Re+=2)for(var ae=0;ae<se;ae+=2)Y.isPointInPath(G,Re,ae,"nonzero")&&(X=Math.min(X,Re),ie=Math.min(ie,ae),me=Math.max(me,Re),we=Math.max(we,ae));ge=me-X,ve=we-ie;var qe=10,Xe=Math.min(qe/ge,qe/ve);H=[Xe,0,0,Xe,-Math.round(ge/2+X)*Xe,-Math.round(ve/2+ie)*Xe]}return{type:"path",path:A,matrix:H}}function re(R){var A,H=1,G="#000000",Q='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof R=="string"?A=R:(A=R.text,H="scalar"in R?R.scalar:H,Q="fontFamily"in R?R.fontFamily:Q,G="color"in R?R.color:G);var Y=10*H,se=""+Y+"px "+Q,X=new OffscreenCanvas(Y,Y),ie=X.getContext("2d");ie.font=se;var me=ie.measureText(A),we=Math.ceil(me.actualBoundingBoxRight+me.actualBoundingBoxLeft),ge=Math.ceil(me.actualBoundingBoxAscent+me.actualBoundingBoxDescent),ve=2,Re=me.actualBoundingBoxLeft+ve,ae=me.actualBoundingBoxAscent+ve;we+=ve+ve,ge+=ve+ve,X=new OffscreenCanvas(we,ge),ie=X.getContext("2d"),ie.font=se,ie.fillStyle=G,ie.fillText(A,Re,ae);var qe=1/H;return{type:"bitmap",bitmap:X.transferToImageBitmap(),matrix:[qe,0,0,qe,-we*qe/2,-ge*qe/2]}}t.exports=function(){return F().apply(this,arguments)},t.exports.reset=function(){F().reset()},t.exports.create=le,t.exports.shapeFromPath=z,t.exports.shapeFromText=re})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Zc,!1);const jS=Zc.exports;Zc.exports.create;var Go,_d;function Xb(){if(_d)return Go;_d=1;var n={linear:function(e,t,r,s){var i=r-t;return i*e/s+t},easeInQuad:function(e,t,r,s){var i=r-t;return i*(e/=s)*e+t},easeOutQuad:function(e,t,r,s){var i=r-t;return-i*(e/=s)*(e-2)+t},easeInOutQuad:function(e,t,r,s){var i=r-t;return(e/=s/2)<1?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,r,s){var i=r-t;return i*(e/=s)*e*e+t},easeOutCubic:function(e,t,r,s){var i=r-t;return i*((e=e/s-1)*e*e+1)+t},easeInOutCubic:function(e,t,r,s){var i=r-t;return(e/=s/2)<1?i/2*e*e*e+t:i/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,r,s){var i=r-t;return i*(e/=s)*e*e*e+t},easeOutQuart:function(e,t,r,s){var i=r-t;return-i*((e=e/s-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,r,s){var i=r-t;return(e/=s/2)<1?i/2*e*e*e*e+t:-i/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,r,s){var i=r-t;return i*(e/=s)*e*e*e*e+t},easeOutQuint:function(e,t,r,s){var i=r-t;return i*((e=e/s-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,r,s){var i=r-t;return(e/=s/2)<1?i/2*e*e*e*e*e+t:i/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,r,s){var i=r-t;return-i*Math.cos(e/s*(Math.PI/2))+i+t},easeOutSine:function(e,t,r,s){var i=r-t;return i*Math.sin(e/s*(Math.PI/2))+t},easeInOutSine:function(e,t,r,s){var i=r-t;return-i/2*(Math.cos(Math.PI*e/s)-1)+t},easeInExpo:function(e,t,r,s){var i=r-t;return e==0?t:i*Math.pow(2,10*(e/s-1))+t},easeOutExpo:function(e,t,r,s){var i=r-t;return e==s?t+i:i*(-Math.pow(2,-10*e/s)+1)+t},easeInOutExpo:function(e,t,r,s){var i=r-t;return e===0?t:e===s?t+i:(e/=s/2)<1?i/2*Math.pow(2,10*(e-1))+t:i/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(e,t,r,s){var i=r-t;return-i*(Math.sqrt(1-(e/=s)*e)-1)+t},easeOutCirc:function(e,t,r,s){var i=r-t;return i*Math.sqrt(1-(e=e/s-1)*e)+t},easeInOutCirc:function(e,t,r,s){var i=r-t;return(e/=s/2)<1?-i/2*(Math.sqrt(1-e*e)-1)+t:i/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,r,s){var i=r-t,o,c,u;return u=1.70158,c=0,o=i,e===0?t:(e/=s)===1?t+i:(c||(c=s*.3),o<Math.abs(i)?(o=i,u=c/4):u=c/(2*Math.PI)*Math.asin(i/o),-(o*Math.pow(2,10*(e-=1))*Math.sin((e*s-u)*(2*Math.PI)/c))+t)},easeOutElastic:function(e,t,r,s){var i=r-t,o,c,u;return u=1.70158,c=0,o=i,e===0?t:(e/=s)===1?t+i:(c||(c=s*.3),o<Math.abs(i)?(o=i,u=c/4):u=c/(2*Math.PI)*Math.asin(i/o),o*Math.pow(2,-10*e)*Math.sin((e*s-u)*(2*Math.PI)/c)+i+t)},easeInOutElastic:function(e,t,r,s){var i=r-t,o,c,u;return u=1.70158,c=0,o=i,e===0?t:(e/=s/2)===2?t+i:(c||(c=s*(.3*1.5)),o<Math.abs(i)?(o=i,u=c/4):u=c/(2*Math.PI)*Math.asin(i/o),e<1?-.5*(o*Math.pow(2,10*(e-=1))*Math.sin((e*s-u)*(2*Math.PI)/c))+t:o*Math.pow(2,-10*(e-=1))*Math.sin((e*s-u)*(2*Math.PI)/c)*.5+i+t)},easeInBack:function(e,t,r,s,i){var o=r-t;return i===void 0&&(i=1.70158),o*(e/=s)*e*((i+1)*e-i)+t},easeOutBack:function(e,t,r,s,i){var o=r-t;return i===void 0&&(i=1.70158),o*((e=e/s-1)*e*((i+1)*e+i)+1)+t},easeInOutBack:function(e,t,r,s,i){var o=r-t;return i===void 0&&(i=1.70158),(e/=s/2)<1?o/2*(e*e*(((i*=1.525)+1)*e-i))+t:o/2*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)+t},easeInBounce:function(e,t,r,s){var i=r-t,o;return o=n.easeOutBounce(s-e,0,i,s),i-o+t},easeOutBounce:function(e,t,r,s){var i=r-t;return(e/=s)<1/2.75?i*(7.5625*e*e)+t:e<2/2.75?i*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?i*(7.5625*(e-=2.25/2.75)*e+.9375)+t:i*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,r,s){var i=r-t,o;return e<s/2?(o=n.easeInBounce(e*2,0,i,s),o*.5+t):(o=n.easeOutBounce(e*2-s,0,i,s),o*.5+i*.5+t)}};return Go=n,Go}var $S=Xb();/*! Capacitor: https://capacitorjs.com/ - MIT License */var gr;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(gr||(gr={}));class Qo extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const Jb=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},Yb=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:Jb(n),i=()=>s()!=="web",o=p=>{const g=l.get(p);return!!(g?.platforms.has(s())||c(p))},c=p=>{var g;return(g=t.PluginHeaders)===null||g===void 0?void 0:g.find(b=>b.name===p)},u=p=>n.console.error(p),l=new Map,d=(p,g={})=>{const b=l.get(p);if(b)return console.warn(`Capacitor plugin "${p}" already registered. Cannot register plugins twice.`),b.proxy;const V=s(),D=c(p);let P;const x=async()=>(!P&&V in g?P=typeof g[V]=="function"?P=await g[V]():P=g[V]:e!==null&&!P&&"web"in g&&(P=typeof g.web=="function"?P=await g.web():P=g.web),P),B=(y,v)=>{var w,E;if(D){const S=D?.methods.find(T=>v===T.name);if(S)return S.rtype==="promise"?T=>t.nativePromise(p,v.toString(),T):(T,le)=>t.nativeCallback(p,v.toString(),T,le);if(y)return(w=y[v])===null||w===void 0?void 0:w.bind(y)}else{if(y)return(E=y[v])===null||E===void 0?void 0:E.bind(y);throw new Qo(`"${p}" plugin is not implemented on ${V}`,gr.Unimplemented)}},O=y=>{let v;const w=(...E)=>{const S=x().then(T=>{const le=B(T,y);if(le){const pe=le(...E);return v=pe?.remove,pe}else throw new Qo(`"${p}.${y}()" is not implemented on ${V}`,gr.Unimplemented)});return y==="addListener"&&(S.remove=async()=>v()),S};return w.toString=()=>`${y.toString()}() { [capacitor code] }`,Object.defineProperty(w,"name",{value:y,writable:!1,configurable:!1}),w},N=O("addListener"),$=O("removeListener"),K=(y,v)=>{const w=N({eventName:y},v),E=async()=>{const T=await w;$({eventName:y,callbackId:T},v)},S=new Promise(T=>w.then(()=>T({remove:E})));return S.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await E()},S},I=new Proxy({},{get(y,v){switch(v){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return D?K:N;case"removeListener":return $;default:return O(v)}}});return r[p]=I,l.set(p,{name:p,proxy:I,platforms:new Set([...Object.keys(g),...D?[V]:[]])}),I};return t.convertFileSrc||(t.convertFileSrc=p=>p),t.getPlatform=s,t.handleError=u,t.isNativePlatform=i,t.isPluginAvailable=o,t.registerPlugin=d,t.Exception=Qo,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},Zb=n=>n.Capacitor=Yb(n),Ga=Zb(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),eo=Ga.registerPlugin;class to{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const o=async()=>this.removeListener(e,t);return Promise.resolve({remove:o})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new Ga.Exception(e,gr.Unimplemented)}unavailable(e="not available"){return new Ga.Exception(e,gr.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);s!==-1&&this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const vd=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Td=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class eS extends to{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Td(s).trim(),i=Td(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=vd(e.key),r=vd(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",i=(e.path||"/").replace("path=",""),o=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${o};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}eo("CapacitorCookies",{web:()=>new eS});const tS=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),nS=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,o)=>(s[i]=n[e[o]],s),{})},rS=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,o]=s;let c,u;return Array.isArray(o)?(u="",o.forEach(l=>{c=e?encodeURIComponent(l):l,u+=`${i}=${c}&`}),u.slice(0,-1)):(c=e?encodeURIComponent(o):o,u=`${i}=${c}`),`${r}&${u}`},"").substr(1):null,sS=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=nS(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[o,c]of Object.entries(n.data||{}))i.set(o,c);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((c,u)=>{i.append(u,c)});else for(const c of Object.keys(n.data))i.append(c,n.data[c]);t.body=i;const o=new Headers(t.headers);o.delete("content-type"),t.headers=o}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class iS extends to{async request(e){const t=sS(e,e.webFetchExtra),r=rS(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),o=i.headers.get("content-type")||"";let{responseType:c="text"}=i.ok?e:{};o.includes("application/json")&&(c="json");let u,l;switch(c){case"arraybuffer":case"blob":l=await i.blob(),u=await tS(l);break;case"json":u=await i.json();break;case"document":case"text":default:u=await i.text()}const d={};return i.headers.forEach((p,g)=>{d[g]=p}),{data:u,headers:d,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}eo("CapacitorHttp",{web:()=>new iS});var wd;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(wd||(wd={}));var Ed;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(Ed||(Ed={}));class oS extends to{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}eo("SystemBars",{web:()=>new oS});const qS=eo("App",{web:()=>Sg(()=>Promise.resolve().then(()=>cS),void 0).then(n=>new n.AppWeb)});class aS extends to{constructor(){super(),this.handleVisibilityChange=()=>{const e={isActive:document.hidden!==!0};this.notifyListeners("appStateChange",e),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}async getInfo(){throw this.unimplemented("Not implemented on web.")}async getLaunchUrl(){return{url:""}}async getState(){return{isActive:document.hidden!==!0}}async minimizeApp(){throw this.unimplemented("Not implemented on web.")}async toggleBackButtonHandler(){throw this.unimplemented("Not implemented on web.")}async getAppLanguage(){return{value:navigator.language.split("-")[0].toLowerCase()}}}const cS=Object.freeze(Object.defineProperty({__proto__:null,AppWeb:aS},Symbol.toStringTag,{value:"Module"}));try{self["workbox:window:7.4.0"]&&_()}catch{}function Qa(n,e){return new Promise((function(t){var r=new MessageChannel;r.port1.onmessage=function(s){t(s.data)},n.postMessage(e,[r.port2])}))}function Id(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}function uS(n,e,t){return e&&(function(r,s){for(var i=0;i<s.length;i++){var o=s[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,hS(o.key),o)}})(n.prototype,e),Object.defineProperty(n,"prototype",{writable:!1}),n}function lS(n,e){var t=typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t)return(t=t.call(n)).next.bind(t);if(Array.isArray(n)||(t=(function(s,i){if(s){if(typeof s=="string")return Id(s,i);var o={}.toString.call(s).slice(8,-1);return o==="Object"&&s.constructor&&(o=s.constructor.name),o==="Map"||o==="Set"?Array.from(s):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?Id(s,i):void 0}})(n))||e){t&&(n=t);var r=0;return function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Xa(n,e){return Xa=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},Xa(n,e)}function hS(n){var e=(function(t,r){if(typeof t!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var i=s.call(t,r);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)})(n,"string");return typeof e=="symbol"?e:e+""}try{self["workbox:core:7.4.0"]&&_()}catch{}var Xo=function(){var n=this;this.promise=new Promise((function(e,t){n.resolve=e,n.reject=t}))};function Jo(n,e){var t=location.href;return new URL(n,t).href===new URL(e,t).href}var Gn=function(n,e){this.type=n,Object.assign(this,e)};function zt(n,e,t){return n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n}function dS(){}var fS={type:"SKIP_WAITING"};function Ad(n,e){return n&&n.then?n.then(dS):Promise.resolve()}var pS=(function(n){function e(i,o){var c,u;return o===void 0&&(o={}),(c=n.call(this)||this).nn={},c.tn=0,c.rn=new Xo,c.en=new Xo,c.on=new Xo,c.un=0,c.an=new Set,c.cn=function(){var l=c.fn,d=l.installing;c.tn>0||!Jo(d.scriptURL,c.sn.toString())||performance.now()>c.un+6e4?(c.vn=d,l.removeEventListener("updatefound",c.cn)):(c.hn=d,c.an.add(d),c.rn.resolve(d)),++c.tn,d.addEventListener("statechange",c.ln)},c.ln=function(l){var d=c.fn,p=l.target,g=p.state,b=p===c.vn,V={sw:p,isExternal:b,originalEvent:l};!b&&c.mn&&(V.isUpdate=!0),c.dispatchEvent(new Gn(g,V)),g==="installed"?c.wn=self.setTimeout((function(){g==="installed"&&d.waiting===p&&c.dispatchEvent(new Gn("waiting",V))}),200):g==="activating"&&(clearTimeout(c.wn),b||c.en.resolve(p))},c.yn=function(l){var d=c.hn,p=d!==navigator.serviceWorker.controller;c.dispatchEvent(new Gn("controlling",{isExternal:p,originalEvent:l,sw:d,isUpdate:c.mn})),p||c.on.resolve(d)},c.gn=(u=function(l){var d=l.data,p=l.ports,g=l.source;return zt(c.getSW(),(function(){c.an.has(g)&&c.dispatchEvent(new Gn("message",{data:d,originalEvent:l,ports:p,sw:g}))}))},function(){for(var l=[],d=0;d<arguments.length;d++)l[d]=arguments[d];try{return Promise.resolve(u.apply(this,l))}catch(p){return Promise.reject(p)}}),c.sn=i,c.nn=o,navigator.serviceWorker.addEventListener("message",c.gn),c}var t,r;r=n,(t=e).prototype=Object.create(r.prototype),t.prototype.constructor=t,Xa(t,r);var s=e.prototype;return s.register=function(i){var o=(i===void 0?{}:i).immediate,c=o!==void 0&&o;try{var u=this;return zt((function(l,d){var p=l();return p&&p.then?p.then(d):d(p)})((function(){if(!c&&document.readyState!=="complete")return Ad(new Promise((function(l){return window.addEventListener("load",l)})))}),(function(){return u.mn=!!navigator.serviceWorker.controller,u.dn=u.pn(),zt(u.bn(),(function(l){u.fn=l,u.dn&&(u.hn=u.dn,u.en.resolve(u.dn),u.on.resolve(u.dn),u.dn.addEventListener("statechange",u.ln,{once:!0}));var d=u.fn.waiting;return d&&Jo(d.scriptURL,u.sn.toString())&&(u.hn=d,Promise.resolve().then((function(){u.dispatchEvent(new Gn("waiting",{sw:d,wasWaitingBeforeRegister:!0}))})).then((function(){}))),u.hn&&(u.rn.resolve(u.hn),u.an.add(u.hn)),u.fn.addEventListener("updatefound",u.cn),navigator.serviceWorker.addEventListener("controllerchange",u.yn),u.fn}))})))}catch(l){return Promise.reject(l)}},s.update=function(){try{return this.fn?zt(Ad(this.fn.update())):zt()}catch(i){return Promise.reject(i)}},s.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},s.messageSW=function(i){try{return zt(this.getSW(),(function(o){return Qa(o,i)}))}catch(o){return Promise.reject(o)}},s.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&Qa(this.fn.waiting,fS)},s.pn=function(){var i=navigator.serviceWorker.controller;return i&&Jo(i.scriptURL,this.sn.toString())?i:void 0},s.bn=function(){try{var i=this;return zt((function(o,c){try{var u=o()}catch(l){return c(l)}return u&&u.then?u.then(void 0,c):u})((function(){return zt(navigator.serviceWorker.register(i.sn,i.nn),(function(o){return i.un=performance.now(),o}))}),(function(o){throw o})))}catch(o){return Promise.reject(o)}},uS(e,[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])})((function(){function n(){this.Pn=new Map}var e=n.prototype;return e.addEventListener=function(t,r){this.jn(t).add(r)},e.removeEventListener=function(t,r){this.jn(t).delete(r)},e.dispatchEvent=function(t){t.target=this;for(var r,s=lS(this.jn(t.type));!(r=s()).done;)(0,r.value)(t)},e.jn=function(t){return this.Pn.has(t)||this.Pn.set(t,new Set),this.Pn.get(t)},n})());const zS=Object.freeze(Object.defineProperty({__proto__:null,Workbox:pS,WorkboxEvent:Gn,messageSW:Qa},Symbol.toStringTag,{value:"Module"}));export{xc as $,qS as A,Zy as B,xm as C,Om as D,RS as E,MS as F,G0 as G,BS as H,y0 as I,rt as J,v0 as K,tb as L,Xc as M,N0 as N,OS as O,Cm as P,lt as Q,Ve as R,LS as S,fn as T,yS as U,IS as V,n0 as W,jS as X,Ct as Y,bS as Z,Sg as _,NS as a,CS as a0,Oc as a1,mS as a2,VS as a3,qo as a4,ar as a5,vm as a6,qm as a7,rb as a8,ht as a9,SS as aa,kS as ab,$S as ac,zS as ad,bb as b,e0 as c,_m as d,jm as e,eb as f,ot as g,Ln as h,Ot as i,j0 as j,xS as k,FS as l,Ue as m,uI as n,AS as o,TS as p,od as q,Ge as r,Ze as s,gS as t,_S as u,ES as v,DS as w,wS as x,zo as y,PS as z};
