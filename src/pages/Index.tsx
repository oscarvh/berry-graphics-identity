import { useEffect, useRef, useState } from "react";
import berryLogo from "@/assets/berry-logo.webp";

/* ─────────────────────────────────────────────────────────
   Berry Graphics — Versión C
   Editorial moderna · Fondo blanco pleno
   Scroll spectacular: pinned hero, horizontal slider,
   sticky service stack, magnetic CTA, parallax letters.
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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

/* Hook: progreso de scroll (0 → 1) sobre un contenedor */
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
  {
    n: "01",
    title: "Identidad visual",
    desc: "Sistemas de marca, logotipos y guidelines que construyen presencia memorable.",
    tags: ["Branding", "Logo", "Guidelines"],
  },
  {
    n: "02",
    title: "Diseño editorial",
    desc: "Catálogos, revistas, reportes y piezas impresas con jerarquía clara.",
    tags: ["Editorial", "Print", "Layout"],
  },
  {
    n: "03",
    title: "Social media",
    desc: "Contenido visual estratégico para Instagram, LinkedIn y TikTok.",
    tags: ["Feed", "Stories", "Reels"],
  },
  {
    n: "04",
    title: "Comunicación visual",
    desc: "Campañas integrales con foco en conversión y consistencia de marca.",
    tags: ["Campaign", "Ads", "Visual"],
  },
];

