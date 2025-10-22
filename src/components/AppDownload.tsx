import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";

const AppDownload = () => {
  return (
    <section id="download" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="space-y-4 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-accent font-semibold text-sm sm:text-base">📱 Descarga Gratis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Descarga la app y empieza a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                ordenar ahora
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Disponible en iOS y Android. Descárgala gratis y disfruta de ofertas exclusivas en tu primer pedido.
            </p>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background text-base sm:text-lg w-full sm:w-auto group transition-all hover:scale-105"
            >
              <Apple className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              <div className="text-left">
                <div className="text-xs opacity-80">Descarga en</div>
                <div className="font-semibold">App Store</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg w-full sm:w-auto group transition-all hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 sm:h-6 sm:w-6 fill-current" />
              <div className="text-left">
                <div className="text-xs opacity-80">Disponible en</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </Button>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm sm:text-base text-muted-foreground">Gratis</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-accent">4.9★</div>
              <div className="text-sm sm:text-base text-muted-foreground">Calificación</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-primary">1M+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Descargas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
