import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Explora",
    description: "Busca entre miles de restaurantes y menús disponibles en tu zona.",
  },
  {
    icon: ShoppingCart,
    number: "02",
    title: "Ordena",
    description: "Selecciona tus platillos favoritos y personaliza tu pedido fácilmente.",
  },
  {
    icon: Truck,
    number: "03",
    title: "Disfruta",
    description: "Rastrea tu pedido en tiempo real y recíbelo en tu puerta.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Así de <span className="text-primary">simple</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            En solo 3 pasos, tu comida está en camino
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-center">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 border-2 border-primary mb-4 sm:mb-6 relative z-10">
                  <span className="text-xl sm:text-2xl font-bold text-primary">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="mb-4 sm:mb-6 inline-flex p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border shadow-lg">
                  <step.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground px-4">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
