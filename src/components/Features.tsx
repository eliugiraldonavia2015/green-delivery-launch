import { Zap, Shield, Clock, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Entrega Ultrarrápida",
    description: "Recibe tu pedido en 30 minutos o menos. Garantizado.",
  },
  {
    icon: Shield,
    title: "Pago Seguro",
    description: "Protección total en cada transacción con encriptación de nivel bancario.",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Pide cuando quieras. Estamos abiertos todos los días, todo el día.",
  },
  {
    icon: Smartphone,
    title: "App Intuitiva",
    description: "Interfaz simple y rápida. Haz tu pedido en menos de 60 segundos.",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La mejor experiencia de delivery, respaldada por tecnología de punta
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
