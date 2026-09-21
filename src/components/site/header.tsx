import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/site/logo";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#quote", label: "Quote" },
  { href: "/#contact", label: "Contact" },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none"
          >
            Book now
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary
            aria-label="Toggle navigation menu"
            className="flex size-10 list-none cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none [&::-webkit-details-marker]:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </summary>
          <nav
            aria-label="Primary mobile"
            className="absolute right-0 top-12 flex w-56 flex-col gap-1 rounded-xl border border-border bg-popover p-2 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none"
            >
              Book now
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export { Header };