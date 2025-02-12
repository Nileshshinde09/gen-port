import { gql } from "apollo-server-express";
import HelloQuery from "./hello.js";
import getUserActiveHistory from "./stats/appliction-user-history.schema.js";
// Define your GraphQL schema
export const typeDefs = gql`
  type Query {
    ${HelloQuery}
    ${getUserActiveHistory.query}
  }

  #Types 
  ${getUserActiveHistory.types}
  
  type User {
      id: ID!
      name: String
      email: String
  }

  
`;
