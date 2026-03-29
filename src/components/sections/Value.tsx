import { useScrollReveal, reveal, stagger } from "@/hooks/useScrollReveal";

const values = [
  {
    number: "01",
    title: "Identidad que conecta",
    text: "Creamos sistemas visuales coherentes que comunican la esencia de tu marca en cada punto de contacto.",
  },
  {
    number: "02",
    title: "Estrategia + Diseño",
    text: "Cada pieza tiene un propósito. Combinamos análisis estratégico con diseño de alto impacto para resultados reales.",
  },
  {
    number: "03",
    title: "Presencia digital sólida",
    text: "Gestionamos redes sociales con contenido visual que posiciona tu marca y genera conversaciones.",
  },
];

const Value = () => {
  const section = useScrollReveal(100);

  return (
    <section className={`px-6 md:px-12 lg:px-20 py-28 md:py-36 ${reveal(section.visible)}`} ref={section.ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-20">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
            Por qué elegirnos
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground leading-tight tracking-[-0.01em]">
            Diseño con
            <span className="text-primary font-normal"> propósito</span>
          </h2>
          <p className="mt-5 text-[14px] font-normal text-muted-foreground leading-[1.8] max-w-md">
            No hacemos diseño decorativo. Creamos herramientas visuales
            que impulsan el crecimiento de tu marca.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {values.map((v, i) => (
            <div
              key={v.number}
              {...stagger(section.visible, i + 1)}
              className={`bg-background p-10 lg:p-12 group hover:bg-primary/[0.02] transition-colors duration-500 ${stagger(section.visible, i + 1).className}`}
            >
              <span className="text-[11px] font-semibold tracking-[0.2em] text-primary/40 group-hover:text-primary transition-colors duration-500">
                {v.number}
              </span>
              <h3 className="mt-6 text-lg font-normal text-foreground leading-snug">
                {v.title}
              </h3>
              <p className="mt-4 text-[13px] font-normal text-muted-foreground leading-[1.8]">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
