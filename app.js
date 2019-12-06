/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");

const playstore = require("./playstore.js");

const app = express();

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;
  let results = [...playstore];
  const validGenres = [
    "action",
    "puzzle",
    "strategy",
    "casual",
    "arcade",
    "card"
  ];

  if (genres && !validGenres.includes(genres)) {
    return res.status(400).send("Genre not found. Select another genre");
  } else {
    results = results.filter(app => app.Genres.toLowerCase().includes(genres));
  }

  if (sort && !["app", "rating"].includes(sort)) {
    return res.status(400).send("Sort must be one of app or rating");
  }

  if (sort === "rating") {
    results.sort((a, b) => (Number(a.Rating) < Number(b.Rating) ? -1 : 1));
  }
  if (sort === "app") {
    results.sort((a, b) =>
      a.App.toLowerCase() < b.App.toLowerCase() ? -1 : 1
    );
  }
  res.json(results);
});

app.listen(8080, () => {
  console.log("Server started on PORT 8080");
});
