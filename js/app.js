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
fetch(`https://api.themoviedb.org/3/search/movie?query=blade runner&include_adult=false&language=en-US&page=1&api_key=${apiKey}`, options)
  .then(response => response.json())
  .then(data => {
    let moviedetails = document.getElementById('moviedetails');
    for (let i = 0; i < data.results.length; i++) {
      let movie = data.results[i];
      let movietitle = movie.title;
      let movieoverview = movie.overview;
      let posterPath = movie.poster_path;

      // Create div element for movie
      let movieDiv = document.createElement('div');
      movieDiv.classList.add('moviedetails');
      
      // Create elements for movie details
      let titleElement = document.createElement('h2');
      titleElement.textContent = movietitle;
      
      let overviewElement = document.createElement('p');
      overviewElement.textContent = movieoverview;
      
      let posterElement = document.createElement('img');
      posterElement.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
      posterElement.alt = `${movietitle} poster`;

      // Append elements to movieDiv
      movieDiv.appendChild(titleElement);
      movieDiv.appendChild(overviewElement);
      movieDiv.appendChild(posterElement);

  
      moviedetails.appendChild(movieDiv);
    }
  })
  .catch(err => console.error(err));
