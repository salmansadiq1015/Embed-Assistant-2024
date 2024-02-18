import {
  comparePassword,
  createRandomToken,
  hashPassword,
} from "../helper/encryption.js";
import sendMail from "../helper/sendMail.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.fields;
    const { avatar } = req.files;

    // Validation
    if (!name) {
      return res.status(201).send({
        success: false,
        message: "Name is required!",
      });
    }
    if (!email) {
      return res.status(201).send({
        success: false,
        message: "Email is required!",
      });
    }
    if (!password) {
      return res.status(201).send({
        success: false,
        message: "Password is required!",
      });
    }
    if (!avatar) {
      return res.status(201).send({
        success: false,
        message: "Avatar is required!",
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "User already exists!",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    // Save User
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    if (avatar) {
      (user.avatar.data = fs.readFileSync(avatar.path)),
        (user.avatar.contentType = avatar.type);
    }

    await user.save();

    // Confirmation Email
    const data = { user: { name: user.name } };

    await sendMail({
      email: user.email,
      subject: "Confirmation Email!",
      template: "confirmation-mail.ejs",
      data,
    });
    res.status(200).send({
      success: true,
      message: `Please cheak your email: ${user.email} to activate your account`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in register controller!",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email) {
      return res.status(201).send({
        success: false,
        message: "Email is required!",
      });
    }
    if (!password) {
      return res.status(201).send({
        success: false,
        message: "Password is required!",
      });
    }
    // Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "User does not exist!",
      });
    }

    const comparedPassword = await comparePassword(password, user.password);

    if (!comparedPassword) {
      return res.status(201).send({
        success: false,
        message: "Incorrext password!",
      });
    }
    // Generate Token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "29d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in login controller!",
      error,
    });
  }
};

//   Update User Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, role } = req.fields;
    const { avatar } = req.files;

    const userId = req.params.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(201).send({
        success: false,
        message: "User does not exist!",
      });
    }

    // Update User
    const updateUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
      },
      { new: true }
    );

    if (avatar) {
      updateUser.avatar.data = fs.readFileSync(avatar.path);
      updateUser.avatar.contentType = avatar.type;
    }
    updateUser.save();
    res.status(200).send({
      success: true,
      message: "Profile updated successfully!",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in update profile controller!",
      error,
    });
  }
};

//   Get ALl Use COntroller
export const allUserController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password -avatar");
    res.status(200).send({
      total: users.length,
      success: true,
      message: "All users list!",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in all user controller!",
      error,
    });
  }
};

//   Get Single User
export const singleUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password -avatar");
    res.status(200).send({
      success: true,
      message: "Single user!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in single user controller!",
      error,
    });
  }
};

//   Delete User Controller
export const deleteController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(201).send({
        success: false,
        message: "User id is required!",
      });
    }
    await userModel.findOneAndDelete(userId);
    res.status(200).send({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in delete user controller!",
      error,
    });
  }
};

// Profile Image
export const userAvatarController = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId).select("avatar");

    if (user.avatar.data) {
      res.set("Content-Type", user.avatar.contentType);
      res.status(200).send(user.avatar.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in user avatar controller!",
      error,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await userModel
      .findOne({ email })
      .select("name email passwordResetToken passwordResetTokenExpire");
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "User does not exist!",
      });
    }
    // Generate a random token
    const token = await createRandomToken();
    const expireIn = Date.now() + 10 * 60 * 1000;
    await userModel.findByIdAndUpdate(user._id, {
      passwordResetToken: token,
      passwordResetTokenExpire: expireIn,
    });

    // Send email to user
    const data = { user: { name: user.name, token: token } };

    await sendMail({
      email: user.email,
      subject: "Reset Password",
      template: "reset-password.ejs",
      data,
    });

    res.status(200).send({
      success: true,
      message: "Reset password link send to your email!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in reset password!",
    });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      return res.status(201).send({
        success: false,
        message: "Reset token is required!",
      });
    }
    if (!newPassword) {
      return res.status(201).send({
        success: false,
        message: "New password is required!",
      });
    }
    // Check User
    const user = await userModel.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Token is invalid or has expired!",
      });
    }

    // Hashed Password
    const hashedPassword = await hashPassword(newPassword);
    // Update password
    const updatePassword = await userModel.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
        passwordResetToken: "",
        passwordResetTokenExpire: "",
      },
      { new: true }
    );

    await updatePassword.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password!",
    });
  }
};

// Update User Role

export const userRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const user = await userModel.findById(userId).select("-password -avatar");
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "User not found!",
      });
    }

    const updateUserRole = await userModel.findByIdAndUpdate(
      user._id,
      {
        $set: { role: role },
      },
      { new: true }
    );
    await updateUserRole.save();
    res.status(200).send({
      success: true,
      message: "User role updated successfully!",
      updateUserRole,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in single user controller!",
      error,
    });
  }
};
