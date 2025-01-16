import express from "express";
// import mongoose from "mongoose";
import Rating from "../models/Rating";
import Film from "../models/Film";
import User from "../models/User";

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

router.post("/:id/rating", async (req, res) => {
  try {
    const filmId = req.params.id;
    const { userId, rating } = req.body;

    const film = await Film.findById(filmId);
    const user = await User.findById(userId);

    if (!film || !user) {
      res.status(404).json({ message: "Film oder Benutzer nicht gefunden" });
      return;
    }
    const existingRating = await Rating.findOne({ film: filmId, user: userId });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      const newRating = new Rating({ film: filmId, user: userId, rating, timestamp: new Date() });
      await newRating.save();
    }

    res.status(200).json({ message: "Bewertung erfolgreich gespeichert" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Fehler beim Speichern der Bewertung" });
    } else {
      console.error("Fehler beim Speichern der Bewertung:", String(error));
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);

    if (!film) {
      res.status(404).json({ message: "Film nicht gefunden" });
      return;
    }
    res.json(film);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      console.error(String(error));
      console.error(error);
      res.status(500).json({ message: "Serverfehler" });
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
