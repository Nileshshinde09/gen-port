
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
const asyncGraphQLHandler = (resolver) => {
  return async (parent, args, context, info) => {
    try {
      return await resolver(parent, args, context, info);
    } catch (error) {
      console.error("GraphQL Resolver Error:", error.message);
      throw new Error(error.message || "Internal Server Error");
    }
  };
};

export { asyncHandler,asyncGraphQLHandler };