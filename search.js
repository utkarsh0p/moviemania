const TMDB_API_KEY = 'af3dd52cb25e9cce7d7b34140cf15005';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchPageInput = document.getElementById('searchInput');
const searchPageButton = document.querySelector('.search-bar button');
const searchPageResults = document.getElementById('searchResults');

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('query');

if (searchQuery) {
    searchPageInput.value = searchQuery;
    performSearch(searchQuery);
}

searchPageButton.addEventListener('click', () => {
    const query = searchPageInput.value.trim();
    if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
});

searchPageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchPageInput.value.trim();
        if (query) {
            window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
    }
});

// Add back button functionality
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

async function performSearch(query) {
    try {
        searchPageResults.innerHTML = '<div class="loading">Loading...</div>';
        
        const response = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            searchPageResults.innerHTML = '<p class="no-results">No results found. Try a different search term.</p>';
            return;
        }
        
        displayResults(data.results);
    } catch (error) {
        console.error('Error searching movies:', error);
        searchPageResults.innerHTML = `
            <div class="error-message">
                <p>An error occurred while searching. Please try again later.</p>
            </div>
        `;
    }
}

function displayResults(movies) {
    searchPageResults.innerHTML = '';

    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'movie-grid';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        const posterPath = movie.poster_path 
            ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Poster';

        movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${posterPath}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                <p class="movie-rating">
                    <i class="fas fa-star"></i>
                    ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
            </div>
        `;

        // Add click event to navigate to movie details
        movieCard.addEventListener('click', () => {
            window.location.href = `movie-details.html?id=${movie.id}`;
        });

        resultsGrid.appendChild(movieCard);
    });

    searchPageResults.appendChild(resultsGrid);
} 