import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { NavUp } from "../../store/slices/themeSlice";
import { BackgroundLines } from "../../components/ui/background-lines";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactNode => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NavUp());
  }, []);
  return (
    <>
      <BackgroundLines className="">
        <div className="z-[999] flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </BackgroundLines>
    </>
  );
};

export default AuthLayout;
