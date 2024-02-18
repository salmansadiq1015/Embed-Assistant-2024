import OpenAI from "openai";
import dotenv from "dotenv";

// Config OpenAI
dotenv.config();

// Create  Thread for Embedding Assistant
export const createThread = async (req, res) => {
  try {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const thread = await openai.beta.threads.create();

    res.status(200).send(thread);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in create thread controller!",
    });
  }
};

// Create Messages
export const createMessage = async (req, res) => {
  try {
    const { message, threadId, assistantId } = req.body;

    if (!message) {
      return res.status(400).send({
        success: false,
        message: "Message is required!",
      });
    }
    if (!threadId) {
      return res.status(400).send({
        success: false,
        message: "Thread Id is required!",
      });
    }
    if (!assistantId) {
      return res.status(400).send({
        success: false,
        message: "Assistant Id is required!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    // 1) Create a message
    const threadMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });
    console.log("Thread Message:", threadMessage);

    // 2) Create a RUN
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: `Please address the user as Salman.`,
    });
    console.log("Run:", run);

    // Response
    res.status(201).send({
      success: true,
      message: "Message created successfully!",
      threadMessage: threadMessage,
      run: run,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating message!",
      error,
    });
  }
};

// Run Controller
export const runController = async (req, res) => {
  try {
    const { threadId, runId } = req.params;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    // const status = await openai.beta.threads.runs.retrieve(threadId, runId);
    // console.log(status);

    let status = await openai.beta.threads.runs.retrieve(threadId, runId);

    while (
      !(
        status.status === "cancelled" ||
        status.status === "failed" ||
        status.status === "completed" ||
        status.status === "expired"
      )
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Retrieve the status again
      status = await openai.beta.threads.runs.retrieve(threadId, runId);
    }

    // Once the status is "completed",
    const response = await openai.beta.threads.messages.list(threadId);

    // Response
    res.status(200).send({
      success: true,
      message: "Run successfully!",
      status: status,
      messages: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error run controller!",
      error,
    });
  }
};

// Message List Controller
export const messageList = async (req, res) => {
  try {
    const threadId = req.params.id;

    if (!threadId) {
      return res.status(400).send({
        success: false,
        message: "Thread Id is required!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.beta.threads.messages.list(threadId);

    res.status(200).send({
      success: true,
      message: "Message list!",
      messages: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating message!",
      error,
    });
  }
};

// Cancel Run Controller

export const cancelRun = async (req, res) => {
  try {
    const { threadId, runId } = req.params;
    if (!threadId || runId) {
      return res.status(400).send({
        success: false,
        message: "Thread Id and Run Id is required!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.beta.threads.runs.cancel(threadId, runId);
    console.log(response.data);

    res.status(200).send({
      success: true,
      message: "Run cancelled!",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in cancel run!",
      error,
    });
  }
};

// Assistant Messages
export const assistantMessages = async (req, res) => {
  try {
    const threadId = req.params.id;

    if (!threadId) {
      return res.status(400).send({
        success: false,
        message: "Thread Id is required!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.beta.threads.messages.list(threadId, {
      latest: true,
    });

    res.status(200).send({
      success: true,
      message: "Message list!",
      messages: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in assistant messages controller!",
      error,
    });
  }
};
