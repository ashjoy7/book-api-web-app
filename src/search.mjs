// search.mjs
import { fetchBooks } from './api.mjs';
import { addToFavorites } from './favorites.mjs';
import { addReview } from './reviews.mjs';

export function loadHome() {
  console.log('Loading home view...');

  document.getElementById('main-content').innerHTML = `
    <input type="text" id="search-input" placeholder="Search for books...">
    <button id="search-button">Search</button>
    <div id="search-results"></div>
  `;

  console.log('Search input and button have been added to the page.');

  document.getElementById('search-button').addEventListener('click', async () => {
    console.log('Search button clicked');

    const query = document.getElementById('search-input').value;
    console.log('Search query:', query);

    if (query.trim() === '') {
      console.log('Empty search query. Prompting user.');
      alert('Please enter a search query.');
      return;
    }

    try {
      console.log('Fetching books from API...');
      const books = await fetchBooks(query);
      console.log('Books fetched:', books);

      const resultsContainer = document.getElementById('search-results');
      resultsContainer.innerHTML = books.length > 0 ? books.map(book => `
        <div class="card" data-id="${book.id}">
          <h2>${book.volumeInfo.title}</h2>
          <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
          <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg'}" alt="Book cover">
          <button class="add-to-favorites" data-id="${book.id}">Add to Favorites</button>
          <button class="add-review" data-id="${book.id}">Add Review</button>
        </div>
      `).join('') : '<p>No results found.</p>';

      console.log('Search results displayed.');

      document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', (event) => {
          console.log('Add to Favorites button clicked');
          const bookId = event.target.getAttribute('data-id');
          console.log('Adding book to favorites:', bookId);
          addToFavorites(bookId);
        });
      });

      document.querySelectorAll('.add-review').forEach(button => {
        button.addEventListener('click', (event) => {
          console.log('Add Review button clicked');
          const bookId = event.target.getAttribute('data-id');
          console.log('Adding review for book:', bookId);
          promptReview(bookId); // Open prompt to add review
        });
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  });
}

// Function to prompt user for review and then add it
function promptReview(bookId) {
  const reviewText = prompt('Enter your review:');
  if (reviewText !== null && reviewText.trim() !== '') {
    addReview(bookId, reviewText);
  } else {
    alert('Review cannot be empty.');
  }
}
