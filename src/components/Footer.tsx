import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">DeliveryApp</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Tu comida favorita, entregada con velocidad y cuidado.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">Nosotros</a></li>
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">Carreras</a></li>
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Soporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">Términos</a></li>
              <li><a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">Privacidad</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-border text-center text-muted-foreground">
          <p className="text-sm sm:text-base">&copy; 2025 DeliveryApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
