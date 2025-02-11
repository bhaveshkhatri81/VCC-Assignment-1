const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4004;
const API_KEY = 'd57d8c5e75404931a4b8770b';
app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
        const convertedAmount = response.data.conversion_result;
        res.json({ response: `The converted amount is ${convertedAmount} ${to.toUpperCase()}` });
    } catch (error) {
        res.status(500).send('Error converting currency');
    }
});

app.listen(PORT, () => {
    console.log(`Currency Conversion Service running on http://10.22.0.141:${PORT}`);
});