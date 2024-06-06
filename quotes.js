fetch('quotes.json')
            .then(response => response.json())
            .then(data => {
               
                const quotes = data.quotes;
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];

   
                const quoteText = document.getElementById('quote-text');
                const quoteAuthor = document.getElementById('quote-author');

                quoteText.textContent = randomQuote.text;
                quoteAuthor.textContent = `- ${randomQuote.author}`;
            })
            .catch(error => console.error('Error fetching quotes:', error));