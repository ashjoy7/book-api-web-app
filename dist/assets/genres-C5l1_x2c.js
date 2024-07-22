const l="AIzaSyA7220IFji6WW67RZeBXQ6P5LFB_f22VKE",c="https://www.googleapis.com/books/v1/volumes?q=";async function h(t){return(await(await fetch(`${c}${t}&key=${l}`)).json()).items||[]}async function s(t){return await(await fetch(`https://www.googleapis.com/books/v1/volumes/${t}?key=${l}`)).json()}async function u(){const t=JSON.parse(localStorage.getItem("favorites"))||[],n=JSON.parse(localStorage.getItem("reviews"))||[],r=(await Promise.all([...t.map(async e=>{const o=await s(e.id);return{id:e.id,title:o.volumeInfo.title||"Unknown Title",author:o.volumeInfo.authors?o.volumeInfo.authors.join(", "):"Unknown Author",genre:await i(e.id)}}),...n.map(async e=>{const o=await s(e.bookId);return{id:e.bookId,title:o.volumeInfo.title||"Unknown Title",author:o.volumeInfo.authors?o.volumeInfo.authors.join(", "):"Unknown Author",genre:await i(e.bookId)}})])).reduce((e,o)=>(e[o.genre]||(e[o.genre]=[]),e[o.genre].push(o),e),{});document.getElementById("main-content").innerHTML=`
    <h1>Genres</h1>
    ${Object.keys(r).map(e=>`
      <h2>${e}</h2>
      ${r[e].map(o=>`
        <div class="card">
          <h2>${o.title}</h2>
          <p>Author: ${o.author}</p>
        </div>
      `).join("")}
    `).join("")}
  `}async function i(t){try{const a=(await s(t)).volumeInfo.categories||[];return a.length>0?a[0]:"Unknown Genre"}catch(n){return console.error("Failed to fetch book genre:",n),"Unknown Genre"}}const f=Object.freeze(Object.defineProperty({__proto__:null,loadGenres:u},Symbol.toStringTag,{value:"Module"}));export{s as a,h as f,f as g,u as l};
