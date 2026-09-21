"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BatteryCharging,
  CalendarClock,
  Car,
  Check,
  CheckCircle2,
  Droplet,
  Fan,
  Filter,
  Lightbulb,
  Loader2,
  Refrigerator,
  Repeat,
  RotateCw,
  Sparkles,
  ThermometerSnowflake,
  Truck,
  Van,
  Wind,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const equipmentTypes = [
  { id: "compact-car", label: "Compact delivery car", basePrice: 109, icon: Car },
  { id: "delivery-van", label: "Delivery van", basePrice: 129, icon: Van },
  { id: "food-truck", label: "Food truck", basePrice: 159, icon: Truck },
  {
    id: "box-truck",
    label: "Refrigerated box truck",
    basePrice: 189,
    icon: Refrigerator,
  },
] as const;

const frequencies = [
  {
    id: "one-time",
    label: "One-time service",
    description: "Pay per visit, no commitment.",
    multiplier: 1,
    cadence: "one-time",
    icon: CalendarClock,
  },
  {
    id: "monthly",
    label: "Monthly subscription",
    description: "Recurring dispatch and 20% off every service.",
    multiplier: 0.8,
    cadence: "per month",
    icon: Repeat,
  },
] as const;

const maintenanceOptions = [
  { id: "air-filter", label: "Air filter replacement", price: 29, icon: Filter },
  { id: "cabin-filter", label: "Cabin air filter", price: 24, icon: Wind },
  { id: "brake-fluid", label: "Brake fluid top-up", price: 19, icon: Droplet },
  {
    id: "coolant",
    label: "Coolant top-up",
    price: 22,
    icon: ThermometerSnowflake,
  },
  { id: "wiper-blades", label: "Wiper blades (pair)", price: 26, icon: Fan },
  { id: "tire-rotation", label: "Tire pressure & rotation", price: 35, icon: RotateCw },
  {
    id: "battery",
    label: "Battery test & terminal service",
    price: 15,
    icon: BatteryCharging,
  },
  { id: "bulbs", label: "Headlight or taillight bulb", price: 18, icon: Lightbulb },
] as const;

