import { Users, Award, Globe, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "50K+", label: "Usuarios activos" },
  { icon: Award, value: "1000+", label: "Restaurantes socios" },
  { icon: Globe, value: "20+", label: "Ciudades" },
  { icon: Heart, value: "4.9/5", label: "Satisfacción" },
];

const AboutUs = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold">Sobre Nosotros</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Revolucionando el{" "}
              <span className="text-primary">delivery</span> en tu ciudad
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground">
              Desde 2020, hemos estado conectando a las personas con sus restaurantes favoritos. 
              Nuestra misión es hacer que cada comida sea una experiencia memorable, entregada 
              con velocidad y cuidado.
            </p>
            
            <p className="text-base sm:text-lg text-muted-foreground">
              Con tecnología de punta y un equipo apasionado, transformamos la manera en que 
              las personas ordenan comida, priorizando la calidad, velocidad y satisfacción del cliente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#join" className="text-primary font-semibold hover:underline">
                Únete a nuestro equipo →
              </a>
              <a href="#contact" className="text-primary font-semibold hover:underline">
                Contacta con nosotros →
              </a>
            </div>
          </div>
          
          {/* Right stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-glow"
              >
                <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mission & Values */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nuestra Misión</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Facilitar el acceso a comida deliciosa para todos, en cualquier momento y lugar.
            </p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nuestra Visión</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Ser la plataforma líder de delivery, reconocida por nuestra innovación y servicio excepcional.
            </p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Nuestros Valores</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Compromiso, rapidez, calidad y respeto por nuestros clientes, socios y repartidores.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
