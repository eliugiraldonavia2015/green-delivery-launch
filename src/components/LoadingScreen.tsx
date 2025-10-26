import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onReady?: () => void;
}

const LoadingScreen = ({ onReady }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Inicializando módulos");

  useEffect(() => {
    const stages = [
      { percent: 20, status: "Inicializando módulos", delay: 200 },
      { percent: 40, status: "Cargando recomendaciones", delay: 300 },
      { percent: 60, status: "Preparando experiencia", delay: 300 },
      { percent: 80, status: "Activando medidas de seguridad", delay: 300 },
      { percent: 100, status: "¡Listo!", delay: 200 }
    ];

    let currentStage = 0;

    const progressTimer = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        setProgress(stage.percent);
        setStatus(stage.status);
        currentStage++;
        setTimeout(progressTimer, stage.delay);
      } else {
        setTimeout(() => onReady?.(), 450);
      }
    };

    progressTimer();
  }, [onReady]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative">
        {/* Animated geometric rider */}
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-32 h-32 relative">
            {/* Outer ring with gradient */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent via-primary to-accent opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner core with pulse */}
            <motion.div
              className="absolute inset-8 rounded-full bg-gradient-to-br from-primary to-accent"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(142 76% 45% / 0.3)",
                  "0 0 60px hsl(142 76% 45% / 0.6)",
                  "0 0 20px hsl(142 76% 45% / 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Particles */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0"
                }}
                animate={{
                  rotate: angle,
                  x: [0, 50, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress and status */}
      <div className="mt-12 space-y-4 text-center w-80">
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-white"
        >
          {status}
        </motion.p>

        {/* Progress bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <p className="text-sm text-muted-foreground">{progress}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
