
# Portfolio: Wout

## app.js

Gebruik van de TMDB APi [documentatie](https://developer.themoviedb.org/reference/intro/getting-started)
pagina om dingen aan de watchlist toetevoegen en te zoeken op genre en title anders toont het meest populaire films 

### Gebruikte functies

#### Elementen geselecteerd

```javascript
let nextPageButton = document.getElementById('next');
let previousPageButton = document.getElementById('previous');
let pagenumber = document.getElementById('pagenumber');
let searchButton = document.getElementById('zoekbutton');
let genreSelect = document.getElementById('genre');
let moviedetails = document.getElementById('moviedetails');
```

### Elementen manipuleren

```javascript
moviedetails.innerHTML = "";
posterElement.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
addToWatchlistButton.textContent = "Add to watchlist";
```

### Events koppelen

```javascript
nextPageButton.addEventListener('click', () => {
    page++;
    pagenumber.textContent = page;
    zoeken();
});
```
### Form Validation
```javascript
let zoekterm = document.getElementById('zoekterm').value.trim();
if (zoekterm === "") {
    // Handle empty search term
}
```
### Constants 
```javascript
const apiKey = "124fc5f3eef56fb6ecd4aa7b002f3a1e";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};
```
### Template Literals
```javascript
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
```
### Destructuring
```javascript
let { title, overview, poster_path, id } = movie;
```
### Spread & Rest Operator
```javascript
// Spread operator
watchlist.push({ title, id, watched: false });
```
### Iteration
```javascript
// Iteration
data.results.slice(0, 4).forEach(movie => {
    // Code inside forEach loop
});
```
### Arrow Functions
```javascript
// Arrow function
searchButton.addEventListener('click', () => {
    // Code inside arrow function
});
```
### Callback Function
```javascript
// Callback function
addToWatchlistButton.addEventListener('click', () => {
    addtoWatchlist(title, id);
    displayWatchlist();
});
```
### Promise
```javascript
// Promise
try {
    const response = await fetch(genreUrl, options);
    const data = await response.json();
} catch (err) {
    console.error(err);
}
```
### Async & Await
```javascript
// Async & Await
window.onload = async () => {
    await fetchGenres();
    await zoeken();
};
```
### Self-Executing Function
```javascript
(async () => {
    await fetchGenres();
    await zoeken();
})();
```
### Fetch for Data Retrieval
```javascript
const response = await fetch(url, options);
const data = await response.json();
```
### JSON manipuleren en weergeven
```javascript
data.genres.forEach(genre => {
    // Code inside forEach loop
});
```
### LocalStorage
```javascript
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
localStorage.setItem('watchlist', JSON.stringify(watchlist));
```

## watchlist.js
toon,t wat er op de watchlist staat

- **Elementen selecteren:**
  ```javascript
  let watchlistContainer = document.getElementById('watchlist');
  ```

- **Elementen manipuleren:**
  ```javascript
  watchlistContainer.innerHTML = "";
  ```

- **Event aan een element koppelen:**
  ```javascript
  removeFromWatchlistButton.addEventListener('click', () => {
      removeFromWatchlist(movie.id);
      displayWatchlist();
  });
  ```

- **Iteration over een array:**
  ```javascript
  watchlist.forEach(movie => { /* code */ });
  ```

- **Arrow function:**
  ```javascript
  window.onload = () => { /* code */ };
  ```

- **JSON manipuleren en weergeven:**
  ```javascript
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  ```

- **Gebruik van LocalStorage:**
  ```javascript
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  ```
## login.js

- **Elementen selecteren:** 
  ```javascript
  let registerBtn = document.getElementById('register');
  let loginBtn = document.getElementById('login');
  ```

- **Elementen manipuleren:**
  ```javascript
  usernameError.innerHTML = "";
  passwordError.innerHTML = "";
  ```

- **Event aan een element koppelen:**
  ```javascript
  registerBtn.addEventListener('click', registerHandler);
  loginBtn.addEventListener('click', loginHandler);
  ```

- **Formulier valideren:**
  ```javascript
  if (userExists) {
      usernameError.innerHTML = "Username bestaat al";
  } else {
      // Registration process
  }
  ```

- **Gebruiken van een constante:**
  ```javascript
  const registrationInfo = JSON.parse(storedRegistrationInfo);
  ```

- **Gebruiken van template literals:**
  ```javascript
  console.log("Login gelukt");
  ```

- **Destructuring:**
  ```javascript
  const { users } = registrationInfo;
  ```

- **Spread & Rest operator:**
  ```javascript
  let newUser = {
      username: username,
      password: password
  };
  ```

- **Iteration over een array:**
  ```javascript
  let user = users.find(user => user.username === username && user.password === password);
  ```

- **Arrow function:**
  ```javascript
  registerBtn.addEventListener('click', registerHandler);
  loginBtn.addEventListener('click', loginHandler);
  ```

- **Callback function:**
  ```javascript
  users.some(user => user.username === username);
  ```

- **JSON manipuleren en weergeven:**
  ```javascript
  const registrationInfo = JSON.parse(storedRegistrationInfo);
  ```

- **Gebruik van LocalStorage:**
  ```javascript
  localStorage.setItem('registrationInfo', JSON.stringify({ users: users }));
  ```

## quotes.js

Here are the examples of the listed concepts found in the provided `fetch` code:

- **Fetch om data op te halen:**
  ```javascript
  fetch('js/quotes.json')
      .then(response => response.json())
      .then(data => { /* code */ })
      .catch(error => console.error('Error fetching quotes:', error));
  ```

- **JSON manipuleren en weergeven:**
  ```javascript
  const quotes = data.quotes;
  ```

- **Iteration over een array:**
  ```javascript
  const randomIndex = Math.floor(Math.random() * quotes.length);
  ```

- **Gebruik van template literals:**
  ```javascript
  quoteAuthor.textContent = `- ${randomQuote.author}`;
  ```

  ## voorbeeld css animatie en grid en flexbox


```css
/* Keyframes */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Watchlist */
#watchlist {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* Movie */
.movie {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

/* Quote Box */
.quote-box {
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Quote Text */
.quote-text {
    font-size: 24px;
    margin-bottom: 10px;
}

/* Quote Author */
.quote-author {
    font-style: italic;
    font-size: 18px;
}
```
# gebruikte bronnen

[localStorage.setItem() Method](https://www.w3schools.com/jsref/met_storage_setitem.asp)

[CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp#gsc.tab=0)

[CSS Animations](https://www.w3schools.com/css/css3_animations.asp)

[Fetch API](https://www.w3schools.com/jsref/api_fetch.asp)

[Async JavaScript](https://www.w3schools.com/js/js_async.asp)
[conversatie met chatgpt over css](https://chatgpt.com/share/8b2388f0-4eee-4dff-a377-5ddb92d10e8b)
## cursus canvas

