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
  const dispatch = useAppDispatch();
  dispatch(NavDown());
  // useEffect(() => {
  //   let intendedPath = sessionStorage.getItem("intendedPath");
  
  //   if (authentication && !authStatus) {
  //     // If not authenticated, store intended path & redirect to login
  //     if (!["/login", "/signup", "/", "/guest"].includes(location.pathname)) {
  //       sessionStorage.setItem("intendedPath", location.pathname);
  //       navigate("/login", { state: { from: location } });
  //     }
  //   } else if (authStatus) {
  //     // If authenticated and trying to access login/signup/guest, redirect back
  //     if (["/login", "/signup", "/guest"].includes(location.pathname)) {
  //       const previousPage = sessionStorage.getItem("intendedPath") || "/";
        
  //       // Ensure we are not navigating to the same page multiple times
  //       if (previousPage !== location.pathname) {
  //         navigate(previousPage, { replace: true });
  //       }
  //     }
  
  //     if (intendedPath) {
  //       sessionStorage.removeItem("intendedPath");
  
  //       // Prevent infinite redirect loop
  //       if (location.pathname !== intendedPath) {
  //         navigate(intendedPath, { replace: true });
  //       }
  //     }
  //   }
  
  //   // Manage navigation visibility
  //   if (location.pathname === "/" && isNavVisible) {
  //     dispatch(NavUp());
  //   } else {
  //     dispatch(NavDown());
  //   }
  
  //   setLoader(false);
  // }, [authentication, authStatus, location.pathname, navigate, dispatch, isNavVisible]);

  return loader ? (
    <h1 className="w-full text-center">Loading...</h1>
  ) : (
    <>{children}</>
  );
};

export default ProtectedAuthLayout;
