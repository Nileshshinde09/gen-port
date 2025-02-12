import mongoose, { Schema } from "mongoose";
import { FEEDBACK_COMMENT_ENUM } from "../constants.js";

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: null,
      min:FEEDBACK_COMMENT_ENUM.MIN_COMMENT_LEN,
      max:FEEDBACK_COMMENT_ENUM.MAX_COMMENT_LEN
    },
    adminResponse: {
      type: String,
      trim: true,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isMute: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
