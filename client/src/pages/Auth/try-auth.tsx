import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Flower } from "lucide-react";
import { Utils } from "@/lib/utils";
import { useTheme } from "@/components/ui/theme-provider";
export default function TryAuth() {
  const navigate = useNavigate();
  return (
    
          <div className="-mt-40 flex flex-col justify-center item-center w-full h-full">

          <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-10 text-neutral-950 dark:text-neutral-100">
          Secure Your Access with Try-Auth
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center mx-auto text-neutral-950 dark:text-neutral-100">
          Experience Reliable Authentication with Ease
          </p>
          <Tabs  className="mt-20 mx-auto dark">
            <TabsList className="rounded-md h-[3rem]">
              <TabsTrigger value="tab-1" onClick={() => navigate("/login")} className="rounded-md w-[5rem] h-[2.5rem]">
                <span className="font-light text-base">Sign In</span>
              </TabsTrigger>
              <TabsTrigger value="tab-2" onClick={() => navigate("/signup")} className="rounded-md w-[5rem] h-[2.5rem]">
                <span className="font-light text-base">Sign Up</span>
              </TabsTrigger>
              <TabsTrigger value="tab-3" onClick={() => navigate("/signup")} className="rounded-md w-[5rem] h-[2.5rem]">
                <span className="font-light text-base">Guest</span>
              </TabsTrigger>
              <TabsTrigger value="tab-4" onClick={() => navigate("/send-forgot-password-mail")} className="rounded-md w-[10rem] h-[2.5rem]">
                <span className="font-light text-base">Forgot Password</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          </div>
  );
}
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
