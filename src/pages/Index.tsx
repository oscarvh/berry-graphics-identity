import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight, ChevronDown, Send } from "lucide-react";

/* ── scroll-reveal hook ── */
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

const reveal = (visible: boolean) =>
  `transition-all duration-1000 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;

/* ── page ── */
const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hero = useScrollReveal();
  const services = useScrollReveal(100);
  const manifesto = useScrollReveal(100);
  const process = useScrollReveal(100);
  const cta = useScrollReveal(100);

  return (
    <>
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur shadow-sm"
            : "bg-transparent"
        }`}
      >
        <span className="text-2xl md:text-3xl font-light tracking-tight">
          <span className="text-primary font-semibold">Berry</span>
          <span className="text-muted-foreground font-light text-sm tracking-[0.3em] uppercase ml-2">Graphics</span>
        </span>
        <a
          href="#contacto"
          className="text-sm font-semibold tracking-wide text-foreground transition-colors duration-300 hover:text-secondary"
        >
          Contacto
        </a>
      </nav>

      <main className="flex flex-col">
        {/* ── HERO ── */}
        <section
          ref={hero.ref}
          className={`relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 ${reveal(hero.visible)}`}
        >
          <div className="flex gap-6 md:gap-8 items-stretch">
            {/* vertical accent line */}
            <div className="hidden md:block w-[3px] bg-primary rounded-full" />

            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.95] tracking-tight">
                <span className="text-foreground">Comunicación</span>
                <br />
                <span className="text-primary">Visual</span>
              </h1>

              <p className="mt-8 text-sm sm:text-base font-normal tracking-[0.25em] uppercase text-muted-foreground">
                Diseño estratégico &amp; Social Media Marketing
              </p>
            </div>
          </div>

          {/* scroll indicator */}
          <a
            href="#servicios"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60 animate-bounce"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </section>

        {/* ── SERVICIOS ── */}
        <section
          id="servicios"
          ref={services.ref}
          className={`px-8 md:px-16 lg:px-24 py-28 md:py-36 ${reveal(services.visible)}`}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20">
            {/* 01 */}
            <div>
              <div className="w-12 h-[2px] bg-primary mb-8" />
              <span className="block text-5xl font-light text-primary/20 mb-4">
                01
              </span>
              <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground mb-4">
                Comunicación Visual
              </h2>
              <p className="text-base font-light text-muted-foreground leading-relaxed">
                Identidades gráficas, logotipos y sistemas visuales coherentes
                que construyen marcas memorables y atemporales.
              </p>
            </div>

            {/* 02 */}
            <div>
              <div className="w-12 h-[2px] bg-primary mb-8" />
              <span className="block text-5xl font-light text-primary/20 mb-4">
                02
              </span>
              <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground mb-4">
                Social Media Marketing
              </h2>
              <p className="text-base font-light text-muted-foreground leading-relaxed">
                Estrategia y diseño de contenido para plataformas digitales con
                estética de alto nivel y propósito claro.
              </p>
            </div>
          </div>
        </section>

        {/* ── MANIFIESTO ── */}
        <section
          ref={manifesto.ref}
          className={`px-8 md:px-16 lg:px-24 py-28 md:py-36 bg-muted/40 ${reveal(manifesto.visible)}`}
        >
          <div className="max-w-3xl mx-auto text-center relative">
            {/* decorative quote mark */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[8rem] leading-none font-serif text-primary/10 select-none pointer-events-none">
              &ldquo;
            </span>

            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight">
              No decoramos.
              <br />
              <span className="text-primary">Comunicamos.</span>
            </p>
            <p className="mt-8 text-base md:text-lg font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Cada pieza que creamos tiene un propósito estratégico detrás.
              Diseño silencioso, pero potente.
            </p>
          </div>
        </section>

        {/* ── PROCESO ── */}
        <section
          ref={process.ref}
          className={`px-8 md:px-16 lg:px-24 py-28 md:py-36 ${reveal(process.visible)}`}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-0">
            {[
              {
                num: "01",
                title: "Estrategia",
                desc: "Entendemos tu marca, tu audiencia y tus objetivos antes de diseñar.",
              },
              {
                num: "02",
                title: "Diseño",
                desc: "Creamos piezas visuales con intención, coherencia y nivel profesional.",
              },
              {
                num: "03",
                title: "Impacto",
                desc: "Medimos, ajustamos y elevamos tu presencia visual continuamente.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`text-center px-8 py-10 md:py-0 ${
                  i < 2 ? "md:border-r md:border-border" : ""
                }`}
              >
                <span className="block text-5xl font-light text-primary mb-4">
                  {step.num}
                </span>
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="contacto"
          ref={cta.ref}
          className={`px-8 md:px-16 lg:px-24 py-32 md:py-40 ${reveal(cta.visible)}`}
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left — heading */}
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight">
                Elevemos tu
                <br />
                <span className="text-primary">marca juntos</span>
              </p>
              <p className="mt-6 text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
                Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
              </p>
              <a
                href="mailto:hola@berrygraphics.com"
                className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-secondary"
              >
                <Mail className="w-4 h-4" />
                hola@berrygraphics.com
              </a>
            </div>

            {/* Right — form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                window.location.href = `mailto:hola@berrygraphics.com?subject=${encodeURIComponent(
                  data.get("nombre") as string
                )}&body=${encodeURIComponent(data.get("mensaje") as string)}`;
              }}
              className="flex flex-col gap-5"
            >
              <input
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <textarea
                name="mensaje"
                required
                rows={3}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
              />
              <button
                type="submit"
                className="mt-2 self-start inline-flex items-center gap-3 px-8 py-3 border-2 border-primary text-primary text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Enviar
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-border">
          <div className="max-w-5xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider">
            <span>Berry Graphics®</span>
            <a
              href="https://instagram.com/berrygraphics"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-secondary"
            >
              @berrygraphics
            </a>
            <span>2026</span>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
