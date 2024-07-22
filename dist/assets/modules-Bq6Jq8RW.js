const a="AIzaSyA7220IFji6WW67RZeBXQ6P5LFB_f22VKE",s="https://www.googleapis.com/books/v1/volumes?q=";async function i(e){return(await(await fetch(`${s}${e}&key=${a}`)).json()).items||[]}function c(){document.getElementById("main-content").innerHTML=`
    <input type="text" id="search-input" placeholder="Search for books...">
    <button id="search-button">Search</button>
    <div id="search-results"></div>
  `,document.getElementById("search-button").addEventListener("click",async()=>{const e=document.getElementById("search-input").value,t=await i(e),o=document.getElementById("search-results");o.innerHTML=t.map(n=>`
      <div class="card">
        <h2>${n.volumeInfo.title}</h2>
        <p>${n.volumeInfo.authors?n.volumeInfo.authors.join(", "):"Unknown Author"}</p>
        <img src="${n.volumeInfo.imageLinks?n.volumeInfo.imageLinks.thumbnail:"placeholder.jpg"}" alt="Book cover">
      </div>
    `).join("")})}function r(){const e=JSON.parse(localStorage.getItem("favorites"))||[];document.getElementById("main-content").innerHTML=`
    <h1>Favorites</h1>
    ${e.map(t=>`
      <div class="card">
        <h2>${t.title}</h2>
        <p>${t.author}</p>
      </div>
    `).join("")}
  `}export{r as loadFavorites,c as loadHome};
