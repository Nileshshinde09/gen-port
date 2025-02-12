import { useState } from "react";
import { gql, useQuery, ApolloError } from "@apollo/client";

// GraphQL query
const GET_APPLICATION_USER_HISTORY = gql`
  query ExampleQuery($duration: Int!) {
    getUserActiveHistory(duration: $duration) {
      data {
        # totalUsers
        # newUsers
        # adminCount
        totalRequestsToday
        date
      }
    }
  }
`;

// Define types based on the query's return shape
interface UserHistoryData {
  totalRequestsToday?: number;
  totalUsers?: number;
  newUsers?: number;
  adminCount?: number;
  date?: string;
}

interface GetUserActiveHistoryResponse {
  getUserActiveHistory: {
    data: Array<UserHistoryData>;
  };
}

interface UseApplicationHistoryReturn {
  loading: boolean;
  error: ApolloError | undefined;
  data: GetUserActiveHistoryResponse | undefined;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const useApplicationHistory = (): UseApplicationHistoryReturn => {
  const [duration, setDuration] = useState<number>(90);
  const { loading, error, data } = useQuery<GetUserActiveHistoryResponse>(GET_APPLICATION_USER_HISTORY, {
    variables: { duration },
  });

  return { loading, error, data, setDuration };
};

export {useApplicationHistory};
