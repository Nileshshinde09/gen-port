import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    // Add other fields you need
    }
  }
`;