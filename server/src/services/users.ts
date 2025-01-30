import mongoose from "mongoose";
import Rating from "../models/Rating";
import Film from "../models/Film";
import User from "../models/User";
export default { addRating };

async function addRating({ req, res }: { req: any; res: any }) {
  const filmId = req.params.id;
  const { userId, rating } = req.body;

  const film = await Film.findById(filmId);
  const user = await User.findById(userId);

  if (!film || !user) {
    res.status(404).json({ message: "Film oder Benutzer nicht gefunden" });
    return;
  }
  const existingRating = await Rating.findOne({ film: filmId, user: userId });

  if (existingRating) {
    existingRating.rating = rating;
    await existingRating.save();
  } else {
    const newRating = new Rating({ film: filmId, user: userId, rating, timestamp: new Date() });
    await newRating.save();
  }

  const ratingArray = await getAverageRatingsPerFilm({ Rating, filmId });
  const stars = ratingArray[0].averageRating;
  film.stars = stars;
  await film.save();

  res.status(200).json({ message: "Bewertung erfolgreich gespeichert" });
}

async function getAverageRatingsPerFilm({ Rating, filmId }: { Rating: any; filmId: any }) {
  try {
    const pipeline = [
      {
        $match: { film: mongoose.Types.ObjectId.createFromHexString(filmId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ];

    const result = await Rating.aggregate(pipeline);

    return result;
  } finally {
    // if error occurs...
  }
}
