import {
  adminMiddleware,
  verifyJWT,
  verifyJWTGraphql,
} from "./auth.middleware.js";
import checkIfBlocked from "./block.middleware.js";
import { graphQLRequestLogger } from "./logger.middleware.js";
import { limiter } from "./rateLimiter.middleware.js";
export {
  limiter,
  adminMiddleware,
  verifyJWT,
  verifyJWTGraphql,
  checkIfBlocked,
  graphQLRequestLogger,
};

export const applyMiddlewares = async (middlewares, req, res) => {
  let context = { req, res, user: null }; // Initial context

  for (const middleware of middlewares) {
    try {
      context = await middleware(context); // Update the same context object
    } catch (error) {
      console.error("Middleware Error:", error.message);
      return { req, res, user: null }; // If any middleware fails, return empty context
    }
  }

  return context; // Return the final context after all middlewares have executed
};
