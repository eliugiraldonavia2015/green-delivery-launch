import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Search, Mic, SlidersHorizontal, Star, Home, Bell, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ShopProps {
  onClose: () => void;
}

const categories = [
  "Burgers", "Pizza", "Saludable", "Carnes", "Drinks", "Sushi", "Mexicana", "Italiana",
  "China", "Japonesa", "India", "Vegetariana", "Vegana", "Postres", "Desayunos"
];

const categoryIcons = [
  { emoji: "🍔", name: "Burgers" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🥗", name: "Saludable" },
  { emoji: "🥩", name: "Carnes" },
  { emoji: "🍹", name: "Drinks" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🌮", name: "Mexicana" },
  { emoji: "🍝", name: "Italiana" },
  { emoji: "🥟", name: "China" },
  { emoji: "🍱", name: "Japonesa" },
  { emoji: "🍛", name: "India" },
  { emoji: "🥕", name: "Vegetariana" },
  { emoji: "🌱", name: "Vegana" },
  { emoji: "🍰", name: "Postres" },
  { emoji: "🥐", name: "Desayunos" },
];

const popularItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Plato Especial ${i + 1}`,
  restaurant: `Restaurante ${i + 1}`,
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  rating: (4 + Math.random()).toFixed(1),
  discount: Math.floor(Math.random() * 30 + 10),
  price: (15 + Math.random() * 20).toFixed(2),
  deliveryTime: `${20 + Math.floor(Math.random() * 20)} min`
}));

const Shop = ({ onClose }: ShopProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border px-6 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Tu ubicación</span>
          </div>
          <span className="text-xl font-bold">Foodtook</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 flex items-center gap-2 bg-card rounded-full px-4 py-2.5 border-2 transition-all ${
            isSearchFocused ? "border-primary shadow-glow" : "border-border"
          }`}>
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              className="flex-1 bg-transparent outline-none text-sm"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <Mic className="w-5 h-5 text-muted-foreground" />
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 py-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-6 mb-4">
        <div className="relative h-40 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
            alt="Promo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
            <p className="text-3xl font-bold text-white mb-1">Get 50% Off</p>
            <p className="text-sm text-white/90 mb-3">en tu primera orden sobre $25</p>
            <Button className="w-32 bg-primary hover:bg-primary/90 text-primary-foreground">
              Ordenar ahora
            </Button>
          </div>
        </div>
      </div>

      {/* Category Icons */}
      <div className="px-6 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max">
          {categoryIcons.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-2 min-w-[70px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-3xl hover:scale-105 transition-transform">
                {cat.emoji}
              </div>
              <span className="text-xs text-muted-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Section */}
      <div className="px-6 pb-32">
        <h2 className="text-xl font-bold mb-4">Popular cerca de ti</h2>
        <div className="grid grid-cols-2 gap-3">
          {popularItems.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.95 }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              <div className="relative h-32">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs text-white font-semibold">{item.rating}</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-bold">
                  {item.discount}% off
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 truncate">{item.restaurant}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary">${item.price}</span>
                  <span className="text-muted-foreground">{item.deliveryTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-lg border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center px-4 py-3">
          <motion.button
            onClick={onClose}
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Inicio</span>
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Notif</span>
          </motion.button>

          <motion.button
            className="flex flex-col items-center gap-1 -mt-6 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute inset-0 rounded-2xl blur-lg"
                style={{
                  background: "linear-gradient(135deg, #FF0050, #00F2EA, #FF0050)",
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-14 h-14 rounded-2xl bg-black flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-white/20">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="discoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF0050" />
                      <stop offset="50%" stopColor="#00F2EA" />
                      <stop offset="100%" stopColor="#FF0050" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#discoverGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M2 17L12 22L22 17" stroke="url(#discoverGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="url(#discoverGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <span className="text-white text-xs">Descubrir</span>
          </motion.button>

          <motion.button
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Mensajes</span>
          </motion.button>

          <motion.button
            className="flex flex-col items-center gap-1 min-w-[60px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-6 h-6 text-white" />
            <span className="text-white text-xs">Perfil</span>
          </motion.button>
        </div>
      </div>

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="right" className="w-full sm:w-[400px]">
          <div className="py-6">
            <h3 className="text-xl font-bold mb-6">Filtros</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Precio</h4>
                <div className="space-y-2">
                  {["$", "$$", "$$$", "$$$$"].map((price) => (
                    <button
                      key={price}
                      className="w-full text-left px-4 py-3 rounded-xl bg-card hover:bg-muted transition-colors border border-border"
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Tiempo de entrega</h4>
                <div className="space-y-2">
                  {["< 20 min", "20-30 min", "30-45 min", "> 45 min"].map((time) => (
                    <button
                      key={time}
                      className="w-full text-left px-4 py-3 rounded-xl bg-card hover:bg-muted transition-colors border border-border"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Calificación</h4>
                <div className="space-y-2">
                  {["4.5+", "4.0+", "3.5+", "Todas"].map((rating) => (
                    <button
                      key={rating}
                      className="w-full text-left px-4 py-3 rounded-xl bg-card hover:bg-muted transition-colors border border-border"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setShowFilters(false)}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90"
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default Shop;
