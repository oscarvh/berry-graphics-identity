import { useEffect, useRef, useState } from "react";
import berryLogo from "@/assets/berry-logo.webp";

/* ─────────────────────────────────────────────────────────
   Berry Graphics — Versión D (Cinematográfica)
   Fondo blanco pleno · Tipografía masiva · Scroll dramático
   - Hero pinned con typo gigante que se ensambla
   - Logo orbital que rota con scroll
   - Cursor follower (desktop)
   - Pinned reveal de palabras clave
   - Galería con clip-path scroll-driven
   - Manifiesto con palabras stagger gigantes
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

const useCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return { pos, hover };
};

const works = [
  { tag: "Branding", name: "Estudio Norte", year: "2024", n: "01" },
  { tag: "Editorial", name: "Revista Pulpa", year: "2024", n: "02" },
  { tag: "Social", name: "Nube Café", year: "2025", n: "03" },
  { tag: "Campaign", name: "Distrito 9", year: "2025", n: "04" },
];

const services = [
  { n: "01", title: "Identidad visual", desc: "Sistemas de marca, logotipos y guidelines.", tags: ["Branding", "Logo"] },
  { n: "02", title: "Diseño editorial", desc: "Catálogos, revistas y reportes.", tags: ["Editorial", "Print"] },
  { n: "03", title: "Social media", desc: "Contenido visual estratégico.", tags: ["Feed", "Reels"] },
  { n: "04", title: "Comunicación visual", desc: "Campañas integrales y consistentes.", tags: ["Campaign", "Ads"] },
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScrollY();
  const cursor = useCursor();

  const heroSection = useSectionProgress();
  const wordsSection = useSectionProgress();
  const galleryReveal = useReveal(0.1);
  const servicesReveal = useReveal(0.15);
  const manifestoReveal = useReveal(0.2);
  const contactReveal = useReveal(0.2);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // HERO: typo masiva ensambla, logo escala/rota, cortina
  const hp = heroSection.progress;
  const titleY = -hp * 200;
  const titleScale = 1 + hp * 0.4;
  const titleOpacity = Math.max(1 - hp * 1.6, 0);
  const logoRotate = scrollY * 0.05;
  const logoScale = 1 - hp * 0.3;
  const curtainHeight = hp * 100; // %

  // PALABRAS CLAVE: 4 palabras se revelan con progreso
  const wp = wordsSection.progress;
  const wordIndex = Math.min(Math.floor(wp * 4), 3);

  // HEADER
  const headerActive = scrollY > 80;
  const scrollPct = Math.min(
    (scrollY / ((typeof document !== "undefined" ? document.documentElement.scrollHeight : 1) - (typeof window !== "undefined" ? window.innerHeight : 1) || 1)) * 100,
    100
  );

  const fade = (delay: number) => ({
    className: `transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
  const keywords = ["Estrategia", "Diseño", "Sistema", "Impacto"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Cursor follower */}
      <div
        className="fixed pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${cursor.pos.x}px, ${cursor.pos.y}px, 0) translate(-50%, -50%)`,
          transition: "width 400ms ease, height 400ms ease",
          width: cursor.hover ? 64 : 14,
          height: cursor.hover ? 64 : 14,
          background: "hsl(var(--primary))",
          borderRadius: 0,
          willChange: "transform, width, height",
        }}
      />

      {/* HEADER */}
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
        <div
          className="absolute bottom-0 left-0 h-px bg-primary"
          style={{ width: `${scrollPct}%`, transition: "width 80ms linear" }}
        />
      </header>

      {/* HERO PINNED — Typo cinematográfica */}
      <section
        ref={heroSection.ref}
        className="relative"
        style={{ height: "240vh" }}
        aria-label="Berry Graphics — Diseño en comunicación visual y social media marketing"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Logo orbital de fondo */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: `rotate(${logoRotate}deg) scale(${logoScale})`,
              opacity: 0.95,
              willChange: "transform",
            }}
          >
            <img
              src={berryLogo}
              alt="Berry Graphics diseño gráfico y social media marketing"
              className="w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] lg:w-[640px] lg:h-[640px] object-contain"
              style={{ opacity: Math.max(1 - hp * 1.5, 0) }}
            />
          </div>

          {/* Kicker top */}
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

          {/* TYPO GIGANTE */}
          <div
            className="relative z-10 px-4 text-center"
            style={{
              transform: `translate3d(0, ${titleY}px, 0) scale(${titleScale})`,
              opacity: titleOpacity,
              willChange: "transform, opacity",
            }}
          >
            <h1
              className="font-light leading-[0.85] tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(4rem, 18vw, 17rem)" }}
            >
              <span
                {...fade(200)}
                className={`block ${fade(200).className}`}
              >
                Berry
              </span>
              <span
                {...fade(500)}
                className={`block text-primary italic font-light ${fade(500).className}`}
              >
                Graphics
              </span>
            </h1>
            <p
              {...fade(900)}
              className={`mt-10 text-[11px] sm:text-[13px] font-semibold tracking-[0.55em] uppercase text-muted-foreground ${fade(900).className}`}
            >
              Comunicación visual · Social media marketing
            </p>
          </div>

          {/* Indicador */}
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

          {/* Cortina blanca de transición */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-background pointer-events-none"
            style={{ height: `${curtainHeight}%`, transition: "height 80ms linear" }}
          />
        </div>
      </section>

      {/* PALABRAS CLAVE PINNED */}
      <section
        ref={wordsSection.ref}
        className="relative bg-background"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <span className="absolute top-28 left-6 md:left-12 lg:left-20 text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
            § 01 · Principios
          </span>
          <span className="absolute top-28 right-6 md:right-12 lg:right-20 text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/50">
            {String(wordIndex + 1).padStart(2, "0")} / 04
          </span>

          <div className="relative w-full flex items-center justify-center">
            {keywords.map((w, i) => (
              <h2
                key={w}
                className="absolute font-light leading-none tracking-[-0.04em] text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 14rem)",
                  opacity: i === wordIndex ? 1 : 0,
                  transform: `translate3d(0, ${i === wordIndex ? 0 : i < wordIndex ? -80 : 80}px, 0)`,
                  color: i === wordIndex ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                }}
              >
                {w}
              </h2>
            ))}
            {/* Espaciador para mantener altura */}
            <h2
              className="invisible font-light leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)" }}
            >
              Estrategia
            </h2>
          </div>

          {/* Dots de progreso */}
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

      {/* GALERÍA — clip-path reveal en grilla */}
      <section
        id="trabajo"
        ref={galleryReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-32 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div
            {...reveal(galleryReveal.visible, 0)}
            className={`flex items-center gap-4 mb-16 ${reveal(galleryReveal.visible, 0).className}`}
          >
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">§ 02</span>
            <span className="w-12 h-px bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-foreground/60">
              Trabajo seleccionado
            </span>
          </div>

          <h2
            {...reveal(galleryReveal.visible, 150)}
            className={`max-w-[900px] font-light text-foreground leading-[0.95] tracking-[-0.03em] mb-20 ${reveal(galleryReveal.visible, 150).className}`}
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
          >
            Marcas con <span className="text-primary italic">presencia</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {works.map((w, i) => (
              <article
                key={w.name}
                data-cursor
                {...reveal(galleryReveal.visible, 300 + i * 150)}
                className={`group relative aspect-[4/5] border border-border overflow-hidden cursor-pointer ${reveal(galleryReveal.visible, 300 + i * 150).className} ${
                  i % 2 === 1 ? "md:translate-y-16" : ""
                }`}
              >
                {/* Reveal sweep al hacer hover */}
                <div className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />

                {/* Número gigante */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-light leading-none select-none transition-colors duration-700 group-hover:text-primary-foreground/20"
                    style={{
                      fontSize: "clamp(8rem, 18vw, 14rem)",
                      color: "hsl(var(--primary) / 0.08)",
                    }}
                  >
                    {w.n}
                  </span>
                </div>

                {/* Esquinas */}
                <span className="absolute top-4 left-4 w-6 h-px bg-primary group-hover:bg-primary-foreground transition-colors duration-500" />
                <span className="absolute top-4 left-4 w-px h-6 bg-primary group-hover:bg-primary-foreground transition-colors duration-500" />
                <span className="absolute bottom-4 right-4 w-6 h-px bg-primary group-hover:bg-primary-foreground transition-colors duration-500" />
                <span className="absolute bottom-4 right-4 w-px h-6 bg-primary group-hover:bg-primary-foreground transition-colors duration-500" />

                {/* Info */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary group-hover:text-primary-foreground transition-colors duration-500 mb-2">
                      {w.tag}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground group-hover:text-primary-foreground transition-colors duration-500">
                      {w.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                    {w.year}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS — Sticky stack */}
      <section
        id="servicios"
        ref={servicesReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-40 border-t border-border"
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
            className={`max-w-[900px] font-light text-foreground leading-[0.95] tracking-[-0.03em] mb-24 ${reveal(servicesReveal.visible, 150).className}`}
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
          >
            Claridad, sistema y <span className="text-primary italic">propósito</span>.
          </h2>

          <div className="space-y-6">
            {services.map((s, i) => (
              <div
                key={s.n}
                data-cursor
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

      {/* MANIFIESTO — palabras stagger gigantes */}
      <section
        id="manifiesto"
        ref={manifestoReveal.ref}
        className="relative px-6 md:px-12 lg:px-20 py-48 border-t border-border overflow-hidden"
      >
        {/* Letras gigantes parallax */}
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
            § 04 · Manifiesto
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
            <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">§ 05</span>
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

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            <a
              {...reveal(contactReveal.visible, 300)}
              href="mailto:hola@berrygraphics.com"
              data-cursor
              className={`group block ${reveal(contactReveal.visible, 300).className}`}
              aria-label="Contacto de diseño gráfico y marketing digital"
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-4">
                Email
              </span>
              <span className="block font-light tracking-[-0.01em] text-foreground group-hover:text-primary border-b border-border group-hover:border-primary pb-3 transition-colors duration-500 text-xl md:text-2xl">
                hola@berrygraphics.com →
              </span>
            </a>

            <a
              {...reveal(contactReveal.visible, 450)}
              href="https://instagram.com/berrygraphics"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className={`group block ${reveal(contactReveal.visible, 450).className}`}
              aria-label="Ver trabajos en Instagram de diseño gráfico"
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-4">
                Instagram
              </span>
              <span className="block font-light tracking-[-0.01em] text-foreground group-hover:text-primary border-b border-border group-hover:border-primary pb-3 transition-colors duration-500 text-xl md:text-2xl">
                @berrygraphics →
              </span>
            </a>

            <div
              {...reveal(contactReveal.visible, 600)}
              className={reveal(contactReveal.visible, 600).className}
            >
              <span className="block text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-4">
                Estudio
              </span>
              <p className="text-xl md:text-2xl font-light text-foreground leading-[1.4]">
                Buenos Aires
                <br />
                <span className="text-muted-foreground text-base">Lun — Vie · 09 / 18h</span>
              </p>
            </div>
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
        @media (hover: none) {
          [data-cursor] { cursor: pointer; }
        }
      `}</style>
    </div>
  );
};

export default Index;
