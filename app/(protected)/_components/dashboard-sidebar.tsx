import { TimerMenuItems } from "@/app/_config/menus/dashboard";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UserPreferenceToggle } from "./user-preference-toggle";
import { NewTimerFormModal } from "./new-timer-form-modal";
export function DashboardSidebar() {
  return <Sidebar
  >

    <SidebarHeader>

      <h1>
        <Link href="/dashboard">
          Timer App
        </Link>
      </h1>

    </SidebarHeader>

    <SidebarContent>

      <SidebarGroup>
        <SidebarContent>
          <SidebarMenu>
            <NewTimerFormModal>
              <SidebarMenuButton className="flex items-center gap-2 py-4 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                New Timer
              </SidebarMenuButton>
            </NewTimerFormModal>

          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground/85 text-xs ">Timers</SidebarGroupLabel>

        <SidebarGroupContent>

          <SidebarMenu>
            {TimerMenuItems.map(({ href, label }) => <DashboardMenuItem key={href} href={href} label={label} />)}

          </SidebarMenu>

        </SidebarGroupContent>

      </SidebarGroup>



    </SidebarContent>

    <SidebarFooter>

      <UserPreferenceToggle />

    </SidebarFooter>
  </Sidebar>
}

function DashboardMenuItem({ href, label }: { href: string, label: string }) {
  return <SidebarMenuItem >
    <SidebarMenuButton asChild className="flex items-center gap-2 py-4 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">
      <Link href={href} >
        {label}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem >
}
