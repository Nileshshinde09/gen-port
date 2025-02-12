import path from "path";
import { fileURLToPath } from "url";
export const DATABASE_NAME = String(process.env.DATABASE_NAME);
export const GLOBAL_API_RATELIMITER_REQUEST_COUNT = Number(
  process.env.GLOBAL_API_RATELIMITER_REQUEST_COUNT
);
export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET);
export const REFRESH_TOKEN_SECRET = String(process.env.REFRESH_TOKEN_SECRET);
export const ACCESS_TOKEN_EXPIRY = String(process.env.ACCESS_TOKEN_EXPIRY);
export const REFRESH_TOKEN_EXPIRY = String(process.env.REFRESH_TOKEN_EXPIRY);
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
export const PORTFOLIO_ACCESS_TOKEN_SECRET = String(process.env.PORTFOLIO_ACCESS_TOKEN_SECRET)
export const PORTFOLIO_ACCESS_TOKEN_EXPIRY = String(process.env.PORTFOLIO_ACCESS_TOKEN_EXPIRY)



  .split(",")
  .map((val) => val.trim())
  .filter((val) => val !== "");

// -----------Image Converter Values--------------------------------------------------------------

export const VALID_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".webp",
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export constants
export const INPUTDIRECTORY = path.resolve(__dirname, "public", "users-logo");

// -----------------------------------------------------------------------------------
export const GENDER_TYPE = ["male", "female", "others"];

export const ACCESSIBILITY_TYPES_ENUM = Object.freeze({
  PRIVATE: "private",
  PUBLIC: "public",
  ADMIN_ONLY: "admin-only",
});

export const FEEDBACK_COMMENT_ENUM = Object.freeze({
  MAX_COMMENT_LEN: 600,
  MIN_COMMENT_LEN: 4,
  TESTIMONIALS_COUNT: 20,
});
export const SUPPORT_ESSUE_TYPE_ENUM = Object.freeze({
  TECHNICAL: "Technical",
  ACCOUNT: "Account",
  OTHER: "Other",
});
export const SUPPORT_ESSUE_TYPE = Object.values(SUPPORT_ESSUE_TYPE_ENUM);

export const SUPPORT_TICKET_STATUS_ENUM = Object.freeze({
  OPEN: "Open",
  INPROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
});
export const SUPPORT_TICKET_STATUS = Object.values(SUPPORT_TICKET_STATUS_ENUM);
export const SUPPORT_DSC_ENUM = Object.freeze({
  MAX_DSC_LEN: 600,
  MIN_DSC_LEN: 4,
});

export const PROFILE_UPDATE_KEY_ENUM = Object.freeze({
  FULLNAME: "fullName",
  GENDER: "gender",
  DESIGNATION: "designation",
  BIO: "bio",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  SKILLS: "skills",
});
export const PROFILE_UPDATE_KEY = Object.values(PROFILE_UPDATE_KEY_ENUM);
