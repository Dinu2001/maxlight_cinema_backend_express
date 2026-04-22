import mongoose from "mongoose";

const bookingSeatSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    seatId: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true }
});

export default mongoose.model("BookingSeat", bookingSeatSchema);