const equipmentById = new Map<string, (typeof equipmentTypes)[number]>(
  equipmentTypes.map((item) => [item.id, item]),
);
const frequencyById = new Map<string, (typeof frequencies)[number]>(
  frequencies.map((item) => [item.id, item]),
);
const optionById = new Map<string, (typeof maintenanceOptions)[number]>(
  maintenanceOptions.map((item) => [item.id, item]),
);

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function QuotationCalculator() {
  const [equipmentId, setEquipmentId] = useState("");
  const [frequencyId, setFrequencyId] = useState<"one-time" | "monthly">(
    "one-time",
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [attempted, setAttempted] = useState(false);
  const [quoteReady, setQuoteReady] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");
  const [quotationId, setQuotationId] = useState<number | null>(null);

  const equipment = equipmentById.get(equipmentId) ?? null;
  const frequency = frequencyById.get(frequencyId) ?? frequencies[0];
  const chosenOptions = useMemo(
    () =>
      selectedOptions
        .map((id) => optionById.get(id))
        .filter(
          (option): option is (typeof maintenanceOptions)[number] =>
            option !== null,
        ),
    [selectedOptions],
  );

  const equipmentMissing = equipment === null;
  const optionsMissing = chosenOptions.length === 0;
  const hasErrors = equipmentMissing || optionsMissing;

  const optionTotal = chosenOptions.reduce((sum, option) => sum + option.price, 0);
  const discountedBase = equipment ? equipment.basePrice * frequency.multiplier : 0;
  const estimatedPrice = equipment ? discountedBase + optionTotal : 0;
  const savings = equipment ? equipment.basePrice - discountedBase : 0;

  function resetSubmission() {
    setSubmitState("idle");
    setSubmitError("");
    setQuotationId(null);
  }

  function updateEquipment(id: string) {
    setEquipmentId(id);
    setQuoteReady(false);
    resetSubmission();
  }

  function updateFrequency(id: "one-time" | "monthly") {
    setFrequencyId(id);
    setQuoteReady(false);
    resetSubmission();
  }

  function toggleOption(id: string) {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
    setQuoteReady(false);
    resetSubmission();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (!hasErrors) {
      setQuoteReady(true);
      resetSubmission();
    }
  }

  async function confirmQuote() {
    if (!equipment) {
      return;
    }
    setSubmitState("submitting");
    setSubmitError("");
    try {
      const response = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipmentType: equipment.label,
          serviceTier: frequency.id,
          selectedOptions,
          estimatedPrice,
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        setSubmitError(
          payload?.error ??
            "We could not save your quotation. Please try again.",
        );
        setSubmitState("error");
        return;
      }
      setQuotationId(typeof payload?.id === "number" ? payload.id : null);
      setSubmitState("success");
    } catch {
      setSubmitError(
        "Network error — your quotation was not saved. Please try again.",
      );
      setSubmitState("error");
    }
  }

  const summaryMessage = quoteReady
    ? null
    : equipmentMissing
      ? "Choose an equipment type to calculate your estimate."
      : optionsMissing
        ? "No maintenance services selected yet — add at least one to see your estimate."
        : null;

  const cardIdle =
    "border-neutral-800 bg-neutral-900/60 hover:border-neutral-600 hover:bg-neutral-900";
  const cardActive =
    "border-amber-400/80 bg-amber-500/[0.04] shadow-[0_0_20px_rgba(245,158,11,0.12)]";
  const focusVisible =
    "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background";

  return (
    <section
      id="quote"
      aria-label="Instant quotation calculator"
      className="relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Instant quote"
          title="Build your service in under a minute"
          description="Pick your equipment, choose a service frequency, and add maintenance extras. Your estimate updates instantly as you go."
        />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <Card className="gap-8 border-neutral-800/80 bg-neutral-950/60">
            <CardHeader className="gap-2 sm:px-7 sm:pt-7">
              <CardTitle className="text-h3">Service details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 sm:px-7 sm:pb-7">
              <fieldset className="flex flex-col gap-4">
                <legend className="font-display text-h4 font-bold text-foreground">
                  Equipment type
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Equipment type"
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {equipmentTypes.map((item) => {
                    const selected = equipmentId === item.id;
                    const Icon = item.icon;
                    return (
                      <label key={item.id} className="group relative">
                        <input
                          type="radio"
                          name="equipment"
                          value={item.id}
                          checked={selected}
                          onChange={() => updateEquipment(item.id)}
                          aria-describedby={
                            attempted && equipmentMissing
                              ? "equipment-error"
                              : undefined
                          }
                          className="sr-only peer"
                        />
                        <span
                          className={cn(
                            "flex h-full cursor-pointer flex-col gap-3 rounded-xl border p-4 transition-all duration-200",
                            focusVisible,
                            selected ? cardActive : cardIdle,
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden
                                className={cn(
                                  "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                  selected
                                    ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
                                    : "border-neutral-700/80 bg-neutral-950 text-neutral-400",
                                )}
                              >
                                <Icon className="size-4" />
                              </span>
                              <span className="text-sm font-semibold text-foreground">
                                {item.label}
                              </span>
                            </span>
                            <span
                              aria-hidden
                              className={cn(
                                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                selected
                                  ? "border-amber-400 bg-amber-400 text-neutral-950"
                                  : "border-neutral-700 text-transparent",
                              )}
                            >
                              <Check className="size-3" />
                            </span>
                          </span>
                          <span className="pl-12 font-display text-sm font-bold text-amber-400">
                            {formatCurrency(item.basePrice)}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {attempted && equipmentMissing ? (
                  <p
                    id="equipment-error"
                    role="alert"
                    className="flex items-center gap-2 text-sm text-destructive"
                  >
                    <AlertTriangle className="size-4 shrink-0" aria-hidden />
                    Select an equipment type to calculate your estimate.
                  </p>
                ) : null}
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className="font-display text-h4 font-bold text-foreground">
                  Service frequency
                </legend>
                <div
                  role="radiogroup"
                  aria-label="Service frequency"
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {frequencies.map((item) => {
                    const selected = frequencyId === item.id;
                    const Icon = item.icon;
                    return (
                      <label key={item.id} className="group relative">
                        <input
                          type="radio"
                          name="frequency"
                          value={item.id}
                          checked={selected}
                          onChange={() => updateFrequency(item.id)}
                          className="sr-only peer"
                        />
                        <span
                          className={cn(
                            "flex h-full cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all duration-200",
                            focusVisible,
                            selected ? cardActive : cardIdle,
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden
                                className={cn(
                                  "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                  selected
                                    ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
                                    : "border-neutral-700/80 bg-neutral-950 text-neutral-400",
                                )}
                              >
                                <Icon className="size-4" />
                              </span>
                              <span className="text-sm font-semibold text-foreground">
                                {item.label}
                              </span>
                            </span>
                            <span
                              aria-hidden
                              className={cn(
                                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                selected
                                  ? "border-amber-400 bg-amber-400 text-neutral-950"
                                  : "border-neutral-700 text-transparent",
                              )}
                            >
                              <Check className="size-3" />
                            </span>
                          </span>
                          <span className="pl-12 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </span>
                          {item.id === "monthly" ? (
                            <Badge
                              variant="amber"
                              className="mt-1 ml-12 w-fit"
                            >
                              Save 20%
                            </Badge>
                          ) : null}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className="font-display text-h4 font-bold text-foreground">
                  Additional maintenance
                </legend>
                <p className="text-sm text-muted-foreground">
                  Every visit includes a full-synthetic oil change, filter,
                  and a 21-point safety inspection. Add extras below.
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {maintenanceOptions.map((option) => {
                    const selected = selectedOptions.includes(option.id);
                    const Icon = option.icon;
                    return (
                      <li key={option.id}>
                        <label className="group relative">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleOption(option.id)}
                            aria-invalid={
                              (attempted && optionsMissing) || undefined
                            }
                            aria-describedby={
                              attempted && optionsMissing
                                ? "options-error"
                                : undefined
                            }
                            className="sr-only peer"
                          />
                          <span
                            className={cn(
                              "flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3.5 py-3 transition-all duration-200",
                              focusVisible,
                              selected
                                ? "border-amber-400/70 bg-amber-500/[0.04] shadow-[0_0_16px_rgba(245,158,11,0.10)]"
                                : cardIdle,
                            )}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                aria-hidden
                                className={cn(
                                  "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                                  selected
                                    ? "border-amber-400 bg-amber-400 text-neutral-950"
                                    : "border-neutral-700 bg-neutral-950 text-transparent",
                                )}
                              >
                                <Check className="size-3" />
                              </span>
                              <Icon
                                aria-hidden
                                className={cn(
                                  "size-4 shrink-0 transition-colors",
                                  selected ? "text-amber-400" : "text-neutral-500",
                                )}
                              />
                              <span className="text-sm font-medium text-foreground">
                                {option.label}
                              </span>
                            </span>
                            <span
                              className={cn(
                                "text-sm font-semibold transition-colors",
                                selected ? "text-amber-400" : "text-muted-foreground",
                              )}
                            >
                              {formatCurrency(option.price)}
                            </span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                {attempted && optionsMissing ? (
                  <p
                    id="options-error"
                    role="alert"
                    className="flex items-center gap-2 text-sm text-destructive"
                  >
                    <AlertTriangle className="size-4 shrink-0" aria-hidden />
                    Add at least one maintenance service. You can adjust your
                    selection before confirming.
                  </p>
                ) : null}
              </fieldset>

              <Button
                type="submit"
                size="lg"
                variant="glow"
                className="w-full justify-center text-base"
              >
                {quoteReady ? "Quote generated" : "Get instant quote"}
                {quoteReady ? <Check aria-hidden /> : <ArrowRight aria-hidden />}
              </Button>
            </CardContent>
          </Card>

          <Card className="sticky top-28 gap-6 border-neutral-800/80 bg-neutral-950/60">
            <CardHeader className="gap-2 sm:px-7 sm:pt-7">
              <CardTitle className="flex items-center gap-2 text-h3">
                <Sparkles className="size-5 text-amber-400" aria-hidden />
                Your estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 sm:px-7 sm:pb-7">
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col gap-6"
              >
                {equipment === null ? (
                  <p className="rounded-xl border border-dashed border-white/10 bg-neutral-950/40 p-5 text-sm leading-relaxed text-muted-foreground">
                    {summaryMessage}
                  </p>
                ) : (
                  <dl className="flex flex-col divide-y divide-white/5 text-sm">
                    <div className="flex items-center justify-between gap-3 py-3 first:pt-0">
                      <dt className="text-muted-foreground">Equipment</dt>
                      <dd className="font-semibold text-foreground">
                        {equipment.label}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-3">
                      <dt className="text-muted-foreground">Base service</dt>
                      <dd className="font-semibold text-foreground">
                        {formatCurrency(equipment.basePrice)}
                      </dd>
                    </div>
                    {frequency.multiplier < 1 ? (
                      <div className="flex items-center justify-between gap-3 py-3">
                        <dt className="text-muted-foreground">
                          {frequency.label} discount
                        </dt>
                        <dd className="font-medium text-amber-400">
                          {formatCurrency(-savings)}
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex items-start justify-between gap-3 py-3 last:pb-0">
                      <dt className="text-muted-foreground">
                        Maintenance{" "}
                        <span className="block text-xs">
                          {chosenOptions.length} service
                          {chosenOptions.length === 1 ? "" : "s"} selected
                        </span>
                      </dt>
                      <dd className="text-right font-medium text-foreground">
                        {chosenOptions.map((option) => (
                          <span key={option.id} className="block">
                            {option.label}: {formatCurrency(option.price)}
                          </span>
                        ))}
                        {chosenOptions.length === 0 ? (
                          <span className="block text-muted-foreground">
                            —
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  </dl>
                )}

                <div className="flex flex-col gap-4 border-t border-white/5 pt-5">
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Estimated total
                    </p>
                    {quoteReady ? (
                      <Badge
                        variant={submitState === "success" ? "amber" : "default"}
                      >
                        {submitState === "success"
                          ? "Confirmed"
                          : submitState === "submitting"
                            ? "Saving…"
                            : "Ready to confirm"}
                      </Badge>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {frequency.cadence}
                      </p>
                    )}
                  </div>
                  <p className="font-display text-h2 font-bold text-foreground">
                    {equipment === null
                      ? formatCurrency(0)
                      : formatCurrency(estimatedPrice)}
                  </p>
                  {equipment !== null ? (
                    <p className="-mt-2 text-xs leading-relaxed text-muted-foreground">
                      {frequency.multiplier < 1
                        ? `Renews monthly. Includes free cancellation up to 24 hours before each visit.`
                        : `No commitment. Free cancellation up to 24 hours before the visit.`}
                    </p>
                  ) : null}
                </div>
              </div>

              {quoteReady ? (
                <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                  {submitState === "success" ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-6 py-8 text-center"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                        <CheckCircle2 className="size-5" aria-hidden />
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="font-display text-h4 font-bold text-foreground">
                          Quotation confirmed
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {quotationId
                            ? `Reference #${quotationId}. A technician will call you within one business hour.`
                            : "A technician will call you within one business hour."}
                        </p>
                      </div>
                    </div>
                  ) : submitState === "error" ? (
                    <p
                      role="alert"
                      className="flex items-center justify-between gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
                    >
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="size-4 shrink-0" aria-hidden />
                        {submitError}
                      </span>
                      <button
                        type="button"
                        onClick={confirmQuote}
                        className="shrink-0 rounded-md border border-destructive/40 px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-destructive/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                      >
                        Retry
                      </button>
                    </p>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      variant="glow"
                      onClick={confirmQuote}
                      disabled={submitState === "submitting"}
                      className="w-full justify-center text-base"
                    >
                      {submitState === "submitting" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                          Saving quotation…
                        </>
                      ) : (
                        <>
                          Confirm this quote
                          <ArrowRight aria-hidden />
                        </>
                      )}
                    </Button>
                  )}
                  <p className="text-center text-xs text-muted-foreground">
                    A technician confirms your quote by phone within one
                    business hour.
                  </p>
                </div>
              ) : attempted && hasErrors ? (
                <p className="flex items-start gap-2 border-t border-white/5 pt-4 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  Complete the highlighted fields to generate your quote.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </form>
      </Container>
    </section>
  );
}

export { QuotationCalculator };