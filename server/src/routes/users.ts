import express from "express";
import users from "../services/users";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await users.getAll({ req, res });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      console.error(String(error));
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    await users.getSingle({ req, res });
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
    await users.create({ req, res });
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
