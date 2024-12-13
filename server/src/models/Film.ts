import mongoose, { Schema, Document } from "mongoose";

export interface IFilm extends Document {
  title: string;
  poster: string;
  description: string;
  appetizer: string;
  year: number;
  director: string;
  stars: number;
}

const FilmSchema: Schema = new Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  description: { type: String, required: true },
  appetizer: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  stars: { type: Number, required: true },
});

export default mongoose.model<IFilm>("Film", FilmSchema);
