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
ConsoleLayout,
  Documentation,
  Feedback,
  Guest,
  Home,
  Portfolio,
  Profile,
  Suppport,
  UpdatePortfolio,
  DeployDocs,
} from "./pages";
import { PageNotFound, ProtectedAuthLayout } from "./components";
import App from "./App";
import { AuthenticationLayout, Login, Signup } from "./pages";
import OTP from "./pages/Auth/otp";
import ChangePassword from "./pages/Auth/change-password";
import VerifyForgotPassword from "./pages/Auth/verify-forgot-password";
import SendForgotPasswordMail from "./pages/Auth/send-forgot-password-cred"
import Preview from "./pages/preview";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
        element={
          <ProtectedAuthLayout authentication={false}>
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
        path="/otp"
        element={
          <ProtectedAuthLayout authentication={true}>
            <AuthenticationLayout>
              <OTP />
            </AuthenticationLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedAuthLayout authentication={true}>
            <AuthenticationLayout>
              <ChangePassword />
            </AuthenticationLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/send-forgot-password-mail"
        element={
          <ProtectedAuthLayout authentication={false}>
            <AuthenticationLayout>
              <SendForgotPasswordMail />
            </AuthenticationLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/verify-forgot-password/verify/:token"
        element={
          <ProtectedAuthLayout authentication={false}>
            <AuthenticationLayout>
              <VerifyForgotPassword />
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
          <ProtectedAuthLayout authentication={false}>
            <Portfolio />
          </ProtectedAuthLayout>
        }
      />
        <Route
        path="/p/:_id"
        element={
          <ProtectedAuthLayout authentication={false}>
            <Preview />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/console"
        element={
          <ProtectedAuthLayout authentication={true}>
            <ConsoleLayout />
          </ProtectedAuthLayout>
        }
      >
        <Route path="docs/:type/:id" element={<DeployDocs />} />
        <Route path="docs" element={<Documentation />} />
        <Route path="my-profile" index element={<Profile />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="create-portfolio" element={<CreatePortfolio />} />
        <Route path="update-portfolio" element={<UpdatePortfolio />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="support" element={<Suppport />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export { router, RouterProvider };
