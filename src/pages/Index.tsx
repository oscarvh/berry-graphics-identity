import { useEffect, useRef, useState } from "react";
import { Mail, Instagram, ArrowRight, Zap, Eye, TrendingUp, Send, CheckCircle2 } from "lucide-react";
import berryLogo from "@/assets/berry-logo.png";

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
};

const reveal = (visible: boolean, delay = 0) =>
  `transition-all ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }` +
  ` duration-[1200ms]` +
  (delay ? ` [transition-delay:${delay}ms]` : "");

/* ── staggered reveal for children ── */
const stagger = (visible: boolean, index: number) => ({
  className: `transition-all duration-[900ms] ease-out ${
    visible
      ? "opacity-100 translate-y-0 translate-x-0"
      : "opacity-0 translate-y-6"
  }`,
  style: { transitionDelay: visible ? `${index * 150}ms` : "0ms" },
});

/* ── data ── */
const stats = [
  { value: "150+", label: "Marcas potenciadas" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "5 años", label: "De experiencia" },
];

const services = [
  {
    icon: Eye,
    title: "Identidad Visual",
    desc: "Logos, brandbooks y sistemas visuales que posicionan tu marca con claridad y coherencia.",
    items: ["Logotipos", "Manual de marca", "Papelería corporativa"],
  },
  {
    icon: Zap,
    title: "Social Media",
    desc: "Contenido estratégico que conecta con tu audiencia y genera resultados medibles.",
    items: ["Estrategia de contenido", "Diseño de posts", "Gestión de redes"],
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital",
    desc: "Campañas diseñadas para convertir atención en clientes reales para tu negocio.",
    items: ["Campañas pagadas", "Email marketing", "Landing pages"],
  },
];

