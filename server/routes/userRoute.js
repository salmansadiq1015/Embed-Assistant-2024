import express from "express";
import {
  allUserController,
  deleteController,
  loginController,
  registerController,
  resetPassword,
  singleUserController,
  updatePassword,
  updateProfileController,
  userAvatarController,
  userRole,
} from "../controllers/userController.js";
import formidable from "express-formidable";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", formidable(), registerController);
// Login
router.post("/login-user", loginController);
// Update User
router.put(
  "/update-profile/:id",
  formidable(),
  requireSignin,
  updateProfileController
);
// get all user
router.get("/all-users", allUserController);
// get singe user
router.get("/single-user/:id", singleUserController);

// delete user
router.delete("/delete-user/:id", requireSignin, isAdmin, deleteController);

// user avatar
router.get("/user-avatar/:id", userAvatarController);
// Reset Password
router.post("/resetPassword", resetPassword);
// Update Password
router.patch("/updatePassword", updatePassword);
// Update User Role
router.put("/update-role/:id", requireSignin, isAdmin, userRole);

// Protected Route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Admin Protected Route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
