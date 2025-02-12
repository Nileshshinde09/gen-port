import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronLeft, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Utils } from "@/lib/utils";
import { useTheme } from "./ui/theme-provider";
interface settingProps {
  children: React.ReactNode;
  className?: string;
}
const items = [
  { id: "radio-18-r1", value: "light", label: "Light", image: "/ui-light.png" },
  { id: "radio-18-r2", value: "dark", label: "Dark", image: "/ui-dark.png" },
  {
    id: "radio-18-r3",
    value: "system",
    label: "System",
    image: "/ui-system.png",
  },
];

const Settings: React.FC<settingProps> = ({ children, className }) => {
  const { setTheme, theme } = useTheme();

  return (
    <div className={Utils.cn("", className)}>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent
          className={Utils.cn(
            "bg-[rgb(4,2,7)] h-[90%] border-zinc-700/80 border-2 rounded-t-3xl  flex justify-center items-center",
            theme === "light" ? "border-zinc-500/80" : "border-zinc-700/80"
          )}
        >
          <div
            className={Utils.cn(
              "h-full w-[95%] mt-4 rounded-t-3xl relative",
              theme === "light" ? "bg-zinc-200" : "bg-zinc-800"
            )}
          >
            <DrawerHeader>
              <DrawerTitle className="text-center">Settings</DrawerTitle>
              <DrawerDescription className="text-center">
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            {/* Content Start */}
            <div className="max-w-5xl w-full mx-auto ">
              <fieldset className="space-y-4">
                <legend className="text-sm font-medium leading-none text-foreground">
                  Choose a theme
                </legend>
                <RadioGroup
                  className="flex gap-3"
                  defaultValue={theme}
                  onValueChange={(val: any) => setTheme(val)}
                >
                  {items.map((item) => (
                    <label key={item.id}>
                      <RadioGroupItem
                        id={item.id}
                        value={item.value}
                        className="peer sr-only after:absolute after:inset-0"
                      />
                      <img
                        src={item.image}
                        alt={item.label}
                        className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
                      />
                      <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                        <Check
                          size={16}
                          strokeWidth={2}
                          className="peer-data-[state=unchecked]:group-[]:hidden"
                          aria-hidden="true"
                        />
                        <Minus
                          size={16}
                          strokeWidth={2}
                          className="peer-data-[state=checked]:group-[]:hidden"
                          aria-hidden="true"
                        />
                        <span className="text-xs font-medium">
                          {item.label}
                        </span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
            {/* Content End */}
            <DrawerFooter>
              <DrawerClose className="absolute top-4 right-4">
                <Button variant="link">
                  <ChevronLeft
                    className="me-1 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Go back
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Settings;
