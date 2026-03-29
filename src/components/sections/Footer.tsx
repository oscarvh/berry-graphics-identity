import berryLogo from "@/assets/berry-logo.webp";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-2.5">
        <img src={berryLogo} alt="Berry" className="w-5 h-5 object-contain" />
        <span className="text-[12px] font-semibold text-primary tracking-tight">Berry</span>
        <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-muted-foreground">
          Graphics®
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground/60 tracking-[0.15em]">
        © {new Date().getFullYear()} — Todos los derechos reservados
      </span>
    </div>
  </footer>
);

export default Footer;
