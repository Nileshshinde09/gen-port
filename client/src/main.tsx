import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { router, RouterProvider } from "./router.tsx"
import { ThemeProvider } from "./components/ui/theme-provider.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URL, // GraphQL endpoint from environment variable
  cache: new InMemoryCache(), // Cache for query results
});

// Render the application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
