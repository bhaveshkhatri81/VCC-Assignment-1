const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4002;
const API_KEY = '7f98e0bad03d4ec4b99a667b97ef60de';

app.get('/news', async (req, res) => {
    const country = 'us';
    const category = 'general';

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`);
        const headlines = response.data.articles.map((article) => article.title).slice(0, 5);
        res.json({ response: `Top headlines: ${headlines.join(', ')}` });
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
});

app.listen(PORT, () => {
    console.log(`News Service running on http://10.22.0.141:${PORT}`);
});