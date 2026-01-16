"use client"
import * as chrono from "chrono-node";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type NaturalLanguageDatePickerProps = {
  onUpdate: (date: Date) => void;
  label?: string;
}
export function NaturalLanguageDatePicker({ onUpdate, label }: NaturalLanguageDatePickerProps) {
  const [text, setText] = useState("");
  const [datePreview, setDatePreview] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    const date = chrono.parse(e.target.value)
    if (!date.length) {
      return setDatePreview("");
    }
    setDatePreview(date[0].date().toLocaleString());
  }
  function handleBlur() {
    const date = chrono.parse(text)
    if (!date.length) {
      return;
    }

    onUpdate(date[0].date());
  }
  return <div className="flex flex-col gap-2">
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2 justify-between">
        <Label className="font-medium h-full text-muted-foreground text-base">{label || "Date"}</Label>
        <div className="text-xs text-muted-foreground px-0">
          {datePreview || "  "}
        </div>
      </div>
      <Input
        className="p-4 placeholder:text-muted-foreground/50 rounded-md text-base sm:text-sm bg-background h-full border"
        type="text"
        placeholder="On Friday at 3"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  </div>
}
