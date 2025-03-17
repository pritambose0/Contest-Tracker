import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
    required: true,
  },
  youtubeLink: { type: String, required: true },
});

export const SolutionSchema = mongoose.model("Solution", solutionSchema);
