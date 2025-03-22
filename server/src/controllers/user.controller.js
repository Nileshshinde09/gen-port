import { asyncHandler } from "../utils/asynchHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import {OTP} from "../model/otp.model.js";
import {
  ADMIN_EMAILS,
  EMAIL_OTP_EXPIRY,
  PROFILE_UPDATE_KEY,
  PROFILE_UPDATE_KEY_ENUM,
  REFRESH_TOKEN_SECRET,
} from "../constants.js";
import mongoose from "mongoose";
import { UserActivity } from "../model/userActivity.model.js";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { removeImageContentFromCloudinary } from "../utils/cloudinary.js";
import { Images } from "../model/images.model.js";
import { ForgotPassword } from "../model/forgotPassword.js";
import {emailVerificationContent, forgotPasswordContent, sendMail} from "../utils/mail.js";
const findUsersByUsername = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const username = req.query?.username;
  if (!userId) throw new ApiError(404, "User not found,unauthorised access.");
  if (!username)
    throw new ApiError(400, "Username requirred to check existance of user");

  const escapeRegex = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&amp;");
  };
  const escapedSearchUsername = escapeRegex(username);
  // const users = await User.find({ username: { $regex: `.*${escapedSearchUsername}.*`, $options: 'i' } });
  const users = await User.aggregate([
    {
      $match: {
        username: { $regex: `.*${escapedSearchUsername}.*`, $options: "i" },
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followeeId",
        as: "isFollowing",
        pipeline: [
          {
            $match: {
              followerId: new mongoose.Types.ObjectId(userId),
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followerId",
        as: "isFollower",
        pipeline: [
          {
            $match: {
              followerId: new mongoose.Types.ObjectId(userId),
            },
          },
        ],
      },
    },
    {
      $addFields: {
        isFollowing: {
          $cond: {
            if: {
              $gte: [
                {
                  $size: "$isFollowing",
                },
                1,
              ],
            },
            then: true,
            else: false,
          },
        },

        isFollower: {
          $cond: {
            if: {
              $gte: [
                {
                  $size: "$isFollower",
                },
                1,
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        email: 1,
        isFollowing: 1,
        isFollower: 1,
      },
    },
  ]);
  if (!users)
    throw new ApiError("something went wrong fetching user from database");
  if (!users[0])
    return res.status(404).json(
      new ApiResponse(
        404,
        {
          users: null,
        },
        "User not found !! 🙁🙁"
      )
    );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
      },
      "User found successfully 😊😊"
    )
  );
});

const createProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { dob, avatar, profileBanner, bio } = req.body;
  if (!userId) throw new ApiError(400, "User not found , unauthorised access");
  if ([dob, avatar, profileBanner, bio].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        dob,
        avatar,
        profileBanner,
        bio,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profine created successfully!"));
});
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });
    return {
      refreshToken,
      accessToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and Access Token "
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, gender } = req.body;
  console.log(req.body);

  if (
    [fullName, email, username, password, gender].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUserWithEmail = await User.findOne({
    email,
  });

  if (existedUserWithEmail)
    throw new ApiError(409, "User with email already exists");

  const existedUserWithUsername = await User.findOne({
    username,
  });
  if (existedUserWithUsername)
    throw new ApiError(409, "User with usename already exists");

  const isAdmin = ADMIN_EMAILS.some(
    (email) => email === existedUserWithUsername?.email
  );
  const user = await User.create({
    fullName,
    email,
    password,
    gender,
    username: username.toLowerCase(),
    isAdmin,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user register Successfully"));
});

const isUsernameUnique = asyncHandler(async (req, res) => {
  const username = req.query?.username;
  if (username.trim() == "") {
    throw new ApiError(400, "username is required");
  }
  const existedUserWithUsername = await User.findOne({
    username,
  });
  if (existedUserWithUsername)
    return res
      .status(409)
      .json(new ApiResponse(200, { username }, "User Already exist"));
  return res
    .status(200)
    .json(new ApiResponse(200, { username }, "user name is unique"));
});

const isAdmin = asyncHandler(async (req, res) => {
  const email = req.query?.email;

  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  const existedUserWithEmail = await User.findOne({ email });

  if (!existedUserWithEmail) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  if (existedUserWithEmail.isAdmin) {
    return res
      .status(200)
      .json(new ApiResponse(200, { isAdmin: true }, "User is an admin"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, { isAdmin: false }, "User is not an admin"));
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email && !username)
      throw new ApiError(400, "username or email is required ");

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) throw new ApiError(404, "User with this email id not found!");

    if (ADMIN_EMAILS.some((email) => email === user.email)) {
      if (!user.isAdmin) {
        await User.findByIdAndUpdate(user?._id, { isAdmin: true });
      }
    }

    if (!user)
      return res
        .status(201)
        .json(new ApiResponse(404, {}, "User with this email id not found!"));

    const isPasswordWalid = await user.isPasswordCorrect(password);
    if (!isPasswordWalid)
      return res.status(201).json(
        new ApiResponse(
          401,
          {},
          // "Invalid user credential"
          "Invalid Password."
        )
      );
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user?._id
    );
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    await UserActivity.findOneAndUpdate(
      { userId: user._id },
      { $inc: { logins: 1, requests: 1 } },
      { upsert: true }
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            refreshToken: refreshToken,
            accessToken: accessToken,
          },
          "User logged in successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while user login"
    );
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    await UserActivity.findOneAndUpdate(
      { userId: req.user._id },
      { $inc: { logouts: 1, requests: 1 } },
      { upsert: true }
    );
    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully!"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while logging out user"
    );
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) new ApiError(401, "unauthorised request");

    const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(401, "Invalid refresh Token");
    if (incomingRefreshToken != user?.refreshToken)
      throw new ApiError(401, "Refresh Token expired or used");

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user?._id);

    await UserActivity.findOneAndUpdate(
      { userId: user._id },
      { $inc: { refreshAccessToken: 1, requests: 1 } },
      { upsert: true }
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordWalid = user.isPasswordCorrect(oldPassword);
  if (!isPasswordWalid) throw new ApiError(400, "Invalid old password");
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user)
    throw new ApiError(404, "User not found , unauthorised access.");
  //  await sendNotifications(String(req.user._id),"Hi Myself nilesh",{},"URL",NotificationTypesEnum.FOLLOWERS)
  await User.findByIdAndUpdate(req.user._id, {
    status: "Online",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully!"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const incomingObject = req.body;

  if (!incomingObject) throw new ApiError(404, "Account details not found");
  const filteredObj = {};
  let hasFilledField = false;

  for (const key in incomingObject) {
    if (incomingObject[key] !== "") {
      filteredObj[key] = incomingObject[key];
      hasFilledField = true;
    }
  }
  if (!hasFilledField) throw new ApiError(400, "Atleast one field required");
  if (filteredObj?.email) {
    const existedUserWithEmail = await User.findOne({
      email: filteredObj?.email,
    });
    if (existedUserWithEmail)
      throw new ApiError(409, "User with email already exists");
  }
  if (filteredObj?.username) {
    const existedUserWithUsername = await User.findOne({
      username: filteredObj?.username,
    });
    if (existedUserWithUsername)
      throw new ApiError(409, "User with usename already exists");
  }
  if (!filteredObj) throw new ApiError(400, "data not available");
  if (filteredObj.avatar) {
    filteredObj.avatar = new mongoose.Types.ObjectId(filteredObj.avatar);
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: filteredObj,
    },
    { new: true }
  ).select("-password -refreshToken");
  await UserActivity.findOneAndUpdate(
    { userId: req.user._id },
    { $inc: { profileUpdates: 1, requests: 1 } },
    { upsert: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully!"));
});

const registerGuestUser = asyncHandler(async (req, res) => {
  let { fullName, username } = req.body;

  // Generate random name and username if not provided
  fullName = fullName || faker.person.fullName();
  username = username || `guest_${uuidv4().slice(0, 8)}`;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Set expiry time for the guest account
  const guestExpiresAt = new Date();
  guestExpiresAt.setSeconds(
    guestExpiresAt.getSeconds() +
      parseInt(process.env.GUEST_USER_ACCESS_TOKEN_EXPIRY)
  );

  const guestUser = await User.create({
    fullName,
    username: username.toLowerCase(),
    isGuest: true,
    guestExpiresAt,
  });

  const accessToken = await guestUser.generateAccessToken();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: guestUser, accessToken },
        "Guest account created"
      )
    );
});
const upgradeGuestUser = asyncHandler(async (req, res) => {
  const { userId } = req.user; // Extract userId from JWT
  const { email, password, fullName, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findById(userId);

  if (!user || !user.isGuest) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, {}, "Guest user not found or already upgraded")
      );
  }

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json(
        new ApiResponse(
          404,
          {},
          "Email is already associated with another account"
        )
      );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the guest user to a permanent user
  user.email = email;
  user.password = hashedPassword;
  user.isGuest = false;
  user.guestExpiresAt = null; // Remove expiry time
  if (fullName) user.fullName = fullName;
  if (username) user.username = username;

  await user.save();

  // Generate new access and refresh tokens
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "Guest user upgraded successfully"
      )
    );
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const updates = req.body;
  const updateKeys = Object.keys(updates);
  const isValidUpdate = updateKeys.every((key) =>
    PROFILE_UPDATE_KEY.includes(key)
  );

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "User not found , Unauthorised access! ");
  }
  if (!isValidUpdate) {
    throw new ApiError(401, "Invalid update fields");
  }
  // Process updates dynamically
  updateKeys.forEach((key) => {
    if (
      key === PROFILE_UPDATE_KEY_ENUM.EDUCATION ||
      key === PROFILE_UPDATE_KEY_ENUM.EXPERIENCE ||
      key === PROFILE_UPDATE_KEY_ENUM.PROJECTS ||
      key === PROFILE_UPDATE_KEY_ENUM.SKILLS
    ) {
      if (!Array.isArray(updates[key])) {
        throw new ApiError(400, `${key} should be an array`);
      }
      user[key] = updates[key];
    } else {
      user[key] = updates[key];
    }
  });

  await user.save();
  const resUser = await User.findById(user?._id).select("-password");
  if (!resUser)
    throw new ApiError(
      401,
      "something went wrong while fetching user information!"
    );
  return res
    .status(200)
    .json(new ApiResponse(200, { resUser }, "Profile updated successfully"));
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const avatar = req.body.avatar;
  const avatarId = req.body.avatarId;
  if (!userId) throw new ApiError(401, "unauthorised request.");
  const user = await User.findById(userId);
  if (!user) throw new ApiError(400, "User not found");
  if (!avatar || !avatarId)
    throw new ApiError(404, "Avtar or Avatar id not found.");
  user.avatar = avatar;
  user.avatarId = avatarId;
  await user.save();
  const resUser = await User.findById(user?._id).select("-password");
  if (!resUser) throw new ApiError(401, "something went wrong while");
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: resUser }, "image uploaded successfully.")
    );
});
const removeProfileImage = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "unauthorised request.");
  const user = await User.findById(userId);
  if (!user.avatar || !user.avatarId)
    throw new ApiError(404, "Image not found in database");
  const image = await Images.findById(user.avatarId);
  if (!image) throw new ApiError(404, "image data not founde in database");
  await removeImageContentFromCloudinary(image.public_id);
  await Images.findByIdAndDelete(user.avatarId);
  await User.findByIdAndUpdate(userId, {
    $unset: { avatar: 1, avatarId: 1 },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Image removed successfully"));
});
const validateOTP = asyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    const incomingOTP = req.body?.otp;
    if (!userId) throw new ApiError(404, "User Not Found!");
    if (!incomingOTP) throw new ApiError(404, "OTP Not Found!");
    if (req?.user?.emailVerified)
      return res.status(202).json(
        new ApiResponse(
          202,
          {
            emailVerified: true,
          },
          "Already Email Verified"
        )
      );
    const otp = await OTP.findOne({ userId }).sort({ createdAt: -1 });
    if (!otp) throw new ApiError(404, "Opt not present in database");

    const isExpired = await otp.isOTPExpired();
    if (isExpired)
      return res.status(200).json(
        new ApiResponse(
          400,
          {
            isExpired: true,
          },
          "OTP Expired"
        )
      );
    const isCorrect = await otp.isOTPCorrect(incomingOTP);
    if (!isCorrect)
      return res.status(200).json(
        new ApiResponse(
          400,
          {
            isInvalid: true,
          },
          "OTP Expired"
        )
      );

    await User.findByIdAndUpdate(
      userId,
      {
        isEmailVerified: true,
      },
      {
        new: true,
      }
    );

    return res.status(202).json(
      new ApiResponse(
        202,
        {
          emailVerified: true,
        },
        "Email Verified Successfully!"
      )
    );
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while validating OTP"
    );
  }
});
const generateOTP = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw new ApiError(404, "User Not Found!");
    if (req?.user?.emailVerified)
      return res.status(202).json(
        new ApiResponse(
          202,
          {
            emailVerified: true,
          },
          "Already Email Verified"
        )
      );
    const generateOTP = (length) =>
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
    const otp = generateOTP(6);
    const ExpiryAt = new Date(Date.now() + EMAIL_OTP_EXPIRY * 60 * 1000);
    const generatedOTP = await OTP.create({
      userId,
      otp,
      ExpiryAt,
    });
    if (!generatedOTP)
      throw new ApiError(500, "Something went wrong while generating OTP");
    try {
      const emailContent = emailVerificationContent(
        req.user?.username,
        generatedOTP.otp
      );
      await sendMail(
        emailContent,
        req.user.email,
        "Prep Next Email Verification OTP"
      );
    } catch (error) {
      throw new ApiError(
        500,
        error?.message || "Something went wrong while sending OTP with email"
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "OTP generated Successfully!"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while generating OTP"
    );
  }
});
const sendResetForgotPasswordEmail = asyncHandler(async (req, res) => {
  if (!req) throw new ApiError(404, "Request not found !");
  const { email, passwordResetUrl } = req?.body;
  if (!email) throw new ApiError(404, "Email Not Found!");
  const user = await User.findOne({
    email,
  });
  if (!user)
    return res.status(200).json(new ApiResponse(404, {}, "Email Id not Found"));
  const token = await user.generateResetPasswordSecurityToken();
  const URL = `${passwordResetUrl}${token}`;
  try {
    const emailContent = forgotPasswordContent(user?.username, URL);
    await sendMail(
      emailContent,
      user.email,
      "Prep Next Reset Forgot Password Email."
    );
    const isUserExist = await ForgotPassword.findOne({
      userId: user._id,
    });
    let forgotPasswordResponse = null;
    if (!isUserExist) {
      forgotPasswordResponse = await ForgotPassword.create({
        userId: user._id,
        resetPasswordToken: token,
      });
    } else {
      forgotPasswordResponse = await ForgotPassword.findByIdAndUpdate(
        isUserExist._id,
        {
          resetPasswordToken: token,
        }
      );
    }
    if (forgotPasswordResponse) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Email Send Successfully !"));
    }
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while sending OTP with email"
    );
  }
});

const resetForgotPassword = asyncHandler(async (req, res) => {
  if (!req?.user)
    throw new ApiError(404, "User Not Found, Unauthorised Request !");
  const { newPassword } = req.body;

  console.log("newPassword ::", newPassword);

  if (!newPassword) throw new ApiError(404, "New Password Not Found");
  const user = await User.findById(req.user?._id);
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
const resetForgotPasswordVerification = asyncHandler(async (req, res) => {
  if (!req?.user)
    throw new ApiError(404, "User Not Found, Unauthorised Request!");

  return res
    .status(200)
    .clearCookie("resetforgotpasswordToken")
    .json(new ApiResponse(200, {}, "Page Load Verification Successfully!"));
});

export {
  validateOTP,
generateOTP,
sendResetForgotPasswordEmail,
resetForgotPassword,
resetForgotPasswordVerification,
  updateProfileImage,
  removeProfileImage,
  updateProfile,
  registerGuestUser,
  upgradeGuestUser,
  isAdmin,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  isUsernameUnique,
  createProfile,
  findUsersByUsername,
};
