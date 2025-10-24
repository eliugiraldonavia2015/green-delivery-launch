import { Flame } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative">
        {/* Animated flame icon with glow */}
        <div className="relative animate-pulse">
          <div className="absolute inset-0 blur-xl opacity-50">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary" />
          </div>
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center animate-glow">
            <Flame className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 space-y-2 text-center">
        <p className="text-xl font-semibold text-white animate-pulse">
          Cargando...
        </p>
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
