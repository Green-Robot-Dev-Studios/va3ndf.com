(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[563,734,982,333,2,679,743,125,362,265,744,189,358,778,680,819,875],{5417:function(e,t,n){Promise.resolve().then(n.t.bind(n,8173,23)),Promise.resolve().then(n.bind(n,44)),Promise.resolve().then(n.bind(n,6549)),Promise.resolve().then(n.bind(n,8663))},3508:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7437);function l(e){let{type:t,children:n}=e;return(0,r.jsx)("div",{style:{backgroundColor:{normal:"#ddffdd",danger:"#ffdddd",idea:"#fffedd"}[t],margin:"1rem",padding:"1rem",borderRadius:"0.4rem",borderLeft:"#00000099",borderLeftWidth:"0.4rem",borderLeftStyle:"inset",boxShadow:"0 0 0px 2px"},children:n})}},44:function(e,t,n){"use strict";var r=n(7437),l=n(2265),a=n(3508);t.default=e=>{let{cells:t}=e;return(0,l.useEffect)(()=>{let e=document.body,n=document.createElement("script");n.setAttribute("src","https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"),n.onload=()=>{let n=document.createElement("script"),r="\n                if (typeof variable === 'undefined') {\n                    console.log('Desmos not loaded')\n                    const elt = document.getElementById('calculator'); \n                    window.calculator = Desmos.GraphingCalculator(elt);\n                }\n            ";t&&t.forEach((e,t)=>{r+="\n                    window.calculator.setExpression({ id: '".concat(t,"', latex: '").concat(e,"' });\n                ")}),n.innerHTML=r,e.appendChild(n)},e.appendChild(n)},[]),(0,r.jsx)(a.Z,{title:"Desmos",type:"normal",icon:"\uD83D\uDCC8",children:(0,r.jsx)("div",{id:"calculator",style:{width:"100%",height:500}})})}},6549:function(e,t,n){"use strict";n.d(t,{default:function(){return d}});var r=n(7437),l=n(7818),a=n(3508);let i=(0,l.default)(async()=>(await Promise.all([n.e(555),n.e(293),n.e(577)]).then(n.t.bind(n,266,19))).Excalidraw,{loadableGenerated:{webpack:()=>[require.resolveWeak("@excalidraw/excalidraw")]},ssr:!1});function d(e){return(0,r.jsx)(a.Z,{type:"normal",children:(0,r.jsx)("div",{style:{height:"500px"},children:(0,r.jsx)(i,{initialData:e.file})})})}},8663:function(e,t,n){"use strict";var r=n(7437),l=n(2265),a=n(2033),i=n(3508);let d=e=>{let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t};t.default=e=>{let{question:t,answers:n=["A","B","C","D"],correct:o=n[0],children:c}=e,s=!0;("A"==n[0]||"a"==n[0])&&(s=!1);let[u,f]=(0,l.useState)(!1),m=(0,l.createRef)(null);return((0,l.useEffect)(()=>{f(!0),m.current&&a(m.current,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}]})}),u)?(0,r.jsx)(i.Z,{type:"normal",title:"Quiz",icon:"\uD83D\uDCCB",children:(0,r.jsxs)("div",{id:"quiz",ref:m,children:[(0,r.jsx)("h3",{children:t}),c,(0,r.jsx)("div",{id:"answers",children:(s?d(n):n).map((e,t)=>(0,r.jsxs)("div",{className:"answer",children:[(0,r.jsx)("input",{type:"radio",id:"answer-".concat(t),name:"answer",value:e}),(0,r.jsx)("label",{htmlFor:"answer-".concat(t),id:"answer",style:{marginLeft:"1rem"},children:e})]},t))}),(0,r.jsx)("button",{onClick:()=>{let e=document.querySelector('input[name="answer"]:checked');e&&(e.value===o?e.parentElement.style.backgroundColor="#8bc34a":e.parentElement.style.backgroundColor="#f44336",document.querySelectorAll('input[name="answer"]').forEach(e=>{e.value===o&&(e.parentElement.style.backgroundColor="#8bc34a"),e.disabled=!0}))},id:"submit",style:{padding:"0.6rem",borderRadius:"0.3rem",backgroundColor:"#8bc34a"},children:"Check"})]})}):(0,r.jsx)(r.Fragment,{})}}},function(e){e.O(0,[639,587,971,23,560],function(){return e(e.s=5417)}),_N_E=e.O()}]);