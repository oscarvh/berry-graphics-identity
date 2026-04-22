

const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src="/Berrylogo.svg" alt="Berry Graphic" className="w-6 h-6 object-contain" />
        <span className="text-[13px] font-semibold text-primary">Berry</span>
        <span className="text-[8px] font-normal tracking-[0.45em] uppercase text-muted-foreground">
          Graphic®
        </span>
        <span className="text-[10px] text-muted-foreground/50 tracking-[0.2em] ml-2 hidden sm:inline-block">
          © 2024 - {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-[10px] text-muted-foreground/50 tracking-[0.2em] sm:hidden">
          © 2024 - {new Date().getFullYear()}
        </span>
        <a href="https://alfaweb.com.ar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-muted-foreground/80 hover:text-primary transition-colors tracking-[0.1em]">
          <img src="/alfaweb.ico" alt="Alfa Web" className="w-5 h-5 object-contain" />
          <span>Creado por Alfa Web Diseño</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
