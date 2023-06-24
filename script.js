function fetchNews() {
    fetch('http://localhost:3000/news')
        .then(response => response.json())
        .then(data => {
            // Clear the news container
            const newsContainer = document.getElementById('newsContainer');
            newsContainer.innerHTML = '';

            // For each news item...
            data.articles.forEach(article => {
                // Create a link to the news source
                const link = document.createElement('a');
                link.href = article.link; // Changed 'url' to 'link' based on Newscatcher API documentation
                link.className = 'newsLink';

                // Create a div for the news item
                const newsItem = document.createElement('div');
                newsItem.className = 'newsItem';

                // Extract source from title
                const titleParts = article.title.split(" - ");
                const originalSource = titleParts.length > 1 ? titleParts[titleParts.length - 1] : "Unknown";

                // Removing source from the title
                const cleanedTitle = titleParts.length > 1 ? titleParts.slice(0, -1).join(" - ") : article.title;

                // Create a div for source container
                const sourceContainer = document.createElement('div');
                sourceContainer.className = 'sourceContainer';

                // Create an img element for the favicon
                const favicon = document.createElement('img');
                favicon.src = `https://www.google.com/s2/favicons?domain=${article.clean_url}`; // Changed 'originalSource' to 'media' based on Newscatcher API documentation
                favicon.alt = `${article.clean_url} Favicon`;
                sourceContainer.appendChild(favicon);


                // Create a paragraph for the news source
                const source = document.createElement('p');
                source.textContent = article.clean_url;
                sourceContainer.appendChild(source);

                // Calculate the hours since publication
                const now = new Date();
                const publishedAt = new Date(article.published_date); // Changed 'published' to 'published_date' based on Newscatcher API documentation
                const hoursSincePublication = Math.abs(Math.round((now.getTime() - publishedAt.getTime()) / 1000 / 60 / 60));

                // Create a paragraph for the publication time
                const time = document.createElement('p');
                time.textContent = `${hoursSincePublication} h`;
                sourceContainer.appendChild(time);

                newsItem.appendChild(sourceContainer);

                // Create a heading for the news title
                const title = document.createElement('h2');
                title.textContent = cleanedTitle;
                newsItem.appendChild(title);

                // Append news item to the link
                link.appendChild(newsItem);

                // Add the news item to the news container
                newsContainer.appendChild(link);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Fetch news when the page loads
fetchNews();

// Fetch news when the user scrolls to the top of the page
window.onscroll = function() {
    if (window.pageYOffset === 0) {
        fetchNews();
    }
};

