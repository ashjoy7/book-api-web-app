// reviews.mjs
import { fetchBookDetails } from './api.mjs';
import { loadFavorites } from './favorites.mjs';
import { loadGenres } from './genres.mjs';

export async function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  
  // Fetch book details for each review
  const reviewsWithBookDetails = await Promise.all(reviews.map(async (review) => {
    const bookDetails = await fetchBookDetails(review.bookId);
    return {
      ...review,
      bookTitle: bookDetails.volumeInfo.title || 'Unknown Title',
      bookAuthor: bookDetails.volumeInfo.authors ? bookDetails.volumeInfo.authors.join(', ') : 'Unknown Author'
    };
  }));

  document.getElementById('main-content').innerHTML = `
    <h1>Reviews</h1>
    ${reviewsWithBookDetails.length > 0 ? reviewsWithBookDetails.map(review => `
      <div class="card" data-id="${review.id}">
        <h2>${review.bookTitle}</h2>
        <p>Author: ${review.bookAuthor}</p>
        <p>Review: ${review.text || 'No review text available'}</p>
        <button class="edit-review-button" data-id="${review.id}">Edit</button>
        <button class="delete-review-button" data-id="${review.id}">Delete</button>
        <button class="add-favorite-button" data-id="${review.bookId}">Add to Favorites</button>
      </div>
    `).join('') : '<p>No reviews yet.</p>'}
  `;

  document.querySelectorAll('.edit-review-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const reviewId = event.target.getAttribute('data-id');
      editReview(reviewId);
    });
  });

  document.querySelectorAll('.delete-review-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const reviewId = event.target.getAttribute('data-id');
      deleteReview(reviewId);
    });
  });

  document.querySelectorAll('.add-favorite-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-id');
      addFavorite(bookId);
    });
  });
}

export async function addReview(bookId, text) {
  try {
    console.log('Fetching book details for ID:', bookId); // Debugging line
    const bookDetails = await fetchBookDetails(bookId);

    if (!bookDetails || !bookDetails.volumeInfo) {
      console.error('Failed to fetch book details or missing volumeInfo');
      alert('Failed to fetch book details. Review could not be added.');
      return;
    }

    const title = bookDetails.volumeInfo.title || 'Unknown Title';

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const newReview = {
      id: Date.now().toString(), // Generates a unique ID based on current timestamp
      bookId,
      text,
      bookTitle: title
    };
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert('Review added!');
    loadReviews(); // Refresh reviews view
  } catch (error) {
    console.error('Failed to add review:', error);
  }
}

function editReview(reviewId) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const review = reviews.find(r => r.id === reviewId);

  if (review) {
    const newText = prompt('Edit your review:', review.text);
    if (newText !== null) {
      review.text = newText;
      localStorage.setItem('reviews', JSON.stringify(reviews));
      alert('Review updated!');
      loadReviews(); // Refresh reviews view
    }
  } else {
    alert('Review not found!');
  }
}

function deleteReview(reviewId) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews = reviews.filter(r => r.id !== reviewId);

  // Optional: Clean up any reviews with undefined book IDs
  reviews = reviews.filter(r => r.bookId && r.bookId.trim() !== '');

  localStorage.setItem('reviews', JSON.stringify(reviews));
  alert('Review deleted!');
  loadReviews(); // Refresh reviews view
}

async function addFavorite(bookId) {
  try {
    const book = await fetchBookDetails(bookId);
    if (book) {
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
        loadGenres(); // Refresh genres view
      } else {
        alert('Book is already in favorites!');
      }
    }
  } catch (error) {
    console.error('Failed to add favorite:', error);
  }
}
