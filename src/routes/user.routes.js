import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 }
]), registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/forgot-password").post(forgotPassword)

// router.route("/reset-password/:id").get(resetPassword)

export default router;