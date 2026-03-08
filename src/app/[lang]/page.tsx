import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/sections/hero/Hero";
import { BrandStatement } from "@/sections/brand/BrandStatement";
import { Services } from "@/sections/services/Services";
import { Projects } from "@/sections/projects/Projects";
import { Process } from "@/sections/process/Process";
import { WhyChoose } from "@/sections/why/WhyChoose";
import { CTA } from "@/sections/cta/CTA";
import { Footer } from "@/sections/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main role="main">
        <Hero />
        <BrandStatement />
        <Services />
        <Projects />
        <Process />
        <WhyChoose />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
