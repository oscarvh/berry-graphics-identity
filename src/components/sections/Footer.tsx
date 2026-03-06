import berryLogo from "@/assets/berry-logo.webp";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5 text-[11px] text-muted-foreground tracking-wider">
      <div className="flex items-center gap-2">
        <img src={berryLogo} alt="Berry" className="w-5 h-5 object-contain" />
        <span className="font-semibold text-primary">Berry</span>
        <span className="tracking-[0.3em] uppercase">Graphics®</span>
      </div>
      <span className="text-center">Diseño en comunicación visual & Social media marketing</span>
      <span>© {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;
