const apiKey = "124fc5f3eef56fb6ecd4aa7b002f3a1e";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};
let movietitle = document.getElementById('movietitle');
let movieoverview = document.getElementById('movieoverview');
let poster = document.getElementById('poster');

// fetch(`https://api.themoviedb.org/3/search/movie?query=blade runner&include_adult=false&language=en-US&page=1&api_key=${apiKey}`, options)
//   .then(response => response.json())
//   .then(data => {
//     for(i = 0; i < data.results.length; i++) 
//     {
//       let movie = data.results[i];
//       let title = movie.title;
//       let overview = movie.overview;
//       let posterPath = movie.poster_path;
//       movietitle.innerHTML = title;
//       movieoverview.innerHTML = overview;
//       poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${posterPath}" alt="${title} poster" />`;
//     }
// //   })
//   .catch(err => console.error(err));
let button = document.getElementById('zoekbutton');
button.addEventListener('click', zoeken);


function zoeken() {
  let zoekterm = document.getElementById('zoekterm').value;
moviedetails.innerHTML = "";
let aantal = document.getElementById('aantal').value;

fetch(`https://api.themoviedb.org/3/search/movie?query=${zoekterm}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`, options)
  .then(response => response.json())
  .then(data => {
    let moviedetails = document.getElementById('moviedetails');
    for (let i = 0; i < aantal; i++) {
      let movie = data.results[i];
      let movietitle = movie.title;
      let movieoverview = movie.overview;
      let posterPath = movie.poster_path;
      let runtime = movie.runtime;
      let id = movie.id;


      // Create div element for movie
      let movieDiv = document.createElement('div');
      movieDiv.classList.add('moviedetails');
      
      // Create elements for movie details
      let titleElement = document.createElement('h2');
      titleElement.id = "title";
      titleElement.textContent = movietitle;
      
      
      let overviewElement = document.createElement('p');
      overviewElement.textContent = movieoverview;
      
      let posterElement = document.createElement('img');
      posterElement.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
      posterElement.alt = `${movietitle} poster`;
      
      let idElement = document.createElement('h3');
      idElement.textContent = id;


      let button = document.createElement('button');
      button.textContent = "Add to watchlist";
      button.id = "addtowatchlist";
      button.addEventListener('click', addtoWatchlist);
     
      

      // Append elements to movieDiv
      movieDiv.appendChild(titleElement);
    
      movieDiv.appendChild(overviewElement);
      movieDiv.appendChild(posterElement);
      movieDiv.appendChild(idElement);
      movieDiv.appendChild(button);

  
      moviedetails.appendChild(movieDiv);
    }
  })
  .catch(err => console.error(err));
  }



  function addtoWatchlist() {
    let title = this.parentElement.querySelector('h2').textContent;
    let id = this.parentElement.querySelector('h3').textContent;

    console.log("title: " + title);
    console.log("id: " + id);

    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    let watchmovie = {
        title: title,
        id: id
    };
    watchlist.push(watchmovie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}
