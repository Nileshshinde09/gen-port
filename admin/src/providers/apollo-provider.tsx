import React, { useMemo } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { GRAPHQL_SERVER_URL } from "../constants";

const _ApolloProvider = ({
  children,
  graphqlUrl = GRAPHQL_SERVER_URL, 
}: {
  children: React.ReactNode;
  graphqlUrl?: string;
}) => {
  const client = useMemo(() => {
    return new ApolloClient({
      link: createHttpLink({
        uri: graphqlUrl,
        credentials: "include",
      }),
      cache: new InMemoryCache(),
    });
  }, [graphqlUrl]); 

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default _ApolloProvider;
