import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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

const sideRecommendations = [
  { id: 1, name: "Papas Fritas", price: 2.50 },
  { id: 2, name: "Aros de Cebolla", price: 3.00 },
  { id: 3, name: "Ensalada César", price: 2.00 }
];

const drinkRecommendations = [
  { id: 4, name: "Coca-Cola", price: 1.50 },
  { id: 5, name: "Limonada", price: 2.00 },
  { id: 6, name: "Té Helado", price: 1.80 }
];

const ProductDetailOverlay = ({ isOpen, onClose, product, onAddToCart }: ProductDetailOverlayProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSides, setSelectedSides] = useState<number[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes("");
      setSelectedSides([]);
      setSelectedDrinks([]);
      setScrollY(0);
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  if (!product) return null;

  const total = product.price * quantity;
  const showStickyHeader = scrollY > 250;

  const toggleSide = (id: number) => {
    setSelectedSides(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const toggleDrink = (id: number) => {
    setSelectedDrinks(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
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
            animate={{ y: "15%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-0 z-50 bg-background rounded-t-3xl flex flex-col overflow-hidden"
          >
            {/* Sticky Header (appears on scroll) */}
            <AnimatePresence>
              {showStickyHeader && (
                <motion.div
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  className="absolute top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{product.name}</h4>
                    <p className="text-sm text-primary">${product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {/* Share functionality */}}
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center"
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? "fill-accent text-accent" : ""}`} />
                    </button>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-full bg-card flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Content */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
              {/* Parallax Header */}
              <div 
                className="relative overflow-hidden transition-all duration-300"
                style={{ 
                  height: Math.max(200, 320 - scrollY * 0.3) + 'px',
                  transform: `translateY(${scrollY * 0.5}px)`
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  style={{
                    filter: scrollY > 100 ? 'brightness(0.9)' : 'brightness(1)'
                  }}
                />
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: scrollY > 100 
                      ? 'linear-gradient(to top, hsl(var(--background)), transparent 40%)' 
                      : 'linear-gradient(to top, hsl(var(--background)), transparent 60%)'
                  }}
                />
                
                {/* Top buttons */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="px-6 pb-32">
                {/* Product Info */}
                <div className="mb-6 -mt-8 relative z-10">
                  <div className="bg-card rounded-3xl p-6 shadow-lg">
                    <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                    <p className="text-muted-foreground text-lg mb-4">{product.description}</p>
                    <p className="text-3xl font-bold text-primary">${product.price}</p>
                  </div>
                </div>

                {/* Side Recommendations */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2">Acompañamiento recomendado</h3>
                  <p className="text-sm text-muted-foreground mb-3">Elige máximo 3 opciones</p>
                  <div className="space-y-2">
                    {sideRecommendations.map((rec) => (
                      <motion.button
                        key={rec.id}
                        onClick={() => toggleSide(rec.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between bg-card hover:bg-muted transition-colors rounded-2xl p-4 border-2 ${
                          selectedSides.includes(rec.id) ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={selectedSides.includes(rec.id)} />
                          <span className="font-medium">{rec.name}</span>
                        </div>
                        <span className="text-primary font-semibold">+${rec.price}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Drink Recommendations */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2">Bebidas recomendadas</h3>
                  <p className="text-sm text-muted-foreground mb-3">Elige máximo 3 opciones</p>
                  <div className="space-y-2">
                    {drinkRecommendations.map((rec) => (
                      <motion.button
                        key={rec.id}
                        onClick={() => toggleDrink(rec.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between bg-card hover:bg-muted transition-colors rounded-2xl p-4 border-2 ${
                          selectedDrinks.includes(rec.id) ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={selectedDrinks.includes(rec.id)} />
                          <span className="font-medium">{rec.name}</span>
                        </div>
                        <span className="text-primary font-semibold">+${rec.price}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Notas especiales</h3>
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
                  className="flex-1 h-14 rounded-full bg-primary hover:bg-primary/90 transition-colors text-lg font-bold"
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
