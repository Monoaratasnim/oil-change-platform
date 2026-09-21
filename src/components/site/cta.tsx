import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/site/contact-form";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

function Cta() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-full bg-glow-ember opacity-70"
      />
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>Book a service</Eyebrow>
          <h2 className="max-w-2xl font-display text-h1 text-foreground">
            Ready for service you won&apos;t have to think about?
          </h2>
          <p className="max-w-xl text-lead text-muted-foreground">
            Book your first on-site appointment or ask for a custom fleet quote.
            We answer every line within one business hour.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+15550129876"
              className={cn(buttonVariants({ variant: "glow", size: "lg" }))}
            >
              <Phone aria-hidden />
              (555) 012-9876
            </a>
            <a
              href="mailto:ops@emberline.example"
              className={cn(buttonVariants({ variant: "outlined", size: "lg" }))}
            >
              ops@emberline.example
              <ArrowRight aria-hidden />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Currently servicing the Portland and Seattle restaurant districts —
            expanding monthly.
          </p>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}

export { Cta };