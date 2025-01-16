import mongoose, { Schema, Document } from "mongoose";

interface IRating {
  film: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  rating: number;
  timestamp?: Date;
}

const RatingSchema = new Schema<IRating>({
  film: { type: Schema.Types.ObjectId, ref: "Film", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  timestamp: Date,
});

export default mongoose.model<IRating>("Rating", RatingSchema);
