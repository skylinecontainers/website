async function fetchRSSFeed() {
	//const rssURL = 'https://globalmaritimehub.com/feed';
	//const rssURL = 'https://splash247.com/feed/';
	const rssURL = 'https://splash247.com/category/sector/containers/feed/';
	try {
		const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssURL)}`);
		const data = await response.json();
		if (data.status === 'ok') {
				displayNews(data.items);
		} else {
				console.error('Error fetching RSS feed:', data.message);
		}
	} catch (error) {
		console.error('Error fetching RSS feed:', error);
	}
}

function displayNews(items) {
	const newsItems = Array.from(items).map(item => {
		title = item.title.split(',')[0].trim();
		content = item.description.split('<p>')[1].split('</p>')[0].split('[')[0].substr(0, 185);
		return `<div class="news-item">
						<h3>${title}<h3>
            <p>${item.pubDate}</p>
            <p>${content}<a href="${item.link}" target="_blank">...Read more</a></p></div>`;
	});

	// Duplicate the news items to create a seamless loop
	const duplicatedNewsItems = newsItems.concat(newsItems);

	// Insert news items into the scroller
	//document.getElementById('news-scroller').innerHTML = duplicatedNewsItems.join('');
	document.getElementById('news-scroller').innerHTML = newsItems.join('');

	// Adjust animation duration based on the number of items
	const animationDuration = (newsItems.length * 3) + 's'; // Adjust timing dynamically
	document.getElementById('news-scroller').style.animationDuration = animationDuration;
}


