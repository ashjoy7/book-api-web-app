import{a as n,l as c}from"./genres-C5l1_x2c.js";async function l(){const a=JSON.parse(localStorage.getItem("reviews"))||[],t=await Promise.all(a.map(async e=>{const o=await n(e.bookId);return{...e,bookTitle:o.volumeInfo.title||"Unknown Title",bookAuthor:o.volumeInfo.authors?o.volumeInfo.authors.join(", "):"Unknown Author"}}));document.getElementById("main-content").innerHTML=`
    <h1>Reviews</h1>
    ${t.length>0?t.map(e=>`
      <div class="card" data-id="${e.id}">
        <h2>${e.bookTitle}</h2>
        <p>Author: ${e.bookAuthor}</p>
        <p>Review: ${e.text||"No review text available"}</p>
        <button class="edit-review-button" data-id="${e.id}">Edit</button>
        <button class="delete-review-button" data-id="${e.id}">Delete</button>
        <button class="add-favorite-button" data-id="${e.bookId}">Add to Favorites</button>
      </div>
    `).join(""):"<p>No reviews yet.</p>"}
  `,document.querySelectorAll(".edit-review-button").forEach(e=>{e.addEventListener("click",o=>{const i=o.target.getAttribute("data-id");v(i)})}),document.querySelectorAll(".delete-review-button").forEach(e=>{e.addEventListener("click",o=>{const i=o.target.getAttribute("data-id");u(i)})}),document.querySelectorAll(".add-favorite-button").forEach(e=>{e.addEventListener("click",o=>{const i=o.target.getAttribute("data-id");f(i)})})}async function d(a,t){try{console.log("Fetching book details for ID:",a);const e=await n(a);if(!e||!e.volumeInfo){console.error("Failed to fetch book details or missing volumeInfo"),alert("Failed to fetch book details. Review could not be added.");return}const o=e.volumeInfo.title||"Unknown Title",i=JSON.parse(localStorage.getItem("reviews"))||[],r={id:Date.now().toString(),bookId:a,text:t,bookTitle:o};i.push(r),localStorage.setItem("reviews",JSON.stringify(i)),alert("Review added!"),l()}catch(e){console.error("Failed to add review:",e)}}function v(a){const t=JSON.parse(localStorage.getItem("reviews"))||[],e=t.find(o=>o.id===a);if(e){const o=prompt("Edit your review:",e.text);o!==null&&(e.text=o,localStorage.setItem("reviews",JSON.stringify(t)),alert("Review updated!"),l())}else alert("Review not found!")}function u(a){let t=JSON.parse(localStorage.getItem("reviews"))||[];t=t.filter(e=>e.id!==a),t=t.filter(e=>e.bookId&&e.bookId.trim()!==""),localStorage.setItem("reviews",JSON.stringify(t)),alert("Review deleted!"),l()}async function f(a){try{const t=await n(a);if(t){let e=JSON.parse(localStorage.getItem("favorites"))||[];e.some(o=>o.id===a)?alert("Book is already in favorites!"):(e.push({id:a,title:t.volumeInfo.title,author:t.volumeInfo.authors?t.volumeInfo.authors.join(", "):"Unknown Author"}),localStorage.setItem("favorites",JSON.stringify(e)),alert("Book added to favorites!"),s(),c())}}catch(t){console.error("Failed to add favorite:",t)}}const h=Object.freeze(Object.defineProperty({__proto__:null,addReview:d,loadReviews:l},Symbol.toStringTag,{value:"Module"}));async function s(){const t=(JSON.parse(localStorage.getItem("favorites"))||[]).map(o=>n(o.id)),e=await Promise.all(t);document.getElementById("main-content").innerHTML=`
    <h1>Favorites</h1>
    ${e.length>0?e.map(o=>`
      <div class="card" data-id="${o.id}">
        <h2>${o.volumeInfo.title||"Unknown Title"}</h2>
        <p>${o.volumeInfo.authors?o.volumeInfo.authors.join(", "):"Unknown Author"}</p>
        <button class="remove-favorite-button" data-id="${o.id}">Remove as Favorite</button>
        <button class="add-review-button" data-id="${o.id}">Add Review</button>
      </div>
    `).join(""):"<p>No favorites yet.</p>"}
  `,document.querySelectorAll(".remove-favorite-button").forEach(o=>{o.addEventListener("click",i=>{const r=i.target.getAttribute("data-id");w(r)})}),document.querySelectorAll(".add-review-button").forEach(o=>{o.addEventListener("click",i=>{const r=i.target.getAttribute("data-id");g(r)})})}async function m(a){try{const t=await n(a);let e=JSON.parse(localStorage.getItem("favorites"))||[];e.some(o=>o.id===a)?alert("Book is already in favorites!"):(e.push({id:a,title:t.volumeInfo.title,author:t.volumeInfo.authors?t.volumeInfo.authors.join(", "):"Unknown Author"}),localStorage.setItem("favorites",JSON.stringify(e)),alert("Book added to favorites!"),s())}catch(t){console.error("Failed to add to favorites:",t)}}function w(a){let t=JSON.parse(localStorage.getItem("favorites"))||[];t=t.filter(e=>e.id!==a),localStorage.setItem("favorites",JSON.stringify(t)),s(),updateGenres()}function g(a){const t=prompt("Enter your review:");t!==null&&t.trim()!==""?d(a,t):alert("Review text cannot be empty.")}const p=Object.freeze(Object.defineProperty({__proto__:null,addToFavorites:m,loadFavorites:s},Symbol.toStringTag,{value:"Module"}));export{m as a,d as b,p as f,h as r};