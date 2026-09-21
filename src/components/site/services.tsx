import {
  ArrowRight,
  Building2,
  Check,
  Wrench,
} from "lucide-react";
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

const onSiteFeatures = [
  "Engine oil & filter replacement",
  "21-point fluid and safety check",
  "Used-oil pickup and recycling",
  "Digital maintenance log per vehicle",
  "Works in parking lots and docks",
];

const fleetFeatures = [
  "Central dashboard for every vehicle",
  "Multi-location dispatch routing",
  "Priority weekend and off-hours slots",
  "Dedicated account manager",
  "Per-location pricing caps",
];

const offerings = [
  {
    icon: Wrench,
    badge: "For restaurants & cafés",
    title: "On-site commercial oil changes",
    description:
      "Fully equipped service vans roll up to your loading dock and complete every oil change inside your schedule window. Your crew never leaves the line.",
    features: onSiteFeatures,
    price: "From $129",
    priceNote: "per service, all brands",
    cta: { href: "#contact", label: "Book a service" },
    featured: false,
  },
  {
    icon: Building2,
    badge: "For groups & franchises",
    title: "Fleet & multi-site contracts",
    description:
      "One agreement covers every vehicle at every location. We track mileage, oil grade, and service history so nothing slips between sites.",
    features: fleetFeatures,
    price: "From $349",
    priceNote: "per location / month",
    cta: { href: "#contact", label: "Talk to fleet team" },
    featured: true,
  },
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-400/10">
            <Check className="size-3 text-amber-400" aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Services"
          title="Oil changes that come to you"
          description="Designed for commercial kitchens where a trip to the shop means a trip off the line. We bring the shop to your dock instead."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {offerings.map((offering) => {
            const Icon = offering.icon;
            return (
              <Card
                key={offering.title}
                className={cn(
                  "gap-6 border-neutral-800/80 bg-neutral-950/60",
                  offering.featured &&
                    "border-amber-400/30 lg:-mt-4 lg:mb-4 lg:shadow-[0_0_20px_rgba(245,158,11,0.10)]",
                )}
              >
                <CardHeader className="gap-4 sm:px-7 sm:pt-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-amber-400">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <Badge variant={offering.featured ? "brand" : "outline"}>
                      {offering.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-balance">{offering.title}</CardTitle>
                  <CardDescription className="text-balance text-sm leading-relaxed">
                    {offering.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 sm:px-7 sm:pb-7">
                  <FeatureList items={offering.features} />
                  <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-h3 font-bold text-foreground">
                        {offering.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {offering.priceNote}
                      </p>
                    </div>
                    <a
                      href={offering.cta.href}
                      className={cn(
                        buttonVariants({
                          variant: offering.featured ? "glow" : "outlined",
                          size: "default",
                        }),
                      )}
                    >
                      {offering.cta.label}
                      <ArrowRight aria-hidden />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export { Services };