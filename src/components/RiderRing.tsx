import { motion } from "framer-motion";
import { Music } from "lucide-react";

interface RiderRingProps {
  isPlaying?: boolean;
  albumArt?: string;
  onClick?: () => void;
}

const RiderRing = ({ isPlaying = true, albumArt, onClick }: RiderRingProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-12 h-12 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Ver información de audio"
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Gradient tracks */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/40 via-accent/40 to-primary/40" />
      </motion.div>

      {/* Middle ring with animation */}
      <motion.div
        className="absolute inset-2 rounded-full border border-white/50"
        animate={isPlaying ? { rotate: -360 } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Center core with album art or icon */}
      <div className="absolute inset-3 rounded-full bg-black border border-white/60 flex items-center justify-center overflow-hidden">
        {albumArt ? (
          <img src={albumArt} alt="Album" className="w-full h-full object-cover" />
        ) : (
          <Music className="w-3 h-3 text-white" />
        )}
      </div>

      {/* Radial wave effect */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/50"
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
    </motion.button>
  );
};

export default RiderRing;
