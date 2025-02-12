import mongoose, { Schema } from "mongoose";
import { SUPPORT_ESSUE_TYPE, SUPPORT_TICKET_STATUS, SUPPORT_TICKET_STATUS_ENUM } from "../constants.js";

SUPPORT_TICKET_STATUS

const supportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueType: {
      type: String,
      required: [true, "Issue type is required"],
      enum: SUPPORT_ESSUE_TYPE,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: SUPPORT_TICKET_STATUS,
      default: SUPPORT_TICKET_STATUS_ENUM.OPEN,
    },
    response: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Support = mongoose.model("Support", supportSchema);