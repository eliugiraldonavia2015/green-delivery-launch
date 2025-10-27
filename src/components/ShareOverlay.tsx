import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const shareOptions = [
  { id: "whatsapp", name: "WhatsApp", color: "bg-[#25D366]", icon: "💬" },
  { id: "facebook", name: "Facebook", color: "bg-[#1877F2]", icon: "📘" },
  { id: "twitter", name: "Twitter", color: "bg-[#1DA1F2]", icon: "🐦" },
  { id: "instagram", name: "Instagram", color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]", icon: "📸" },
  { id: "telegram", name: "Telegram", color: "bg-[#0088cc]", icon: "✈️" },
  { id: "messenger", name: "Messenger", color: "bg-gradient-to-r from-[#00B2FF] to-[#006AFF]", icon: "💌" }
];

const ShareOverlay = ({ isOpen, onClose }: ShareOverlayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Overlay */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-bold">Compartir</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Share Options */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      // Handle share to platform
                      onClose();
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${option.color} flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <span className="text-xs text-muted-foreground text-center">{option.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Copy Link */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between bg-card hover:bg-muted transition-colors rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {copied ? (
                      <Check className="w-6 h-6 text-primary" />
                    ) : (
                      <Copy className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{copied ? "¡Enlace copiado!" : "Copiar enlace"}</p>
                    <p className="text-sm text-muted-foreground">Comparte con quien quieras</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareOverlay;
