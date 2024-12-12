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
  const newFilm = new Film({
    text: req.body.text,
  });

  try {
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      console.error(String(error));
    }
  }
});

export default router;
