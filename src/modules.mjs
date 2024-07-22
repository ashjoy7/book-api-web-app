import { fetchBooks } from './api.mjs';

export function loadHome() {
  document.getElementById('main-content').innerHTML = `
    <input type="text" id="search-input" placeholder="Search for books...">
    <button id="search-button">Search</button>
    <div id="search-results"></div>
  `;
  document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const books = await fetchBooks(query);
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = books.map(book => `
      <div class="card">
        <h2>${book.volumeInfo.title}</h2>
        <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
        <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg'}" alt="Book cover">
      </div>
    `).join('');
  });
}

export function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.getElementById('main-content').innerHTML = `
    <h1>Favorites</h1>
    ${favorites.map(book => `
      <div class="card">
        <h2>${book.title}</h2>
        <p>${book.author}</p>
      </div>
    `).join('')}
  `;
}

// Implement similar functions for loadGenres, loadReviews, and others...
