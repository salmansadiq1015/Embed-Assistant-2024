import OpenAI from "openai";
import dotenv from "dotenv";
import assistantModel from "../models/assistantModel.js";
import threadModel from "../models/threadModel.js";

// Dotenv Config
dotenv.config();

// Create Thread
export const createThread = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant Id is requires!",
      });
    }
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const thread = await openai.beta.threads.create();
    console.log(thread);

    // Save Thread in DB
    const updateAssistant = await threadModel.findOneAndUpdate(
      { assistantId: assistantId },
      { $set: { threadId: thread.id } },
      { new: true }
    );
    await updateAssistant.save();

    // Save thread in Assistant
    const assistant = await assistantModel
      .findOneAndUpdate(
        { id: assistantId },
        { $set: { threadId: thread.id } },
        { new: true }
      )
      .select("-logo");
    await assistant.save();

    return res.status(200).send({
      success: true,
      message: "Thread created successfully!",
      assistant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in create thread!",
    });
  }
};

// Delete Thread

export const deleteThread = async (req, res) => {
  try {
    const { threadId, assistantId } = req.params;

    if (!threadId) {
      return res.status(201).send({
        success: false,
        message: "Thread Id is required!",
      });
    }
    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant Id is required!",
      });
    }

    // Delete thread Id in Assistant
    const assistant = await assistantModel
      .findOneAndUpdate(
        { id: assistantId },
        { $set: { threadId: null } },
        { new: true }
      )
      .select("-logo");
    await assistant.save();

    // Delete Thread In DB
    await threadModel.findOneAndDelete({ threadId: threadId });

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const thread = await openai.beta.threads.del(threadId);
    console.log("Thread deleted:", thread);

    res.status(200).send({
      success: true,
      message: "Thread deleted successfully!",
      assistant: assistant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in delete thread controller!",
    });
  }
};

// Get Thread Id and Assistant Id

export const getThread = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant Id is required!",
      });
    }

    const thread = await threadModel.findOne({ assistantId: assistantId });
    if (!thread) {
      return res.status(400).send({
        success: false,
        message: "Thread not found!",
      });
    }

    res.status(200).send({
      success: false,
      thread: thread,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in get thread controller!",
    });
  }
};
