import { useEffect, useRef, useState } from "react";

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const Index = () => {
  const hero = useScrollReveal();
  const contact = useScrollReveal();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32">
      {/* Hero — Logo + Tagline */}
      <section
        ref={hero.ref}
        className={`flex flex-col items-center text-center transition-all duration-1000 ease-out ${
          hero.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-light tracking-tight text-primary leading-none">
          Berry
        </h1>
        <span className="mt-2 text-sm md:text-base font-normal tracking-[0.35em] uppercase text-muted-foreground">
          Graphics
        </span>
        <p className="mt-10 max-w-md text-base md:text-lg font-light text-muted-foreground leading-relaxed">
          Diseño en comunicación visual
          <br />y social media marketing
        </p>
      </section>

      {/* Contact */}
      <section
        ref={contact.ref}
        className={`mt-24 md:mt-32 flex flex-col items-center gap-4 text-center transition-all duration-1000 ease-out delay-200 ${
          contact.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <a
          href="mailto:hola@berrygraphics.com"
          className="text-base font-semibold text-foreground transition-colors duration-300 hover:text-secondary"
        >
          hola@berrygraphics.com
        </a>
        <a
          href="https://instagram.com/berrygraphics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-foreground transition-colors duration-300 hover:text-secondary"
        >
          @berrygraphics
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-24 pb-8 text-center">
        <p className="text-xs font-normal text-muted-foreground tracking-wider">
          Berry Graphics® — 2026
        </p>
      </footer>
    </main>
  );
};

export default Index;
