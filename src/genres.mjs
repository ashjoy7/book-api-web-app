import { fetchBookDetails } from './api.mjs';

export async function loadGenres() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // Fetch book details for favorites and reviews
  const allBooks = await Promise.all([
    ...favorites.map(async (book) => {
      const bookDetails = await fetchBookDetails(book.id);
      return {
        id: book.id,
        title: bookDetails.volumeInfo.title || 'Unknown Title',
        author: bookDetails.volumeInfo.authors ? bookDetails.volumeInfo.authors.join(', ') : 'Unknown Author',
        genre: await getBookGenre(book.id),
      };
    }),
    ...reviews.map(async (review) => {
      const bookDetails = await fetchBookDetails(review.bookId);
      return {
        id: review.bookId,
        title: bookDetails.volumeInfo.title || 'Unknown Title',
        author: bookDetails.volumeInfo.authors ? bookDetails.volumeInfo.authors.join(', ') : 'Unknown Author',
        genre: await getBookGenre(review.bookId),
      };
    }),
  ]);

  // Organize books by genre
  const genres = allBooks.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
  }, {});

  // Display genres and books
  document.getElementById('main-content').innerHTML = `
    <h1>Genres</h1>
    ${Object.keys(genres).map(genre => `
      <h2>${genre}</h2>
      ${genres[genre].map(book => `
        <div class="card">
          <h2>${book.title}</h2>
          <p>Author: ${book.author}</p>
        </div>
      `).join('')}
    `).join('')}
  `;
}

async function getBookGenre(bookId) {
  try {
    const bookDetails = await fetchBookDetails(bookId);
    const categories = bookDetails.volumeInfo.categories || [];
    return categories.length > 0 ? categories[0] : 'Unknown Genre'; 
  } catch (error) {
    console.error('Failed to fetch book genre:', error);
    return 'Unknown Genre';
  }
}
