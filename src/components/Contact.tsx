import { ContactForm } from "./ContactForm";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section aria-labelledby="contacto-title" id="contacto">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title="¿Tienes una idea? Hablemos."
            description="Cuéntanos qué quieres construir y para quién. Te respondemos para agendar una conversación sin compromiso y entender juntos tu proyecto."
          />
          <ul className="mt-8 space-y-3 text-muted">
            {[
              "Sin costo por la primera conversación",
              "Te ayudamos a definir el alcance",
              "Propuesta clara de tiempos y entregables",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
