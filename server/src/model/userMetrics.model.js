import mongoose, { Schema } from "mongoose";

const userMetricsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
      default: () => new Date().setHours(0, 0, 0, 0),
    },
    totalUsers: { type: Number, default: 0 },
    newUsers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    adminCount: { type: Number, default: 0 },
    totalRequestsToday: { type: Number, default: 0 },
    totalRequestsThisMonth: { type: Number, default: 0 },
    totalRequestsThisYear: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserMetrics = mongoose.model("UserMetrics", userMetricsSchema);
