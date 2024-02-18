import express from "express";
import {
  assistantAnalytics,
  filesAnalytics,
  leadsAnalytics,
  userAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

// User Anatytics
router.get("/user-analytics", userAnalytics);

// Assistant Anatytics
router.get("/assistant-analytics", assistantAnalytics);

// Files Anatytics
router.get("/files-analytics", filesAnalytics);

// Leads Anatytics
router.get("/leads-analytics", leadsAnalytics);

export default router;
