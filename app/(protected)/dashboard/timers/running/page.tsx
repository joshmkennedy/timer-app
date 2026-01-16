"use client"
import { DashboardHeader } from "@/app/(protected)/_components/dashboard-header";
import { PageContentWrapper } from "@/app/(protected)/_components/page-content-wrapper";
import { BasicTimerTable } from "@/components/basic-timer-table";
import { useRunningTimers } from "@/hooks/use-timers";

export default function CompletedTimersPage() {
  const { timers } = useRunningTimers();
  if (!timers) {
    return <div>Loading...</div>
  }
  return <div>
    <DashboardHeader>
      <div className="">
        <h2 className="text-lg text-muted-foreground">Running Timers</h2>
      </div>
    </DashboardHeader>
    <PageContentWrapper>
      <BasicTimerTable timers={timers} />
    </PageContentWrapper>
  </div>
}

