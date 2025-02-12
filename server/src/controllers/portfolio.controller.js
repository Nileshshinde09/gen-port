import { Portfolio } from "../model/portfolio.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchHandler.js";

// Create Portfolio
export const createPortfolio = asyncHandler(async (req, res) => {
  const { access, dailyTraffic } = req.body;
  const owner = req.user._id; // Assuming authentication middleware adds user to req

  const portfolio = new Portfolio({ owner, access, dailyTraffic });
  await portfolio.save();

  res
    .status(201)
    .json(new ApiResponse(201, { portfolio }, "Portfolio created successfully"));
});

// Get Portfolio by ID
export const getPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({ _id: req.params.id, owner: req.user._id });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { portfolio }, "Portfolio fetched successfully"));
});

// Get All Portfolios for the Authenticated User
export const giveMyAllPortfolios = asyncHandler(async (req, res) => {
  const portfolios = await Portfolio.find({ owner: req.user._id });

  if (portfolios.length === 0) {
    throw new ApiError(404, "No portfolios found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { portfolios }, "All portfolios fetched successfully"));
});

// Update Portfolio
export const updatePortfolio = asyncHandler(async (req, res) => {
  const { access, dailyTraffic } = req.body;
  const allowedUpdates = ["access", "dailyTraffic"];

  const isValidUpdate = Object.keys(req.body).every((key) =>
    allowedUpdates.includes(key)
  );

  if (!isValidUpdate) {
    throw new ApiError(401, "Invalid update fields");
  }

  const portfolio = await Portfolio.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    { access, dailyTraffic },
    { new: true, runValidators: true }
  );

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { portfolio }, "Portfolio updated successfully"));
});

// Delete Portfolio
export const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Portfolio deleted successfully"));
});
