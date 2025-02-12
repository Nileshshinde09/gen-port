import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Analytics,
  CreatePortfolio,
  Dashboard,
  Demo,
  Documentation,
  Feedback,
  Guest,
  Home,
  Portfolio,
  Profile,
  Suppport,
  UpdatePortfolio,
} from "./pages";
import { PageNotFound, ProtectedAuthLayout } from "./components";
import App from "./App";
import { AuthenticationLayout, Login, Signup } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
        element={
          <ProtectedAuthLayout authentication={true}>
            <Home />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedAuthLayout authentication={true}>
            <AuthenticationLayout>
              <Login />
            </AuthenticationLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/sign-up"
        element={
          <ProtectedAuthLayout authentication={true}>
            <AuthenticationLayout>
              <Signup />
            </AuthenticationLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/guest"
        element={
          <ProtectedAuthLayout authentication={true}>
            <AuthenticationLayout>
              <Guest />
            </AuthenticationLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/:username/:id"
        element={
          <ProtectedAuthLayout authentication={true}>
            <Portfolio />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/console"
        element={
          <ProtectedAuthLayout authentication={true}>
            <Dashboard />
          </ProtectedAuthLayout>
        }
      >
        <Route path="docs" element={<Documentation />} />
        <Route path="my-profile" index element={<Profile />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="create-portfolio" element={<CreatePortfolio />} />
        <Route path="update-portfolio" element={<UpdatePortfolio />} />
        <Route path="demo-templates" element={<Demo />} />
        <Route path="support" element={<Suppport />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export { router, RouterProvider };
