import { Container } from "@/components/site/container";

function SkeletonRow() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-3 w-40 animate-pulse rounded-sm bg-oil-700/60" />
      <div className="h-9 w-full animate-pulse rounded-lg bg-oil-700/40" />
    </div>
  );
}

export default function LoadingPage() {
  return (
    <main
      id="main"
      aria-label="Loading"
      aria-busy="true"
      className="flex min-h-dvh flex-col gap-8 pt-32 pb-16"
    >
      <Container className="flex flex-col gap-4" aria-hidden>
        <div className="h-3 w-24 animate-pulse rounded-sm bg-brand-500/40" />
        <div className="h-9 w-72 animate-pulse rounded-lg bg-oil-700/60" />
        <div className="h-4 w-full max-w-lg animate-pulse rounded-sm bg-oil-700/40" />
      </Container>
      <Container
        className="grid items-start gap-6 lg:grid-cols-2"
        aria-hidden
      >
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </Container>
    </main>
  );
}