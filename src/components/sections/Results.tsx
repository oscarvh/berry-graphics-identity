import { useScrollReveal, reveal, stagger } from "@/hooks/useScrollReveal";

const pillars = [
  { num: "01", text: "Estrategia antes del diseño" },
  { num: "02", text: "Identidad visual coherente" },
  { num: "03", text: "Contenido que convierte" },
  { num: "04", text: "Soporte continuo" },
];

const Results = () => {
  const ref = useScrollReveal(100);

  return (
    <section
      ref={ref.ref}
      className={`px-6 md:px-12 lg:px-20 py-28 md:py-36 border-y border-border ${reveal(ref.visible)}`}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
            Diferencial
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-light text-foreground leading-tight tracking-[-0.01em]">
            No solo diseñamos.
            <br />
            <span className="text-primary font-normal">Generamos resultados.</span>
          </h2>
          <p className="mt-7 text-[15px] font-light text-muted-foreground leading-[1.7]">
            Cada pieza visual que creamos tiene un objetivo estratégico:
            posicionar tu marca, conectar con tu audiencia y convertir
            atención en oportunidades de negocio.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {pillars.map((item, i) => (
            <div
              key={item.num}
              {...stagger(ref.visible, i)}
              className={`p-7 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 ${stagger(ref.visible, i).className}`}
            >
              <span className="block text-2xl font-light text-primary/70 mb-4 tracking-tight">
                {item.num}
              </span>
              <p className="text-[13px] font-normal text-muted-foreground leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
