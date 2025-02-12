import { UserActivity, UserMetrics } from "../../../model/index.js";
import { ApiError, ApiResponse } from "../../../utils/index.js";

const getUserActiveHistory = async (_, { duration }, context) => {
  try {
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
        }
      }
    ]);
console.log('====================================');
console.log(userMetrics);
console.log('====================================');
    
    return new ApiResponse(200, userMetrics , "Data fetched successfully!");
  } catch (error) {
    console.error("Error fetching user active history:", error);
    throw new ApiError(500,"Failed to fetch user active history");
  }
};

const applicationStats = { getUserActiveHistory };
export default applicationStats;
