import mongoose, { Schema } from "mongoose";
const userActivitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    logins: { type: Number, default: 0 },
    logouts: { type: Number, default: 0 },
    refreshAccessToken: { type: Number, default: 0 },
    profileUpdates: { type: Number, default: 0 },
    passwordChanges: { type: Number, default: 0 },
    requests: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserActivity = mongoose.model("UserActivity", userActivitySchema);
