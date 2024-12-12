import mongoose, { Schema, Document } from "mongoose";

export interface IFilm extends Document {
  text: string;
  completed: boolean;
}

const FilmSchema: Schema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<IFilm>("Film", FilmSchema);
