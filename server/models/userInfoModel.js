import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    assistantId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", userInfoSchema);
