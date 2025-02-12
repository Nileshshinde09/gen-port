import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Utils } from "@/lib/utils";
import { Settings } from "lucide-react";
import AppSettings from "./settings"
import { useNavigate } from "react-router-dom";
interface MenueProps {
  className?: string;
}
const Menue: React.FC<MenueProps> = ({ className }): React.ReactNode => {
  const navigate = useNavigate();
  return (
    <Menubar className={Utils.cn("py-2", className)}>
      <MenubarMenu>
        <MenubarTrigger onClick={() => navigate("/")}>Home</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <AppSettings>
            <Settings className="cursor-pointer w-5 h-auto hover:spin-in-12 hover:text-slate-500 transform hover:rotate-90 transition duration-300" />
          </AppSettings>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menue;
