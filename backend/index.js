import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utility/db.js";
import userRouter from "./routes/UserRoutes.js";
import snipRouter from "./routes/SnipRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/snippets", snipRouter);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at port : http://localhost:${port}`);
});
