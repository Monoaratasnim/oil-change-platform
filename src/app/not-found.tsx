import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  return (
    <main id="main" className="flex min-h-dvh items-center justify-center px-4 py-24">
      <Container className="flex flex-col items-center gap-5 text-center">
        <span
          aria-hidden
          className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-glow-sm"
        >
          <SearchX className="size-6" />
        </span>
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display text-h1 text-foreground">
          Page not found
        </h1>
        <p className="max-w-md text-lead text-muted-foreground">
          The page you are looking for does not exist or has been moved. Head
          back home or browse our services.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "glow", size: "lg" }))}
          >
            <Home aria-hidden />
            Back to home
          </Link>
          <Link
            href="/#services"
            className={cn(buttonVariants({ variant: "outlined", size: "lg" }))}
          >
            <ArrowLeft aria-hidden />
            View services
          </Link>
        </div>
      </Container>
    </main>
  );
}