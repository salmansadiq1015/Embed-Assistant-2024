import express from "express";
import {
  CreateUserInfo,
  assistantUsers,
  deleteUsers,
  getUserInfo,
  singleUserInfo,
} from "../controllers/userInfoController.js";

const router = express.Router();

// Create User Info
router.post("/create-userInfo", CreateUserInfo);

// Get All Users Info
router.get("/all-usersInfo", getUserInfo);

// Get Single User Info
router.get("/single-usersInfo/:id", singleUserInfo);

// Get Assistant User Info
router.get("/assistant-users/:id", assistantUsers);

// Delete User Info
router.delete("/delete-assistant-users/:id", deleteUsers);

export default router;
