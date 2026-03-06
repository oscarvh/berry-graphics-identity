import { useEffect, useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Results from "@/components/sections/Results";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useScrollReveal, reveal, stagger } from "@/hooks/useScrollReveal";

const stats = [
  { value: "150+", label: "Marcas potenciadas" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "5 años", label: "De experiencia" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useScrollReveal(100);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />

      <main className="flex flex-col overflow-x-hidden">
        <Hero />

        {/* Stats */}
        <section
          ref={statsRef.ref}
          className={`px-6 md:px-12 lg:px-20 py-20 border-y border-border ${reveal(statsRef.visible)}`}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} {...stagger(statsRef.visible, i)} className={`text-center ${stagger(statsRef.visible, i).className}`}>
                <span className="block text-3xl sm:text-4xl font-light text-primary tracking-tight">
                  {s.value}
                </span>
                <span className="block mt-3 text-[10px] font-normal tracking-[0.25em] uppercase text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Services />
        <Results />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
