import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { PORTFOLIO_ACCESS_TOKEN_SECRET, PORTFOLIO_ACCESS_TOKEN_EXPIRY } from "../constants.js";

export const PORTFOLIO_ACCESS_ENUM = Object.freeze({
  PUBLIC: "public",
  PRIVATE: "private",
});

export const PORTFOLIO_ACCESS = Object.values(PORTFOLIO_ACCESS_ENUM);

const portfolioSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    key: {
      type: String,
      default: null,
    },
    access: {
      type: String,
      enum: PORTFOLIO_ACCESS,
      default: PORTFOLIO_ACCESS_ENUM.PUBLIC,
    },
    dailyTraffic: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Generate an access token for portfolio authentication
portfolioSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      owner: this.owner, // Only storing owner ID
      access: this.access,
    },
    PORTFOLIO_ACCESS_TOKEN_SECRET,
    {
      expiresIn: PORTFOLIO_ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
