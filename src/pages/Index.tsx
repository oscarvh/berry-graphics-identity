import { useEffect, useRef, useState } from "react";
import berryLogo from "@/assets/berry-logo.webp";

const useReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
};

const fade = (visible: boolean, delay = 0) => ({
  className: `transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
  }`,
  style: { transitionDelay: `${delay}ms` },
});

const Index = () => {
  const hero = useReveal();
  const contact = useReveal(200);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── Hero ─── */}
      <section
        ref={hero.ref}
        className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 relative"
      >
        {/* Logo with subtle parallax */}
        <div
          className="mb-12"
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        >
          <img
            src={berryLogo}
            alt="Berry Graphics"
            {...fade(hero.visible, 0)}
            className={`w-28 h-28 sm:w-36 sm:h-36 object-contain ${fade(hero.visible, 0).className}`}
            style={fade(hero.visible, 0).style}
          />
        </div>

        {/* Brand name */}
        <div
          {...fade(hero.visible, 300)}
          className={`flex items-baseline gap-2 sm:gap-3 ${fade(hero.visible, 300).className}`}
          style={fade(hero.visible, 300).style}
        >
          <span className="text-[2rem] sm:text-[2.75rem] font-light text-primary leading-none tracking-tight">
            Berry
          </span>
          <span className="text-[9px] sm:text-[11px] font-normal tracking-[0.45em] uppercase text-muted-foreground leading-none">
            Graphics
          </span>
        </div>

        {/* Divider */}
        <div
          {...fade(hero.visible, 550)}
          className={`mt-10 w-8 h-px bg-primary/30 ${fade(hero.visible, 550).className}`}
          style={fade(hero.visible, 550).style}
        />

        {/* Tagline */}
        <p
          {...fade(hero.visible, 700)}
          className={`mt-10 text-center text-[13px] sm:text-[14px] font-light text-muted-foreground leading-[1.8] tracking-wide max-w-xs sm:max-w-sm ${fade(hero.visible, 700).className}`}
          style={fade(hero.visible, 700).style}
        >
          Diseño en comunicación visual
          <br />
          & social media marketing
        </p>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-[2000ms]"
          style={{
            opacity: hero.visible ? 0.25 : 0,
            transitionDelay: "1600ms",
          }}
        >
          <span className="text-[8px] tracking-[0.4em] uppercase text-muted-foreground/60">
            Scroll
          </span>
          <div className="w-px h-8 bg-primary/20" />
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        ref={contact.ref}
        className="flex flex-col items-center justify-center py-32 sm:py-40 px-6"
      >
        <div
          {...fade(contact.visible, 0)}
          className={`w-6 h-px bg-primary/25 mb-14 ${fade(contact.visible, 0).className}`}
          style={fade(contact.visible, 0).style}
        />

        <div className="flex flex-col items-center gap-6">
          <a
            href="mailto:hola@berrygraphics.com"
            {...fade(contact.visible, 150)}
            className={`text-[13px] font-normal text-foreground tracking-wide hover:text-primary transition-colors duration-500 ${fade(contact.visible, 150).className}`}
            style={fade(contact.visible, 150).style}
          >
            hola@berrygraphics.com
          </a>

          <a
            href="https://instagram.com/berrygraphics"
            target="_blank"
            rel="noopener noreferrer"
            {...fade(contact.visible, 300)}
            className={`text-[13px] font-normal text-foreground tracking-wide hover:text-primary transition-colors duration-500 ${fade(contact.visible, 300).className}`}
            style={fade(contact.visible, 300).style}
          >
            @berrygraphics
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-6 flex items-center justify-center">
        <span className="text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase">
          Berry Graphics® — {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
};

export default Index;
