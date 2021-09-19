const express = require('express');

const app = express();

const router = express.Router({
    caseSensitive: true,
});

app.use(router);

router.get('/about', (req, res) => {
    res.send('This is the home page');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('This is the home page with post method');
});

app.listen(3000, () => {
    console.log('listining on port 3000');
});
