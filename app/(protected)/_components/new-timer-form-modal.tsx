"use client"
import { DialogContent, Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { BaseNewTimerForm } from "./new-timer-form";
import React from "react";

export function NewTimerFormModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild >
      {children}
    </DialogTrigger>
    <DialogContent className="flex flex-col gap-4 w-full border-2 p-4 rounded-md bg-muted flex-1">
      <DialogTitle className="font-bold text-muted-foreground">Create a timer</DialogTitle>
      <BaseNewTimerForm onSubmit={()=>setIsOpen(false)}/>
    </DialogContent>
  </Dialog>
}
