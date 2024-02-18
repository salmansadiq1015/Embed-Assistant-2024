import botModel from "../models/botModel.js";
import userInfoModel from "../models/userInfoModel.js";

// Create User Info
export const CreateUserInfo = async (req, res) => {
  try {
    const { name, email, phone, assistantId } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).send({
        success: false,
        message: "All fields are required!",
      });
    }

    const isExisting = await userInfoModel.findOne({ email });
    if (isExisting) {
      return res.status(201).send({
        success: false,
        message: "User info already exists!",
      });
    }

    const userInfo = new userInfoModel({ name, email, phone, assistantId });
    await userInfo.save();

    // Hide Form
    // await botModel
    //   .findOneAndUpdate(assistantId, { $set: { show: false } })
    //   .save();

    res.status(200).send({
      success: true,
      message: "User info created successfully!",
      userInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while creating user info.",
      error,
    });
  }
};

// Get All User Info
export const getUserInfo = async (req, res) => {
  try {
    const usersInfo = await userInfoModel.find({});
    res.status(200).send({
      total: usersInfo.length,
      success: true,
      message: "All users info!",
      users: usersInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting users info.",
      error,
    });
  }
};

// Get Single User Info
export const singleUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const userInfo = await userInfoModel.findById({ _id: userId });
    if (!userInfo) {
      return res.status(401).send({
        success: false,
        message: "User info not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single user info!",
      userInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting  single user info.",
      error,
    });
  }
};

// Get User by Assistants
export const assistantUsers = async (req, res) => {
  try {
    const assistantId = req.params.id;
    const usersInfo = await userInfoModel.find({ assistantId: assistantId });

    res.status(200).send({
      total: usersInfo.length,
      success: true,
      message: "Assistant users!",
      usersInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting  single user info.",
      error,
    });
  }
};

// Delete User by Assistants
export const deleteUsers = async (req, res) => {
  try {
    const assistantId = req.params.id;
    await userInfoModel.findByIdAndDelete({ _id: assistantId });

    res.status(200).send({
      success: true,
      message: "Lead user info deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while delete  single user info.",
      error,
    });
  }
};
