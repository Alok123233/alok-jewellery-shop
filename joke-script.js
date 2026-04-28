// joke-script.js

const jokeText = document.getElementById('joke-text');
const loadingSpinner = document.getElementById('loading');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const favoritesList = document.getElementById('favorites-list');
const clearFavoritesBtn = document.getElementById('clear-favorites');
const jokeTypeSelect = document.getElementById('joke-type');

// Fetch joke from JokeAPI
async function getJoke() {
    loadingSpinner.style.display = 'block';
    try {
        const type = jokeTypeSelect.value;
        const response = await fetch(`https://v2.jokeapi.dev/joke/${type}`);
        const data = await response.json();

        if (data.error) {
            throw new Error('API error');
        }

        jokeText.textContent = data.setup ? `${data.setup} - ${data.delivery}` : data.joke;
        saveFavorite(data.setup ? `${data.setup} - ${data.delivery}` : data.joke);
    } catch (error) {
        jokeText.textContent = 'Failed to fetch a joke.';
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

// Copy joke to clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(jokeText.textContent);
}

// Share joke via Web Share API
function shareJoke() {
    if (navigator.share) {
        navigator.share({
            title: 'Here’s a joke!',
            text: jokeText.textContent,
        });
    } else {
        alert('Sharing is not supported in this browser.');
    }
}

// Save favorite joke
function saveFavorite(joke) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(joke);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Display favorites
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = favorites.map(fave => `<li>${fave}</li>`).join('');
}

// Clear favorites
function clearFavorites() {
    localStorage.removeItem('favorites');
    displayFavorites();
}

// Event listeners
copyBtn.addEventListener('click', copyToClipboard);
shareBtn.addEventListener('click', shareJoke);
clearFavoritesBtn.addEventListener('click', clearFavorites);
jokeTypeSelect.addEventListener('change', getJoke);

// Initialize favorites display
displayFavorites();

// Initial joke fetch
getJoke();