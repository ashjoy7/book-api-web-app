// main.mjs
function setupNavigation() {
    console.log('Setting up navigation...');
  
    document.getElementById('home-link').addEventListener('click', () => {
      console.log('Home link clicked');
      import('./search.mjs').then(module => {
        console.log('Loading home module');
        module.loadHome();
      }).catch(err => console.error('Error loading search module:', err));
    });
  
    document.getElementById('favorites-link').addEventListener('click', () => {
      console.log('Favorites link clicked');
      import('./favorites.mjs').then(module => {
        console.log('Loading favorites module');
        module.loadFavorites();
      }).catch(err => console.error('Error loading favorites module:', err));
    });
  
    document.getElementById('genres-link').addEventListener('click', () => {
      console.log('Genres link clicked');
      import('./genres.mjs').then(module => {
        console.log('Loading genres module');
        module.loadGenres();
      }).catch(err => console.error('Error loading genres module:', err));
    });
  
    document.getElementById('reviews-link').addEventListener('click', () => {
      console.log('Reviews link clicked');
      import('./reviews.mjs').then(module => {
        console.log('Loading reviews module');
        module.loadReviews();
      }).catch(err => console.error('Error loading reviews module:', err));
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, loading home view');
    import('./search.mjs').then(module => {
      console.log('Loading home view from search module');
      module.loadHome(); // Load the home view by default
    }).catch(err => console.error('Error loading search module:', err));
  
    setupNavigation();
  });
  
