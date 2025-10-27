import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (productId: number, quantity: number, notes: string) => void;
}

const recommendations = [
  { id: 1, name: "Extra Queso", price: 2.50 },
  { id: 2, name: "Tocino Crujiente", price: 3.00 },
  { id: 3, name: "Aguacate", price: 2.00 },
  { id: 4, name: "Jalapeños", price: 1.50 }
];

const ProductDetailOverlay = ({ isOpen, onClose, product, onAddToCart }: ProductDetailOverlayProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes("");
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  if (!product) return null;

  const total = product.price * quantity;
  const showStickyHeader = scrollY > 200;

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
            className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[95vh] flex flex-col overflow-hidden"
          >
            {/* Sticky Header (appears on scroll) */}
            <AnimatePresence>
              {showStickyHeader && (
                <motion.div
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold">{product.name}</h4>
                      <p className="text-sm text-primary">${product.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Content */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
              {/* Parallax Header */}
              <div 
                className="relative h-80 overflow-hidden"
                style={{ 
                  transform: `translateY(${scrollY * 0.5}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Like button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-accent text-accent" : "text-white"}`} />
                </motion.button>
              </div>

              <div className="px-6 pb-32">
                {/* Product Info */}
                <div className="mb-6 -mt-8 relative z-10">
                  <div className="bg-card rounded-3xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <p className="text-3xl font-bold text-primary">${product.price}</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Agrega Extras</h3>
                  <div className="space-y-2">
                    {recommendations.map((rec) => (
                      <motion.button
                        key={rec.id}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-between bg-card hover:bg-muted transition-colors rounded-2xl p-4"
                      >
                        <span className="font-medium">{rec.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-primary font-semibold">+${rec.price}</span>
                          <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Instrucciones Especiales</h3>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="¿Alguna preferencia? (ej: sin cebolla, extra salsa...)"
                    className="min-h-[100px] bg-card border-border rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Fixed Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6">
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-card rounded-full p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-border transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => {
                    onAddToCart(product.id, quantity, notes);
                    onClose();
                  }}
                  className="flex-1 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg font-bold"
                >
                  Agregar ${total.toFixed(2)}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailOverlay;
