import { AppSidebar, NavUser } from "@/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
export default function Dashboard() {
  const [breadcrumbState, setBreadcrumbState] = useState<string[] | null>(null);
  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname; 
    setBreadcrumbState(currentUrl.split("/").slice(-3));
  }, [location]);
  
  const capitalizeFirstChar = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar/>
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbState && (
              <Breadcrumb className="hidden sm:block">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <span>{breadcrumbState[1]}</span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-lg">
                      {capitalizeFirstChar(
                        breadcrumbState[breadcrumbState.length - 1].replace(
                          "-",
                          " "
                        )
                      )}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <NavUser/>
        </header>
        <ScrollArea className="w-full h-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
