/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore.js");

const app = express();

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!["app", "rating"].includes(sort)) {
      return res.status(400).send("Sort must be one of app or rating");
    }
  }

  if (genres) {
    if (
      ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res.status(400).send("Genre not found. Select another genre");
    }
  }
  let results = playstore.filter(app =>
    app.Genres.toLowerCase().includes(genres)
  );

  if (sort === "rating") {
    results = playstore.sort((a, b) => (a.Rating < b.Rating ? -1 : 1));
  }
  if (sort === "app") {
    results = playstore.sort((a, b) =>
      a.App.toLowerCase() < b.App.toLowerCase() ? -1 : 1
    );
  }

  res.json(results);
});

app.listen(8080, () => {
  console.log("Server started on PORT 8080");
});
