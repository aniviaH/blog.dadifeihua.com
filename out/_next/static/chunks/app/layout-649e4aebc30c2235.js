(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{799:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,9324,23)),Promise.resolve().then(r.bind(r,7495)),Promise.resolve().then(r.bind(r,8312)),Promise.resolve().then(r.bind(r,9700)),Promise.resolve().then(r.t.bind(r,8173,23)),Promise.resolve().then(r.t.bind(r,3704,23)),Promise.resolve().then(r.t.bind(r,5688,23)),Promise.resolve().then(r.t.bind(r,7051,23))},7495:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});var n=r(5155),a=r(2115),o=r(6046);function s(){let e=(0,o.useRouter)(),t=(0,o.useSearchParams)(),[r,s]=(0,a.useState)(t.get("q")||"");return(0,n.jsx)("form",{onSubmit:t=>{t.preventDefault(),r.trim()&&e.push("/search?q=".concat(encodeURIComponent(r)))},className:"w-full max-w-lg",children:(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)("input",{type:"text",value:r,onChange:e=>s(e.target.value),placeholder:"搜索文章...",className:"w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"}),(0,n.jsx)("button",{type:"submit",className:"absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",children:(0,n.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,n.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]})})}},8312:(e,t,r)=>{"use strict";r.d(t,{D:()=>s,default:()=>l});var n=r(5155),a=r(2115);let o=(0,a.createContext)({theme:"light",setTheme:()=>{}}),s=()=>(0,a.useContext)(o);function l(e){let{children:t}=e,[r,s]=(0,a.useState)("light");return(0,a.useEffect)(()=>{let e=document.createElement("script");e.innerHTML="\n      (function() {\n        function getInitialTheme() {\n          const storedTheme = localStorage.getItem('theme');\n          if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {\n            return 'dark';\n          }\n          return 'light';\n        }\n        \n        const initialTheme = getInitialTheme();\n        document.documentElement.classList.toggle('dark', initialTheme === 'dark');\n      })();\n    ",document.head.appendChild(e);let t=localStorage.getItem("theme"),r=window.matchMedia("(prefers-color-scheme: dark)").matches;s(t||(r?"dark":"light"));let n=window.matchMedia("(prefers-color-scheme: dark)"),a=e=>{localStorage.getItem("theme")||s(e.matches?"dark":"light")};return n.addEventListener("change",a),()=>n.removeEventListener("change",a)},[]),(0,a.useEffect)(()=>{document.documentElement.classList.toggle("dark","dark"===r),localStorage.setItem("theme",r)},[r]),(0,n.jsx)(o.Provider,{value:{theme:r,setTheme:s},children:t})}},9700:(e,t,r)=>{"use strict";r.d(t,{default:()=>h});var n=r(5155),a=r(2115);let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),s=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()};var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,a.forwardRef)((e,t)=>{let{color:r="currentColor",size:n=24,strokeWidth:o=2,absoluteStrokeWidth:i,className:d="",children:c,iconNode:u,...f}=e;return(0,a.createElement)("svg",{ref:t,...l,width:n,height:n,stroke:r,strokeWidth:i?24*Number(o)/Number(n):o,className:s("lucide",d),...f},[...u.map(e=>{let[t,r]=e;return(0,a.createElement)(t,r)}),...Array.isArray(c)?c:[c]])}),d=(e,t)=>{let r=(0,a.forwardRef)((r,n)=>{let{className:l,...d}=r;return(0,a.createElement)(i,{ref:n,iconNode:t,className:s("lucide-".concat(o(e)),l),...d})});return r.displayName="".concat(e),r},c=d("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]),u=d("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);var f=r(8312);function h(){let{theme:e,setTheme:t}=(0,f.D)();return(0,n.jsx)("button",{onClick:()=>{t("light"===e?"dark":"light")},className:"p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors","aria-label":"light"===e?"切换到暗色模式":"切换到亮色模式",children:"light"===e?(0,n.jsx)(c,{className:"w-5 h-5 text-gray-600 dark:text-gray-400"}):(0,n.jsx)(u,{className:"w-5 h-5 text-gray-600 dark:text-gray-400"})})}},6046:(e,t,r)=>{"use strict";var n=r(6658);r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})},3704:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return b},handleClientScriptLoad:function(){return g},initScriptLoader:function(){return p}});let n=r(306),a=r(9955),o=r(5155),s=n._(r(7650)),l=a._(r(2115)),i=r(1147),d=r(2815),c=r(8571),u=new Map,f=new Set,h=e=>{if(s.default.preinit){e.forEach(e=>{s.default.preinit(e,{as:"style"})});return}if("undefined"!=typeof window){let t=document.head;e.forEach(e=>{let r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=e,t.appendChild(r)})}},m=e=>{let{src:t,id:r,onLoad:n=()=>{},onReady:a=null,dangerouslySetInnerHTML:o,children:s="",strategy:l="afterInteractive",onError:i,stylesheets:c}=e,m=r||t;if(m&&f.has(m))return;if(u.has(t)){f.add(m),u.get(t).then(n,i);return}let g=()=>{a&&a(),f.add(m)},p=document.createElement("script"),y=new Promise((e,t)=>{p.addEventListener("load",function(t){e(),n&&n.call(this,t),g()}),p.addEventListener("error",function(e){t(e)})}).catch(function(e){i&&i(e)});o?(p.innerHTML=o.__html||"",g()):s?(p.textContent="string"==typeof s?s:Array.isArray(s)?s.join(""):"",g()):t&&(p.src=t,u.set(t,y)),(0,d.setAttributesFromProps)(p,e),"worker"===l&&p.setAttribute("type","text/partytown"),p.setAttribute("data-nscript",l),c&&h(c),document.body.appendChild(p)};function g(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>m(e))}):m(e)}function p(e){e.forEach(g),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e=>{let t=e.id||e.getAttribute("src");f.add(t)})}function y(e){let{id:t,src:r="",onLoad:n=()=>{},onReady:a=null,strategy:d="afterInteractive",onError:u,stylesheets:h,...g}=e,{updateScripts:p,scripts:y,getIsSsr:b,appDir:v,nonce:k}=(0,l.useContext)(i.HeadManagerContext),_=(0,l.useRef)(!1);(0,l.useEffect)(()=>{let e=t||r;_.current||(a&&e&&f.has(e)&&a(),_.current=!0)},[a,t,r]);let x=(0,l.useRef)(!1);if((0,l.useEffect)(()=>{!x.current&&("afterInteractive"===d?m(e):"lazyOnload"===d&&("complete"===document.readyState?(0,c.requestIdleCallback)(()=>m(e)):window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>m(e))})),x.current=!0)},[e,d]),("beforeInteractive"===d||"worker"===d)&&(p?(y[d]=(y[d]||[]).concat([{id:t,src:r,onLoad:n,onReady:a,onError:u,...g}]),p(y)):b&&b()?f.add(t||r):b&&!b()&&m(e)),v){if(h&&h.forEach(e=>{s.default.preinit(e,{as:"style"})}),"beforeInteractive"===d)return r?(s.default.preload(r,g.integrity?{as:"script",integrity:g.integrity,nonce:k,crossOrigin:g.crossOrigin}:{as:"script",nonce:k,crossOrigin:g.crossOrigin}),(0,o.jsx)("script",{nonce:k,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([r,{...g,id:t}])+")"}})):(g.dangerouslySetInnerHTML&&(g.children=g.dangerouslySetInnerHTML.__html,delete g.dangerouslySetInnerHTML),(0,o.jsx)("script",{nonce:k,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...g,id:t}])+")"}}));"afterInteractive"===d&&r&&s.default.preload(r,g.integrity?{as:"script",integrity:g.integrity,nonce:k,crossOrigin:g.crossOrigin}:{as:"script",nonce:k,crossOrigin:g.crossOrigin})}return null}Object.defineProperty(y,"__nextScript",{value:!0});let b=y;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2815:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"setAttributesFromProps",{enumerable:!0,get:function(){return o}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"},n=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy","stylesheets"];function a(e){return["async","defer","noModule"].includes(e)}function o(e,t){for(let[o,s]of Object.entries(t)){if(!t.hasOwnProperty(o)||n.includes(o)||void 0===s)continue;let l=r[o]||o.toLowerCase();"SCRIPT"===e.tagName&&a(l)?e[l]=!!s:e.setAttribute(l,String(s)),(!1===s||"SCRIPT"===e.tagName&&a(l)&&(!s||"false"===s))&&(e.setAttribute(l,""),e.removeAttribute(l))}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9324:()=>{},5688:e=>{e.exports={style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"},className:"__className_4d318d",variable:"__variable_4d318d"}},7051:e=>{e.exports={style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"},className:"__className_ea5f4b",variable:"__variable_ea5f4b"}}},e=>{var t=t=>e(e.s=t);e.O(0,[261,173,441,517,358],()=>t(799)),_N_E=e.O()}]);