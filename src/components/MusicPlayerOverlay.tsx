import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Heart, Share2, Music } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MusicPlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  musicName: string;
  artist: string;
}

const MusicPlayerOverlay = ({ isOpen, onClose, musicName, artist }: MusicPlayerOverlayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Overlay */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl border-t-2 border-primary h-[70vh]"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold">Reproductor</span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Music Info */}
            <div className="p-6 text-center overflow-y-auto" style={{ maxHeight: 'calc(70vh - 120px)' }}>
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                className="w-40 h-40 mx-auto mb-6 rounded-full bg-card border-4 border-primary/30 p-2 shadow-glow"
              >
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5" />
                  <Music className="w-24 h-24 text-primary relative z-10" />
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-2">{musicName}</h3>
              <p className="text-base text-muted-foreground mb-6">{artist}</p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: isPlaying ? "100%" : "0%" }}
                    transition={{ duration: 180, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0:00</span>
                  <span>3:00</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-14 h-14 rounded-full bg-card border-2 border-border flex items-center justify-center hover:border-accent transition-colors"
                >
                  <Heart 
                    className={`w-6 h-6 ${isLiked ? "fill-accent text-accent" : "text-muted-foreground"}`} 
                  />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-primary-foreground" />
                  ) : (
                    <Play className="w-12 h-12 text-primary-foreground ml-1" />
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-card border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Share2 className="w-6 h-6 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Marketing Section */}
              <div className="bg-card rounded-2xl p-6 border-2 border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Music className="w-5 h-5 text-primary" />
                  <p className="font-bold text-primary">Música para tu negocio</p>
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Crea el ambiente perfecto para tu restaurante con nuestra biblioteca musical premium
                </p>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl">
                  Explorar Catálogo Musical
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayerOverlay;
