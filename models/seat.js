import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
    rowLabel: String,
    seatNumber: Number,
    seatType: String
});

export default mongoose.model("Seat", seatSchema);
