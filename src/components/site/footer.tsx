import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/site/logo";

const serviceLinks = [
  { href: "#services", label: "On-site oil changes" },
  { href: "#pricing", label: "Subscription plans" },
  { href: "#pricing", label: "Fleet contracts" },
  { href: "#process", label: "How it works" },
  { href: "#contact", label: "Book a service" },
];

const companyLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-oil-900/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="flex max-w-sm flex-col items-start gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Emberline is the on-site oil change service built for commercial
              kitchens. Certified technicians, full-synthetic oil, and dispatch
              windows that respect the line.
            </p>
          </div>

          <nav aria-label="Services" className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Services
            </h2>
            <ul className="grid gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-brand-400 focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Company
            </h2>
            <ul className="grid gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-brand-400 focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Contact
            </h2>
            <ul className="grid gap-3 text-sm text-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                <span>
                  4820 SE Powell Blvd, Portland, OR 97206
                </span>
              </li>
              <li>
                <a
                  href="tel:+15550129876"
                  className="flex items-start gap-2.5 transition-colors hover:text-brand-400 focus-visible:outline-none"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                  (555) 012-9876
                </a>
              </li>
              <li>
                <a
                  href="mailto:ops@emberline.example"
                  className="flex items-start gap-2.5 transition-colors hover:text-brand-400 focus-visible:outline-none"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                  ops@emberline.example
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                <span>Mon–Sat, 6:00 AM – 10:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Emberline Logistics LLC. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };