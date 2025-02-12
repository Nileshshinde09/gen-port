import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

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
  const [loader, setLoader] = useState(true);
  const authStatus = useAppSelector((state) => state.user.AuthState) || false;

  useEffect(() => {
    if (authentication) { 
      // Redirect to login if the user is not authenticated
      if (!authStatus && location.pathname !== "/login") {
        navigate("/login", { state: { from: location } });
      }
    } else {
      // Redirect authenticated user to the intended page (not login page)
      if (authStatus) {
        const redirectTo = location.state?.from?.pathname || "/dashboard/users/all-users";
        if (location.pathname !== redirectTo) {
          navigate(redirectTo);
        }
      }
    }
    setLoader(false); // Set loader to false after the logic executes
  }, [authentication, authStatus, location.pathname, navigate]);

  return loader ? (
    <h1 className="w-full text-center">Loading...</h1>
  ) : (
    <>{children}</>
  );
};

export default ProtectedAuthLayout;
