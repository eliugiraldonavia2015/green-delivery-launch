import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";
import FloatingFood3D from "./FloatingFood3D";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold">🚀 La app de delivery más rápida</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Tu comida favorita en{" "}
              <span className="text-primary drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                minutos
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Descubre miles de restaurantes, realiza tu pedido en segundos y recibe tu comida caliente en tiempo récord.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all text-lg group">
                Descargar App
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-foreground text-lg">
                Ver restaurantes
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Usuarios activos</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Restaurantes</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Calificación</div>
              </div>
            </div>
          </div>
          
          {/* Right image + 3D element */}
          <div className="relative animate-fade-in space-y-8" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="App de delivery moderna" 
                className="relative rounded-3xl shadow-2xl animate-float"
              />
            </div>
            
            {/* 3D Element */}
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm">
              <FloatingFood3D />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
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
