import { Cta } from "@/components/site/cta";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { Process } from "@/components/site/process";
import { Services } from "@/components/site/services";

export default function HomePage() {
  return (
    <main id="main" className="flex flex-col">
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <Cta />
    </main>
  );
}