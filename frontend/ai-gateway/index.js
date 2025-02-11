// const express = require('express');
// const axios = require('axios');

// const app = express();
// app.use(express.json());

// const PORT = 3000;

// // Route: Process user query
// app.post('/process', async (req, res) => {
//     const { query } = req.body;

//     if (query.toLowerCase().includes('weather')) {
//         // Forward to weather service
//         const location = query.split('in')[1]?.trim() || 'London'; // Extract location
//         try {
//             const weatherResponse = await axios.get(`http://10.22.0.141:4000/weather/${location}`);
//             res.json({ response: weatherResponse.data.response });
//         } catch (error) {
//             res.status(500).send('Error fetching weather data');
//         }
//     } else if (query.toLowerCase().includes('fact')) {
//         // Forward to fun fact service
//         try {
//             const factResponse = await axios.get('http://10.22.0.141:4001/fun-fact');
//             res.json({ response: factResponse.data.response });
//         } catch (error) {
//             res.status(500).send('Error fetching the fun fact');
//         }
//     } else {
//         res.json({ response: "I didn't understand that. Try asking for the weather or a fun fact!" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`AI Gateway running on http://10.22.0.142:${PORT}`);
// });


const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./query_logs.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT,
    service TEXT,
    response TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);`);

// Function to log queries
function logQuery(query, service, response) {
    db.run(
        `INSERT INTO logs (query, service, response) VALUES (?, ?, ?)`,
        [query, service, JSON.stringify(response)],
        function (err) {
            if (err) console.error(err.message);
        }
    );
}

// Route: Process User Query
app.post('/process', async (req, res) => {
    const { query } = req.body;

    try {
        let result = "I didn't understand that. Try asking for the weather, news, jokes, or currency conversion!";
        let service = 'none';

        if (query.toLowerCase().includes('weather')) {
            const location = query.split('in')[1]?.trim() || 'London';
            const response = await axios.get(`http://10.22.0.141:4000/weather/${location}`);
            result = response.data.response;
            service = 'Weather';
        } else if (query.toLowerCase().includes('fact')) {
            const response = await axios.get('http://10.22.0.141:4001/fun-fact');
            result = response.data.response;
            service = 'Fun Fact';
        } else if (query.toLowerCase().includes('news')) {
            const response = await axios.get('http://10.22.0.141:4002/news');
            result = response.data.response;
            service = 'News';
        } else if (query.toLowerCase().includes('joke')) {
            const response = await axios.get('http://10.22.0.141:4003/joke');
            result = response.data.joke;
            service = 'Joke';
        } else if (query.toLowerCase().includes('currency')) {
            const parts = query.toLowerCase().match(/currency from ([a-z]{3}) to ([a-z]{3})/);
            if (parts && parts[1] && parts[2]) {
                const response = await axios.get(`http://10.22.0.141:4004/convert?from=${parts[1]}&to=${parts[2]}&amount=1`);
                result = response.data.response;
                service = 'Currency Conversion';
            }
        }

        // Log to SQLite
        logQuery(query, service, result);

        res.json({ response: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('An error occurred while processing your query.');
    }
});

app.listen(PORT, () => {
    console.log(`AI Gateway running on http://10.22.0.142:${PORT}`);
});