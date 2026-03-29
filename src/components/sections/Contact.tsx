import { useState } from "react";
import { Send, Instagram, Mail, ArrowRight } from "lucide-react";
import { useScrollReveal, reveal, stagger } from "@/hooks/useScrollReveal";

const Contact = () => {
  const section = useScrollReveal(50);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    window.location.href = `mailto:hola@berrygraphics.com?subject=Consulta de ${encodeURIComponent(
      data.get("nombre") as string
    )}&body=${encodeURIComponent(
      `Nombre: ${data.get("nombre")}\nEmail: ${data.get("email")}\n\nMensaje:\n${data.get("mensaje")}`
    )}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  const inputClass =
    "w-full bg-transparent border-b border-border py-4 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-500";

  return (
    <section
      id="contacto"
      ref={section.ref}
      className="px-6 md:px-16 lg:px-24 py-28 md:py-40"
    >
      <div className={`max-w-7xl mx-auto ${reveal(section.visible)}`}>
        {/* CTA Banner */}
        <div className="relative border border-border p-12 sm:p-16 lg:p-20 mb-28 overflow-hidden group hover:border-primary/20 transition-colors duration-500">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-primary/10 pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-light text-foreground leading-[1.15] tracking-[-0.01em]">
                ¿Listo para llevar tu marca
                <br />
                <span className="text-primary font-normal">al siguiente nivel</span>?
              </h3>
              <p className="mt-5 text-[14px] text-muted-foreground leading-[1.8] max-w-md">
                Contanos tu idea y te respondemos en menos de 24 horas
                con una propuesta personalizada.
              </p>
            </div>
            <a
              href="#contacto-form"
              className="shrink-0 group/btn inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary"
            >
              Escribinos ahora
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Form grid */}
        <div id="contacto-form" className="grid lg:grid-cols-[1fr,1.2fr] gap-20 lg:gap-32">
          {/* Left info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-primary">
                Contacto
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground leading-[1.1] tracking-[-0.02em]">
              Empecemos a
              <br />
              <span className="text-primary font-normal">trabajar juntos</span>
            </h2>

            <p className="mt-7 text-[14px] font-normal text-muted-foreground leading-[1.85] max-w-sm">
              Completá el formulario y te contactamos con una propuesta
              a medida para tu proyecto. Sin compromiso.
            </p>

            {/* Contact links */}
            <div className="mt-14 space-y-6">
              <a
                href="mailto:hola@berrygraphics.com"
                className="group flex items-center gap-4 text-[13px] text-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary/60" />
                </div>
                hola@berrygraphics.com
              </a>
              <a
                href="https://instagram.com/berrygraphics"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[13px] text-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <Instagram className="w-4 h-4 text-primary/60" />
                </div>
                @berrygraphics
              </a>
            </div>
          </div>

          {/* Right form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    Nombre *
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="Contanos sobre tu proyecto, qué necesitás y cuáles son tus objetivos..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-2 self-start inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-secondary group"
              >
                {formSent ? "¡Enviado!" : "Enviar mensaje"}
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
