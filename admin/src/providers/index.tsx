import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "./theme-provider";
import { router, RouterProvider } from "../router";
import ApolloProvider from "./apollo-provider";

const _Provider = (): React.ReactNode => {
  return (
    <StrictMode>
      <ApolloProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  );
};

export default _Provider;
