import { useScrollReveal, reveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const Impact = () => {
  const section = useScrollReveal(50);

  return (
    <section
      ref={section.ref}
      className="relative overflow-hidden"
    >
      {/* Full-width red band */}
      <div className="bg-primary text-primary-foreground px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <div className={`max-w-7xl mx-auto ${reveal(section.visible)}`}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Big statement */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-light leading-[1.08] tracking-[-0.02em]">
                Marcas que
                <br />
                comunican con
                <br />
                <span className="font-normal">claridad</span>
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <span className="text-4xl sm:text-5xl font-light">150+</span>
                  <div className="mt-3 w-8 h-px bg-primary-foreground/30" />
                  <p className="mt-3 text-[11px] font-normal tracking-[0.2em] uppercase opacity-70">
                    Marcas potenciadas
                  </p>
                </div>
                <div>
                  <span className="text-4xl sm:text-5xl font-light">5+</span>
                  <div className="mt-3 w-8 h-px bg-primary-foreground/30" />
                  <p className="mt-3 text-[11px] font-normal tracking-[0.2em] uppercase opacity-70">
                    Años de experiencia
                  </p>
                </div>
              </div>

              <p className="text-[15px] font-normal leading-[1.85] opacity-80 max-w-sm">
                Cada proyecto es una oportunidad para crear algo memorable.
                Diseño estratégico que transforma la percepción de tu marca.
              </p>

              <a
                href="#contacto"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                Empezá tu proyecto
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
