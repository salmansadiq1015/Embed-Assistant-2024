import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import {
  allUploadFiles,
  deleteFile,
  getAssistantFile,
  uploadFile,
} from "../controllers/filesController.js";
import formidable from "express-formidable";

const router = express.Router();

// Upload Files
router.post("/upload-file", formidable(), uploadFile);

// Get Assistant Files
router.get("/assistant-files/:id", getAssistantFile);

// Get ALL Files
router.get("/all-files", allUploadFiles);

// Delete File
router.delete("/delete-file/:assistantId/:fileId", deleteFile);

// ALL User Files
router.get("/user-files", requireSignin);

// Create Assistant file
router.post("/create-assistant-file", requireSignin);

export default router;
