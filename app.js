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
            return res.status(400).send({ message: 'Sort must be one of app or rating' });
        }
    }

    if (genres) {
        const fsLCap = genres.charAt(0).toUpperCase() + genres.substring(1);
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(fsLCap)) {
            return res.status(400).send({ message: 'Genre must be included' });
        }
        else {
            results = playstore
                .filter(game => {
                    return game.Genres === fsLCap
                })
        }
    }

    if (sort) {

        if (sort === 'rating') {
            results = playstore.sort((a, b) => a.Rating < b.Rating ? -1 : 1);
        }

        if (sort === 'app') {
            results = playstore.sort((a, b) => {
                const aApp = a.App.toUpperCase();
                const bApp = b.App.toUpperCase();

                let resp;

                if (a.App > b.App) { resp = 1 }
                else if (b.App > a.App) { resp = -1 }
                return resp
            });
        }
    }

    res.json(results);
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});

module.exports = app;