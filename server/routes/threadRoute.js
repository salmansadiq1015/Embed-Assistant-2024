import express from "express";
import {
  createThread,
  deleteThread,
  getThread,
} from "../controllers/threadController.js";

const router = express.Router();

// Create Thread
router.post("/create-thread/:id", createThread);

// Delete Thread
router.delete("/delete-thread/:threadId/:assistantId", deleteThread);

// Get Thread
router.get("/get-thread/:id", getThread);

// Export

export default router;
