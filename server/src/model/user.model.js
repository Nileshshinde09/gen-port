import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  GENDER_TYPE,
  RESET_FOROGT_PASSWORD_SECURITY_TOKEN_SECRET,
  RESET_FOROGT_PASSWORD_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} from "../constants.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    guestExpiresAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    avatarId: {

      type: Schema.Types.ObjectId,
      ref: "Images",
      default: null,
    },
    gender: {
      type: String,
      enum: GENDER_TYPE,
      default: null,
    },
    designation: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    fullName: {
      type: String,
      trim: true,
      index: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: null,
    },
    // Education details
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        currentlyStudying: { type: Boolean, default: false },
      },
    ],

    // Experience details
    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        currentlyWorking: { type: Boolean, default: false },
        description: { type: String },
      },
    ],

    // Projects
    projects: [
      {
        name: { type: String, required: true },
        description: { type: String },
        technologies: [{ type: String }],
        socials: [{ type: String }],
        repositoryLink: { type: String, default: null },
        liveDemoLink: { type: String, default: null },
      },
    ],

    // Skills
    skills: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (except for guest users)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isGuest) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.generateResetPasswordSecurityToken = async function(){
  return jwt.sign(
    {
      _id:this._id,
      username:this?.username,
      email:this.email
    },
    RESET_FOROGT_PASSWORD_SECURITY_TOKEN_SECRET,
    {
      expiresIn:RESET_FOROGT_PASSWORD_TOKEN_EXPIRY,
    } 
  )
}
// Check if the password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate an access token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate a refresh token
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Define the User model
export const User = mongoose.model("User", userSchema);
