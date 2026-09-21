"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s()+.-]+$/;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_ADDRESS_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  businessAddress: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  businessAddress: "",
  message: "",
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  const name = values.name.trim();
  if (name.length === 0) {
    errors.name = "Name is required.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be at most ${MAX_NAME_LENGTH} characters.`;
  }

  const email = values.email.trim().toLowerCase();
  if (email.length === 0) {
    errors.email = "Email is required.";
  } else if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const phone = values.phone.trim();
  if (phone.length === 0) {
    errors.phone = "Phone number is required.";
  } else if (phone.length > MAX_PHONE_LENGTH || !PHONE_PATTERN.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  const address = values.businessAddress.trim();
  if (address.length === 0) {
    errors.businessAddress = "Business address is required.";
  } else if (address.length > MAX_ADDRESS_LENGTH) {
    errors.businessAddress = `Business address must be at most ${MAX_ADDRESS_LENGTH} characters.`;
  }

  const message = values.message.trim();
  if (message.length === 0) {
    errors.message = "Message is required.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-neutral-950/50 px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground",
    "hover:border-neutral-600",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    hasError ? "border-destructive/70" : "border-neutral-800",
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-foreground"
    >
      {children}
    </label>
  );
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-sm text-destructive"
    >
      <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
      setServerError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const serverFields = payload?.fields;
        if (serverFields && typeof serverFields === "object") {
          setErrors({ ...serverFields });
        }
        setServerError(
          payload?.error ?? "We could not send your inquiry. Please try again.",
        );
        setStatus("error");
        return;
      }
      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus("success");
    } catch {
      setServerError(
        "Network error — your inquiry was not sent. Please try again.",
      );
      setStatus("error");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-2xl gap-6 border-neutral-800/80 bg-neutral-950/60">
      <CardHeader className="gap-2 text-center sm:px-8 sm:pt-8">
        <CardTitle className="text-h3">Send us an inquiry</CardTitle>
        <CardDescription className="text-balance">
          Tell us about your fleet and scheduling needs. We answer every line
          within one business hour.
        </CardDescription>
      </CardHeader>
      <CardContent className="sm:px-8 sm:pb-8">
        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-4 rounded-xl border border-amber-400/30 bg-amber-500/10 px-6 py-10 text-center"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
              <CheckCircle2 className="size-5" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-display text-h4 font-bold text-foreground">
                Inquiry sent
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Thanks for reaching out. A technician will reply within one
                business hour.
              </p>
            </div>
            <Button
              type="button"
              variant="outlined"
              size="sm"
              onClick={() => setStatus("idle")}
            >
              Send another inquiry
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="inquiry-name">Name</Label>
                <input
                  id="inquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                  className={cn(inputClass(Boolean(errors.name)), "h-11")}
                />
                <FieldError id="inquiry-name-error" message={errors.name} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="inquiry-email">Email</Label>
                <input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                  className={cn(inputClass(Boolean(errors.email)), "h-11")}
                />
                <FieldError id="inquiry-email-error" message={errors.email} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="inquiry-phone">Phone</Label>
                <input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
                  className={cn(inputClass(Boolean(errors.phone)), "h-11")}
                />
                <FieldError id="inquiry-phone-error" message={errors.phone} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="inquiry-address">Business address</Label>
                <input
                  id="inquiry-address"
                  name="businessAddress"
                  type="text"
                  autoComplete="street-address"
                  value={values.businessAddress}
                  onChange={(event) =>
                    updateField("businessAddress", event.target.value)
                  }
                  aria-invalid={Boolean(errors.businessAddress)}
                  aria-describedby={
                    errors.businessAddress ? "inquiry-address-error" : undefined
                  }
                  className={cn(inputClass(Boolean(errors.businessAddress)), "h-11")}
                />
                <FieldError
                  id="inquiry-address-error"
                  message={errors.businessAddress}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="inquiry-message">Message</Label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(event) => updateField("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "inquiry-message-error" : undefined
                }
                className={cn(
                  inputClass(Boolean(errors.message)),
                  "min-h-32 resize-y py-3",
                )}
              />
              <FieldError id="inquiry-message-error" message={errors.message} />
            </div>

            {status === "error" ? (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
              >
                <AlertTriangle className="size-4 shrink-0" aria-hidden />
                {serverError}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              variant="glow"
              disabled={status === "submitting"}
              className="w-full justify-center text-base"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  Send inquiry
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export { ContactForm };