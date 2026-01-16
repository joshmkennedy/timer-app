import { SidebarTrigger } from "@/components/ui/sidebar";
import { TimerClock } from "./timer-clock";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus } from "@hugeicons/core-free-icons";
import { NewTimerFormModal } from "./new-timer-form-modal";

export function DashboardHeader({ children }: { children: React.ReactNode }) {
  return <header className="mb-10">
    <div className="flex items-center gap-4 py-6 px-4 justify-between">
      <div className="flex items-center gap-x-4">
        <SidebarTrigger size={"lg"} />
        {children}
      </div>
      <div className="max-w-1/4 text-center"><TimerClock /></div>
      <NewTimerFormModal>
        <Button size="icon-lg">
          <HugeiconsIcon icon={Plus} className="w-6 h-6" />
        </Button>
      </NewTimerFormModal>

    </div>
  </header>
}
