import mongoose, { Schema, Document } from "mongoose";

export interface IFilm extends Document {
  title: string;
  poster: string;
  description: string;
}

const FilmSchema: Schema = new Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IFilm>("Film", FilmSchema);
