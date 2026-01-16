"use client"
import { NaturalLanguageDatePicker } from "@/components/nlp-date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export function NewTimerForm({ onSubmit }: TimerFormProps) {
  return <div className="border-2 p-4 rounded-md bg-muted flex-1">
    <h3 className="font-bold text-muted-foreground">Create a timer</h3>
    <BaseNewTimerForm onSubmit={onSubmit} />
  </div>
}

export type TimerFormProps = {
  onSubmit?: () => void;
}

export function BaseNewTimerForm({ onSubmit }: TimerFormProps) {
  const createTimer = useMutation(api.timers.timer.newTimer);

  const [alertAtRaw, setAlertAtRaw] = useState(0);

  function handleCreateTimer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString();
    if (!title) {
      console.error("Missing title");
      return;
    }

    if (!alertAtRaw) {
      console.error("Missing alertAt");
      return;
    }
    const alertAt = new Date(alertAtRaw).getTime();

    createTimer({ title, alertAt });
    onSubmit?.();
  }

  return <form onSubmit={handleCreateTimer} className="flex flex-col gap-4 w-full ">
    <div className="flex flex-col gap-4 py-3 ">
      <NaturalLanguageDatePicker onUpdate={(date) => setAlertAtRaw(date.getTime())} label="For When?"/>
      <div className="gap-2 flex flex-col">
        <Label className="font-medium h-full text-muted-foreground text-base">Message</Label>
        <Input type="text" name="title" className="p-4 placeholder:text-muted-foreground/50 rounded-md bg-background h-full" placeholder="Title" />
      </div>
    </div>
    <div className="flex flex-col gap-4 py-0">
      <Button type="submit" size={"lg"} className="font-bold h-full p-4">Create</Button>
    </div>
  </form>
}
