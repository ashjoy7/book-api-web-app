import{f as d}from"./genres-C5l1_x2c.js";import{a as i,b as c}from"./favorites-CKmpNuxT.js";function m(){console.log("Loading home view..."),document.getElementById("main-content").innerHTML=`
    <input type="text" id="search-input" placeholder="Search for books...">
    <button id="search-button">Search</button>
    <div id="search-results"></div>
  `,console.log("Search input and button have been added to the page."),document.getElementById("search-button").addEventListener("click",async()=>{console.log("Search button clicked");const t=document.getElementById("search-input").value;if(console.log("Search query:",t),t.trim()===""){console.log("Empty search query. Prompting user."),alert("Please enter a search query.");return}try{console.log("Fetching books from API...");const o=await d(t);console.log("Books fetched:",o);const a=document.getElementById("search-results");a.innerHTML=o.length>0?o.map(e=>`
        <div class="card" data-id="${e.id}">
          <h2>${e.volumeInfo.title}</h2>
          <p>${e.volumeInfo.authors?e.volumeInfo.authors.join(", "):"Unknown Author"}</p>
          <img src="${e.volumeInfo.imageLinks?e.volumeInfo.imageLinks.thumbnail:"placeholder.jpg"}" alt="Book cover">
          <button class="add-to-favorites" data-id="${e.id}">Add to Favorites</button>
          <button class="add-review" data-id="${e.id}">Add Review</button>
        </div>
      `).join(""):"<p>No results found.</p>",console.log("Search results displayed."),document.querySelectorAll(".add-to-favorites").forEach(e=>{e.addEventListener("click",r=>{console.log("Add to Favorites button clicked");const n=r.target.getAttribute("data-id");console.log("Adding book to favorites:",n),i(n)})}),document.querySelectorAll(".add-review").forEach(e=>{e.addEventListener("click",r=>{console.log("Add Review button clicked");const n=r.target.getAttribute("data-id");console.log("Adding review for book:",n),l(n)})})}catch(o){console.error("Error fetching books:",o)}})}function l(t){const o=prompt("Enter your review:");o!==null&&o.trim()!==""?c(t,o):alert("Review cannot be empty.")}export{m as loadHome};
