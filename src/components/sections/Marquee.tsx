const items = [
  "Branding",
  "Social Media",
  "Identidad Visual",
  "Comunicación",
  "Estrategia",
  "Diseño Editorial",
  "Marketing Digital",
  "Contenido Visual",
];

const Marquee = () => (
  <div className="border-y border-border py-5 overflow-hidden bg-background">
    <div className="animate-marquee flex whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center gap-8 mx-8">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60">
            {item}
          </span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
