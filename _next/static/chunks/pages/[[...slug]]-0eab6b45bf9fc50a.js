(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[120],{5759:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[[...slug]]",function(){return n(6176)}])},6176:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return U},default:function(){return D}});var i=n(5893),r=n(3305),s=n(7294),l=n(1163),a=n(3808),o=n(1664),c=n.n(o),u=n(7649),d=n(3316),m=n.n(d),p=function(e){let{itemId:t,nolink:n}=e,r=(0,a.Tn)(t),s=(0,i.jsx)("img",{src:r.icon,alt:r.displayName,className:"item-icon"});return n?s:(0,i.jsx)(N,{id:t,tooltip:"text",children:s})},x=n(1736),h=n(7092),g=n.n(h);n(1712);var j=n(6488);let f=[j.fo];function _(e){let t,{item:n}=e;switch(n.rarity){case"uncommon":t=g().uncommonRarity;break;case"rare":t=g().rareRarity;break;case"epic":t=g().epicRarity;break;default:t=g().commonRarity}return(0,i.jsx)("span",{className:"".concat(g().itemName," ").concat(t),children:n.displayName})}function I(e){let{item:t,mode:n}=e;return null!=n||(n="icon"),(0,i.jsxs)("div",{className:g().itemTooltip,children:["icon"===n?(0,i.jsx)(p,{itemId:t.id,nolink:!0}):null,"text"===n?(0,i.jsx)(_,{item:t}):null]})}var y=function(e){let{children:t,...n}=e;return(0,i.jsx)(x.ZP,{content:(0,i.jsx)(I,{...n}),className:g().itemTooltip,arrow:j.ki,plugins:f,inlinePositioning:!0,children:(0,i.jsx)("span",{children:t})})},N=function(e){let t,n,{id:r,children:s,tooltip:o}=e,{asPath:d}=(0,l.useRouter)();if((r=r.replaceAll(/\s+/g,"")).includes(":")||(r="ae2:"+r),r.startsWith("ae2:")&&!(t=u.RQ[r]))throw Error("No page found for "+r);let p=(0,a.Tn)(r);return s||(s=p.displayName),d.endsWith("/")||(d+="/"),n=t&&d!==t?(0,i.jsx)(c(),{href:t,passHref:!0,children:s}):(0,i.jsx)("span",{className:m().itemTooltip,children:s}),(0,i.jsx)(y,{item:p,mode:o,children:n})},v=n(9122),b=n.n(v);function B(e){let{itemIds:t}=e,[n,r]=(0,s.useState)(0);return(0,s.useEffect)(()=>{let e=setInterval(()=>{r(e=>++e%t.length)},1e3);return()=>clearInterval(e)},[t]),(0,i.jsx)(p,{itemId:t[n]})}var T=function(e){let{itemIds:t}=e;return(0,i.jsx)("div",{className:b().ingredientBox,children:t.length>1?(0,i.jsx)(B,{itemIds:t}):(0,i.jsx)(p,{itemId:t[0]})})},C=function(e){let{ingredients:t,shapeless:n,width:r,height:s}=e,l=b().ingredientsBox;if(n)l=(t=t.filter(e=>e.length)).length<=1?b().ingredientsBoxShapeless1Col:t.length<=2?b().ingredientsBoxShapeless2Col:b().ingredientsBoxShapeless3Col;else{let e=[[],[],[],[],[],[],[],[],[]];for(let n=0;n<t.length;n++){let i=Math.floor(n/r),s=Math.floor(n%r);1===r&&s++,e[3*i+s]=t[n]}t=e}return(0,i.jsx)("div",{className:l,children:t.map((e,t)=>e.length>0?(0,i.jsx)(T,{itemIds:e},t):(0,i.jsx)("div",{className:b().emptyIngredientBox},t))})},S=function(){return(0,i.jsx)("svg",{className:b().recipeArrow,viewBox:"0 0 85 50",children:(0,i.jsx)("path",{d:"M 0 20 H 60 V 0 L 85 25 L 60 50 L 60 30 L 0 30 Z",fill:"#8b8b8b"})})},w=function(e){let{recipe:t}=e,n=(0,a.Tn)(t.resultItem);return(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:b().recipeBoxLayout,children:[(0,i.jsxs)("strong",{children:[n.displayName," ",t.shapeless?" (Shapeless)":null]}),(0,i.jsx)(C,{...t}),(0,i.jsx)(S,{}),(0,i.jsx)(T,{itemIds:[t.resultItem]})]})})},R=function(e){let{recipe:t}=e,n=(0,a.Tn)(t.resultItem);return(0,i.jsxs)("div",{className:b().recipeBoxLayout,children:[(0,i.jsx)("strong",{children:n.displayName}),(0,i.jsx)(S,{}),(0,i.jsx)(T,{itemIds:[t.resultItem]})]})},k=function(e){let{recipe:t}=e,n=(0,a.Tn)(t.resultItem);return(0,i.jsxs)("div",{className:b().recipeBoxLayout,children:[(0,i.jsxs)("strong",{children:["Smelting - ",n.displayName]}),(0,i.jsxs)("div",{className:b().smeltingInputBox,children:[(0,i.jsx)(T,{itemIds:t.ingredient}),(0,i.jsx)("div",{className:b().ingredientBox,children:(0,i.jsx)("img",{className:"item-icon",src:"/_next/static/media/smelt.cab5eb53.png",alt:""})})]}),(0,i.jsx)(S,{}),(0,i.jsx)(T,{itemIds:[t.resultItem]})]})},E=n(732),L=n.n(E),P=function(e){let{children:t}=e;return(0,i.jsx)("div",{className:L().itemGrid,children:t})};function F(e){let{page:{title:t,itemIds:n,url:r}}=e;return n.length?(0,i.jsx)(c(),{href:r,passHref:!0,children:(0,i.jsx)(p,{itemId:n[0],nolink:!0})}):(0,i.jsx)(c(),{href:r,legacyBehavior:!0,children:t})}var A=function(e){let{category:t}=e,{title:n,pages:r}=(0,u.b5)(t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:"title is-4",children:n})}),(0,i.jsx)(P,{children:r.map(e=>(0,i.jsx)(F,{page:e},e.url))})]})},H=n(9008),G=n.n(H),K=n(5675),O=n.n(K),W=e=>{let{src:t}=e;return t},X=n(3409),Z=n.n(X);let z={"net.fabricmc.fabric.api.transfer.v1.storage.Storage":"Portable Fabric Fluid Storage (i.e. Tanks, Buckets)","team.reborn.energy.api.EnergyStorage":"Portable TechReborn Energy Storage (i.e. Batteries)"};function M(e){var t;let{typeInfo:n}=e,r=(0,a.Tn)(n.tunnelItemId),s=n.attunementItemIds.filter(e=>!(0,a._2)(e));return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h3",{children:r.displayName}),s.length?(0,i.jsxs)(i.Fragment,{children:["This type of P2P-Tunnel can be attuned by right-clicking a tunnel part with one of the following items:",(0,i.jsx)("ul",{children:s.map((e,t)=>(0,i.jsx)("li",{children:(0,i.jsx)(N,{id:e})},t))})]}):null,n.attunementApiClasses.length?(0,i.jsxs)(i.Fragment,{children:["It can also be attuned by right-clicking a tunnel part with an item that provides one of the following functionalities:",(0,i.jsx)("ul",{children:n.attunementApiClasses.map((e,n)=>(0,i.jsx)("li",{children:null!==(t=z[e])&&void 0!==t?t:e},n))})]}):null]})}let Q={a:function(e){let{href:t,children:n,...r}=e;return t?(0,i.jsx)(c(),{passHref:!0,href:t,...r,children:n}):(0,i.jsx)("a",{...r,children:n})},img:function(e){let t,n,{src:r,alt:s,width:l,height:a}=e;return r?("string"==typeof l?t=parseInt(l):"number"==typeof l&&(t=l),"string"==typeof a?n=parseInt(a):"number"==typeof a&&(n=a),(0,i.jsx)(O(),{alt:null!=s?s:"",width:t,height:n,src:r,loader:W,unoptimized:!0})):null},ItemGrid:P,ItemIcon:p,ItemLink:N,RecipeFor:function(e){let{id:t}=e;t.includes(":")||(t="ae2:"+t);let n=Object.values(a.IR).filter(e=>e.resultItem===t),r=Object.values(a.LH).filter(e=>e.resultItem===t),s=Object.values(a.C).filter(e=>e.resultItem===t);if(0===n.length&&0===r.length&&0===s.length)throw Error("No recipes for "+t);return(0,i.jsxs)("div",{className:b().recipeContainer,children:[n.map((e,t)=>(0,i.jsx)(w,{recipe:e},e.id)),s.map((e,t)=>(0,i.jsx)(R,{recipe:e},e.id)),r.map((e,t)=>(0,i.jsx)(k,{recipe:e},e.id))]})},CategoryIndex:A,SubCategories:function(e){let{category:t}=e,n=(0,u.b5)(t);return(0,i.jsx)("div",{className:Z().subCategories,children:n.categories.map(e=>(0,i.jsx)("div",{children:(0,i.jsx)(A,{category:e.fullPath})},e.title))})},InscriberRecipes:function(){return(0,i.jsx)("div",{className:b().recipeContainer,children:Object.values(a.C).map(e=>(0,i.jsx)(R,{recipe:e},e.id))})},p:function(e){let{children:t}=e;return(0,i.jsx)("div",{className:"block",children:t})},P2PTunnelTypes:function(){return(0,i.jsx)(i.Fragment,{children:a.tH.map(e=>(0,i.jsx)(M,{typeInfo:e},e.tunnelItemId))})}};var U=!0;function D(e){let{source:t,frontMatter:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(G(),{children:(0,i.jsxs)("title",{children:["AE2 - ",n.title]})}),(0,i.jsx)("h1",{className:"title",children:n.title}),(0,i.jsx)("div",{className:"content",children:(0,i.jsx)(r.R,{...t,components:Q})})]})}},732:function(e){e.exports={itemGrid:"ItemGrid_itemGrid__03JKE"}},3316:function(e){e.exports={itemTooltip:"ItemLink_itemTooltip__fG8Es"}},7092:function(e){e.exports={itemTooltip:"ItemTooltip_itemTooltip__iXis0",itemName:"ItemTooltip_itemName__4Ha3U",commonRarity:"ItemTooltip_commonRarity__IZtms",uncommonRarity:"ItemTooltip_uncommonRarity__T0rKA",rareRarity:"ItemTooltip_rareRarity__jgDwB",epicRarity:"ItemTooltip_epicRarity__L2pes"}},3409:function(e){e.exports={subCategories:"SubCategories_subCategories__HrjHR"}},9122:function(e){e.exports={recipeContainer:"recipe_recipeContainer__Akm_f",recipeArrow:"recipe_recipeArrow__KhX_t",recipeBoxLayout:"recipe_recipeBoxLayout__06cPK",ingredientsBox:"recipe_ingredientsBox__yWx_0",ingredientsBoxShapeless1Col:"recipe_ingredientsBoxShapeless1Col__Z3zn5",ingredientsBoxShapeless2Col:"recipe_ingredientsBoxShapeless2Col__WnUQK",ingredientsBoxShapeless3Col:"recipe_ingredientsBoxShapeless3Col__NTm6u",emptyIngredientBox:"recipe_emptyIngredientBox__Ki4QE",ingredientBox:"recipe_ingredientBox__zSC8S",smeltingInputBox:"recipe_smeltingInputBox__wGSwF"}}},function(e){e.O(0,[543,774,888,179],function(){return e(e.s=5759)}),_N_E=e.O()}]);