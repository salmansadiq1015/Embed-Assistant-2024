import mongoose from "mongoose";

const fileSehema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    assistantId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },
    fileType: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("files", fileSehema);
