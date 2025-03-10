import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  ApplicationStats,
  DashboardLayout,
  Profile,
  User,
  UserFeedback,
  UserSupportQueries,
} from "./pages";
import { AuthLayout, Login } from "./pages/Auth";
import { PageNotFound, ProtectedAuthLayout } from "./components";
import App from "./App";
import { AllUsers } from "./pages/Dashboard/Users";
import SignUp from "./pages/Dashboard/Auth/register";
import AppUserStats from "./pages/Dashboard/Stats/user-stat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
        element={
          <ProtectedAuthLayout authentication={true}>
            <PageNotFound />
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedAuthLayout authentication={false}>
            {" "}
            {/* Allow unauthenticated users */}
            <AuthLayout>
              <Login />
            </AuthLayout>
          </ProtectedAuthLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedAuthLayout authentication={true}>
            <DashboardLayout />
          </ProtectedAuthLayout>
        }
      >
        <Route index path="all-users" element={<AllUsers />} />
        <Route path="user-sign-up" element={<SignUp />} />
        <Route path="profile/:userId" element={<Profile/>}/>
        <Route path="user-stats" element={<AppUserStats />} />
        <Route path="user-feedback" element={<UserFeedback />} />
        <Route path="support-queries" element={<UserSupportQueries />} />
        <Route path="application-stats" element={<ApplicationStats />} />
        
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export { router, RouterProvider };
