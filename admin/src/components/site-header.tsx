import { SidebarIcon } from "lucide-react";

import { SearchForm } from "../components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useSidebar } from "../components/ui/sidebar";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const [breadcrumbState, setbreadcrumbState] = useState<string[] | null>(null);
  const currentUrl = window.location.href;
  useEffect(() => {
    setbreadcrumbState(currentUrl.split("/").slice(-3));
  }, [currentUrl]);
  const capitalizeFirstChar = (str:string):string => {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <div className="flex gap-1.5">
            <button className="w-3 h-3 rounded-full bg-red-600"/>
            <button className="w-3 h-3 rounded-full bg-yellow-600"/>
            <button className="w-3 h-3 rounded-full bg-green-600"/>
        </div>
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumbState && (
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <span >{breadcrumbState[0]}</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span >{breadcrumbState[1]}</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg">{capitalizeFirstChar(breadcrumbState[2].replaceAll("-"," "))}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}
