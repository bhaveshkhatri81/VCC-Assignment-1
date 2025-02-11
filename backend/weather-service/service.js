const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4000;
const API_KEY = '14534a5872a74481a2d8554f9132a69c';

app.get('/weather/:location', async (req, res) => {
    const location = req.params.location;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        const weather = response.data;
        res.json({ response: `The weather in ${location} is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C.` });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Weather service running on http://10.22.0.141:${PORT}`);
});