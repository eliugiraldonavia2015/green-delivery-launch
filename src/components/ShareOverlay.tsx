import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Share2, Link as LinkIcon, MessageCircle, Mail, MoreHorizontal, AlertTriangle, EyeOff, Download, TrendingUp, Gauge, BookOpen, Utensils } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ShareOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const users = [
  { id: 1, name: "María", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
  { id: 2, name: "Juan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan" },
  { id: 3, name: "Laura", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura" },
  { id: 4, name: "Pedro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro" },
  { id: 5, name: "Ana", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana" },
  { id: 6, name: "Carlos", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos" }
];

const shareOptions = [
  { id: "compartir", name: "Compartir", icon: Share2, color: "text-primary" },
  { id: "copiar", name: "Copiar enlace", icon: Copy, color: "text-accent" },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "text-green-500" },
  { id: "sms", name: "SMS", icon: MessageCircle, color: "text-blue-500" },
  { id: "messenger", name: "Messenger", icon: MessageCircle, color: "text-blue-600" },
  { id: "instagram", name: "Instagram", icon: MessageCircle, color: "text-pink-500" },
  { id: "telegram", name: "Telegram", icon: MessageCircle, color: "text-sky-500" },
  { id: "facebook", name: "Facebook", icon: MessageCircle, color: "text-blue-700" },
  { id: "correo", name: "Correo", icon: Mail, color: "text-gray-500" },
  { id: "x", name: "X", icon: MessageCircle, color: "text-gray-900" },
  { id: "mas", name: "Más", icon: MoreHorizontal, color: "text-gray-600" }
];

const moreOptions = [
  { id: "denunciar", name: "Denunciar", icon: AlertTriangle, color: "text-muted-foreground" },
  { id: "no-interesa", name: "No me interesa", icon: EyeOff, color: "text-muted-foreground" },
  { id: "descargar", name: "Descargar", icon: Download, color: "text-muted-foreground" },
  { id: "promocionar", name: "Promocionar", icon: TrendingUp, color: "text-muted-foreground" },
  { id: "velocidad", name: "Velocidad", icon: Gauge, color: "text-muted-foreground" },
  { id: "receta", name: "Receta", icon: BookOpen, color: "text-muted-foreground" },
  { id: "ingredientes", name: "Ingredientes", icon: Utensils, color: "text-muted-foreground" }
];

const ShareOverlay = ({ isOpen, onClose }: ShareOverlayProps) => {
  const [copied, setCopied] = useState(false);
  const [sharedTo, setSharedTo] = useState<number[]>([]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToUser = (userId: number) => {
    setSharedTo(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-h-[85vh] flex flex-col"
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

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* Section 1: Enviar a */}
                  <div>
                    <h4 className="font-semibold mb-3">Enviar a</h4>
                    <ScrollArea className="w-full">
                      <div className="flex gap-4 pb-2">
                        {users.map((user) => (
                          <motion.button
                            key={user.id}
                            onClick={() => handleShareToUser(user.id)}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-2 min-w-[70px]"
                          >
                            <div className="relative">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-16 h-16 rounded-full border-2 border-border"
                              />
                              {sharedTo.includes(user.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute inset-0 bg-primary/80 rounded-full flex items-center justify-center"
                                >
                                  <Check className="w-8 h-8 text-white" />
                                </motion.div>
                              )}
                            </div>
                            <span className="text-xs text-center truncate w-full">{user.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Section 2: Share Options */}
                  <div>
                    <h4 className="font-semibold mb-3">Compartir en</h4>
                    <ScrollArea className="w-full">
                      <div className="flex gap-3 pb-2">
                        {shareOptions.map((option) => {
                          const Icon = option.icon;
                          const isCopiado = option.id === "copiar" && copied;
                          return (
                            <motion.button
                              key={option.id}
                              onClick={option.id === "copiar" ? handleCopyLink : () => {}}
                              whileTap={{ scale: 0.95 }}
                              className="flex flex-col items-center gap-2 min-w-[70px]"
                            >
                              <div className={`w-14 h-14 rounded-2xl ${isCopiado ? 'bg-primary' : 'bg-card'} flex items-center justify-center border-2 ${isCopiado ? 'border-primary' : 'border-border'} hover:border-primary/50 transition-colors`}>
                                <Icon className={`w-6 h-6 ${isCopiado ? 'text-white' : option.color}`} />
                              </div>
                              <span className="text-xs text-center truncate w-full">{isCopiado ? "Copiado" : option.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Section 3: More Options */}
                  <div>
                    <h4 className="font-semibold mb-3">Más opciones</h4>
                    <ScrollArea className="w-full">
                      <div className="flex gap-3 pb-2">
                        {moreOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <motion.button
                              key={option.id}
                              whileTap={{ scale: 0.95 }}
                              className="flex flex-col items-center gap-2 min-w-[70px]"
                            >
                              <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center border-2 border-border hover:border-primary/50 transition-colors">
                                <Icon className={`w-6 h-6 ${option.color}`} />
                              </div>
                              <span className="text-xs text-center truncate w-full text-muted-foreground">{option.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareOverlay;