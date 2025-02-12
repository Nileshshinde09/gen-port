import { logInSchema, signUpSchema } from "./schema";
import { ApiError } from "../utils/ApiError";

const loginAuthenticationValidator = (req, res, next) => {
  try {
    logInSchema.parse(req.body);
    next();
  } catch (err) {
    const errors = err.errors.map((error) => ({
      path: error.path[0],
      message: error.message,
    }));

    return res.status(400).json(new ApiError(400, "invalid input", errors));
  }
};

const signUpAuthenticationValidator = (req, res, next) => {
  try {
    signUpSchema.parse(req.body);
    next();
  } catch (err) {
    const errors = err.errors.map((error) => ({
      path: error.path[0],
      message: error.message,
    }));
    return res.status(400).json(new ApiError(400, "invalid input", errors));
  }
};

export { loginAuthenticationValidator, signUpAuthenticationValidator };
