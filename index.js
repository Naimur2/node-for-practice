const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.route('/about/mission')
    .get((req, res) => {
        res.render('pages/about');
    })
    .post((req, res) => {
        res.send('This is the post method');
    })
    .put((req, res) => {
        res.send('This is the put method');
    })
    .delete((req, res) => {
        res.send('This is the delete method');
    });

app.listen(3000, () => {
    console.log('listining on port 3000');
});
