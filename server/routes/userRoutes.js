import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/upload.js";
import {
  getMe,
  updateProfile,
  changePassword,
  updateAvatar,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", verifyToken, getMe);
router.put("/profile", verifyToken, updateProfile);
router.put("/password", verifyToken, changePassword);
router.post("/avatar", verifyToken, uploadAvatar, updateAvatar);

export default router;
