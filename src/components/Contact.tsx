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
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold">Contacto</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Estamos aquí para{" "}
            <span className="text-primary">ayudarte</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas? Nos encantaría escucharte
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form className="space-y-6 p-8 rounded-2xl bg-card border border-border">
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
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
              >
                Enviar Mensaje
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>
              <p className="text-muted-foreground mb-8">
                Puedes contactarnos a través de cualquiera de estos medios. 
                Nos esforzamos por responder en menos de 24 horas.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{info.title}</div>
                      <div className="text-sm text-muted-foreground">{info.detail}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* FAQ Quick Links */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold mb-4">¿Necesitas ayuda rápida?</h3>
              <div className="space-y-3">
                <a href="#" className="block text-primary hover:underline">
                  → Preguntas frecuentes
                </a>
                <a href="#" className="block text-primary hover:underline">
                  → Centro de ayuda
                </a>
                <a href="#" className="block text-primary hover:underline">
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
