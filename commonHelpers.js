import{a as w,S,i as h}from"./assets/vendor-550cebad.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();async function m(o,e=1){const s="43068097-aa3ed59823608d0655ab40c7d",a="https://pixabay.com/api/",t=new URLSearchParams({key:s,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});try{const r=await w.get(a,{params:t});if(r.status!==200)throw new Error("Error");const i=r.data;return i.totalHits===0?null:i}catch(r){return r}}function y(o,e){if(!Array.isArray(o)){console.error(Error);return}const s=o.map(({webformatURL:a,largeImageURL:t,tags:r,likes:i,views:p,comments:L,downloads:v})=>`<li class="gallery-item">
        <a href="${t}">
          <img
            src="${a}"
            data-source="${t}"
            alt="${r}"
          />
          <ul class="gallery-description">
            <li class="gallery-desc-item"><div class="desc-info"><h3>Likes</h3><p>${i}</p></div></li>
            <li class="gallery-desc-item"><div class="desc-info"><h3>Views</h3><p>${p}</p></div></li>
            <li class="gallery-desc-item"><div class="desc-info"><h3>Comments</h3><p>${L}</p></div></li>
            <li class="gallery-desc-item"><div class="desc-info"><h3>Downloads</h3><p>${v}</p></div></li>
          </ul>
        </a>
      </li>`).join("");e?(e.innerHTML=s,new S(".gallery-item a",{captionsData:"alt",captionDelay:250})):console.error(Error)}const b=document.querySelector("#search-form"),d=document.querySelector(".gallery"),n=document.querySelector(".loader"),c=document.querySelector(".more-btn");let u=1,g="",l=[];b.addEventListener("submit",async o=>{o.preventDefault(),d.innerHTML="";const e=o.target.querySelector("#search-input").value.trim();if(e){n.classList.add("loading");try{const s=await m(e);s===null?h.error({position:"topRight",title:"❌",icon:"",message:"Sorry, there are no images matching your search query. Please try again!"}):(l=s.hits,y(l,d),f(s.totalHits,l.length),g=e,u=1)}catch(s){console.error(s)}finally{n.classList.remove("loading")}}o.target.reset()});c.addEventListener("click",async o=>{n.classList.add("loading");try{const e=await m(g,u+1);if(e===null||e.hits.length===0)c.classList.add("is-hidden"),h.info({position:"topRight",title:"",message:"We're sorry, but you've reached the end of search results."});else{l=l.concat(e.hits),y(l,d),u++;const s=document.querySelectorAll(".gallery-item"),t=s[s.length-e.hits.length].getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"}),f(e.totalHits,l.length)}}catch(e){console.error(e)}finally{n.classList.remove("loading")}});function f(o,e){e>=o?c.classList.add("is-hidden"):c.classList.remove("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
