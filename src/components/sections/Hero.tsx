import { ArrowRight } from "lucide-react";
import berryLogo from "@/assets/berry-logo.webp";
import { useScrollReveal, stagger } from "@/hooks/useScrollReveal";

const Hero = () => {
  const hero = useScrollReveal();

  return (
    <section
      ref={hero.ref}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1fr,0.8fr] gap-16 lg:gap-24 items-center pt-24 lg:pt-0">
        {/* Copy */}
        <div>
          <div
            {...stagger(hero.visible, 0)}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 border border-primary/15 mb-10 ${stagger(hero.visible, 0).className}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
              Estudio creativo
            </span>
          </div>

          <h1
            {...stagger(hero.visible, 1)}
            className={`text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground ${stagger(hero.visible, 1).className}`}
          >
            Diseño que
            <br />
            <span className="text-primary font-normal">convierte</span>
          </h1>

          <p
            {...stagger(hero.visible, 2)}
            className={`mt-8 text-[15px] font-normal text-muted-foreground leading-[1.7] max-w-md ${stagger(hero.visible, 2).className}`}
          >
            Comunicación visual y social media marketing
            <br className="hidden sm:block" />
            estratégico para marcas con identidad propia.
          </p>

          <div
            {...stagger(hero.visible, 3)}
            className={`mt-12 flex flex-col sm:flex-row gap-4 ${stagger(hero.visible, 3).className}`}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
            >
              Solicitar presupuesto
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Visual */}
        <div
          {...stagger(hero.visible, 2)}
          className={`hidden lg:flex items-center justify-center ${stagger(hero.visible, 2).className}`}
        >
          <div className="relative">
            <img
              src={berryLogo}
              alt="Berry Graphics"
              className="w-56 h-56 object-contain"
            />
            {/* Geometric accents */}
            <div
              className="absolute -bottom-10 -left-10 w-36 h-36 border border-primary/10 transition-all duration-[2500ms] ease-out"
              style={{
                transform: hero.visible ? "translate(0,0)" : "translate(-16px,16px)",
                opacity: hero.visible ? 1 : 0,
              }}
            />
            <div
              className="absolute -top-8 -right-8 w-24 h-24 border border-primary/8 transition-all duration-[2500ms] ease-out"
              style={{
                transform: hero.visible ? "translate(0,0)" : "translate(16px,-16px)",
                opacity: hero.visible ? 1 : 0,
                transitionDelay: "200ms",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-[1500ms]"
        style={{ opacity: hero.visible ? 0.3 : 0, transitionDelay: "1400ms" }}
      >
        <div className="w-px h-10 bg-primary/25" />
      </div>
    </section>
  );
};

export default Hero;
