"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardErrorPage({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main id="main" className="flex min-h-dvh items-center justify-center px-4 py-24">
      <Card className="w-full max-w-md gap-6">
        <CardHeader className="items-center gap-3 text-center sm:px-8 sm:pt-8">
          <span className="flex size-12 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
            <AlertTriangle className="size-5" aria-hidden />
          </span>
          <CardTitle className="text-h2">Dashboard failed to load</CardTitle>
          <CardDescription className="text-balance">
            An unexpected error interrupted the dashboard. Try again, or sign
            out and sign back in.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:px-8 sm:pb-8">
          <Button type="button" size="lg" onClick={reset} className="w-full">
            <RefreshCw className="size-4" aria-hidden />
            Reload dashboard
          </Button>
          <a
            href="/api/dashboard/auth?signout=1"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-background/40 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Sign out
          </a>
        </CardContent>
      </Card>
    </main>
  );
}