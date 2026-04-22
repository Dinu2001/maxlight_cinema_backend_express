import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });



export default mongoose.model("User", userSchema);