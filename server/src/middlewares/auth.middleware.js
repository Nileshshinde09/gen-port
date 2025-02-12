import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ACCESS_TOKEN_SECRET } from "../constants.js";
import { asyncGraphQLHandler, asyncHandler } from "../utils/asynchHandler.js";
import { ADMIN_EMAILS } from "../constants.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized request");
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    let user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    if (ADMIN_EMAILS.some((email) => email === user.email)) {
      if (!user.isAdmin) {
        user = await User.findByIdAndUpdate(
          decodedToken?._id,
          { isAdmin: true },
          { new: true, select: "-password -refreshToken" }
        );
      }
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export const verifyJWTGraphql = async (context) => {
  try {
    const { req, res } = context;
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized request");

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    let user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    if (ADMIN_EMAILS.includes(user.email) && !user.isAdmin) {
      user = await User.findByIdAndUpdate(
        decodedToken?._id,
        { isAdmin: true },
        { new: true, select: "-password -refreshToken" }
      );
    }

    return { req, res, user };
  } catch (error) {
    return { req, res, user: null };
  }
};

export const adminMiddleware = async (context) => {
  if (ADMIN_EMAILS.includes(context.user?.email) && !context.user?.isAdmin) {
    const updatedUser = await User.findByIdAndUpdate(
      context.user._id,
      { isAdmin: true },
      { new: true, select: "-password -refreshToken" }
    );

    return { ...context, user: updatedUser };
  }
  return context;
};
