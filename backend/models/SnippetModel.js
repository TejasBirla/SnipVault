import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },

    tags: { type: [String], required: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPublic: { type: Boolean, default: true },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Snippet = mongoose.model("Snippet", SnippetSchema);
export default Snippet;
