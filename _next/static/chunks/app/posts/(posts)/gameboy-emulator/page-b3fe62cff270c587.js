(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[743,982,333,679,2,125,362,744,358,265,778,680,819,875],{5417:function(e,t,r){Promise.resolve().then(r.t.bind(r,8173,23)),Promise.resolve().then(r.bind(r,44)),Promise.resolve().then(r.bind(r,6549)),Promise.resolve().then(r.bind(r,8663))},3508:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(7437);function i(e){let{type:t,children:r}=e;return(0,n.jsx)("div",{style:{backgroundColor:{normal:"#ddffdd",danger:"#ffdddd",idea:"#fffedd"}[t],margin:"1rem",padding:"1rem",borderRadius:"0.4rem",borderLeft:"#00000099",borderLeftWidth:"0.4rem",borderLeftStyle:"inset",boxShadow:"0 0 0px 2px"},children:r})}},44:function(e,t,r){"use strict";var n=r(7437),i=r(2265),a=r(3508);t.default=e=>{let{cells:t}=e;return(0,i.useEffect)(()=>{let e=document.body,r=document.createElement("script");r.setAttribute("src","https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"),r.onload=()=>{let r=document.createElement("script"),n="\n                if (typeof variable === 'undefined') {\n                    console.log('Desmos not loaded')\n                    const elt = document.getElementById('calculator'); \n                    window.calculator = Desmos.GraphingCalculator(elt);\n                }\n            ";t&&t.forEach((e,t)=>{n+="\n                    window.calculator.setExpression({ id: '".concat(t,"', latex: '").concat(e,"' });\n                ")}),r.innerHTML=n,e.appendChild(r)},e.appendChild(r)},[]),(0,n.jsx)(a.Z,{title:"Desmos",type:"normal",icon:"\uD83D\uDCC8",children:(0,n.jsx)("div",{id:"calculator",style:{width:600,height:500}})})}},6549:function(e,t,r){"use strict";r.d(t,{default:function(){return d}});var n=r(7437),i=r(7818),a=r(3508);let l=(0,i.default)(async()=>(await Promise.all([r.e(555),r.e(293),r.e(577)]).then(r.t.bind(r,266,19))).Excalidraw,{loadableGenerated:{webpack:()=>[require.resolveWeak("@excalidraw/excalidraw")]},ssr:!1});function d(e){return(0,n.jsx)(a.Z,{type:"normal",children:(0,n.jsx)("div",{style:{height:"500px"},children:(0,n.jsx)(l,{initialData:e.file})})})}},8663:function(e,t,r){"use strict";var n=r(7437),i=r(2265),a=r(2033),l=r(3508);let d=e=>{let t=[...e];for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t};t.default=e=>{let{question:t,answers:r=["A","B","C","D"],correct:s=r[0],children:o}=e,c=!0;("A"==r[0]||"a"==r[0])&&(c=!1);let[u,f]=(0,i.useState)(!1),h=(0,i.createRef)(null);return((0,i.useEffect)(()=>{f(!0),h.current&&a(h.current,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}]})}),u)?(0,n.jsx)(l.Z,{type:"normal",title:"Quiz",icon:"\uD83D\uDCCB",children:(0,n.jsxs)("div",{id:"quiz",ref:h,children:[(0,n.jsx)("h3",{children:t}),o,(0,n.jsx)("div",{id:"answers",children:(c?d(r):r).map((e,t)=>(0,n.jsxs)("div",{className:"answer",children:[(0,n.jsx)("input",{type:"radio",id:"answer-".concat(t),name:"answer",value:e}),(0,n.jsx)("label",{htmlFor:"answer-".concat(t),id:"answer",style:{marginLeft:"1rem"},children:e})]},t))}),(0,n.jsx)("button",{id:"submit",style:{padding:"0.6rem",borderRadius:"0.3rem",backgroundColor:"#8bc34a"},children:"Check"})]})}):(0,n.jsx)(n.Fragment,{})}}},function(e){e.O(0,[639,587,971,23,560],function(){return e(e.s=5417)}),_N_E=e.O()}]);