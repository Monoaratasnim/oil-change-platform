import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Solo Café",
    price: "$149",
    cadence: "per month",
    description: "For a single location with 1–3 vehicles.",
    features: [
      "1 scheduled service per quarter",
      "Synthetic blend oil included",
      "15% off extra services",
      "Priority booking window",
    ],
    cta: { href: "#contact", label: "Choose Solo Café" },
    featured: false,
  },
  {
    name: "Multi-Unit",
    price: "$449",
    cadence: "per month",
    description: "For growing groups with 4–12 vehicles.",
    features: [
      "2 services per month",
      "Full-synthetic oil included",
      "Monthly fleet report",
      "Weekend dispatch available",
      "Priority actions on-site",
    ],
    cta: { href: "#contact", label: "Choose Multi-Unit" },
    featured: true,
  },
  {
    name: "Fleet+",
    price: "$899",
    cadence: "per month",
    description: "For franchises and commissaries with 13+ vehicles.",
    features: [
      "Unlimited scheduled services",
      "Dedicated technician",
      "On-site bulk oil storage",
      "Tire & battery add-on tiers",
      "24/7 dispatch line",
    ],
    cta: { href: "#contact", label: "Choose Fleet+" },
    featured: false,
  },
];

function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Subscription plans"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Subscriptions"
          title="Monthly plans built around your service calendar"
          description="No surprise invoices, no ad-hoc scheduling. Pick the coverage that matches your fleet size and lock in priority dispatch."
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "gap-6 border-neutral-800/80 bg-neutral-950/60",
                plan.featured &&
                  "border-amber-400/40 shadow-[0_0_24px_rgba(245,158,11,0.10)] lg:-mt-4 lg:mb-4",
              )}
            >
              <CardHeader className="gap-3 sm:px-7 sm:pt-7">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-balance">{plan.name}</CardTitle>
                  {plan.featured && <Badge>Popular</Badge>}
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 sm:px-7 sm:pb-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-h2 font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
                <ul className="grid gap-2.5 border-t border-border pt-5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-400/10">
                        <Check className="size-3 text-amber-400" aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.cta.href}
                  className={cn(
                    buttonVariants({
                      variant: plan.featured ? "glow" : "outlined",
                      size: "default",
                    }),
                    "w-full justify-center",
                  )}
                >
                  {plan.cta.label}
                  <ArrowRight aria-hidden />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { Pricing };