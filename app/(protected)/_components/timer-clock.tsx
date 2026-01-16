"use client"
import { useState, useEffect } from "react";

export function TimerClock() {

  const [lastCheck, setLastCheck] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setLastCheck(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return <span className="text-muted-foreground/80">{new Date(lastCheck).toLocaleString()}</span>;
}
