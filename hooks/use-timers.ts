import { api } from "@/convex/_generated/api";
import { DataModel } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export type TimerGroup = { active: Timer[], sent: Timer[], dismissed: Timer[] }
export type Timer = DataModel['timers']['document'];

const defaultTimerGroup: TimerGroup = {
  active: [],
  sent: [],
  dismissed: [],
}

export function useDashboardTimers() {
  const timers = useQuery(api.timers.list.default, {status:["sent", "active"]});

  return { 
    timerGroups: (!timers || !timers.length) 
        ? defaultTimerGroup 
        : Object.groupBy(timers, (timer) => timer.status) as TimerGroup,
    allTimers: timers,
    isLoading: !timers,
  }
}

export function useCompletedTimers() {
  const timers = useQuery(api.timers.list.default, {status:["dismissed"]});
  return {
    isLoading: !timers,
    timers: timers,
  }
}

export function useRunningTimers() {
  const timers = useQuery(api.timers.list.default, {status:["active"]});
  return {
    isLoading: !timers,
    timers: timers,
  }
}
