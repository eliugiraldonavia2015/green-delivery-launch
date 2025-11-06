import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, Truck, Star, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: ShoppingBag,
    title: "Descubre restaurantes increíbles",
    description: "Explora miles de opciones cerca de ti. Desde tacos hasta sushi, encuentra tu comida favorita en segundos.",
    gradient: "from-primary to-primary-glow",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
  },
  {
    icon: Sparkles,
    title: "Videos que inspiran",
    description: "Mira videos cortos de platillos deliciosos. Desliza, explora y decide qué pedir hoy.",
    gradient: "from-accent to-orange-500",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop"
  },
  {
    icon: Truck,
    title: "Entrega rápida y segura",
    description: "Rastreo en tiempo real de tu pedido. Sigue a tu repartidor desde el restaurante hasta tu puerta.",
    gradient: "from-primary to-emerald-500",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop"
  },
  {
    icon: Star,
    title: "Experiencia única",
    description: "Chatea con restaurantes, guarda tus favoritos y disfruta de ofertas exclusivas. Todo en un solo lugar.",
    gradient: "from-accent to-yellow-500",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
  }
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-background to-card overflow-hidden">
      {/* Skip button */}
      {!isLastSlide && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          Saltar
        </button>
      )}

      {/* Content container */}
      <div className="h-full flex flex-col">
        {/* Image section with overlay */}
        <div className="relative h-[55%] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${currentSlideData.gradient} opacity-40`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating icon */}
          <motion.div
            key={`icon-${currentSlide}`}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center shadow-glow`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Text content section */}
        <div className="flex-1 px-6 pt-12 pb-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col items-center text-center"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {currentSlideData.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {currentSlideData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group relative"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-gradient-to-r from-primary to-primary-glow"
                      : "w-2 bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Action button */}
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
          >
            {isLastSlide ? "Comenzar" : "Siguiente"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
