import express from "express";
import { createContact, getContact } from "../controllers/contactController.js";

const router = express.Router();

// Create Contact
router.post("/create-contact", createContact);

// Get Contact Details
router.get("/get-contact", getContact);

export default router;
