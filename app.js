const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

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

    // let genreList = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

    let results = playstore
        .filter(game => {
            return game.Genres === genres
        })

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    // if(sort === 'Rating'){
    //     results.sort((a , b) => a.Rating < b.Rating ? -1 : 1);
    // }

    // if(sort === 'app'){
    //     results.sort();
    // }

    res.json(results);
})

app.listen(8080, () => {
    console.log('Server started on PORT 8080')
})



