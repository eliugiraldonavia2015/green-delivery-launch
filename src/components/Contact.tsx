import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "hola@deliveryapp.com",
    link: "mailto:hola@deliveryapp.com",
  },
  {
    icon: Phone,
    title: "Teléfono",
    detail: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Oficina",
    detail: "Av. Innovación 123, CDMX",
    link: "#",
  },
  {
    icon: Clock,
    title: "Horario",
    detail: "Lun - Vie: 9:00 - 18:00",
    link: "#",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold">Contacto</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Estamos aquí para{" "}
            <span className="text-primary">ayudarte</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            ¿Tienes preguntas? Nos encantaría escucharte
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form className="space-y-4 sm:space-y-6 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Asunto
                </label>
                <Input
                  id="subject"
                  placeholder="¿En qué podemos ayudarte?"
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:scale-105"
              >
                Enviar Mensaje
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Información de Contacto</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Puedes contactarnos a través de cualquiera de estos medios. 
                Nos esforzamos por responder en menos de 24 horas.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-colors group"
                  >
                    <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <info.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-sm sm:text-base">{info.title}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground break-all">{info.detail}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* FAQ Quick Links */}
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">¿Necesitas ayuda rápida?</h3>
              <div className="space-y-2 sm:space-y-3">
                <a href="#" className="block text-sm sm:text-base text-primary hover:underline">
                  → Preguntas frecuentes
                </a>
                <a href="#" className="block text-sm sm:text-base text-primary hover:underline">
                  → Centro de ayuda
                </a>
                <a href="#" className="block text-sm sm:text-base text-primary hover:underline">
                  → Estado del servicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
