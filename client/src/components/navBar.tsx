import { RiAiGenerate } from "react-icons/ri";
import { Flower } from "lucide-react";
import { cn, Utils } from "@/lib/utils";
import { Button } from "./ui/button";
import { useTheme } from "./ui/theme-provider";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/userSlice";
const _NavigationMenu = () => {
  const router = useNavigate();
  const { isNavVisible, isNavBody } = useAppSelector((state) => state.theme);
  const { AuthState } = useAppSelector((state) => state.user);
const dispatch = useAppDispatch();
  if (!isNavVisible) return;
  const handleNav = (url: string) => {
    router(url);
  };
  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn(
        "absolute py-[14px] pr-[14px] pl-[22px] right-6 top-0 z-[99999] flex justify-between w-full max-w-7xl mt-5 left-1/2 -translate-x-1/2",
        isNavBody && "bg-black  rounded-full border-border border"
      )}
    >
      <div>
        <h1 className="font-thin text-2xl flex gap-2 items-center "><RiAiGenerate size={30}/><span>GenPort.</span> </h1>
      </div>
      {!AuthState ? (
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "tween", stiffness: 300 }}
          >
            <Button
              onClick={() => handleNav("/guest")}
              variant={"outline"}
              className="rounded-3xl"
            >
              <span className="flex items-baseline gap-2">Guest</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "tween", stiffness: 300 }}
          >
            <Button
              onClick={() => handleNav("/login")}
              variant={"outline"}
              className="rounded-3xl"
            >
              <span className="flex items-baseline gap-2">Log In</span>
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "tween", stiffness: 300 }}
          >
            <Button
              onClick={() => handleLogout()}
              variant={"outline"}
              className="rounded-3xl"
            >
              <span className="flex items-baseline gap-2">Log Out</span>
            </Button>
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
};

export default _NavigationMenu;

export const Toolkit = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={Utils.cn(
            "py-3 w-[20rem]",
            theme === "dark" ? "dark" : null
          )}
        >
          <div className="flex gap-3">
            <Flower
              className="mt-0.5 shrink-0 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <div className="space-y-1">
              <p className="text-[13px] font-medium">Guest Account Button</p>
              <p className="text-xs text-muted">
                A button for guest users to explore the platform with limited
                trial features, offering a quick and seamless experience without
                requiring a full account setup.
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
