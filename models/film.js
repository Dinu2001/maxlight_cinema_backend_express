import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    filmName: { type: String, required: true },
    genre: String,
    trailerLink: String,
    description: String,
    releaseDate: Date,
    language: String,
    duration: Number,
    posterImage: String,
    status: { type: String, default: "ACTIVE" }
},{ timestamps: true });

export default mongoose.model("Film", filmSchema);