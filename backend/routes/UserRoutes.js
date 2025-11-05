import express from "express";
import {
  loginUser,
  registerUser,
  userSnippets,
} from "../controllers/UserController.js";

import { protectRoute } from "../middlewares/Auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/snippets", protectRoute, userSnippets);

export default userRouter;
