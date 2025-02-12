import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components";
import { Auth } from "./services";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { login } from "./store/slices/userSlices";
const App = (): React.ReactElement => {
  
  const authState = useAppSelector((state) => state.user.AuthState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authState) return;
    (async () => {
      try {
        const user: any = await Auth.getUser();
        if (user.success) dispatch(login(user?.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [authState]);
  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
