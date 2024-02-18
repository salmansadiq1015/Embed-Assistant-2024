import { createReadStream } from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
import filesModel from "../models/filesModel.js";
import assistantModel from "../models/assistantModel.js";

// Dotenv Config
dotenv.config();

// Upload Files Controller
export const uploadFile = async (req, res) => {
  try {
    const { userId, assistantId } = req.fields;
    const { files } = req.files;

    const fileExtension = files.name.split(".").pop();

    // Validation
    if (!userId || !assistantId) {
      return res.status(201).json({
        success: false,
        message: "User_id & AssistantId are required!",
      });
    }

    if (!files) {
      return res.status(201).json({
        success: false,
        message: "File is required!",
      });
    }

    // // Check if the 'path' property exists before using it
    const filePath = files.path;
    if (!filePath) {
      return res.status(201).json({
        success: false,
        message: "File path is missing!",
      });
    }

    // Create a ReadStream from the file
    const fileStream = createReadStream(filePath);

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.files.create({
      file: fileStream,
      purpose: "assistants",
    });

    // Create Assistant Files
    const assistantFile = await openai.beta.assistants.files.create(
      assistantId,
      {
        file_id: response.id,
      }
    );
    // Update Assistant Model
    const updateAssistant = await assistantModel.findOneAndUpdate(
      { id: assistantId },
      { $push: { file_ids: response.id } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    await updateAssistant.save();

    const fileModel = await filesModel.create({
      fileId: response.id,
      userId,
      assistantId,
      fileName: files.name,
      fileType: fileExtension,
    });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      fileModel,
      assistantFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error uploading file.",
      error: error.message,
    });
  }
};

// Get Assistant Files Controller
export const getAssistantFile = async (req, res) => {
  try {
    const assistantId = req.params.id;

    // Validation
    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant Id is required!",
      });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const assistantFiles = await openai.beta.assistants.files.list(assistantId);
    const filesData = assistantFiles.data;
    if (!assistantFiles) {
      return res.status(201).send({
        success: false,
        message: "No files found!",
      });
    }

    const files = await filesModel.find({ assistantId: assistantId });

    // const response = await openai.
    res.status(200).send({
      success: true,
      message: "Assistant_File list!",
      filesData,
      files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in assistant file controller ☠",
    });
  }
};

// Get ALl Files
export const allUploadFiles = async (req, res) => {
  try {
    // Files in OpenAI
    // const openai = new OpenAI(process.env.OPENAI_API_KEY);
    // const files = await openai.files.list();
    // console.log(files.data);

    // Files in DB
    const files = await filesModel.find({});
    res.status(200).send({
      total: files.length,
      success: true,
      message: "Uploaded files list!",
      files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  get all files controller ☠",
    });
  }
};

// Delete Files Controller
export const deleteFile = async (req, res) => {
  try {
    const { assistantId, fileId } = req.params;

    if (!assistantId) {
      return res.status(201).send({
        success: false,
        message: "Assistant id is required!",
      });
    }
    if (!fileId) {
      return res.status(201).send({
        success: false,
        message: "File id is required!",
      });
    }

    const file = await filesModel.findOne({ fileId: fileId });
    if (!file) {
      return res.status(201).send({
        success: false,
        message: "File not found!",
      });
    }

    // Delete File in Assistant
    await assistantModel.findOneAndUpdate(
      { id: assistantId },
      { $pull: { file_ids: file.fileId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Deleting Assistant in OpenAI
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const deleteFile = await openai.beta.assistants.files.del(
      assistantId,
      file.fileId
    );

    // Deleting Assistant in DB
    await filesModel.findByIdAndDelete(file._id);

    res.status(200).send({
      success: true,
      message: "File deleted successfully!",
      deleteFile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete file controller ☠",
      error,
    });
  }
};
