import { gql, useQuery } from "@apollo/client";
const GET_USERS = gql`
    query ExampleQuery($getUserId: ID!) {
      hello
      getHelloUser(id: $getUserId) {
        name
        email
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      getUserId: 1,
    },
  });