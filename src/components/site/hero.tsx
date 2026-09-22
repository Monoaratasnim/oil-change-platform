import {
  ArrowRight,
  CalendarCheck2,
  Droplet,
  Gauge,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/site/container";
import { cn } from "@/lib/utils";

const stats = [
  { value: "45 min", label: "Average service" },
  { value: "0", label: "Missed shifts" },
  { value: "100%", label: "Synthetic oil" },
  { value: "24/7", label: "Dispatch line" },
];

function Hero() {
  return (
    <section
      id="top"
      aria-label="Emberline on-site commercial oil changes"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-pattern"
        style={{
          backgroundSize: "2.5rem 2.5rem",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 0%, black 15%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 0%, black 15%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-24 left-1/2 -z-10 hidden h-[34rem] w-[34rem] -translate-x-1/2 bg-glow-ember sm:block"
      />
      <div
        aria-hidden
        className="absolute -right-40 top-40 -z-10 hidden h-[28rem] w-[28rem] bg-glow-cool lg:block"
      />

      <Container className="flex flex-col gap-6 pt-28 pb-20 sm:gap-16 sm:pt-40 lg:min-h-dvh lg:flex-row lg:items-center lg:gap-12 lg:pt-36 lg:pb-28">
        <div className="flex max-w-2xl flex-col items-start gap-6 animate-fade-in-up">
          <Badge variant="brand" className="gap-1.5">
            <ShieldCheck aria-hidden />
            Commercial on-site service
          </Badge>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:tracking-[-0.03em] md:text-6xl xl:text-display">
            Engine care for kitchens that never close.
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Emberline dispatches certified technicians to your storefront. Oil
            and filter changes completed in under an hour, using 100%
            full-synthetic oil — so your fleet stays moving and your crew stays
            on the line.
          </p>

          <div className="flex flex-row flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className={cn(
                buttonVariants({
                  variant: "glow",
                  size: "lg",
                  className: "px-4 text-sm sm:px-6 sm:text-base",
                }),
              )}
            >
              View service plans
              <ArrowRight aria-hidden />
            </a>
            <a
              href="#process"
              className={cn(
                buttonVariants({
                  variant: "outlined",
                  size: "lg",
                  className: "px-4 text-sm sm:px-6 sm:text-base",
                }),
              )}
            >
              How it works
            </a>
          </div>

          <ul
            aria-label="Types of kitchens we serve"
            className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <li className="font-medium text-foreground">Trusted by 140+ local kitchens</li>
            {["Restaurants", "Cafés", "Food trucks", "Commissaries"].map((kind) => (
              <li key={kind}>
                <Badge variant="outline">{kind}</Badge>
              </li>
            ))}
          </ul>

          <dl className="mt-4 grid w-full grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display text-h4 font-bold text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Card className="relative w-full max-w-md border-neutral-800/80 bg-neutral-950/60 animate-fade-in-up lg:justify-self-end">
          <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="relative flex size-2.5 rounded-full bg-amber-400"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-amber-400/70"
                  />
                </span>
                <h2 className="font-display text-h4 font-bold text-foreground">
                  Upcoming service
                </h2>
              </div>
              <Badge>Auto-scheduled</Badge>
            </div>

            <ul className="grid gap-4">
              <li className="flex items-start gap-3">
                <CalendarCheck2
                  className="mt-0.5 size-5 shrink-0 text-amber-400"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Next slot
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Tomorrow · 6:00 AM
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Truck
                  className="mt-0.5 size-5 shrink-0 text-amber-400"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Fleet unit
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Oberon Café · 2 vehicles
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Droplet
                  className="mt-0.5 size-5 shrink-0 text-amber-400"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Lubricant
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Full synthetic 5W-30
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Gauge
                  className="mt-0.5 size-5 shrink-0 text-amber-400"
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Included checks
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    21-point fluid &amp; safety inspection
                  </p>
                </div>
              </li>
            </ul>

            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "w-full justify-center")}
            >
              Confirm this slot
            </a>
            <p className="text-center text-xs text-muted-foreground">
              Free cancellation until 24 hours before the slot.
            </p>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

export { Hero };