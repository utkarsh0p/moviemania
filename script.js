// Get DOM elements
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icons for both toggles
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        if (newTheme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        if (savedTheme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle menu icon
    const icon = menuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Show login modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    signupModal.style.display = 'none';
    // Close mobile menu if open
    navLinks.classList.remove('active');
});

// Show signup modal
signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
    loginModal.style.display = 'none';
    // Close mobile menu if open
    navLinks.classList.remove('active');
});

// Close modals when clicking the close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

// Switch between login and signup modals
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    // Here you would typically make an API call to your backend
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, show success message
    alert('Login successful!');
    loginModal.style.display = 'none';
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically make an API call to your backend
    console.log('Signup attempt:', { fullName, email, password });
    
    // For demo purposes, show success message
    alert('Account created successfully!');
    signupModal.style.display = 'none';
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
    }
});

// Genre filter functionality
const genreButtons = document.querySelectorAll('.genre-btn');
const movieGrid = document.getElementById('movie-grid');
const sectionTitle = document.getElementById('section-title');
let currentGenre = 'recommended';

// Sample movie data (replace with your actual API data)
const movies = {
    recommended: [
        { id: 27205, title: 'Inception', year: 2010, rating: 8.8, poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg' },
        { id: 155, title: 'The Dark Knight', year: 2008, rating: 9.0, poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg' },
        { id: 157336, title: 'Interstellar', year: 2014, rating: 8.6, poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 278, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg' },
        { id: 680, title: 'Pulp Fiction', year: 1994, rating: 8.9, poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 238, title: 'The Godfather', year: 1972, rating: 9.2, poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 550, title: 'Fight Club', year: 1999, rating: 8.8, poster: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 13, title: 'Forrest Gump', year: 1994, rating: 8.8, poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg' },
        { id: 603, title: 'The Matrix', year: 1999, rating: 8.7, poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 769, title: 'Goodfellas', year: 1990, rating: 8.7, poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' }
    ],
    action: [
        { id: 76341, title: 'Mad Max: Fury Road', year: 2015, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 245891, title: 'John Wick', year: 2014, rating: 7.4, poster: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg' },
        { id: 603, title: 'The Matrix', year: 1999, rating: 8.7, poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 94329, title: 'The Raid', year: 2011, rating: 7.6, poster: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 562, title: 'Die Hard', year: 1988, rating: 8.2, poster: 'https://m.media-amazon.com/images/M/MV5BZjRlZDIyNDItYjFiMS00NjQ1LWJkNGUtMDRjMDY0YzYwYjMxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 353081, title: 'Mission: Impossible - Fallout', year: 2018, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BNjRlZmM0ODktY2RjNS00ZDdjLWJhZGYtNDljNWZkMGM5MTg0XkEyXkFqcGdeQXVyNjAwMjI5MDk@._V1_.jpg' },
        { id: 218, title: 'The Terminator', year: 1984, rating: 8.0, poster: 'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 98, title: 'Gladiator', year: 2000, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 2501, title: 'The Bourne Identity', year: 2002, rating: 7.9, poster: 'https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg' },
        { id: 24, title: 'Kill Bill: Vol. 1', year: 2003, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' }
    ],
    suspense: [
        { id: 210577, title: 'Gone Girl', year: 2014, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_.jpg' },
        { id: 1124, title: 'The Prestige', year: 2006, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg' },
        { id: 11324, title: 'Shutter Island', year: 2010, rating: 8.2, poster: 'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 77, title: 'Memento', year: 2000, rating: 8.4, poster: 'https://m.media-amazon.com/images/M/MV5BYzc4ODgyZmYtMGFkZC00NGQyLWJiMDItMmRjMzQzM2M0YzY0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 966, title: 'The Sixth Sense', year: 1999, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMWM4NTFhYjctNzUyNi00NGMwLTk3NTYtMDIyNTZmMzRlYmQyXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg' },
        { id: 146233, title: 'Prisoners', year: 2013, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_.jpg' },
        { id: 629, title: 'The Usual Suspects', year: 1995, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLTVmNzktNDM2YTBkOTRlYjM@._V1_.jpg' },
        { id: 807, title: 'Se7en', year: 1995, rating: 8.6, poster: 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 194, title: 'Zodiac', year: 2007, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZWVmMjY0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 10437, title: 'The Game', year: 1997, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BZGVmMDJlOWUtYjE5MS00ZWNkLWE0ZTgtYzUxN2U3YzE5NTI5XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' }
    ],
    thriller: [
        { id: 807, title: 'Se7en', year: 1995, rating: 8.6, poster: 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 274, title: 'The Silence of the Lambs', year: 1991, rating: 8.6, poster: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 146233, title: 'Prisoners', year: 2013, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_.jpg' },
        { id: 194, title: 'Zodiac', year: 2007, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZWVmMjY0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 1422, title: 'The Departed', year: 2006, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg' },
        { id: 6977, title: 'No Country for Old Men', year: 2007, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_.jpg' },
        { id: 1124, title: 'The Prestige', year: 2006, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg' },
        { id: 77, title: 'Memento', year: 2000, rating: 8.4, poster: 'https://m.media-amazon.com/images/M/MV5BYzc4ODgyZmYtMGFkZC00NGQyLWJiMDItMmRjMzQzM2M0YzY0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 629, title: 'The Usual Suspects', year: 1995, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLTVmNzktNDM2YTBkOTRlYjM@._V1_.jpg' },
        { id: 210577, title: 'Gone Girl', year: 2014, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_.jpg' }
    ],
    drama: [
        { id: 238, title: 'The Godfather', year: 1972, rating: 9.2, poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 13, title: 'Forrest Gump', year: 1994, rating: 8.8, poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg' },
        { id: 37799, title: 'The Social Network', year: 2010, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { id: 278, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg' },
        { id: 769, title: 'Goodfellas', year: 1990, rating: 8.7, poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 240, title: 'The Godfather Part II', year: 1974, rating: 9.0, poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 424, title: 'Schindler\'s List', year: 1993, rating: 8.9, poster: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg' },
        { id: 497, title: 'The Green Mile', year: 1999, rating: 8.6, poster: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg' },
        { id: 1422, title: 'The Departed', year: 2006, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg' },
        { id: 244786, title: 'Whiplash', year: 2014, rating: 8.5, poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjUxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' }
    ],
    comedy: [
        { id: 18785, title: 'The Hangover', year: 2009, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg' },
        { id: 8363, title: 'Superbad', year: 2007, rating: 7.6, poster: 'https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg' },
        { id: 120467, title: 'The Grand Budapest Hotel', year: 2014, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_.jpg' },
        { id: 59967, title: 'Bridesmaids', year: 2011, rating: 6.8, poster: 'https://m.media-amazon.com/images/M/MV5BMjAyODU1Nzc4NV5BMl5BanBnXkFtZTcwNjQ2MjM0Nw@@._V1_.jpg' },
        { id: 1771, title: 'The 40-Year-Old Virgin', year: 2005, rating: 7.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTU2NTc1NDc2NF5BMl5BanBnXkFtZTYwMTM1Nzc3._V1_.jpg' },
        { id: 8699, title: 'Anchorman: The Legend of Ron Burgundy', year: 2004, rating: 7.2, poster: 'https://m.media-amazon.com/images/M/MV5BMTQyMTM3MTQxMl5BMl5BanBnXkFtZTcwOTI4NzUyMw@@._V1_.jpg' },
        { id: 10533, title: 'Step Brothers', year: 2008, rating: 6.9, poster: 'https://m.media-amazon.com/images/M/MV5BMTc4ODQ5NTM5OV5BMl5BanBnXkFtZTcwMzQ5MTY1MQ@@._V1_.jpg' },
        { id: 27581, title: 'The Other Guys', year: 2010, rating: 6.6, poster: 'https://m.media-amazon.com/images/M/MV5BMjIwMjU1Nzc4NV5BMl5BanBnXkFtZTcwNDg4Njk4Mw@@._V1_.jpg' },
        { id: 64688, title: '21 Jump Street', year: 2012, rating: 7.2, poster: 'https://m.media-amazon.com/images/M/MV5BNTZjNzRjMDMtZjY1Yy00MjM1LWI5NzQtMjM1YzEwN2Y1OTI5XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg' },
        { id: 296098, title: 'The Nice Guys', year: 2016, rating: 7.4, poster: 'https://m.media-amazon.com/images/M/MV5BODNlNmU4MGItMzQwZi00NGQyLWEyZWItYjFkNmI0NWI4NjBhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg' }
    ],
    horror: [
        { id: 419430, title: 'Get Out', year: 2017, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg' },
        { id: 479455, title: 'Hereditary', year: 2018, rating: 7.3, poster: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg' },
        { id: 694, title: 'The Shining', year: 1980, rating: 8.4, poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1YzBhZjRlNDE0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg' },
        { id: 955, title: 'The Exorcist', year: 1973, rating: 8.0, poster: 'https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtODY2ZDJjZDMzZjNlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg' },
        { id: 447332, title: 'A Quiet Place', year: 2018, rating: 7.5, poster: 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg' },
        { id: 138843, title: 'The Conjuring', year: 2013, rating: 7.5, poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMxOV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg' },
        { id: 270303, title: 'It Follows', year: 2014, rating: 6.8, poster: 'https://m.media-amazon.com/images/M/MV5BMjM4OTY2NDU2NV5BMl5BanBnXkFtZTgwNDYzNjU0MzE@._V1_.jpg' },
        { id: 242512, title: 'The Babadook', year: 2014, rating: 6.8, poster: 'https://m.media-amazon.com/images/M/MV5BMTk0NzMzMDA5NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_.jpg' },
        { id: 310131, title: 'The Witch', year: 2015, rating: 6.9, poster: 'https://m.media-amazon.com/images/M/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_.jpg' },
        { id: 512200, title: 'Midsommar', year: 2019, rating: 7.1, poster: 'https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTMxM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg' }
    ],
    romance: [
        { id: 11036, title: 'The Notebook', year: 2004, rating: 7.8, poster: 'https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg' },
        { id: 313369, title: 'La La Land', year: 2016, rating: 8.0, poster: 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg' },
        { id: 38, title: 'Eternal Sunshine of the Spotless Mind', year: 2004, rating: 8.3, poster: 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg' },
        { id: 73, title: 'Before Sunrise', year: 1995, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTQyMTM3MTQxMl5BMl5BanBnXkFtZTcwMDAzNjQ4Mg@@._V1_.jpg' },
        { id: 152601, title: 'Her', year: 2013, rating: 8.0, poster: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_.jpg' },
        { id: 19913, title: '500 Days of Summer', year: 2009, rating: 7.7, poster: 'https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_.jpg' },
        { id: 152, title: 'Amélie', year: 2001, rating: 8.3, poster: 'https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg' },
        { id: 59, title: 'Before Sunset', year: 2004, rating: 8.1, poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjAwNTM5Ml5BMl5BanBnXkFtZTYwNDM0MTc3._V1_.jpg' },
        { id: 152584, title: 'The Before Midnight', year: 2013, rating: 7.9, poster: 'https://m.media-amazon.com/images/M/MV5BMjA5NzgxODE2NF5BMl5BanBnXkFtZTcwNTI1NTI0OQ@@._V1_.jpg' },
        { id: 398818, title: 'Call Me by Your Name', year: 2017, rating: 7.9, poster: 'https://m.media-amazon.com/images/M/MV5BNDk3NTEwNjc0MV5BMl5BanBnXkFtZTgwNzQxNTIyMzI@._V1_.jpg' }
    ]
};

function displayMovies(genre) {
    // Clear current movies
    movieGrid.innerHTML = '';
    
    // Update section title
    sectionTitle.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;
    
    // Get movies for selected genre
    const genreMovies = movies[genre];
    
    // Create and append movie cards
    genreMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        // Create image element with loading state
        const img = new Image();
        img.src = movie.poster;
        img.alt = movie.title;
        
        // Add loading state
        movieCard.innerHTML = `
            <div class="movie-poster">
                <div class="loading-placeholder">Loading...</div>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-rating">
                    <i class="fas fa-star"></i>
                    ${movie.rating}
                </div>
            </div>
        `;
        
        // Handle image loading
        img.onload = function() {
            const posterDiv = movieCard.querySelector('.movie-poster');
            posterDiv.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
        };
        
        // Handle image error
        img.onerror = function() {
            const posterDiv = movieCard.querySelector('.movie-poster');
            posterDiv.innerHTML = `
                <img src="https://via.placeholder.com/500x750?text=No+Image+Available" 
                     alt="${movie.title}"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/500x750?text=Error+Loading+Image'">
            `;
        };

        // Add click event listener to navigate to movie details page
        movieCard.addEventListener('click', () => {
            window.location.href = `movie-details.html?id=${movie.id}`;
        });

        // Add cursor pointer style to indicate clickable
        movieCard.style.cursor = 'pointer';
        
        movieGrid.appendChild(movieCard);
    });
}

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    .loading-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #1a1a1a;
        color: #ffffff;
        font-size: 14px;
    }
    
    .movie-poster {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 35%;
        overflow: hidden;
        background-color: #1a1a1a;
        margin: 0;
        line-height: 0;
    }
    
    .movie-poster img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #1a1a1a;
        display: block;
        margin: 0;
        padding: 0;
    }

    .movie-card {
        background-color: #1a1a1a;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease;
        margin: 0;
        padding: 0;
        line-height: 0;
    }

    .movie-info {
        padding: 6px;
        background-color: #1a1a1a;
        line-height: normal;
    }

    .movie-info h3 {
        margin: 0;
        font-size: 0.8em;
    }

    .movie-year, .movie-rating {
        font-size: 0.7em;
        margin-top: 2px;
    }

    .movie-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 0;
        margin: 0;
    }

    @media screen and (max-width: 768px) {
        .movie-poster {
            padding-bottom: 20%;
        }

        .movie-info {
            padding: 3px;
        }

        .movie-info h3 {
            font-size: 0.7em;
        }

        .movie-year, .movie-rating {
            font-size: 0.6em;
            margin-top: 1px;
        }

        .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 10px;
        }
    }
`;
document.head.appendChild(style);

// Display recommended movies by default
displayMovies('recommended');

genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        genreButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update current genre
        currentGenre = button.dataset.genre;
        
        // Display movies for selected genre
        displayMovies(currentGenre);
    });
}); 