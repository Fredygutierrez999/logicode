import { AiSection } from "@/components/AiSection";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Hero />
        <Services />
        <AiSection />
        <Approach />
        <Process />
        <TechStack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
