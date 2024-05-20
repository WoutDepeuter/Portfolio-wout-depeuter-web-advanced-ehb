const apiKey = "124fc5f3eef56fb6ecd4aa7b002f3a1e";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};

let page = 1;

let nextPageButton = document.getElementById('next');
nextPageButton.addEventListener('click', () => {
  page++;
  pagenumber.textContent = page; // Update the displayed page number
  zoeken(); // Call the search function to load the next page
});

let previousPageButton = document.getElementById('previous');
previousPageButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    pagenumber.textContent = page; // Update the displayed page number
    zoeken(); // Call the search function to load the previous page
  }
});

let pagenumber = document.getElementById('pagenumber');
pagenumber.textContent = page;

let searchButton = document.getElementById('zoekbutton');
searchButton.addEventListener('click', () => {
  page = 1; // Reset to first page on new search
  pagenumber.textContent = page; // Update the displayed page number
  zoeken();
});

function zoeken() {
  let zoekterm = document.getElementById('zoekterm').value;
  let moviedetails = document.getElementById('moviedetails');

  moviedetails.innerHTML = ""; // Clear previous results

  // Modify the API request URL to include pagination
  fetch(`https://api.themoviedb.org/3/search/movie?query=${zoekterm}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      data.results.slice(0, 4).forEach(movie => { // Limit to the first 4 results
        let { title, overview, poster_path, id } = movie;

        // Create div element for movie
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('moviedetails');

        // Create elements for movie details
        let titleElement = document.createElement('h2');
        titleElement.textContent = title;

        let overviewElement = document.createElement('p');
        overviewElement.textContent = overview;

        let posterElement = document.createElement('img');
        posterElement.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        posterElement.alt = `${title} poster`;

        let addToWatchlistButton = document.createElement('button');
        addToWatchlistButton.textContent = "Add to watchlist";
        addToWatchlistButton.addEventListener('click', () => {
          addtoWatchlist(title, id); 
          displayWatchlist(); // Update watchlist display after adding a movie
        });

        // Append elements to movieDiv
        movieDiv.appendChild(titleElement);
        movieDiv.appendChild(overviewElement);
        movieDiv.appendChild(posterElement);

        movieDiv.appendChild(addToWatchlistButton);

        moviedetails.appendChild(movieDiv);
      });

      // If there are more results available, enable next page button
      if (data.total_pages > page) {
        nextPageButton.disabled = false;
      } else {
        nextPageButton.disabled = true;
      }
    })
    .catch(err => console.error(err));
}

addtoWatchlist = (title, id) => {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (!watchlist.some(movie => movie.id === id)) {
    watchlist.push({ title, id });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}
displayWatchlist = () => {
}
