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
window.onload = zoeken;

function zoeken() {
  let zoekterm = document.getElementById('zoekterm').value.trim();
  let moviedetails = document.getElementById('moviedetails');

  moviedetails.innerHTML = "";

  if (zoekterm === "") {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
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

        if (data.total_pages > page) {
          nextPageButton.disabled = false;
        } else {
          nextPageButton.disabled = true;
        }
      })
      .catch(err => console.error(err));
  } else {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${zoekterm}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`)
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

        if (data.total_pages > page) {
          nextPageButton.disabled = false;
        } else {
          nextPageButton.disabled = true;
        }
      })
      .catch(err => console.error(err));
  }
}

function voegtoeaanlijst(title, id) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (!watchlist.some(movie => movie.id === id)) {
    watchlist.push({ title, id });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}

function displayWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
  watchlist.forEach(movie => {
    let i = 0;
    i++;
        console.log(i)
        console.log(movie.title);
  });
}
