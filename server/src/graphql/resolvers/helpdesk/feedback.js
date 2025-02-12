import { ApiError, ApiResponse } from "../../../utils/index.js";
import { Feedback, Support } from "../../../model/index.js";
import {
  FEEDBACK_COMMENT_ENUM,
  SUPPORT_ESSUE_TYPE,
  SUPPORT_DSC_ENUM,
} from "../../../constants.js";
const getAllUserFeedback = async (_, { isRead = false }, context) => {
  try {
      const feedbackData = await Feedback.find({isRead});

      if (!feedbackData)
      throw new ApiError(
        401,
        "Something went wrong while fetching feedback data"
      );

    return new ApiResponse(200, {}, "Data fetched successfully!");
  } catch (error) {
    console.error("Error fetching user active history:", error);
    throw new ApiError(500, "Failed to fetch user active history");
  }
};
const toggleFeedbackVisibility = async (_, {}, context) => {
  try {
    return new ApiResponse(200, {}, "Data fetched successfully!");
  } catch (error) {
    console.error("Error fetching user active history:", error);
    throw new ApiError(500, "Failed to fetch user active history");
  }
};

const feedback = { getAllUserFeedback, toggleFeedbackVisibility };
export default feedback;
