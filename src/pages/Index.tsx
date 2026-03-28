import { useEffect, useRef, useState, useCallback } from "react";
import berryLogo from "@/assets/berry-logo.webp";

/* ── Scroll-linked reveal ── */
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

const anim = (visible: boolean, delay = 0) =>
  `transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
  }` as const;

const animStyle = (visible: boolean, delay = 0) =>
  ({ transitionDelay: visible ? `${delay}ms` : "0ms" });

const Index = () => {
  const hero = useReveal(0.05);
  const contact = useReveal(0.2);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ════════════════════════════ HERO ════════════════════════════ */}
      <section
        ref={hero.ref}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24"
      >
        {/* Decorative frame — top-left */}
        <div
          className="absolute top-12 left-8 md:left-16 lg:left-24 flex items-start gap-0 pointer-events-none"
          style={{
            opacity: hero.visible ? 0.15 : 0,
            transition: "all 2400ms cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: hero.visible ? "800ms" : "0ms",
            transform: hero.visible ? "translate(0,0)" : "translate(-12px,-12px)",
          }}
        >
          <div className="w-16 h-px bg-primary" />
          <div className="w-px h-16 bg-primary -mt-px" style={{ marginLeft: "-1px" }} />
        </div>

        {/* Decorative frame — bottom-right */}
        <div
          className="absolute bottom-12 right-8 md:right-16 lg:right-24 flex items-end pointer-events-none"
          style={{
            opacity: hero.visible ? 0.15 : 0,
            transition: "all 2400ms cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: hero.visible ? "1000ms" : "0ms",
            transform: hero.visible ? "translate(0,0)" : "translate(12px,12px)",
          }}
        >
          <div className="flex flex-col items-end">
            <div className="w-16 h-px bg-primary" />
            <div className="w-px h-16 bg-primary" style={{ marginRight: "0px", marginTop: "-1px", alignSelf: "flex-end" }} />
          </div>
        </div>

        {/* Main hero composition */}
        <div className="relative flex flex-col items-center">
          {/* Logo */}
          <div
            style={{
              transform: `translateY(${scrollY * -0.06}px)`,
            }}
          >
            <img
              src={berryLogo}
              alt="Berry Graphics"
              className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain ${anim(hero.visible, 0)}`}
              style={animStyle(hero.visible, 0)}
            />
          </div>

          {/* Brand */}
          <div className="mt-14 flex flex-col items-center">
            <h1
              className={`text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-light text-primary leading-none tracking-[-0.02em] ${anim(hero.visible, 300)}`}
              style={animStyle(hero.visible, 300)}
            >
              Berry
            </h1>
            <span
              className={`mt-3 text-[10px] sm:text-[11px] font-normal tracking-[0.5em] uppercase text-muted-foreground ${anim(hero.visible, 450)}`}
              style={animStyle(hero.visible, 450)}
            >
              Graphics
            </span>
          </div>

          {/* Accent line */}
          <div
            className="mt-12 overflow-hidden"
            style={{
              opacity: hero.visible ? 1 : 0,
              transition: "opacity 1200ms ease",
              transitionDelay: hero.visible ? "700ms" : "0ms",
            }}
          >
            <div
              className="h-px bg-primary/25"
              style={{
                width: hero.visible ? "48px" : "0px",
                transition: "width 1400ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: hero.visible ? "700ms" : "0ms",
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className={`mt-12 text-center text-[13px] sm:text-[14px] font-light text-foreground leading-[2] tracking-[0.04em] ${anim(hero.visible, 700)}`}
            style={animStyle(hero.visible, 700)}
          >
            Diseño en comunicación visual
          </p>
          <p
            className={`text-center text-[13px] sm:text-[14px] font-light text-muted-foreground leading-[2] tracking-[0.04em] ${anim(hero.visible, 850)}`}
            style={animStyle(hero.visible, 850)}
          >
            & social media marketing
          </p>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{
            opacity: hero.visible ? 0.2 : 0,
            transition: "opacity 2000ms ease",
            transitionDelay: hero.visible ? "1800ms" : "0ms",
          }}
        >
          <div className="w-px h-12 bg-primary/30" />
        </div>
      </section>

      {/* ════════════════════════════ CONTACT ════════════════════════════ */}
      <section
        ref={contact.ref}
        className="relative py-40 sm:py-48 px-6 md:px-16"
      >
        {/* Top border accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-border" />

        <div className="max-w-lg mx-auto flex flex-col items-center">
          {/* Section accent */}
          <div
            className="overflow-hidden mb-16"
            style={{
              opacity: contact.visible ? 1 : 0,
              transition: "opacity 1200ms ease",
              transitionDelay: contact.visible ? "200ms" : "0ms",
            }}
          >
            <div
              className="h-px bg-primary/20"
              style={{
                width: contact.visible ? "32px" : "0px",
                transition: "width 1400ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: contact.visible ? "200ms" : "0ms",
              }}
            />
          </div>

          {/* Contact links */}
          <div className="flex flex-col items-center gap-8">
            <a
              href="mailto:hola@berrygraphics.com"
              className={`group flex items-center gap-4 ${anim(contact.visible, 300)}`}
              style={animStyle(contact.visible, 300)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-500" />
              <span className="text-[13px] sm:text-[14px] font-normal text-foreground tracking-wide group-hover:text-primary transition-colors duration-500">
                hola@berrygraphics.com
              </span>
            </a>

            <a
              href="https://instagram.com/berrygraphics"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 ${anim(contact.visible, 500)}`}
              style={animStyle(contact.visible, 500)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-500" />
              <span className="text-[13px] sm:text-[14px] font-normal text-foreground tracking-wide group-hover:text-primary transition-colors duration-500">
                @berrygraphics
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ FOOTER ════════════════════════════ */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] font-semibold text-primary tracking-tight">Berry</span>
            <span className="text-[8px] font-normal tracking-[0.4em] uppercase text-muted-foreground">
              Graphics®
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/50 tracking-[0.15em]">
            © {new Date().getFullYear()} — Todos los derechos reservados
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
