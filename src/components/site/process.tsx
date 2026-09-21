import { CalendarClock, ClipboardCheck, Truck } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  {
    icon: CalendarClock,
    title: "Request a slot",
    description:
      "Tell us your address, fleet size, and preferred window. You get a fixed quote back in under 30 minutes on business days.",
  },
  {
    icon: Truck,
    title: "We arrive ready",
    description:
      "A fully stocked service van pulls into your dock at the scheduled time. No ramps, no hold-ups, no storefront space used.",
  },
  {
    icon: ClipboardCheck,
    title: "You're back in service",
    description:
      "We walk you through the checklist, reclaim the used oil, and get out of your way — usually inside 60 minutes flat.",
  },
];

function Process() {
  return (
    <section
      id="process"
      aria-label="How it works"
      className="scroll-mt-24 border-y border-border/60 bg-oil-900/40 py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to a serviced fleet"
          description="From first request to keys-in-hand, the whole flow is built around your kitchen's operating hours."
        />

        <ol className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-4xl font-extrabold text-border"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-h4 font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

export { Process };