import { useEffect, useState, useRef } from "react";
import { ArrowRight, Mail, Instagram, Send } from "lucide-react";
import berryLogo from "@/assets/berry-logo.webp";

/* ─── Scroll-driven logo hook (rAF for smooth 60fps) ─── */
const useScrollLogo = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<(HTMLDivElement | null)[]>([]);
  const cornerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const p = Math.min(window.scrollY / (window.innerHeight * 0.55), 1);
      // Eased progress for organic feel
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      if (logoRef.current) {
        const scale = 1 + ease * 0.6;
        const y = ease * -40;
        const opacity = Math.max(0, 1 - ease * 1.3);
        logoRef.current.style.transform = `scale(${scale}) translateY(${y}px)`;
        logoRef.current.style.opacity = `${opacity}`;
      }

      const fOpacity = Math.max(0, 1 - p * 2.5);
      frameRef.current.forEach((el, i) => {
        if (!el) return;
        const rot = i === 0 ? p * -4 : p * 3;
        const s = 1 - p * (i === 0 ? 0.15 : 0.1);
        el.style.opacity = `${fOpacity}`;
        el.style.transform = `rotate(${rot}deg) scale(${s})`;
      });

      if (cornerRef.current) {
        cornerRef.current.style.opacity = `${Math.max(0, 1 - p * 3)}`;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { logoRef, frameRef, cornerRef };
};

