document.addEventListener('DOMContentLoaded', function () {
    // Api key to authorize access to the api.
    const apiKey = 'eXWyCSjiJTQ7WcGA0MMRChhK5qip3OAb';
    // creating variables to get the elements from the html.
    const searchBtn = document.getElementById('searchBtn');
    const sectionSelect = document.getElementById('section');
    const articlesContainer = document.getElementById('articles');
    // adding an event listner to the button.
    searchBtn.addEventListener('click', function () {
        const selectedSection = sectionSelect.value;
        fetchArticles(selectedSection);
    });
    // requesting data from the api to pass it to the display functions.
    function fetchArticles(section) {
        fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`).then(response => response.json())
        .then(data => {
            displayArticles(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    // displays the result fetched from the api to display on the website page.
    function displayArticles(articles) {
        // Clears previous articles.
        articlesContainer.innerHTML = ''; 

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];

            const articleElem = document.createElement('div');
            articleElem.classList.add('article');

            const img = document.createElement('img');
            if (article.multimedia.length > 0) {
                img.src = article.multimedia[0].url;
            } else {
                // If no image available, it uses a placeholder image.
                img.src = 'https://via.placeholder.com/300';
            }

            const content = document.createElement('div');
            content.classList.add('content');

            const title = document.createElement('h2');
            title.textContent = article.title;

            const abstract = document.createElement('p');
            abstract.textContent = article.abstract;
            // Appending elements to their parent elements.
            content.appendChild(title);
            content.appendChild(abstract);

            articleElem.appendChild(img);
            articleElem.appendChild(content);

            articlesContainer.appendChild(articleElem);
        }
    }
});
