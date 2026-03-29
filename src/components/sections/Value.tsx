import { useScrollReveal, reveal, stagger } from "@/hooks/useScrollReveal";

const values = [
  {
    number: "01",
    title: "Identidad que conecta",
    text: "Sistemas visuales coherentes que comunican la esencia de tu marca en cada punto de contacto.",
  },
  {
    number: "02",
    title: "Estrategia + Diseño",
    text: "Cada pieza tiene un propósito. Análisis estratégico con diseño de alto impacto para resultados reales.",
  },
  {
    number: "03",
    title: "Presencia digital",
    text: "Contenido visual que posiciona tu marca, genera engagement y construye comunidad.",
  },
];

const Value = () => {
  const section = useScrollReveal(50);

  return (
    <section
      id="valor"
      ref={section.ref}
      className="px-6 md:px-16 lg:px-24 py-28 md:py-40"
    >
      <div className={`max-w-7xl mx-auto ${reveal(section.visible)}`}>
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary">
                Servicios
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-light text-foreground leading-[1.1] tracking-[-0.02em]">
              Diseño con
              <span className="text-primary font-normal"> propósito</span>,
              <br />
              resultados con
              <span className="text-primary font-normal"> impacto</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[15px] font-normal text-muted-foreground leading-[1.85] max-w-md lg:ml-auto">
              No hacemos diseño decorativo. Creamos herramientas visuales
              estratégicas que impulsan el crecimiento de tu marca y conectan
              con tu audiencia ideal.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-0">
          {values.map((v, i) => (
            <div
              key={v.number}
              {...stagger(section.visible, i + 1)}
              className={`relative p-10 lg:p-14 border border-border -ml-px first:ml-0 -mt-px first:mt-0 md:mt-0 group hover:border-primary/30 transition-colors duration-500 ${stagger(section.visible, i + 1).className}`}
            >
              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700" />

              <span className="text-[40px] sm:text-[48px] font-light text-primary/10 leading-none group-hover:text-primary/20 transition-colors duration-500">
                {v.number}
              </span>
              <h3 className="mt-6 text-lg font-normal text-foreground leading-snug">
                {v.title}
              </h3>
              <p className="mt-4 text-[13px] font-normal text-muted-foreground leading-[1.85]">
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
