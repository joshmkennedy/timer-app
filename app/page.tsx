"use client"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <header className="absolute top-0 right-0 p-6">
        {user && (
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
        )}
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 text-center max-w-4xl">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
            <h1 className="relative text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Timer
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Track your time with precision and style.
            <span className="block mt-2">Simple, powerful, and beautifully designed.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {!user ? (
              <>
                <Link href="/signin" className="text-base px-8 py-6 h-auto rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-primary text-white">
                    Sign In
                </Link>
                <Link href="/signin" className="text-base px-8 py-6 h-auto rounded-xl font-semibold border"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="text-base px-8 py-6 h-auto rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-primary text-white">
                Go to Dashboard
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full max-w-3xl">
            <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Precise Tracking</h3>
              <p className="text-sm text-muted-foreground">Track every second with accuracy</p>
            </div>

            <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Analytics</h3>
              <p className="text-sm text-muted-foreground">Insights into your productivity</p>
            </div>

            <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Instant response, zero lag</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full py-6 text-center text-sm text-muted-foreground">
        Built with precision and care
      </footer>
    </div>
  );
}
