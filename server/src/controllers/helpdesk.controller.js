import { ApiResponse, ApiError, asyncHandler } from "../utils/index.js";
import { Feedback, Support, User } from "../model/index.js";
import {
  FEEDBACK_COMMENT_ENUM,
  SUPPORT_ESSUE_TYPE,
  SUPPORT_DSC_ENUM,
} from "../constants.js";
const storeFeedback = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Access denied, User not found!");
  const { rating, comment } = req.body;
  if (!rating || !comment) throw new ApiError(404, "feedback data not found!");
  if (
    Number(rating) <= 0 ||
    Number(rating) > 5 ||
    typeof comment !== "string"
  ) {
    throw new ApiError(422, "Unsupported format data.");
  }
  if (
    comment.length < FEEDBACK_COMMENT_ENUM.MIN_COMMENT_LEN ||
    comment.length > FEEDBACK_COMMENT_ENUM.MAX_COMMENT_LEN
  ) {
    throw new ApiError(
      422,
      "Length of string must be greater than 6 and less than 600."
    );
  }
  const feedbackRes = await Feedback.create({
    user: user?._id,
    rating,
    comment,
  });
  if (!feedbackRes)
    throw new ApiError(
      500,
      "Something went wrong while inserting feedback into database"
    );
  const feedbackData = await Feedback.findById(feedbackRes?._id).select(
    "-adminResponse -isMute"
  );
  if (!feedbackData)
    throw new ApiError(
      500,
      "Something went wrong while fetching feedback data."
    );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        data: feedbackData,
      },
      "feedback submitted successfully!"
    )
  );
});

const getFeedbackTestimonials = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Access denied, User not found!");
  const feedbackTestimonials = await Feedback.aggregate([
    {
      $match: {
        isMute: true,
      },
    },
    {
      $sample: { size: 20 },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        rating: 1,
        comment: 1,
        isRead: 1,
        "userDetails._id": 1,
        "userDetails.username": 1,
        "userDetails.fullName": 1,
      },
    },
  ]);
  if (!feedbackTestimonials)
    throw new ApiError(
      401,
      "Something went wrong while fetching testimonials from database."
    );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        data: feedbackTestimonials,
      },
      "testimonials fetched successfully!"
    )
  );
});

const raiseSupportTicket = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Access denied, User not found!");
  const { issueType, content } = req.body;
  if (!issueType || !content)
    throw new ApiError(404, "ticket data not found!");
  if (!SUPPORT_ESSUE_TYPE.includes(issueType)) {
  }
  if (
    content.length < SUPPORT_DSC_ENUM.MIN_DSC_LEN ||
    content.length > SUPPORT_DSC_ENUM.MAX_DSC_LEN
  ) {
    throw new ApiError(
      422,
      "Length of string must be greater than 6 and less than 600."
    );
  }
  const ticketRes = await Support.create({
    user: user?._id,
    content,
    issueType,
  });
  if (!ticketRes)
    throw ApiError(401, "Something went wrong while storing support data.");
  const myTicketData = await Support.find({
    user: user?._id,
  });
  if (!myTicketData)
    throw new ApiError(
      401,
      "Something went wrong while fetching ticket data from database."
    );
  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: myTicketData }, "ticket raised successfully!")
    );
});

const getMyTickets = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new ApiError(401, "Access denied, User not found!");

  const myTicketData = await Support.find({
    user: user?._id,
  });
  if (!myTicketData)
    throw new ApiError(
      401,
      "Something went wrong while fetching ticket data from database."
    );
  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: myTicketData }, "tickets fetched successfully!")
    );
});
//------------------------------------Admin Panel------------------------------------------------

const getAllTickets = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "Access denied, Admin not found!");
  const isAdmin = await User.findById(userId).select("isAdmin");
  if(!isAdmin) throw new ApiError(401, "Access denied, Only Admin can access!");

  const ticketData = await Support.aggregate([
    {
      $match: {}
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {$unwind:{
      path: "$user",
    }
  },
  {
    $project: {
      "user._id": 1,
      "user.username": 1,
      "user.fullName": 1,
      "user.email": 1,
      "user.avatarUrl": 1,
      content: 1,
      issueType: 1,
      status: 1,
      createdAt: 1,
    }
  }
  ])
  if (!ticketData)
    throw new ApiError(
      401,
      "Something went wrong while fetching ticket data from database."
    );
  return res
    .status(200)
    .json(
      new ApiResponse(200, ticketData , "tickets fetched successfully!")
    );
});
const changeTicketState = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "Access denied, Admin not found!");
  const isAdmin = await User.findById(userId).select("isAdmin");
  if(!isAdmin) throw new ApiError(401, "Access denied, Only Admin can access!");
  const ticketId = req.params.ticketId;
  if(!ticketId) throw new ApiError(400, "Ticket ID is required");
  if(!req.body.status) throw new ApiError(400, "Status is required");
  const ticket = await Support.findByIdAndUpdate(ticketId,{
    status: req.body.status
  },{new: true});
  if(!ticket) throw new ApiError(404, "Ticket not found");
  return res.status(200).json(new ApiResponse(200, {ticket}, "Ticket status changed successfully"));

})

const getAllFeedbacks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "Access denied, Admin not found!");
  const isAdmin = await User.findById(userId).select("isAdmin");
  if(!isAdmin) throw new ApiError(401, "Access denied, Only Admin can access");
  const feedbacks = await Feedback.find().populate("user", ["username", "fullName", "avatarUrl", "email","_id"]);
  if(!feedbacks) throw new ApiError(404, "Feedbacks not found");
  return res.status(200).json(new ApiResponse(200, {feedbacks}, "Feedbacks fetched successfully"));

})
export {
  changeTicketState,
  storeFeedback,
  getAllTickets,
  getFeedbackTestimonials,
  raiseSupportTicket,
  getMyTickets,
  getAllFeedbacks
};
