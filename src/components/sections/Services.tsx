import { Eye, Zap, TrendingUp } from "lucide-react";
import { useScrollReveal, reveal, stagger } from "@/hooks/useScrollReveal";

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

const Services = () => {
  const ref = useScrollReveal(100);

  return (
    <section
      id="servicios"
      ref={ref.ref}
      className={`px-6 md:px-12 lg:px-20 py-28 md:py-36 ${reveal(ref.visible)}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-lg mb-20">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
            Servicios
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground leading-tight tracking-[-0.01em]">
            Todo lo que tu marca
            <br />
            <span className="text-primary font-normal">necesita para crecer</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              {...stagger(ref.visible, i)}
              className={`bg-background p-10 lg:p-12 group hover:bg-muted/20 transition-colors duration-500 ${stagger(ref.visible, i).className}`}
            >
              <svc.icon
                className="w-5 h-5 text-primary mb-8 transition-transform duration-500 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-semibold tracking-wide text-foreground mb-4">
                {svc.title}
              </h3>
              <p className="text-[13px] font-light text-muted-foreground leading-relaxed mb-8">
                {svc.desc}
              </p>
              <ul className="space-y-2.5">
                {svc.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[12px] tracking-wide text-muted-foreground"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
