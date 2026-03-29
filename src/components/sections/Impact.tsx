import { useScrollReveal, reveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const Impact = () => {
  const section = useScrollReveal(100);

  return (
    <section
      ref={section.ref}
      className={`relative px-6 md:px-12 lg:px-20 py-28 md:py-40 overflow-hidden ${reveal(section.visible)}`}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Big statement */}
          <div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
              Impacto visual
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-foreground leading-[1.1] tracking-[-0.02em]">
              Marcas que
              <br />
              <span className="text-primary font-normal">comunican</span>
              <br />
              con claridad
            </h2>
          </div>

          {/* Right — Stats + CTA */}
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="border-t-2 border-primary/20 pt-6">
                <span className="text-3xl sm:text-4xl font-light text-primary">150+</span>
                <p className="mt-2 text-[12px] font-normal text-muted-foreground tracking-wide uppercase">
                  Marcas potenciadas
                </p>
              </div>
              <div className="border-t-2 border-primary/20 pt-6">
                <span className="text-3xl sm:text-4xl font-light text-primary">5+</span>
                <p className="mt-2 text-[12px] font-normal text-muted-foreground tracking-wide uppercase">
                  Años de experiencia
                </p>
              </div>
            </div>

            <p className="text-[14px] font-normal text-muted-foreground leading-[1.8] max-w-sm">
              Cada proyecto es una oportunidad para crear algo memorable.
              Diseño estratégico que transforma la percepción de tu marca
              y conecta con tu audiencia.
            </p>

            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary hover:text-secondary transition-colors duration-300"
            >
              Empezá tu proyecto
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
