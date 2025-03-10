import { asyncHandler } from "../utils/asynchHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { BlockedUser } from "../model/blockedUser.model.js";
import mongoose from "mongoose";
import { UserActivity } from "../model/userActivity.model.js";
import { UserMetrics } from "../model/userMetrics.model.js";

/**
 * Block a user (Admin only)
 */
const blockUser = asyncHandler(async (req, res) => {
  const { blockType } = req.body;
  const {userId} =req.params;
  const adminId = req.user._id;
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
    { blockedBy: adminId, blockType, isBlocked: true },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, blockEntry, "User blocked successfully"));
});

/**
 * Unblock a user manually (Admin only)
 */
const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if(!userId) throw new ApiError(400, "User ID is required");
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

  return res.status(200).json(
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
    .json(new ApiResponse(200, blockEntry, "User blocked successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  // Check if the requesting user is admin
  if (!req.user?.isAdmin) {
      throw new ApiError(403, "Unauthorized: Admin access required");
  }

  const users = await User.aggregate([
      // Stage 1: Lookup blocked user information
      {
          $lookup: {
              from: "blockedusers", // Must match your MongoDB collection name
              localField: "_id",
              foreignField: "user",
              as: "blockInfo"
          }
      },
      // Stage 2: Unwind blockInfo (optional, creates separate docs if multiple blocks)
      {
          $unwind: {
              path: "$blockInfo",
              preserveNullAndEmptyArrays: true // Keep users even if no block info
          }
      },
      // Stage 3: Project the fields we want (inclusion only)
      {
          $project: {
              username: 1,
              email: 1,
              fullName: 1,
              gender: 1,
              avatarUrl: 1,
              bannerUrl: 1,
              bio: 1,
              isAdmin: 1,
              isGuest: 1,
              guestExpiresAt: 1,
              isEmailVerified: 1,
              createdAt: 1,
              updatedAt: 1,
              refreshToken: 1, // Include temporarily to determine status
              blockStatus: {
                  isBlocked: "$blockInfo.isBlocked",
                  blockedBy: "$blockInfo.blockedBy",
                  reason: "$blockInfo.reason",
                  blockType: "$blockInfo.blockType",
                  blockedUntil: "$blockInfo.blockedUntil",
                  blockedAt: "$blockInfo.createdAt"
              }
          }
      },
      // Stage 4: Sort by creation date (newest first)
      {
          $sort: {
              createdAt: -1
          }
      }
  ]);

  // Process users to add status and clean up response
  const processedUsers = users.map(user => ({
      ...user,
      status: user.refreshToken ? "active" : "inactive",
      blockStatus: user.blockStatus?.isBlocked ? {
          isBlocked: user.blockStatus.isBlocked,
          blockedBy: user.blockStatus.blockedBy,
          reason: user.blockStatus.reason,
          blockType: user.blockStatus.blockType,
          blockedUntil: user.blockStatus.blockedUntil,
          blockedAt: user.blockStatus.blockedAt,
          isActiveBlock: user.blockStatus.blockedUntil 
              ? new Date(user.blockStatus.blockedUntil) > new Date()
              : true
      } : {
          isBlocked: false
      },
      // Explicitly remove sensitive fields
      refreshToken: undefined,
      password: undefined,
      __v: undefined
  }));

  return res
      .status(200)
      .json(
          new ApiResponse(
              200,
              {
                  totalUsers: processedUsers.length,
                  users: processedUsers
              },
              "Users retrieved successfully"
          )
      );
});

const getUserById = asyncHandler(async (req, res) => {
  // Check if the requesting user is admin
  if (!req.user?.isAdmin) {
      throw new ApiError(403, "Unauthorized: Admin access required");
  }

  const { userId } = req.params;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid user ID format");
  }

  const user = await User.aggregate([
      // Stage 1: Match the specific user
      {
          $match: {
              _id: new mongoose.Types.ObjectId(userId)
          }
      },
      // Stage 2: Lookup blocked user information
      {
          $lookup: {
              from: "blockedusers", // Must match your MongoDB collection name
              localField: "_id",
              foreignField: "user",
              as: "blockInfo"
          }
      },
      // Stage 3: Unwind blockInfo
      {
          $unwind: {
              path: "$blockInfo",
              preserveNullAndEmptyArrays: true // Keep user even if no block info
          }
      },
      // Stage 4: Project the fields we want (inclusion only)
      {
          $project: {
              username: 1,
              email: 1,
              fullName: 1,
              gender: 1,
              avatarUrl: 1,
              bannerUrl: 1,
              bio: 1,
              isAdmin: 1,
              isGuest: 1,
              guestExpiresAt: 1,
              isEmailVerified: 1,
              createdAt: 1,
              updatedAt: 1,
              refreshToken: 1, // Include temporarily to determine status
              blockStatus: {
                  isBlocked: "$blockInfo.isBlocked",
                  blockedBy: "$blockInfo.blockedBy",
                  reason: "$blockInfo.reason",
                  blockType: "$blockInfo.blockType",
                  blockedUntil: "$blockInfo.blockedUntil",
                  blockedAt: "$blockInfo.createdAt"
              }
          }
      }
  ]);

  // Check if user exists
  if (!user || user.length === 0) {
      throw new ApiError(404, "User not found");
  }

  // Process the single user
  const processedUser = {
      ...user[0],
      status: user[0].refreshToken ? "active" : "inactive",
      blockStatus: user[0].blockStatus?.isBlocked ? {
          isBlocked: user[0].blockStatus.isBlocked,
          blockedBy: user[0].blockStatus.blockedBy,
          reason: user[0].blockStatus.reason,
          blockType: user[0].blockStatus.blockType,
          blockedUntil: user[0].blockStatus.blockedUntil,
          blockedAt: user[0].blockStatus.blockedAt,
          isActiveBlock: user[0].blockStatus.blockedUntil 
              ? new Date(user[0].blockStatus.blockedUntil) > new Date()
              : true
      } : {
          isBlocked: false
      },
      // Explicitly remove sensitive fields
      refreshToken: undefined,
      password: undefined,
      __v: undefined
  };

  return res
      .status(200)
      .json(
          new ApiResponse(
              200,
              {
                  user: processedUser
              },
              "User retrieved successfully"
          )
      );
});
const getUserStats = asyncHandler(async (req, res) => {
  const { credential } = req.params; 
  if (!credential) {
    throw new ApiError(400, "Credential is required");
  }

  const userStats = await UserActivity.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    {
      $match: {
        $or: [
          mongoose.Types.ObjectId.isValid(credential)
            ? { "userData._id": new mongoose.Types.ObjectId(credential) }
            : null,
          { "userData.email": credential },
          { "userData.username": credential },
        ].filter(Boolean),
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        "userData._id": 1,
        "userData.email": 1,
        "userData.username": 1,
        changePassword: 1,
        logins: 1,
        logouts: 1,
        passwordChanges: 1,
        profileUpdates: 1,
        refreshAccessToken: 1,
        requests: 1,
      },
    },
  ]);

  if (!userStats[0]) {
    throw new ApiError(404, "User stats not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userStats[0], "User stats fetched successfully"));
});

// Get User Active History Controller
const getUserActiveHistory = asyncHandler(async (req, res) => {
  let { duration } = req.params; 
 
  duration=Number(duration);
 
  if (!duration || isNaN(duration)) {
    throw new ApiError(400, "Valid duration is required");
  }

  const userMetrics = await UserMetrics.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - duration)),
        },
      },
    },
    {
      $project: {
        totalRequestsToday: 1,
        totalUsers: 1,
        newUsers: 1,
        adminCount: 1,
        date: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, {userMetrics}, "User active history fetched successfully")
    );
});
export {
  getUserStats,
  getUserActiveHistory,
  getUserById,
  blockUser,
  getAllUsers,
  unblockUser,
  checkBlockedStatus,
  getAllUserFeedback,
};
