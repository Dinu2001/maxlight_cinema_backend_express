import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
    filmId: { type: mongoose.Schema.Types.ObjectId, ref: "Film", required: true },
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
    showDate: Date,
    startTime: String,
    endTime: String,
    status: { type: String, default: "ACTIVE" }
});

export default mongoose.model("Showtime", showtimeSchema);