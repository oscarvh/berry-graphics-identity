import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number) => ({
    className: `transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: loaded ? `${delay}ms` : "0ms" },
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
      {/* Top nav bar */}
      <nav
        {...fade(0)}
        className={`absolute top-0 left-0 right-0 px-6 md:px-16 lg:px-24 py-8 flex items-center justify-between z-20 ${fade(0).className}`}
      >
        <div className="flex items-center gap-3">
          <img src="/Berrylogo.svg" alt="Berry Graphic" className="w-8 h-8 object-contain" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-[14px] font-semibold text-primary">Berry</span>
            <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground">
              Graphic
            </span>
          </div>
        </div>
        <a
          href="#contacto"
          className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 border border-primary/20 text-[10px] font-semibold tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Contactar
        </a>
      </nav>

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-8 items-center">
        {/* Left — Copy */}
        <div className="relative z-10">
          <div
            {...fade(200)}
            className={`flex items-center gap-4 mb-10 ${fade(200).className}`}
          >
            <div className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary">
              Estudio creativo
            </span>
          </div>

          <h1
            {...fade(400)}
            className={`text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem] font-light leading-[1.05] tracking-[-0.03em] text-foreground ${fade(400).className}`}
          >
            Diseño que
            <br />
            hace{" "}
            <span className="relative inline-block text-primary font-normal">
              crecer
              <span
                className="absolute -bottom-1 left-0 h-[2px] bg-primary/30 origin-left"
                style={{
                  width: loaded ? "100%" : "0%",
                  transition: "width 1200ms cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: "900ms",
                }}
              />
            </span>
            <br />
            tu marca
          </h1>

          <p
            {...fade(600)}
            className={`mt-8 text-[15px] sm:text-base font-normal text-muted-foreground leading-[1.85] max-w-[420px] ${fade(600).className}`}
          >
            Comunicación visual y social media marketing estratégico
            para marcas que buscan conectar, posicionarse y vender más.
          </p>

          <div
            {...fade(800)}
            className={`mt-12 flex flex-col sm:flex-row gap-4 ${fade(800).className}`}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
            >
              Solicitar presupuesto
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#valor"
              className="inline-flex items-center justify-center px-10 py-5 border border-border text-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Descubrí más
            </a>
          </div>
        </div>

        {/* Right — Logo composition */}
        <div
          {...fade(500)}
          className={`relative flex items-center justify-center py-16 lg:py-0 ${fade(500).className}`}
        >
          {/* Geometric frame system */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] border border-primary/[0.08]"
              style={{
                transform: loaded ? "rotate(0deg) scale(1)" : "rotate(-3deg) scale(0.95)",
                opacity: loaded ? 1 : 0,
                transition: "all 2000ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: "600ms",
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px] border border-primary/[0.05]"
              style={{
                transform: loaded ? "rotate(0deg) scale(1)" : "rotate(2deg) scale(0.9)",
                opacity: loaded ? 1 : 0,
                transition: "all 2200ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: "800ms",
              }}
            />
          </div>

          {/* Red accent corner */}
          <div
            className="absolute top-8 right-8 sm:top-4 sm:right-4 lg:top-0 lg:right-0"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 1500ms ease",
              transitionDelay: "1200ms",
            }}
          >
            <div className="w-16 h-px bg-primary/30" />
            <div className="w-px h-16 bg-primary/30 ml-[calc(100%-1px)]" />
          </div>

          {/* Logo */}
          <img
            src="/Berrylogo.svg"
            alt="Berry Graphic"
            className="relative z-10 w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 object-contain"
          />
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        {...fade(1000)}
        className={`absolute bottom-0 left-0 right-0 border-t border-border px-6 md:px-16 lg:px-24 py-6 ${fade(1000).className}`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-8 sm:gap-16">
          {[
            ["150+", "Marcas"],
            ["5+", "Años"],
            ["100%", "Dedicación"],
          ].map(([num, label]) => (
            <div key={label} className="flex items-baseline gap-2.5">
              <span className="text-xl sm:text-2xl font-light text-primary">{num}</span>
              <span className="text-[10px] font-normal tracking-[0.2em] uppercase text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
