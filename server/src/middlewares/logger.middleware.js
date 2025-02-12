import { asyncGraphQLHandler } from "../utils/asynchHandler.js";

export const graphQLRequestLogger =async (context) => {
    console.log(`[GraphQL] ${context.req.method} ${context.req.path}`);
    return context;
  }