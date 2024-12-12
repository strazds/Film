import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import filmRoutes from "./routes/films";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/filmapp", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/films", filmRoutes);

app.use("/thumbs", express.static(path.join(__dirname, "assets", "thumbs")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
