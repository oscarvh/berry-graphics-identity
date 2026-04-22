import { ArrowRight } from "lucide-react";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => (
  <nav
    className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500 ${
      scrolled
        ? "py-3 bg-background/95 backdrop-blur-md border-b border-border/50"
        : "py-5 bg-transparent"
    }`}
  >
    <a href="#" className="flex items-center gap-3">
      <img src="/Berrylogo.svg" alt="Berry Graphic" className="w-7 h-7 object-contain" />
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-semibold text-primary tracking-tight leading-none">Berry</span>
        <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-muted-foreground leading-none">
          Graphic
        </span>
      </div>
    </a>
    <a
      href="#contacto"
      className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
    >
      Contactar
      <ArrowRight className="w-3 h-3" />
    </a>
  </nav>
);

export default Navbar;
