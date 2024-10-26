const QUOTE_API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const quoteEle = document.getElementById('text');
const authorEle = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const bodyEle = document.body;

let quotes = [];
const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];


function generateRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

async function fetchQuotes() {
    const response = await fetch(QUOTE_API);
    const data = await response.json();
    return data.quotes;
}

const displayBackground = () => {
    const randomIndex = generateRandomIndex(colors.length);

    bodyEle.classList.add('hidden');

    setTimeout(() => {
        bodyEle.style = `--theme-color: ${colors[randomIndex]}`;
        bodyEle.classList.remove('hidden');
    }, 500);
}

const displayNewQuote = () => {
    quoteEle.classList.add('hidden');
    authorEle.classList.add('hidden');

    setTimeout(() => {
        const quoteData = quotes[generateRandomIndex(quotes.length)];
        quoteEle.innerText = quoteData.quote;
        authorEle.innerText = `- ${quoteData.author}`;

        quoteEle.classList.remove('hidden');
        authorEle.classList.remove('hidden');
    }, 500);
}

const run = async () => {
    quotes = await fetchQuotes();
    const randomIndex = generateRandomIndex(quotes.length);

    displayBackground();
    displayNewQuote();

    newQuoteBtn.addEventListener('click', () => {
        displayBackground();
        displayNewQuote();
    })
}

run()