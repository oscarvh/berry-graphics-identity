import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";

const useScrollReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
};

const revealClass = (visible: boolean) =>
  `transition-all duration-1000 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;

const Index = () => {
  const hero = useScrollReveal();
  const mission = useScrollReveal(100);
  const pillars = useScrollReveal(100);
  const diff = useScrollReveal(100);
  const cta = useScrollReveal(100);
  const contact = useScrollReveal(100);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <section
        ref={hero.ref}
        className={`flex flex-col items-center justify-center text-center min-h-screen px-6 ${revealClass(hero.visible)}`}
      >
        <h1 className="text-7xl md:text-9xl font-light tracking-tight text-primary leading-none">
          Berry
        </h1>
        <span className="mt-3 text-sm md:text-base font-normal tracking-[0.4em] uppercase text-muted-foreground">
          Graphics
        </span>
        <p className="mt-12 max-w-md text-base md:text-lg font-light text-muted-foreground leading-relaxed">
          Diseño en comunicación visual
          <br />y social media marketing
        </p>
        <div className="mt-16 w-8 h-[1px] bg-primary/30" />
      </section>

      {/* Mission */}
      <section
        ref={mission.ref}
        className={`px-6 py-24 md:py-32 flex justify-center ${revealClass(mission.visible)}`}
      >
        <div className="max-w-xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            Estudio boutique
          </p>
          <p className="text-lg md:text-xl font-light text-foreground leading-relaxed">
            Elevamos la identidad visual de marcas que valoran la sofisticación
            y el orden visual. Diseño silencioso, pero potente.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section
        ref={pillars.ref}
        className={`px-6 py-24 md:py-32 flex justify-center ${revealClass(pillars.visible)}`}
      >
        <div className="max-w-3xl w-full grid md:grid-cols-2 gap-16 md:gap-20">
          <div className="text-center md:text-left">
            <div className="w-10 h-[2px] bg-primary mb-6 mx-auto md:mx-0" />
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              Comunicación Visual
            </h2>
            <p className="text-base font-light text-muted-foreground leading-relaxed">
              Identidades gráficas, logotipos y sistemas visuales coherentes que
              construyen marcas memorables.
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="w-10 h-[2px] bg-primary mb-6 mx-auto md:mx-0" />
            <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              Social Media
            </h2>
            <p className="text-base font-light text-muted-foreground leading-relaxed">
              Estrategia y diseño de contenido para plataformas digitales con
              estética de alto nivel.
            </p>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section
        ref={diff.ref}
        className={`px-6 py-24 md:py-32 flex justify-center bg-muted/50 ${revealClass(diff.visible)}`}
      >
        <div className="max-w-lg text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            Diferencial
          </p>
          <p className="text-lg md:text-xl font-light text-foreground leading-relaxed">
            No saturamos. No explicamos de más.
            <br />
            <span className="text-primary font-normal">
              La ejecución habla por sí misma.
            </span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        className={`px-6 py-32 md:py-40 flex justify-center ${revealClass(cta.visible)}`}
      >
        <div className="text-center">
          <p className="text-sm font-light text-muted-foreground mb-8 tracking-wide">
            ¿Listo para elevar tu marca?
          </p>
          <a
            href="mailto:hola@berrygraphics.com"
            className="inline-flex items-center gap-3 px-8 py-3 border border-primary text-primary text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Trabajemos juntos
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Contact */}
      <section
        ref={contact.ref}
        className={`px-6 py-16 md:py-20 flex justify-center ${revealClass(contact.visible)}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <a
            href="mailto:hola@berrygraphics.com"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-300 hover:text-secondary tracking-wide"
          >
            <Mail className="w-4 h-4" />
            hola@berrygraphics.com
          </a>
          <a
            href="https://instagram.com/berrygraphics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-foreground transition-colors duration-300 hover:text-secondary tracking-wide"
          >
            @berrygraphics
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs font-normal text-muted-foreground tracking-wider">
          Berry Graphics® — 2026
        </p>
      </footer>
    </main>
  );
};

export default Index;
