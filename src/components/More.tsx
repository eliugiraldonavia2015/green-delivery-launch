import { Button } from "@/components/ui/button";
import { FileText, HelpCircle, Shield, Gift, BookOpen, TrendingUp } from "lucide-react";

const resources = [
  {
    icon: HelpCircle,
    title: "Centro de Ayuda",
    description: "Encuentra respuestas a las preguntas más frecuentes",
    link: "#",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Consejos, recetas y noticias del mundo del delivery",
    link: "#",
  },
  {
    icon: Gift,
    title: "Promociones",
    description: "Descubre las últimas ofertas y descuentos especiales",
    link: "#",
  },
  {
    icon: TrendingUp,
    title: "Para Negocios",
    description: "Soluciones de delivery empresarial",
    link: "#",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Información sobre nuestras políticas de seguridad",
    link: "#",
  },
  {
    icon: FileText,
    title: "Legal",
    description: "Términos, condiciones y políticas de privacidad",
    link: "#",
  },
];

const More = () => {
  return (
    <section id="more" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm sm:text-base">Más Información</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Recursos y{" "}
            <span className="text-primary">más</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Todo lo que necesitas saber sobre DeliveryApp
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="mb-3 sm:mb-4 inline-flex p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <resource.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
              <span className="text-primary text-sm font-semibold group-hover:underline">
                Saber más →
              </span>
            </a>
          ))}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 via-card to-transparent border border-primary/20 text-center animate-fade-in">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Mantente actualizado</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
            Suscríbete a nuestro newsletter y recibe las últimas noticias, promociones y consejos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
            />
            <Button className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow whitespace-nowrap">
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default More;
