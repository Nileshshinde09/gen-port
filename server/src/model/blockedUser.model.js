import mongoose, { Schema } from "mongoose";

const blockDurations = {
  ONE_MONTH: 30 * 24 * 60 * 60 * 1000, // 30 days
  THREE_MONTHS: 90 * 24 * 60 * 60 * 1000, // 90 days
  ONE_YEAR: 365 * 24 * 60 * 60 * 1000, // 1 year
  PERMANENT: null, // No expiry date
};

const blockedUserSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,   
    },
    blockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    blockType: {
      type: String,
      enum: ["ONE_MONTH", "THREE_MONTHS", "ONE_YEAR", "PERMANENT"],
      required: true,
    },
    blockedUntil: {
      type: Date,
      default: null, // For permanent blocks
    },
    isBlocked: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

blockedUserSchema.pre("save", function (next) {
  if (this.blockType !== "PERMANENT") {
    this.blockedUntil = new Date(Date.now() + blockDurations[this.blockType]);
  } else {
    this.blockedUntil = null;
  }
  next();
});

export const BlockedUser = mongoose.model("BlockedUser", blockedUserSchema);
