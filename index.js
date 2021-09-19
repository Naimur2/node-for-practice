const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('This is the home page');
});

app.post('/', (req, res) => {
    res.send('This is the home page with post method');
});

app.listen(3000, () => {
    console.log('listining on port 3000');
});

