import berryLogo from "@/assets/berry-logo.webp";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={berryLogo} alt="Berry" className="w-6 h-6 object-contain" />
        <span className="text-[13px] font-semibold text-primary">Berry</span>
        <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground">
          Graphics®
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground/50 tracking-[0.2em]">
        © {new Date().getFullYear()} — Todos los derechos reservados
      </span>
    </div>
  </footer>
);

export default Footer;
