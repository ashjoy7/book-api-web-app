// favorites.mjs
import { fetchBookDetails } from './api.mjs';
import { loadGenres } from './genres.mjs';
import { addReview } from './reviews.mjs'; 

export async function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const detailsPromises = favorites.map(book => fetchBookDetails(book.id));
  const booksDetails = await Promise.all(detailsPromises);

  document.getElementById('main-content').innerHTML = `
    <h1>Favorites</h1>
    ${booksDetails.length > 0 ? booksDetails.map(book => `
      <div class="card" data-id="${book.id}">
        <h2>${book.volumeInfo.title || 'Unknown Title'}</h2>
        <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
        <button class="remove-favorite-button" data-id="${book.id}">Remove as Favorite</button>
        <button class="add-review-button" data-id="${book.id}">Add Review</button>
      </div>
    `).join('') : '<p>No favorites yet.</p>'}
  `;

  document.querySelectorAll('.remove-favorite-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-id');
      removeFavorite(bookId);
    });
  });

  document.querySelectorAll('.add-review-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-id');
      promptReview(bookId);
    });
  });
}

export async function addToFavorites(bookId) {
  try {
    const book = await fetchBookDetails(bookId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(f => f.id === bookId)) {
      favorites.push({
        id: bookId,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Book added to favorites!');
      loadFavorites(); // Refresh favorites view
    } else {
      alert('Book is already in favorites!');
    }
  } catch (error) {
    console.error('Failed to add to favorites:', error);
  }
}

function removeFavorite(bookId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(f => f.id !== bookId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites(); // Refresh favorites view
  updateGenres(); // Ensure updateGenres is defined elsewhere
}

function promptReview(bookId) {
  const reviewText = prompt('Enter your review:');
  if (reviewText !== null && reviewText.trim() !== '') {
    addReview(bookId, reviewText);
  } else {
    alert('Review text cannot be empty.');
  }
}