const works = [
  { tag: "Branding", name: "Estudio Norte", year: "2024" },
  { tag: "Editorial", name: "Revista Pulpa", year: "2024" },
  { tag: "Social", name: "Nube Café", year: "2025" },
  { tag: "Campaign", name: "Distrito 9", year: "2025" },
  { tag: "Identity", name: "Lote 42", year: "2025" },
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScrollY();

  const heroSection = useSectionProgress();
  const horizontalSection = useSectionProgress();
  const servicesReveal = useReveal(0.15);
  const manifestoReveal = useReveal(0.25);
  const contactReveal = useReveal(0.25);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Hero: el logo se reduce y sube a medida que se scrollea dentro del hero
  const hp = heroSection.progress;
  const logoScale = 1 - hp * 0.55;       // 1 → 0.45
  const logoTranslate = -hp * 180;       // px
  const logoOpacity = 1 - hp * 0.7;
  const heroTextOpacity = 1 - hp * 1.4;
  const heroTextTranslate = hp * 60;

  // Slider horizontal: traduce la fila a medida que se scrollea
  const horizontalShift = horizontalSection.progress * 70; // %

  // Header: aparece tras pasar el hero
  const headerActive = scrollY > 80;

  const fade = (delay: number) => ({
    className: `transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: loaded ? `${delay}ms` : "0ms" },
  });

  const reveal = (v: boolean, delay = 0) => ({
    className: `transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─────────── HEADER ─────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          headerActive
            ? "py-4 bg-background/85 backdrop-blur-md border-b border-border/60"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {["Trabajo", "Servicios", "Manifiesto", "Contacto"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/60 hover:text-primary transition-colors duration-500"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="mailto:hola@berrygraphics.com"
            className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/70 hover:text-primary transition-colors duration-500"
          >
            Escribinos
          </a>
        </div>
        {/* Barra de progreso de scroll */}
        <div className="absolute bottom-0 left-0 h-px bg-primary/80 transition-all duration-150"
          style={{ width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100, 100)}%` }}
        />
      </header>

      {/* ─────────── HERO PIN (200vh) ─────────── */}
      <section
        ref={heroSection.ref}
        className="relative"
        style={{ height: "200vh" }}
        aria-label="Berry Graphics — Diseño en comunicación visual y social media marketing"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">

          {/* Kicker editorial superior */}
          <div
            {...fade(0)}
            className={`absolute top-28 left-6 md:left-12 lg:left-20 flex items-center gap-3 ${fade(0).className}`}
          >
            <span className="w-8 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
              Issue №01 · {year}
            </span>
          </div>
          <div
            {...fade(0)}
            className={`absolute top-28 right-6 md:right-12 lg:right-20 ${fade(0).className}`}
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/50">
              Estudio de diseño
            </span>
          </div>

          {/* Logo gigante con scroll-driven shrink */}
          <div
            style={{
              transform: `translate3d(0, ${logoTranslate}px, 0) scale(${logoScale})`,
              opacity: logoOpacity,
              willChange: "transform, opacity",
            }}
            className="flex flex-col items-center"
          >
            <img
              src={berryLogo}
              alt="Berry Graphics diseño gráfico y social media marketing"
              className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] object-contain"
            />
          </div>

          {/* Wordmark + frase */}
          <div
            style={{
              opacity: heroTextOpacity,
              transform: `translate3d(0, ${heroTextTranslate}px, 0)`,
              willChange: "transform, opacity",
            }}
            className="mt-10 flex flex-col items-center"
          >
            <div
              {...fade(400)}
              className={`flex items-baseline gap-2.5 ${fade(400).className}`}
            >
              <span className="text-[32px] sm:text-[40px] font-light text-primary leading-none tracking-tight">
                Berry
              </span>
              <span className="text-[11px] sm:text-[12px] font-normal tracking-[0.55em] uppercase text-muted-foreground leading-none">
                Graphics
              </span>
            </div>

            <h1
              {...fade(700)}
              className={`mt-12 max-w-[820px] text-center font-light text-foreground leading-[1.15] tracking-[-0.02em] ${fade(700).className}`}
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
            >
              Diseño en <span className="text-primary">comunicación visual</span>
              <br />
              y <em className="not-italic text-primary">social media marketing</em>.
            </h1>
          </div>

          {/* Indicador de scroll */}
          <div
            {...fade(1200)}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 ${fade(1200).className}`}
            style={{ opacity: 1 - hp * 2 }}
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

          {/* Marco editorial sutil */}
          <div className="pointer-events-none absolute inset-6 md:inset-12 lg:inset-20 border border-border/50" />
        </div>
      </section>

      {/* ─────────── MARQUEE ─────────── */}
      <section className="border-y border-border py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["Branding", "Editorial", "Social Media", "Identidad", "Campañas", "Diseño Visual", "Estrategia"].map((w, j) => (
                <span key={j} className="flex items-center text-[28px] sm:text-[40px] font-light tracking-tight text-foreground/80">
                  <span className="px-8">{w}</span>
                  <span className="text-primary text-[20px]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── HORIZONTAL SCROLL TRABAJO ─────────── */}
      <section
        id="trabajo"
        ref={horizontalSection.ref}
        className="relative"
        style={{ height: `${works.length * 70}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          {/* Encabezado de sección */}
          <div className="absolute top-28 left-6 md:left-12 lg:left-20 flex items-center gap-4 z-10">
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
              § 02
            </span>
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/60">
              Trabajo seleccionado
            </span>
          </div>

          <div
            className="flex gap-12 px-6 md:px-12 lg:px-20 will-change-transform"
            style={{
              transform: `translate3d(-${horizontalShift}%, 0, 0)`,
              transition: "transform 80ms linear",
            }}
          >
            {works.map((w, i) => (
              <article
                key={w.name}
                className="shrink-0 w-[78vw] sm:w-[58vw] lg:w-[42vw] aspect-[4/5] relative group"
              >
                {/* Plano blanco con borde y número */}
                <div className="absolute inset-0 border border-border bg-background overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[28vw] sm:text-[20vw] lg:text-[14vw] font-light text-primary/8 leading-none select-none"
                      style={{ color: "hsl(var(--primary) / 0.07)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Esquinas */}
                  <span className="absolute top-4 left-4 w-6 h-px bg-primary" />
                  <span className="absolute top-4 left-4 w-px h-6 bg-primary" />
                  <span className="absolute bottom-4 right-4 w-6 h-px bg-primary" />
                  <span className="absolute bottom-4 right-4 w-px h-6 bg-primary" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary mb-2">
                      {w.tag}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                      {w.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    {w.year}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Indicador horizontal */}
          <div className="absolute bottom-10 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 flex items-center gap-4">
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground">
              Desplazá ⟶
            </span>
            <div className="flex-1 h-px bg-border relative">
              <div
                className="absolute top-0 left-0 h-full bg-primary"
                style={{ width: `${horizontalSection.progress * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-foreground/70">
              {String(Math.min(Math.floor(horizontalSection.progress * works.length) + 1, works.length)).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* ─────────── SERVICIOS — Sticky stack ─────────── */}
      <section
        id="servicios"
        ref={servicesReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-32"
      >
        <div className="max-w-7xl mx-auto">
          <div
            {...reveal(servicesReveal.visible, 0)}
            className={`flex items-center gap-4 mb-16 ${reveal(servicesReveal.visible, 0).className}`}
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">§ 03</span>
            <span className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/60">
              Qué hacemos
            </span>
          </div>

          <h2
            {...reveal(servicesReveal.visible, 150)}
            className={`max-w-[900px] font-light text-foreground leading-[1.05] tracking-[-0.02em] mb-24 ${reveal(servicesReveal.visible, 150).className}`}
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            Construimos marcas con <span className="text-primary">claridad</span>,
            sistema y propósito.
          </h2>

          {/* Cards apiladas con efecto sticky */}
          <div className="space-y-8">
            {services.map((s, i) => (
              <div
                key={s.n}
                className="sticky bg-background border border-border p-8 md:p-12 grid md:grid-cols-[120px,1fr,auto] gap-8 items-start group hover:border-primary/60 transition-colors duration-500"
                style={{ top: `${100 + i * 24}px` }}
              >
                <span className="text-[64px] md:text-[80px] font-light text-primary leading-none tracking-tight">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
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

      {/* ─────────── MANIFIESTO ─────────── */}
      <section
        id="manifiesto"
        ref={manifestoReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-40 border-t border-border overflow-hidden"
      >
        {/* Letras gigantes parallax de fondo */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            transform: `translate3d(${(scrollY * 0.05) % 100 - 50}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          <span
            className="font-light tracking-tight leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(8rem, 22vw, 22rem)",
              color: "hsl(var(--primary) / 0.04)",
            }}
          >
            BERRY · BERRY · BERRY
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <span
            {...reveal(manifestoReveal.visible, 0)}
            className={`inline-block text-[10px] font-semibold tracking-[0.5em] uppercase text-primary mb-12 ${reveal(manifestoReveal.visible, 0).className}`}
          >
            § 04 · Manifiesto
          </span>
          <blockquote
            {...reveal(manifestoReveal.visible, 200)}
            className={`font-light text-foreground leading-[1.1] tracking-[-0.02em] ${reveal(manifestoReveal.visible, 200).className}`}
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.25rem)" }}
          >
            “No <span className="text-primary">decoramos</span>.
            <br />
            Comunicamos.”
          </blockquote>
          <p
            {...reveal(manifestoReveal.visible, 400)}
            className={`mt-10 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-[1.8] ${reveal(manifestoReveal.visible, 400).className}`}
          >
            Cada pieza tiene un propósito estratégico. Diseñamos para que tu marca
            sea entendida, recordada y elegida.
          </p>
        </div>
      </section>

      {/* ─────────── CONTACTO ─────────── */}
      <section
        id="contacto"
        ref={contactReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-40 border-t border-border"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,1fr] gap-16 items-end">
          <div>
            <span
              {...reveal(contactReveal.visible, 0)}
              className={`inline-block text-[10px] font-semibold tracking-[0.5em] uppercase text-primary mb-10 ${reveal(contactReveal.visible, 0).className}`}
            >
              § 05 · Contacto
            </span>
            <h2
              {...reveal(contactReveal.visible, 150)}
              className={`font-light text-foreground leading-[1.05] tracking-[-0.02em] ${reveal(contactReveal.visible, 150).className}`}
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              Hagamos algo
              <br />
              <span className="text-primary">memorable</span>.
            </h2>
          </div>

          <div className="space-y-10">
            <a
              {...reveal(contactReveal.visible, 300)}
              href="mailto:hola@berrygraphics.com"
              className={`group block ${reveal(contactReveal.visible, 300).className}`}
              aria-label="Contacto de diseño gráfico y marketing digital"
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-3">
                Email
              </span>
              <span
                className="block font-light tracking-[-0.01em] text-foreground group-hover:text-primary border-b border-border group-hover:border-primary pb-3 transition-colors duration-500"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                hola@berrygraphics.com →
              </span>
            </a>

            <a
              {...reveal(contactReveal.visible, 450)}
              href="https://instagram.com/berrygraphics"
              target="_blank"
              rel="noopener noreferrer"
              className={`group block ${reveal(contactReveal.visible, 450).className}`}
              aria-label="Ver trabajos en Instagram de diseño gráfico"
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-3">
                Instagram
              </span>
              <span
                className="block font-light tracking-[-0.01em] text-foreground group-hover:text-primary border-b border-border group-hover:border-primary pb-3 transition-colors duration-500"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                @berrygraphics →
              </span>
            </a>

            <div
              {...reveal(contactReveal.visible, 600)}
              className={reveal(contactReveal.visible, 600).className}
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-3">
                Estudio
              </span>
              <p className="text-base text-foreground/80 leading-[1.8]">
                Buenos Aires, Argentina
                <br />
                Lun — Vie · 09:00 / 18:00
              </p>
            </div>
          </div>
        </div>
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

      {/* Animaciones locales */}
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
