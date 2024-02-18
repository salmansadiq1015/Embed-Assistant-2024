import express from "express";
import { createComment, getComments } from "../controllers/commentModel.js";

const router = express.Router();

// Create Comment
router.post("/create-comment", createComment);
// Get Comment
router.get("/get-all-comment", getComments);

export default router;
