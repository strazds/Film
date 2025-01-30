import express from "express";
import ratings from "../services/ratings";

const router = express.Router();

router.post("/:id", async (req, res, next) => {
  try {
    await ratings.addRating({ req, res });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Fehler beim Speichern der Bewertung" });
    } else {
      console.error("Fehler beim Speichern der Bewertung:", String(error));
    }
    next(error);
  }
});

export default router;
