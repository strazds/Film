import express from "express";
import Rating from "../models/Rating";
import Film from "../models/Film";
import User from "../models/User";

const router = express.Router();

router.post("/:id", async (req, res) => {
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

export default router;
