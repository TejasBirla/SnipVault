import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Cannot connect to DB: ", error);
  }
};

export default connectDB;
