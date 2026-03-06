import { useState } from "react";
import { Mail, Instagram, Send } from "lucide-react";
import { useScrollReveal, reveal } from "@/hooks/useScrollReveal";

const Contact = () => {
  const ref = useScrollReveal(100);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    window.location.href = `mailto:hola@berrygraphics.com?subject=Consulta de ${encodeURIComponent(
      data.get("nombre") as string
    )}&body=${encodeURIComponent(
      `Nombre: ${data.get("nombre")}\nEmail: ${data.get("email")}\nEmpresa: ${data.get("empresa")}\n\nMensaje:\n${data.get("mensaje")}`
    )}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  const inputClass =
    "w-full bg-transparent border-b border-border py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-300";

  return (
    <section
      id="contacto"
      ref={ref.ref}
      className={`px-6 md:px-12 lg:px-20 py-28 md:py-36 ${reveal(ref.visible)}`}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 lg:gap-28">
        {/* Left */}
        <div>
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
            Contacto
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground leading-tight tracking-[-0.01em]">
            Tu próximo nivel
            <br />
            <span className="text-primary font-normal">comienza aquí</span>
          </h2>
          <p className="mt-7 text-[14px] font-light text-muted-foreground leading-[1.7] max-w-sm">
            Contanos sobre tu proyecto y te responderemos en menos de 24 hs
            con una propuesta a medida.
          </p>

          <div className="mt-12 space-y-5">
            <a
              href="mailto:hola@berrygraphics.com"
              className="flex items-center gap-3.5 text-[13px] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-4 h-4 text-primary/60" />
              hola@berrygraphics.com
            </a>
            <a
              href="https://instagram.com/berrygraphics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 text-[13px] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Instagram className="w-4 h-4 text-primary/60" />
              @berrygraphics
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-5">
            <input name="nombre" type="text" required placeholder="Nombre" className={inputClass} />
            <input name="empresa" type="text" placeholder="Empresa" className={inputClass} />
          </div>
          <input name="email" type="email" required placeholder="tu@email.com" className={inputClass} />
          <textarea
            name="mensaje"
            required
            rows={3}
            placeholder="¿Qué necesita tu marca?"
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            className="mt-4 self-start inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary group"
          >
            {formSent ? "¡Enviado!" : "Enviar consulta"}
            <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
