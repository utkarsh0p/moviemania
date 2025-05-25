const TMDB_API_KEY = 'af3dd52cb25e9cce7d7b34140cf15005';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Add back button functionality
document.getElementById('backButton').addEventListener('click', () => {
    window.history.back();
});

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    loadMovieDetails(movieId);
}

async function loadMovieDetails(movieId) {
    try {
        // Fetch movie details
        const movieResponse = await fetch(
            `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const movieData = await movieResponse.json();

        // Fetch videos (trailers)
        const videosResponse = await fetch(
            `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const videosData = await videosResponse.json();

        // Fetch credits (cast & crew)
        const creditsResponse = await fetch(
            `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const creditsData = await creditsResponse.json();

        displayMovieDetails(movieData, videosData, creditsData);
    } catch (error) {
        console.error('Error loading movie details:', error);
    }
}

function displayMovieDetails(movie, videos, credits) {
    // Set movie title
    document.title = `${movie.title} - Movie Details`;
    document.getElementById('movieTitle').textContent = movie.title;

    // Set poster
    const posterPath = movie.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';
    document.getElementById('moviePoster').src = posterPath;

    // Set tagline
    document.getElementById('movieTagline').textContent = movie.tagline || '';

    // Set release date
    document.getElementById('movieReleaseDate').textContent = 
        `Release Date: ${movie.release_date || 'N/A'}`;

    // Set runtime
    document.getElementById('movieRuntime').textContent = 
        `Runtime: ${movie.runtime ? `${movie.runtime} minutes` : 'N/A'}`;

    // Set rating
    document.getElementById('movieRating').innerHTML = 
        `<i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`;

    // Set genres
    const genresContainer = document.getElementById('movieGenres');
    genresContainer.innerHTML = movie.genres
        .map(genre => `<span class="genre-tag">${genre.name}</span>`)
        .join('');

    // Set overview
    document.getElementById('movieOverview').textContent = movie.overview || 'No overview available.';

    // Handle Add to List button
    const addToListBtn = document.getElementById('addToListBtn');
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    const isInList = myList.some(item => item.id === movie.id);

    if (isInList) {
        addToListBtn.classList.add('added');
        addToListBtn.querySelector('.btn-text').textContent = 'Added to List';
    }

    addToListBtn.addEventListener('click', () => {
        const myList = JSON.parse(localStorage.getItem('myList') || '[]');
        const isInList = myList.some(item => item.id === movie.id);

        if (isInList) {
            // Remove from list
            const updatedList = myList.filter(item => item.id !== movie.id);
            localStorage.setItem('myList', JSON.stringify(updatedList));
            addToListBtn.classList.remove('added');
            addToListBtn.querySelector('.btn-text').textContent = 'Add to List';
        } else {
            // Add to list
            const movieToAdd = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average
            };
            myList.push(movieToAdd);
            localStorage.setItem('myList', JSON.stringify(myList));
            addToListBtn.classList.add('added');
            addToListBtn.querySelector('.btn-text').textContent = 'Added to List';
        }
    });

    // Display trailer
    const trailerContainer = document.getElementById('trailerContainer');
    const trailer = videos.results.find(video => video.type === 'Trailer');
    if (trailer) {
        trailerContainer.innerHTML = `
            <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/${trailer.key}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;
    } else {
        trailerContainer.innerHTML = '<p>No trailer available.</p>';
    }

    // Display cast
    const castContainer = document.getElementById('castContainer');
    const topCast = credits.cast.slice(0, 6); // Show top 6 cast members
    castContainer.innerHTML = topCast.map(person => `
        <div class="cast-card">
            <img src="${person.profile_path 
                ? `${TMDB_IMAGE_BASE_URL}${person.profile_path}`
                : 'https://via.placeholder.com/150x225?text=No+Image'}"
                alt="${person.name}"
                loading="lazy">
            <h3>${person.name}</h3>
            <p>${person.character}</p>
        </div>
    `).join('');
} 