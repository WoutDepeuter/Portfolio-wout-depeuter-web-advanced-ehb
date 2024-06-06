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
  pagenumber.textContent = page;
  zoeken();
});

let previousPageButton = document.getElementById('previous');
previousPageButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    pagenumber.textContent = page;
    zoeken();
  }
});

let pagenumber = document.getElementById('pagenumber');
pagenumber.textContent = page;

let searchButton = document.getElementById('zoekbutton');
searchButton.addEventListener('click', () => {
  page = 1;
  pagenumber.textContent = page;
  zoeken();
});

window.onload = () => {
  fetchGenres();
  zoeken();
};

const genreSelect = document.getElementById('genre');

function fetchGenres() {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  fetch(genreUrl, options)
    .then(response => response.json())
    .then(data => {
      data.genres.forEach(genre => {
        let option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
      });
    })
    .catch(err => console.error(err));
}

genreSelect.addEventListener('change', () => {
  page = 1;
  pagenumber.textContent = page;
  zoeken();
});

function zoeken() {
  let zoekterm = document.getElementById('zoekterm').value.trim();
  let selectedGenre = genreSelect.value;
  let moviedetails = document.getElementById('moviedetails');

  moviedetails.innerHTML = "";

  let url;
  if (zoekterm === "") {
    if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${selectedGenre}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    }
  } else {
    url = `https://api.themoviedb.org/3/search/movie?query=${zoekterm}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`;
    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }
  }

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      data.results.slice(0, 4).forEach(movie => {
        let { title, overview, poster_path, id } = movie;

        let movieDiv = document.createElement('div');
        movieDiv.classList.add('moviedetails');

        let titleElement = document.createElement('h2');
        titleElement.textContent = title;

        let posterElement = document.createElement('img');
        if (poster_path) {
          posterElement.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        } else {
          posterElement.src = 'https://via.placeholder.com/200x300?text=No+Image';
        }
        posterElement.alt = `${title} poster`;

        let addToWatchlistButton = document.createElement('button');
        addToWatchlistButton.textContent = "Add to watchlist";
        addToWatchlistButton.addEventListener('click', () => {
          addtoWatchlist(title, id);
          displayWatchlist();
        });

        movieDiv.appendChild(titleElement);
        movieDiv.appendChild(posterElement);
        movieDiv.appendChild(addToWatchlistButton);
        moviedetails.appendChild(movieDiv);
      });

      nextPageButton.disabled = data.total_pages <= page;
    })
    .catch(err => console.error(err));
}

function addtoWatchlist(title, id) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (!watchlist.some(movie => movie.id === id)) {
    watchlist.push({ title, id });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}

function displayWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  let watchlistContainer = document.getElementById('watchlist');
  
  watchlistContainer.innerHTML = ""; 

  watchlist.forEach(movie => {
    let watchlistElement = document.createElement('li');
    watchlistElement.textContent = movie.title;

    let removeFromWatchlistButton = document.createElement('button');
    removeFromWatchlistButton.textContent = "Remove from watchlist";
    removeFromWatchlistButton.classList.add('small-button');
    removeFromWatchlistButton.addEventListener('click', () => {
      removeFromWatchlist(movie.id);
      displayWatchlist();
    });

    watchlistElement.appendChild(removeFromWatchlistButton);
    watchlistContainer.appendChild(watchlistElement);
  });
}

function removeFromWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist = watchlist.filter(movie => movie.id !== id);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}