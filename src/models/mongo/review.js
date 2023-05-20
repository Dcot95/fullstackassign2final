import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    text: { type: String, required: true },
    pointofinterest: { type: mongoose.Schema.Types.ObjectId, ref: "Pointofinterest", required: true },
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review };
