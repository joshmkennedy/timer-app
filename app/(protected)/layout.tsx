"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { Authenticated } from "convex/react";

export default function Layout({ children }: { children: React.ReactNode }) {

  return <Authenticated>
    <SidebarProvider>
      <DashboardSidebar />


      <div className="w-full">{children}</div>

    </SidebarProvider>
  </Authenticated>
}
