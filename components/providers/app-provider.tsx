import { ReactNode } from "react"
import ConvexClientProvider from "./convex-with-clerk"
import { ClerkProvider } from "@clerk/nextjs"
import { PushNotificationsProvider } from "./push-notification"

export default function AppProvider({ children }: { children: ReactNode }) {
  return <ClerkProvider>
    <ConvexClientProvider>
      <PushNotificationsProvider>
        {children}
      </PushNotificationsProvider>
    </ConvexClientProvider>
  </ClerkProvider>
}
