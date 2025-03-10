import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import { Toaster } from "./components/ui/toaster";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Auth } from "./services";
import { login } from "./store/slices/userSlice";
import { Toaster as SonnarToaster } from "sonner";
const App = (): React.ReactNode => {
  const authState = useAppSelector((state) => state.user.AuthState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authState) return;
    (async () => {
      try {
        const user: any = await Auth.getUser();
        if (user?.data?.success) dispatch(login(user?.data?.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [authState]);
  return (
    <main className="w-full h-full">
        <Navbar />
        <Outlet />
        <Toaster/>
        <SonnarToaster richColors />
      </main>
  );
};

export default App;




