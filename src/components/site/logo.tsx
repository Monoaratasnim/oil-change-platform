import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Emberline - back to top"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow-sm transition-shadow group-hover:shadow-glow">
        <Droplet className="size-5 fill-current" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Emberline
        </span>
        <span className="text-[0.6875rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
          On-site oil
        </span>
      </span>
    </a>
  );
}

export { Logo };