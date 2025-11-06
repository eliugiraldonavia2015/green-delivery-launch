import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag, Truck, Star, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: ShoppingBag,
    title: "Descubre restaurantes increíbles",
    description: "Explora miles de opciones cerca de ti. Desde tacos hasta sushi, encuentra tu comida favorita.",
    gradient: "from-primary to-primary-glow",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
  },
  {
    icon: Sparkles,
    title: "Videos que inspiran",
    description: "Mira videos cortos de platillos deliciosos. Desliza, explora y decide qué pedir.",
    gradient: "from-accent to-orange-500",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop"
  },
  {
    icon: Truck,
    title: "Entrega rápida y segura",
    description: "Rastreo en tiempo real. Sigue a tu repartidor desde el restaurante hasta tu puerta.",
    gradient: "from-primary to-emerald-500",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop"
  },
  {
    icon: Star,
    title: "Experiencia única",
    description: "Chatea con restaurantes, guarda favoritos y disfruta de ofertas exclusivas.",
    gradient: "from-accent to-yellow-500",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
  }
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setPage([currentSlide + 1, 1]);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setPage([currentSlide - 1, -1]);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && currentSlide > 0) {
      handlePrevious();
    } else if (info.offset.x < -swipeThreshold && currentSlide < slides.length - 1) {
      handleNext();
    }
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  const swipeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      <div className="h-full w-full max-w-lg mx-auto flex flex-col safe-area-inset">
        {/* Skip button */}
        {!isLastSlide && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleSkip}
            className="absolute top-4 right-4 z-20 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            Saltar
          </motion.button>
        )}

        {/* Swipeable content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex flex-col"
            >
              {/* Image section */}
              <div className="relative h-[60%] w-full">
                <div className="absolute inset-0 rounded-b-[3rem] overflow-hidden">
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-30`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Floating icon */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center shadow-glow-lg`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                </motion.div>
              </div>

              {/* Text content */}
              <div className="flex-1 px-8 pt-16 pb-6 flex flex-col items-center text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold mb-4 leading-tight"
                >
                  {currentSlideData.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-sm"
                >
                  {currentSlideData.description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section */}
        <div className="px-6 pb-8 space-y-6">
          {/* Pagination dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setPage([index, index > currentSlide ? 1 : -1]);
                }}
                className="relative"
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-gradient-to-r from-primary to-primary-glow"
                      : "w-2 bg-muted hover:bg-muted-foreground/50"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300 rounded-2xl"
            >
              {isLastSlide ? "Comenzar" : "Siguiente"}
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
