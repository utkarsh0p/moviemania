const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Add back button functionality
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Load and display movies from localStorage
function loadMyList() {
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    const myListContainer = document.getElementById('myListContainer');

    if (myList.length === 0) {
        myListContainer.innerHTML = `
            <div class="empty-list">
                <i class="fas fa-film"></i>
                <p>Your list is empty</p>
                <p>Add movies to your list to see them here</p>
            </div>
        `;
        return;
    }

    myListContainer.innerHTML = myList.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-poster">
                <img src="${movie.poster_path 
                    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'}"
                    alt="${movie.title}"
                    loading="lazy">
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                <p class="movie-rating">
                    <i class="fas fa-star"></i>
                    ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
            </div>
        </div>
    `).join('');

    // Add click event listeners to movie cards
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.dataset.id;
            window.location.href = `movie-details.html?id=${movieId}`;
        });
    });
}

// Load the list when the page loads
loadMyList(); 