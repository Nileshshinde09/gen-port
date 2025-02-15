import mongoose from "mongoose";
import { PORTFOLIO_ACCESS_TOKEN_SECRET, REQUIRED_VISIBLE_FIELDS } from "../constants.js";
import { Portfolio, PORTFOLIO_ACCESS_ENUM } from "../model/portfolio.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchHandler.js";
import jwt from "jsonwebtoken";

const generatePortfolioAccessTokens = async (portfolioId) => {
  try {
    
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      throw new ApiError(404, "Portfolio not found");
    }
    const portfolioAccessToken = await portfolio.generatePortfolioAccessToken();
    portfolio.portfolioAccessToken = portfolioAccessToken;
    await portfolio.save({
      validateBeforeSave: false,
    });
    return {
      portfolioAccessToken
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating portfolio access token",
      error
    );
  }
};

//----------------------------------------------------------------------------------------------------------------------------------

// Create Portfolio
export const createPortfolio = asyncHandler(async (req, res) => {
  const { portfolioId,isDeployed=false } = req.body;
  if(!portfolioId){
    throw new ApiError(400, "PortfolioId is required");
  }
  const owner = req.user._id; // Assuming authentication middleware adds user to req
  const portfolio = await Portfolio.create({ 
    isDeployed,
    owner,
    portfolioId
  });
  const { portfolioAccessToken } = await generatePortfolioAccessTokens(portfolio._id);
  portfolio.portfolioAccessToken = portfolioAccessToken;
  await portfolio.save();

  res
    .status(201)
    .json(new ApiResponse(201, { portfolio }, "Portfolio created successfully"));
});
//----------------------------------------------------------------------------------------------------------------------------------

// Get Portfolio by ID
export const getPortfolio = asyncHandler(async (req, res) => {
  const { portfolioId } = req.params;     
  console.log("portfolioId", portfolioId);
  
  if(!portfolioId){
    throw new ApiError(400, "Portfolio ID required");
  }
  const portfolio = await Portfolio.findById(portfolioId);

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }
    if(portfolio.owner.toString() !== req.user._id.toString()){
              
    }

  res
    .status(200)
    .json(new ApiResponse(200, { portfolio }, "Portfolio fetched successfully"));
});
//----------------------------------------------------------------------------------------------------------------------------------
export const getPublicPortfolio = asyncHandler(async (req, res) => {
  const { portfolioId, portfolioAccessToken } = req.params; 
  if(!portfolioId || !portfolioAccessToken){
    throw new ApiError(400, "Portfolio ID and portfolio access token are required");
  }
  const token = jwt.verify(portfolioAccessToken, PORTFOLIO_ACCESS_TOKEN_SECRET);
  if(!token){
    throw new ApiError(401, "Invalid portfolio access token");
  }
  const portfolio = await Portfolio.findOne({ _id:token._id});
  if(portfolio.access === PORTFOLIO_ACCESS_ENUM.PRIVATE){
    throw new ApiError(401, "Portfolio is private");
  }
  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }
  await portfolio.incrementDailyTraffic();
  res.status(200).json(new ApiResponse(200, { portfolio }, "Portfolio fetched successfully"));
}); 
//----------------------------------------------------------------------------------------------------------------------------------

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
//----------------------------------------------------------------------------------------------------------------------------------

// Update Portfolio
export const updatePortfolio = asyncHandler(async (req, res) => {
  if(!req.params.portfolioId){
    throw new ApiError(400, "Portfolio ID required");
  } 
  const { access, isAvatarVisible, visibleFields } = req.body;
  
  const allowedUpdates = ["access", "isAvatarVisible", "visibleFields"];

  // Validate input fields
  const isValidUpdate = Object.keys(req.body).every((key) =>
    allowedUpdates.includes(key)
  );

  if (!isValidUpdate) {
    throw new ApiError(400, "Invalid update fields");
  }

  // Validate visibleFields if present
  if (visibleFields) {
    // Check if all required fields are present
    const missingFields = REQUIRED_VISIBLE_FIELDS.filter(field => 
      !Object.hasOwn(visibleFields, field)
    );

    if (missingFields.length > 0) {
      throw new ApiError(400, `Missing required fields in visibleFields: ${missingFields.join(", ")}`);
    }

    // Validate that all values are either 0 or 1
    const isValidVisibleFields = Object.values(visibleFields).every(
      (value) => value === 0 || value === 1
    );
    if (!isValidVisibleFields) {
      throw new ApiError(400, "visibleFields values must be either 0 or 1");
    }
  }

  const updateData = {};
  if (access) updateData.access = access;
  if (typeof isAvatarVisible === "boolean") updateData.isAvatarVisible = isAvatarVisible;
  if (visibleFields) updateData.visibleFileds = visibleFields;

  const portfolio = await Portfolio.findOneAndUpdate(
    { 
      _id: req.params.portfolioId, 
      owner: req.user._id 
    },
    { $set: updateData },
    { 
      new: true, 
      runValidators: true 
    }
  );

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { portfolio }, "Portfolio updated successfully"));
});
//----------------------------------------------------------------------------------------------------------------------------------

// Delete Portfolio
export const deletePortfolio = asyncHandler(async (req, res) => {
  if(!req.params.portfolioId){
    throw new ApiError(400, "Portfolio ID required");
  }
  
  const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.portfolioId, owner: req.user._id });
  if(req.user._id.toString() !== portfolio.owner.toString()){
    throw new ApiError(403, "You are not authorized to delete this portfolio");
  }

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Portfolio deleted successfully"));
});
//----------------------------------------------------------------------------------------------------------------------------------
