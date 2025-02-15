import { Router} from "express";
import {
  registerUser,
  isAdmin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  isUsernameUnique,
  registerGuestUser,
  upgradeGuestUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateUserMetrics } from "../middlewares/userMetrics.middleware.js";
import checkIfBlocked from "../middlewares/block.middleware.js";

const router = Router();

router.route("/current-user").get(verifyJWT,checkIfBlocked, getCurrentUser);

router.route("/signup").post(updateUserMetrics, registerUser);

router.route("/guest/signup").post(updateUserMetrics, registerGuestUser)

router.route("/guest/upgrade").post(updateUserMetrics, upgradeGuestUser)

router.route("/login").post(updateUserMetrics,checkIfBlocked ,loginUser);

router.route("/refresh-token").post(checkIfBlocked,refreshAccessToken);

router.route("/update-profile").post(verifyJWT,checkIfBlocked,updateProfile)

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-password").post(verifyJWT,checkIfBlocked, updateUserMetrics, changeCurrentPassword);

router.route("/update-account").post(verifyJWT,checkIfBlocked, updateUserMetrics, updateAccountDetails);

router.route("/check-unique-username").get(isUsernameUnique);

router.route("/check-is-admin").get(isAdmin);

export default router;
