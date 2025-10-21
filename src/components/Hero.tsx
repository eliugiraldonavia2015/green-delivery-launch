import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";
import FloatingFood3D from "./FloatingFood3D";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold text-sm sm:text-base">🚀 La app de delivery más rápida</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Tu comida favorita en{" "}
              <span className="text-primary drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                minutos
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg">
              Descubre miles de restaurantes, realiza tu pedido en segundos y recibe tu comida caliente en tiempo récord.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all text-base sm:text-lg group w-full sm:w-auto">
                Descargar App
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-foreground text-base sm:text-lg w-full sm:w-auto">
                Ver restaurantes
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">50K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Usuarios activos</div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-border" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">1000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Restaurantes</div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-border" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">4.9★</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Calificación</div>
              </div>
            </div>
          </div>
          
          {/* Right image + 3D element */}
          <div className="relative animate-fade-in space-y-4 sm:space-y-6 lg:space-y-8" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl sm:rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="App de delivery moderna" 
                className="relative rounded-2xl sm:rounded-3xl shadow-2xl animate-float w-full h-auto"
              />
            </div>
            
            {/* 3D Element */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="w-full h-[250px] sm:h-[300px] lg:h-[400px]">
                <FloatingFood3D />
              </div>
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-muted-foreground">
                Arrastra para rotar ↻
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
