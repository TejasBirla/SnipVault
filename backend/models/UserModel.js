import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    emailID: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    snippets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
