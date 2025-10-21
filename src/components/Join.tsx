import { Button } from "@/components/ui/button";
import { Bike, Store, Users } from "lucide-react";

const opportunities = [
  {
    icon: Bike,
    title: "Repartidores",
    description: "Trabaja con horarios flexibles y gana dinero extra mientras recorres la ciudad.",
    benefits: ["Horarios flexibles", "Buenos ingresos", "App fácil de usar"],
  },
  {
    icon: Store,
    title: "Restaurantes",
    description: "Expande tu negocio y llega a más clientes con nuestra plataforma.",
    benefits: ["Más visibilidad", "Sin costos iniciales", "Soporte dedicado"],
  },
  {
    icon: Users,
    title: "Equipo Corporativo",
    description: "Únete a un equipo innovador y ayuda a transformar la industria del delivery.",
    benefits: ["Ambiente dinámico", "Crecimiento profesional", "Beneficios competitivos"],
  },
];

const Join = () => {
  return (
    <section id="join" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
      
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold">Únete a Nosotros</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Forma parte de la{" "}
            <span className="text-primary">revolución</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos buscando personas apasionadas que quieran crecer con nosotros
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <opportunity.icon className="h-10 w-10 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{opportunity.title}</h3>
              <p className="text-muted-foreground mb-6">{opportunity.description}</p>
              
              <ul className="space-y-2 mb-6">
                {opportunity.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10 group-hover:border-primary">
                Aplicar ahora
              </Button>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-transparent border border-primary/20 animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">¿Listo para dar el siguiente paso?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Envíanos tu CV y cuéntanos por qué quieres formar parte de nuestro equipo
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow hover:shadow-glow-lg">
            Enviar Aplicación
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Join;
