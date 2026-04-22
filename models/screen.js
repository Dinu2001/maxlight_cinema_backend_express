import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
    screenName: { type: String, required: true },
    capacity: { type: Number, required: true },
    screenType: String
},{timestamps:true});

export default mongoose.model("Screen", screenSchema);