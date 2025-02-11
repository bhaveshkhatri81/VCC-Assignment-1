const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4003;

app.get('/joke', async (req, res) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = `${response.data.setup} - ${response.data.punchline}`;
        res.json({ joke });
    } catch (error) {
        res.status(500).send('Error fetching joke');
    }
});

app.listen(PORT, () => {
    console.log(`Joke Service running on http://10.22.0.141:${PORT}`);
});