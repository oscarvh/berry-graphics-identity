import { useEffect, useRef, useState } from "react";
import berryLogo from "@/assets/berry-logo.webp";

/* ─────────────────────────────────────────────────────────
   Berry Graphics — Versión B
   One-page institucional, ultra minimalista.
   Fondo blanco pleno · contenido centrado · jerarquía única.
   Movimiento: parallax sutil del logo + fade progresivo.
   ───────────────────────────────────────────────────────── */

const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
};

const useReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScrollY();

  const closingSection = useReveal(0.3);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Parallax sutil del logo: se mueve apenas hacia arriba y se desvanece levemente
  const logoOffset = Math.min(scrollY * 0.25, 120);
  const logoOpacity = Math.max(1 - scrollY / 700, 0.15);

  const fade = (delay: number) => ({
    className: `transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: loaded ? `${delay}ms` : "0ms" },
  });

  const reveal = (v: boolean, delay = 0) => ({
    className: `transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─────────── BARRA SUPERIOR MÍNIMA ─────────── */}
      <header
        {...fade(0)}
        className={`fixed top-0 inset-x-0 z-40 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between ${fade(0).className}`}
      >
        <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/60">
          Berry Graphics
        </span>
        <a
          href="mailto:hola@berrygraphics.com"
          className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/60 hover:text-primary transition-colors duration-500"
          aria-label="Contacto de diseño gráfico y marketing digital"
        >
          Contacto
        </a>
      </header>

      {/* ─────────── HERO ─────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">

        {/* Logo dominante con parallax sutil */}
        <div
          className="relative"
          style={{
            transform: `translate3d(0, -${logoOffset}px, 0)`,
            opacity: logoOpacity,
            transition: "opacity 400ms ease-out",
            willChange: "transform, opacity",
          }}
        >
          <div
            {...fade(200)}
            className={`flex flex-col items-center ${fade(200).className}`}
          >
            <img
              src={berryLogo}
              alt="Berry Graphics diseño gráfico y social media marketing"
              className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[300px] lg:h-[300px] object-contain"
            />

            {/* Wordmark */}
            <div
              {...fade(500)}
              className={`mt-10 flex items-baseline gap-2.5 ${fade(500).className}`}
            >
              <span className="text-[28px] sm:text-[34px] font-light text-primary leading-none tracking-tight">
                Berry
              </span>
              <span className="text-[10px] sm:text-[11px] font-normal tracking-[0.55em] uppercase text-muted-foreground leading-none">
                Graphics
              </span>
            </div>
          </div>
        </div>

        {/* Frase principal */}
        <h1
          {...fade(800)}
          className={`mt-16 sm:mt-20 max-w-[640px] text-center font-light text-foreground leading-[1.35] tracking-[-0.01em] ${fade(800).className}`}
          style={{ fontSize: "clamp(1.125rem, 2.2vw, 1.5rem)" }}
        >
          Diseño en comunicación visual
          <br className="hidden sm:block" />
          {" "}y <span className="text-primary">social media marketing</span>
        </h1>

        {/* Indicador de scroll */}
        <div
          {...fade(1400)}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 ${fade(1400).className}`}
        >
          <span className="text-[9px] font-semibold tracking-[0.5em] uppercase text-muted-foreground/60">
            Scroll
          </span>
          <div className="w-px h-10 bg-border relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-primary"
              style={{
                height: "40%",
                animation: "scrollLine 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─────────── CIERRE — Contacto institucional ─────────── */}
      <section
        ref={closingSection.ref}
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-32"
      >
        {/* Marca de sección */}
        <div {...reveal(closingSection.visible, 0)} className={reveal(closingSection.visible, 0).className}>
          <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
            ⎯⎯  Contacto  ⎯⎯
          </span>
        </div>

        {/* Frase de cierre */}
        <h2
          {...reveal(closingSection.visible, 200)}
          className={`mt-12 max-w-[760px] text-center font-light text-foreground leading-[1.15] tracking-[-0.02em] ${reveal(closingSection.visible, 200).className}`}
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)" }}
        >
          Identidad visual y contenido
          <br />
          para <span className="text-primary">redes sociales</span>.
        </h2>

        {/* Mail */}
        <a
          {...reveal(closingSection.visible, 500)}
          href="mailto:hola@berrygraphics.com"
          className={`mt-16 group inline-block text-foreground hover:text-primary transition-colors duration-500 ${reveal(closingSection.visible, 500).className}`}
          aria-label="Contacto de diseño gráfico y marketing digital"
        >
          <span
            className="font-light tracking-[-0.01em] border-b border-border group-hover:border-primary transition-colors duration-500 pb-2"
            style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)" }}
          >
            hola@berrygraphics.com
          </span>
        </a>

        {/* Instagram */}
        <a
          {...reveal(closingSection.visible, 700)}
          href="https://instagram.com/berrygraphics"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 text-[11px] font-semibold tracking-[0.4em] uppercase text-muted-foreground hover:text-primary transition-colors duration-500 ${reveal(closingSection.visible, 700).className}`}
          aria-label="Ver trabajos en Instagram de diseño gráfico"
        >
          @berrygraphics  ·  Instagram
        </a>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground/70">
            Berry Graphics®
          </span>
          <span className="text-[10px] font-normal tracking-[0.4em] uppercase text-muted-foreground/50">
            Diseño gráfico profesional para marcas
          </span>
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground/70">
            {year}
          </span>
        </div>
      </footer>

      {/* Animación local del scroll indicator */}
      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          60%  { transform: translateY(150%); }
          100% { transform: translateY(150%); }
        }
      `}</style>
    </div>
  );
};

export default Index;
