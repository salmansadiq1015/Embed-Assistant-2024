import assistantModel from "../models/assistantModel.js";
import filesModel from "../models/filesModel.js";
import userInfoModel from "../models/userInfoModel.js";
import userModel from "../models/userModel.js";
import { generateLast12MonthData } from "../utils/analyticsGenerator.js";

// User Analytics
export const userAnalytics = async (req, res) => {
  try {
    const users = await generateLast12MonthData(userModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User analytics",
    });
  }
};

// Assistant Analytics
export const assistantAnalytics = async (req, res) => {
  try {
    const assistants = await generateLast12MonthData(assistantModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      assistants: assistants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in assistant analytics",
    });
  }
};

// Files Analytics
export const filesAnalytics = async (req, res) => {
  try {
    const files = await generateLast12MonthData(filesModel);

    res.status(200).send({
      success: true,
      message: "Files Analytics",
      files: files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in files analytics",
    });
  }
};

// Leades Analytics
export const leadsAnalytics = async (req, res) => {
  try {
    const leadUsers = await generateLast12MonthData(userInfoModel);

    res.status(200).send({
      success: true,
      message: "Leads Analytics",
      leadUsers: leadUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in leads analytics",
    });
  }
};

// Revenue Analytics
// export const revenueAnalytics = async (req, res) => {
//   try {
//     const revenue = await generateLast12MonthData(revenueModel);

//     res.status(200).send({
//       success: true,
//       message: "Revenue Analytics",
//       revenue: revenue,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in revenue analytics",
//     });
//   }
// };
