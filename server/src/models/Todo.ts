import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  text: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
