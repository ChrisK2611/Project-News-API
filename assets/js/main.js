const form = document.getElementById('search-form');
const keywordInput = document.getElementById('keyword-input');
const languageSelect = document.getElementById('language-select');
const resultsContainer = document.getElementById('results-container');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  searchNews();
});

async function searchNews() {
  const keyword = keywordInput.value;
  const language = languageSelect.value;

  const apiKey = 'DEIN_NEWSAPI_API_SCHLÜSSEL';
  const apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&language=${language}&apiKey=a06483a53c30445bb5cbc5bd05f5598e`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    displayResults(data.articles);
  } catch (error) {
    console.log('Fehler beim Abrufen der Daten:', error);
  }
}

function displayResults(articles) {
  resultsContainer.innerHTML = '';

  if (articles.length === 0) {
    resultsContainer.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
    return;
  }

  articles.forEach(function(article) {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const titleElement = document.createElement('h2');
    titleElement.textContent = article.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description;

    const sourceElement = document.createElement('p');
    sourceElement.innerHTML = `Quelle: <a href="${article.url}" target="_blank">${article.source.name}</a>`;

    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(sourceElement);

    resultsContainer.appendChild(articleElement);
  });
}
