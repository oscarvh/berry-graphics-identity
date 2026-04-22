import { useEffect, useRef, useState } from "react";
import berryLogo from "@/assets/berry-logo.webp";

/* ─────────────────────────────────────────────────────────
   Berry Graphics — Versión E
   Hero legible · Scroll suave y visible · Sin portfolio
   ───────────────────────────────────────────────────────── */

const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
};

const useReveal = (threshold = 0.18) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const useSectionProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setP(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress: p };
};

const services = [
  { n: "01", title: "Identidad visual", desc: "Sistemas de marca, logotipos y guidelines.", tags: ["Branding", "Logo"] },
  { n: "02", title: "Diseño editorial", desc: "Catálogos, revistas y reportes.", tags: ["Editorial", "Print"] },
  { n: "03", title: "Social media", desc: "Contenido visual estratégico.", tags: ["Feed", "Reels"] },
  { n: "04", title: "Comunicación visual", desc: "Campañas integrales y consistentes.", tags: ["Campaign", "Ads"] },
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScrollY();

  const heroSection = useSectionProgress();
  const wordsSection = useSectionProgress();
  const servicesReveal = useReveal(0.15);
  const manifestoReveal = useReveal(0.2);
  const contactReveal = useReveal(0.2);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // HERO: parallax sutil — el contenido se mantiene legible siempre
  const hp = heroSection.progress;
  const heroFade = Math.max(1 - hp * 1.4, 0);
  const heroLift = -hp * 80; // sube suavemente
  const logoFloat = Math.sin(scrollY * 0.003) * 6; // micro-flotación

  // PALABRAS CLAVE
  const wp = wordsSection.progress;
  const keywords = ["Estrategia", "Diseño", "Sistema", "Impacto"];
  const wordIndex = Math.min(Math.floor(wp * keywords.length), keywords.length - 1);

  // HEADER
  const headerActive = scrollY > 80;
  const scrollPct = Math.min(
    (scrollY / ((typeof document !== "undefined" ? document.documentElement.scrollHeight : 1) - (typeof window !== "undefined" ? window.innerHeight : 1) || 1)) * 100,
    100
  );

  const fade = (delay: number) => ({
    className: `transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: loaded ? `${delay}ms` : "0ms" },
  });

  const reveal = (v: boolean, delay = 0) => ({
    className: `transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          headerActive
            ? "py-4 bg-background/90 backdrop-blur-md border-b border-border/60"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img
              src={berryLogo}
              alt="Berry Graphics"
              className={`object-contain transition-all duration-700 ${
                headerActive ? "w-7 h-7 opacity-100" : "w-0 h-0 opacity-0"
              }`}
            />
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/70">
              Berry Graphics
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {[
              ["Servicios", "servicios"],
              ["Manifiesto", "manifiesto"],
              ["Contacto", "contacto"],
            ].map(([l, h]) => (
              <a
                key={h}
                href={`#${h}`}
                className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/60 hover:text-primary transition-colors duration-500"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="mailto:hola@berrygrafic.com"
            className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/70 hover:text-primary transition-colors duration-500"
          >
            Escribinos
          </a>
        </div>
        <div
          className="absolute bottom-0 left-0 h-px bg-primary"
          style={{ width: `${scrollPct}%`, transition: "width 80ms linear" }}
        />
      </header>

      {/* HERO — Limpio, legible, parallax sutil */}
      <section
        ref={heroSection.ref}
        className="relative"
        style={{ height: "150vh" }}
        aria-label="Berry Graphics — Diseño en comunicación visual y social media marketing"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Letras decorativas BG */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{
              transform: `translate3d(0, ${heroLift * 0.4}px, 0)`,
              willChange: "transform",
            }}
            aria-hidden="true"
          >
            <span
              className="font-light leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(14rem, 38vw, 36rem)",
                color: "hsl(var(--primary) / 0.04)",
                letterSpacing: "-0.05em",
              }}
            >
              berry
            </span>
          </div>

          {/* Logo grande centrado, con micro float */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: `translate3d(0, ${heroLift * 0.6 + logoFloat}px, 0)`,
              opacity: heroFade,
              willChange: "transform, opacity",
            }}
          >
            <img
              src={berryLogo}
              alt="Berry Graphics diseño gráfico y social media marketing"
              className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] object-contain"
            />
          </div>

          {/* Kicker arriba */}
          <div
            {...fade(0)}
            className={`absolute top-28 left-6 md:left-12 lg:left-20 flex items-center gap-3 ${fade(0).className}`}
            style={{
              ...fade(0).style,
              transform: `translate3d(0, ${heroLift * 0.3}px, 0)`,
              opacity: heroFade,
            }}
          >
            <span className="w-8 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
              Estudio creativo · {year}
            </span>
          </div>

          {/* Bloque principal de texto — debajo del logo */}
          <div
            className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-20 text-center"
            style={{
              transform: `translate3d(0, ${heroLift}px, 0)`,
              opacity: heroFade,
              willChange: "transform, opacity",
              marginTop: "320px",
            }}
          >
            <h1
              {...fade(200)}
              className={`font-light leading-[0.95] tracking-[-0.03em] text-foreground ${fade(200).className}`}
              style={{
                ...fade(200).style,
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              }}
            >
              Diseño en{" "}
              <span className="text-primary italic font-light">comunicación visual</span>
              <br />y social media marketing
            </h1>

            <p
              {...fade(500)}
              className={`mt-8 text-[12px] sm:text-[13px] font-semibold tracking-[0.5em] uppercase text-muted-foreground ${fade(500).className}`}
            >
              Berry Graphics · Buenos Aires
            </p>

            <div
              {...fade(800)}
              className={`mt-10 flex flex-wrap items-center justify-center gap-4 ${fade(800).className}`}
            >
              <a
                href="#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[10px] font-semibold tracking-[0.35em] uppercase hover:bg-secondary transition-colors duration-500"
              >
                Trabajemos juntos
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground text-[10px] font-semibold tracking-[0.35em] uppercase hover:border-primary hover:text-primary transition-colors duration-500"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Indicador scroll */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ opacity: Math.max(1 - hp * 3, 0) }}
          >
            <span className="text-[9px] font-semibold tracking-[0.5em] uppercase text-muted-foreground/60">
              Desplazá
            </span>
            <div className="w-px h-12 bg-border relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full bg-primary"
                style={{
                  height: "40%",
                  animation: "scrollLine 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PALABRAS CLAVE PINNED */}
      <section
        ref={wordsSection.ref}
        className="relative bg-background border-t border-border"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <span className="absolute top-28 left-6 md:left-12 lg:left-20 text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
            § 01 · Principios
          </span>
          <span className="absolute top-28 right-6 md:right-12 lg:right-20 text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/50">
            {String(wordIndex + 1).padStart(2, "0")} / 0{keywords.length}
          </span>

          <div className="relative w-full flex items-center justify-center">
            {keywords.map((w, i) => (
              <h2
                key={w}
                className="absolute font-light leading-none tracking-[-0.04em] text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 13rem)",
                  opacity: i === wordIndex ? 1 : 0,
                  transform: `translate3d(0, ${i === wordIndex ? 0 : i < wordIndex ? -60 : 60}px, 0)`,
                  color: i === wordIndex ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                }}
              >
                {w}
              </h2>
            ))}
            <h2
              className="invisible font-light leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(3.5rem, 14vw, 13rem)" }}
            >
              Estrategia
            </h2>
          </div>

          <div className="absolute bottom-16 flex gap-3">
            {keywords.map((_, i) => (
              <span
                key={i}
                className="h-px transition-all duration-500"
                style={{
                  width: i === wordIndex ? 48 : 16,
                  background: i === wordIndex ? "hsl(var(--primary))" : "hsl(var(--border))",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS — Sticky stack */}
      <section
        id="servicios"
        ref={servicesReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-32 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div
            {...reveal(servicesReveal.visible, 0)}
            className={`flex items-center gap-4 mb-16 ${reveal(servicesReveal.visible, 0).className}`}
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">§ 02</span>
            <span className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/60">
              Qué hacemos
            </span>
          </div>

          <h2
            {...reveal(servicesReveal.visible, 150)}
            className={`max-w-[900px] font-light text-foreground leading-[0.95] tracking-[-0.03em] mb-24 ${reveal(servicesReveal.visible, 150).className}`}
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Claridad, sistema y <span className="text-primary italic">propósito</span>.
          </h2>

          <div className="space-y-6">
            {services.map((s, i) => (
              <div
                key={s.n}
                className="sticky bg-background border border-border p-8 md:p-12 grid md:grid-cols-[140px,1fr,auto] gap-8 items-start group hover:border-primary transition-colors duration-500"
                style={{ top: `${100 + i * 28}px` }}
              >
                <span className="text-[72px] md:text-[96px] font-light text-primary leading-none tracking-tight italic">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.8] max-w-[520px]">
                    {s.desc}
                  </p>
                </div>
                <div className="flex md:flex-col gap-2 flex-wrap">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-semibold tracking-[0.3em] uppercase text-foreground/60 border border-border px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFIESTO */}
      <section
        id="manifiesto"
        ref={manifestoReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-48 border-t border-border overflow-hidden"
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            transform: `translate3d(${(scrollY * 0.08) % 200 - 100}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          <span
            className="font-light tracking-tight leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(10rem, 28vw, 28rem)",
              color: "hsl(var(--primary) / 0.04)",
            }}
          >
            BERRY · BERRY · BERRY
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <span
            {...reveal(manifestoReveal.visible, 0)}
            className={`inline-block text-[10px] font-semibold tracking-[0.5em] uppercase text-primary mb-16 ${reveal(manifestoReveal.visible, 0).className}`}
          >
            § 03 · Manifiesto
          </span>
          <blockquote
            className="font-light text-foreground leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
          >
            {["No", "decoramos.", "Comunicamos."].map((w, i) => (
              <span
                key={i}
                {...reveal(manifestoReveal.visible, 200 + i * 200)}
                className={`block ${reveal(manifestoReveal.visible, 200 + i * 200).className} ${
                  w === "decoramos." ? "text-foreground/30 line-through decoration-primary decoration-2" : ""
                } ${w === "Comunicamos." ? "text-primary italic" : ""}`}
              >
                {w}
              </span>
            ))}
          </blockquote>
          <p
            {...reveal(manifestoReveal.visible, 1000)}
            className={`mt-16 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-[1.8] ${reveal(manifestoReveal.visible, 1000).className}`}
          >
            Cada pieza tiene un propósito estratégico. Diseñamos para que tu marca
            sea entendida, recordada y elegida.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        ref={contactReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-40 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <div
            {...reveal(contactReveal.visible, 0)}
            className={`flex items-center gap-4 mb-12 ${reveal(contactReveal.visible, 0).className}`}
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">§ 04</span>
            <span className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/60">
              Contacto
            </span>
          </div>

          <h2
            {...reveal(contactReveal.visible, 150)}
            className={`font-light text-foreground leading-[0.9] tracking-[-0.04em] mb-20 ${reveal(contactReveal.visible, 150).className}`}
            style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
          >
            Hagamos algo
            <br />
            <span className="text-primary italic">memorable</span>.
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <a
              {...reveal(contactReveal.visible, 300)}
              href="mailto:hola@berrygrafic.com"
              className={`group block ${reveal(contactReveal.visible, 300).className}`}
              aria-label="Contacto de diseño gráfico y marketing digital"
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-4">
                Email
              </span>
              <span className="block font-light tracking-[-0.01em] text-foreground group-hover:text-primary border-b border-border group-hover:border-primary pb-3 transition-colors duration-500 text-xl md:text-2xl">
                hola@berrygrafic.com →
              </span>
            </a>

            <a
              {...reveal(contactReveal.visible, 450)}
              href="https://instagram.com/berrygrafics"
              target="_blank"
              rel="noopener noreferrer"
              className={`group block ${reveal(contactReveal.visible, 450).className}`}
              aria-label="Ver Instagram de Berry Graphics"
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-4">
                Instagram
              </span>
              <span className="block font-light tracking-[-0.01em] text-foreground group-hover:text-primary border-b border-border group-hover:border-primary pb-3 transition-colors duration-500 text-xl md:text-2xl">
                @berrygrafics →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
