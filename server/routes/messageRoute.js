import express from "express";
import {
  assistantMessages,
  createMessage,
  createThread,
  messageList,
  runController,
} from "../controllers/messageController.js";

const router = express.Router();

// Create Messages
router.post("/create-message", createMessage);
// router.post("/create-message", createMessage1);

// Thread For Embedding Assistant
router.get("/create-thread", createThread);

// Messages List
router.get("/message-list/:id", messageList);
// Assistant Messages
router.get("/assistant-messages/:id", assistantMessages);

// Run
router.get("/run/:threadId/:runId", runController);

export default router;
