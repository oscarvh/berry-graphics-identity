import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Instagram, Send } from "lucide-react";
import berryLogo from "@/assets/berry-logo.webp";

/* ─────────────────────────────────────────────────────────
   FLIP-style logo morph: the big hero logo physically
   transforms into the navbar logo as the user scrolls.
   We measure source (hero) and target (navbar) positions
   once on layout, then drive a single transform with rAF.
   ───────────────────────────────────────────────────────── */
const useLogoMorph = () => {
  const sourceRef = useRef<HTMLDivElement>(null); // placeholder in hero (final resting size)
  const targetRef = useRef<HTMLDivElement>(null); // placeholder in navbar
  const flyerRef = useRef<HTMLDivElement>(null);  // the actual moving element
  const ticking = useRef(false);
  const cached = useRef<{ sx: number; sy: number; tx: number; ty: number; scale: number } | null>(null);

  const measure = () => {
    if (!sourceRef.current || !targetRef.current || !flyerRef.current) return;
    const s = sourceRef.current.getBoundingClientRect();
    const t = targetRef.current.getBoundingClientRect();
    // Position flyer at source (hero) location, then translate toward target as we scroll
    cached.current = {
      sx: s.left + s.width / 2,
      sy: s.top + window.scrollY + s.height / 2,
      tx: t.left + t.width / 2,
      ty: t.top + t.height / 2, // navbar is fixed → no scrollY
      scale: t.width / s.width,
    };
    apply();
  };

  const apply = () => {
    if (!cached.current || !flyerRef.current) return;
    const { sx, sy, tx, ty, scale } = cached.current;
    // Progress 0 → 1 across roughly 70% of viewport height
    const distance = window.innerHeight * 0.7;
    const raw = Math.min(Math.max(window.scrollY / distance, 0), 1);
    // easeInOutCubic
    const p = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;

    // Current absolute target position (target follows viewport since navbar is fixed)
    const curTx = tx;
    const curTy = ty + window.scrollY; // convert to document space

    const x = sx + (curTx - sx) * p;
    const y = sy + (curTy - sy) * p;
    const sc = 1 + (scale - 1) * p;

    flyerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${sc})`;
    flyerRef.current.style.opacity = `${0.35 + 0.65 * (1 - p) + p}`; // stay visible throughout
    ticking.current = false;
  };

  const onScroll = () => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(apply);
    }
  };

  useLayoutEffect(() => {
    measure();
    const onResize = () => { measure(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Re-measure after fonts/images settle
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 800);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(t1); clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sourceRef, targetRef, flyerRef };
};

/* ─── Scroll reveal ─── */
const useReveal = (threshold = 0.15) => {
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

const reveal = (v: boolean) =>
  `transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

const stagger = (v: boolean, i: number) => ({
  className: `transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
  style: { transitionDelay: v ? `${i * 120}ms` : "0ms" },
});

/* ─── Editorial section divider ─── */
const SectionDivider = ({ label, mark = "§" }: { label: string; mark?: string }) => (
  <div className="px-6 md:px-12 lg:px-20" aria-hidden>
    <div className="max-w-[1600px] mx-auto flex items-center gap-6 py-10">
      <div className="h-px flex-1 bg-border" />
      <span className="text-primary text-[14px] leading-none rotate-45 inline-block">◆</span>
      <span className="text-[9px] font-semibold tracking-[0.45em] uppercase text-muted-foreground/70">
        {mark} {label}
      </span>
      <span className="text-primary text-[14px] leading-none rotate-45 inline-block">◆</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  </div>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { sourceRef, targetRef, flyerRef } = useLogoMorph();

  const editorialSection = useReveal();
  const servicesSection = useReveal();
  const manifestoSection = useReveal();
  const contactSection = useReveal();

  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const fade = (delay: number) => ({
    className: `transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
    style: { transitionDelay: loaded ? `${delay}ms` : "0ms" },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.target as HTMLFormElement);
    window.location.href = `mailto:hola@berrygraphics.com?subject=Consulta de ${encodeURIComponent(d.get("nombre") as string)}&body=${encodeURIComponent(`Nombre: ${d.get("nombre")}\nEmail: ${d.get("email")}\n\nMensaje:\n${d.get("mensaje")}`)}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ─────────── FIXED NAVBAR ─────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60 py-4" : "bg-transparent py-7"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            {/* Target placeholder where the logo morphs to */}
            <div ref={targetRef} className="w-7 h-7" aria-hidden />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-semibold text-primary leading-none">Berry</span>
              <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground leading-none">
                Graphics
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#editorial" className="text-[10px] font-semibold tracking-[0.3em] uppercase text-foreground/70 hover:text-primary transition-colors">
              Estudio
            </a>
            <a href="#servicios" className="text-[10px] font-semibold tracking-[0.3em] uppercase text-foreground/70 hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#manifiesto" className="text-[10px] font-semibold tracking-[0.3em] uppercase text-foreground/70 hover:text-primary transition-colors">
              Manifiesto
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
            >
              Contacto
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* ─────────── FLYING LOGO (absolutely positioned in document) ─────────── */}
      <div
        ref={flyerRef}
        className="absolute top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <img
          src={berryLogo}
          alt="Berry Graphics diseño gráfico y social media marketing"
          className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] object-contain"
        />
      </div>

      {/* ─────────── HERO — Editorial cover ─────────── */}
      <section className="relative min-h-screen flex flex-col px-6 md:px-12 lg:px-20 pt-32 pb-20 overflow-hidden">
        {/* Top meta strip */}
        <div
          {...fade(0)}
          className={`flex items-center justify-between text-[10px] font-normal tracking-[0.3em] uppercase text-muted-foreground/70 border-t border-border pt-6 ${fade(0).className}`}
        >
          <span>Vol. 01 — Estudio Creativo</span>
          <span className="hidden sm:inline">Buenos Aires · Argentina</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Main editorial grid */}
        <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-10 items-center pt-12 lg:pt-20">
          {/* Left — vertical kicker */}
          <div className="hidden lg:flex col-span-1 flex-col items-start justify-end h-full pb-8">
            <div
              {...fade(300)}
              className={`flex flex-col items-center gap-5 ${fade(300).className}`}
            >
              <div className="w-px h-20 bg-primary/40" />
              <span
                className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Berry Graphics — Est. 2019
              </span>
            </div>
          </div>

          {/* Center — Big editorial headline */}
          <div className="col-span-12 lg:col-span-8 relative">
            <div {...fade(200)} className={`mb-8 ${fade(200).className}`}>
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary/70">
                Issue №01 / Identidad
              </span>
            </div>

            <h1
              {...fade(400)}
              className={`font-light text-foreground leading-[0.92] tracking-[-0.04em] ${fade(400).className}`}
              style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
            >
              Diseño
              <br />
              <span className="italic font-light text-muted-foreground/80">en</span>{" "}
              <span className="text-primary font-normal">comunicación</span>
              <br />
              visual.
            </h1>

            {/* Source placeholder for morph (invisible reservation) */}
            <div
              ref={sourceRef}
              className="absolute right-0 -top-10 lg:-top-16 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] opacity-0 pointer-events-none"
              aria-hidden
            />
          </div>

          {/* Right — caption block */}
          <div className="col-span-12 lg:col-span-3 lg:pl-6 lg:border-l lg:border-border">
            <div {...fade(700)} className={fade(700).className}>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60 mb-5">
                ¶ Nota del editor
              </p>
              <p className="text-[14px] font-normal text-foreground/80 leading-[1.7] mb-8">
                Identidad visual y contenido para redes sociales.
                Diseño gráfico profesional para marcas que buscan
                posicionarse y conectar.
              </p>
              <a
                href="#contacto"
                className="group inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-primary border-b border-primary/30 pb-2 hover:border-primary transition-colors"
              >
                Iniciar proyecto
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom meta — page numbering */}
        <div
          {...fade(900)}
          className={`mt-auto pt-12 flex items-end justify-between border-b border-border pb-6 ${fade(900).className}`}
        >
          <div className="flex items-baseline gap-3 text-[10px] font-normal tracking-[0.3em] uppercase text-muted-foreground/70">
            <span>Pág.</span>
            <span className="text-primary font-semibold text-base">01</span>
            <span>/ 04</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] font-normal tracking-[0.3em] uppercase text-muted-foreground/70">
            <div className="w-12 h-px bg-primary/40" />
            <span>Scroll para continuar</span>
          </div>
          <div className="text-[10px] font-normal tracking-[0.3em] uppercase text-muted-foreground/70">
            Identidad / Social
          </div>
        </div>
      </section>

      {/* ─────────── SECTION DIVIDER ─────────── */}
      <SectionDivider label="El estudio" mark="§ 02" />

      {/* ─────────── EDITORIAL: Two-column long form ─────────── */}
      <section
        id="editorial"
        ref={editorialSection.ref}
        className="px-6 md:px-12 lg:px-20 pt-8 pb-32 md:pb-44"
      >
        <div className={`max-w-[1600px] mx-auto grid grid-cols-12 gap-6 lg:gap-12 ${reveal(editorialSection.visible)}`}>
          {/* Section number */}
          <div className="col-span-12 lg:col-span-2">
            <div className="flex lg:flex-col items-center lg:items-start gap-4">
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary">§ 02</span>
              <div className="w-12 lg:w-px lg:h-12 h-px bg-primary/40" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60">
                El estudio
              </span>
            </div>
          </div>

          {/* Lead paragraph */}
          <div className="col-span-12 lg:col-span-7">
            <h2
              className="font-light text-foreground leading-[1.05] tracking-[-0.025em] mb-12"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              <span className="text-primary/30 font-normal text-[1.2em] align-top mr-2 leading-none">“</span>
              Creamos sistemas visuales que sostienen marcas durante años,
              no <span className="italic text-primary">tendencias</span> que duran semanas.
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 text-[14px] font-normal text-foreground/75 leading-[1.85]">
              <p>
                Berry Graphics es un estudio de diseño en comunicación visual
                y social media marketing. Trabajamos con marcas que entienden
                el diseño como una inversión estratégica, no como decoración.
              </p>
              <p>
                Cada identidad, sistema y pieza nace de una pregunta simple:
                ¿qué necesita esta marca para sostenerse y crecer en el tiempo?
                La respuesta guía cada decisión visual.
              </p>
            </div>
          </div>

          {/* Sidebar facts */}
          <div className="col-span-12 lg:col-span-3 lg:pl-6 lg:border-l lg:border-border">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60 mb-6">
              ⊹ Datos
            </p>
            <ul className="space-y-5">
              {[
                ["150+", "Marcas potenciadas"],
                ["5+", "Años en el oficio"],
                ["100%", "Diseño a medida"],
                ["24h", "Respuesta a consultas"],
              ].map(([n, l]) => (
                <li key={l} className="flex items-baseline gap-4 border-b border-border pb-4 last:border-0">
                  <span className="text-2xl font-light text-primary tabular-nums">{n}</span>
                  <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────── MARQUEE strip ─────────── */}
      <div className="border-y border-border py-5 overflow-hidden bg-background">
        <div className="animate-marquee flex whitespace-nowrap">
          {[
            "Identidad Visual", "Social Media Marketing", "Diseño Editorial",
            "Comunicación Digital", "Branding", "Diseño para Instagram",
            "Identidad Visual", "Social Media Marketing", "Diseño Editorial",
            "Comunicación Digital", "Branding", "Diseño para Instagram",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-8 mx-8">
              <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-foreground/70">
                {item}
              </span>
              <span className="w-1.5 h-1.5 bg-primary rotate-45" />
            </span>
          ))}
        </div>
      </div>

      {/* ─────────── SERVICES — editorial index ─────────── */}
      <section
        id="servicios"
        ref={servicesSection.ref}
        className="px-6 md:px-12 lg:px-20 py-32 md:py-44"
      >
        <div className={`max-w-[1600px] mx-auto ${reveal(servicesSection.visible)}`}>
          <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-20 lg:mb-28">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary">§ 03</span>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <h2
                className="font-light text-foreground leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
              >
                Servicios
                <span className="italic text-muted-foreground/70"> &amp; </span>
                <span className="text-primary font-normal">disciplinas</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:pl-6 lg:border-l lg:border-border flex items-end">
              <p className="text-[13px] font-normal text-muted-foreground leading-[1.85]">
                Tres áreas de práctica conectadas entre sí.
                Pensamos identidad, contenido y comunicación
                como un mismo organismo.
              </p>
            </div>
          </div>

          {/* Editorial list — large rows */}
          <div className="border-t border-border">
            {[
              {
                n: "01",
                title: "Identidad visual",
                tags: ["Logotipo", "Sistema", "Manual de marca", "Aplicaciones"],
                text: "Sistemas visuales coherentes que comunican la esencia de tu marca en cada punto de contacto. Desde logotipos hasta manuales completos.",
              },
              {
                n: "02",
                title: "Social media marketing",
                tags: ["Instagram", "Estrategia", "Contenido", "Plantillas"],
                text: "Contenido visual estratégico para redes sociales que genera engagement, posiciona tu marca y construye comunidad real.",
              },
              {
                n: "03",
                title: "Comunicación digital",
                tags: ["Editorial", "Web", "Campañas", "Storytelling visual"],
                text: "Diseño para Instagram, plataformas digitales y campañas que conectan con tu audiencia y refuerzan el posicionamiento.",
              },
            ].map((s, i) => (
              <article
                key={s.n}
                {...stagger(servicesSection.visible, i)}
                className={`group grid grid-cols-12 gap-4 lg:gap-12 py-12 lg:py-16 border-b border-border hover:bg-muted/40 transition-colors duration-500 px-2 ${stagger(servicesSection.visible, i).className}`}
              >
                <div className="col-span-2 lg:col-span-1">
                  <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary tabular-nums">
                    /{s.n}
                  </span>
                </div>
                <div className="col-span-10 lg:col-span-5">
                  <h3
                    className="font-light text-foreground leading-[1.05] tracking-[-0.02em] group-hover:text-primary transition-colors duration-500"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <p className="text-[14px] font-normal text-muted-foreground leading-[1.85]">
                    {s.text}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-2 flex flex-wrap gap-2 lg:justify-end items-start">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] font-normal tracking-[0.15em] uppercase text-muted-foreground/70 border border-border px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION DIVIDER ─────────── */}
      <SectionDivider label="Manifiesto" mark="✦" />

      {/* ─────────── MANIFESTO — light, editorial ─────────── */}
      <section
        id="manifiesto"
        ref={manifestoSection.ref}
        className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-32 md:py-44"
      >
        <div className={`${reveal(manifestoSection.visible)}`}>
          <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 lg:gap-12">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary">§ 04</span>
              <div className="mt-4 w-12 h-px bg-primary/40" />
              <p className="mt-4 text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/70">
                Manifiesto
              </p>
            </div>

            <div className="col-span-12 lg:col-span-10">
              <h2
                className="font-light leading-[0.98] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
              >
                Diseñamos
                <br />
                para marcas que
                <br />
                <span className="italic text-muted-foreground/80">comunican con</span>{" "}
                <span className="font-normal text-primary underline decoration-2 underline-offset-[12px] decoration-primary/40">claridad</span>.
              </h2>

              <div className="mt-16 grid sm:grid-cols-3 gap-10 lg:gap-16 max-w-4xl">
                {[
                  ["No vendemos humo.", "Cada propuesta tiene un porqué estratégico."],
                  ["No seguimos modas.", "Apostamos por sistemas atemporales."],
                  ["No improvisamos.", "Proceso, criterio y oficio en cada decisión."],
                ].map(([t, d]) => (
                  <div key={t} className="border-t border-border pt-6">
                    <p className="text-[15px] font-semibold leading-snug mb-2 text-foreground">{t}</p>
                    <p className="text-[13px] font-normal leading-[1.85] text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                className="group mt-16 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary border-b border-primary/30 pb-2 hover:border-primary transition-colors"
              >
                Hablemos de tu marca
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CONTACT — editorial form ─────────── */}
      <section
        id="contacto"
        ref={contactSection.ref}
        className="px-6 md:px-12 lg:px-20 py-32 md:py-44"
      >
        <div className={`max-w-[1600px] mx-auto ${reveal(contactSection.visible)}`}>
          <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-16 lg:mb-20">
            <div className="col-span-12 lg:col-span-2">
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary">§ 05</span>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h2
                className="font-light text-foreground leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
              >
                Empecemos a
                <br />
                <span className="text-primary font-normal">trabajar juntos</span>.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-16">
            {/* Contact info */}
            <aside className="col-span-12 lg:col-span-4 lg:border-r lg:border-border lg:pr-8">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60 mb-8">
                ✦ Canales directos
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:hola@berrygraphics.com"
                  aria-label="Contacto de diseño gráfico y marketing digital"
                  className="group flex items-center gap-4 text-[14px] text-foreground hover:text-primary transition-colors duration-300 border-b border-border pb-4"
                >
                  <Mail className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
                  hola@berrygraphics.com
                </a>
                <a
                  href="https://instagram.com/berrygraphics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver trabajos en Instagram de diseño gráfico"
                  className="group flex items-center gap-4 text-[14px] text-foreground hover:text-primary transition-colors duration-300 border-b border-border pb-4"
                >
                  <Instagram className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
                  @berrygraphics
                </a>
              </div>

              <div className="mt-12 space-y-3 text-[11px] font-normal tracking-[0.15em] uppercase text-muted-foreground/70">
                <p>Buenos Aires · Argentina</p>
                <p>Lun – Vie · 10 a 18 hs</p>
                <p className="text-primary">Respuesta en menos de 24 hs</p>
              </div>
            </aside>

            {/* Form */}
            <div className="col-span-12 lg:col-span-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                      01 — Nombre
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      className="w-full bg-transparent border-b border-border py-3 text-[15px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                      02 — Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full bg-transparent border-b border-border py-3 text-[15px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                    03 — Contanos sobre tu proyecto
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={5}
                    placeholder="Qué necesitás, en qué momento está tu marca, objetivos…"
                    className="w-full bg-transparent border-b border-border py-3 text-[15px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 self-start group inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 hover:bg-secondary"
                >
                  {formSent ? "¡Enviado!" : "Enviar mensaje"}
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-10 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <img src={berryLogo} alt="Berry Graphics" className="w-6 h-6 object-contain" />
            <span className="text-[13px] font-semibold text-primary">Berry</span>
            <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground">
              Graphics®
            </span>
          </div>
          <div className="col-span-12 md:col-span-4 text-center text-[10px] font-normal tracking-[0.3em] uppercase text-muted-foreground/60">
            Diseño en comunicación visual
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right text-[10px] tracking-[0.2em] text-muted-foreground/50">
            © {new Date().getFullYear()} — Todos los derechos reservados
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
