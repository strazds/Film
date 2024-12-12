import express from "express";
import Todo from "../models/Todo";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      console.error(String(error));
    }
  }
});

router.post("/", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      console.error(String(error));
    }
  }
});

export default router;
