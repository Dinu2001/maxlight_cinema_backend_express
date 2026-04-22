import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", unique: true, required: true },
    amount: Number,
    paymentMethod: String,
    paidAt: { type: Date, default: Date.now },
    status: { type: String, default: "PAID" }
});

export default mongoose.model("Payment", paymentSchema);