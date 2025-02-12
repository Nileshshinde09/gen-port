import { User } from "../model/index.js";

const deleteExpiredGuestUsers = async () => {
  try {
    const now = new Date();
    const result = await User.deleteMany({ isGuest: true, guestExpiresAt: { $lt: now } });
    
    console.log(`Deleted ${result.deletedCount} expired guest accounts.`);
  } catch (error) {
    console.error("Error deleting expired guest accounts:", error);
  }
};

setInterval(deleteExpiredGuestUsers, 5 * 60 * 1000);
