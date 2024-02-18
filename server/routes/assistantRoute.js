import express from "express";
import {
  AssistantLogo,
  createAssistant,
  deleteAssistants,
  getAllAssistants,
  // newAssistant,
  singleAssistant,
  updateAssistant,
  userAssistants,
} from "../controllers/assistantController.js";
import formidable from "express-formidable";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Assistant Route
router.post(
  "/create-assistant/:id",
  requireSignin,
  formidable(),
  createAssistant
);

// Test Purpose
// router.post("/create-assistant/:id", requireSignin, formidable(), newAssistant);

// Update Assistant
router.put(
  "/update-assistant/:id",
  requireSignin,
  formidable(),
  updateAssistant
);

// All Assistants
router.get("/all-assistants", getAllAssistants);

// Get Single Assistant
router.get("/singleAssistant/:id", requireSignin, singleAssistant);

// Get ALl User Assistant
router.get("/user-assistants/:id", requireSignin, userAssistants);

// Delete Assistant
router.delete("/delete-assistant/:id", requireSignin, deleteAssistants);

// Assistant Logo
router.get("/assistant-logo/:id", AssistantLogo);

export default router;
