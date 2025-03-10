import * as React from "react"
import {
  Command,
  LifeBuoy,
  Send,
  Users2,
  ChartPie,
  LockIcon
} from "lucide-react"

import { NavMain } from "../components/nav-main"
import { NavSecondary } from "../components/nav-secondary"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { Link } from "react-router-dom"

const data = {
  navMain: [
    {
      title: "Users",
      icon: Users2,
      isActive: true,
      items: [
        {
          title: "All Users",
          url: "all-users",
        },
        {
          title: "User stats",
          url: "user-stats",
        },
        // {
        //   title: "Logged In User",
        //   url: "/dashboard/users/logged-in-users",
        // },
        // {
        //   title: "Blocked Users",
        //   url: "/dashboard/users/blocked-users",
        // },
      ],
    },
    
    
    {
      title: "Statastics",
      icon: ChartPie,
      items: [
        {
          title: "Application stats",
          url: "application-stats",
        },
        
      ],
    },
    {
      title: "Register User",
      icon: LockIcon,
      items: [
        {
          title: "register user",
          url: "user-sign-up",
        }
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support Queries",
      url: "support-queries",
      icon: LifeBuoy,
    },
    {
      title: "Feedbacks",
      url: "user-feedback",
      icon: Send,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Prep Next</span>
                  <span className="truncate text-xs">App Admin</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
