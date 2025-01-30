import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import filmRoutes from "./routes/films";
import userRoutes from "./routes/users";
import ratingRoutes from "./routes/ratings";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/filmapp", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/films", filmRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ratings", ratingRoutes);

app.use("/images", express.static(path.join(__dirname, "assets", "thumbs")));
app.use("/posters", express.static(path.join(__dirname, "assets", "poster")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
