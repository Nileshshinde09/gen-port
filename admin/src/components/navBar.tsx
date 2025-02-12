import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { useAppSelector } from "../store/hooks";

const authStatus = true;
const isAdmin = true;

const _NavigationMenu = () => {
  const isNavVisible = useAppSelector((state) => state.theme.isNavVisible);
  if (!isNavVisible) return null;
  return (
    <div className="absolute z-[999] px-5 dark:shadow-white/20 max-w-7xl mx-auto left-0 right-0 w-[96%] mt-2 h-12 bg-white/5 backdrop-blur-sm shadow-sm shadow-black/30 border-spacing-2 rounded-full flex justify-between items-center p-1 space-x-2">
      {/* Admin Icon */}
      {isAdmin && <MdAdminPanelSettings className="text-rose-500" size={40} />}

      {/* Navigation Content */}
      <div className="w-fit flex space-x-2 items-center">
        {/* Mobile Menu Icon */}
        <AlignJustify
          className="md:hidden cursor-pointer transition-all"
          aria-label="Toggle menu"
        />

        {/* Auth Links */}
        <ul className="flex space-x-2">
          <li>
            <Link to={"#"} className={buttonVariants({ variant: "outline" })}>
              {authStatus ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>

        {/* Theme Toggle */}
        <ul>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default _NavigationMenu;
