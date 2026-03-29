import { ArrowRight } from "lucide-react";
import berryLogo from "@/assets/berry-logo.webp";
import { useScrollReveal, stagger } from "@/hooks/useScrollReveal";

const Hero = () => {
  const hero = useScrollReveal();

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Decorative background element */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.03] pointer-events-none"
        style={{
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-28 pb-20 lg:pt-0 lg:pb-0">
        {/* Copy */}
        <div ref={hero.ref}>
          <div
            {...stagger(hero.visible, 0)}
            className={`inline-flex items-center gap-2.5 px-4 py-2 border border-primary/20 mb-8 ${stagger(hero.visible, 0).className}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
              Estudio creativo
            </span>
          </div>

          <h1
            {...stagger(hero.visible, 1)}
            className={`text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground ${stagger(hero.visible, 1).className}`}
          >
            Tu marca merece
            <br />
            <span className="text-primary font-normal">destacar</span>
          </h1>

          <p
            {...stagger(hero.visible, 2)}
            className={`mt-7 text-[15px] font-normal text-muted-foreground leading-[1.8] max-w-md ${stagger(hero.visible, 2).className}`}
          >
            Diseño en comunicación visual y social media marketing
            estratégico para marcas que buscan crecer con identidad propia.
          </p>

          <div
            {...stagger(hero.visible, 3)}
            className={`mt-10 flex flex-col sm:flex-row gap-4 ${stagger(hero.visible, 3).className}`}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
            >
              Solicitar presupuesto
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Conocé más
            </a>
          </div>
        </div>

        {/* Logo visual */}
        <div
          {...stagger(hero.visible, 2)}
          className={`flex items-center justify-center ${stagger(hero.visible, 2).className}`}
        >
          <div className="relative">
            <div className="absolute inset-0 -m-8 border border-primary/10" />
            <div className="absolute inset-0 -m-16 border border-primary/[0.05]" />
            <img
              src={berryLogo}
              alt="Berry Graphics"
              className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain relative z-10"
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-[1500ms]"
        style={{ opacity: hero.visible ? 0.25 : 0, transitionDelay: "1400ms" }}
      >
        <div className="w-px h-10 bg-primary/30" />
      </div>
    </section>
  );
};

export default Hero;
