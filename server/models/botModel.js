import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
  {
    assistantId: {
      type: String,
      required: true,
    },
    botName: {
      type: String,
      default: "ChatDoc.ai",
    },
    message: {
      type: String,
      default: "Hey, Today I'm your assistant. How can I help you?",
    },
    color: {
      type: String,
      default: "#28a745",
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
    userAvatar: {
      data: Buffer,
      contentType: String,
    },
    questions: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BotSitting", botSchema);
