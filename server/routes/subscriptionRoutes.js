import express from "express";
import {
  addStripe,
  checkOutSection,
  deleteSubscription,
  getUserPayment,
  newPayment,
  sendStripePublishableKey,
  subscriptionDetails,
  subscriptionUsers,
  webhookHandler,
} from "../controllers/subscriptionController.js";
import { requireSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create
router.post("/create-subscription", subscriptionDetails);

// Get
router.get("/get-subscription", subscriptionUsers);

// Stripe
router.get("/payment/publicablekey", sendStripePublishableKey);

// New Payment
router.post("/payment", requireSignin, newPayment);

// Payment Info
router.get("/user-payment-info/:id", getUserPayment);
// Delete Payment Info After 1 Month
router.delete("/delete-payment-info/:id", deleteSubscription);

// Add Stripe
router.post("/add-stripe", addStripe);
// Checkout Session
router.post("/checkOut-Section", checkOutSection);
// WebHooks
router.post("/webhooks", webhookHandler);

export default router;
