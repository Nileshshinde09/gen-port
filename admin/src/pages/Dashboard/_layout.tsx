import { Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { NavDown } from "../../store/slices/themeSlice";
export default function DashboardLayout() {
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NavDown());
  }, [dispatch]);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-2">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
