const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=`;

export async function fetchBooks(query) {
  const response = await fetch(`${apiUrl}${query}&key=${apiKey}`);
  const data = await response.json();
  return data.items || [];
}

export async function fetchBookDetails(bookId) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
  const data = await response.json();
  return data;
}
