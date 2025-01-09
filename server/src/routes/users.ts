import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
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
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User nicht gefunden" });
      return;
    }
    res.json(user);
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
    const users = req.body;

    const savedUsers = [];

    for (const userData of users) {
      const newUser = new User({
        username: userData.username,
        password: userData.password,
      });

      const savedUser = await newUser.save();
      savedUsers.push(savedUser);
    }

    res.status(201).json(savedUsers);
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
