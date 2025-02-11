const express = require('express');

const app = express();
const PORT = 4001;

const facts = [
    "Honey never spoils.",
    "Octopuses have three hearts.",
    "Bananas are berries, but strawberries aren't.",
    "A group of flamingos is called a 'flamboyance'.",
];

app.get('/fun-fact', (req, res) => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.json({ response: `Did you know? ${randomFact}` });
});

app.listen(PORT, () => {
    console.log(`Fun Fact service running on http://10.22.0.141:${PORT}`);
});