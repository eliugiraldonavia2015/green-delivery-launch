import { Button } from "@/components/ui/button";
import { Bike, Store, User } from "lucide-react";

const Join = () => {
  const roles = [
    {
      title: "Cliente",
      description: "Disfruta de tu comida favorita en minutos",
      icon: User,
      features: ["Miles de restaurantes", "Entregas rápidas", "Ofertas exclusivas"]
    },
    {
      title: "Repartidor",
      description: "Gana dinero con horarios flexibles",
      icon: Bike,
      features: ["Horarios flexibles", "Ganancias inmediatas", "Seguro incluido"]
    },
    {
      title: "Restaurante",
      description: "Aumenta tus ventas sin inversión",
      icon: Store,
      features: ["Sin costo inicial", "Miles de clientes", "Soporte 24/7"]
    }
  ];

  return (
    <section id="join" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
      
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm sm:text-base">💼 Únete a Nosotros</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Forma parte del{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">equipo</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Únete como cliente, repartidor o restaurante y crece con nosotros
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {roles.map((role, index) => {
            const isClient = role.title === "Cliente";
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border transition-all hover:scale-105 animate-fade-in ${
                  isClient 
                    ? 'border-accent/40 hover:border-accent hover:shadow-[0_0_40px_hsl(25_95%_53%/0.3)]' 
                    : 'border-primary/20 hover:border-primary/40 hover:shadow-glow'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-6 inline-flex p-4 rounded-xl transition-colors ${
                  isClient 
                    ? 'bg-accent/10 group-hover:bg-accent/20' 
                    : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  <Icon className={`h-10 w-10 ${isClient ? 'text-accent' : 'text-primary'}`} />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">{role.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        isClient ? 'bg-accent' : 'bg-primary'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className={`w-full ${
                  isClient 
                    ? 'bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_hsl(25_95%_53%/0.2)] hover:shadow-[0_0_40px_hsl(25_95%_53%/0.3)]' 
                    : 'bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow hover:shadow-glow-lg'
                } transition-all`}>
                  Comenzar ahora
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Join;
