const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;
    let results = playstore

    if (sort) {
        if (!['app', 'rating'].includes(sort)) {
            return res.status(400).send('Sort must be one of app or rating');
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Genre must be included');
        }
    }

    if (genres) {
         results = playstore
            .filter(game => {
                return game.Genres === genres
            })
    }

    if (sort) {

        if (sort === 'rating') {
            results = playstore.sort((a, b) => a.Rating < b.Rating ? -1 : 1);
        }

        if (sort === 'app') {
            results = playstore.App.sort((a, b) => {
                let res;
                const aApp = a.App.toUppercase();
                const bApp = b.App.toUppercase();

                if(a.App > b.App){
                    res = 1
                }

                else if(a.App < b.App){
                    res = -1
                }

                return res
            });
        }
    }

    res.json(results);
})

app.listen(8080, () => {
    console.log('Server started on PORT 8080')
})



