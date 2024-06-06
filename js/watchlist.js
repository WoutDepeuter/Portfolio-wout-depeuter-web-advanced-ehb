// watchlist.js

window.onload = () => {
    displayWatchlist();

    function displayWatchlist() {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        let watchlistContainer = document.getElementById('watchlist');

        watchlistContainer.innerHTML = ""; 

        watchlist.forEach(movie => {
            let movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            let title = document.createElement('h3');
            title.textContent = movie.title;

            let image = document.createElement('img');
            image.alt = movie.title;

            let removeFromWatchlistButton = document.createElement('button');
            removeFromWatchlistButton.textContent = "Remove from watchlist";
            removeFromWatchlistButton.classList.add('small-button');
            removeFromWatchlistButton.addEventListener('click', () => {
                removeFromWatchlist(movie.id);
                displayWatchlist();
            });

            movieDiv.appendChild(title);
            movieDiv.appendChild(removeFromWatchlistButton);
            watchlistContainer.appendChild(movieDiv);
        });
    }

    function removeFromWatchlist(id) {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(movie => movie.id !== id);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
}