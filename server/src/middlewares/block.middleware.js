import { BlockedUser } from "../model/blockedUser.model.js";
import { User } from "../model/user.model.js";

const checkIfBlocked = async (req, res, next) => {
  try {
    let email = null;
    const userId = req?.user?.id; // Assumes req.user is populated via authentication middleware
    if (!userId) {
      email = req?.body?.email;
    }
    const user = await User.findOne({
      $or: [{ _id: userId }, { email }],
    });
    const blockEntry = await BlockedUser.findOne({
      user: user?._id,
    });
    if (!blockEntry) return next(); // User is not blocked, continue request

    // If block duration has expired, remove from blocked list
    if (blockEntry.blockedUntil && new Date() > blockEntry.blockedUntil) {
      await BlockedUser.findByIdAndDelete(blockEntry._id);
      return next();
    }

    return res.status(403).json({
      message: "Access denied. Your account is blocked.",
      blockType: blockEntry.blockType,
      blockedUntil: blockEntry.blockedUntil,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default checkIfBlocked;
