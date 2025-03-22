import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NavDown, NavUp } from "@/store/slices/themeSlice";

interface ProtectedAuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}

const ProtectedAuthLayout: React.FC<ProtectedAuthLayoutProps> = ({
  children,
  authentication,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const authStatus = useAppSelector((state) => state.user.AuthState) || false;
  const isNavVisible = useAppSelector((state) => state.theme.isNavVisible);
  const userData = useAppSelector((state)=>state.user.userData)
  const dispatch = useAppDispatch();
  // dispatch(NavDown());

  useEffect(() => {
    let intendedPath = sessionStorage.getItem("intendedPath"); 
    const publicPaths = [
      "/login",
      "/sign-up",
      "/",
      "/guest",
      "/send-forgot-password-mail",
      "/verify-forgot-password",
    ];
    const forgotPasswordPaths = [
      "/send-forgot-password-mail",
      "/verify-forgot-password",
    ];
    if (authentication && !authStatus) {
      // If not authenticated, store intended path & redirect to login
      if (
        !publicPaths.includes(location.pathname) &&
        !forgotPasswordPaths.includes(location.pathname)
      ) {
        sessionStorage.setItem("intendedPath", location.pathname);
        navigate("/login", { state: { from: location } });
      }
    } else if (authStatus) {
      // If authenticated and trying to access login/signup/guest, redirect back
      if (["/login", "/sign-up", "/guest"].includes(location.pathname)) {
        const previousPage = sessionStorage.getItem("intendedPath") || "/";
        
        // Ensure we are not navigating to the same page multiple times
        if (previousPage !== location.pathname) {
          navigate(previousPage, { replace: true });
        }
      }
      if (
        !userData?.isEmailVerified &&
        !userData?.isGuest &&
        location.pathname !== "/otp"
      ) {
        // Only redirect to OTP if not already there and not accessing forgot password routes
        if (!forgotPasswordPaths.includes(location.pathname)) {
          navigate("/otp", { state: { from: location } });
        }
      }
  
      if (intendedPath) {
        sessionStorage.removeItem("intendedPath");
  
        // Prevent infinite redirect loop
        if (location.pathname !== intendedPath) {
          navigate(intendedPath, { replace: true });
        }
      }
    }
  
    // Manage navigation visibility
    if (location.pathname === "/" && isNavVisible) {
      dispatch(NavUp());
    } else {
      dispatch(NavDown());
    }
  
    setLoader(false);
  }, [authentication, authStatus, location.pathname, navigate, dispatch, isNavVisible]);

  return loader ? (
    <h1 className="w-full text-center">Loading...</h1>
  ) : (
    <>{children}</>
  );
};

export default ProtectedAuthLayout;
