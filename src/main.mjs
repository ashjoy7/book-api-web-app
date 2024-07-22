import { loadHome } from './modules.mjs';

function setupNavigation() {
  document.getElementById('home-link').addEventListener('click', () => {
    loadHome();
  });

  document.getElementById('favorites-link').addEventListener('click', () => {
    import('./modules.mjs').then(module => module.loadFavorites());
  });

  // Add event listeners for genres and reviews
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  loadHome(); // Load the home view by default
});
