import { Cta } from "@/components/site/cta";
import { ErrorBoundary } from "@/components/site/error-boundary";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { Process } from "@/components/site/process";
import { QuotationCalculator } from "@/components/site/quotation-calculator";
import { Services } from "@/components/site/services";

export default function HomePage() {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <ErrorBoundary>
        <QuotationCalculator />
      </ErrorBoundary>
      <Cta />
    </main>
  );
}