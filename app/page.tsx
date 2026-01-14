"use client"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  const {user} = useUser();

  console.log(user?.id);
  
  return <div>
    <header className="flex  gap-4 justify-end items-baseline">
      <Link href="/dashboard" className="text-2xl font-bold">
        Dashboard
      </Link>
    </header>
    <h1>Timer</h1>
  </div>
}
