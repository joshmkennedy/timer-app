"use client"
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataModel } from "@/convex/_generated/dataModel";

type Timer = DataModel['timers']['document'];

type TimerGroup = { active: Timer[], sent: Timer[], dismissed: Timer[] }

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
export default function Page() {
  const timers = useQuery(api.timers.list.default, {});
  const createTimer = useMutation(api.timers.timer.newTimer);
  function handleCreateTimer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString();
    if (!title) {
      console.error("Missing title");
      return;
    }

    const alertAtStr = formData.get("alertAt")?.toString();
    if (!alertAtStr) {
      console.error("Missing alertAt");
      return;
    }
    const alertAt = new Date(alertAtStr).getTime();


    createTimer({ title, alertAt });
  }

  const [lastCheck, setLastCheck] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setLastCheck(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const group = useMemo(() => {
    if (!timers ||!timers.length) {
      return {
        active: [],
        sent: [],
        dismissed: [],
      } as TimerGroup
    }
    return Object.groupBy(timers, (timer) => timer.status) as TimerGroup
  }, [timers])


  const stableGroup = {
    active: group.active ?? [],
    sent: group.sent ?? [],
    dismissed: group.dismissed ?? [],
  }



  if (!timers) {
    return <div>Loading...</div>
  }


  return <div className="w-full">
    <header className="mb-10">
    <h2>Timers</h2>

    {new Date(lastCheck).toLocaleString()}
    </header>
    <div className="flex flex-row gap-4 w-full min-w-full">
      {Object.entries(stableGroup).map(([status, timers]) => <div key={status} className="flex-1 border-l-3 bg-muted p-4">
        <h3 className="mb-4 font-bold capitalize text-primary">{status}</h3>
        <ul>
          {timers.map(timer => <li key={timer._id}>
            <span>{timer.title}</span>
            <span>{timer.alertAt ? new Date(timer.alertAt).toLocaleString() : "--"}</span>
          </li>)}
        </ul>
      </div>)}

    </div>
    <div>
      <form onSubmit={handleCreateTimer} className="flex flex-col gap-4 w-full border-2 p-4 rounded-md max-w-sm bg-muted">
        <h3 className="font-bold text-muted-foreground">Create a timer</h3>
        <input type="text" name="title" className="p-4 placeholder:text-muted-foreground/50 rounded-md bg-background" placeholder="Title" />
        <input type="datetime-local" name="alertAt" />
        <Button type="submit" size={"lg"} className="font-bold">Create</Button>
      </form>
    </div>

  </div>;
}
