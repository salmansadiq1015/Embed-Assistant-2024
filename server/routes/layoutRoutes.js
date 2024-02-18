import express from "express";
import {
  createLayout,
  editLayout,
  getLayout,
} from "../controllers/layoutController.js";

const router = express.Router();

// Create Layout
router.post("/create-layout", createLayout);

// Update Layout
router.put("/update-layout", editLayout);
// Get Layout
router.get("/get-layout/:type", getLayout);

export default router;
