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
  updateProfileImage,
  removeProfileImage,
} from "../controllers/user.controller.js";
import { isAdminMiddleware, verifyJWT } from "../middlewares/auth.middleware.js";
import { updateUserMetrics } from "../middlewares/userMetrics.middleware.js";
import checkIfBlocked from "../middlewares/block.middleware.js";
import { setProfileImage } from "../middlewares/Image.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { blockUser, checkBlockedStatus, getAllUsers, getUserActiveHistory, getUserById, getUserStats, unblockUser } from "../controllers/admin.controller.js";

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

router.route("/update-account-image").post(verifyJWT,checkIfBlocked, updateUserMetrics,upload.single('file'),setProfileImage, updateProfileImage);

router.route("/remove-account-image").delete(verifyJWT,checkIfBlocked,removeProfileImage)

router.route("/check-unique-username").get(isUsernameUnique);

router.route("/check-is-admin").get(isAdmin);

//-----------------------------------admin routes--------------------------------------------------------------------------------------------------

router.use(verifyJWT,isAdminMiddleware)

router.route("/get-all-users").get(getAllUsers);

router.route("/get-user-by-id/:userId").get(getUserById);

router.route("/block-user/:userId").post(blockUser);

router.route("/unblock-user/:userId").post(unblockUser);

router.route("/check-blocked-status/:userId").get(checkBlockedStatus);

router.route("/register").post(registerUser);

router.route("/get-user-stats/:credential").get(getUserStats)

router.route("/get-app-activity-history/:duration").get(getUserActiveHistory)

export default router;
