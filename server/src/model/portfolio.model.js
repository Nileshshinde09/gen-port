import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import {
  PORTFOLIO_ACCESS_TOKEN_SECRET,
  PORTFOLIO_ACCESS_TOKEN_EXPIRY,
} from "../constants.js";

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
    isDeployed: {
      type: Boolean,
      default: false,
    },
    portfolioId: {
      type: String,
      required: true,
    },
    portfolioAccessToken: {
      type: String,
      default: null,
    },
    isAvatarVisible: {
      type: Boolean,
      default: false,
    },
    visibleFields: {
      type: Object,
      default: {
        "_id": 1,
        "username": 1,
        "email": 1,
        "avatar": 1,
        "designation": 1,
        "location": 1,
        "fullName": 1, 
        "bio": 1,
        "skills": 1,
        "education": 1,
        "experience": 1,
        "projects": 1    
      }
    }
    ,
    access: {
      type: String,
      enum: PORTFOLIO_ACCESS,
      default: PORTFOLIO_ACCESS_ENUM.PRIVATE,
    },
    dailyTraffic: {
      date: {
        type: Date,
        default: new Date()
      },
      count: {
        type: Number,
        default: 0
      }
    },
  },
  {
    timestamps: true,
  }
);

// Generate an access token for portfolio authentication
portfolioSchema.methods.generatePortfolioAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      owner: this.owner, // Only storing owner ID
      portfolioId : this.portfolioId,
    },
    PORTFOLIO_ACCESS_TOKEN_SECRET,
    {
      expiresIn: PORTFOLIO_ACCESS_TOKEN_EXPIRY,
    }
  );
};

portfolioSchema.methods.incrementDailyTraffic = async function() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    
    // Check if dailyTraffic.date exists and is from today
    if (!this.dailyTraffic.date || this.dailyTraffic.date < today) {
      // Reset for new day
      this.dailyTraffic = {
        date: today,
        count: 1
      };
    } else {
      // Increment existing count
      this.dailyTraffic.count += 1;
    }
    
    await this.save();
    return this.dailyTraffic.count;
  } catch (error) {
    throw new Error("Failed to increment daily traffic: " + error.message);
  }
};

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);


