import * as React from "react";
import { FaGripfire } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import { FcOnlineSupport } from "react-icons/fc";
import {
  SiCreatereactapp,
  SiGoogleanalytics,
  SiGoogledocs,
  SiHomebridge,
} from "react-icons/si";
import { CgProfile, CgWebsite } from "react-icons/cg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import { Link } from "react-router-dom";
import { NavProjects } from "./sidebarComponents/nav-projects";
import { NavSecondary } from "./nav-secondar";
import { NavMain } from "./sidebarComponents/nav-main";
import { RiAiGenerate } from "react-icons/ri";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Documentation",
      url: "#",
      icon: SiGoogledocs,
      isActive: true,
      items: [
        {
          title: "Deploy",
          url: "/console/docs",
        },
        {
          title: "Install",
          url: "/console/docs",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/console/support",
      icon: FcOnlineSupport,
    },
    {
      title: "Feedback",
      url: "/console/feedback",
      icon: FcFeedback,
    },
  ],
  pages: [
    {
      name: "Home",
      url: "/",
      icon: SiHomebridge,
    },
    {
      name: "Profile",
      url: "/console/my-profile",
      icon: CgProfile,
    },
    {
      name: "Create Portfolio",
      url: "/console/create-portfolio",
      icon: SiCreatereactapp,
    },
    
    {
      name: "Dashboard",
      url: "/console/dashboard",
      icon: CgWebsite,
    }
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar className="" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square rounded-lg border border-border size-8 items-center justify-center text-sidebar-primary-foreground">
                  <RiAiGenerate size={30} className="size-6 text-heroButton" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-thin text-xl flex gap-2 items-center ">
                    Prep Next
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.pages} />
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
