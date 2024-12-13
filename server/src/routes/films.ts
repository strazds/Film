import express from "express";
import Film from "../models/Film";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      console.error(String(error));
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const films = req.body;

    const savedFilms = [];

    for (const filmData of films) {
      const newFilm = new Film({
        title: filmData.title,
        thumb: filmData.thumb,
        poster: filmData.poster,
        description: filmData.description,
        appetizer: filmData.appetizer,
        director: filmData.director,
        year: filmData.year,
        stars: parseInt(filmData.stars, 10),
      });

      console.log({ newFilm });

      const savedFilm = await newFilm.save();
      savedFilms.push(savedFilm);
    }

    res.status(201).json(savedFilms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      console.error(String(error));
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
});

export default router;
