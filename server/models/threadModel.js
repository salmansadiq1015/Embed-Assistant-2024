import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    assistantId: {
      type: String,
      trim: true,
    },
    threadId: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      trim: true,
    },
    runId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Thread", threadSchema);
