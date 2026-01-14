import { UserButton } from "@clerk/nextjs";

export function UserPreferenceToggle() {

  return <div className="flex items-center gap-2 p-4 rounded-md text-sidebar-foreground bg-muted border border-sidebar-foreground/10 user-preference-toggle relative">
    <UserButton showName={true} />
  </div>
}
