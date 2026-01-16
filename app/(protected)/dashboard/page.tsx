"use client"
import { useEffect, useState } from "react";
import { DashboardHeader } from "../_components/dashboard-header";
import { PageContentWrapper } from "../_components/page-content-wrapper";
import { useDashboardTimers } from "@/hooks/use-timers";
import { PreviewInbox } from "../_components/preview-inbox";
import { NewTimerForm } from "../_components/new-timer-form";
import { PreviewActiveTable } from "../_components/preview-active-table";

export default function Page() {
  const { timerGroups, isLoading } = useDashboardTimers();



  if (isLoading) {
    return <div>Loading...</div>
  }


  return <div className="w-full">
    <DashboardHeader>
      <div className="">
        <h2 className="text-lg text-muted-foreground">Timers</h2>
      </div>
    </DashboardHeader>
    <PageContentWrapper>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12  w-full min-w-full ">
        <div className="flex-1 lg:max-w-3xl">
          <PreviewInbox alerts={timerGroups.sent} />
        </div>
        <div className="flex-1 max-w-full lg:max-w-1/3">
          {timerGroups.active.length > 0
            ? <PreviewActiveTable alerts={timerGroups.active} />
            : <NewTimerForm />
          }
        </div>
      </div>
      <div>
      </div>
    </PageContentWrapper>
  </div>;
}
