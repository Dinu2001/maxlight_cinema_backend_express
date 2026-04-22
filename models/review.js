import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filmId: { type: mongoose.Schema.Types.ObjectId, ref: "Film", required: true },
    description: String,
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);