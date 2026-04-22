import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: "Showtime", required: true },
  bookingDate: { type: Date, default: Date.now },
  totalSeats: Number,
  status: { type: String, default: "PENDING" }
});

export default mongoose.model("Booking", bookingSchema);