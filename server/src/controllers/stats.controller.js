import { UserActivity } from "../model/userActivity.model.js";
import { UserMetrics } from "../model/userMetrics.model.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/index.js";

const activeUserHistroyController = asyncHandler(async (req, res) => {
  const isAdmin = req?.user?.isAdmin;
  if (!isAdmin)
    throw new ApiError(
      401,
      "request denied unauthorized access, Admin only request allowed."
    );

  return res.status(200).json(new ApiResponse(200, {}, "App running well!"));
});
export { activeUserHistroyController };
