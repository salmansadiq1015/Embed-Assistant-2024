import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";

// Create Comment
export const createComment = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    const user = await userModel.findById(userId).select("name email");

    const comments = await commentModel.create({
      userName: user.name,
      userEmail: user.email,
      userId,
      rating,
      comment,
    });

    res.status(200).send({
      success: true,
      message: "Comment created successfully.",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in create comment controller.",
    });
  }
};

// Get Comment

export const getComments = async (req, res) => {
  try {
    const comments = await commentModel.find({});

    res.status(200).send({
      success: true,
      message: "All Comments.",
      comments: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in create comment controller.",
    });
  }
};
