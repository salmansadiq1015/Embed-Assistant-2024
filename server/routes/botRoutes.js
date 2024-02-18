import express from "express";
import formidable from "express-formidable";
import {
  botAvatarImage,
  createBot,
  getBot,
  publishedBot,
  updateBot,
  userAvatarImage,
} from "../controllers/botController.js";

const router = express.Router();

// Create bot
router.post("/create-bot", formidable(), createBot);
// Update Bot
router.put("/update-bot/:id", formidable(), updateBot);
// Get Bot
router.get("/get-bot/:id", getBot);
// Bot Avatar
router.get("/bot-avatar/:id", botAvatarImage);
// User Avatar
router.get("/user-avatar/:id", userAvatarImage);

// Published Bot
router.put("/published-bot/:id", publishedBot);

export default router;
