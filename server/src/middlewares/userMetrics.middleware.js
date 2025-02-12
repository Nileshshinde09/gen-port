import { User } from "../model/user.model.js";
import { UserActivity } from "../model/userActivity.model.js";
import { UserMetrics } from "../model/userMetrics.model.js";
import { asyncHandler } from "../utils/asynchHandler.js";
export const updateUserMetrics = asyncHandler(async (req,_, next) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const totalUsers = await User.countDocuments();
  const newUsers = await User.countDocuments({ createdAt: { $gte: today } });
  const activeUsers = await User.countDocuments({ updatedAt: { $gte: today } });
  const adminCount = await User.countDocuments({ isAdmin: true });

  await UserMetrics.findOneAndUpdate(
    { date: today },
    { 
      totalUsers, newUsers, activeUsers, adminCount,
      $inc: { totalRequestsToday: 1, totalRequestsThisMonth: 1, totalRequestsThisYear: 1 }
    },
    { upsert: true, new: true }
  );

  if (req.user) {
    await UserActivity.findOneAndUpdate(
      { userId: req.user._id },
      { $inc: { requests: 1 } },
      { upsert: true, new: true }
    );
  }

  next();
});
