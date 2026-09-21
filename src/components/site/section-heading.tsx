import { cn } from "@/lib/utils";

function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.22em] text-brand-400 uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-h2 text-foreground">{title}</h2>
      {description ? (
        <p className="text-lead text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export { Eyebrow, SectionHeading };