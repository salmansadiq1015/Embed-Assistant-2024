import mongoose from "mongoose";

const subscriptionModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      default: "free",
    },
    subscriptionExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionModel);
