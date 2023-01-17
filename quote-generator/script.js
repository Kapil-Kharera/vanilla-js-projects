const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loading = document.getElementById("loader");

let apiQuotes;

//show loader
function showLoader() {
    loading.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function hideLoader() {
    loading.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function newQuote() {
    showLoader();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = quote.author;
    }
    
    //check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    hideLoader();
}


// Get Quotes from API
async function getQuotes() {
    showLoader();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json(); 
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
