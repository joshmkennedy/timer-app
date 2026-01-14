import { ReactNode } from "react"
import ConvexClientProvider from "./convex-with-clerk"
import { ClerkProvider } from "@clerk/nextjs"
export default function AppProvider({ children }: { children: ReactNode }) {
  return <ClerkProvider>
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  </ClerkProvider>
}
