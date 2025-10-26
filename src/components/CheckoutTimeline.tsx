import { useState, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChefHat, Bell, Bike, Navigation, MapPin, 
  Home as HomeIcon, Star, AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";

type OrderState =
  | "PREPARING"
  | "READY_FOR_PICKUP"
  | "DELIVERY_PICKED"
  | "DELIVERY_ON_ROUTE"
  | "DELIVERY_NEAR"
  | "DELIVERY_AT_DOOR"
  | "DELIVERED_REVIEW";

interface TimelineState {
  state: OrderState;
  label: string;
  icon: React.ReactNode;
  duration: number;
  description: string;
}

const timelineStates: TimelineState[] = [
  {
    state: "PREPARING",
    label: "Preparando comida",
    icon: <ChefHat className="w-6 h-6" />,
    duration: 10000,
    description: "El restaurante está preparando tu pedido con mucho cariño"
  },
  {
    state: "READY_FOR_PICKUP",
    label: "Comida lista para retirar",
    icon: <Bell className="w-6 h-6" />,
    duration: 10000,
    description: "Tu comida está lista y esperando al delivery"
  },
  {
    state: "DELIVERY_PICKED",
    label: "Comida retirada por delivery",
    icon: <Bike className="w-6 h-6" />,
    duration: 10000,
    description: "El repartidor ha recogido tu pedido"
  },
  {
    state: "DELIVERY_ON_ROUTE",
    label: "Delivery en camino",
    icon: <Navigation className="w-6 h-6" />,
    duration: 10000,
    description: "Tu pedido está en camino hacia tu ubicación"
  },
  {
    state: "DELIVERY_NEAR",
    label: "Delivery cerca",
    icon: <MapPin className="w-6 h-6" />,
    duration: 10000,
    description: "¡El repartidor está muy cerca!"
  },
  {
    state: "DELIVERY_AT_DOOR",
    label: "Delivery en puerta",
    icon: <HomeIcon className="w-6 h-6" />,
    duration: 10000,
    description: "Tu pedido ha llegado. ¡Disfruta tu comida!"
  },
  {
    state: "DELIVERED_REVIEW",
    label: "Comida entregada — Califica tu servicio",
    icon: <Star className="w-6 h-6" />,
    duration: -1,
    description: "¿Cómo estuvo todo? Tu opinión es importante"
  }
];

interface CheckoutTimelineProps {
  orderId?: string;
  onComplete?: () => void;
  demoMode?: boolean;
}

const CheckoutTimeline = ({ orderId, onComplete, demoMode = true }: CheckoutTimelineProps) => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [showReportIssue, setShowReportIssue] = useState(false);

  const currentState = timelineStates[currentStateIndex];

  // Progress and state advancement
  useEffect(() => {
    if (currentState.duration === -1) return; // Review state doesn't auto-advance

    const progressInterval = 100; // Update every 100ms
    const progressIncrement = (progressInterval / currentState.duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Advance to next state
          setTimeout(() => {
            if (currentStateIndex < timelineStates.length - 1) {
              setCurrentStateIndex((prev) => prev + 1);
              setProgress(0);
            }
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, progressInterval);

    return () => clearInterval(timer);
  }, [currentStateIndex, currentState.duration]);

  const handleSubmitReview = () => {
    if (rating > 0) {
      onComplete?.();
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-background flex flex-col">
      {/* Header with progress */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Orden #{orderId || "12345"}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Estado {currentStateIndex + 1} de {timelineStates.length}
            </p>
          </div>
          <motion.button
            onClick={() => setShowReportIssue(true)}
            className="px-4 py-2 rounded-full bg-muted hover:bg-destructive/20 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Reportar</span>
          </motion.button>
        </div>

        {/* Overall progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStateIndex + progress / 100) / timelineStates.length) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Current State Animation */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState.state}
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon with animation based on state */}
            <motion.div
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white relative"
              animate={
                currentState.state === "PREPARING"
                  ? { rotate: [0, 10, -10, 0] }
                  : currentState.state === "DELIVERY_ON_ROUTE"
                  ? { x: [-10, 10, -10, 10, 0] }
                  : currentState.state === "DELIVERY_AT_DOOR"
                  ? { scale: [1, 1.1, 1, 1.1, 1] }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: currentState.duration !== -1 ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {currentState.icon}
              
              {/* Pulse effect for certain states */}
              {(currentState.state === "DELIVERY_NEAR" || currentState.state === "DELIVERY_AT_DOOR") && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {currentState.label}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {currentState.description}
              </p>
            </div>

            {/* Progress for current state */}
            {currentState.duration !== -1 && (
              <div className="w-full max-w-md mx-auto">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Tiempo estimado: {Math.ceil((currentState.duration * (100 - progress)) / 100000)} segundos
                </p>
              </div>
            )}

            {/* Rating for review state */}
            {currentState.state === "DELIVERED_REVIEW" && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setRating(star)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= rating
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                <Button
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                  size="lg"
                  className="w-full max-w-xs mx-auto h-14 rounded-2xl bg-gradient-to-r from-primary to-accent"
                >
                  Enviar Calificación
                </Button>

                {/* Confetti animation when rated */}
                {rating > 0 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1 }}
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{
                          left: `${50 + Math.random() * 20 - 10}%`,
                          top: "40%"
                        }}
                        animate={{
                          y: [0, -200],
                          x: [0, (Math.random() - 0.5) * 200],
                          opacity: [1, 0],
                          scale: [1, 0]
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.05,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline indicator at bottom */}
      <div className="p-6 border-t border-border">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {timelineStates.map((state, index) => (
            <div key={state.state} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  index < currentStateIndex
                    ? "bg-primary text-primary-foreground"
                    : index === currentStateIndex
                    ? "bg-gradient-to-br from-primary to-accent text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {React.cloneElement(state.icon as React.ReactElement, {
                  className: "w-5 h-5"
                })}
              </div>
              {index < timelineStates.length - 1 && (
                <div
                  className={`h-1 w-12 ${
                    index < currentStateIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {showReportIssue && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReportIssue(false)}
          >
            <motion.div
              className="bg-card rounded-3xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground mb-4">Reportar Problema</h3>
              <p className="text-muted-foreground mb-4">
                ¿Tienes algún problema con tu pedido? Cuéntanos qué sucedió.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Pedido incorrecto
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Demora excesiva
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Calidad del producto
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Otro problema
                </Button>
              </div>
              <Button
                onClick={() => setShowReportIssue(false)}
                variant="ghost"
                className="w-full mt-4"
              >
                Cancelar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutTimeline;
