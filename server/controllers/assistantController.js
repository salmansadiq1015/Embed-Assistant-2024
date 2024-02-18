import OpenAI from "openai";
import dotenv from "dotenv";
import assistantModel from "../models/assistantModel.js";
import fs from "fs";
import threadModel from "../models/threadModel.js";

// Dotenv Config
dotenv.config();

// Create Assistant Controller
export const createAssistant = async (req, res) => {
  try {
    const { name, instructions, model } = req.fields;
    const { logo } = req.files;
    const userId = req.params.id;

    // Validation
    if (!name) {
      return res.status(201).send({
        success: false,
        message: "Name is required!",
      });
    }
    if (!instructions) {
      return res.status(201).send({
        success: false,
        message: "Instructions is required!",
      });
    }
    if (!logo || logo.size > 10000000) {
      return res.status(201).send({
        success: false,
        message: "Assistant logo is required!",
      });
    }

    // Create Assistant in OpenAI
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const assistant = await openai.beta.assistants.create({
      name: name,
      instructions: `Provide responses only for uploaded file queries. ${instructions}`,
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: model || "gpt-4-1106-preview",
    });
    // tools: [{ type: "retrieval" }],
    console.log(assistant);
    // Creating Thread in OpenAI
    const thread = await openai.beta.threads.create();

    // Save Ids in Thread Model
    await threadModel({
      assistantId: assistant.id,
      threadId: thread.id,
      userId: userId,
    }).save();

    // Save Assistant in DB
    const newAssiatant = new assistantModel({
      id: assistant.id,
      name: assistant.name,
      instructions: assistant.instructions,
      object: assistant.object,
      $push: { file_ids: assistant.file_ids },
      userId: userId,
      model: assistant.model,
      threadId: thread.id,
    });
    if (logo) {
      newAssiatant.logo.data = fs.readFileSync(logo.path);
      newAssiatant.logo.contentType = logo.type;
    }
    await newAssiatant.save();
    res.status(200).send({
      success: true,
      message: "Assistant created successfully!",
      newAssiatant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating assistant!",
      error,
    });
  }
};

// Update Assistant Controller
export const updateAssistant = async (req, res) => {
  try {
    const { name, instructions, model } = req.fields;
    const { logo } = req.files;
    const assistantId = req.params.id;

    // Find Assistant in DB
    const assistant = await assistantModel
      .findOne({ id: assistantId })
      .select("-logo");

    if (!assistant) {
      return res.status(201).send({
        success: false,
        messsage: "Assistant not found!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    // Updating Assistant in OpenAI
    const updateAssistant = await openai.beta.assistants.update(assistant.id, {
      instructions: instructions || assistant.instructions,
      name: name || assistant.name,
      tools: [{ type: "retrieval" }],
      model: model || assistant.model,
    });

    // Updating Assistant in Database
    const updatedAssistant = await assistantModel.findByIdAndUpdate(
      assistant._id,
      {
        id: updateAssistant.id,
        name: updateAssistant.name,
        instructions: updateAssistant.instructions,
        object: updateAssistant.object,
        file_ids: updateAssistant.file_ids,
        model: updateAssistant.model,
      },
      { new: true }
    );
    if (logo) {
      updatedAssistant.logo.data = fs.readFileSync(logo.path);
      updatedAssistant.logo.contentType = logo.type;
    }
    await updatedAssistant.save();

    res.status(200).send({
      success: true,
      message: "Assistant updated successfully!",
      updatedAssistant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating assistant!",
      error,
    });
  }
};

// Get All Assistants

export const getAllAssistants = async (req, res) => {
  try {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const response = await openai.beta.assistants.list({
      order: "desc",
      limit: 10,
    });
    const assistants = response.data;
    const dbAssistants = await assistantModel.find({}).select("-logo");
    res.status(200).send({
      success: true,
      message: "All assistant list",
      assistants,
      dbAssistants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error all assistant controller!",
      error,
    });
  }
};

// Get Single Assistant
export const singleAssistant = async (req, res) => {
  try {
    const assistantId = req.params.id;

    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant Id is required",
      });
    }

    // Check assistant in DB
    const assistant = await assistantModel
      .findOne({ id: assistantId })
      .select("-logo");

    if (!assistant) {
      return res.status(201).send({
        success: false,
        message: "Assistant not found",
      });
    }

    // Check Assistant in OpenAI
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const myAssistant = await openai.beta.assistants.retrieve(assistant.id);

    res.status(200).send({
      success: true,
      message: "Single assiatant!",
      assistant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in single assistant!",
      error,
    });
  }
};

//   ALl User Assistants
export const userAssistants = async (req, res) => {
  try {
    const userId = req.params.id;
    const assistantlist = await assistantModel
      .find({ userId: userId })
      .select("-logo");
    res.status(200).send({
      total: assistantlist.length,
      success: true,
      message: "All user assistants!",
      assistantlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user assistant!",
      error,
    });
  }
};

