import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    object: {
      type: String,
      required: true,
      default: "assistant",
    },
    instructions: {
      type: String,
      default: `
        You are a knowledgeable assistant capable of providing various types of answers.
      I will ask you questions on a wide range of topics, and you can respond using your expertise.
      Feel free to use the documents I provide to you for assistance.
      If you're confident in your response, provide a detailed answer. If uncertain, you can say "I don't know" or offer possible scenarios.
      Your goal is to assist me to the best of your ability, utilizing your understanding of diverse subjects.
      `,
      trim: true,
      required: true,
    },

    file_ids: [
      {
        type: String,
        trim: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    logo: {
      data: Buffer,
      contentType: String,
    },
    model: {
      type: String,
      default: "gpt-4-1106-preview",
    },
    threadId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assistant", assistantSchema);
