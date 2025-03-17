import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getAllBookmarks,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/:userId/bookmarks").get(verifyJWT, getAllBookmarks);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
