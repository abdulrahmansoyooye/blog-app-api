import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    author: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model("post", PostSchema);