//   Delete Assistant
export const deleteAssistants = async (req, res) => {
  try {
    const assistantId = req.params.id;
    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant Id is required",
      });
    }

    const assistant = await assistantModel
      .findOne({ id: assistantId })
      .select("-logo");
    if (!assistant) {
      return res.status(201).send({
        success: false,
        message: "Assistant not found!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const response = await openai.beta.assistants.del(assistant.id);

    // Delete Thred in DB

    await threadModel.findOneAndDelete({ assistantId: assistantId });

    // Delete Assistant in DB
    await assistantModel.findOneAndDelete(assistant._id);
    res.status(200).send({
      success: false,
      message: "Assistant deleted successfully!",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete assistants!",
      error,
    });
  }
};

// Assistant Logo

export const AssistantLogo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).send({
        success: false,
        message: "Assistant id is required!",
      });
    }
    const assistant = await assistantModel.findById(id).select("logo");
    if (assistant.logo.data) {
      res.set("Content-Type", assistant.logo.contentType);
      res.status(200).send(assistant.logo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in assistant logo controller!",
    });
  }
};

// --------------------------------------------------------------------------------->
// // Create Function Assistant Controller
export const newAssistant = async (req, res) => {
  try {
    const { name, instructions, model } = req.fields;
    const { logo } = req.files;
    const userId = req.params.id;

    // Validation
    if (!name) {
      return res.status(201).send({
        success: false,
        message: "Name is required!",
      });
    }
    if (!instructions) {
      return res.status(201).send({
        success: false,
        message: "Instructions is required!",
      });
    }
    if (!logo || logo.size > 10000000) {
      return res.status(201).send({
        success: false,
        message: "Assistant logo is required!",
      });
    }

    // Create Assistant in OpenAI
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const assistant = await openai.beta.assistants.create({
      name: name,
      instructions: instructions,
      tools: [
        { type: "code_interpreter" },
        { type: "retrieval" },
        {
          type: "function",
          function: {
            name: "get_user_name",
            description:
              "Ask user to provide its full name then move next. Get the current user name",
            parameters: {
              type: "object",
              properties: {
                userName: {
                  type: "string",
                  description:
                    "The first name and last name, e.g. Salman, Sadiq",
                },
                format: {
                  type: "string",
                  enum: ["firstName", "lastName"],
                  description:
                    "Ask user to provide its full name then move next.",
                },
              },
              required: ["userName", "format"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "get_n_day_weather_forecast",
            description: "Get an N-day weather forecast",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The city and state, e.g. San Francisco, CA",
                },
                format: {
                  type: "string",
                  enum: ["celsius", "fahrenheit"],
                  description:
                    "The temperature unit to use. Infer this from the users location.",
                },
                num_days: {
                  type: "integer",
                  description: "The number of days to forecast",
                },
              },
              required: ["location", "format", "num_days"],
            },
          },
        },
      ],
      model: model || "gpt-4-1106-preview",
    });

    console.log(assistant);
    // Creating Thread in OpenAI
    const thread = await openai.beta.threads.create();
    console.log("New Thread:", thread);

    // Create Run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      // instructions: `Please address the user as M Salman.`,
    });
    console.log("Run:", run);

    // Retrieve the Status
    let status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (
      !(
        status.status === "cancelled" ||
        status.status === "failed" ||
        status.status === "completed" ||
        status.status === "expired" ||
        status.status === "requires_action"
      )
    ) {
      // Wait for some time before checking the status again
      await new Promise((resolve) => setTimeout(resolve, 1000)); // You can adjust the interval as needed
      // Retrieve the status again
      status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }
    let runToll;
    if (status.required_action) {
      const toolCalls = status.required_action.submit_tool_outputs.tool_calls;

      runToll = await openai.beta.threads.runs.submitToolOutputs(
        thread.id,
        run.id,
        {
          tool_outputs: [
            {
              tool_call_id: toolCalls[0].id,
              output: "",
            },
          ],
        }
      );
    }

    console.log("RunToll:", runToll);
    // Once the status is "completed", make the second API call
    const response = await openai.beta.threads.messages.list(thread.id);

    console.log("Default Function Message:", response.data);

    // Save Ids in Thread Model
    await threadModel({
      assistantId: assistant.id,
      threadId: thread.id,
      userId: userId,
    }).save();

    // Save Assistant in DB
    const newAssiatant = new assistantModel({
      id: assistant.id,
      name: assistant.name,
      instructions: assistant.instructions,
      object: assistant.object,
      $push: { file_ids: assistant.file_ids },
      userId: userId,
      model: assistant.model,
      threadId: thread.id,
    });
    if (logo) {
      newAssiatant.logo.data = fs.readFileSync(logo.path);
      newAssiatant.logo.contentType = logo.type;
    }
    await newAssiatant.save();
    res.status(200).send({
      success: true,
      message: "Assistant created successfully!",
      newAssiatant,
      Status: status,
      messages: response.data,
      RunTool: runToll,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating assistant!",
      error,
    });
  }
};
