import { asyncHandler } from "../utils/asynchHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { BlockedUser } from "../models/blockedUser.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynchHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { BlockedUser } from "../models/blockedUser.model.js";

/**
 * Block a user (Admin only)
 */
const blockUser = asyncHandler(async (req, res) => {
  const { userId, blockType, reason } = req.body;
  const adminId = req.user.id;

  if (
    !["ONE_MONTH", "THREE_MONTHS", "ONE_YEAR", "PERMANENT"].includes(blockType)
  ) {
    throw new ApiError(400, "Invalid block type");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const blockEntry = await BlockedUser.findOneAndUpdate(
    { user: userId },
    { blockedBy: adminId, blockType, reason, isBlocked: true },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, blockEntry, "User blocked successfully")
    );
});

/**
 * Unblock a user manually (Admin only)
 */
const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const blockEntry = await BlockedUser.findOneAndDelete({ user: userId });

  if (!blockEntry) {
    throw new ApiError(404, "User is not blocked");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User unblocked successfully"));
});

/**
 * Check if a user is blocked
 */
const checkBlockedStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const blockEntry = await BlockedUser.findOne({ user: userId });

  if (!blockEntry) {
    return res
      .status(200)
      .json(new ApiResponse(200, { isBlocked: false }, "User is not blocked"));
  }

  if (blockEntry.blockedUntil && new Date() > blockEntry.blockedUntil) {
    await BlockedUser.findByIdAndDelete(blockEntry._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isBlocked: false }, "User is not blocked"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          isBlocked: true,
          blockType: blockEntry.blockType,
          blockedUntil: blockEntry.blockedUntil,
        },
        "User is blocked"
      )
    );
});

const getAllUserFeedback = asyncHandler(async (req, res) => {
  const { userId, blockType, reason } = req.body;
  const adminId = req.user.id;

  if (
    !["ONE_MONTH", "THREE_MONTHS", "ONE_YEAR", "PERMANENT"].includes(blockType)
  ) {
    throw new ApiError(400, "Invalid block type");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const blockEntry = await BlockedUser.findOneAndUpdate(
    { user: userId },
    { blockedBy: adminId, blockType, reason, isBlocked: true },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, blockEntry, "User blocked successfully")
    );
});
export { blockUser, unblockUser, checkBlockedStatus,getAllUserFeedback };