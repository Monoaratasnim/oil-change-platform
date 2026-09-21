"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

function DefaultFallback() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card px-6 py-12 text-center shadow-sm">
      <span className="flex size-12 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
        <AlertTriangle className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-h4 font-bold text-foreground">
          This section hit an error
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          We could not render this part of the page. Reload to try again.
        </p>
      </div>
      <Button type="button" onClick={() => window.location.reload()}>
        <RefreshCw className="size-4" aria-hidden />
        Reload section
      </Button>
    </div>
  );
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error boundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

export { ErrorBoundary };