import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Lock,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/section-heading";
import { listInquiries, listQuotations } from "@/db/queries";
import type { Inquiry, Quotation } from "@/db/schema";
import { cn } from "@/lib/utils";

const COOKIE_NAME = "adminkey";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatCurrency(value: string) {
  return currencyFormatter.format(Number(value));
}

function formatDate(value: Date) {
  return dateFormatter.format(value);
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-semibold tracking-[0.18em] whitespace-nowrap text-muted-foreground uppercase">
      {children}
    </th>
  );
}

function OptionChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 text-xs text-muted-foreground">
      {label}
    </span>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={cn(
          "font-display text-h2 font-bold",
          accent ? "text-brand-400" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string | string[]; failed?: string | string[] }>;
}) {
  const params = await searchParams;
  const keyParam = typeof params.key === "string" ? params.key : undefined;
  const failed =
    Array.isArray(params.failed)
      ? false
      : params.failed === "1";

  const cookieStore = await cookies();
  const storedKey = cookieStore.get(COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SECRET_KEY;

  const authorized = Boolean(secret) && (storedKey === secret || keyParam === secret);

  if (authorized && storedKey !== secret && keyParam) {
    redirect(
      `/api/dashboard/auth?key=${encodeURIComponent(keyParam)}`,
    );
  }

  if (!authorized) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md gap-6">
          <CardHeader className="items-center gap-3 text-center sm:px-8 sm:pt-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Lock className="size-5" aria-hidden />
            </span>
            <Badge variant="brand">Staff only</Badge>
            <CardTitle className="text-h2">Access restricted</CardTitle>
            <CardDescription className="text-balance">
              Enter the staff access key to view submitted quotations and
              contact inquiries.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:px-8 sm:pb-8">
            {failed ? (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
              >
                <AlertTriangle className="size-4 shrink-0" aria-hidden />
                That access key is invalid. Please try again.
              </p>
            ) : null}
            <form
              action="/api/dashboard/auth"
              method="get"
              className="flex flex-col gap-3"
            >
              <label
                htmlFor="access-key"
                className="text-sm font-medium text-foreground"
              >
                Access key
              </label>
              <input
                id="access-key"
                name="key"
                type="password"
                required
                autoComplete="current-password"
                className="h-11 rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
              <Button type="submit" size="lg" className="w-full">
                Unlock dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  let quotations: Quotation[] = [];
  let inquiries: Inquiry[] = [];
  let loadError = false;

  try {
    [quotations, inquiries] = await Promise.all([
      listQuotations(),
      listInquiries(),
    ]);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    loadError = true;
  }

  if (loadError) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md gap-6">
          <CardHeader className="items-center gap-3 text-center sm:px-8 sm:pt-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
              <AlertTriangle className="size-5" aria-hidden />
            </span>
            <CardTitle className="text-h2">Could not load records</CardTitle>
            <CardDescription className="text-balance">
              The dashboard could not reach the database. Your session is still
              active — try again in a moment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-3 sm:px-8 sm:pb-8">
            <a
              href="/dashboard"
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
              )}
            >
              <RefreshCw className="size-4" aria-hidden />
              Try again
            </a>
          </CardContent>
        </Card>
      </main>
    );
  }

  const subscriptionCount = quotations.filter(
    (quotation) => quotation.serviceTier === "monthly",
  ).length;

  return (
    <main id="main" className="min-h-dvh pt-24 pb-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <Eyebrow>Staff dashboard</Eyebrow>
              <h1 className="font-display text-h2 text-foreground">
                Quotations &amp; inquiries
              </h1>
              <p className="max-w-xl text-lead text-muted-foreground">
                Every request submitted through the site, newest first.
              </p>
            </div>
            <a
              href="/api/dashboard/auth?signout=1"
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
              )}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Sign out
            </a>
          </div>

          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total quotations" value={quotations.length} />
            <StatCard label="Total inquiries" value={inquiries.length} />
            <StatCard
              label="Subscriptions"
              value={subscriptionCount}
              accent
            />
            <StatCard
              label="New inquiries"
              value={inquiries.length}
              accent
            />
          </dl>
        </div>

        <section
          aria-labelledby="quotations-heading"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id="quotations-heading"
              className="font-display text-h3 text-foreground"
            >
              Quotations
            </h2>
            <Badge variant="outline">{quotations.length}</Badge>
          </div>

          {quotations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-background/40 p-8 text-center text-sm text-muted-foreground">
              No quotations submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <TableHead>ID</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Maintenance options</TableHead>
                    <TableHead>Estimate</TableHead>
                    <TableHead>Created</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                    >
                      <td className="px-4 py-3 font-medium whitespace-nowrap text-muted-foreground">
                        #{quotation.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {quotation.equipmentType}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {quotation.serviceTier === "monthly" ? (
                          <Badge variant="brand">Subscription</Badge>
                        ) : (
                          <Badge variant="outline">One-time</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {quotation.selectedOptions.length > 0 ? (
                          <div className="flex max-w-md flex-wrap gap-1.5">
                            {quotation.selectedOptions.map((option) => (
                              <OptionChip key={option} label={option} />
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap text-foreground">
                        {formatCurrency(quotation.estimatedPrice)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {formatDate(quotation.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section
          aria-labelledby="inquiries-heading"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id="inquiries-heading"
              className="font-display text-h3 text-foreground"
            >
              Contact inquiries
            </h2>
            <Badge variant="outline">{inquiries.length}</Badge>
          </div>

          {inquiries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-background/40 p-8 text-center text-sm text-muted-foreground">
              No contact inquiries submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Business address</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Received</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="brand">New</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">
                        {inquiry.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-brand-400 transition-colors hover:text-brand-300"
                        >
                          {inquiry.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {inquiry.phone}
                      </td>
                      <td className="px-4 py-3 max-w-[14rem] whitespace-nowrap overflow-hidden text-ellipsis text-muted-foreground">
                        {inquiry.businessAddress}
                      </td>
                      <td className="px-4 py-3">
                        <p className="line-clamp-2 max-w-xs leading-relaxed text-muted-foreground">
                          {inquiry.message}
                        </p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {formatDate(inquiry.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-brand-400" aria-hidden />
          Staff area — only visible with a valid access key.
        </p>
      </Container>
    </main>
  );
}