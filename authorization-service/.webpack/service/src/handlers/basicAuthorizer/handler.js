(()=>{"use strict";var e={d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{basicAuthorizer:()=>r});const r=async e=>{const{headers:o}=e,{authorization:r}=o;console.log(e);const t=Buffer.from(r?.split(" ")[1],"base64")?.toString()||"",[n,s]=t?.split(":");return console.log(t),{isAuthorized:process.env[n]===s}};var t=exports;for(var n in o)t[n]=o[n];o.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})})();