/* ── page ── */
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hero = useScrollReveal();
  const statsRef = useScrollReveal(100);
  const servicesRef = useScrollReveal(100);
  const resultsRef = useScrollReveal(100);
  const ctaRef = useScrollReveal(100);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    window.location.href = `mailto:hola@berrygraphics.com?subject=Consulta de ${encodeURIComponent(
      data.get("nombre") as string
    )}&body=${encodeURIComponent(
      `Nombre: ${data.get("nombre")}\nEmail: ${data.get("email")}\nEmpresa: ${data.get("empresa")}\n\nMensaje:\n${data.get("mensaje")}`
    )}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <>
      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-3 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2.5">
          <img src={berryLogo} alt="Berry Graphics" className="w-8 h-8 object-contain" />
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-primary tracking-tight">Berry</span>
            <span className="text-[10px] font-normal tracking-[0.35em] uppercase text-muted-foreground">Graphics</span>
          </div>
        </a>
        <a
          href="#contacto"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-secondary"
        >
          Comenzar proyecto
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </nav>

      <main className="flex flex-col overflow-x-hidden">
        {/* ── HERO ── */}
        <section
          ref={hero.ref}
          className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20"
        >
          <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-20 lg:pt-0">
            {/* Left — copy */}
            <div>
              <div
                {...stagger(hero.visible, 0)}
                className={`inline-flex items-center gap-2 px-3 py-1 border border-primary/20 mb-8 ${stagger(hero.visible, 0).className}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">
                  Estudio de diseño
                </span>
              </div>

              <h1
                {...stagger(hero.visible, 1)}
                className={`text-[2.75rem] sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight ${stagger(hero.visible, 1).className}`}
              >
                Diseño que
                <br />
                <span className="text-primary font-normal">convierte</span>
                <br />
                <span className="text-muted-foreground/40 text-[0.6em]">audiencias en clientes</span>
              </h1>

              <p
                {...stagger(hero.visible, 2)}
                className={`mt-8 text-base font-normal text-muted-foreground leading-relaxed max-w-md ${stagger(hero.visible, 2).className}`}
              >
                Comunicación visual y social media marketing estratégico para marcas que quieren crecer con identidad propia.
              </p>

              <div
                {...stagger(hero.visible, 3)}
                className={`mt-10 flex flex-col sm:flex-row gap-4 ${stagger(hero.visible, 3).className}`}
              >
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-secondary"
                >
                  Solicitar presupuesto
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  Ver servicios
                </a>
              </div>
            </div>

            {/* Right — logo visual block */}
            <div
              {...stagger(hero.visible, 2)}
              className={`hidden lg:flex flex-col items-center justify-center relative ${stagger(hero.visible, 2).className}`}
            >
              <div className="relative w-full max-w-sm flex items-center justify-center">
                {/* Logo grande como hero visual */}
                <img
                  src={berryLogo}
                  alt="Berry Graphics"
                  className="w-64 h-64 object-contain opacity-90"
                />
                {/* Floating accent elements */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-primary/15 transition-all duration-[2000ms] ease-out"
                  style={{ transform: hero.visible ? "translate(0,0)" : "translate(-20px,20px)", opacity: hero.visible ? 1 : 0 }}
                />
                <div className="absolute -top-6 -right-6 w-20 h-20 border-2 border-primary/10 transition-all duration-[2000ms] ease-out"
                  style={{ transform: hero.visible ? "translate(0,0)" : "translate(20px,-20px)", opacity: hero.visible ? 1 : 0, transitionDelay: "300ms" }}
                />
                {/* Grid pattern */}
                <div className="absolute top-0 right-0 grid grid-cols-3 gap-2 opacity-15 transition-opacity duration-[1500ms]"
                  style={{ opacity: hero.visible ? 0.15 : 0, transitionDelay: "600ms" }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-primary" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
            style={{ opacity: hero.visible ? 0.4 : 0, transitionDelay: "1200ms" }}
          >
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Scroll</span>
            <div className="w-px h-8 bg-primary/30 animate-pulse" />
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section
          ref={statsRef.ref}
          className={`px-6 md:px-12 lg:px-20 py-16 border-y border-border ${reveal(statsRef.visible)}`}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} {...stagger(statsRef.visible, i)} className={`text-center ${stagger(statsRef.visible, i).className}`}>
                <span className="block text-3xl sm:text-4xl font-light text-primary">
                  {s.value}
                </span>
                <span className="block mt-2 text-xs font-normal tracking-widest uppercase text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICIOS ── */}
        <section
          id="servicios"
          ref={servicesRef.ref}
          className={`px-6 md:px-12 lg:px-20 py-24 md:py-32 ${reveal(servicesRef.visible)}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-16">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">
                Servicios
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light text-foreground leading-tight">
                Todo lo que tu marca
                <br />
                <span className="text-primary">necesita para crecer</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-0 border border-border">
              {services.map((svc, i) => (
                <div
                  key={svc.title}
                  {...stagger(servicesRef.visible, i)}
                  className={`p-8 lg:p-10 ${
                    i < 2 ? "md:border-r border-b md:border-b-0 border-border" : ""
                  } group hover:bg-muted/30 transition-colors duration-500 ${stagger(servicesRef.visible, i).className}`}
                >
                  <svc.icon className="w-6 h-6 text-primary mb-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold tracking-wide text-foreground mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                  <ul className="space-y-2">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTADOS / DIFERENCIAL ── */}
        <section
          ref={resultsRef.ref}
          className={`px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-foreground ${reveal(resultsRef.visible)}`}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">
                Por qué elegirnos
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-light text-background leading-tight">
                No solo diseñamos.
                <br />
                <span className="text-primary">Generamos resultados.</span>
              </h2>
              <p className="mt-6 text-base font-light text-background/60 leading-relaxed">
                Cada pieza visual que creamos tiene un objetivo estratégico: 
                posicionar tu marca, conectar con tu audiencia y convertir 
                atención en oportunidades de negocio.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "01", text: "Estrategia antes del diseño" },
                { num: "02", text: "Identidad visual coherente" },
                { num: "03", text: "Contenido que convierte" },
                { num: "04", text: "Soporte continuo" },
              ].map((item, i) => (
                <div
                  key={item.num}
                  {...stagger(resultsRef.visible, i)}
                  className={`p-6 border border-background/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 ${stagger(resultsRef.visible, i).className}`}
                >
                  <span className="block text-2xl font-light text-primary mb-3">
                    {item.num}
                  </span>
                  <p className="text-sm font-normal text-background/80 leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA / CONTACTO ── */}
        <section
          id="contacto"
          ref={ctaRef.ref}
          className={`px-6 md:px-12 lg:px-20 py-24 md:py-32 ${reveal(ctaRef.visible)}`}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">
                Empecemos
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light text-foreground leading-tight">
                Tu próximo nivel
                <br />
                <span className="text-primary">comienza aquí</span>
              </h2>
              <p className="mt-6 text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
                Contanos sobre tu proyecto y te responderemos en menos de 24 hs
                con una propuesta a medida.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href="mailto:hola@berrygraphics.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-secondary transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  hola@berrygraphics.com
                </a>
                <a
                  href="https://instagram.com/berrygraphics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-secondary transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4 text-primary" />
                  @berrygraphics
                </a>
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="nombre"
                  type="text"
                  required
                  placeholder="Nombre"
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <input
                  name="empresa"
                  type="text"
                  placeholder="Empresa"
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
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
                placeholder="¿Qué necesita tu marca?"
                className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
              />
              <button
                type="submit"
                className="mt-3 self-start inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-secondary"
              >
                {formSent ? "¡Enviado!" : "Enviar consulta"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-border">
          <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider">
            <div className="flex items-center gap-2">
              <img src={berryLogo} alt="Berry" className="w-5 h-5 object-contain" />
              <span className="font-semibold text-primary">Berry</span>
              <span className="tracking-[0.3em] uppercase">Graphics®</span>
            </div>
            <span>Diseño en comunicación visual & Social media marketing</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
