import express from "express";
import {
  createSnippet,
  editSnippet,
  exploreSnippets,
  viewSnippets,
  deleteSnippet,
  toggleLike,
} from "../controllers/SnipController.js";
import { protectRoute } from "../middlewares/Auth.js";
const snipRouter = express.Router();

snipRouter.post("/create", protectRoute, createSnippet);
snipRouter.patch("/edit/:id", protectRoute, editSnippet);
snipRouter.get("/view/:id", protectRoute, viewSnippets);
snipRouter.get("/explore", protectRoute, exploreSnippets);
snipRouter.put("/like/:id", protectRoute, toggleLike);
snipRouter.delete("/delete/:id", protectRoute, deleteSnippet);

export default snipRouter;