/* ─── Scroll reveal hook ─── */
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
  style: { transitionDelay: v ? `${i * 150}ms` : "0ms" },
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const Index = () => {
  const { logoRef, frameRef, cornerRef } = useScrollLogo();

  const valueSection = useReveal();
  const impactSection = useReveal();
  const contactSection = useReveal();

  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
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

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
        {/* Fixed nav */}
        <nav
          {...fade(0)}
          className={`absolute top-0 left-0 right-0 px-6 md:px-16 lg:px-24 py-8 flex items-center justify-between z-20 ${fade(0).className}`}
        >
          <div className="flex items-center gap-3">
            <img
              src={berryLogo}
              alt="Berry Graphics diseño gráfico y social media marketing"
              className="w-8 h-8 object-contain"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[14px] font-semibold text-primary">Berry</span>
              <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground">
                Graphics
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

        {/* Hero grid */}
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-8 items-center">
          {/* Left copy */}
          <div className="relative z-10">
            <div {...fade(200)} className={`flex items-center gap-4 mb-10 ${fade(200).className}`}>
              <div className="w-12 h-px bg-primary" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary">
                Estudio creativo
              </span>
            </div>

            <h1
              {...fade(400)}
              className={`text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem] font-light leading-[1.05] tracking-[-0.03em] text-foreground ${fade(400).className}`}
            >
              Diseño en
              <br />
              comunicación
              <br />
              <span className="relative inline-block text-primary font-normal">
                visual
                <span
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary/30 origin-left"
                  style={{
                    width: loaded ? "100%" : "0%",
                    transition: "width 1200ms cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: "900ms",
                  }}
                />
              </span>
            </h1>

            <p
              {...fade(600)}
              className={`mt-8 text-[15px] sm:text-base font-normal text-muted-foreground leading-[1.85] max-w-[440px] ${fade(600).className}`}
            >
              Identidad visual y contenido para redes sociales.
              Diseño gráfico profesional para marcas que buscan
              posicionarse y conectar.
            </p>

            <div {...fade(800)} className={`mt-12 flex flex-col sm:flex-row gap-4 ${fade(800).className}`}>
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

          {/* Right — scroll-driven logo */}
          <div
            {...fade(500)}
            className={`relative flex items-center justify-center py-16 lg:py-0 ${fade(500).className}`}
          >
            {/* Geometric frames */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] border border-primary/[0.08]"
                style={{
                  opacity: frameOpacity,
                  transform: `rotate(${scrollP * -6}deg) scale(${1 - scrollP * 0.2})`,
                  transition: loaded ? "none" : "all 2000ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] lg:w-[330px] lg:h-[330px] border border-primary/[0.05]"
                style={{
                  opacity: frameOpacity,
                  transform: `rotate(${scrollP * 4}deg) scale(${1 - scrollP * 0.15})`,
                  transition: loaded ? "none" : "all 2200ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>

            {/* Red accent corner */}
            <div
              className="absolute top-8 right-8 sm:top-4 sm:right-4 lg:top-0 lg:right-0"
              style={{ opacity: Math.max(0, loaded ? 1 - scrollP * 3 : 0), transition: loaded ? "none" : "opacity 1500ms ease" }}
            >
              <div className="w-16 h-px bg-primary/30" />
              <div className="w-px h-16 bg-primary/30 ml-[calc(100%-1px)]" />
            </div>

            {/* Logo — scales & translates with scroll */}
            <img
              src={berryLogo}
              alt="Berry Graphics diseño gráfico y social media marketing"
              className="relative z-10 w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 object-contain"
              style={{
                transform: `scale(${logoScale}) translateY(${logoY}px)`,
                opacity: Math.max(0, logoOpacity),
                willChange: "transform, opacity",
              }}
            />
          </div>
        </div>

        {/* Bottom stats */}
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

      {/* ─── MARQUEE ─── */}
      <div className="border-y border-border py-5 overflow-hidden bg-background">
        <div className="animate-marquee flex whitespace-nowrap">
          {[
            "Branding", "Social Media", "Identidad Visual", "Comunicación",
            "Estrategia", "Diseño Editorial", "Marketing Digital", "Contenido Visual",
            "Branding", "Social Media", "Identidad Visual", "Comunicación",
            "Estrategia", "Diseño Editorial", "Marketing Digital", "Contenido Visual",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-8 mx-8">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-primary/30" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── VALUE ─── */}
      <section id="valor" ref={valueSection.ref} className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className={`max-w-7xl mx-auto ${reveal(valueSection.visible)}`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary">
                  Servicios
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-light text-foreground leading-[1.1] tracking-[-0.02em]">
                Diseño gráfico
                <span className="text-primary font-normal"> profesional</span>
                <br />
                para tu
                <span className="text-primary font-normal"> marca</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-[15px] font-normal text-muted-foreground leading-[1.85] max-w-md lg:ml-auto">
                Identidad visual y contenido para redes sociales.
                Diseño para Instagram y comunicación digital que conecta
                con tu audiencia y posiciona tu marca.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {[
              { n: "01", title: "Identidad visual", text: "Sistemas visuales coherentes que comunican la esencia de tu marca en cada punto de contacto." },
              { n: "02", title: "Social media marketing", text: "Contenido visual estratégico para redes sociales que genera engagement y construye comunidad." },
              { n: "03", title: "Comunicación digital", text: "Diseño para Instagram y plataformas digitales que posiciona tu marca y conecta con tu audiencia." },
            ].map((v, i) => (
              <div
                key={v.n}
                {...stagger(valueSection.visible, i + 1)}
                className={`relative p-10 lg:p-14 border border-border -ml-px first:ml-0 -mt-px first:mt-0 md:mt-0 group hover:border-primary/30 transition-colors duration-500 ${stagger(valueSection.visible, i + 1).className}`}
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700" />
                <span className="text-[40px] sm:text-[48px] font-light text-primary/10 leading-none group-hover:text-primary/20 transition-colors duration-500">
                  {v.n}
                </span>
                <h3 className="mt-6 text-lg font-normal text-foreground leading-snug">{v.title}</h3>
                <p className="mt-4 text-[13px] font-normal text-muted-foreground leading-[1.85]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMPACT ─── */}
      <section ref={impactSection.ref} className="relative overflow-hidden">
        <div className="bg-primary text-primary-foreground px-6 md:px-16 lg:px-24 py-24 md:py-32">
          <div className={`max-w-7xl mx-auto ${reveal(impactSection.visible)}`}>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-light leading-[1.08] tracking-[-0.02em]">
                  Marcas que
                  <br />
                  comunican con
                  <br />
                  <span className="font-normal">claridad</span>
                </h2>
              </div>
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
                  Diseño gráfico profesional para marcas.
                  Cada proyecto transforma la percepción y el posicionamiento de tu marca.
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

      {/* ─── CONTACT ─── */}
      <section id="contacto" ref={contactSection.ref} className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
        <div className={`max-w-7xl mx-auto ${reveal(contactSection.visible)}`}>
          {/* CTA Banner */}
          <div className="relative border border-border p-12 sm:p-16 lg:p-20 mb-28 overflow-hidden group hover:border-primary/20 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-primary/10 pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-light text-foreground leading-[1.15] tracking-[-0.01em]">
                  ¿Listo para llevar tu marca
                  <br />
                  <span className="text-primary font-normal">al siguiente nivel</span>?
                </h3>
                <p className="mt-5 text-[14px] text-muted-foreground leading-[1.8] max-w-md">
                  Contanos tu idea y te respondemos en menos de 24 horas
                  con una propuesta personalizada.
                </p>
              </div>
              <a
                href="#contacto-form"
                className="shrink-0 group/btn inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
              >
                Escribinos ahora
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Form grid */}
          <div id="contacto-form" className="grid lg:grid-cols-[1fr,1.2fr] gap-20 lg:gap-32">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary">
                  Contacto
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground leading-[1.1] tracking-[-0.02em]">
                Empecemos a
                <br />
                <span className="text-primary font-normal">trabajar juntos</span>
              </h2>
              <p className="mt-7 text-[14px] font-normal text-muted-foreground leading-[1.85] max-w-sm">
                Completá el formulario y te contactamos con una propuesta
                a medida para tu proyecto. Sin compromiso.
              </p>

              <div className="mt-14 space-y-6">
                <a
                  href="mailto:hola@berrygraphics.com"
                  className="group flex items-center gap-4 text-[13px] text-foreground hover:text-primary transition-colors duration-300"
                  title="Contacto de diseño gráfico y marketing digital"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-primary/60" />
                  </div>
                  hola@berrygraphics.com
                </a>
                <a
                  href="https://instagram.com/berrygraphics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-[13px] text-foreground hover:text-primary transition-colors duration-300"
                  title="Ver trabajos en Instagram de diseño gráfico"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                    <Instagram className="w-4 h-4 text-primary/60" />
                  </div>
                  @berrygraphics
                </a>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                      Nombre *
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      className="w-full bg-transparent border-b border-border py-4 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full bg-transparent border-b border-border py-4 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={5}
                    placeholder="Contanos sobre tu proyecto, qué necesitás y cuáles son tus objetivos..."
                    className="w-full bg-transparent border-b border-border py-4 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 self-start inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary group"
                >
                  {formSent ? "¡Enviado!" : "Enviar mensaje"}
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={berryLogo} alt="Berry Graphics diseño gráfico" className="w-6 h-6 object-contain" />
            <span className="text-[13px] font-semibold text-primary">Berry</span>
            <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground">
              Graphics®
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/50 tracking-[0.2em]">
            © 2024 — Todos los derechos reservados
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
