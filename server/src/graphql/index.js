import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cookieParser from "cookie-parser";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schema/index.js";
import { ApiError } from "../utils/ApiError.js";
import {
  graphQLRequestLogger,
  adminMiddleware,
  verifyJWTGraphql,
  applyMiddlewares,
} from "../middlewares/index.js";

const init = async (app) => {
  try {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true,
    });

    await apolloServer.start();

    app.use(
      "/graphql",
      cookieParser(),
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => {
          return await applyMiddlewares(
            [graphQLRequestLogger, verifyJWTGraphql, adminMiddleware], 
            req,
            res
          );
        },
      })
    );

    console.log("Apollo Server is running on /graphql",);
  } catch (error) {
    console.error("Error initializing Apollo Server:", error.message);
    throw new ApiError(500, "Error initializing Apollo Server!");
  }
};

export { init };
