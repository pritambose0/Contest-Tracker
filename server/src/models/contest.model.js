import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    platform: {
      type: String,
      enum: ["Codeforces", "CodeChef", "LeetCode"],
      required: true,
    },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    url: { type: String, required: true },
    status: { type: String, enum: ["upcoming", "past"], required: true },
  },
  { timestamps: true }
);

export const ContestSchema = mongoose.model("Contest", contestSchema);
