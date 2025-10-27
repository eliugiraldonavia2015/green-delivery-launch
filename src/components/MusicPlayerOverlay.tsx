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
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background to-card rounded-t-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Music className="w-6 h-6 text-primary" />
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Music Info */}
            <div className="p-8 text-center">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-1"
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <Music className="w-20 h-20 text-primary" />
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-2">{musicName}</h3>
              <p className="text-muted-foreground mb-6">{artist}</p>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Heart 
                    className={`w-6 h-6 ${isLiked ? "fill-accent text-accent" : "text-muted-foreground"}`} 
                  />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-primary-foreground" />
                  ) : (
                    <Play className="w-10 h-10 text-primary-foreground ml-1" />
                  )}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Share2 className="w-6 h-6 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Marketing Section */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2">🎵 Música para tu negocio</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Añade ambiente único a tu restaurante con nuestro catálogo de música
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Explorar Catálogo
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
